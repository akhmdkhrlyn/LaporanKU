import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import logo from "../assets/logo.png";
import illustration from "../assets/illustration.png";
import gambar1 from "../assets/gambar1.png";
import gambar2 from "../assets/gambar2.png";
import gambar3 from "../assets/gambar3.png";
import gambar4 from "../assets/gambar4.png";

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleMobileNavClick = (id) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-md py-4 fixed top-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="LaporanKU Logo" className="h-10 mr-3" />
            <h1 className="text-2xl font-bold text-blue-600">LaporanKU</h1>
          </div>
          {/* Menu Navigasi */}
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection("Home")} className="hover:text-blue-500">
              Home
            </button>
            <button onClick={() => scrollToSection("Tangkapan-Layar")} className="hover:text-blue-500">
              Tangkapan Layar
            </button>
          </nav>
          {/* Login & Register */}
          <div className="hidden md:flex space-x-4">
            <Link to="/login" className="px-4 py-2 text-white bg-blue-500 rounded-lg">
              Masuk
            </Link>
            <Link to="/Register" className="px-4 py-2 text-blue-500 border border-blue-500 rounded-lg">
              Daftar
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-blue-600" />
            ) : (
              <Menu className="h-6 w-6 text-blue-600" />
            )}
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 px-6 shadow-lg">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleMobileNavClick("Home")}
                className="text-left py-2 px-4 hover:bg-blue-50 hover:text-blue-500 rounded-lg"
              >
                Home
              </button>
              <button
                onClick={() => handleMobileNavClick("Tangkapan-Layar")}
                className="text-left py-2 px-4 hover:bg-blue-50 hover:text-blue-500 rounded-lg"
              >
                Tangkapan Layar
              </button>
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                <Link to="/login" className="py-2 px-4 text-center text-white bg-blue-500 rounded-lg">
                  Masuk
                </Link>
                <Link to="/Register" className="py-2 px-4 text-center text-blue-500 border border-blue-500 rounded-lg">
                  Daftar
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main
        id="Home"
        className="flex-grow flex items-center justify-center bg-blue-50 min-h-screen py-0"
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">
          {/* Ilustrasi di kiri */}
          <div className="flex justify-center md:order-1">
            <img src={illustration} alt="Illustration" className="w-full max-w-lg" />
          </div>
          {/* Teks Hero di kanan */}
          <div className="text-center md:text-left md:order-2">
            <h1 className="text-5xl font-bold text-blue-700 leading-tight">
              Aplikasi Laporan untuk Karyawan Utility
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Membantu karyawan dalam reporting, serta memberikan analisis reporting yang terstruktur dan mudah dijalankan.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Masuk
            </Link>
          </div>
        </div>
      </main>

      {/* Tangkapan Layar Section */}
      <section id="Tangkapan-Layar" className="py-24 bg-gray-50">
        <div className="container mx-auto text-center px-6">
          {/* Judul Section */}
          <h3 className="text-2xl font-semibold text-blue-600">Tangkapan Layar</h3>
          <h2 className="text-5xl font-bold text-black leading-tight mt-2">
            Telusuri fitur-fitur utama <span className="text-blue-600">LaporanKU</span>
          </h2>
          {/* Grid Tangkapan Layar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 mt-16">
            {/* Kartu 1 */}
            <div className="bg-white shadow-lg rounded-lg p-4 text-center">
              <div className="bg-gray-200 rounded-lg mb-4 inline-block border border-gray-300">
                <img src={gambar1} alt="Logo LaporanKU" className="w-100 mx-auto h-auto rounded-lg" />
              </div>
              <h4 className="text-2xl font-semibold text-black">Dashboard</h4>
            </div>
            {/* Kartu 2 */}
            <div className="bg-white shadow-lg rounded-lg p-4 text-center">
              <div className="bg-gray-200 rounded-lg mb-4 inline-block border border-gray-300">
                <img src={gambar2} alt="Logo LaporanKU" className="w-100 mx-auto h-auto rounded-lg" />
              </div>
              <h4 className="text-2xl font-semibold text-black">Laporan</h4>
            </div>
            {/* Kartu 3 */}
            <div className="bg-white shadow-lg rounded-lg p-4 text-center">
              <div className="bg-gray-200 rounded-lg mb-4 inline-block border border-gray-300">
                <img src={gambar3} alt="Logo LaporanKU" className="w-100 mx-auto h-auto rounded-lg" />
              </div>
              <h4 className="text-2xl font-semibold text-black">Cheklist</h4>
            </div>
            {/* Kartu 4 */}
            <div className="bg-white shadow-lg rounded-lg p-4 text-center">
              <div className="bg-gray-200 rounded-lg mb-4 inline-block border border-gray-300">
                <img src={gambar4} alt="Logo LaporanKU" className="w-100 mx-auto h-auto rounded-lg" />
              </div>
              <h4 className="text-2xl font-semibold text-black">Eksport to PDF</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright Section */}
      <div className="bg-white text-black text-center py-4">
        <p className="text-sm"> Copyright © LaporanKU 2025. All Rights Reserved. </p>
      </div>
    </div>
  );
};

export default LandingPage;