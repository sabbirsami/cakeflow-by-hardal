import { jsPDF } from 'jspdf';

import type { CakeOrder } from '../cake-order-funnel';

const line = (doc: jsPDF, y: number) => {
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(20, y, 190, y);
};

const writeKeyValue = (doc: jsPDF, label: string, value: string, y: number) => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(label, 20, y);
  doc.setFont('helvetica', 'normal');
  doc.text(value || '-', 80, y, { maxWidth: 110 });
};

const formatPickupDate = (date?: string) => {
  if (!date) {
    return '';
  }

  try {
    const parsed = new Date(date);
    return parsed.toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.warn('[HardalOrderPdf] Failed to format date', error);
    return date;
  }
};

const formatPickupTime = (time?: string) => {
  if (!time) {
    return '';
  }

  const [hours, minutes] = time.split(':');
  if (!hours || !minutes) {
    return time;
  }

  return `${hours}:${minutes}`;
};

export const generateHardalOrderPdf = (order: CakeOrder) => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  doc.setFillColor(249, 245, 241);
  doc.rect(0, 0, 210, 297, 'F');

  doc.setTextColor(51, 51, 51);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('Hardal Patisserie', 20, 26);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Custom Cake Order Summary', 20, 35);

  let y = 48;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Order Details', 20, y);
  line(doc, y + 2);

  y += 10;
  writeKeyValue(doc, 'Size', order.size ?? '—', y);
  y += 8;
  writeKeyValue(doc, 'Shape', order.shape ?? '—', y);
  y += 8;
  writeKeyValue(doc, 'Layers', order.layers ? String(order.layers) : '—', y);
  y += 8;
  writeKeyValue(
    doc,
    'Flavors',
    order.tastes && order.tastes.length > 0 ? order.tastes.join(', ') : '—',
    y,
  );
  y += 8;

  if (order.text) {
    doc.setFont('helvetica', 'bold');
    doc.text('Cake Message', 20, y);
    doc.setFont('helvetica', 'normal');
    doc.text(order.text, 80, y, { maxWidth: 110 });
    y += 8;
  }

  if (order.specialWishes) {
    doc.setFont('helvetica', 'bold');
    doc.text('Special Wishes', 20, y);
    doc.setFont('helvetica', 'normal');
    const wishesLines = doc.splitTextToSize(order.specialWishes, 110);
    doc.text(wishesLines, 80, y, { lineHeightFactor: 1.4 });
    y += wishesLines.length * 6;
  }

  if (y > 200) {
    doc.addPage();
    y = 26;
  } else {
    y += 8;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Pickup Information', 20, y);
  line(doc, y + 2);
  y += 10;

  writeKeyValue(doc, 'Pickup Date', formatPickupDate(order.date) || '—', y);
  y += 8;
  writeKeyValue(doc, 'Pickup Time', formatPickupTime(order.time) || '—', y);
  y += 12;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Contact Information', 20, y);
  line(doc, y + 2);
  y += 10;

  writeKeyValue(doc, 'Name', order.name ?? '—', y);
  y += 8;
  writeKeyValue(doc, 'Email', order.email ?? '—', y);
  y += 8;
  writeKeyValue(doc, 'Phone', order.phone ?? '—', y);
  y += 12;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Next Steps', 20, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  const nextSteps = [
    "We'll review your order and send a confirmation within 24 hours.",
    'You will receive a final price quote based on your specifications.',
    'Pick up your beautiful custom cake at the scheduled time.',
  ];

  nextSteps.forEach((step) => {
    y += 7;
    doc.circle(22, y - 2.5, 1.2, 'F');
    doc.text(step, 25, y);
  });

  const timestamp = new Date().toISOString().split('T')[0];
  const safeName = (order.name || 'hardal-order').replace(/[^a-z0-9\-]+/gi, '-').toLowerCase();
  const filename = `hardal-cake-order-${safeName}-${timestamp}.pdf`;

  doc.save(filename);
};
