import Laporans from "../models/LaporanModel.js";
import { Sequelize, Op } from "sequelize";
import Users from "../models/UserModel.js";
import Karyawans from "../models/KaryawanModel.js";

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
    } else if (start_date) {
      where.createdAt = {
        [Op.gte]: new Date(start_date + " 00:00:00"),
      };
    } else if (end_date) {
      where.createdAt = {
        [Op.lte]: new Date(end_date + " 23:59:59"),
      };
    }

    const include = [
      {
        model: Users,
        attributes: [],
      },
      {
        model: Karyawans,
        attributes: [],
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

    if (grouped) {
      const response = await Laporans.findAll({
        where,
        attributes: [
          "amount",
          "is_scheduled",
          [
            Sequelize.fn(
              "DATE_FORMAT",
              Sequelize.col("laporans.createdAt"),
              "%Y-%m-%d %H:%i:%s"
            ),
            "createdAt",
          ],
          [Sequelize.literal("karyawan.type"), "karyawan_type"],
        ],
        include,
        raw: true,
      });

      // Grouping logic jika diperlukan, bisa disesuaikan
      res.status(200).json(response);
    } else {
      const response = await Laporans.findAll({
        where,
        attributes: [
          "uuid",
          "amount",
          "is_scheduled",
          [
            Sequelize.fn(
              "DATE_FORMAT",
              Sequelize.col("laporans.createdAt"),
              "%Y-%m-%d %H:%i:%s"
            ),
            "createdAt",
          ],
          [Sequelize.literal("user.username"), "user"],
          [Sequelize.literal("karyawan.name"), "karyawan"],
          [Sequelize.literal("karyawan.type"), "karyawan_type"],
        ],
        include,
        raw: true,
      });
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getLaporanById = async (req, res) => {
  try {
    const response = await Laporans.findOne({
      where: {
        userId: req.userId,
        uuid: req.params.id,
      },
      attributes: [
        "uuid",
        "amount",
        "is_scheduled",
        [Sequelize.literal("user.username"), "user"],
        [Sequelize.literal("karyawan.name"), "karyawan"],
        [Sequelize.literal("karyawan.type"), "type"],
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createLaporan = async (req, res) => {
  const { amount, type, is_scheduled, karyawan_name } = req.body;
  try {
    // Cari karyawan berdasarkan nama
    const karyawan = await Karyawans.findOne({
      where: {
        userId: req.userId,
        name: karyawan_name,
      },
    });

    if (!karyawan) {
      return res.status(404).json({
        msg: "Karyawan tidak ditemukan",
      });
    }

    if (type !== karyawan.type) {
      return res.status(400).json({
        msg: `Type laporan tidak sesuai dengan karyawan. Karyawan ${karyawan.name} hanya untuk ${karyawan.type}`,
      });
    }

    await Laporans.create({
      amount: amount,
      type: type,
      is_scheduled: is_scheduled,
      userId: req.userId,
      karyawanId: karyawan.id,
    });
    res.status(201).json({ msg: "Laporan berhasil dibuat" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateLaporan = async (req, res) => {
  const { amount, is_scheduled, type, karyawan_name } = req.body;

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
    let karyawanId;
    if (karyawan_name) {
      const karyawan = await Karyawans.findOne({
        where: {
          userId: req.userId,
          name: karyawan_name,
        },
      });
      if (!karyawan) {
        return res.status(404).json({ msg: "Karyawan tidak ditemukan" });
      }
      karyawanId = karyawan.id;

      if (type !== karyawan.type) {
        return res.status(400).json({
          msg: `Type laporan tidak sesuai dengan karyawan. Karyawan ${karyawan.name} hanya untuk ${karyawan.type}`,
        });
      }
    }

    await Laporans.update(
      {
        amount: amount,
        is_scheduled: is_scheduled,
        type: type,
        karyawanId: karyawanId,
      },
      {
        where: {
          userId: req.userId,
          uuid: req.params.id,
        },
      }
    );

    res.status(200).json({ msg: "Data berhasil diupdate" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

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
        userId: req.userId,
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: "Laporan berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getIncomeData = async (req) => {
  try {
    const incomeData = await Laporans.findAll({
      where: {
        userId: req.userId,
        karyawan_type: "income",
      },
      attributes: [
        "uuid",
        "amount",
        "createdAt",
        [Sequelize.literal("karyawan.type"), "karyawan_type"],
      ],
      include: [
        {
          model: Karyawans,
          attributes: [],
        },
      ],
      raw: true,
    });
    return incomeData;
  } catch (error) {
    console.error("Error fetching income data:", error);
    throw new Error("Failed to fetch income data");
  }
};

export const getExpenseData = async (req) => {
  try {
    const expenseData = await Laporans.findAll({
      where: {
        userId: req.userId,
        karyawan_type: "expense",
      },
      attributes: [
        "uuid",
        "amount",
        "createdAt",
        [Sequelize.literal("karyawan.name"), "karyawan"],
      ],
      include: [
        {
          model: Karyawans,
          attributes: [],
        },
      ],
      raw: true,
    });
    return expenseData;
  } catch (error) {
    console.error("Error fetching expense data:", error);
    throw new Error("Failed to fetch expense data");
  }
};