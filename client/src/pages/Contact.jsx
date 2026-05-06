import { ExternalLink, Instagram, Linkedin, Mail, MessageCircle, Youtube } from "lucide-react";
import ContactForm from "../components/ContactForm";
import PageTransition from "../components/PageTransition";
import SectionHeader from "../components/SectionHeader";
import SEO from "../components/SEO";
import { profile } from "../data/profile";

const Contact = () => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "917067698821";
  const email = import.meta.env.VITE_CONTACT_EMAIL || profile.email;

  return (
    <PageTransition>
      <SEO title="Contact Rajkumar Lodhi" description="Contact Rajkumar Lodhi for reels, shorts, promotional videos, cinematic edits, thumbnails, and social media design." />
      <section className="bg-ink page-hero">
        <div className="container-page grid gap-8 pb-14 pt-8 sm:pb-16 sm:pt-10 md:pb-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-12 lg:pb-24">
          <div>
            <SectionHeader
              eyebrow="Contact"
              title="Let's create your next scroll-stopping edit."
              description="Share the raw clips, platform, deadline, and style reference. Rajkumar will reply with a clean plan for the edit."
            />
            <div className="scribble-note mb-6 inline-block border-accent px-5 py-3 text-sm font-black text-accent sm:mb-8 sm:px-7">
              Fast delivery / Gen Z style / high-quality output
            </div>
            <div className="mt-6 grid gap-3 sm:mt-8">
              <a className="ghost-button justify-start" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
                <MessageCircle size={18} />
                WhatsApp
              </a>
              <a className="ghost-button justify-start" href={`mailto:${email}`}>
                <Mail size={18} />
                {email}
              </a>
              <a className="ghost-button justify-start" href={`tel:${profile.phone}`}>
                {profile.phone}
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <a className="grid h-11 w-11 place-items-center rounded-[8px] border border-white/10 text-fog hover:border-electric hover:text-electric" href={import.meta.env.VITE_INSTAGRAM_URL || profile.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram size={19} />
              </a>
              <a className="grid h-11 w-11 place-items-center rounded-[8px] border border-white/10 text-fog hover:border-electric hover:text-electric" href={import.meta.env.VITE_YOUTUBE_URL || profile.socials.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
                <Youtube size={19} />
              </a>
              <a className="grid h-11 w-11 place-items-center rounded-[8px] border border-white/10 text-fog hover:border-electric hover:text-electric" href={import.meta.env.VITE_LINKEDIN_URL || profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={19} />
              </a>
              <a className="grid h-11 w-11 place-items-center rounded-[8px] border border-white/10 text-fog hover:border-electric hover:text-electric" href={import.meta.env.VITE_BEHANCE_URL || "#"} aria-label="Behance">
                <ExternalLink size={19} />
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </PageTransition>
  );
};

export default Contact;
