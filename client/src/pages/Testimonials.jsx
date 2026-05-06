import { useEffect, useState } from "react";
import { getTestimonials } from "../api/client";
import CTASection from "../components/CTASection";
import Loader from "../components/Loader";
import PageTransition from "../components/PageTransition";
import SectionHeader from "../components/SectionHeader";
import SEO from "../components/SEO";
import TestimonialCard from "../components/TestimonialCard";
import { testimonials as localTestimonials } from "../data/profile";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(localTestimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const { data } = await getTestimonials();
        if (data?.length) {
          setTestimonials(data);
        }
      } catch (err) {
        setTestimonials(localTestimonials);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  return (
    <PageTransition>
      <SEO title="Testimonials" description="Client feedback for Rajkumar Lodhi video editing, reels, shorts, and promotional videos." />
      <section className="portfolio-hero page-hero">
        <div className="container-page pb-14 pt-8 sm:pb-16 sm:pt-10 md:pb-20 lg:pb-24">
          <SectionHeader
            eyebrow="Testimonials"
            title="Feedback from creators and brands."
            description="Short-form editing, promotional videos, trend-based cuts, and social media-ready delivery."
            align="center"
            tone="light"
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          {loading ? <Loader label="Loading testimonials" /> : null}
          {!loading ? (
            <div className="grid gap-5 md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial._id || testimonial.clientName} testimonial={testimonial} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <CTASection title="Let the next testimonial be about your project." />
    </PageTransition>
  );
};

export default Testimonials;
