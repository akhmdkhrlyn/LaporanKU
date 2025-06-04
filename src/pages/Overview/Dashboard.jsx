import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, LabelList,
} from 'recharts';
import {
  MoreVert,
  AssignmentInd as PersonIcon,
  Assessment as ReportIcon,
  PlaylistAddCheck as ReportDoneIcon,
  FactCheck as ReportApprovedIcon,
  Search as SearchIcon,
  InfoOutlined as InfoOutlinedIcon,
} from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

// =====================
// Dummy Data
// =====================
const dummyJumlahLaporan = 17;
const dummyLaporanSelesai = 4;
const dummyLaporanDisetujui = 9;

const dummyRingkasanData = [
  { name: 'Jan', jumlah: 10 },
  { name: 'Feb', jumlah: 15 },
  { name: 'Mar', jumlah: 8 },
  { name: 'Apr', jumlah: 20 },
  { name: 'Mei', jumlah: 25 },
  { name: 'Jun', jumlah: 59, highlighted: true, highlightText: "Dari 59 laporan" },
  { name: 'Jul', jumlah: 30 },
  { name: 'Agu', jumlah: 22 },
  { name: 'Sep', jumlah: 18 },
  { name: 'Okt', jumlah: 12 },
  { name: 'Nov', jumlah: 9 },
  { name: 'Des', jumlah: 5 },
];

const dummyAktivitasData = [
  { id: 1, user: 'Akhmad', count: 9, size: 'large', color: 'bg-blue-500' },
  { id: 2, user: 'Khoirul', count: 5, size: 'medium', color: 'bg-blue-400' },
  { id: 3, user: 'Yani', count: 3, size: 'small', color: 'bg-blue-300' },
];

const dummyPerbandinganBulanIni = { count: 60, total: 100 };
const dummyPerbandinganBulanLalu = { count: 45, total: 100 };

const dummyRiwayatLaporan = [
  { id: 1, user: 'Akhmad', deskripsi: 'Gasket Flange atas valve Bypass pecah', tanggal: '05/05/2025', tindakan: 'Penggantian gasket' },
  { id: 2, user: 'Yani', deskripsi: 'Gasket Inject pecah', tanggal: '04/05/2025', tindakan: 'Penggantian gasket' },
  { id: 3, user: 'Khoirul', deskripsi: 'Motor pompa sirkulasi rusak', tanggal: '03/05/2025', tindakan: 'Perbaikan motor' },
  { id: 4, user: 'Akhmad', deskripsi: 'Sensor level air tidak akurat', tanggal: '02/05/2025', tindakan: 'Kalibrasi sensor' },
];

const dummyDataKaryawan = [
  { id: 1, nama: 'Akhmad', detail: 'Operator Boiler' },
  { id: 2, nama: 'Yani', detail: 'Teknisi Maintenance' },
  { id: 3, nama: 'Khoirul', detail: 'Supervisor Shift' },
];

