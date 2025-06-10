import Laporans from "../models/LaporanModel.js";
import Checklists from "../models/ChecklistModel.js";
import Karyawans from "../models/KaryawanModel.js";
import { Op } from "sequelize";

// Helper: ambil rentang tanggal dari string periode "Mei 2025"
const getStartAndEndDates = (periodStr) => {
  const [monthStr, yearStr] = periodStr.split(" ");
  const monthMap = {
    Januari: 0, Februari: 1, Maret: 2, April: 3, Mei: 4, Juni: 5,
    Juli: 6, Agustus: 7, September: 8, Oktober: 9, November: 10, Desember: 11,
  };
  const month = monthMap[monthStr];
  const year = parseInt(yearStr);
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0, 23, 59, 59);
  return { start, end };
};

export const exportReport = async (req, res) => {
  try {
    const { period, includes } = req.body;
    const { start, end } = getStartAndEndDates(period);
    const userId = req.userId; // opsional, jika ingin filter user
    const response = {};

    // Laporan
    if (includes.laporan) {
      const laporanData = await Laporans.findAll({
        where: {
          ...(userId && { userId }),
          createdAt: { [Op.between]: [start, end] },
        },
        order: [["createdAt", "ASC"]],
      });

      response.laporan = laporanData.map((lap) => ({
        tanggal: lap.createdAt,
        judul: lap.judul || lap.title || "",
        deskripsi: lap.deskripsi || lap.description || "",
        status: lap.status || "",
      }));
    }

    // Checklist
    if (includes.checklist) {
      const checklistData = await Checklists.findAll({
        where: {
          ...(userId && { userId }),
          createdAt: { [Op.between]: [start, end] },
        },
        order: [["createdAt", "ASC"]],
      });

      response.checklist = checklistData.map((c) => ({
        tanggal: c.createdAt,
        nama: c.nama || c.name || "",
        status: c.status || "",
        keterangan: c.keterangan || c.notes || "",
      }));
    }

    // Data Karyawan
    if (includes.karyawan) {
      const karyawanData = await Karyawans.findAll({
        attributes: ["id", "nama", "jabatan", "email"],
        order: [["nama", "ASC"]],
      });

      response.karyawan = karyawanData.map((k) => ({
        id: k.id,
        nama: k.nama,
        jabatan: k.jabatan,
        email: k.email,
      }));
    }

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};