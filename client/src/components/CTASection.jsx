import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = ({
  title = "Ready to turn your next edit into a signature piece?",
  description = "Send the footage, goals, and deadline. I will map the story, style, and delivery plan.",
  primaryLabel = "Hire Me",
  primaryTo = "/contact",
  secondaryLabel = "View Portfolio",
  secondaryTo = "/portfolio"
}) => (
  <section className="section-padding">
    <div className="container-page">
      <div className="relative overflow-hidden rounded-[8px] border border-electric/30 bg-graphite p-6 shadow-glow sm:p-8 lg:p-12">
        <div className="absolute inset-0 bg-radial-cinema opacity-80" />
        <div className="relative z-10 max-w-4xl">
          <p className="eyebrow mb-3 sm:mb-4">Book the edit</p>
          <h2 className="text-balance text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-fog sm:mt-5 sm:text-lg">{description}</p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <Link className="premium-button" to={primaryTo}>
              <Mail size={18} />
              {primaryLabel}
            </Link>
            <Link className="ghost-button" to={secondaryTo}>
              {secondaryLabel}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
