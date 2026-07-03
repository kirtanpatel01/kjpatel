"use client";

import emailjs from "emailjs-com";
import { ArrowRight, Compass, Mail } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { SectionContainer } from "@/components/responsive-wrappers";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { socialLinks } from "@/lib/constants";

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
    <SectionContainer id="contact" className="space-y-6 scroll-mt-24 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column - Invite Text */}
        <div className="md:col-span-5 space-y-6 md:pr-4">
          <div className="space-y-3">
            <h3 className="text-3xl font-black tracking-tight text-foreground">
              Let&apos;s build something meaningful.
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              I&apos;m currently seeking Software Engineering internships and
              full-time opportunities where I can contribute to building
              production software, developer tools, or AI-powered products. If
              you&apos;re hiring or simply want to discuss technology, I&apos;d
              be happy to connect.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-dashed border-border/80">
            {/* Email Link */}
            <div className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-accent/25 group-hover:bg-primary/5 transition-all">
                <Mail
                  size={16}
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Direct Email
                </p>
                <a
                  href="mailto:kjptel200022@gmail.com"
                  className="text-sm font-semibold hover:text-primary underline underline-offset-4 decoration-1 decoration-dashed decoration-current/30 hover:decoration-primary transition-all"
                >
                  kjptel200022@gmail.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-accent/25">
                <Compass size={16} className="text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Socials & Networks
                </p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((link) => (
                    <Tooltip key={link.name}>
                      <TooltipTrigger asChild>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center transition-transform hover:scale-110"
                        >
                          {link.isNeutral ? (
                            <div
                              className="w-5 h-5 icon-mask bg-muted-foreground hover:bg-primary transition-colors"
                              style={{
                                maskImage: `url(${link.icon})`,
                                WebkitMaskImage: `url(${link.icon})`,
                              }}
                            />
                          ) : (
                            <img
                              src={link.icon}
                              alt={link.name}
                              className="w-5 h-5 object-contain grayscale hover:grayscale-0 transition-all"
                            />
                          )}
                        </a>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p className="text-xs">{link.username}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sleek Contact Form */}
        <div className="md:col-span-7">
          <form
            onSubmit={sendEmail}
            className="w-full flex flex-col border border-dashed border-border rounded-2xl overflow-hidden bg-muted/5 shadow-sm focus-within:shadow-md focus-within:border-primary/45 transition-all duration-300"
          >
            <div className="group relative">
              <input
                type="email"
                name="from_name"
                required
                placeholder="Your email (mail@example.com)"
                value={formData.from_name}
                onChange={handleChange}
                className="w-full bg-transparent p-4 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:bg-secondary/10 transition-colors"
              />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border/50 group-focus-within:bg-primary transition-colors" />
            </div>

            <div className="group relative">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-transparent p-4 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:bg-secondary/10 transition-colors"
              />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border/50 group-focus-within:bg-primary transition-colors" />
            </div>

            <div className="group relative flex-grow">
              <textarea
                name="message"
                required
                rows={5}
                placeholder="How can I help you? Project details, timelines, or just a hello..."
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-transparent p-4 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:bg-secondary/10 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-4 border-t border-dashed border-border bg-background hover:bg-primary flex items-center justify-between cursor-pointer text-foreground hover:text-primary-foreground font-bold tracking-wider text-xs uppercase transition-colors"
            >
              <span>{loading ? "Sending..." : "Send Message"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </SectionContainer>
  );
}
