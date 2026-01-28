"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Mail, Phone, Locate, Send } from "lucide-react";
import { toast } from "sonner";
import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import Link from 'next/link';

export default function Contact() {
  type SocialLink = {
    name: string;
    src: string;
    link: string;
  }

  const socialLinks: SocialLink[] = [
    {
      name: "LinkedIn",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg",
      link: "https://www.linkedin.com/in/kirtanpatel01"
    },
    {
      name: "X/Twitter",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twitter/twitter-original.svg",
      link: "https://x.com/_k_j_patel_"
    },
    {
      name: "Github",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
      link: "https://github.com/kirtanpatel01"
    },
  ]

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    from_name: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(e.target.name)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    emailjs
      .send(serviceId, templateId, formData, publicKey)
      .then(
        () => {
          toast.success("Message sent successfully!");
          setFormData({ from_name: "", subject: "", message: "" });
          setLoading(false);
        },
        (error) => {
          console.error(error.text);
          toast.error("Failed to send message. Please try again later.");
          setLoading(false);
        }
      );
  };

  return (
    <div className="space-y-8 text-sm">
      {/* Contact Details */}
      <div className="flex sm:hidden items-center gap-2">
        <label className="text-sm">Socials:</label>
        <ul className='w-fit flex items-center gap-4 bg-cyan-400/5 dark:bg-slate-600/75 border border-cyan-500 dark:border-slate-800 px-3 py-2 rounded-md'>
          {socialLinks.map((link) => (
            <li key={link.name} className='mt-1 sm:mt-2'>
              <Link href={link.link} target='_blank'>
                <Tooltip>
                  <TooltipTrigger>
                    <Image src={link.src} alt={link.name} width={25} height={25} className=' cursor-pointer' />
                  </TooltipTrigger>
                  <TooltipContent>{link.name}</TooltipContent>
                </Tooltip>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Phone size={20} />
          <span
            onClick={() => navigator.clipboard.writeText("+91 7574058692")}
            className="cursor-copy hover:text-cyan-400 transition"
          >
            +91 7574058692
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Mail size={20} />
          <span
            onClick={() => navigator.clipboard.writeText("kjptel200022@gmail.com")}
            className="cursor-copy hover:text-cyan-400 transition"
          >
            kjptel200022@gmail.com
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Locate size={20} />
          <address>Vadodara, Gujarat, India</address>
        </div>
      </div>

      {/* Email Form */}
      <form onSubmit={sendEmail} className="space-y-4">
        <input
          type="email"
          name="from_name"
          required
          placeholder="Your email"
          value={formData.from_name}
          onChange={handleChange}
          className="w-full border border-border bg-transparent rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-400"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full border border-border bg-transparent rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-400"
        />
        <textarea
          name="message"
          required
          placeholder="Message..."
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-border bg-transparent rounded-md px-3 py-2 min-h-[100px] focus:outline-none focus:ring-1 focus:ring-cyan-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full px-6 py-2 bg-cyan-500/10 border border-cyan-400/40 rounded-md hover:bg-cyan-500/20 transition"
        >
          <Send size={16} />
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
