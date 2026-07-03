"use client";

import emailjs from "emailjs-com";
import { ArrowRight } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import {
  ResponsiveText,
  SectionContainer,
  SectionHeading,
} from "@/components/responsive-wrappers";
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
    <SectionContainer id="contact" className="space-y-6">
      <SectionHeading>Get in Touch.</SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Info Column */}
        <div className="space-y-6">
          <div className="w-fit space-y-1">
            <h3 className="text-sm tracking-widest text-muted-foreground uppercase">
              Email
            </h3>
            <ResponsiveText
              size="sm"
              className="hover:underline underline-offset-4 decoration-1 font-medium"
            >
              <a href="mailto:kjptel200022@gmail.com">kjptel200022@gmail.com</a>
            </ResponsiveText>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm tracking-widest text-muted-foreground uppercase">
              Socials
            </h3>
            <div className="flex gap-6">
              {socialLinks.map((link) => (
                <Tooltip key={link.name}>
                  <TooltipTrigger asChild>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center transition-transform duration-300 hover:scale-110"
                    >
                      {link.isNeutral ? (
                        <div
                          className="w-8 h-8 icon-mask bg-foreground"
                          style={{
                            maskImage: `url(${link.icon})`,
                            WebkitMaskImage: `url(${link.icon})`,
                          }}
                        />
                      ) : (
                        <img
                          src={link.icon}
                          alt={link.name}
                          className="w-8 h-8 object-contain"
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

        {/* Form Column */}
        <form
          onSubmit={sendEmail}
          className="w-full flex flex-col border border-border rounded-xl overflow-hidden bg-muted/5"
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
            className="w-full p-4 border-t border-border bg-background hover:bg-primary flex items-center justify-between cursor-pointer text-foreground hover:text-primary-foreground font-medium transition-colors"
          >
            <span>{loading ? "Sending..." : "Send Message"}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </SectionContainer>
  );
}
