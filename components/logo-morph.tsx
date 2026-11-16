"use client";

import { animate, motionValue } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function playPopSound(freq = 480) {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      freq * 0.45,
      ctx.currentTime + 0.08,
    );
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {}
}

export function LogoMorph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  const [isHolding, setIsHolding] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animationFrameId: number;
    let isDisposed = false;

    // Dimensions
    const width = 240;
    const height = 240;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 3;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // Motion values controlling morph (0 = 2D Logo, 1 = 3D Particle Globe)
    const globeValue = motionValue(1);
    const flingValue = motionValue(0);
    const shockwaveValue = motionValue(0);
    const mouseActiveValue = motionValue(0);

    // Initial settling animation: settle from 3D globe down into the 2D logo
    animate(globeValue, 0, {
      type: "spring",
      stiffness: 55,
      damping: 16,
      mass: 1,
      delay: 0.6,
    });

    // Theme color resolution
    const isDark =
      document.documentElement.classList.contains("dark") ||
      resolvedTheme === "dark";
    const particleColor = new THREE.Color(isDark ? 0xf4f4f5 : 0x18181b);

    // Load and sample the logo image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/logo.svg";

    img.onload = () => {
      if (isDisposed) return;

      const sampleSize = 160;
      const offscreen = document.createElement("canvas");
      offscreen.width = sampleSize;
      offscreen.height = sampleSize;
      const ctx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
      const imgData = ctx.getImageData(0, 0, sampleSize, sampleSize).data;

      const validPoints: { x: number; y: number }[] = [];
      const step = 2; // Step size controls particle density

      for (let y = 0; y < sampleSize; y += step) {
        for (let x = 0; x < sampleSize; x += step) {
          const idx = (y * sampleSize + x) * 4;
          const alpha = imgData[idx + 3];

          // Sample pixels where the circular emblem is solid (KJ cutout is transparent)
          if (alpha > 120) {
            validPoints.push({
              x: (x / sampleSize - 0.5) * 1.5,
              y: (0.5 - y / sampleSize) * 1.5,
            });
          }
        }
      }

      const count = validPoints.length;
      if (count === 0) return;

      const imagePositions = new Float32Array(count * 3);
      const globePositions = new Float32Array(count * 3);
      const phases = new Float32Array(count);
      const speeds = new Float32Array(count);

      const globeRadius = 0.72;
      const tilt = -0.28;

      for (let i = 0; i < count; i++) {
        const pt = validPoints[i];
        // 2D logo plane position
        imagePositions[i * 3] = pt.x;
        imagePositions[i * 3 + 1] = pt.y;
        imagePositions[i * 3 + 2] = 0;

        // 3D Fibonacci sphere distribution
        const sphereY = 1 - (i / Math.max(count - 1, 1)) * 2;
        const ringRadius = Math.sqrt(Math.max(0, 1 - sphereY * sphereY));
        const angle = i * 2.39996323; // Golden ratio spiral
        const sphereX = Math.cos(angle) * ringRadius;
        const sphereZ = Math.sin(angle) * ringRadius;

        globePositions[i * 3] = sphereX * globeRadius;
        globePositions[i * 3 + 1] =
          (sphereY * Math.cos(tilt) - sphereZ * Math.sin(tilt)) * globeRadius;
        globePositions[i * 3 + 2] =
          (sphereY * Math.sin(tilt) + sphereZ * Math.cos(tilt)) * globeRadius;

        phases[i] = Math.random() * Math.PI * 2;
        speeds[i] = 0.7 + Math.random() * 0.45;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(imagePositions, 3),
      );
      geometry.setAttribute(
        "aGlobePosition",
        new THREE.BufferAttribute(globePositions, 3),
      );
      geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
      geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));

      // Custom GLSL Shader for smooth particle interpolation, turbulence, shockwave, and hover ripple
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uGlobe: { value: globeValue.get() },
          uTime: { value: 0 },
          uColor: { value: particleColor },
          uFling: { value: 0 },
          uShockwave: { value: 0 },
          uShockwaveOrigin: { value: new THREE.Vector3(0, 0, 0) },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uMouseActive: { value: 0 },
          uPointSize: { value: 3.2 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
        },
        vertexShader: `
          uniform float uGlobe;
          uniform float uTime;
          uniform float uFling;
          uniform float uShockwave;
          uniform vec3 uShockwaveOrigin;
          uniform vec2 uMouse;
          uniform float uMouseActive;
          uniform float uPointSize;
          uniform float uPixelRatio;

          attribute vec3 aGlobePosition;
          attribute float aPhase;
          attribute float aSpeed;

          varying float vAlpha;

          void main() {
            float turbMult = 0.045 * (1.0 + uFling * 2.5);
            vec3 turbulence = vec3(
              sin(uTime * (aSpeed + 0.6) + aPhase) * turbMult,
              cos(uTime * (aSpeed + 0.37) + aPhase * 1.71) * (turbMult * 0.8),
              sin(uTime * (aSpeed + 0.22) + aPhase * 2.13) * turbMult
            );

            vec3 target = aGlobePosition + turbulence;
            vec3 pos = mix(position, target, uGlobe);

            // Fling expansion
            if (uFling > 0.005) {
              vec3 expDir = length(pos) > 0.001 ? normalize(pos) : vec3(0.0, 1.0, 0.0);
              pos += expDir * (uFling * 0.28);
            }

            // Tap shockwave impulse burst
            if (uShockwave > 0.005) {
              vec3 shockDir = pos - uShockwaveOrigin;
              float shockDist = length(shockDir);
              vec3 dir = shockDist > 0.001 ? normalize(shockDir) : vec3(0.0, 1.0, 0.0);
              float burstFactor = (uShockwave * 0.42) / (shockDist * 1.2 + 0.3);
              pos += dir * burstFactor;
            }

            // Magnetic hover repulsion
            if (uMouseActive > 0.01) {
              vec2 diff = pos.xy - uMouse;
              float dist = length(diff);
              float radius = 0.42;
              if (dist < radius) {
                float force = (1.0 - dist / radius) * uMouseActive * 0.14;
                vec2 pushDir = dist > 0.001 ? normalize(diff) : vec2(0.0, 1.0);
                pos.xy += pushDir * force;
                pos.z += force * 0.7;
              }
            }

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

            // Depth-of-field point size attenuation
            float depthScale = clamp(1.0 + pos.z * 0.38, 0.6, 1.4);
            gl_PointSize = uPointSize * uPixelRatio * depthScale * (1.1 - uGlobe * 0.25);
            gl_Position = projectionMatrix * mvPosition;

            vAlpha = clamp(0.75 + pos.z * 0.3, 0.45, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          varying float vAlpha;

          void main() {
            vec2 coord = gl_PointCoord - vec2(0.5);
            float dist = length(coord);
            if (dist > 0.5) discard;
            float shape = smoothstep(0.5, 0.42, dist);
            gl_FragColor = vec4(uColor, shape * vAlpha);
          }
        `,
        transparent: true,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);

      // High-resolution vector overlay mesh that fades in seamlessly as particles settle
      const hiresCanvas = document.createElement("canvas");
      hiresCanvas.width = 512;
      hiresCanvas.height = 512;
      const hiresCtx = hiresCanvas.getContext("2d");
      if (hiresCtx) {
        hiresCtx.drawImage(img, 0, 0, 512, 512);
        hiresCtx.globalCompositeOperation = "source-in";
        hiresCtx.fillStyle = isDark ? "#f4f4f5" : "#18181b";
        hiresCtx.fillRect(0, 0, 512, 512);
      }
      const logoTexture = new THREE.CanvasTexture(hiresCanvas);
      logoTexture.colorSpace = THREE.SRGBColorSpace;
      logoTexture.minFilter = THREE.LinearFilter;
      logoTexture.magFilter = THREE.LinearFilter;

      const overlayMaterial = new THREE.MeshBasicMaterial({
        map: logoTexture,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        side: THREE.DoubleSide,
        opacity: 0,
      });

      const overlayMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1.5, 1.5),
        overlayMaterial,
      );
      overlayMesh.renderOrder = 2;

      // Group containing both particles and overlay mesh
      const group = new THREE.Group();
      group.add(points);
      group.add(overlayMesh);
      scene.add(group);

      // Interaction tracking
      let velocityX = 0;
      let velocityY = 0;
      let isDragging = false;
      let previousPointerX = 0;
      let previousPointerY = 0;
      let pointerDownTime = 0;
      let pointerStartX = 0;
      let pointerStartY = 0;

      // High resolution mix curve from Motion example
      const highResolutionMix = (globeAmount: number) => {
        const amount = Math.max(globeAmount, 0);
        const start = 0.005;
        const end = 0.04;
        const t = Math.min(1, Math.max(0, (amount - start) / (end - start)));
        return 1 - t * t * (3 - 2 * t);
      };

      const clock = new THREE.Clock();

      // Render Loop
      const render = () => {
        if (isDisposed) return;
        animationFrameId = requestAnimationFrame(render);

        const elapsedTime = clock.getElapsedTime();
        const currentGlobe = globeValue.get();

        material.uniforms.uGlobe.value = currentGlobe;
        material.uniforms.uFling.value = flingValue.get();
        material.uniforms.uShockwave.value = shockwaveValue.get();
        material.uniforms.uMouseActive.value = mouseActiveValue.get();
        material.uniforms.uTime.value = elapsedTime;

        // Fade in crisp high-res overlay as particles lock in, fade out when morphing
        overlayMaterial.opacity = highResolutionMix(currentGlobe);

        // Momentum friction
        if (!isDragging) {
          velocityX *= 0.92;
          velocityY *= 0.92;
        }

        renderer.render(scene, camera);
      };

      render();

      // Trigger shockwave impulse
      const triggerShockwave = (clientX: number, clientY: number) => {
        const rect = canvas.getBoundingClientRect();
        const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);

        material.uniforms.uShockwaveOrigin.value.set(
          normX * 0.75,
          normY * 0.75,
          0.1,
        );
        shockwaveValue.set(1.0);
        animate(shockwaveValue, 0, {
          type: "spring",
          stiffness: 180,
          damping: 14,
          mass: 0.7,
        });

        playPopSound(520);
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate(12);
        }
      };

      // Pointer Event Handlers for Hold-to-Morph, Tap Shockwave & Hover Repulsion
      const handlePointerDown = (e: PointerEvent) => {
        isDragging = true;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
        pointerStartX = e.clientX;
        pointerStartY = e.clientY;
        pointerDownTime = performance.now();
        velocityX = 0;
        velocityY = 0;
        setIsHolding(true);

        animate(globeValue, 1, {
          type: "spring",
          stiffness: 120,
          damping: 18,
          mass: 0.9,
        });
      };

      const handlePointerMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

        // Update hover repulsion coordinates
        material.uniforms.uMouse.value.set(normX * 0.75, normY * 0.75);

        if (!isDragging) return;
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;

        velocityX = deltaX * 0.009;
        velocityY = deltaY * 0.009;
      };

      const handlePointerUp = (e: PointerEvent) => {
        if (!isDragging) return;
        isDragging = false;
        setIsHolding(false);

        const duration = performance.now() - pointerDownTime;
        const moveDist = Math.hypot(
          e.clientX - pointerStartX,
          e.clientY - pointerStartY,
        );

        // Tap detected -> trigger shockwave!
        if (duration < 250 && moveDist < 6) {
          triggerShockwave(e.clientX, e.clientY);
        } else {
          // Drag released -> check for fling dispersal velocity
          const flingSpeed = Math.hypot(velocityX, velocityY);
          if (flingSpeed > 0.015) {
            const flingPower = Math.min(flingSpeed * 28, 1.0);
            flingValue.set(flingPower);
            animate(flingValue, 0, {
              type: "spring",
              stiffness: 75,
              damping: 14,
              mass: 0.95,
            });
            playPopSound(360);
          }
        }

        // Release springs back to the 2D logo
        animate(globeValue, 0, {
          type: "spring",
          stiffness: 70,
          damping: 16,
          mass: 1,
        });
      };

      const handlePointerEnter = () => {
        animate(mouseActiveValue, 1, { duration: 0.2 });
      };

      const handlePointerLeave = () => {
        animate(mouseActiveValue, 0, { duration: 0.3 });
      };

      canvas.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      canvas.addEventListener("pointercancel", handlePointerUp);
      canvas.addEventListener("pointerenter", handlePointerEnter);
      canvas.addEventListener("pointerleave", handlePointerLeave);

      // Cleanup event handlers
      return () => {
        canvas.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
        canvas.removeEventListener("pointercancel", handlePointerUp);
        canvas.removeEventListener("pointerenter", handlePointerEnter);
        canvas.removeEventListener("pointerleave", handlePointerLeave);
        geometry.dispose();
        material.dispose();
        logoTexture.dispose();
        overlayMaterial.dispose();
      };
    };

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center select-none py-6 group"
    >
      <button
        type="button"
        aria-label="Hold to morph into particle globe, tap to burst"
        className="relative flex items-center justify-center cursor-pointer bg-transparent border-none p-0 outline-none"
      >
        <canvas
          ref={canvasRef}
          className="w-[220px] h-[220px] sm:w-[240px] sm:h-[240px] touch-none transition-transform duration-200 active:scale-[0.98]"
        />
      </button>

      <p className="mt-2 text-[11px] font-mono tracking-widest uppercase text-muted-foreground/50 group-hover:text-muted-foreground/80 transition-colors">
        {isHolding ? "Release to assemble" : "Hold to morph • Tap to burst"}
      </p>
    </div>
  );
}
