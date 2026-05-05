import { useEffect, useMemo, useState } from "react";
import { getProjects } from "../api/client";
import CTASection from "../components/CTASection";
import Loader from "../components/Loader";
import PageTransition from "../components/PageTransition";
import ProjectGrid from "../components/ProjectGrid";
import SectionHeader from "../components/SectionHeader";
import SEO from "../components/SEO";
import VideoModal from "../components/VideoModal";
import { projects as localProjects, profile } from "../data/profile";

const Portfolio = () => {
  const [projects, setProjects] = useState(localProjects);
  const [activeCategory, setActiveCategory] = useState("All");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { data } = await getProjects();
        if (data?.length) {
          setProjects(data);
        }
      } catch (err) {
        setProjects(localProjects);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((project) => project.category))).filter(Boolean)],
    [projects]
  );

  const filteredProjects = useMemo(
    () => (activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)),
    [activeCategory, projects]
  );

  const caseStudy = filteredProjects[0] || projects[0];

  return (
    <PageTransition>
      <SEO
        title={`${profile.name} Selected Work`}
        description="Rajkumar Lodhi selected video editing projects for reels, shorts, ads, cinematic edits, and motion graphics."
      />
      <section className="portfolio-hero pt-32">
        <div className="container-page section-padding">
          <SectionHeader
            eyebrow="Portfolio"
            title="Selected Work"
            description="Browse social edits, promotional videos, product concepts, motion graphics, and short-form editing work."
            align="center"
            tone="light"
          />
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`rounded-[8px] border px-4 py-2 text-sm font-bold transition ${
                  activeCategory === category
                    ? "border-electric bg-electric text-ink"
                    : "border-black/15 text-black/70 hover:border-black hover:text-black"
                }`}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          {loading ? <Loader label="Loading portfolio" /> : null}
          {!loading ? <ProjectGrid projects={filteredProjects} onPreview={setPreview} /> : null}
        </div>
      </section>

      {caseStudy ? (
        <section className="section-padding bg-[#202020]">
          <div className="container-page">
            <SectionHeader
              eyebrow="Case study"
              title={caseStudy.title}
              description={caseStudy.description}
            />
            <div className="grid gap-5 md:grid-cols-3">
              <div className="glass-card rounded-[8px] p-6">
                <h3 className="mb-3 text-xl font-black text-white">Challenge</h3>
                <p className="leading-7 text-fog">{caseStudy.challenge}</p>
              </div>
              <div className="glass-card rounded-[8px] p-6">
                <h3 className="mb-3 text-xl font-black text-white">Edit Process</h3>
                <p className="leading-7 text-fog">{caseStudy.editProcess}</p>
              </div>
              <div className="glass-card rounded-[8px] p-6">
                <h3 className="mb-3 text-xl font-black text-white">Tools & Result</h3>
                <p className="leading-7 text-fog">{caseStudy.toolsUsed?.join(", ")}</p>
                <p className="mt-4 leading-7 text-fog">{caseStudy.results}</p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <CTASection />
      <VideoModal project={preview} onClose={() => setPreview(null)} />
    </PageTransition>
  );
};

export default Portfolio;
