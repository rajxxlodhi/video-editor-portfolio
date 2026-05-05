import { Pencil, Plus, Save, Trash2, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonials,
  updateTestimonial
} from "../api/client";
import SEO from "../components/SEO";
import { uploadToCloudinary } from "./cloudinaryUpload";

const initialForm = {
  clientName: "",
  company: "",
  feedback: "",
  rating: 5,
  videoUrl: "",
  imageUrl: ""
};

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadingField, setUploadingField] = useState("");

  const loadTestimonials = async () => {
    const { data } = await getTestimonials();
    setTestimonials(data);
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: name === "rating" ? Number(value) : value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setMessage("");
  };

  const submit = async (event) => {
    event.preventDefault();
    const successMessage = editingId ? "Testimonial updated." : "Testimonial created.";

    if (editingId) {
      await updateTestimonial(editingId, form);
    } else {
      await createTestimonial(form);
    }

    setForm(initialForm);
    setEditingId(null);
    setMessage(successMessage);
    await loadTestimonials();
  };

  const edit = (testimonial) => {
    setEditingId(testimonial._id);
    setForm({
      clientName: testimonial.clientName,
      company: testimonial.company,
      feedback: testimonial.feedback,
      rating: testimonial.rating,
      videoUrl: testimonial.videoUrl || "",
      imageUrl: testimonial.imageUrl || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id) => {
    if (!confirm("Delete this testimonial?")) return;
    await deleteTestimonial(id);
    await loadTestimonials();
  };

  const uploadFile = async (event, field, resourceType) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingField(field);
    setMessage("");
    try {
      const uploaded = await uploadToCloudinary(file, resourceType);
      setForm((current) => ({ ...current, [field]: uploaded.secure_url }));
      setMessage(`${field} uploaded.`);
    } catch (error) {
      setMessage(error.message || "Upload failed. Check Cloudinary env variables.");
    } finally {
      setUploadingField("");
    }
  };

  return (
    <section className="p-5 sm:p-8">
      <SEO title="Manage Testimonials" description="Admin testimonial management." />
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-3">Testimonials</p>
          <h1 className="text-3xl font-black text-white">Manage Testimonials</h1>
        </div>
        <button className="ghost-button" onClick={resetForm} type="button">
          <Plus size={18} />
          New Testimonial
        </button>
      </div>

      <form className="admin-panel mb-8" onSubmit={submit}>
        <div className="grid gap-4 md:grid-cols-2">
          <input className="input-field" name="clientName" placeholder="Client name" value={form.clientName} onChange={updateField} required />
          <input className="input-field" name="company" placeholder="Company or channel" value={form.company} onChange={updateField} required />
          <select className="input-field" name="rating" value={form.rating} onChange={updateField}>
            {[5, 4, 3, 2, 1].map((rating) => (
              <option key={rating} value={rating}>{rating} stars</option>
            ))}
          </select>
          <input className="input-field" name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={updateField} />
          <label className="ghost-button cursor-pointer justify-start">
            <UploadCloud size={18} />
            {uploadingField === "imageUrl" ? "Uploading image..." : "Upload image"}
            <input className="hidden" type="file" accept="image/*" onChange={(event) => uploadFile(event, "imageUrl", "image")} />
          </label>
          <input className="input-field" name="videoUrl" placeholder="Video testimonial URL" value={form.videoUrl} onChange={updateField} />
          <label className="ghost-button cursor-pointer justify-start md:col-span-2">
            <UploadCloud size={18} />
            {uploadingField === "videoUrl" ? "Uploading video..." : "Upload video testimonial"}
            <input className="hidden" type="file" accept="video/*" onChange={(event) => uploadFile(event, "videoUrl", "video")} />
          </label>
        </div>
        <textarea className="input-field mt-4 min-h-32" name="feedback" placeholder="Feedback" value={form.feedback} onChange={updateField} required />
        {message ? <p className="mt-4 text-sm text-electric">{message}</p> : null}
        <button className="premium-button mt-5" type="submit">
          <Save size={18} />
          {editingId ? "Update Testimonial" : "Create Testimonial"}
        </button>
      </form>

      <div className="admin-panel overflow-x-auto p-0">
        <table className="w-full min-w-[760px] border-collapse">
          <thead>
            <tr className="text-fog">
              <th className="table-cell">Client</th>
              <th className="table-cell">Company</th>
              <th className="table-cell">Rating</th>
              <th className="table-cell">Video</th>
              <th className="table-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial) => (
              <tr key={testimonial._id}>
                <td className="table-cell font-bold text-white">{testimonial.clientName}</td>
                <td className="table-cell text-fog">{testimonial.company}</td>
                <td className="table-cell text-fog">{testimonial.rating}</td>
                <td className="table-cell text-fog">{testimonial.videoUrl ? "Yes" : "No"}</td>
                <td className="table-cell">
                  <div className="flex gap-2">
                    <button className="ghost-button px-3 py-2" onClick={() => edit(testimonial)} type="button" aria-label="Edit testimonial">
                      <Pencil size={16} />
                    </button>
                    <button className="ghost-button px-3 py-2 hover:border-red-400 hover:text-red-200" onClick={() => remove(testimonial._id)} type="button" aria-label="Delete testimonial">
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

export default ManageTestimonials;
