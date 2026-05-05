const SectionHeader = ({ eyebrow, title, description, align = "left", tone = "dark" }) => (
  <div className={align === "center" ? "mx-auto mb-10 max-w-3xl text-center" : "mb-10 max-w-3xl"}>
    {eyebrow ? <p className={`eyebrow mb-3 ${tone === "light" ? "text-black/55" : ""}`}>{eyebrow}</p> : null}
    <h2 className={`text-balance text-3xl font-black leading-tight sm:text-4xl lg:text-5xl ${tone === "light" ? "text-black" : "text-white"}`}>
      {title}
    </h2>
    {description ? (
      <p className={`mt-4 text-base leading-7 sm:text-lg ${tone === "light" ? "text-black/65" : "text-fog"}`}>
        {description}
      </p>
    ) : null}
  </div>
);

export default SectionHeader;
