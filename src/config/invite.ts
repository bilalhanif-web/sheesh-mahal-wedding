// SHEESH MAHAL — ROYAL WEDDING INVITATION CONFIGURATION
// All verified details for Faisal Bashir Khaira & Bint-e-Hanif

export interface EventDetail {
  id: 'mehndi' | 'barat' | 'walima';
  title: string;
  urduTitle: string;
  dateString: string;
  dayString: string;
  times: { label: string; time: string }[];
  venue: string;
  address: string;
  startDateISO: string; // ISO 8601 with +05:00 for PKT
  endDateISO: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    bgGradient: string;
    badgeText: string;
    icon: 'flower' | 'crown' | 'sparkle';
  };
  googleCalendarUrl: string;
  mapQuery: string;
  mapEmbedUrl: string;
}

export interface VenueLocation {
  id: string;
  name: string;
  urduName: string;
  role: string;
  address: string;
  mapQuery: string;
  embedQuery: string;
  directionsUrl: string;
}

export const WEDDING_CONFIG = {
  couple: {
    groom: {
      fullName: 'Faisal Bashir Khaira',
      shortName: 'Faisal',
      initial: 'F',
    },
    bride: {
      fullName: 'Bint-e-Hanif',
      shortName: 'Bint-e-Hanif',
      initial: 'B',
    },
    initials: 'F & B',
    hosts: 'Mr. & Mrs. Muhammad Bashir Ahmad Khaira',
    familySignature: 'The Khaira Family',
  },

  quranicVerse: {
    arabic: 'وَخَلَقْنَاكُمْ أَزْوَاجًا',
    translation: '“And We created you in pairs.”',
    reference: 'Surah An-Naba (78:8)',
  },

  bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',

  blessingDua: {
    arabic: 'اللہ تعالیٰ اس نئے سفر کو محبت، رحمت اور برکتوں سے بھر دے۔ آمین',
    translation: '“May Allah fill this new journey with love, mercy and blessings. Ameen.”',
    note: 'With love and warm regards',
    closingNote: 'Your presence will make our celebration complete.',
  },

  // Target countdown: Barat Sehra Bandi — Sunday, 13 December 2026 at 11:30 AM PKT
  countdownTargetISO: '2026-12-13T11:30:00+05:00',
  countdownHeading: 'The Celebration Begins In',
  countdownExpiredMessage: 'The Day We Have Been Waiting For Has Arrived.',

  colors: {
    velvetMaroon: '#5A0F1E',
    deepWine: '#2A0710',
    antiqueGold: '#D4AF37',
    champagne: '#F3E3C3',
    ivory: '#FAF6ED',
    emerald: '#143828',
    mustard: '#C88616',
    goldBright: '#FBE285',
    goldDark: '#8C6F1E',
  },

  events: [
    {
      id: 'mehndi',
      title: 'Mehndi Ceremony',
      urduTitle: 'تقریبِ مہندی',
      dateString: 'Friday, 11 December 2026',
      dayString: 'Friday',
      times: [
        { label: 'Time', time: '7:00 PM' }
      ],
      venue: 'Khaira House',
      address: 'Chak No. 330 JB, Nawabpur',
      startDateISO: '2026-12-11T19:00:00+05:00',
      endDateISO: '2026-12-11T23:00:00+05:00',
      theme: {
        primaryColor: '#C88616', // Mustard
        secondaryColor: '#143828', // Emerald
        accentColor: '#D4AF37', // Antique Gold
        bgGradient: 'from-[#143828]/90 via-[#1f4a36]/90 to-[#2A0710]/95',
        badgeText: 'Celebration of Henna & Colors',
        icon: 'flower',
      },
      mapQuery: 'Khaira House, Chak No. 330 JB, Nawabpur',
      mapEmbedUrl: 'https://maps.google.com/maps?q=Chak+No.+330+JB,+Nawabpur&t=&z=14&ie=UTF8&iwloc=&output=embed',
      googleCalendarUrl:
        'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mehndi+Ceremony+%7C+Faisal+%26+Bint-e-Hanif&dates=20261211T140000Z/20261211T180000Z&details=Mehndi+Ceremony+of+Faisal+Bashir+Khaira+%26+Bint-e-Hanif+at+Khaira+House.+RSVP%3A+03368686330&location=Khaira+House,+Chak+No.+330+JB,+Nawabpur',
    },
    {
      id: 'barat',
      title: 'Barat Ceremony',
      urduTitle: 'تقریبِ برات',
      dateString: 'Sunday, 13 December 2026',
      dayString: 'Sunday',
      times: [
        { label: 'Sehra Bandi', time: '11:30 AM' },
        { label: 'Rawangi Barat', time: '12:00 PM' },
      ],
      venue: 'Departure: Khaira Guest House',
      address: 'Chak No. 330 JB, Nawabpur',
      startDateISO: '2026-12-13T11:30:00+05:00',
      endDateISO: '2026-12-13T16:00:00+05:00',
      theme: {
        primaryColor: '#5A0F1E', // Velvet Maroon
        secondaryColor: '#D4AF37', // Antique Gold
        accentColor: '#FBE285', // Gold Bright
        bgGradient: 'from-[#5A0F1E]/95 via-[#3D0A14]/90 to-[#2A0710]/95',
        badgeText: 'The Royal Procession',
        icon: 'crown',
      },
      mapQuery: 'Khaira Guest House, Chak No. 330 JB, Nawabpur',
      mapEmbedUrl: 'https://maps.google.com/maps?q=Chak+No.+330+JB,+Nawabpur&t=&z=14&ie=UTF8&iwloc=&output=embed',
      googleCalendarUrl:
        'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Barat+Ceremony+%7C+Faisal+%26+Bint-e-Hanif&dates=20261213T063000Z/20261213T110000Z&details=Barat+Ceremony+of+Faisal+Bashir+Khaira+%26+Bint-e-Hanif.+Departure+from+Khaira+Guest+House.+RSVP%3A+03368686330&location=Khaira+Guest+House,+Chak+No.+330+JB,+Nawabpur',
    },
    {
      id: 'walima',
      title: 'Walima Ceremony',
      urduTitle: 'دعوتِ ولیمہ',
      dateString: 'Monday, 14 December 2026',
      dayString: 'Monday',
      times: [
        { label: 'Reception', time: '1:00 PM' },
        { label: 'Lunch', time: '2:00 PM' },
      ],
      venue: 'Tehzeeb Events Marquee',
      address: 'Jhang Road, Toba Tek Singh',
      startDateISO: '2026-12-14T13:00:00+05:00',
      endDateISO: '2026-12-14T17:00:00+05:00',
      theme: {
        primaryColor: '#F3E3C3', // Champagne
        secondaryColor: '#D4AF37', // Gold
        accentColor: '#FAF6ED', // Ivory
        bgGradient: 'from-[#3A2814]/90 via-[#2A170B]/90 to-[#2A0710]/95',
        badgeText: 'Royal Feast & Blessings',
        icon: 'sparkle',
      },
      mapQuery: 'Tehzeeb Events Marquee, Jhang Road, Toba Tek Singh',
      mapEmbedUrl: 'https://maps.google.com/maps?q=Tehzeeb+Events+Marquee,+Jhang+Road,+Toba+Tek+Singh&t=&z=14&ie=UTF8&iwloc=&output=embed',
      googleCalendarUrl:
        'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Walima+Ceremony+%7C+Faisal+%26+Bint-e-Hanif&dates=20261214T080000Z/20261214T120000Z&details=Walima+Ceremony+of+Faisal+Bashir+Khaira+%26+Bint-e-Hanif+at+Tehzeeb+Events+Marquee.+RSVP%3A+03368686330&location=Tehzeeb+Events+Marquee,+Jhang+Road,+Toba+Tek+Singh',
    },
  ] as EventDetail[],

  venues: [
    {
      id: 'khaira-house',
      name: 'Khaira House',
      urduName: 'خیرہ ہاؤس',
      role: 'Venue for Mehndi Ceremony',
      address: 'Chak No. 330 JB, Nawabpur',
      mapQuery: 'Khaira House, Chak No. 330 JB, Nawabpur',
      embedQuery: 'Chak No. 330 JB, Nawabpur',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Chak+No.+330+JB,+Nawabpur',
    },
    {
      id: 'khaira-guest-house',
      name: 'Khaira Guest House',
      urduName: 'خیرہ گیسٹ ہاؤس',
      role: 'Venue for Barat (Sehra Bandi & Rawangi)',
      address: 'Chak No. 330 JB, Nawabpur',
      mapQuery: 'Khaira Guest House, Chak No. 330 JB, Nawabpur',
      embedQuery: 'Chak No. 330 JB, Nawabpur',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Chak+No.+330+JB,+Nawabpur',
    },
    {
      id: 'tehzeeb-marquee',
      name: 'Tehzeeb Events Marquee',
      urduName: 'تہذیب ایونٹس مارکی',
      role: 'Venue for Walima Reception & Lunch',
      address: 'Jhang Road, Toba Tek Singh',
      mapQuery: 'Tehzeeb Events Marquee, Jhang Road, Toba Tek Singh',
      embedQuery: 'Tehzeeb Events Marquee, Jhang Road, Toba Tek Singh',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Tehzeeb+Events+Marquee,+Jhang+Road,+Toba+Tek+Singh',
    },
  ] as VenueLocation[],

  contacts: [
    {
      display: '0336 8686330',
      raw: '03368686330',
      whatsapp: '923368686330',
      label: 'Khaira Family RSVP 1',
    },
    {
      display: '0332 7373330',
      raw: '03327373330',
      whatsapp: '923327373330',
      label: 'Khaira Family RSVP 2',
    },
  ],

  music: {
    title: 'Faisal & Bint-e-Hanif Wedding Music',
    src: '/music.mp3', // Verified soundtrack from https://faisal-wedding-invitation.netlify.app/music.mp3
    originalUrl: 'https://faisal-wedding-invitation.netlify.app/music.mp3',
    fadeInDurationSeconds: 2.0,
    defaultVolume: 0.7,
  },

  urls: {
    siteUrl: typeof window !== 'undefined' ? window.location.origin : 'https://faisal-wedding-invitation.netlify.app',
    originalReference: 'https://faisal-wedding-invitation.netlify.app',
  },
} as const;
