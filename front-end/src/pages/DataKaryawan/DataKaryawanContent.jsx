// src/pages/DataKaryawanContent.jsx (atau nama file yang sesuai)
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Untuk avatar default
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Data dummy karyawan (ganti dengan data asli dari API)
const dummyKaryawanList = [
  { id: 1, nama: 'Akhmad', lokasi: 'Pasuruan', jabatan: 'Operator Boiler', avatar: null },
  { id: 2, nama: 'Yani', lokasi: 'Pasuruan', jabatan: 'Operator Power House', avatar: null },
  { id: 3, nama: 'Akhmad', lokasi: 'Pasuruan', jabatan: 'Operator Boiler', avatar: null },
  { id: 4, nama: 'Yani', lokasi: 'Pasuruan', jabatan: 'Operator Power House', avatar: null },
  { id: 5, nama: 'Akhmad', lokasi: 'Pasuruan', jabatan: 'Operator Boiler', avatar: null },
  { id: 6, nama: 'Yani', lokasi: 'Pasuruan', jabatan: 'Operator Power House', avatar: null },
  { id: 7, nama: 'Akhmad', lokasi: 'Pasuruan', jabatan: 'Operator Boiler', avatar: null },
  { id: 8, nama: 'Yani', lokasi: 'Pasuruan', jabatan: 'Operator Power House', avatar: null },
  { id: 9, nama: 'Akhmad', lokasi: 'Malang', jabatan: 'Operator Chiller & HVAC', avatar: null },
  { id: 10, nama: 'Budi', lokasi: 'Surabaya', jabatan: 'Supervisor Produksi', avatar: null },
  { id: 11, nama: 'Citra', lokasi: 'Malang', jabatan: 'Staff HRD', avatar: null },
  // Tambahkan lebih banyak data untuk mencapai total 21 atau lebih untuk paginasi
  { id: 12, nama: 'Dewi', lokasi: 'Pasuruan', jabatan: 'Analis Kimia', avatar: null },
  { id: 13, nama: 'Eko', lokasi: 'Surabaya', jabatan: 'Teknisi Listrik', avatar: null },
  { id: 14, nama: 'Fitri', lokasi: 'Malang', jabatan: 'Operator Gudang', avatar: null },
  { id: 15, nama: 'Gilang', lokasi: 'Pasuruan', jabatan: 'Mekanik', avatar: null },
  { id: 16, nama: 'Hana', lokasi: 'Surabaya', jabatan: 'Admin Keuangan', avatar: null },
  { id: 17, nama: 'Indra', lokasi: 'Malang', jabatan: 'IT Support', avatar: null },
  { id: 18, nama: 'Joko', lokasi: 'Pasuruan', jabatan: 'Security', avatar: null },
  { id: 19, nama: 'Kartika', lokasi: 'Surabaya', jabatan: 'Marketing', avatar: null },
  { id: 20, nama: 'Lina', lokasi: 'Malang', jabatan: 'Customer Service', avatar: null },
  { id: 21, nama: 'Made', lokasi: 'Pasuruan', jabatan: 'Operator Forklift', avatar: null },
];

// Komponen untuk Dropdown Aksi per baris
const KaryawanActionDropdown = ({ onEdit, onDelete, onView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-full text-sppa-gray-dark hover:bg-sppa-gray-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sppa-blue"
      >
        <MoreVertIcon fontSize="small" />
      </button>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
        >
          <div className="py-1">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onView(); setIsOpen(false); }}
              className="group flex items-center w-full px-4 py-2 text-sm text-sppa-text-primary hover:bg-sppa-gray-light hover:text-sppa-blue"
            >
              <VisibilityIcon fontSize="small" className="mr-3 text-sppa-gray-dark group-hover:text-sppa-blue" />
              Lihat Detail
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onEdit(); setIsOpen(false); }}
              className="group flex items-center w-full px-4 py-2 text-sm text-sppa-text-primary hover:bg-sppa-gray-light hover:text-sppa-blue"
            >
              <EditIcon fontSize="small" className="mr-3 text-sppa-gray-dark group-hover:text-sppa-blue" />
              Edit Karyawan
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onDelete(); setIsOpen(false); }}
              className="group flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <DeleteIcon fontSize="small" className="mr-3 text-red-500 group-hover:text-red-700" />
              Hapus Karyawan
            </a>
          </div>
        </div>
      )}
    </div>
  );
};


