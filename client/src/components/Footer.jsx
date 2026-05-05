import { Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { profile, tools } from "../data/profile";

const Footer = () => {
  const email = import.meta.env.VITE_CONTACT_EMAIL || profile.email;

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-[8px] border border-electric/50 bg-electric/10 text-sm font-black text-electric">
              RL
            </span>
            <span className="text-sm font-black uppercase tracking-[0.22em] text-white">{profile.name}</span>
          </div>
          <p className="max-w-md leading-7 text-fog">
            {profile.shortIntro}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {tools.slice(0, 5).map((tool) => (
              <span key={tool} className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-white/50">
                {tool}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-white">Explore</h3>
          <div className="grid gap-3 text-sm text-fog">
            <Link to="/portfolio" className="hover:text-electric">Portfolio</Link>
            <Link to="/services" className="hover:text-electric">Services</Link>
            <Link to="/about" className="hover:text-electric">About</Link>
            <Link to="/contact" className="hover:text-electric">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-white">Connect</h3>
          <a href={`mailto:${email}`} className="mb-5 inline-flex items-center gap-2 text-sm text-fog hover:text-electric">
            <Mail size={16} />
            {email}
          </a>
          <p className="mb-5 text-sm text-fog">Phone: {profile.phone}</p>
          <div className="flex gap-3">
            <a className="grid h-10 w-10 place-items-center rounded-[8px] border border-white/10 hover:border-electric hover:text-electric" href={import.meta.env.VITE_INSTAGRAM_URL || profile.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a className="grid h-10 w-10 place-items-center rounded-[8px] border border-white/10 hover:border-electric hover:text-electric" href={import.meta.env.VITE_YOUTUBE_URL || profile.socials.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
              <Youtube size={18} />
            </a>
            <a className="grid h-10 w-10 place-items-center rounded-[8px] border border-white/10 hover:border-electric hover:text-electric" href={import.meta.env.VITE_LINKEDIN_URL || profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-fog">
        (c) {new Date().getFullYear()} {profile.name}. Video Editing & Motion Graphics Portfolio.
      </div>
    </footer>
  );
};

export default Footer;
