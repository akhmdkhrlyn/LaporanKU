import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Laporans from "./LaporanModel.js";
import Checklists from "./ChecklistModel.js";

const { DataTypes } = Sequelize;

const Karyawans = db.define(
  "karyawans",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    type: {
      type: DataTypes.ENUM("income", "expense"),
      allowNull: false,
      defaultValue: "income",
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

// Relasi ke Laporans dan Checklists
Karyawans.hasMany(Laporans, { foreignKey: "karyawanId" });
Laporans.belongsTo(Karyawans, { foreignKey: "karyawanId" });

Karyawans.hasMany(Checklists, { foreignKey: "karyawanId" });
Checklists.belongsTo(Karyawans, { foreignKey: "karyawanId" });

export default Karyawans;