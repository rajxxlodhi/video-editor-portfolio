import VideoCard from "./VideoCard";

const ProjectGrid = ({ projects = [], onPreview }) => {
  if (!projects.length) {
    return (
      <div className="glass-card rounded-[8px] p-10 text-center text-fog">
        No projects found for this category.
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {projects.map((project) => (
        <VideoCard key={project._id || project.slug} project={project} onPreview={onPreview} />
      ))}
    </div>
  );
};

export default ProjectGrid;
