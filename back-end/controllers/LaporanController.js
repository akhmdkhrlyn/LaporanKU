import Laporans from "../models/LaporanModel.js";
import { Sequelize, Op } from "sequelize";
import Users from "../models/UserModel.js";
import Karyawans from "../models/KaryawanModel.js";

// GET all Laporans for the logged-in user with filtering
export const getLaporans = async (req, res) => {
  try {
    const { start_date, end_date, type, karyawan, grouped } = req.query;

    const where = {
      userId: req.userId,
    };

    if (start_date && end_date) {
      where.createdAt = {
        [Op.between]: [
          new Date(start_date + " 00:00:00"),
          new Date(end_date + " 23:59:59"),
        ],
      };
    }

    const include = [
      {
        model: Users,
        attributes: ["username", "email"],
      },
      {
        model: Karyawans,
        attributes: ["name", "type"],
        where: {},
      },
    ];

    if (karyawan) {
      include[1].where.name = {
        [Op.like]: `%${karyawan}%`,
      };
    }

    if (type && ["income", "expense"].includes(type)) {
      include[1].where.type = type;
    }

    const response = await Laporans.findAll({
      where,
      include,
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// GET a single Laporan by UUID
export const getLaporanById = async (req, res) => {
  try {
    const response = await Laporans.findOne({
      where: {
        userId: req.userId,
        uuid: req.params.id,
      },
      include: [
        { model: Karyawans, attributes: ["name", "type"] },
        { model: Users, attributes: ["username"] }
      ],
    });
    if (!response) return res.status(404).json({ msg: "Laporan tidak ditemukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// CREATE a new Laporan
export const createLaporan = async (req, res) => {
  // FIXED: Changed to use karyawanId for reliability
  const { amount, type, is_scheduled, karyawanId, status } = req.body;
  
  if(!karyawanId) {
    return res.status(400).json({ msg: "Karyawan (kategori) harus dipilih." });
  }

  try {
    const karyawan = await Karyawans.findOne({
      where: {
        id: karyawanId,
        userId: req.userId,
      },
    });

    if (!karyawan) {
      return res.status(404).json({ msg: "Karyawan (kategori) tidak ditemukan" });
    }

    if (type !== karyawan.type) {
      return res.status(400).json({
        msg: `Tipe laporan (${type}) tidak sesuai. Kategori ${karyawan.name} hanya untuk tipe ${karyawan.type}`,
      });
    }

    await Laporans.create({
      amount: amount,
      type: type,
      status: status || 'Baru',
      is_scheduled: is_scheduled,
      userId: req.userId,
      karyawanId: karyawan.id,
    });
    res.status(201).json({ msg: "Laporan berhasil dibuat" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// UPDATE a Laporan
export const updateLaporan = async (req, res) => {
  // FIXED: Simplified to primarily update status or other fields
  const { amount, is_scheduled, type, karyawanId, status } = req.body;

  const laporan = await Laporans.findOne({
    where: {
      userId: req.userId,
      uuid: req.params.id,
    },
  });
  if (!laporan) {
    return res.status(404).json({ msg: "Laporan tidak ditemukan" });
  }

  try {
    let updateData = {};
    if(amount) updateData.amount = amount;
    if(is_scheduled) updateData.is_scheduled = is_scheduled;
    if(type) updateData.type = type;
    if(karyawanId) updateData.karyawanId = karyawanId;
    if(status) updateData.status = status;
    
    await Laporans.update(updateData, {
      where: {
        uuid: req.params.id,
        userId: req.userId,
      },
    });

    res.status(200).json({ msg: "Laporan berhasil diupdate" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// DELETE a Laporan
export const deleteLaporan = async (req, res) => {
  const laporan = await Laporans.findOne({
    where: {
      userId: req.userId,
      uuid: req.params.id,
    },
  });
  if (!laporan)
    return res.status(404).json({ msg: "Laporan tidak ditemukan" });
  try {
    await Laporans.destroy({
      where: {
        uuid: req.params.id,
        userId: req.userId,
      },
    });
    res.status(200).json({ msg: "Laporan berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};