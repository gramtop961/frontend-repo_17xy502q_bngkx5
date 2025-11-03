export default function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div className="mx-auto max-w-2xl w-full rounded-lg border border-red-500/30 bg-red-500/10 text-red-200 px-4 py-3 text-sm">
      {message}
    </div>
  );
}
