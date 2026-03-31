export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-bold mb-2">EventNear</h1>
      <p className="text-gray-400 text-lg mb-8">
        Describe your ideal night. We'll find it.
      </p>
      <div className="w-full max-w-xl">
        <input
          className="w-full bg-gray-800 text-white rounded-xl px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g. something chill and cheap this weekend..."
        />
        <button className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition">
          Find Events
        </button>
      </div>
    </div>
  );
}