"use client";

import emailjs from "emailjs-com";
import {
  ArrowRight,
  Check,
  Clock,
  Globe,
  Loader2,
  Mail,
  MapPin,
} from "lucide-react";
import type React from "react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import {
  SectionContainer,
  SectionHeading,
} from "@/components/responsive-wrappers";
import { ScrollReveal } from "../scroll-reveal";
import { socialLinks } from "@/lib/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem("contact_form_draft");
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            from_name: parsed.from_name || "",
            subject: parsed.subject || "",
            message: parsed.message || "",
          };
        }
      } catch (e) {}
    }
    return {
      from_name: "",
      subject: "",
      message: "",
    };
  });

  // Sync browser-restored DOM values after mount
  useEffect(() => {
    const emailEl = document.getElementById(
      "contact-email-input",
    ) as HTMLInputElement | null;
    const subjectEl = document.getElementById(
      "contact-subject-input",
    ) as HTMLInputElement | null;
    const messageEl = document.getElementById(
      "contact-message-input",
    ) as HTMLTextAreaElement | null;

    const domEmail = emailEl?.value || "";
    const domSubject = subjectEl?.value || "";
    const domMessage = messageEl?.value || "";

    if (domEmail || domSubject || domMessage) {
      setFormData((prev) => {
        const updated = {
          from_name: prev.from_name || domEmail,
          subject: prev.subject || domSubject,
          message: prev.message || domMessage,
        };
        try {
          sessionStorage.setItem("contact_form_draft", JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("contact_form_draft", JSON.stringify(updated));
      } catch (e) {}
    }
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("loading");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    emailjs.send(serviceId, templateId, formData, publicKey).then(
      () => {
        toast.success("Message sent successfully!");
        setFormData({ from_name: "", subject: "", message: "" });
        if (typeof window !== "undefined") {
          try {
            sessionStorage.removeItem("contact_form_draft");
          } catch (e) {}
        }
        setLoading(false);
        setStatus("success");
        setTimeout(() => setStatus("idle"), 2500);
      },
      (error) => {
        console.error(error.text);
        toast.error("Failed to send message. Please try again later.");
        setLoading(false);
        setStatus("idle");
      },
    );
  };

  return (
    <SectionContainer id="contact">
      <SectionHeading tag="Inquiries">Connect</SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start pt-2">
        {/* Info Column */}
        <ScrollReveal delay={0} y={12}>
          <div className="flex flex-col justify-between py-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold tracking-tight text-secondary-foreground">
                Let&apos;s Build Something.
              </h3>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed max-w-sm">
                Open to discussing technical architecture, open-source
                initiatives, and engineering collaborations.
              </p>
            </div>

            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-center gap-3 text-foreground/90">
                <MapPin className="w-5 h-5 shrink-0 stroke-[1.5]" />
                <div>
                  Vadodara,{" "}
                  <span className="text-muted-foreground">Gujarat, India</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-foreground/90">
                <Globe className="w-5 h-5 shrink-0 stroke-[1.5]" />
                <span>Remote Friendly</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/95 hover:text-foreground">
                <Mail className="w-5 h-5 shrink-0 stroke-[1.5]" />
                <a
                  href="mailto:kjptel200022@gmail.com"
                  className="hover:underline underline-offset-4 font-semibold"
                >
                  kjpatel200022@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-foreground/90">
                <Clock className="w-5 h-5 shrink-0 stroke-[1.5]" />
                <span>
                  Usually replies within{" "}
                  <span className="tabular-nums">24</span> hours
                </span>
              </div>
            </div>

            <div className="flex gap-4 items-center pt-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Tooltip key={link.name}>
                    <TooltipTrigger asChild>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-foreground/80 hover:text-foreground group transition-colors duration-200"
                      >
                        <Icon className="w-5 h-5 text-foreground/80 group-hover:text-foreground transition-colors duration-200" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top" sideOffset={6}>
                      <p className="text-[11px] font-medium">{link.username}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Form Column */}
        <ScrollReveal delay={0.08} y={12}>
          <form
            onSubmit={sendEmail}
            className="w-full flex flex-col gap-2.5 rounded-2xl bg-muted/30 dark:bg-muted/10 p-3 sm:p-4"
          >
            <div>
              <input
                id="contact-email-input"
                type="email"
                name="from_name"
                required
                placeholder="mail@example.com"
                value={formData.from_name}
                onChange={handleChange}
                className="w-full rounded-xl bg-background/80 dark:bg-background/40 px-4 py-3 placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring transition-colors text-sm"
              />
            </div>

            <div>
              <input
                id="contact-subject-input"
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-xl bg-background/80 dark:bg-background/40 px-4 py-3 placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring transition-colors text-sm"
              />
            </div>

            <div className="flex-grow">
              <textarea
                id="contact-message-input"
                name="message"
                required
                rows={5}
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-xl bg-background/80 dark:bg-background/40 px-4 py-3 placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring transition-colors resize-none text-sm"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.1 }}
              className="w-full rounded-xl py-3.5 px-4 bg-primary text-primary-foreground hover:opacity-90 flex items-center justify-between cursor-pointer font-medium text-sm group overflow-hidden relative"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {status === "idle" && (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ type: "spring", duration: 0.25, bounce: 0 }}
                    className="flex items-center justify-between w-full"
                  >
                    <span>Send Message</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                )}

                {status === "loading" && (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center gap-2 w-full"
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </motion.span>
                )}

                {status === "success" && (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                    transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                    className="flex items-center justify-center gap-1.5 w-full text-emerald-300 font-semibold"
                  >
                    <Check className="w-4 h-4" />
                    <span>Message Sent!</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        </ScrollReveal>
      </div>
    </SectionContainer>
  );
}
