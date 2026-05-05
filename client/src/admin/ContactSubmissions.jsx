import { Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { getContacts } from "../api/client";
import Loader from "../components/Loader";
import SEO from "../components/SEO";

const ContactSubmissions = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const { data } = await getContacts();
        setContacts(data);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  return (
    <section className="p-5 sm:p-8">
      <SEO title="Contact Submissions" description="Admin contact submissions." />
      <div className="mb-8">
        <p className="eyebrow mb-3">Inbox</p>
        <h1 className="text-3xl font-black text-white">Contact Submissions</h1>
      </div>
      {loading ? (
        <Loader label="Loading submissions" />
      ) : (
        <div className="grid gap-5">
          {contacts.length ? (
            contacts.map((contact) => (
              <article key={contact._id} className="admin-panel">
                <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-4 md:flex-row">
                  <div>
                    <h2 className="text-xl font-black text-white">{contact.name}</h2>
                    <p className="mt-1 text-sm text-fog">
                      {contact.projectType} - {contact.budget}
                    </p>
                  </div>
                  <p className="text-sm text-fog">{new Date(contact.createdAt).toLocaleString()}</p>
                </div>
                <p className="mt-5 leading-7 text-fog">{contact.message}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a className="ghost-button px-4 py-2" href={`mailto:${contact.email}`}>
                    <Mail size={17} />
                    {contact.email}
                  </a>
                  {contact.phone ? (
                    <a className="ghost-button px-4 py-2" href={`tel:${contact.phone}`}>
                      <Phone size={17} />
                      {contact.phone}
                    </a>
                  ) : null}
                </div>
              </article>
            ))
          ) : (
            <div className="admin-panel text-center text-fog">No contact submissions yet.</div>
          )}
        </div>
      )}
    </section>
  );
};

export default ContactSubmissions;
