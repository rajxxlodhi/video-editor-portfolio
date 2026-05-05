const Loader = ({ label = "Loading" }) => (
  <div className="container-page py-14">
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="glass-card h-64 animate-pulse rounded-[8px]">
          <div className="h-36 rounded-t-[8px] bg-white/10" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-1/3 rounded bg-white/10" />
            <div className="h-5 w-3/4 rounded bg-white/10" />
            <div className="h-4 w-full rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
    <p className="mt-6 text-center text-sm text-fog">{label}...</p>
  </div>
);

export default Loader;
