# SHEESH MAHAL — ROYAL CINEMATIC WEDDING INVITATION
### For Faisal Bashir Khaira & Bint-e-Hanif

An opulent, mobile-first, hyper-animated digital wedding invitation inspired by the Mughal palace architecture of **Sheesh Mahal** (The Palace of Mirrors). Designed to feel like entering a magnificent royal court rather than browsing a conventional website.

---

## ✦ VERIFIED WEDDING CONTENT

- **Groom:** Faisal Bashir Khaira
- **Bride:** Bint-e-Hanif
- **Invitation Hosts:** Mr. & Mrs. Muhammad Bashir Ahmad Khaira
- **Family Signature:** The Khaira Family
- **Wax Seal Initials:** F & B
- **Quranic Verse:** وَخَلَقْنَاكُمْ أَزْوَاجًا — *“And We created you in pairs.”* (Surah An-Naba, 78:8)
- **Countdown Target:** `2026-12-13T11:30:00+05:00` (Barat Sehra Bandi in Pakistan Standard Time)

### 1. Mehndi Ceremony
- **Date:** Friday, 11 December 2026
- **Time:** 7:00 PM
- **Venue:** Khaira House
- **Address:** Chak No. 330 JB, Nawabpur
- **Aesthetic:** Mustard & Emerald, Marigolds, Paisley motifs

### 2. Barat Ceremony
- **Date:** Sunday, 13 December 2026
- **Sehra Bandi:** 11:30 AM
- **Rawangi Barat:** 12:00 PM
- **Departure:** Khaira Guest House
- **Address:** Chak No. 330 JB, Nawabpur
- **Aesthetic:** Royal Maroon Velvet & Antique Gold, Mughal arches, Chandeliers, Falling rose petals

### 3. Walima Ceremony
- **Date:** Monday, 14 December 2026
- **Reception:** 1:00 PM
- **Lunch:** 2:00 PM
- **Venue:** Tehzeeb Events Marquee
- **Address:** Jhang Road, Toba Tek Singh
- **Aesthetic:** Champagne & Ivory, delicate gold arabesques, soft illumination

### RSVP Contact Numbers
- **0336 8686330** (WhatsApp: `923368686330`)
- **0332 7373330** (WhatsApp: `923327373330`)

---

## ✦ ARCHITECTURAL & CINEMATIC SCENES

1. **Scene 1 — The Royal Envelope:**
   Full-screen maroon velvet envelope with golden ornamental borders and personalized guest salutation (`Dear [Guest Name]`). Tapping the "F & B" antique gold wax seal triggers haptic feedback, cracks the seal into two halves that tumble away, unfolds the 3D flap, bursts golden dust and rose petals, slides the invitation card upward, and zooms toward the camera.

2. **Scene 2 — The Sheesh Mahal Doors:**
   Two 3D intricately carved Mughal jali doors swing open with perspective, revealing volumetric cinematic light rays, mirror facets, Bismillah, Quranic verse (*Wa Khalaqnakum Azwaja*), host announcement, and a handwritten calligraphy reveal of the couple's names.

3. **Scene 3 — Scratch to Reveal:**
   Interactive gold-foil scratch card using HTML5 Canvas with `destination-out` compositing (mobile touch & desktop mouse). When 55% is scratched, it triggers a golden confetti burst and reveals the Save the Date typography (13 December 2026). Also includes an accessible tap-to-reveal alternative.

4. **Scene 4 — Wedding Flip-Clock Countdown:**
   Royal split-flap flip cards displaying Days, Hours, Minutes, and Seconds with golden emboss borders, targeting Barat Sehra Bandi (`2026-12-13T11:30:00+05:00` PKT).

5. **Scene 5 — The Wedding Journey:**
   Vertical timeline connected by a continuous golden thread. Features 3 distinct event cards (Mehndi, Barat, Walima) with 3D scroll entrance, shimmer light sweeps, and 3 functional actions on every card: **Open in Maps**, **Add to Google Calendar**, and **Download .ics Calendar File**.

