export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div
      className={`fixed top-5 right-5 px-5 py-3 rounded-lg shadow-lg text-white 
      ${
        toast.type === "error" ? "bg-red-600" : "bg-green-600"
      } animate-fade`}
    >
      {toast.msg}
    </div>
  );
}
