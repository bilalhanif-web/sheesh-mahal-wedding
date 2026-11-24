import type { EventDetail } from '../config/invite';

function formatIcsDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

export function generateIcsContent(event: EventDetail): string {
  const start = formatIcsDate(event.startDateISO);
  const end = formatIcsDate(event.endDateISO);
  const now = formatIcsDate(new Date().toISOString());

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sheesh Mahal Royal Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${event.id}-${Date.now()}@sheesh-mahal.com`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title} - Faisal & Bint-e-Hanif`,
    `DESCRIPTION:${event.title} of Faisal Bashir Khaira & Bint-e-Hanif at ${event.venue}. Address: ${event.address}. RSVP: 0336 8686330 / 0332 7373330`,
    `LOCATION:${event.address}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadIcsFile(event: EventDetail) {
  const content = generateIcsContent(event);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${event.id}-faisal-bintehanif.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
