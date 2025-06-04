import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Add from '@mui/icons-material/Add';

// Modal Form Tambah Laporan Baru
const AddLaporanModal = ({ open, onClose, onSave }) => {
  const [form, setForm] = useState({
    title: "",
    date: "",
    status: "Baru",
  });

  React.useEffect(() => {
    if (!open) {
      setForm({ title: "", date: "", status: "Baru" });
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-30"
      style={{ background: "rgba(0,0,0,0.15)" }}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-auto animate-fadeIn">
        <div className="p-5">
          <h2 className="text-xl font-bold mb-5 text-gray-800">Tambah Laporan Baru</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1.5 text-gray-700">Judul Laporan</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Judul laporan"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1.5 text-gray-700">Tanggal</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1.5 text-gray-700">Status</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
            >
              <option value="Baru">Baru</option>
              <option value="Menunggu Persetujuan">Menunggu Persetujuan</option>
              <option value="Dalam Investigasi">Dalam Investigasi</option>
            </select>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="px-4 py-2.5 mr-3 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
              onClick={() => {
                onSave(form);
                setForm({ title: "", date: "", status: "Baru" });
              }}
              disabled={!form.title || !form.date}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SelesaiLaporanModal = ({ open, onClose, laporanList, onSelesai }) => {
  const [selectedId, setSelectedId] = useState("");

  React.useEffect(() => {
    if (!open) setSelectedId("");
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-30"
      style={{ background: "rgba(0,0,0,0.15)" }}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-auto animate-fadeIn">
        <div className="p-5">
          <h2 className="text-xl font-bold mb-5 text-gray-800">Selesaikan Laporan</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1.5 text-gray-700">Pilih Laporan</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2.5"
              value={selectedId}
              onChange={e => setSelectedId(e.target.value)}
            >
              <option value="">-- Pilih Laporan --</option>
              {laporanList.map(l => (
                <option key={l.id} value={l.id}>
                  {l.title} ({l.date})
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="px-4 py-2.5 mr-3 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
              onClick={() => {
                onSelesai(selectedId);
              }}
              disabled={!selectedId}
            >
              Tandai Selesai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal Approve Laporan
const ApproveLaporanModal = ({ open, onClose, laporanList, onApprove }) => {
  const [selectedId, setSelectedId] = useState("");

  React.useEffect(() => {
    if (!open) setSelectedId("");
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-30"
      style={{ background: "rgba(0,0,0,0.15)" }}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-auto animate-fadeIn">
        <div className="p-5">
          <h2 className="text-xl font-bold mb-5 text-gray-800">Setujui Laporan</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1.5 text-gray-700">Pilih Laporan</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2.5"
              value={selectedId}
              onChange={e => setSelectedId(e.target.value)}
            >
              <option value="">-- Pilih Laporan --</option>
              {laporanList.map(l => (
                <option key={l.id} value={l.id}>
                  {l.title} ({l.date})
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="px-4 py-2.5 mr-3 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
              onClick={() => {
                onApprove(selectedId);
              }}
              disabled={!selectedId}
            >
              Setujui
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen untuk satu item di dalam panel yang diperluas
const ReportListItem = ({ title, date, status }) => (
  <div className="flex justify-between items-center p-3 hover:bg-sppa-gray-light/50 border-b border-sppa-gray-medium last:border-b-0">
    <div>
      <p className="text-sm font-medium text-sppa-text-primary">{title}</p>
      <p className="text-xs text-sppa-gray-dark">Tanggal: {date}</p>
    </div>
    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${status === 'Selesai' ? 'bg-blue-100 text-blue-700' :
      status === 'Disetujui' ? 'bg-blue-100 text-blue-700' :
        'bg-yellow-100 text-yellow-700'
      }`}>
      {status}
    </span>
  </div>
);

// Komponen untuk panel yang bisa diperluas/diciutkan
const CollapsibleSection = ({ title, totalCount, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-lg shadow-md mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left focus:outline-none focus:ring-2 focus:ring-sppa-blue rounded-t-lg hover:bg-sppa-gray-light/30"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          {icon && React.cloneElement(icon, { className: "mr-3 text-sppa-blue" })}
          <span className="text-lg font-semibold text-sppa-text-primary">{title}</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-sppa-gray-dark mr-3">Total: {totalCount} laporan</span>
          {isOpen ? <KeyboardArrowUpIcon className="text-sppa-gray-dark" /> : <KeyboardArrowDownIcon className="text-sppa-gray-dark" />}
        </div>
      </button>
      {isOpen && (
        <div className="border-t border-sppa-gray-medium p-0">
          {children ? children : <p className="p-4 text-sm text-sppa-gray-dark">Tidak ada data untuk ditampilkan.</p>}
        </div>
      )}
    </div>
  );
};

const LaporanPageContent = () => {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showAddLaporanModal, setShowAddLaporanModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);

  const [jumlahLaporanData, setJumlahLaporanData] = useState([
    { id: 1, title: "Laporan Audit Keuangan Q1", date: "15 Apr 2025", status: "Menunggu Persetujuan" },
    { id: 2, title: "Laporan Insiden Keamanan IT", date: "10 Mei 2025", status: "Dalam Investigasi" },
    { id: 3, title: "Laporan Progres Proyek Alpha", date: "20 Mei 2025", status: "Baru" },
    // ... tambahkan 14 data lainnya
  ]);

  const [laporanSelesaiData, setLaporanSelesaiData] = useState([
    { id: 101, title: "Laporan Evaluasi Kinerja Karyawan 2024", date: "01 Mar 2025", status: "Selesai" },
    { id: 102, title: "Laporan Penjualan Tahunan 2024", date: "15 Feb 2025", status: "Selesai" },
    // ... tambahkan 2 data lainnya
  ]);

  const [laporanDisetujuiData, setLaporanDisetujuiData] = useState([
    { id: 201, title: "Pengajuan Anggaran Pemasaran Q2", date: "05 Apr 2025", status: "Disetujui" },
    { id: 202, title: "Permintaan Pembelian Peralatan Kantor", date: "12 Apr 2025", status: "Disetujui" },
    // ... tambahkan 7 data lainnya
  ]);

  const [showSelesaiModal, setShowSelesaiModal] = useState(false);
  const handleAddMenuClick = (action) => {
    setShowAddMenu(false);
    if (action === "tambah") {
      setShowAddLaporanModal(true);
    } else if (action === "disetujui") {
      setShowApproveModal(true);
    } else if (action === "selesai") {
      setShowSelesaiModal(true);
    }
  };

  const handleSelesaiLaporan = (laporanId) => {
    const laporan = jumlahLaporanData.find(l => l.id === Number(laporanId));
    if (laporan) {
      setJumlahLaporanData(jumlahLaporanData.filter(l => l.id !== laporan.id));
      setLaporanSelesaiData([
        ...laporanSelesaiData,
        { ...laporan, status: "Selesai" }
      ]);
    }
    setShowSelesaiModal(false);
  };

  const handleSaveLaporanBaru = (form) => {
    setJumlahLaporanData([
      ...jumlahLaporanData,
      {
        id: Date.now(),
        title: form.title,
        date: form.date,
        status: form.status,
      },
    ]);
    setShowAddLaporanModal(false);
  };

  const handleApproveLaporan = (laporanId) => {
    const laporan = jumlahLaporanData.find(l => l.id === Number(laporanId));
    if (laporan) {
      setJumlahLaporanData(jumlahLaporanData.filter(l => l.id !== laporan.id));
      setLaporanDisetujuiData([
        ...laporanDisetujuiData,
        { ...laporan, status: "Disetujui" }
      ]);
    }
    setShowApproveModal(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-sppa-gray-light min-h-screen">
      {/* Header Halaman Konten Utama
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-sppa-gray-medium">
        <h1 className="text-2xl md:text-3xl font-bold text-sppa-text-primary">
          Laporan
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

      {/* Daftar Seksi Laporan */}
      <div>
        <CollapsibleSection
          title="Jumlah Laporan"
          totalCount={jumlahLaporanData.length}
          icon={<FolderOpenIcon />}
          defaultOpen={true}
        >
          {jumlahLaporanData.length > 0 ? (
            jumlahLaporanData.slice(0, 5).map(item => <ReportListItem key={item.id} {...item} />)
          ) : (
            <p className="p-4 text-sm text-sppa-gray-dark">Tidak ada laporan.</p>
          )}
          {jumlahLaporanData.length > 5 && (
            <div className="p-3 text-center border-t border-sppa-gray-medium">
              <a href="#" className="text-sm font-medium text-sppa-blue hover:underline">Lihat Semua ({jumlahLaporanData.length})</a>
            </div>
          )}
        </CollapsibleSection>

        <CollapsibleSection
          title="Laporan Selesai"
          totalCount={laporanSelesaiData.length}
          icon={<CheckCircleOutlineIcon />}
        >
          {laporanSelesaiData.length > 0 ? (
            laporanSelesaiData.map(item => <ReportListItem key={item.id} {...item} />)
          ) : (
            <p className="p-4 text-sm text-sppa-gray-dark">Tidak ada laporan yang selesai.</p>
          )}
        </CollapsibleSection>

        <CollapsibleSection
          title="Laporan yang Disetujui"
          totalCount={laporanDisetujuiData.length}
          icon={<ThumbUpOffAltIcon />}
        >
          {laporanDisetujuiData.length > 0 ? (
            laporanDisetujuiData.map(item => <ReportListItem key={item.id} {...item} />)
          ) : (
            <p className="p-4 text-sm text-sppa-gray-dark">Tidak ada laporan yang disetujui.</p>
          )}
        </CollapsibleSection>
      </div>

      Action Buttons
      <div className="fixed bottom-6 right-6 z-20">
        <div className="relative">
          <button
            className="w-16 h-16 bg-sppa-blue text-gray rounded-full shadow-lg flex items-center justify-center hover:bg-blue-100 transition-colors"
            onClick={() => setShowAddMenu((v) => !v)}
            aria-label="Add"
          >
            <Add fontSize="large" />
          </button>
          {showAddMenu && (
            <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-lg py-2 w-56">
              <button
                className="w-full text-left px-4 py-3 hover:bg-sppa-gray-light text-sppa-blue font-semibold"
                onClick={() => handleAddMenuClick("tambah")}
              >
                Tambah Laporan
              </button>
              <button
                className="w-full text-left px-4 py-3 hover:bg-sppa-gray-light text-blue-700"
                onClick={() => handleAddMenuClick("disetujui")}
              >
                Laporan Disetujui
              </button>
              <button
                className="w-full text-left px-4 py-3 hover:bg-sppa-gray-light text-blue-700"
                onClick={() => handleAddMenuClick("selesai")}
              >
                Laporan Selesai
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal Tambah Laporan */}
      <AddLaporanModal
        open={showAddLaporanModal}
        onClose={() => setShowAddLaporanModal(false)}
        onSave={handleSaveLaporanBaru}
      />
      {/* Modal Setujui Laporan */}
      <ApproveLaporanModal
        open={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        laporanList={jumlahLaporanData}
        onApprove={handleApproveLaporan}
      />
      {/* Modal Selesaikan Laporan */}
      <SelesaiLaporanModal
        open={showSelesaiModal}
        onClose={() => setShowSelesaiModal(false)}
        laporanList={jumlahLaporanData}
        onSelesai={handleSelesaiLaporan}
      />
    </div>
  );
};

export default LaporanPageContent;