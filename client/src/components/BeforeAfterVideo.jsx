import { useState } from "react";
import { Scissors } from "lucide-react";

const BeforeAfterVideo = ({ beforeVideoUrl, afterVideoUrl }) => {
  const [mode, setMode] = useState(afterVideoUrl ? "after" : "before");
  const src = mode === "before" ? beforeVideoUrl : afterVideoUrl;

  if (!beforeVideoUrl && !afterVideoUrl) {
    return null;
  }

  return (
    <div className="glass-card overflow-hidden rounded-[8px]">
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 p-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-[8px] bg-electric/10 text-electric">
            <Scissors size={18} />
          </span>
          <div>
            <h3 className="font-black text-white">Before / After Preview</h3>
            <p className="text-sm text-fog">Compare the raw cut with the final polish.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 rounded-[8px] border border-white/10 p-1">
          {["before", "after"].map((option) => (
            <button
              key={option}
              className={`rounded-[6px] px-4 py-2 text-sm font-bold capitalize transition ${
                mode === option ? "bg-electric text-ink" : "text-fog hover:text-white"
              }`}
              onClick={() => setMode(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <video key={src} className="aspect-video w-full object-cover" controls preload="metadata">
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

export default BeforeAfterVideo;