// =====================
// Komponen Dashboard
// =====================
const Dashboard = () => {
  // State
  const [jumlahLaporan] = useState(dummyJumlahLaporan);
  const [laporanSelesai] = useState(dummyLaporanSelesai);
  const [laporanDisetujui] = useState(dummyLaporanDisetujui);
  const [ringkasanData] = useState(dummyRingkasanData);
  const [aktivitasData] = useState(dummyAktivitasData);
  const [perbandinganBulanIni] = useState(dummyPerbandinganBulanIni);
  const [perbandinganBulanLalu] = useState(dummyPerbandinganBulanLalu);
  const [riwayatLaporan] = useState(dummyRiwayatLaporan);
  const [dataKaryawan] = useState(dummyDataKaryawan);

  // Dialog State
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [itemCount, setItemCount] = useState(5);
  const [tempItemCount, setTempItemCount] = useState(5);

  // Handler Dialog
  const handleOpenDialog = (title) => {
    setDialogTitle(title);
    setTempItemCount(itemCount);
    setDialogOpen(true);
  };
  const handleCloseDialog = () => setDialogOpen(false);
  const handleSaveDialog = () => {
    setItemCount(tempItemCount);
    setDialogOpen(false);
  };

  // Helper
  const getLimitedData = (dataArray) => dataArray.slice(0, itemCount);

  // Custom Label pada Chart
  const renderCustomizedLabel = (props) => {
    const { x, y, width, payload } = props;
    if (payload && payload.highlighted && payload.highlightText) {
      return (
        <text
          x={x + width / 2}
          y={y - 10}
          fill="#555"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10px"
          fontWeight="bold"
        >
          {payload.highlightText}
        </text>
      );
    }
    return null;
  };

  // Persentase Perbandingan
  const persentaseBulanIni = (perbandinganBulanIni.count / perbandinganBulanIni.total) * 100;
  const persentaseBulanLalu = (perbandinganBulanLalu.count / perbandinganBulanLalu.total) * 100;

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-sppa-gray-light min-h-screen">
      {/* Header Cards */}
      {/* <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-sppa-gray-medium">
        <h1 className="text-2xl md:text-3xl font-bold text-sppa-text-primary">
          Dashboard
        </h1>
        <div className="flex items-center space-x-2 mt-3 sm:mt-0">
          <button className="p-2 text-sppa-gray-dark hover:text-sppa-blue hover:bg-sppa-gray-light/50 rounded-full focus:outline-none">
            <SearchIcon />
          </button>
          <button className="p-2 text-sppa-gray-dark hover:text-sppa-blue hover:bg-sppa-gray-light/50 rounded-full focus:outline-none">
            <InfoOutlinedIcon />
          </button>
          <button className="p-2 text-sppa-gray-dark hover:text-sppa-blue hover:bg-sppa-gray-light/50 rounded-full focus:outline-none">
            <MoreVert />
          </button>
        </div>
      </div> */}

      {/* Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Jumlah Laporan */}
        <div className="bg-white rounded-lg shadow p-5 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            <ReportIcon fontSize="medium" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Jumlah Laporan</p>
            <p className="text-2xl font-semibold text-gray-800">{jumlahLaporan}</p>
          </div>
        </div>
        {/* Laporan Selesai */}
        <div className="bg-white rounded-lg shadow p-5 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-green-100 text-green-600">
            <ReportDoneIcon fontSize="medium" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Laporan Selesai</p>
            <p className="text-2xl font-semibold text-gray-800">{laporanSelesai}</p>
          </div>
        </div>
        {/* Laporan Disetujui */}
        <div className="bg-white rounded-lg shadow p-5 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
            <ReportApprovedIcon fontSize="medium" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Laporan yang Disetujui</p>
            <p className="text-2xl font-semibold text-gray-800">{laporanDisetujui}</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ringkasan Chart */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Ringkasan</h2>
            </div>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ringkasanData}
                  margin={{ top: 30, right: 0, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize="12px" />
                  <YAxis axisLine={false} tickLine={false} fontSize="12px" allowDecimals={false} />
                  <Bar dataKey="jumlah" radius={[4, 4, 0, 0]} barSize={25}>
                    {ringkasanData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.highlighted ? '#2563EB' : '#93C5FD'}
                      />
                    ))}
                    <LabelList dataKey="highlightText" content={renderCustomizedLabel} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Riwayat Laporan */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Riwayat Laporan</h2>
              <button
                onClick={() => handleOpenDialog('Riwayat Laporan')}
                className="text-gray-500 hover:text-gray-700"
              >
                <MoreVert fontSize="small" />
              </button>
            </div>
            <div className="space-y-3 overflow-x-auto">
              <table className="min-w-full">
                <tbody>
                  {getLimitedData(riwayatLaporan).map((laporan) => (
                    <tr
                      key={laporan.id}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                    >
                      <td className="py-3 px-2">
                        <div className="flex items-center">
                          <div className="p-2 bg-gray-100 rounded-full mr-3">
                            <PersonIcon fontSize="small" className="text-gray-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">{laporan.user}</p>
                            <p className="text-xs text-gray-500 truncate max-w-xs">
                              {laporan.deskripsi}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600 text-right whitespace-nowrap">
                        {laporan.tanggal}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600 text-right hidden md:table-cell whitespace-nowrap">
                        {laporan.tindakan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Aktivitas */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Aktivitas</h2>
            <div className="relative h-64 flex items-center justify-center">
              {aktivitasData.map((item) => {
                let sizeClass = 'w-20 h-20 text-xs';
                let positionClass = '';
                if (item.user === 'Akhmad' && item.count === 9) {
                  sizeClass = 'w-36 h-36 text-sm';
                  positionClass = 'z-10 transform scale-100';
                } else if (item.user === 'Khoirul' && item.count === 5) {
                  sizeClass = 'w-28 h-28 text-xs';
                  positionClass = 'absolute top-[-20px] right-[10px] z-0 transform scale-90';
                } else if (item.user === 'Yani' && item.count === 3) {
                  sizeClass = 'w-24 h-24 text-xs';
                  positionClass = 'absolute bottom-[-15px] left-[15px] z-0 transform scale-75';
                }
                return (
                  <div
                    key={item.id}
                    className={`${item.color} ${sizeClass} ${positionClass} rounded-full flex flex-col items-center justify-center text-white p-2 shadow-lg`}
                  >
                    <span className="font-bold block">{item.count} laporan</span>
                    <span className="text-xs block">{item.user}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Perbandingan (Bulan) */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Perbandingan (Bulan)</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Bulan ini</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${persentaseBulanIni}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Bulan lalu</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-gray-700 h-2.5 rounded-full"
                    style={{ width: `${persentaseBulanLalu}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Karyawan */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Data Karyawan</h2>
              <button
                onClick={() => handleOpenDialog('Data Karyawan')}
                className="text-gray-500 hover:text-gray-700"
              >
                <MoreVert fontSize="small" />
              </button>
            </div>
            <div className="space-y-3">
              {getLimitedData(dataKaryawan).map((karyawan) => (
                <div
                  key={karyawan.id}
                  className="flex items-center justify-between pb-2 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-full mr-3">
                      <PersonIcon fontSize="small" className="text-gray-500" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">{karyawan.nama}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dialog Pengaturan Jumlah Data */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="item-count-label">Jumlah Data</InputLabel>
            <Select
              labelId="item-count-label"
              value={tempItemCount}
              label="Jumlah Data"
              onChange={(e) => setTempItemCount(Number(e.target.value))}
            >
              {[3, 5, 10].map((count) => (
                <MenuItem key={count} value={count}>
                  {count}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Batal</Button>
          <Button onClick={handleSaveDialog} variant="contained">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;