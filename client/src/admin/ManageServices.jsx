import { Pencil, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createService, deleteService, getServices, updateService } from "../api/client";
import SEO from "../components/SEO";

const iconOptions = ["Clapperboard", "Youtube", "Smartphone", "Megaphone", "Heart", "Palette", "Sparkles", "Scissors", "Film"];

const initialForm = {
  title: "",
  description: "",
  deliveryTime: "",
  revisions: "",
  price: "",
  icon: "Scissors"
};

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const loadServices = async () => {
    const { data } = await getServices();
    setServices(data);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setMessage("");
  };

  const submit = async (event) => {
    event.preventDefault();
    const successMessage = editingId ? "Service updated." : "Service created.";

    if (editingId) {
      await updateService(editingId, form);
    } else {
      await createService(form);
    }

    setForm(initialForm);
    setEditingId(null);
    setMessage(successMessage);
    await loadServices();
  };

  const edit = (service) => {
    setEditingId(service._id);
    setForm({
      title: service.title,
      description: service.description,
      deliveryTime: service.deliveryTime,
      revisions: service.revisions,
      price: service.price,
      icon: service.icon
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id) => {
    if (!confirm("Delete this service?")) return;
    await deleteService(id);
    await loadServices();
  };

  return (
    <section className="p-5 sm:p-8">
      <SEO title="Manage Services" description="Admin service management." />
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-3">Services</p>
          <h1 className="text-3xl font-black text-white">Manage Services</h1>
        </div>
        <button className="ghost-button" onClick={resetForm} type="button">
          <Plus size={18} />
          New Service
        </button>
      </div>

      <form className="admin-panel mb-8" onSubmit={submit}>
        <div className="grid gap-4 md:grid-cols-2">
          <input className="input-field" name="title" placeholder="Title" value={form.title} onChange={updateField} required />
          <select className="input-field" name="icon" value={form.icon} onChange={updateField}>
            {iconOptions.map((icon) => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
          <input className="input-field" name="deliveryTime" placeholder="Delivery time" value={form.deliveryTime} onChange={updateField} required />
          <input className="input-field" name="revisions" placeholder="Revisions" value={form.revisions} onChange={updateField} required />
          <input className="input-field md:col-span-2" name="price" placeholder="Starting price placeholder" value={form.price} onChange={updateField} required />
        </div>
        <textarea className="input-field mt-4 min-h-32" name="description" placeholder="Description" value={form.description} onChange={updateField} required />
        {message ? <p className="mt-4 text-sm text-electric">{message}</p> : null}
        <button className="premium-button mt-5" type="submit">
          <Save size={18} />
          {editingId ? "Update Service" : "Create Service"}
        </button>
      </form>

      <div className="admin-panel overflow-x-auto p-0">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr className="text-fog">
              <th className="table-cell">Service</th>
              <th className="table-cell">Delivery</th>
              <th className="table-cell">Revisions</th>
              <th className="table-cell">Price</th>
              <th className="table-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td className="table-cell font-bold text-white">{service.title}</td>
                <td className="table-cell text-fog">{service.deliveryTime}</td>
                <td className="table-cell text-fog">{service.revisions}</td>
                <td className="table-cell text-fog">{service.price}</td>
                <td className="table-cell">
                  <div className="flex gap-2">
                    <button className="ghost-button px-3 py-2" onClick={() => edit(service)} type="button" aria-label="Edit service">
                      <Pencil size={16} />
                    </button>
                    <button className="ghost-button px-3 py-2 hover:border-red-400 hover:text-red-200" onClick={() => remove(service._id)} type="button" aria-label="Delete service">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageServices;
