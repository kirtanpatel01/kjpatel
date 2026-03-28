"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { div } from "motion/react-client";

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
    <div className="min-h-[calc(100vh-5.6rem)] p-4 sm:p-24 flex justify-between">
      <div className="flex flex-col">
          <div className="mb-8 sm:mb-12">
            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-foreground text-balance">
              GET IN <br /> TOUCH.
            </h1>
          </div>

          <div className="mt-auto space-y-4 sm:space-y-8">
            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Email</h3>
              <a href="mailto:kjptel200022@gmail.com" className="hover:underline underline-offset-4 decoration-1">
                kjptel200022@gmail.com
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Socials</h3>
              <div className="flex flex-wrap gap-6">
                <a href="https://linkedin.com/in/kjpatel-dev" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4 decoration-1">LinkedIn</a>
                <a href="https://github.com/kirtanpatel01" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4 decoration-1">GitHub</a>
                <a href="https://x.com/kjpatel_dev" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4 decoration-1">Twitter</a>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={sendEmail} className="w-full max-w-xl flex flex-col border border-border">
          <div className="group relative">
            <input
              type="email"
              name="from_name"
              required
              placeholder="mail@example.com"
              value={formData.from_name}
              onChange={handleChange}
              className="w-full bg-transparent p-4 sm:p-8 placeholder:text-muted-foreground/50 focus:outline-none focus:bg-secondary/20 transition-colors"
            />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border group-focus-within:bg-foreground transition-colors" />
          </div>

          <div className="group relative">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-transparent p-4 sm:p-8 placeholder:text-muted-foreground/50 focus:outline-none focus:bg-secondary/20 transition-colors"
            />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border group-focus-within:bg-foreground transition-colors" />
          </div>

          <div className="group relative flex-grow">
            <textarea
              name="message"
              required
              rows={6}
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full h-full bg-transparent p-4 sm:p-8 placeholder:text-muted-foreground/50 focus:outline-none focus:bg-secondary/20 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 sm:p-8 border-t border-border bg-background hover:bg-primary flex items-center justify-between cursor-pointer text-foreground hover:text-primary-foreground"
          >
            <span>{loading ? "Sending..." : "Send Message"}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
    </div>
  );
}
