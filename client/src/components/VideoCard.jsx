import { ArrowUpRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const VideoCard = ({ project, onPreview }) => (
  <motion.article
    layout
    className="cinema-card group overflow-hidden"
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.35 }}
  >
    <button className="relative block aspect-video w-full overflow-hidden text-left" onClick={() => onPreview?.(project)} type="button">
      <img
        src={project.thumbnailUrl}
        alt={`${project.title} thumbnail`}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-80" />
      <div className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-bold uppercase tracking-wide text-electric backdrop-blur">
        {project.category}
      </div>
      <div className="absolute inset-0 grid place-items-center opacity-0 transition group-hover:opacity-100">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-electric text-ink shadow-glow">
          <Play size={22} fill="currentColor" />
        </span>
      </div>
    </button>
    <div className="p-4 sm:p-5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-sm text-fog">{project.clientName}</p>
        {project.featured ? <span className="text-xs font-bold uppercase tracking-wide text-violet">Featured</span> : null}
      </div>
      <h3 className="text-xl font-black text-white">{project.title}</h3>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-fog">{project.description}</p>
      <Link to={`/portfolio/${project.slug || project._id}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-electric">
        Case study
        <ArrowUpRight size={16} />
      </Link>
    </div>
  </motion.article>
);

export default VideoCard;