const DataKaryawanContent = () => {
  const [isSectionOpen, setIsSectionOpen] = useState(true); // Default terbuka
  const [karyawanList, setKaryawanList] = useState(dummyKaryawanList);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Jumlah item per halaman, sesuaikan dengan gambar

  // Logika Paginasi
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = karyawanList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(karyawanList.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Handler Aksi (contoh)
  const handleViewKaryawan = (karyawan) => alert(`Melihat detail: ${karyawan.nama}`);
  const handleEditKaryawan = (karyawan) => alert(`Mengedit: ${karyawan.nama}`);
  const handleDeleteKaryawan = (karyawan) => {
    if (window.confirm(`Anda yakin ingin menghapus karyawan "${karyawan.nama}"?`)) {
      setKaryawanList(prev => prev.filter(k => k.id !== karyawan.id));
      // Logika penghapusan data di backend
      alert(`Karyawan ${karyawan.nama} dihapus.`);
    }
  };
  const handleAddKaryawan = () => alert('Buka form tambah karyawan baru');


  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-sppa-gray-light min-h-screen relative">
      {/* Header Halaman Konten
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-sppa-gray-medium">
        <h1 className="text-2xl md:text-3xl font-bold text-sppa-text-primary">
          Data Karyawan
        </h1>
        <div className="flex items-center space-x-2 mt-3 sm:mt-0">
          <button className="p-2 text-sppa-gray-dark hover:text-sppa-blue hover:bg-sppa-gray-light/50 rounded-full focus:outline-none">
            <SearchIcon />
          </button>
          <button className="p-2 text-sppa-gray-dark hover:text-sppa-blue hover:bg-sppa-gray-light/50 rounded-full focus:outline-none">
            <InfoOutlinedIcon />
          </button>
          <button className="p-2 text-sppa-gray-dark hover:text-sppa-blue hover:bg-sppa-gray-light/50 rounded-full focus:outline-none">
            <MoreVertIcon />
          </button>
        </div>
      </div> */}

      {/* Panel Jumlah Karyawan */}
      <div className="bg-white rounded-lg shadow-md">
        <button
          onClick={() => setIsSectionOpen(!isSectionOpen)}
          className="w-full flex justify-between items-center p-4 text-left focus:outline-none focus:ring-2 focus:ring-sppa-blue rounded-t-lg hover:bg-sppa-gray-light/30"
          aria-expanded={isSectionOpen}
        >
          <div className="flex items-center">
            {isSectionOpen ? <KeyboardArrowUpIcon className="mr-2 text-sppa-gray-dark" /> : <KeyboardArrowDownIcon className="mr-2 text-sppa-gray-dark" />}
            <span className="text-lg font-semibold text-sppa-text-primary">Jumlah Karyawan</span>
          </div>
          <span className="text-sm text-sppa-gray-dark">Total: {karyawanList.length} karyawan</span>
        </button>

        {isSectionOpen && (
          <div className="border-t border-sppa-gray-medium">
            {currentItems.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  {/* Tidak ada thead eksplisit di gambar, jadi langsung tbody */}
                  <tbody className="divide-y divide-sppa-gray-medium">
                    {currentItems.map((karyawan) => (
                      <tr key={karyawan.id} className="hover:bg-sppa-gray-light/30 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            {karyawan.avatar ? (
                              <img className="h-8 w-8 rounded-full" src={karyawan.avatar} alt={karyawan.nama} />
                            ) : (
                              <AccountCircleIcon className="h-8 w-8 rounded-full text-sppa-gray-dark" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-sppa-text-primary">{karyawan.nama}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-sppa-gray-dark">{karyawan.lokasi}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-sppa-gray-dark">{karyawan.jabatan}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right">
                          <KaryawanActionDropdown
                            onView={() => handleViewKaryawan(karyawan)}
                            onEdit={() => handleEditKaryawan(karyawan)}
                            onDelete={() => handleDeleteKaryawan(karyawan)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="p-6 text-center text-sm text-sppa-gray-dark">Tidak ada data karyawan.</p>
            )}

            {/* Paginasi */}
            {totalPages > 1 && (
              <div className="px-4 py-3 flex items-center justify-between border-t border-sppa-gray-medium sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-sppa-gray-medium text-sm font-medium rounded-md text-sppa-gray-dark bg-white hover:bg-sppa-gray-light disabled:opacity-50"
                  >
                    Sebelumnya
                  </button>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-sppa-gray-medium text-sm font-medium rounded-md text-sppa-gray-dark bg-white hover:bg-sppa-gray-light disabled:opacity-50"
                  >
                    Berikutnya
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-sppa-gray-dark">
                      Menampilkan <span className="font-medium">{indexOfFirstItem + 1}</span>
                      {' - '}
                      <span className="font-medium">{Math.min(indexOfLastItem, karyawanList.length)}</span>
                      {' dari '}
                      <span className="font-medium">{karyawanList.length}</span> karyawan
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-sppa-gray-medium bg-white text-sm font-medium text-sppa-gray-dark hover:bg-sppa-gray-light disabled:opacity-50"
                      >
                        <span className="sr-only">Sebelumnya</span>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                      {/* Tombol halaman bisa ditambahkan di sini jika diperlukan, atau cukup prev/next */}
                      {/* Contoh:
                      {[...Array(totalPages).keys()].map(num => (
                        <button
                          key={num + 1}
                          onClick={() => paginate(num + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                            ${currentPage === num + 1 ? 'z-10 bg-sppa-blue/10 border-sppa-blue text-sppa-blue' : 'bg-white border-sppa-gray-medium text-sppa-gray-dark hover:bg-sppa-gray-light'}`}
                        >
                          {num + 1}
                        </button>
                      ))}
                      */}
                      <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-sppa-gray-medium bg-white text-sm font-medium text-sppa-gray-dark hover:bg-sppa-gray-light disabled:opacity-50"
                      >
                        <span className="sr-only">Berikutnya</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={handleAddKaryawan}
        title="Tambah Karyawan Baru"
        className="w-16 h-16 fixed bottom-8 right-8 bg-sppa-blue text-black p-4 rounded-full shadow-lg hover:bg-blue-100 transition-colors"
        // className="w-16 h-16 bg-sppa-blue text-gray rounded-full shadow-lg flex items-center justify-center hover:bg-blue-100 transition-colors"
      >
        <AddIcon fontSize="large" />
      </button>
    </div>
  );
};

export default DataKaryawanContent;
