import { X } from "lucide-react";

const VideoModal = ({ project, onClose }) => {
  if (!project) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-ink/90 p-4 backdrop-blur" role="dialog" aria-modal="true">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[8px] border border-white/10 bg-charcoal shadow-soft-black">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-electric">{project.category}</p>
            <h2 className="text-xl font-black text-white">{project.title}</h2>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-[8px] border border-white/10 text-white hover:border-electric" onClick={onClose} type="button" aria-label="Close preview">
            <X size={20} />
          </button>
        </div>
        <video className="aspect-video w-full bg-black object-cover" controls autoPlay preload="metadata" poster={project.thumbnailUrl}>
          <source src={project.videoUrl} type="video/mp4" />
        </video>
        <div className="grid gap-6 p-5 md:grid-cols-3">
          <div>
            <p className="text-sm text-fog">Client</p>
            <p className="font-bold text-white">{project.clientName}</p>
          </div>
          <div>
            <p className="text-sm text-fog">Timeline</p>
            <p className="font-bold text-white">{project.timeline || "Flexible"}</p>
          </div>
          <div>
            <p className="text-sm text-fog">Tools</p>
            <p className="font-bold text-white">{project.toolsUsed?.join(", ") || "Premiere Pro"}</p>
          </div>
          <div className="md:col-span-3">
            <p className="leading-7 text-fog">{project.description}</p>
          </div>
          <div className="md:col-span-3 grid gap-4 md:grid-cols-3">
            <div className="rounded-[8px] border border-white/10 p-4">
              <h3 className="mb-2 font-black text-white">Challenge</h3>
              <p className="text-sm leading-6 text-fog">{project.challenge || "Shape raw footage into a focused story."}</p>
            </div>
            <div className="rounded-[8px] border border-white/10 p-4">
              <h3 className="mb-2 font-black text-white">Edit Process</h3>
              <p className="text-sm leading-6 text-fog">{project.editProcess || "Story pass, picture lock, sound, grade, captions, and exports."}</p>
            </div>
            <div className="rounded-[8px] border border-white/10 p-4">
              <h3 className="mb-2 font-black text-white">Result</h3>
              <p className="text-sm leading-6 text-fog">{project.results || "Delivered a polished final video and platform-ready cutdowns."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
