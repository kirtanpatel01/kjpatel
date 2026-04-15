"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import {
  PageContainer,
  ResponsiveText,
  SectionContainer,
  SectionHeading,
} from "@/components/responsive-wrappers";
import { socialLinks } from "@/lib/constants";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    from_name: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    emailjs.send(serviceId, templateId, formData, publicKey)
      .then(() => {
        toast.success("Message sent successfully!");
        setFormData({ from_name: "", subject: "", message: "" });
        setLoading(false);
      }, (error) => {
        console.error(error.text);
        toast.error("Failed to send message. Please try again later.");
        setLoading(false);
      });
  };

  return (
    <PageContainer className="">
      <SectionContainer className="space-y-4">
        <SectionHeading>Get in Touch.</SectionHeading>

        <div className="space-y-4">
          <div className="w-fit space-y-1">
            <h3 className="text-sm tracking-widest text-muted-foreground">Email</h3>
            <ResponsiveText size="sm" className="hover:underline underline-offset-4 decoration-1">
              <a href="mailto:kjptel200022@gmail.com">kjptel200022@gmail.com</a>
            </ResponsiveText>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm tracking-widest text-muted-foreground">Socials</h3>
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
                          className="w-8 h-8 icon-mask"
                          style={{ maskImage: `url(${link.icon})`, WebkitMaskImage: `url(${link.icon})` }}
                        />
                      ) : (
                        <img src={link.icon} alt={link.name} className="w-8 h-8 object-contain" />
                      )}

                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className=" text-xs">{link.username}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <form onSubmit={sendEmail} className="w-full max-w-xl flex flex-col border border-border">
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
              rows={6}
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full h-full bg-transparent p-4 placeholder:text-muted-foreground/50 focus:outline-none focus:bg-secondary/20 transition-colors resize-none"
            />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border group-focus-within:bg-primary transition-colors" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 border-border bg-background hover:bg-primary flex items-center justify-between cursor-pointer text-foreground hover:text-primary-foreground"
          >
            <span>{loading ? "Sending..." : "Send Message"}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </SectionContainer>
    </PageContainer>
  );
}
