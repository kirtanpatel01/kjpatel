import type React from "react";
import { cn } from "@/lib/utils";

/**
 * PageContainer - Standardized responsive padding for page content
 * Mobile: p-4, Tablet: p-6, Desktop: p-24
 */
export function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "min-h-[calc(100vh-7.1rem)] sm:min-h-[calc(100vh-5.6rem)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * SectionTitle - Responsive heading with consistent scaling
 * Mobile: text-xl, Tablet: text-3xl, Desktop: text-4xl
 */
export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("font-bold text-xl sm:text-3xl lg:text-4xl", className)}>
      {children}
    </h2>
  );
}

/**
 * SectionHeading - Responsive heading with consistent scaling
 * Mobile: text-xl, Tablet: text-3xl, Desktop: text-4xl
 */
export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("my-0 border-y border-dashed border-border/70", className)}>
      <div className="h-3 w-full bg-[repeating-linear-gradient(-45deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px]" />
      <div className="px-3 py-2 border-y border-dashed bg-accent/40 text-accent-foreground font-bold text-lg sm:text-2xl leading-tight">
        {children}
      </div>
      <div className="h-3 w-full bg-[repeating-linear-gradient(-45deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px]"/>
    </div>
  );
}

/**
 * ResponsiveText - Responsive text sizing
 * Mobile: base / sm, Tablet: lg, Desktop: xl
 */
export function ResponsiveText({
  children,
  size = "base",
  className,
}: {
  children: React.ReactNode;
  size?: "sm" | "base" | "lg" | "xl";
  className?: string;
}) {
  const sizeClass = {
    sm: "text-sm sm:text-base lg:text-lg",
    base: "text-base sm:text-lg lg:text-xl",
    lg: "text-lg sm:text-xl lg:text-2xl",
    xl: "text-xl sm:text-2xl lg:text-3xl",
  }[size];

  return <p className={cn(sizeClass, className)}>{children}</p>;
}

export function SectionContainer({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={cn("w-full", className)}>
      {children}
    </div>
  );
}
