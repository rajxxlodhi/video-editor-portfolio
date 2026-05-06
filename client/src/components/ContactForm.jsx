import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { submitContact } from "../api/client";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  message: ""
};

const ContactForm = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const service = searchParams.get("service");
    if (service) {
      setForm((current) => ({ ...current, projectType: service }));
    }
  }, [searchParams]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await submitContact(form);
      setStatus({ type: "success", message: "Your inquiry was sent. I will reply soon." });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Something went wrong. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="glass-card rounded-[8px] p-5 sm:p-6 lg:p-7" onSubmit={submit}>
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        <input className="input-field" name="name" placeholder="Name" value={form.name} onChange={updateField} required />
        <input className="input-field" name="email" placeholder="Email" type="email" value={form.email} onChange={updateField} required />
        <input className="input-field" name="phone" placeholder="Phone" value={form.phone} onChange={updateField} />
        <input className="input-field" name="projectType" placeholder="Project type" value={form.projectType} onChange={updateField} required />
        <select className="input-field" name="budget" value={form.budget} onChange={updateField} required>
          <option value="">Budget</option>
          <option value="Need quote">Need quote</option>
          <option value="Under Rs 2,000">Under Rs 2,000</option>
          <option value="Rs 2,000-Rs 5,000">Rs 2,000-Rs 5,000</option>
          <option value="Rs 5,000-Rs 15,000">Rs 5,000-Rs 15,000</option>
          <option value="Rs 15,000+">Rs 15,000+</option>
        </select>
      </div>
      <textarea
        className="input-field mt-3 min-h-36 sm:mt-4 sm:min-h-40"
        name="message"
        placeholder="Tell me about the footage, deadline, platforms, and style."
        value={form.message}
        onChange={updateField}
        required
      />
      {status.message ? (
        <div className={`mt-4 rounded-[8px] border px-4 py-3 text-sm ${status.type === "success" ? "border-electric/30 bg-electric/10 text-electric" : "border-red-400/30 bg-red-500/10 text-red-200"}`}>
          {status.message}
        </div>
      ) : null}
      <button className="premium-button mt-4 w-full sm:mt-5" disabled={loading} type="submit">
        {loading ? "Sending..." : "Send Project Inquiry"}
      </button>
    </form>
  );
};

export default ContactForm;
