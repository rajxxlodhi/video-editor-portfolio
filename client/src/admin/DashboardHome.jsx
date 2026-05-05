import { FolderKanban, Inbox, Scissors, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getContacts, getProjects, getServices, getTestimonials } from "../api/client";
import Loader from "../components/Loader";
import SEO from "../components/SEO";

const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [projectRes, serviceRes, testimonialRes, contactRes] = await Promise.all([
          getProjects(),
          getServices(),
          getTestimonials(),
          getContacts()
        ]);

        setStats([
          { label: "Projects", value: projectRes.data.length, icon: FolderKanban },
          { label: "Services", value: serviceRes.data.length, icon: Scissors },
          { label: "Testimonials", value: testimonialRes.data.length, icon: Star },
          { label: "Contacts", value: contactRes.data.length, icon: Inbox }
        ]);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load dashboard stats.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <section className="p-5 sm:p-8">
      <SEO title="Admin Dashboard" description="Portfolio admin dashboard." />
      <div className="mb-8">
        <p className="eyebrow mb-3">Overview</p>
        <h1 className="text-3xl font-black text-white">Dashboard</h1>
      </div>
      {loading ? (
        <Loader label="Loading dashboard" />
      ) : error ? (
        <div className="admin-panel text-red-200">{error}</div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="admin-panel">
                <Icon className="mb-5 text-electric" size={26} />
                <p className="text-4xl font-black text-white">{stat.value}</p>
                <p className="mt-2 text-sm text-fog">{stat.label}</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default DashboardHome;
