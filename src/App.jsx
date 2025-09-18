import React, { useState, useEffect, useRef } from "react";
import { FiDownload, FiHeart, FiUser, FiMenu, FiBell } from "react-icons/fi";

// ================== Sample Video Data ==================
const sampleVideos = [
  {
    id: 1,
    url: "https://player.cloudinary.com/embed/?cloud_name=dzndd4g6x&public_id=WIN_20250416_12_50_57_Pro_cu6crk&profile=cld-default",
    title: { en: "React Basics", hi: "React की मूल बातें" },
    description: { en: "Learn the basics of React.", hi: "React की मूल बातें सीखें।" },
    instructor: "John Doe",
    category: "maths",
    difficulty: "class 1",
    duration: "2h 30m",
    popularity: 5,
  },
  {
    id: 2,
    url: "https://player.cloudinary.com/embed/?cloud_name=dzndd4g6x&public_id=WIN_20250416_12_50_57_Pro_cu6crk&profile=cld-default",
    title: { en: "JavaScript Fundamentals", hi: "JavaScript मूल बातें" },
    description: { en: "Master JS fundamentals.", hi: "JS मूल बातें सीखें।" },
    instructor: "Jane Smith",
    category: "physics",
    difficulty: "class 2",
    duration: "3h 0m",
    popularity: 4,
  },
  {
    id: 3,
    url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    title: { en: "CSS Flexbox", hi: "CSS Flexbox" },
    description: { en: "Learn Flexbox layout.", hi: "Flexbox लेआउट सीखें।" },
    instructor: "Alice Johnson",
    category: "social",
    difficulty: "class 1",
    duration: "1h 45m",
    popularity: 3,
  },
];

// ================== Hero Section ==================
const Hero = () => {
  const images = [
   "https://wpvip.edutopia.org/wp-content/uploads/2022/10/hero-blog-technology-integration-preschool-photo-istock-1389944291-PeopleImages.jpg","https://imgeng.jagran.com/images/2023/aug/Edtech20231692191712768.jpg","https://media.carnegie.org/filer_public/3a/21/3a212837-842b-453d-afaa-6d01d753e1b1/three-questions-about-edtech-to-ask-your-kids-teacher-and-action-steps-to-take-now-c28f5c981ef1_-_1.jpeg",
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg mb-6">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <h1 className="text-3xl md:text-5xl text-white font-bold text-center">
          Learn Anytime, Anywhere
        </h1>
      </div>
    </div>
  );
};

// ================== Language Switcher ==================
const LanguageSwitcher = ({ language, setLanguage }) => (
  <select
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
    className="border px-2 py-1 rounded-lg"
  >
    <option value="en">English</option>
    <option value="hi">हिंदी</option>
  </select>
);

// ================== Navbar ==================
const Navbar = ({ searchTerm, setSearchTerm, language, setLanguage }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <FiMenu className="md:hidden text-2xl cursor-pointer" onClick={() => setOpen(!open)} />
        <div className="text-2xl font-bold text-blue-600">E-Tech</div>
      </div>
      <div className={`flex-1 mx-6 ${open ? "block" : "hidden"} md:block`}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={language === "en" ? "Search courses..." : "कोर्स खोजें..."}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex items-center space-x-4">
        <LanguageSwitcher language={language} setLanguage={setLanguage} />
        <FiBell className="text-xl cursor-pointer" />
        <FiUser className="text-xl cursor-pointer" />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          {language === "en" ? "Login" : "लॉगिन"}
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          {language === "en" ? "Register" : "रजिस्टर"}
        </button>
      </div>
    </nav>
  );
};

