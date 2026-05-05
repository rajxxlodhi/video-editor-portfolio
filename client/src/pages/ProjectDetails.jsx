import { ArrowLeft, Clock, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProject, getProjects } from "../api/client";
import BeforeAfterVideo from "../components/BeforeAfterVideo";
import CTASection from "../components/CTASection";
import Loader from "../components/Loader";
import PageTransition from "../components/PageTransition";
import ProjectGrid from "../components/ProjectGrid";
import SectionHeader from "../components/SectionHeader";
import SEO from "../components/SEO";
import VideoModal from "../components/VideoModal";
import { projects as localProjects } from "../data/profile";

const ProjectDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      setLoading(true);
      try {
        const { data } = await getProject(slug);
        setProject(data);
        const relatedRes = await getProjects({ category: data.category, limit: 3 });
        setRelated(relatedRes.data.filter((item) => item._id !== data._id));
      } catch (err) {
        const localProject = localProjects.find((item) => item.slug === slug || item._id === slug);
        if (localProject) {
          setProject(localProject);
          setRelated(localProjects.filter((item) => item.slug !== localProject.slug && item.category === localProject.category).slice(0, 3));
          setError("");
        } else {
          setError(err.response?.data?.message || "Unable to load project.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [slug]);

  const tools = useMemo(() => project?.toolsUsed || [], [project]);

  if (loading) {
    return <Loader label="Loading project" />;
  }

  if (error || !project) {
    return (
      <PageTransition>
        <section className="container-page section-padding pt-32">
          <div className="glass-card rounded-[8px] p-8 text-center text-red-200">{error || "Project not found."}</div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <SEO title={project.title} description={project.description} />
      <section className="portfolio-hero pt-32">
        <div className="container-page section-padding">
          <Link to="/portfolio" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-electric">
            <ArrowLeft size={17} />
            Back to work
          </Link>
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div className="text-black">
              <p className="eyebrow mb-4">{project.category}</p>
              <h1 className="text-balance text-4xl font-black leading-tight sm:text-6xl">{project.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-black/70">{project.description}</p>
            </div>
            <div className="grid gap-3 rounded-[8px] border border-black/10 bg-white/60 p-5 text-black">
              <p className="text-sm text-black/65">Client: <strong className="text-black">{project.clientName}</strong></p>
              <p className="flex items-center gap-2 text-sm text-black/65">
                <Clock size={16} />
                Timeline: <strong className="text-black">{project.timeline}</strong>
              </p>
              <p className="flex items-center gap-2 text-sm text-black/65">
                <Sparkles size={16} />
                Tools: <strong className="text-black">{tools.join(", ")}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <div className="glass-card overflow-hidden rounded-[8px]">
            <video className="aspect-video w-full bg-black object-cover" controls preload="metadata" poster={project.thumbnailUrl}>
              <source src={project.videoUrl} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#202020]">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="glass-card rounded-[8px] p-6">
              <h2 className="mb-4 text-2xl font-black text-white">Challenge</h2>
              <p className="leading-7 text-fog">{project.challenge}</p>
            </div>
            <div className="glass-card rounded-[8px] p-6">
              <h2 className="mb-4 text-2xl font-black text-white">Edit Process</h2>
              <p className="leading-7 text-fog">{project.editProcess}</p>
            </div>
            <div className="glass-card rounded-[8px] p-6">
              <h2 className="mb-4 text-2xl font-black text-white">Results</h2>
              <p className="leading-7 text-fog">{project.results}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <BeforeAfterVideo beforeVideoUrl={project.beforeVideoUrl} afterVideoUrl={project.afterVideoUrl} />
        </div>
      </section>

      {related.length ? (
        <section className="section-padding bg-[#202020]">
          <div className="container-page">
            <SectionHeader eyebrow="Related projects" title="More work in this category." />
            <ProjectGrid projects={related} onPreview={setPreview} />
          </div>
        </section>
      ) : null}

      <CTASection title="Need an edit with this level of finish?" />
      <VideoModal project={preview} onClose={() => setPreview(null)} />
    </PageTransition>
  );
};

export default ProjectDetails;
