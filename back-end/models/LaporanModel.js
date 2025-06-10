import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Karyawans from "./KaryawanModel.js";

const { DataTypes } = Sequelize;

const Laporans = db.define(
  "laporans",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    is_scheduled: {
      type: DataTypes.ENUM("true", "false"),
      allowNull: false,
      defaultValue: "false",
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Laporans);
Laporans.belongsTo(Users);

export default Laporans;