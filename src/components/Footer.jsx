export default function Footer() {
  return (
    <footer id="contact" className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-sm text-zinc-600">
              Built with love for explorers. © {new Date().getFullYear()} Near Me.
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              Tip: If you see a gray background, add your Mapbox token to enable the 3D scene.
            </p>
          </div>
          <div className="text-sm text-zinc-600">
            <a
              className="hover:text-zinc-900 transition-colors"
              href="mailto:hello@example.com"
            >
              hello@example.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
