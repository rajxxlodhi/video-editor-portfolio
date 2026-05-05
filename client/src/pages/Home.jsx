import { ArrowRight, ExternalLink, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";
import HeroVideo from "../components/HeroVideo";
import PageTransition from "../components/PageTransition";
import SEO from "../components/SEO";
import { profile, services, skills, tools, whyChooseMe } from "../data/profile";
import { youtubeShorts } from "../data/youtubeShorts";

const getEmbedUrl = (id) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${id}&controls=1&rel=0&modestbranding=1`;

const YouTubeShortCard = ({ short, index }) => (
  <article className="project-strip">
    <div className="container-page grid gap-8 py-14 lg:grid-cols-[0.72fr_1fr] lg:items-center">
      <div className={index % 2 === 1 ? "lg:order-2" : ""}>
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

      <div className={index % 2 === 1 ? "lg:order-1 lg:text-right" : ""}>
        <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-electric">
          YouTube Short #{index + 1}
        </p>
        <h3 className="text-balance break-words text-3xl font-black leading-none text-white sm:text-5xl">
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
);

const Home = () => (
  <PageTransition>
    <SEO
      title={`${profile.name} Portfolio`}
      description="Rajkumar Lodhi video editing and motion graphics portfolio for reels, shorts, ads, cinematic edits, and social content."
    />
    <HeroVideo />

    <section id="who-am-i" className="relative overflow-hidden bg-ink py-20 sm:py-28">
      <div className="small-dot-grid absolute inset-0 opacity-30" />
      <div className="container-page relative grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
        <div className="hidden lg:block">
          <div className="h-px w-48 rotate-[-18deg] bg-white/40" />
          <div className="scribble-note mt-20 inline-block border-accent px-8 py-4 text-sm font-black text-accent">
            Do you want me on project?
          </div>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-white/40">Who am I</p>
          <div className="mt-4 flex flex-wrap items-end gap-x-5 gap-y-2">
            <span className="text-6xl font-black leading-none text-white/30 sm:text-8xl">"</span>
            <h2 className="editorial-mark text-white">
              WHO <span className="outline-word">AM I</span>
            </h2>
          </div>
          <p className="mt-8 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">{profile.intro}</p>
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

    <section className="bg-ink pb-8">
      <div className="container-page border-t border-white/10 pt-12 text-center">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-white/45">Selected Shorts</p>
        <h2 className="mt-3 text-4xl font-black uppercase leading-none text-white sm:text-6xl">
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

    <section className="light-editorial relative overflow-hidden py-24 sm:py-32">
      <div className="container-page relative grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
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

    <section className="bg-ink py-14">
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
