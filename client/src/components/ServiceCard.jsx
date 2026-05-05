import {
  Clapperboard,
  Film,
  Heart,
  Megaphone,
  Palette,
  Scissors,
  Smartphone,
  Sparkles,
  Youtube
} from "lucide-react";
import { Link } from "react-router-dom";

const iconMap = {
  Clapperboard,
  Film,
  Heart,
  Megaphone,
  Palette,
  Scissors,
  Smartphone,
  Sparkles,
  Youtube
};

const ServiceCard = ({ service }) => {
  const Icon = iconMap[service.icon] || Scissors;

  return (
    <article className="cinema-card flex h-full flex-col p-6">
      <div className="mb-6 grid h-12 w-12 place-items-center rounded-[8px] border border-electric/40 bg-electric/10 text-electric">
        <Icon size={23} />
      </div>
      <h3 className="text-2xl font-black text-white">{service.title}</h3>
      <p className="mt-4 flex-1 leading-7 text-fog">{service.description}</p>
      <div className="my-6 grid gap-3 border-y border-white/10 py-5 text-sm text-fog">
        <span>Delivery: <strong className="text-white">{service.deliveryTime}</strong></span>
        <span>Revisions: <strong className="text-white">{service.revisions}</strong></span>
        <span>Price: <strong className="text-white">{service.price}</strong></span>
      </div>
      <Link to={`/contact?service=${encodeURIComponent(service.title)}`} className="premium-button w-full">
        Book This Service
      </Link>
    </article>
  );
};

export default ServiceCard;
