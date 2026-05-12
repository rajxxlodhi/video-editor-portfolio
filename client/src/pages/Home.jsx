import { ExternalLink, Mail } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";
import HeroVideo from "../components/HeroVideo";
import PageTransition from "../components/PageTransition";
import SEO from "../components/SEO";
import { profile, services, skills, tools, whyChooseMe } from "../data/profile";
import { featuredVideo, youtubeShorts } from "../data/youtubeShorts";

const getEmbedUrl = (id) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${id}&controls=1&rel=0&modestbranding=1`;

const getWideEmbedUrl = (id) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${id}&controls=1&rel=0&modestbranding=1`;

const LazyShortFrame = ({ short, eager }) => {
  const frameRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(eager);

  useEffect(() => {
    if (shouldLoad) return undefined;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "480px 0px" }
    );

    if (frameRef.current) observer.observe(frameRef.current);

    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={frameRef} className="project-phone mx-auto aspect-[9/16] w-full max-w-[19.5rem] overflow-hidden bg-ink sm:max-w-[20.625rem]">
      {shouldLoad ? (
        <iframe
          className="h-full w-full"
          src={getEmbedUrl(short.id)}
          title={short.title}
          loading={eager ? "eager" : "lazy"}
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-neutral-950 text-xs font-black uppercase tracking-[0.22em] text-white/45">
          Loading edit
        </div>
      )}
    </div>
  );
};

const YouTubeShortCard = memo(({ short, index }) => (
  <article className="project-strip">
    <div className="container-page grid gap-7 py-10 sm:gap-8 sm:py-12 lg:grid-cols-[0.72fr_1fr] lg:items-center lg:py-14">
      <div className={index % 2 === 1 ? "lg:order-2" : ""}>
        <LazyShortFrame short={short} eager={index < 2} />
      </div>

      <div className={index % 2 === 1 ? "lg:order-1 lg:text-right" : ""}>
        <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-electric">
          YouTube Short #{index + 1}
        </p>
        <h3 className="text-balance break-words text-3xl font-black leading-none text-white sm:text-4xl lg:text-5xl">
          {short.title}
        </h3>
        <p className="mt-5 max-w-xl text-sm leading-7 text-white/60 lg:text-base">
          Muted autoplay embed added from your submitted Shorts link.
        </p>
        <a
          className={`mt-7 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-white hover:text-electric ${
            index % 2 === 1 ? "lg:justify-end" : ""
          }`}
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
));

YouTubeShortCard.displayName = "YouTubeShortCard";

const Home = () => (
  <PageTransition>
    <SEO
      title={`${profile.name} Portfolio`}
      description="Rajkumar Lodhi video editing and motion graphics portfolio for reels, shorts, ads, cinematic edits, and social content."
    />
    <HeroVideo />

    <section className="section-padding bg-ink">
      <div className="container-page">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-electric">Main Video</p>
          <h2 className="mt-3 text-balance text-3xl font-black uppercase leading-none text-white sm:text-4xl lg:text-5xl">
            {featuredVideo.title}
          </h2>
        </div>

        <div className="overflow-hidden rounded-[8px] border border-electric/20 bg-black shadow-soft-black">
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full"
              src={getWideEmbedUrl(featuredVideo.id)}
              title={featuredVideo.title}
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <a
            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-white hover:text-electric"
            href={featuredVideo.url}
            target="_blank"
            rel="noreferrer"
          >
            Open original
            <ExternalLink size={17} />
          </a>
        </div>
      </div>
    </section>

    <section id="who-am-i" className="section-padding relative overflow-hidden bg-ink">
      <div className="small-dot-grid absolute inset-0 opacity-30" />
      <div className="container-page relative grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-10">
        <div className="hidden lg:block">
          <div className="h-px w-48 rotate-[-18deg] bg-white/40" />
          <div className="scribble-note mt-20 inline-block border-accent px-8 py-4 text-sm font-black text-accent">
            Do you want me on project?
          </div>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-white/40">Who am I</p>
          <div className="mt-4 flex flex-wrap items-end gap-x-4 gap-y-2 sm:gap-x-5">
            <span className="text-5xl font-black leading-none text-white/30 sm:text-7xl lg:text-8xl">"</span>
            <h2 className="editorial-mark text-white">
              WHO <span className="outline-word">AM I</span>
            </h2>
          </div>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/65 sm:mt-8 sm:text-lg">{profile.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {skills.slice(0, 7).map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-electric/20 px-4 py-2 text-xs font-black uppercase tracking-wide text-fog"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="bg-ink py-10 sm:py-12">
      <div className="container-page border-t border-white/10 pt-10 text-center sm:pt-12">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-white/45">Selected Shorts</p>
        <h2 className="mt-3 text-4xl font-black uppercase leading-none text-white sm:text-5xl lg:text-6xl">
          My Videos
        </h2>
        <div className="mx-auto mt-3 h-px w-48 rotate-[-7deg] bg-white/70" />
      </div>
    </section>

    <section>
      {youtubeShorts.map((short, index) => (
        <YouTubeShortCard key={`${short.id}-${index}`} short={short} index={index} />
      ))}
    </section>

    <section className="section-padding light-editorial relative overflow-hidden">
      <div className="container-page relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-electric">Workflow</p>
          <h2 className="repeat-title mt-5">
            Edit.
            <br />
            Deliver.
            <br />
            Repeat.
          </h2>
          <div className="scribble-note mt-7 inline-block border-accent px-7 py-3 text-sm font-black text-accent">
            Ready to make scroll-stopping edits? Let's roll.
          </div>
        </div>
        <div className="grid gap-5">
          <div className="rounded-[8px] border border-electric/20 bg-ink p-6 text-white shadow-soft-black">
            <h3 className="text-2xl font-black">Why choose me?</h3>
            <div className="mt-5 grid gap-3">
              {whyChooseMe.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-bold text-fog">
                  <span className="h-2 w-2 rounded-full bg-electric" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.slice(0, 4).map((service) => (
              <Link
                key={service.title}
                to={`/contact?service=${encodeURIComponent(service.title)}`}
                className="rounded-[8px] border border-electric/20 bg-white/[0.06] p-5 text-softtext transition hover:-translate-y-1 hover:border-accent hover:shadow-soft-black"
              >
                <h3 className="text-xl font-black leading-tight">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-fog">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="bg-ink py-12 sm:py-14">
      <div className="container-page flex flex-col items-center gap-5 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-primary-gradient text-ink">
          <Mail size={20} />
        </span>
        <h2 className="text-xl font-black text-white">{profile.headline}</h2>
        <p className="text-sm text-white/55">
          {profile.email} / {profile.phone}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {tools.map((tool) => (
            <span key={tool} className="rounded-full border border-white/12 px-3 py-1 text-xs font-bold text-white/60">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>

    <CTASection
      title="Want this style for your brand, reel, short, or ad?"
      description="Send your raw clips and idea. Rajkumar will turn it into a clean, modern, platform-ready edit."
      primaryLabel="Contact Rajkumar"
    />
  </PageTransition>
);

export default Home;
