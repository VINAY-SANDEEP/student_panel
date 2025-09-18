import React from "react";
import { FiQuoteLeft } from "react-icons/fi";

// Responsive Quote Cards
// - Grid: 1 -> 2 -> 4 columns (mobile -> tablet -> desktop)
// - Hover: smooth lift + shadow animation
// - Profile/logo images
// - Quote icon for visual consistency

const cards = [
  {
    id: 1,
    name: "Ananya Sharma",
    role: "Product Designer",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3&s=1",
    quote:
      "Design is not just what it looks like and feels like. Design is how it works.",
  },
  {
    id: 2,
    name: "Rohit Verma",
    role: "Frontend Engineer",
    avatar:
      "https://images.unsplash.com/photo-1531123414780-fb6f42e39b7b?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3&s=2",
    quote:
      "I love taking complex problems and turning them into simple, beautiful interfaces.",
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Data Scientist",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3&s=3",
    quote:
      "Data tells a story. My job is to listen and translate it into action.",
  },
  {
    id: 4,
    name: "Karan Malhotra",
    role: "CTO",
    avatar:
      "https://images.unsplash.com/photo-1541534401786-5f2c6f1b0d73?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3&s=4",
    quote:
      "Technology is best when it brings people together.",
  },
];

export default function Card() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
          What people say
        </h2>

        {/* Grid: cols -> 1 on small, 2 on md, 4 on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c) => (
            <article
              key={c.id}
              className="group relative bg-white rounded-2xl p-6 pt-14 overflow-hidden border border-transparent
                transition-transform duration-300 ease-out transform hover:-translate-y-2
                hover:shadow-2xl"
            >
              {/* Quote Icon Top-left */}
              <div className="absolute -top-6 left-6">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center shadow-sm">
                  <FiQuoteLeft className="text-indigo-600 w-5 h-5" />
                </div>
              </div>

              {/* Profile / Logo - overlapping */}
              <div className="absolute -top-10 right-6">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-white shadow-md">
                  <img
                    src={c.avatar}
                    alt={`${c.name} avatar`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Card content */}
              <p className="text-gray-700 mb-4 leading-relaxed">“{c.quote}”</p>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-900">{c.name}</h3>
                <p className="text-xs text-gray-500">{c.role}</p>
              </div>

              {/* Decorative animated shadow / glow (subtle) */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden
              >
                <div className="absolute -inset-1 blur-2xl bg-gradient-to-r from-indigo-200 via-transparent to-indigo-200 opacity-30" />
              </div>
            </article>
          ))}
        </div>

        {/* Small help text */}
        <p className="mt-6 text-xs text-gray-500">
          Responsive layout: 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop). Hover a card to see the lift + shadow animation.
        </p>
      </div>
    </div>
  );
}
