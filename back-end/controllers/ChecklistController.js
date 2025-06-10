import Checklists from "../models/ChecklistModel.js";
import Users from "../models/UserModel.js";

// GET all checklists for the logged-in user
export const getChecklists = async (req, res) => {
    try {
        const { category } = req.query;
        const where = { userId: req.userId };
        if (category) {
            where.category = category;
        }

        const checklists = await Checklists.findAll({
            where,
            include: [{ model: Users, attributes: ["uuid", "username", "email"] }],
            order: [["tanggal", "DESC"], ["waktu", "DESC"]],
        });
        res.status(200).json(checklists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET a single checklist by UUID
export const getChecklistById = async (req, res) => {
    try {
        const checklist = await Checklists.findOne({
            where: {
                uuid: req.params.id,
                userId: req.userId,
            },
        });
        if (!checklist) {
            return res.status(404).json({ error: "Checklist tidak ditemukan" });
        }
        res.status(200).json(checklist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE a new checklist
export const createChecklist = async (req, res) => {
    const { item, shift, waktu, tanggal, category, status, keterangan } = req.body;
    try {
        await Checklists.create({
            item,
            shift,
            waktu,
            tanggal,
            category,
            status,
            keterangan,
            userId: req.userId,
        });
        res.status(201).json({ msg: "Checklist berhasil ditambahkan" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// UPDATE a checklist
export const updateChecklist = async (req, res) => {
    try {
        const checklist = await Checklists.findOne({
            where: {
                uuid: req.params.id,
                userId: req.userId,
            },
        });
        if (!checklist) {
            return res.status(404).json({ error: "Checklist tidak ditemukan" });
        }
        
        const { item, shift, waktu, tanggal, category, status, keterangan } = req.body;
        await Checklists.update(
            { item, shift, waktu, tanggal, category, status, keterangan },
            { where: { uuid: req.params.id, userId: req.userId } }
        );
        res.status(200).json({ msg: "Checklist berhasil diupdate" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE a checklist
export const deleteChecklist = async (req, res) => {
    try {
        const checklist = await Checklists.findOne({
            where: {
                uuid: req.params.id,
                userId: req.userId,
            },
        });
        if (!checklist) {
            return res.status(404).json({ error: "Checklist tidak ditemukan" });
        }
        await Checklists.destroy({
            where: {
                uuid: req.params.id,
                userId: req.userId,
            },
        });
        res.status(200).json({ msg: "Checklist berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};