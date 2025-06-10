import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Login from './components/Login';
import LupaPassword from './components/LupaPassword';
//My features
import Dashboard from './pages/Overview/Dashboard';
import LaporanPageContent from './pages/Laporan/LaporanPageContent';
import DataKaryawanContent from './pages/DataKaryawan/DataKaryawanContent';
import CheklistHarianPage from './pages/Checklist/Harian';
import CheklistMingguanPage from './pages/Checklist/Mingguan';
import CheklistBulananPage from './pages/Checklist/Bulanan';
import ExportPDF from './pages/Pdf/Export';
//Keep features
// import Kalender from './pages/Kalender/Kalender';

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route element={<MainLayout />}>
          {/* Rute untuk Overview, Laporan, Data Karyawan, Cheklist, PDF*/}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/laporan/" element={<LaporanPageContent />} />
          <Route path="/data-karyawan" element={<DataKaryawanContent />} />
          <Route path="/checklist/harian" element={<CheklistHarianPage />} />
          <Route path="/checklist/mingguan" element={<CheklistMingguanPage />} />
          <Route path="/checklist/bulanan" element={<CheklistBulananPage />} />
          <Route path='/export-pdf' element={<ExportPDF />} />
          {/* {Rute untuk Kalender} */}
          {/* <Route path='/kalender' element={<Kalender />} /> */}
        </Route>

        <Route element={<Layout />}>
          {/* Rute default */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path='/forgot-password' element={<LupaPassword />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;