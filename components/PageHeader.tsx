interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export function PageHeader({
  title,
  subtitle,
  backgroundImage,
}: PageHeaderProps) {
  const bgImage =
    backgroundImage || "/erp/EducatorLeaderShipSummit2025Cover.jpg";

  return (
    <section
      className="relative bg-linear-to-br from-teal-600 to-blue-600 dark:from-teal-800 dark:to-blue-800 py-20 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(13, 148, 136, 0.9), rgba(37, 99, 235, 0.9)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          {subtitle && (
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
