import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from '../features/authSlice'; // Pastikan path ini benar
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.png'; // Ganti dengan logo LaporanKU jika ada

// Import Material UI Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article'; // Untuk Laporan
import GroupIcon from '@mui/icons-material/Group'; // Untuk Data Karyawan
import ChecklistIcon from '@mui/icons-material/Checklist'; // Untuk Checklist
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; // Untuk Ekspor PDF
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Import ikon untuk sub-menu checklist jika diperlukan (misalnya, Diary, EventNote, CalendarViewMonth)
// Untuk Harian, Mingguan, Bulanan, kita bisa menggunakan ikon generik atau tidak sama sekali seperti di gambar
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'; // Contoh ikon kecil untuk sub-item

const Sidebar = () => {
  const [showChecklistSubMenu, setShowChecklistSubMenu] = useState(false); // Awalnya tertutup
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Mock user jika belum ada dari Redux, sesuaikan dengan struktur data user Anda
  const currentUser = user || {
    username: 'Yani',
    email: 'yani@gmail.com',
    // Jika Anda memiliki field untuk gambar avatar, gunakan itu
    // avatarUrl: 'path/to/yani_avatar.png'
  };

  // Determine active route
  const isActive = (path) => location.pathname === path;
  const isParentActive = (parentPath) => location.pathname.startsWith(parentPath);

  const handleLogout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate('/');
  };

  const toggleChecklistSubMenu = (e) => {
    e.preventDefault();
    setShowChecklistSubMenu(prevState => !prevState);
  };

  useEffect(() => {
    // Buka submenu Checklist jika salah satu item anaknya aktif
    if (isParentActive('/checklist') && !showChecklistSubMenu) {
      setShowChecklistSubMenu(true);
    }
    // Opsi: tutup submenu lain jika ada dan ingin hanya satu yang terbuka
  }, [location.pathname, showChecklistSubMenu]);

  // Fungsi navigasi (opsional, bisa langsung pakai Link)
  const navigateTo = (path) => {
    navigate(path);
  };

  // Ganti warna background dan text utama sidebar di sini jika ingin tema terang
  // Contoh: bg-white text-gray-800
  // Untuk logo: bg-blue-600 text-white
  // Untuk item aktif: bg-blue-500 text-white
  // Untuk item hover: bg-blue-100 text-blue-700

  return (
    // Jika ingin sidebar terang: ubah bg-gray-900 ke bg-white atau bg-gray-100
    // dan text-white ke text-gray-700 atau text-gray-900
    <div className="h-screen w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="flex flex-col text-gray-700 min-h-full">
        {/* Logo */}
        {/* Sesuaikan background logo seperti di gambar (biru) */}
        <div className="flex items-center p-4 border-b border-gray-200 sticky top-0 bg-white-600 text-black z-10">
          {/* Ganti dengan komponen img jika logo LaporanKU adalah gambar */}
          <img src={logoImg} alt="LaporanKU Logo" className="h-8 w-8 mr-2" />
          <span className="font-semibold text-xl">LaporanKU</span>
        </div>

        {/* Main Navigation */}
        <div className="flex flex-col flex-grow p-4 space-y-1">
          {/* MENGELOLA Section Title */}
          <p className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            MENGELOLA
          </p>

          <nav className="space-y-1">
            {/* Dashboard */}
            <Link
              to="/dashboard"
              className={`flex items-center px-4 py-2.5 rounded-md transition-colors duration-200
                          ${isActive('/dashboard')
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-blue-100 hover:text-blue-600'}`}
            >
              <DashboardIcon fontSize="small" />
              <span className="ml-3 text-sm font-medium">Dashboard</span>
            </Link>

            {/* Laporan */}
            <Link
              to="/laporan"
              className={`flex items-center px-4 py-2.5 rounded-md transition-colors duration-200
                          ${isActive('/laporan')
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-blue-100 hover:text-blue-600'}`}
            >
              <ArticleIcon fontSize="small" />
              <span className="ml-3 text-sm font-medium">Laporan</span>
            </Link>

            {/* Data Karyawan */}
            <Link
              to="/data-karyawan"
              className={`flex items-center px-4 py-2.5 rounded-md transition-colors duration-200
                          ${isActive('/data-karyawan')
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-blue-100 hover:text-blue-600'}`}
            >
              <GroupIcon fontSize="small" />
              <span className="ml-3 text-sm font-medium">Data Karyawan</span>
            </Link>

            {/* Checklist Toggle & Submenu */}
            <div>
              <button
                onClick={toggleChecklistSubMenu}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-md transition-colors duration-200
                            ${isParentActive('/checklist') && !showChecklistSubMenu // Jika parent aktif tapi submenu belum terbuka
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-blue-100 hover:text-blue-600'}
                            focus:outline-none`}
                aria-expanded={showChecklistSubMenu}
              >
                <div className="flex items-center">
                  <ChecklistIcon fontSize="small" />
                  <span className="ml-3 text-sm font-medium">Checklist</span>
                </div>
                <div className={`transition-transform duration-300 ${showChecklistSubMenu ? 'rotate-180' : ''}`}>
                  <ExpandMoreIcon fontSize="small" />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ml-4 mt-1 space-y-1 ${showChecklistSubMenu ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <Link
                  to="/checklist/harian"
                  className={`flex items-center pl-7 pr-4 py-2 rounded-md transition-colors duration-200 text-xs
                              ${isActive('/checklist/harian')
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-500 hover:bg-blue-100 hover:text-blue-600'}`}
                >
                  {/* <FiberManualRecordIcon style={{ fontSize: '0.6rem' }} className="mr-2" /> */}
                  Harian
                </Link>
                <Link
                  to="/checklist/mingguan"
                  className={`flex items-center pl-7 pr-4 py-2 rounded-md transition-colors duration-200 text-xs
                              ${isActive('/checklist/mingguan')
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-500 hover:bg-blue-100 hover:text-blue-600'}`}
                >
                  {/* <FiberManualRecordIcon style={{ fontSize: '0.6rem' }} className="mr-2" /> */}
                  Mingguan
                </Link>
                <Link
                  to="/checklist/bulanan"
                  className={`flex items-center pl-7 pr-4 py-2 rounded-md transition-colors duration-200 text-xs
                              ${isActive('/checklist/bulanan')
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-500 hover:bg-blue-100 hover:text-blue-600'}`}
                >
                  {/* <FiberManualRecordIcon style={{ fontSize: '0.6rem' }} className="mr-2" /> */}
                  Bulanan
                </Link>
              </div>
            </div>

            {/* Ekspor PDF */}
            <Link
              to="/export-pdf"
              className={`flex items-center px-4 py-2.5 rounded-md transition-colors duration-200
                          ${isActive('/export-pdf')
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-blue-100 hover:text-blue-600'}`}
            >
              <PictureAsPdfIcon fontSize="small" />
              <span className="ml-3 text-sm font-medium">Ekspor PDF</span>
            </Link>
          </nav>
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* User Profile and Logout */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center mb-3">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0 overflow-hidden">
              {/* Jika ada avatarUrl, gunakan <img>, jika tidak, gunakan inisial */}
              {currentUser.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt="User" className="h-full w-full object-cover" />
              ) : (
                <span className="text-lg font-semibold">{currentUser.username ? currentUser.username.charAt(0).toUpperCase() : 'U'}</span>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">{currentUser.username}</p>
              <p className="text-xs text-gray-500">{currentUser.email}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-red-100 hover:text-red-600 rounded-md transition-colors duration-150 border border-gray-200 hover:border-red-200"
          >
            <LogoutIcon fontSize="small" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;