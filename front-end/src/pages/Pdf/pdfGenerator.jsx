import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString("id-ID", {
        day: '2-digit', month: 'long', year: 'numeric'
    });
};

export const generatePDFReport = async (formData) => {
  try {
    const response = await axios.post("http://localhost:5000/pdf", formData, {
      headers: { "Content-Type": "application/json" },
    });

    const pdfData = response.data;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(`Laporan - ${formData.period}`, 15, 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Tipe Berkas: ${formData.type}`, 15, 28);
    doc.text(`Tanggal Cetak: ${new Date().toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`, 15, 33);

    let yPos = 45;

    // Laporan Section
    if (pdfData.laporan && pdfData.laporan.length > 0) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Detail Laporan", 15, yPos);
      yPos += 7;

      autoTable(doc, {
        startY: yPos,
        head: [['Tanggal', 'Judul/Deskripsi', 'Status', 'Keterangan']],
        body: pdfData.laporan.map((item) => [
          formatDate(item.tanggal),
          item.judul, 
          item.status,
          item.deskripsi,
        ]),
        styles: { fontSize: 9 },
        headStyles: { fillColor: [41, 128, 185] },
      });
      yPos = doc.lastAutoTable.finalY + 10;
    } else {
        doc.setFontSize(10);
        doc.text("Tidak ada data laporan untuk periode yang dipilih.", 15, yPos);
    }
    
    // Checklist Section
    if (pdfData.checklist && pdfData.checklist.length > 0) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Detail Checklist", 15, yPos);
      yPos += 7;

      autoTable(doc, {
        startY: yPos,
        head: [['Tanggal', 'Nama Checklist', 'Status', 'Keterangan']],
        body: pdfData.checklist.map((item) => [
          formatDate(item.tanggal),
          item.nama,
          item.status,
          item.keterangan
        ]),
        styles: { fontSize: 9 },
        headStyles: { fillColor: [39, 174, 96] },
      });
      yPos = doc.lastAutoTable.finalY + 10;
    }

    // Karyawan Section
     if (pdfData.karyawan && pdfData.karyawan.length > 0) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Data Karyawan Terlibat", 15, yPos);
      yPos += 7;

      autoTable(doc, {
        startY: yPos,
        head: [['ID', 'Nama', 'Jabatan', 'Email']],
        body: pdfData.karyawan.map((item) => [
          item.id,
          item.nama,
          item.jabatan,
          item.email,
        ]),
        styles: { fontSize: 9 },
        headStyles: { fillColor: [243, 156, 18] },
      });
    }

    // Add Footer to all pages
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Halaman ${i} dari ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
      doc.text(
        "Dibuat dengan Aplikasi LaporanKU - Departemen Utility",
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 5,
        { align: "center" }
      );
    }

    doc.save(`LaporanKU-${formData.period.replace(/\s+/g, "-")}.pdf`);

  } catch (error) {
    console.error("Failed to generate PDF:", error);
    alert("Gagal membuat PDF. Periksa konsol untuk detailnya.");
  }
};