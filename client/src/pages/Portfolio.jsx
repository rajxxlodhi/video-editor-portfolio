import { ExternalLink } from "lucide-react";
import CTASection from "../components/CTASection";
import PageTransition from "../components/PageTransition";
import SectionHeader from "../components/SectionHeader";
import SEO from "../components/SEO";
import { profile } from "../data/profile";
import { portfolioShorts } from "../data/youtubeShorts";

const getEmbedUrl = (id) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${id}&controls=1&rel=0&modestbranding=1`;

const PortfolioShort = ({ short, index }) => {
  const flip = index % 2 === 1;

  return (
    <article className="project-strip">
      <div className="container-page grid gap-8 py-14 lg:grid-cols-[0.72fr_1fr] lg:items-center">
        <div className={flip ? "lg:order-2" : ""}>
          <div className="project-phone mx-auto aspect-[9/16] w-full max-w-[330px] overflow-hidden bg-ink">
            <iframe
              className="h-full w-full"
              src={getEmbedUrl(short.id)}
              title={short.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        <div className={flip ? "lg:order-1 lg:text-right" : ""}>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-electric">
            Portfolio Short #{index + 1}
          </p>
          <h2 className="text-balance break-words text-4xl font-black leading-none text-white sm:text-6xl">
            {short.title}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/60 lg:text-base">
            Autoplaying muted YouTube Short from Rajkumar Lodhi's editing portfolio.
          </p>
          <a
            className="mt-7 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-white hover:text-electric"
            href={short.url}
            target="_blank"
            rel="noreferrer"
          >
            Open original
            <ExternalLink size={17} />
          </a>
        </div>
      </div>
    </article>
  );
};

const Portfolio = () => (
  <PageTransition>
    <SEO
      title={`${profile.name} Portfolio`}
      description="Rajkumar Lodhi portfolio videos with autoplaying YouTube Shorts for reels, shorts, ads, and cinematic edits."
    />

    <section className="portfolio-hero pt-32">
      <div className="container-page section-padding">
        <SectionHeader
          eyebrow="Portfolio"
          title="Selected Work"
          description="Autoplaying short-form edits, reels, promotional videos, and motion-style content."
          align="center"
          tone="light"
        />
      </div>
    </section>

    <section>
      {portfolioShorts.map((short, index) => (
        <PortfolioShort key={`${short.id}-${index}`} short={short} index={index} />
      ))}
    </section>

    <CTASection
      title="Want an edit like these?"
      description="Send your footage, idea, and platform. Rajkumar will turn it into a clean, modern short-form edit."
      primaryLabel="Contact Rajkumar"
    />
  </PageTransition>
);

export default Portfolio;
