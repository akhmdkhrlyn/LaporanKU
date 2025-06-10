import Karyawans from "../models/KaryawanModel.js";
import Users from "../models/UserModel.js";

// Ambil semua karyawan milik user yang sedang login
export const getKaryawans = async (req, res) => {
  try {
    const karyawans = await Karyawans.findAll({
      where: { userId: req.userId },
      include: [{ model: Users, attributes: ["uuid", "username", "email"] }],
      attributes: ["uuid", "name", "type"],
      order: [["name", "ASC"]],
    });
    res.status(200).json(karyawans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ambil detail karyawan by uuid
export const getKaryawanById = async (req, res) => {
  try {
    const karyawan = await Karyawans.findOne({
      where: { uuid: req.params.id, userId: req.userId },
      include: [{ model: Users, attributes: ["uuid", "username", "email"] }],
      attributes: ["uuid", "name", "type"],
    });
    if (!karyawan) {
      return res.status(404).json({ error: "Karyawan tidak ditemukan" });
    }
    res.status(200).json(karyawan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tambah karyawan baru untuk user login
export const createKaryawan = async (req, res) => {
  const { name, type } = req.body;
  try {
    await Karyawans.create({
      name,
      type,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Karyawan berhasil ditambahkan" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update karyawan milik user login
export const updateKaryawan = async (req, res) => {
  const { name, type } = req.body;
  try {
    const karyawan = await Karyawans.findOne({
      where: { uuid: req.params.id, userId: req.userId },
    });
    if (!karyawan) {
      return res.status(404).json({ error: "Karyawan tidak ditemukan" });
    }
    await Karyawans.update(
      { name, type },
      { where: { uuid: req.params.id, userId: req.userId } }
    );
    res.status(200).json({ msg: "Karyawan berhasil diupdate" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Hapus karyawan milik user login
export const deleteKaryawan = async (req, res) => {
  try {
    const karyawan = await Karyawans.findOne({
      where: { uuid: req.params.id, userId: req.userId },
    });
    if (!karyawan) {
      return res.status(404).json({ error: "Karyawan tidak ditemukan" });
    }
    await Karyawans.destroy({
      where: { uuid: req.params.id, userId: req.userId },
    });
    res.status(200).json({ msg: "Karyawan berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};