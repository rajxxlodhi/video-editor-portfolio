import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { profile } from "../data/profile";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Contact", to: "/contact" }
];

const linkClass = ({ isActive }) =>
  `text-sm font-black uppercase tracking-wide transition hover:text-electric ${isActive ? "text-electric" : "text-white/80"}`;

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="container-page flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-[8px] border border-electric/50 bg-electric/10 text-sm font-black text-electric">
            RL
          </span>
          <span className="text-sm font-black uppercase tracking-[0.22em] text-white">{profile.name}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <NavLink to="/admin" className="ghost-button px-4 py-2">
            Admin
          </NavLink>
          <NavLink to="/contact" className="premium-button px-4 py-2">
            Hire Rajkumar
          </NavLink>
        </div>

        <button
          aria-label={open ? "Close navigation" : "Open navigation"}
          className="grid h-11 w-11 place-items-center rounded-[8px] border border-white/10 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-ink/95 px-4 py-5 lg:hidden">
          <div className="container-page flex flex-col gap-4 px-0">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass} onClick={() => setOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/admin" className="ghost-button mt-2" onClick={() => setOpen(false)}>
              Admin Dashboard
            </NavLink>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
