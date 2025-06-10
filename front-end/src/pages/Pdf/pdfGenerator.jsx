import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const generatePDFReport = async (data) => {

  const response = await axios.post("http://localhost:5000/pdf", data, {
  headers: {
    "Content-Type": "application/json",
  },
  });

  const pdfData = response.data;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(`Reporting - ${data.period}`, 15, 20);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Tipe: ${data.type}`, 15, 30);
  doc.text(
    `Tanggal Dicetak: ${new Date().toLocaleDateString("id-ID")}`,
    15,
    40
  );

  let yPos = 50;

  if (data.includes.income || data.includes.expense) {
    const totalIncome = data.includes.income
      ? pdfData.income.reduce((sum, item) => sum + item.amount, 0)
      : 0;

    const totalExpense = data.includes.expense
      ? pdfData.expense.reduce((sum, item) => sum + item.amount, 0)
      : 0;

    const netAmount = totalIncome - totalExpense;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Ringkasan", 15, yPos);
    yPos += 7;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    if (data.includes.income) {
      doc.text(`Total Pemasukan: ${formatCurrency(totalIncome)}`, 20, yPos);
      yPos += 5;
    }

    if (data.includes.expense) {
      doc.text(`Total Pengeluaran: ${formatCurrency(totalExpense)}`, 20, yPos);
      yPos += 5;
    }

    if (data.includes.income || data.includes.expense) {
      doc.setFont("helvetica", "bold");
      doc.text(`Selisih Bersih: ${formatCurrency(netAmount)}`, 20, yPos);
      yPos += 10;
    }
  }

  if (data.includes.income && pdfData.income.length > 0) {
    yPos += 5;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Pemasukan", 15, yPos);
    yPos += 5;

    autoTable(doc, {
      startY: yPos,
      head: [["Tanggal", "Kategori", "Jumlah"]],
      body: pdfData.income.map((item) => [
        item.date,
        item.category,
        formatCurrency(item.amount),
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [39, 174, 96] },
      columnStyles: {
        2: { halign: "left" },
      },
    });

    yPos = doc.lastAutoTable.finalY + 10;
  }

  if (data.includes.expense && pdfData.expense.length > 0) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Pengeluaran", 15, yPos);
    yPos += 5;

    autoTable(doc, {
      startY: yPos,
      head: [["Tanggal", "Kategori", "Jumlah"]],
      body: pdfData.expense.map((item) => [
        item.date,
        item.category,
        formatCurrency(item.amount),
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [231, 76, 60] },
      columnStyles: {
        2: { halign: "left" },
      },
    });

    yPos = doc.lastAutoTable.finalY + 10;
  }

  if (data.includes.accounts && pdfData.accounts.length > 0) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Reporting", 15, yPos);
    yPos += 5;

    autoTable(doc, {
      startY: yPos,
      head: [["Laporan", "Action Laporan"]],
      body: pdfData.accounts.map((item) => [
        item.name,
        formatCurrency(item.balance),
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [52, 152, 219] },
      columnStyles: {
        1: { halign: "left" },
      },
    });

    yPos = doc.lastAutoTable.finalY + 10;
  }

  if (data.includes.budget && pdfData.budget.length > 0) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Anggaran", 15, yPos);
    yPos += 5;

    autoTable(doc, {
      startY: yPos,
      head: [["Kategori", "Anggaran",]],
      body: pdfData.budget.map((item) => [
        item.category,
        formatCurrency(item.budgeted),
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [155, 89, 182] },
      columnStyles: {
        0: { halign: "left" },
        1: { halign: "left" },
      },
    });
  }

  const pageCount = doc.getNumberOfPages();
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

  doc.save(`Reporting-${data.period.replace(/\s+/g, "-")}.pdf`);
};
