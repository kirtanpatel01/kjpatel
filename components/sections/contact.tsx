"use client";

import emailjs from "emailjs-com";
import { ArrowRight, MapPin, Globe, Mail, Clock } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import {
  SectionContainer,
  SectionHeading,
} from "@/components/responsive-wrappers";
import { socialLinks } from "@/lib/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    from_name: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    emailjs.send(serviceId, templateId, formData, publicKey).then(
      () => {
        toast.success("Message sent successfully!");
        setFormData({ from_name: "", subject: "", message: "" });
        setLoading(false);
      },
      (error) => {
        console.error(error.text);
        toast.error("Failed to send message. Please try again later.");
        setLoading(false);
      },
    );
  };

  return (
    <SectionContainer id="contact" className="space-y-6">
      <SectionHeading>Get in Touch</SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-stretch p-4 sm:p-8">
        {/* Info Column */}
        <div className="flex flex-col justify-end py-2 gap-3 sm:gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-tight text-secondary-foreground">
              Let&apos;s Build Something.
            </h3>
            <p className="font-desc text-sm sm:text-base text-foreground/80 leading-relaxed max-w-sm">
              I&apos;m currently looking for full stack engineering role and
              startup opportunities.
            </p>
          </div>

          {/* <div className="border-t border-dashed border-border/50 my-2" /> */}

          <div className="space-y-2.5 text-sm sm:text-base font-desc">
            <div className="flex items-center gap-3 text-foreground/90">
              <MapPin className="w-5 h-5 shrink-0 stroke-1" />
              <div>
                Vadodara,{" "}
                <span className="text-muted-foreground">Gujarat, India</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-foreground/90">
              <Globe className="w-5 h-5 shrink-0 stroke-1" />
              <span>Remote Friendly</span>
            </div>
            <div className="flex items-center gap-3 text-foreground/95 hover:text-foreground">
              <Mail className="w-5 h-5 shrink-0 stroke-1" />
              <a
                href="mailto:kjptel200022@gmail.com"
                className="hover:underline underline-offset-4 font-semibold"
              >
                kjpatel200022@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-foreground/90">
              <Clock className="w-5 h-5 shrink-0 stroke-1" />
              <span>Usually replies within 24 hours</span>
            </div>
          </div>

          <div className="border-t border-dashed border-border/50 my-2" />

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
                      className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-foreground/80 hover:text-foreground hover:border-border/80 group transition-all duration-200"
                    >
                      <Icon className="w-6 h-6 text-foreground/80 group-hover:text-foreground group-hover:scale-105 transition-all duration-200" />
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

        {/* Form Column */}
        <form
          onSubmit={sendEmail}
          className="w-full flex flex-col border border-border overflow-hidden bg-muted/5"
        >
          <div className="group relative">
            <input
              type="email"
              name="from_name"
              required
              placeholder="mail@example.com"
              value={formData.from_name}
              onChange={handleChange}
              className="w-full bg-transparent p-4 placeholder:text-muted-foreground/50 focus:outline-none focus:bg-secondary/20 transition-colors"
            />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border group-focus-within:bg-primary transition-colors" />
          </div>

          <div className="group relative">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-transparent p-4 placeholder:text-muted-foreground/50 focus:outline-none focus:bg-secondary/20 transition-colors"
            />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border group-focus-within:bg-primary transition-colors" />
          </div>

          <div className="group relative flex-grow">
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-transparent p-4 placeholder:text-muted-foreground/50 focus:outline-none focus:bg-secondary/20 transition-colors resize-none"
            />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border group-focus-within:bg-primary transition-colors" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 bg-background hover:bg-primary flex items-center justify-between cursor-pointer text-foreground hover:text-primary-foreground font-medium transition-colors"
          >
            <span>{loading ? "Sending..." : "Send Message"}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </SectionContainer>
  );
}
