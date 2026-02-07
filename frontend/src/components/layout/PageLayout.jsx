export default function PageLayout({ title, children, className = "" }) {
  return (
    <div className={`min-h-screen bg-slate-50`}>
      <main className={`max-w-4xl mx-auto px-4 sm:px-6 py-8 ${className}`}>
        {title && (
          <h1 className="text-2xl font-bold text-slate-900 mb-8">{title}</h1>
        )}
        {children}
      </main>
    </div>
  );
}
