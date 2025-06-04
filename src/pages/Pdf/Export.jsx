import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { generatePDFReport } from './pdfGenerator';
import axios from 'axios';

function ExportPDF() {

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const today = new Date();
  const currentPeriod = `${months[today.getMonth()]} ${today.getFullYear()}`;

  const [formData, setFormData] = useState({
    type: 'Laporan',
    period: currentPeriod,
    includes: {
      income: false,
      expense: false,
      accounts: false,
      budget: false
    }
  });

  const [daftarRekening, setDaftarRekening] = useState(["Semua Rekening"]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/rekening');
      setDaftarRekening(response.data);
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    }
  }

  const handleExport = () => {
    generatePDFReport(formData);
  };

  console.log(formData);

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative shadow-lg md:my-6 md:min-h-0 md:rounded-xl">
      <div className="bg-white p-6">
        <h1 className="text-xl font-bold mb-6">Buat Berkas - PDF</h1>

        {/* Type Dropdown */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">Tipe:</label>
          <div className="relative">
            <select
              className="w-full p-2.5 border border-gray-300 rounded-lg appearance-none bg-white cursor-pointer pr-10"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="Laporan Terselesaikan">Laporan Terselesaikan</option>
              {/* <option value="Cheklist Harian Utility">Cheklist Harian Utility</option>
              <option value="Cheklist Harian Boiler">Cheklist Harian Boiler</option>
              <option value="Cheklist Mingguan Utility">Cheklist Mingguan Utility</option>
              <option value="Cheklist Mingguan Boiler">Cheklist Mingguan Boiler</option>
              <option value="Cheklist Bulanan Utility">Cheklist Bulanan Utility</option>
              <option value="Cheklist Bulanan Boiler">Cheklist Bulanan Boiler</option> */}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown size={18} className="text-gray-500" />
            </div>
          </div>
        </div>

        {/* Period Dropdown - Modified to only show 2025 */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">Periode:</label>
          <div className="relative">
            <select
              className="w-full p-2.5 border border-gray-300 rounded-lg appearance-none bg-white cursor-pointer pr-10"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            >
              {months.map(month => (
                <option key={`${month}-${today.getFullYear()}`}>{`${month} ${today.getFullYear()}`}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown size={18} className="text-gray-500" />
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="flex justify-end">
          <button
            onClick={handleExport}
            className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Ekspor Berkas PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExportPDF;