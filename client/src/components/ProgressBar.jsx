export default function ProgressBar({ progress }) {
  if (progress === 0) return null;

  return (
    <div className="mt-4 w-full bg-gray-300 h-3 rounded-lg overflow-hidden">
      <div
        className="bg-indigo-600 h-full transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