6. **Scene 6 — Interactive Wedding Venues:**
   Tabbed selector for Khaira House, Khaira Guest House, and Tehzeeb Events Marquee. Displays Google Maps inside a luxurious Mughal arch frame with a one-touch **Get Directions** button.

7. **Scene 7 — Royal RSVP & Contact Card:**
   Compact, elegant royal card in maroon velvet with antique gold typography and animated Mughal ornamental borders.
   - Header: **RSVP** &bull; **FOR CONTACT**
   - Clickable direct calling numbers:
     - **0336 8686330** (`tel:03368686330`)
     - **0332 7373330** (`tel:03327373330`)
   - Loving invitation note: *“We Look Forward to Celebrating This Special Occasion With You.”*
   - Pure contact experience with zero form inputs or database collection.

8. **Scene 8 — The Royal Finale:**
   Grand closing scene featuring closing Dua (*Allah Ta'ala is naye safar ko...*), couple names, Khaira family signature, native Web Share API (with WhatsApp & copy link fallbacks without leaking guest name by default), host contact modal, and animation replay.

---

## ✦ AMBIENT & AUDIO SYSTEMS

- **Global Particle Canvas:** Lightweight HTML5 canvas rendering ~60 ambient particles (3D tumbling crimson rose petals, drifting gold dust, Sheesh Mahal mirror diamond glints, and soft cinematic golden bokeh). Pauses automatically when tab is hidden (`visibilitychange`).
- **Original Wedding Music Soundtrack:** Powered directly by the original wedding soundtrack file (`/music.mp3`, sourced from `https://faisal-wedding-invitation.netlify.app/music.mp3`). Begins playing upon opening the envelope, fades in smoothly over 2 seconds, loops continuously, and maintains uninterrupted playback across all scenes.
- **Floating Controls:** Music toggle button with animated pulsing equalizer bars and thin golden scroll-progress thread along screen edge.

---

## ✦ GUEST PERSONALISATION

Guests receive customized links with their name in the URL:
```
https://your-domain.netlify.app/?guest=Khala%20Shaheen
```
- Envelope displays: `Dear Khala Shaheen`
- RSVP form pre-fills: `Khala Shaheen`
- Sharing buttons automatically strip the personalized query so shared links remain clean (`Dear Guest` fallback).

---

## ✦ PREVIEW MODE

Test and inspect each scene independently by visiting `/preview`:
- `?scene=1` — Envelope
- `?scene=2` — Palace Doors
- `?scene=3` — Scratch Card
- `?scene=4` — Countdown
- `?scene=5` — Wedding Journey
- `?scene=6` — Venues & Maps
- `?scene=7` — RSVP Form
- `?scene=8` — Finale & Dua

---

## ✦ SUPABASE DATABASE SETUP

1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Go to the SQL Editor and execute `supabase/migrations/20261124_create_rsvps.sql`:
   ```sql
   create table if not exists public.rsvps (
     id uuid default gen_random_uuid() primary key,
     guest_name text not null,
     guests_count integer not null default 1 check (guests_count > 0 and guests_count <= 20),
     events text[] not null default '{}',
     message text,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   alter table public.rsvps enable row level security;

   create policy "Allow anonymous RSVP submission"
     on public.rsvps for insert to anon with check (true);

   create policy "Allow authenticated admin view"
     on public.rsvps for select to authenticated using (true);
   ```
3. Set your environment variables in `.env` or Netlify dashboard:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

*(Note: Even without Supabase credentials, guests can always RSVP instantly via the integrated WhatsApp buttons.)*

---

## ✦ LOCAL DEVELOPMENT & BUILD

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## ✦ NETLIFY DEPLOYMENT

The project includes `netlify.toml` preconfigured with single-page app redirection rules and caching headers.

1. Connect your repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` if using Supabase.
5. Deploy!