// ================== Video Card with Hover Effects & Autoplay ==================
const VideoCard = ({ video, language }) => {
  const [wishlist, setWishlist] = useState(false);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);

  const isCloudinary = video.url.includes("cloudinary.com/embed");

  useEffect(() => {
    if (!isCloudinary && videoRef.current) {
      if (hovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [hovered, isCloudinary]);

  // Cloudinary autoplay by appending autoplay param
  const cloudinaryUrl = isCloudinary
    ? `${video.url}&autoplay=${hovered ? "true" : "false"}`
    : video.url;

  return (
    <div
      className="relative bg-white shadow-md rounded-lg overflow-hidden border-2 border-transparent transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-blue-400"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isCloudinary ? (
        <iframe
          src={cloudinaryUrl}
          className="w-full h-48 md:h-56 lg:h-48"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          title={video.title[language]}
        ></iframe>
      ) : (
        <video
          ref={videoRef}
          src={video.url}
          controls
          muted
          className="w-full h-48 object-cover"
        ></video>
      )}

      

      <div className="p-4 flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{video.title[language]}</h3>
          <FiHeart
            className={`cursor-pointer ${wishlist ? "text-red-500" : "text-gray-400"}`}
            onClick={() => setWishlist(!wishlist)}
          />
        </div>
        <p className="text-gray-500">{video.description[language]}</p>
        <p className="text-sm text-gray-600">
          {language === "en" ? "Instructor" : "अध्यापक"}: {video.instructor}
        </p>
        <p className="text-sm text-gray-600">
          {video.category} | {video.difficulty} | {video.duration}
        </p>
        {!isCloudinary && (
          <a
            href={video.url}
            download
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-2"
          >
            <FiDownload className="mr-2" />
            {language === "en" ? "Download" : "डाउनलोड"}
          </a>
        )}
      </div>

     
    </div>
  );
};

// ================== Video Grid ==================
const VideoGrid = ({ videos, language }) => (
  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {videos.map((video) => (
      <VideoCard key={video.id} video={video} language={language} />
    ))}
  </div>
);

// ================== Category Tabs ==================
const CategoryTabs = ({ categories, selectedCategory, setSelectedCategory, language }) => (
  <div className="flex flex-wrap gap-4 mb-6">
    <button
      onClick={() => setSelectedCategory("")}
      className={`px-4 py-2 rounded-lg ${
        selectedCategory === "" ? "bg-blue-500 text-white" : "bg-gray-200"
      }`}
    >
      {language === "en" ? "All" : "सभी"}
    </button>
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => setSelectedCategory(cat)}
        className={`px-4 py-2 rounded-lg ${
          selectedCategory === cat ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
);

// ================== Filters ==================
const Filters = ({ filters, setFilters, language }) => {
  const difficulties = ["class 1", "class 2", "class 3", "class 4", "Advanced"];

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <select
        value={filters.difficulty}
        onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
        className="border px-2 py-1 rounded-lg"
      >
        <option value="">{language === "en" ? "All Levels" : "सभी स्तर"}</option>
        {difficulties.map((diff) => (
          <option key={diff} value={diff}>
            {diff}
          </option>
        ))}
      </select>
    </div>
  );
};

// ================== Footer ==================
const Footer = ({ language }) => (
  <footer className="bg-gray-800 text-white py-6 mt-12">
    <div className="container mx-auto text-center">
      <p>&copy; 2025 E-Tech. {language === "en" ? "All rights reserved." : "सभी अधिकार सुरक्षित हैं।"}</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="#" className="hover:underline">Facebook</a>
        <a href="#" className="hover:underline">Twitter</a>
        <a href="#" className="hover:underline">LinkedIn</a>
      </div>
    </div>
  </footer>
);

// ================== Main App ==================
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("en");
  const [filters, setFilters] = useState({ difficulty: "" });
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [...new Set(sampleVideos.map((v) => v.category))];

  const filteredVideos = sampleVideos
    .filter((video) =>
      video.title[language].toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((video) => (selectedCategory ? video.category === selectedCategory : true))
    .filter((video) => (filters.difficulty ? video.difficulty === filters.difficulty : true));

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        language={language}
        setLanguage={setLanguage}
      />
      <main className="p-6">
        <Hero />
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          language={language}
        />
        <Filters filters={filters} setFilters={setFilters} language={language} />
        <VideoGrid videos={filteredVideos} language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
}

export default App;
