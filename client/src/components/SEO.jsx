import { useEffect } from "react";

const SEO = ({ title, description }) => {
  useEffect(() => {
    document.title = title ? `${title} | Cinematic Editor` : "Cinematic Editor Portfolio";

    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) {
      meta.setAttribute("content", description);
    }
  }, [title, description]);

  return null;
};

export default SEO;
