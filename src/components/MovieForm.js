import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate

export default function MovieForm({ onMovieAdded }) {
  const [formData, setFormData] = useState({
    originalTitle: "",
    originalLanguage: "",
    overview: "",
    posterPath: "",
    releaseDate: "",
  });
  const navigate = useNavigate(); // hook to navigate programmatically

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Movie saved successfully!");
        setFormData({
          originalTitle: "",
          originalLanguage: "",
          overview: "",
          posterPath: "",
          releaseDate: "",
        });
        navigate("/"); // <-- replace with your movie list route

        if (onMovieAdded) onMovieAdded(); // refresh list
      } else {
        alert("Failed to save movie");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-xl rounded-xl p-8 mb-8">
  <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">🎥 Add Movie</h2>
  <form onSubmit={handleSubmit} className="space-y-5">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Original Title</label>
      <input
        type="text"
        name="originalTitle"
        value={formData.originalTitle}
        onChange={handleChange}
        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 border placeholder-gray-400"
        placeholder="Enter movie title"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Original Language</label>
      <input
        type="text"
        name="originalLanguage"
        value={formData.originalLanguage}
        onChange={handleChange}
        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 border placeholder-gray-400"
        placeholder="Enter language"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Overview</label>
      <textarea
        name="overview"
        value={formData.overview}
        onChange={handleChange}
        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 border placeholder-gray-400"
        rows="4"
        placeholder="Write a brief overview"
        required
      ></textarea>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Poster Path (URL)</label>
      <input
        type="text"
        name="posterPath"
        value={formData.posterPath}
        onChange={handleChange}
        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 border placeholder-gray-400"
        placeholder="https://example.com/poster.jpg"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Release Date</label>
      <input
        type="date"
        name="releaseDate"
        value={formData.releaseDate}
        onChange={handleChange}
        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 border"
        required
      />
    </div>

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-800 transition duration-300"
    >
      Save Movie
    </button>
  </form>
</div>

  );
}
