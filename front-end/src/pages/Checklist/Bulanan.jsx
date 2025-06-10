import React, { useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

// Link file
const EXCEL_LINK = "https://drive.google.com/file/d/1kQnQn6wQwQwQwQwQwQwQwQwQwQwQwQw/view?usp=sharing";

const initialBoilerData = [
    { id: 1, item: "Cek tekanan uap bulanan" },
    { id: 2, item: "Cek level air boiler utama" },
    { id: 3, item: "Cek kondisi safety valve" },
    { id: 4, item: "Cek kebocoran pipa boiler" },
    { id: 5, item: "Cek panel kontrol boiler" },
];

const initialUtilityData = [
    { id: 1, item: "Cek tekanan air chiller" },
    { id: 2, item: "Cek level oli kompresor" },
    { id: 3, item: "Cek panel listrik utility" },
    { id: 4, item: "Cek kondisi pompa air" },
    { id: 5, item: "Cek filter udara" },
];

// Komponen item checklist bulanan
const ChecklistItem = ({ item, onDelete }) => (
    <div className="flex justify-between items-center p-3 border-b border-gray-200 last:border-b-0">
        <div>
            <p className="text-sm font-medium text-gray-800">{item}</p>
        </div>
        <div className="flex items-center gap-2">
            <a
                href={EXCEL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xs text-gray-700 hover:text-blue-600"
                style={{ fontWeight: 500 }}
                title="Download Excel"
            >
                <OpenInNewIcon fontSize="small" className="mr-1" />
                Excel
            </a>
            <button
                onClick={onDelete}
                className="flex items-center text-xs text-red-500 hover:text-red-700"
                style={{ fontWeight: 500 }}
                title="Hapus"
            >
                <DeleteIcon fontSize="small" className="mr-1" />
                Hapus
            </button>
        </div>
    </div>
);

// Panel collapsible seperti harian
const CollapsibleSection = ({ title, color, data, onDelete, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={`bg-white rounded-lg shadow-md mb-4 border ${color}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-t-lg hover:bg-gray-100"
                aria-expanded={isOpen}
            >
                <span className="text-lg font-semibold text-gray-800">{title}</span>
                <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-3">Total: {data.length} item</span>
                    {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </div>
            </button>
            {isOpen && (
                <div className="border-t border-gray-200 p-0">
                    {data.length > 0 ? (
                        data.map((row) => (
                            <ChecklistItem
                                key={row.id}
                                item={row.item}
                                onDelete={() => onDelete(row.id)}
                            />
                        ))
                    ) : (
                        <p className="p-4 text-sm text-gray-500">Tidak ada checklist.</p>
                    )}
                </div>
            )}
        </div>
    );
};

const BulananBoilerPage = () => {
    const fileInputRef = useRef(null);
    const [uploadSection, setUploadSection] = useState(""); // "boiler" atau "utility"
    const [boilerData, setBoilerData] = useState(initialBoilerData);
    const [utilityData, setUtilityData] = useState(initialUtilityData);

    const handleAddClick = (section) => {
        setUploadSection(section);
        fileInputRef.current.value = null;
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0 && uploadSection) {
            const fileName = e.target.files[0].name;
            if (uploadSection === "boiler") {
                setBoilerData(prev => [
                    ...prev,
                    { id: prev.length + 1, item: `Upload: ${fileName}` }
                ]);
            } else if (uploadSection === "utility") {
                setUtilityData(prev => [
                    ...prev,
                    { id: prev.length + 1, item: `Upload: ${fileName}` }
                ]);
            }
            alert(`File "${fileName}" berhasil diupload ke ${uploadSection === "boiler" ? "Boiler" : "Utility"}!`);
            setUploadSection("");
            e.target.value = null;
        }
    };

    const handleDeleteBoiler = (id) => {
        setBoilerData(prev => prev.filter(item => item.id !== id));
    };

    const handleDeleteUtility = (id) => {
        setUtilityData(prev => prev.filter(item => item.id !== id));
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            {/* Panel Boiler */}
            <CollapsibleSection
                title="Boiler"
                color="border-blue-400"
                data={boilerData}
                onDelete={handleDeleteBoiler}
                defaultOpen={true}
            />

            {/* Panel Utility */}
            <CollapsibleSection
                title="Utility"
                color="border-green-400"
                data={utilityData}
                onDelete={handleDeleteUtility}
                defaultOpen={true}
            />

            {/* Add Button & Upload */}
            <div className="flex items-center gap-3 mt-4">
                <button
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    onClick={() => handleAddClick("boiler")}
                >
                    <AddIcon className="mr-2" fontSize="small" />
                    Upload Data Checklist Bulanan Boiler
                </button>
                <button
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                    onClick={() => handleAddClick("utility")}
                >
                    <AddIcon className="mr-2" fontSize="small" />
                    Upload Data Checklist Bulanan Utility
                </button>
                <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
            </div>
        </div>
    );
};

export default BulananBoilerPage;