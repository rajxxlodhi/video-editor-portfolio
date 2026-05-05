import { useEffect, useState } from "react";
import { getServices } from "../api/client";
import CTASection from "../components/CTASection";
import Loader from "../components/Loader";
import PageTransition from "../components/PageTransition";
import SectionHeader from "../components/SectionHeader";
import SEO from "../components/SEO";
import ServiceCard from "../components/ServiceCard";
import { services as localServices } from "../data/profile";

const Services = () => {
  const [services, setServices] = useState(localServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const { data } = await getServices();
        if (data?.length) {
          setServices(data);
        }
      } catch (err) {
        setServices(localServices);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return (
    <PageTransition>
      <SEO title="Services" description="Rajkumar Lodhi video editing services for Instagram Reels, YouTube Shorts, promotional videos, cinematic editing, and thumbnails." />
      <section className="light-editorial pt-32">
        <div className="container-page section-padding">
          <SectionHeader
            eyebrow="Services"
            title="Editing services built for short-form speed and cinematic finish."
            description="Reels, Shorts, ads, cinematic edits, thumbnails, social media creatives, and AI-assisted video workflows."
            align="center"
            tone="light"
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          {loading ? <Loader label="Loading services" /> : null}
          {!loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service._id || service.title} service={service} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <CTASection
        title="Send the footage. Get a sharp, modern edit."
        description="Rajkumar can help with reels, shorts, promos, cinematic cuts, and thumbnails."
      />
    </PageTransition>
  );
};

export default Services;
