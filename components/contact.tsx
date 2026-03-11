"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

export default function Contact() {
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
    <section id="contact" className="py-24 border-t border-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Info Column */}
        <div className="flex flex-col h-full">
           <div className="mb-12">
              <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6">04 / Contact</h2>
              <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-foreground text-balance">
                GET IN <br/> TOUCH.
              </h1>
           </div>

           <div className="mt-auto space-y-8">
              <div className="flex flex-col gap-1">
                 <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Email</h3>
                 <a href="mailto:kjptel200022@gmail.com" className="text-xl sm:text-2xl font-bold hover:text-muted-foreground transition-colors">
                   kjptel200022@gmail.com
                 </a>
              </div>

              <div className="flex flex-col gap-1">
                 <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Socials</h3>
                 <div className="flex flex-wrap gap-6">
                    <a href="https://linkedin.com/in/kjpatel-dev" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:underline underline-offset-4 decoration-1">LinkedIn</a>
                    <a href="https://github.com/kirtanpatel01" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:underline underline-offset-4 decoration-1">GitHub</a>
                    <a href="https://x.com/kjpatel_dev" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:underline underline-offset-4 decoration-1">Twitter</a>
                 </div>
              </div>
           </div>
        </div>

        {/* Form Column */}
        <form onSubmit={sendEmail} className="flex flex-col gap-0 border border-border">
          <div className="group relative">
            <input
              type="email"
              name="from_name"
              required
              placeholder="YOUR EMAIL"
              value={formData.from_name}
              onChange={handleChange}
              className="w-full bg-transparent p-6 sm:p-8 text-lg font-medium placeholder:text-muted-foreground/50 focus:outline-none focus:bg-secondary/20 transition-colors"
            />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border group-focus-within:bg-foreground transition-colors" />
          </div>
          
          <div className="group relative">
             <input
              type="text"
              name="subject"
              placeholder="SUBJECT"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-transparent p-6 sm:p-8 text-lg font-medium placeholder:text-muted-foreground/50 focus:outline-none focus:bg-secondary/20 transition-colors"
            />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border group-focus-within:bg-foreground transition-colors" />
          </div>

          <div className="group relative flex-grow">
            <textarea
              name="message"
              required
              rows={6}
              placeholder="MESSAGE"
              value={formData.message}
              onChange={handleChange}
              className="w-full h-full bg-transparent p-6 sm:p-8 text-lg font-medium placeholder:text-muted-foreground/50 focus:outline-none focus:bg-secondary/20 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-6 sm:p-8 border-t border-border bg-foreground text-background font-bold tracking-widest uppercase hover:bg-foreground/90 transition-colors flex items-center justify-between group cursor-pointer"
          >
            <span>{loading ? "Sending..." : "Send Message"}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </section>
  );
}
