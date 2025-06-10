import React, { useState, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Add from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Path ke PDF di public/assets
const PDF_PATH = 'https://drive.google.com/file/d/1m2-DXqeWPaJ40aHys8I8coJDCvHKFT7f/view?usp=sharing';

// Modal Form Tambah/Edit Cheklist Boiler
const AddChecklistModal = ({ open, onClose, onSave, initialData }) => {
    const [form, setForm] = useState({
        tanggal: "",
        item: "",
        shift: "",
        waktu: "",
        status: "Belum Dicek",
    });

    useEffect(() => {
        if (open && initialData) {
            setForm(initialData);
        } else if (!open) {
            setForm({ tanggal: "", item: "", shift: "", waktu: "", status: "Belum Dicek" });
        }
    }, [open, initialData]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-30"
            style={{ background: "rgba(0,0,0,0.15)" }}
        >
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-auto animate-fadeIn">
                <div className="p-5">
                    <h2 className="text-xl font-bold mb-5 text-gray-800">
                        {initialData ? "Edit Cheklist" : "Tambah Cheklist"}
                    </h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1.5 text-gray-700">Tanggal</label>
                        <input
                            type="date"
                            className="w-full border border-gray-300 rounded-lg p-2.5"
                            value={form.tanggal}
                            onChange={e => setForm({ ...form, tanggal: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1.5 text-gray-700">Item</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg p-2.5"
                            placeholder="Nama item"
                            value={form.item}
                            onChange={e => setForm({ ...form, item: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1.5 text-gray-700">Shift</label>
                        <select
                            className="w-full border border-gray-300 rounded-lg p-2.5"
                            value={form.shift}
                            onChange={e => setForm({ ...form, shift: e.target.value })}
                        >
                            <option value="">Pilih Shift</option>
                            <option value="Pagi">Pagi</option>
                            <option value="Siang">Siang</option>
                            <option value="Malam">Malam</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1.5 text-gray-700">Waktu</label>
                        <input
                            type="time"
                            className="w-full border border-gray-300 rounded-lg p-2.5"
                            value={form.waktu}
                            onChange={e => setForm({ ...form, waktu: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1.5 text-gray-700">Status</label>
                        <select
                            className="w-full border border-gray-300 rounded-lg p-2.5"
                            value={form.status}
                            onChange={e => setForm({ ...form, status: e.target.value })}
                        >
                            <option value="Belum Dicek">Belum Dicek</option>
                            <option value="Sudah Dicek">Sudah Dicek</option>
                        </select>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            className="px-4 py-2.5 mr-3 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium"
                            onClick={onClose}
                        >
                            Batal
                        </button>
                        <button
                            className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
                            onClick={() => {
                                onSave(form);
                                setForm({ tanggal: "", item: "", shift: "", waktu: "", status: "Belum Dicek" });
                            }}
                            disabled={!form.tanggal || !form.item || !form.shift || !form.waktu}
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ChecklistItem = ({ item, shift, waktu, tanggal, status, onEdit, onDelete }) => (
    <div className="flex justify-between items-center p-3 hover:bg-sppa-gray-light/50 border-b border-sppa-gray-medium last:border-b-0">
        <div>
            <p className="text-sm font-medium text-sppa-text-primary">{item}</p>
            <p className="text-xs text-sppa-gray-dark">
                Tanggal: {tanggal} | Shift: {shift} | Waktu: {waktu}
            </p>
        </div>
        <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${status === 'Sudah Dicek' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {status}
            </span>
            <button onClick={onEdit} className="ml-2 text-blue-500 hover:text-blue-700" title="Edit">
                <EditIcon fontSize="small" />
            </button>
            <button onClick={onDelete} className="ml-1 text-red-500 hover:text-red-700" title="Hapus">
                <DeleteIcon fontSize="small" />
            </button>
        </div>
    </div>
);

const CollapsibleSection = ({ title, icon, children, defaultOpen = false, totalCount }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="bg-white rounded-lg shadow-md mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 text-left focus:outline-none focus:ring-2 focus:ring-sppa-blue rounded-t-lg hover:bg-sppa-gray-light/30"
                aria-expanded={isOpen}
            >
                <div className="flex items-center">
                    {icon && React.cloneElement(icon, { className: "mr-3 text-sppa-blue" })}
                    <span className="text-lg font-semibold text-sppa-text-primary">{title}</span>
                </div>
                <div className="flex items-center">
                    <span className="text-sm text-sppa-gray-dark mr-3">Total: {totalCount} item</span>
                    {isOpen ? <KeyboardArrowUpIcon className="text-sppa-gray-dark" /> : <KeyboardArrowDownIcon className="text-sppa-gray-dark" />}
                </div>
            </button>
            {isOpen && (
                <div className="border-t border-sppa-gray-medium p-0">
                    {children ? children : <p className="p-4 text-sm text-sppa-gray-dark">Tidak ada data untuk ditampilkan.</p>}
                </div>
            )}
        </div>
    );
};

const CheklistHarianPage = () => {
    const [showAddChecklistModal, setShowAddChecklistModal] = useState(false);
    const [showPdfPreview, setShowPdfPreview] = useState(false);

    // Untuk edit checklist
    const [editData, setEditData] = useState(null);
    const [editSection, setEditSection] = useState(null); // 'boiler' atau 'utility'

    // Untuk tambah checklist (boiler/utility)
    const [addSection, setAddSection] = useState(null); // 'boiler' atau 'utility'

    // Data checklist harian Boiler & Utility
    const [boilerChecklist, setBoilerChecklist] = useState([
        { id: 1, tanggal: "2025-06-03", item: "Cek level air boiler", shift: "Pagi", waktu: "07:00", status: "Sudah Dicek", createdAt: Date.now() },
        { id: 2, tanggal: "2025-06-03", item: "Cek tekanan uap", shift: "Siang", waktu: "13:15", status: "Belum Dicek", createdAt: Date.now() },
    ]);
    const [utilityChecklist, setUtilityChecklist] = useState([
        { id: 1, tanggal: "2025-06-03", item: "Cek tekanan angin kompresor", shift: "Pagi", waktu: "07:00", status: "Sudah Dicek", createdAt: Date.now() },
        { id: 2, tanggal: "2025-06-03", item: "Cek panel listrik utama", shift: "Malam", waktu: "21:40", status: "Sudah Dicek", createdAt: Date.now() },
    ]);

    const [riwayatChecklist, setRiwayatChecklist] = useState([]);


    // Untuk tombol tambah checklist (FAB)
    const [showAddMenu, setShowAddMenu] = useState(false);

    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember",
    ];
    const today = new Date();
    const currentPeriod = `${months[today.getMonth()]} ${today.getFullYear()}`;

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const eightHours = 8 * 60 * 60 * 1000;

            // Boiler
            const expiredBoiler = boilerChecklist.filter(item => now - item.createdAt >= eightHours);
            if (expiredBoiler.length > 0) {
                setRiwayatChecklist(prev => [
                    ...prev,
                    ...expiredBoiler.map(item => ({ ...item, periode: currentPeriod, kategori: 'Boiler' }))
                ]);
                setBoilerChecklist(boilerChecklist.filter(item => now - item.createdAt < eightHours));
            }

            // Utility
            const expiredUtility = utilityChecklist.filter(item => now - item.createdAt >= eightHours);
            if (expiredUtility.length > 0) {
                setRiwayatChecklist(prev => [
                    ...prev,
                    ...expiredUtility.map(item => ({ ...item, periode: currentPeriod, kategori: 'Utility' }))
                ]);
                setUtilityChecklist(utilityChecklist.filter(item => now - item.createdAt < eightHours));
            }
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, [boilerChecklist, utilityChecklist, currentPeriod]);

    // Tambah atau edit checklist
    const handleSaveChecklist = (form) => {
        if (editData && editSection) {
            // Edit mode
            if (editSection === 'boiler') {
                setBoilerChecklist(prev =>
                    prev.map(item =>
                        item.id === editData.id ? { ...item, ...form } : item
                    )
                );
            } else if (editSection === 'utility') {
                setUtilityChecklist(prev =>
                    prev.map(item =>
                        item.id === editData.id ? { ...item, ...form } : item
                    )
                );
            }
            setEditData(null);
            setEditSection(null);
            setShowAddChecklistModal(false);
        } else if (addSection === 'boiler') {
            // Tambah baru ke Boiler
            setBoilerChecklist(prev => [
                ...prev,
                {
                    id: Date.now(),
                    ...form,
                    createdAt: Date.now(),
                },
            ]);
            setShowAddChecklistModal(false);
            setAddSection(null);
        } else if (addSection === 'utility') {
            // Tambah baru ke Utility
            setUtilityChecklist(prev => [
                ...prev,
                {
                    id: Date.now(),
                    ...form,
                    createdAt: Date.now(),
                },
            ]);
            setShowAddChecklistModal(false);
            setAddSection(null);
        }
    };

    // Handler tombol tambah checklist (FAB)
    const handleAddMenuClick = (section) => {
        setShowAddMenu(false);
        setEditData(null);
        setEditSection(null);
        setAddSection(section); // 'boiler' atau 'utility'
        setShowAddChecklistModal(true);
    };

    // Hapus checklist
    const handleDeleteChecklist = (id, section) => {
        if (section === 'boiler') {
            setBoilerChecklist(boilerChecklist.filter(item => item.id !== id));
        } else if (section === 'utility') {
            setUtilityChecklist(utilityChecklist.filter(item => item.id !== id));
        }
    };

    // Edit checklist
    const handleEditChecklist = (item, section) => {
        setEditData(item);
        setEditSection(section);
        setShowAddChecklistModal(true);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-sppa-gray-light min-h-screen">
            {/* Panel Riwayat Checklist Harian */}
            <div className="bg-white rounded-lg shadow-md mb-4">
                <div className="p-4 border-b border-sppa-gray-medium">
                    <span className="text-lg font-semibold text-sppa-text-primary">Riwayat Laporan Checklist Harian</span>
                    <span className="ml-3 text-sm text-sppa-gray-dark">Periode: {currentPeriod}</span>
                </div>
                {riwayatChecklist.length > 0 ? (
                    riwayatChecklist.map(item => (
                        <div key={item.id} className="flex justify-between items-center p-3 border-b border-sppa-gray-medium last:border-b-0">
                            <div>
                                <p className="text-sm font-medium text-sppa-text-primary">{item.item}</p>
                                <p className="text-xs text-sppa-gray-dark">
                                    Tanggal: {item.tanggal} | Waktu: {item.waktu} | Kategori: {item.kategori}
                                </p>
                            </div>
                            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-200 text-gray-700">
                                {item.status}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="p-4 text-sm text-sppa-gray-dark">Belum ada riwayat checklist.</p>
                )}
            </div>

            {/* Panel Boiler */}
            <CollapsibleSection
                title="Boiler"
                icon={<Add />}
                totalCount={boilerChecklist.length}
                defaultOpen={true}
            >
                {boilerChecklist.length > 0 ? (
                    boilerChecklist.map(item => (
                        <ChecklistItem
                            key={item.id}
                            {...item}
                            onEdit={() => handleEditChecklist(item, 'boiler')}
                            onDelete={() => handleDeleteChecklist(item.id, 'boiler')}
                        />
                    ))
                ) : (
                    <p className="p-4 text-sm text-sppa-gray-dark">Tidak ada checklist.</p>
                )}
            </CollapsibleSection>

            {/* Panel Utility */}
            <CollapsibleSection
                title="Utility"
                icon={<Add />}
                totalCount={utilityChecklist.length}
                defaultOpen={true}
            >
                {utilityChecklist.length > 0 ? (
                    utilityChecklist.map(item => (
                        <ChecklistItem
                            key={item.id}
                            {...item}
                            onEdit={() => handleEditChecklist(item, 'utility')}
                            onDelete={() => handleDeleteChecklist(item.id, 'utility')}
                        />
                    ))
                ) : (
                    <p className="p-4 text-sm text-sppa-gray-dark">Tidak ada checklist.</p>
                )}
            </CollapsibleSection>

            {/* Tombol Tambah Checklist (FAB) */}
            <div className="fixed bottom-6 right-6 z-20">
                <div className="relative">
                    <button
                        className="w-16 h-16 bg-sppa-blue text-black rounded-full shadow-lg flex items-center justify-center hover:bg-blue-100 transition-colors"
                        onClick={() => setShowAddMenu((v) => !v)}
                        aria-label="Add"
                    >
                        <Add fontSize="large" />
                    </button>
                    {showAddMenu && (
                        <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-lg py-2 w-56">
                            <button
                                className="w-full text-left px-4 py-3 hover:bg-sppa-gray-light text-blue-700"
                                onClick={() => handleAddMenuClick('boiler')}
                            >
                                Boiler
                            </button>
                            <button
                                className="w-full text-left px-4 py-3 hover:bg-sppa-gray-light text-blue-700"
                                onClick={() => handleAddMenuClick('utility')}
                            >
                                Utility
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Tambah/Edit Checklist */}
            <AddChecklistModal
                open={showAddChecklistModal}
                onClose={() => {
                    setShowAddChecklistModal(false);
                    setEditData(null);
                    setEditSection(null);
                }}
                onSave={handleSaveChecklist}
                initialData={editData}
            />

            {/* Tombol Unduh & Pratinjau PDF */}
            <div className="flex items-center gap-3 mb-6">
                <a
                    href={PDF_PATH}
                    download
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                    Pratinjau Template PDF
                </a>
            </div>

            {/* Modal Pratinjau PDF */}
            {showPdfPreview && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-4 max-w-3xl w-full relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
                            onClick={() => setShowPdfPreview(false)}
                        >
                            &times;
                        </button>
                        <iframe
                            src={PDF_PATH}
                            title="Pratinjau PDF"
                            width="100%"
                            height="700px"
                            className="rounded"
                        />
                    </div>
                </div>
            )}

        </div>
    );
};

export default CheklistHarianPage;