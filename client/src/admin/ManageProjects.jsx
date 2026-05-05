import { Pencil, Plus, Save, Trash2, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import { createProject, deleteProject, getProjects, updateProject } from "../api/client";
import SEO from "../components/SEO";
import { uploadToCloudinary } from "./cloudinaryUpload";

const categories = ["YouTube", "Ads", "Reels", "Wedding", "Corporate", "Music Video"];

const initialForm = {
  title: "",
  slug: "",
  category: "YouTube",
  clientName: "",
  description: "",
  videoUrl: "",
  thumbnailUrl: "",
  beforeVideoUrl: "",
  afterVideoUrl: "",
  toolsUsed: "CapCut Pro, Premiere Pro, After Effects",
  timeline: "",
  challenge: "",
  editProcess: "",
  results: "",
  featured: false
};

const normalizeProject = (form) => ({
  ...form,
  toolsUsed: form.toolsUsed
    .split(",")
    .map((tool) => tool.trim())
    .filter(Boolean),
  featured: Boolean(form.featured)
});

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadingField, setUploadingField] = useState("");

  const loadProjects = async () => {
    const { data } = await getProjects();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setMessage("");
  };

  const submit = async (event) => {
    event.preventDefault();
    const payload = normalizeProject(form);
    const successMessage = editingId ? "Project updated." : "Project created.";

    if (editingId) {
      await updateProject(editingId, payload);
    } else {
      await createProject(payload);
    }

    setForm(initialForm);
    setEditingId(null);
    setMessage(successMessage);
    await loadProjects();
  };

  const edit = (project) => {
    setEditingId(project._id);
    setForm({
      ...initialForm,
      ...project,
      toolsUsed: project.toolsUsed?.join(", ") || "",
      featured: Boolean(project.featured)
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id) => {
    if (!confirm("Delete this project?")) return;
    await deleteProject(id);
    await loadProjects();
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
      <SEO title="Manage Projects" description="Admin project management." />
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-3">Portfolio</p>
          <h1 className="text-3xl font-black text-white">Manage Projects</h1>
        </div>
        <button className="ghost-button" onClick={resetForm} type="button">
          <Plus size={18} />
          New Project
        </button>
      </div>

      <form className="admin-panel mb-8" onSubmit={submit}>
        <div className="grid gap-4 md:grid-cols-2">
          <input className="input-field" name="title" placeholder="Title" value={form.title} onChange={updateField} required />
          <input className="input-field" name="slug" placeholder="Slug" value={form.slug} onChange={updateField} />
          <select className="input-field" name="category" value={form.category} onChange={updateField}>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <input className="input-field" name="clientName" placeholder="Client name" value={form.clientName} onChange={updateField} required />
          <input className="input-field" name="timeline" placeholder="Timeline" value={form.timeline} onChange={updateField} />
          <input className="input-field" name="toolsUsed" placeholder="Tools used, comma separated" value={form.toolsUsed} onChange={updateField} />
          <input className="input-field" name="thumbnailUrl" placeholder="Thumbnail URL" value={form.thumbnailUrl} onChange={updateField} required />
          <label className="ghost-button cursor-pointer justify-start">
            <UploadCloud size={18} />
            {uploadingField === "thumbnailUrl" ? "Uploading thumbnail..." : "Upload thumbnail"}
            <input className="hidden" type="file" accept="image/*" onChange={(event) => uploadFile(event, "thumbnailUrl", "image")} />
          </label>
          <input className="input-field" name="videoUrl" placeholder="Video URL" value={form.videoUrl} onChange={updateField} required />
          <label className="ghost-button cursor-pointer justify-start">
            <UploadCloud size={18} />
            {uploadingField === "videoUrl" ? "Uploading video..." : "Upload video"}
            <input className="hidden" type="file" accept="video/*" onChange={(event) => uploadFile(event, "videoUrl", "video")} />
          </label>
          <input className="input-field" name="beforeVideoUrl" placeholder="Before video URL" value={form.beforeVideoUrl} onChange={updateField} />
          <label className="ghost-button cursor-pointer justify-start">
            <UploadCloud size={18} />
            {uploadingField === "beforeVideoUrl" ? "Uploading before..." : "Upload before"}
            <input className="hidden" type="file" accept="video/*" onChange={(event) => uploadFile(event, "beforeVideoUrl", "video")} />
          </label>
          <input className="input-field" name="afterVideoUrl" placeholder="After video URL" value={form.afterVideoUrl} onChange={updateField} />
          <label className="ghost-button cursor-pointer justify-start">
            <UploadCloud size={18} />
            {uploadingField === "afterVideoUrl" ? "Uploading after..." : "Upload after"}
            <input className="hidden" type="file" accept="video/*" onChange={(event) => uploadFile(event, "afterVideoUrl", "video")} />
          </label>
        </div>
        <textarea className="input-field mt-4 min-h-28" name="description" placeholder="Description" value={form.description} onChange={updateField} required />
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <textarea className="input-field min-h-28" name="challenge" placeholder="Challenge" value={form.challenge} onChange={updateField} />
          <textarea className="input-field min-h-28" name="editProcess" placeholder="Edit process" value={form.editProcess} onChange={updateField} />
          <textarea className="input-field min-h-28" name="results" placeholder="Results" value={form.results} onChange={updateField} />
        </div>
        <label className="mt-4 flex items-center gap-3 text-sm font-bold text-fog">
          <input type="checkbox" name="featured" checked={form.featured} onChange={updateField} />
          Featured project
        </label>
        {message ? <p className="mt-4 text-sm text-electric">{message}</p> : null}
        <button className="premium-button mt-5" type="submit">
          <Save size={18} />
          {editingId ? "Update Project" : "Create Project"}
        </button>
      </form>

      <div className="admin-panel overflow-x-auto p-0">
        <table className="w-full min-w-[760px] border-collapse">
          <thead>
            <tr className="text-fog">
              <th className="table-cell">Project</th>
              <th className="table-cell">Category</th>
              <th className="table-cell">Client</th>
              <th className="table-cell">Featured</th>
              <th className="table-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td className="table-cell font-bold text-white">{project.title}</td>
                <td className="table-cell text-fog">{project.category}</td>
                <td className="table-cell text-fog">{project.clientName}</td>
                <td className="table-cell text-fog">{project.featured ? "Yes" : "No"}</td>
                <td className="table-cell">
                  <div className="flex gap-2">
                    <button className="ghost-button px-3 py-2" onClick={() => edit(project)} type="button" aria-label="Edit project">
                      <Pencil size={16} />
                    </button>
                    <button className="ghost-button px-3 py-2 hover:border-red-400 hover:text-red-200" onClick={() => remove(project._id)} type="button" aria-label="Delete project">
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

export default ManageProjects;
