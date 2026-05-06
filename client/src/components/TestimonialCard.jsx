import { Play, Star } from "lucide-react";

const TestimonialCard = ({ testimonial }) => (
  <article className="cinema-card overflow-hidden">
    {testimonial.videoUrl ? (
      <div className="relative aspect-video">
        <video
          className="h-full w-full object-cover"
          controls
          preload="metadata"
          poster={testimonial.imageUrl}
        >
          <source src={testimonial.videoUrl} type="video/mp4" />
        </video>
        <span className="pointer-events-none absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-ink/70 text-electric backdrop-blur">
          <Play size={16} fill="currentColor" />
        </span>
      </div>
    ) : (
      <img src={testimonial.imageUrl} alt={testimonial.clientName} className="h-56 w-full object-cover" loading="lazy" />
    )}
    <div className="p-5 sm:p-6">
      <div className="mb-4 flex gap-1 text-electric">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <Star key={index} size={17} fill="currentColor" />
        ))}
      </div>
      <p className="leading-7 text-fog">"{testimonial.feedback}"</p>
      <div className="mt-5 border-t border-white/10 pt-5 sm:mt-6">
        <h3 className="font-black text-white">{testimonial.clientName}</h3>
        <p className="text-sm text-fog">{testimonial.company}</p>
      </div>
    </div>
  </article>
);

export default TestimonialCard;
