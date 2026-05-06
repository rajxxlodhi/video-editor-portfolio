const SectionHeader = ({ eyebrow, title, description, align = "left", tone = "dark" }) => (
  <div className={align === "center" ? "mx-auto mb-8 max-w-3xl text-center sm:mb-10" : "mb-8 max-w-3xl sm:mb-10"}>
    {eyebrow ? <p className={`eyebrow mb-3 ${tone === "light" ? "text-electric" : ""}`}>{eyebrow}</p> : null}
    <h2 className={`text-balance text-3xl font-black leading-tight sm:text-4xl lg:text-5xl ${tone === "light" ? "text-softtext" : "text-white"}`}>
      {title}
    </h2>
    {description ? (
      <p className={`mt-4 text-base leading-7 sm:text-lg ${tone === "light" ? "text-fog" : "text-fog"}`}>
        {description}
      </p>
    ) : null}
  </div>
);

export default SectionHeader;
