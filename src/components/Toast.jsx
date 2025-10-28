import { useApp } from "../context/AppContext";

export default function Toast() {
  const { toasts } = useApp();

  return (
    <div className="fixed right-4 bottom-4 flex flex-col gap-2 z-50">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-2 rounded-lg text-white shadow ${
            t.type === "error"
              ? "bg-red-600"
              : t.type === "success"
              ? "bg-green-600"
              : "bg-gray-800"
          }`}
        >
          {t.msg}
        </div>
      ))}
    </div>
  );
}
