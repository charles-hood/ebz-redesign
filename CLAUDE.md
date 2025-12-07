# Ebenezer Church Website Redesign

## Project Overview

This is a modern website redesign for Ebenezer Methodist Church in Milton, GA. The church has a dual identity:
1. **Historic Methodist Church** - established 1853, traditional worship community
2. **The Pardue Center** - a new 23,000 sq ft event venue for weddings, concerts, and community events

The website needs to serve both audiences without confusion.

## Quick Start

```bash
cd /Users/charles/Projects/ebzrefesh/site
python3 -m http.server 8080
```
Then open http://localhost:8080

## Design Inspiration

The design is modeled after modern "megachurch" websites with clean, contemporary aesthetics:
- **Austin Stone Community Church** (austinstone.org) - artistic, white space, great sermon library
- **Elevation Church** (elevationchurch.org) - clean, simplified nav, keeps people on-site
- **Woodstock City Church** (woodstockcity.org) - regional example, warm community vibe
- **Relevant Community Church** (relevantcommunity.org) - most similar situation (church + event venue)

### Key Design Patterns Implemented
- Full-width hero with looping video background
- Simplified navigation (7 items including Calendar)
- Card-based content sections
- Lots of white space
- Mobile-first responsive design
- Professional but warm aesthetic

## File Structure

```
ebzrefesh/
├── CLAUDE.md                 # This file
├── assets/                   # Downloaded assets from production site
│   ├── images/
│   │   ├── logo.png
│   │   ├── staff/
│   │   ├── church/
│   │   └── programs/
│   └── content/
│       ├── site-content.md   # All scraped text content
│       └── video-sources.md
├── site/                     # The new website
│   ├── index.html            # Main single-page site
│   ├── sermons.html          # Full sermon archive
│   ├── history.html          # Church history (1853-present)
│   ├── outreach.html         # Outreach ministries (Drake House, NFCC, etc.)
│   ├── beat-the-drum.html    # Beat The Drum Village - Kenya orphanage
│   ├── beliefs.html          # Statement of faith
│   ├── events.html           # Calendar page (embeds littlewhite.church)
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── logo-header.png   # Steeple icon (transparent bg, also favicon)
│       ├── logo.png          # White logo for footer
│       ├── hero-slideshow.mp4 # Looping video for hero background
│       ├── glenn-contemporary.jpg # Sunday Worship card image
│       ├── church-hero.jpg   # Church exterior (video poster fallback)
│       ├── church-side-view-full.jpg  # High-res church (history page hero)
│       ├── pardue-center.jpg # Sunrise shot of Pardue Center
│       ├── full-contemporary.jpg # Give section background
│       ├── wedding-venue.jpg # Wedding modal image
│       ├── pavillion.jpg     # Event/wedding modal image
│       ├── pardue-stage.jpg  # Event modal image
│       ├── outreach.jpg      # Drake House volunteers photo
│       ├── beat-the-drum.jpg # BTD children in uniforms (content page)
│       ├── beat-the-drum-video.jpg  # YouTube thumbnail (card image)
│       ├── beliefs-hero.png  # Beliefs page image
│       ├── give-qr.png       # QR code for giving
│       └── staff/            # Staff headshots
└── ebenezer_meeting_notes_session.md  # Context from design meeting
```

## Technical Stack

- **Static HTML/CSS/JS** - no framework, easy to host anywhere
- **Fonts**: Playfair Display (headings) + DM Sans (body) via Google Fonts
- **No build process** - edit and refresh

## Third-Party Integrations

### One Church Software
Used for church management, giving, and sermons.

**Sermon Embed (single sermon):**
```html
<iframe id="onechurch_form_sermon_21"
    src="https://ebz.onechurchsoftware.com/embed/media?sermon=21&bg=ffffff&text=6a6a6a&title=020a0d"
    seamless="seamless" width="100%" height="100%" scrolling="auto"
    allowfullscreen="true" frameborder="0">
</iframe>
<script src="https://s3.amazonaws.com/onechurch/bridge.js"></script>
```

**Sermon List Embed (for sermons.html):**
```html
<iframe id="onechurch_form_sermons"
    src="https://ebz.onechurchsoftware.com/embed/sermons?bg=ffffff&inplace=true&text=6a6a6a&box=eeeeee&button=020a0d&accent=575757&title=020a0d"
    seamless="seamless" width="100%" height="800" scrolling="auto"
    allowfullscreen="true" frameborder="0">
</iframe>
<script src="https://s3.amazonaws.com/onechurch/inplace.bridge.js"></script>
```

**Giving URL:** https://app.onechurchsoftware.com/ebz/egiving

### YouTube
- Channel: https://www.youtube.com/@ebenezermethodistchurchofm6983/streams
- Livestream every Sunday at 11:15 AM

### Calendar (littlewhite.church)
Church calendar is embedded via iframe from littlewhite.church (a FullCalendar-based service).

```html
<iframe
    id="calendarFrame"
    class="calendar-frame"
    src="https://littlewhite.church/?view=list"
    title="Church Events Calendar"
    loading="lazy">
</iframe>
```

The calendar has its own view toggle (list/month) so the page design is kept minimal.

### Social Media
- **Facebook:** https://www.facebook.com/EbzMethodistChurch
- **YouTube:** https://www.youtube.com/@ebenezermethodistchurchofm6983/streams

Social icons (SVG) are included in the footer of all pages.

## Key Design Decisions

### Hero Messaging
**Current:** "Grow your faith. Celebrate life."

Shortened from the original longer version for punchier impact. The dual identity (church + venue) is reinforced in the Plan Your Visit section with "Two venues, one church — find the service that fits you."

### Logo
Using the steeple icon only (`logo-header.png`) rather than the full horizontal logo. The square steeple icon with "Est. 1853" fits better in the header and balances with the nav buttons. Background was made transparent using ImageMagick to blend with the off-white header.

### Navigation Structure
```
Watch | About | Connect | Calendar | The Center | [Give] | [Plan a Visit]
```
"The Center" refers to the Pardue Family Foundation Center (venue). Calendar was added as a top-level nav item to give visibility to church activities.

### Color Palette
```css
--color-primary: #1a365d;      /* Deep navy blue */
--color-primary-light: #2c5282;
--color-accent: #c9a227;        /* Gold */
--color-text: #1a1a1a;
--color-bg: #ffffff;
--color-bg-alt: #f7f8fa;
```

### Staff Bios
Staff cards are clickable and open a modal with full bio and email link. Staff data is stored in `main.js` as a JavaScript object for easy updates.

## SEO Implementation

Meta tags target these keywords (from design meeting):
- "Methodist church Milton GA"
- "event venue Milton GA"
- "wedding venue Milton"
- "wedding venue North Atlanta"
- "concert venue North Metro Atlanta"
- "Pardue Center"

Includes Open Graph tags, geo tags, and canonical URLs.

## Responsive Breakpoints (Mobile-First)

```css
/* Base: Mobile */
@media (min-width: 600px)  { /* Tablet portrait */ }
@media (min-width: 768px)  { /* Tablet landscape */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Large desktop */ }
```

Also includes:
- Touch device optimizations (`hover: none`)
- Reduced motion support (`prefers-reduced-motion`)
- Print styles

## Dynamic Elements

### Footer Copyright Year
Automatically updates to current year:
```html
<p>&copy; <span id="currentYear"></span> Ebenezer Church. All rights reserved.</p>
<script>document.getElementById('currentYear').textContent = new Date().getFullYear();</script>
```

### Staff Modal
Clicking a staff card opens a modal with their photo, title, bio, and email button. Close via X, backdrop click, or Escape key.

## Known Issues / TODO

### Sermon Thumbnail
The One Church Software sermon embed uses their default thumbnail. Options to customize:
1. Change in One Church Software admin (if supported)
2. Create custom thumbnail overlay that reveals embed on click

### Future Enhancements (from meeting notes)
1. **Ticketing integration** - Pardue Center events will need a ticketing platform (Eventbrite, TicketLeap, or Brown Paper Tickets)
2. **Dedicated weddings page** - could rank for "wedding venue Milton GA" (currently handled via modal)
3. **Dual-path landing page** - "What brings you to Ebenezer?" split (deferred for now)

### SEO Targets Not Yet Addressed
- Google Business Profile optimization
- Structured data (Schema.org)
- Dedicated weddings page (currently modal only)

### Completed (Previously TODO)
- ✅ History page - created `history.html` with timeline and images
- ✅ Outreach page - created `outreach.html`
- ✅ Beat The Drum page - created `beat-the-drum.html` with video embed
- ✅ Beliefs page - created `beliefs.html` with statement of faith
- ✅ Events/Calendar page - created `events.html` with littlewhite.church embed
- ✅ Calendar in main navigation
- ✅ Social media icons in footer (Facebook, YouTube)
- ✅ Wedding inquiry modal with contact info and images
- ✅ Event inquiry modal with contact info and images
- ✅ Hero video background (looping slideshow from legacy site)
- ✅ Give section background image
- ✅ Favicon on all pages
- ✅ Map embed - fixed with exact coordinates and Google place ID
- ✅ Facebook content workflow - Juicer.io integration on homepage

## Church Information

**Address:** 12900 Arnold Mill Road, Milton, GA 30075
**Phone:** 770-640-7287
**Email:** office@ebzchurch.org

### Service Times
| Time | Location | Style |
|------|----------|-------|
| 8:30 AM | Historic Sanctuary | Traditional |
| 10:00 AM | The Pardue Center | Contemporary |
| 11:15 AM | Historic Sanctuary | Traditional |

### Staff
| Name | Title | Email |
|------|-------|-------|
| Glenn Hannigan | Senior Pastor | ghannigan1@yahoo.com |
| Robbie Underwood | Executive Minister | executive@ebzchurch.org |
| Greg Millette | Music Minister & Pianist | music@ebzchurch.org |
| Asa Sellers | Worship Leader | worship@ebzchurch.org |
| Lisa Coxworth | Administrative Assistant | office@ebzchurch.org |

### Beat The Drum Village Partnership
- **Location:** Kenya
- **Mission:** Home for children orphaned by HIV/AIDS
- **Leader:** Bishop David Thagana
- **Ebenezer Connection:** Started via film project by David McBrayer
- **Currently Supporting:** 33 children
- **Giving Fund:** "Beat the Drum (Glory Outreach Assembly)" in One Church dropdown
- **YouTube Video:** https://youtu.be/keb1jafdu9U
- **Image Sources:** `/Users/charles/projects/BTD/` contains newsletter HTML with embedded images

## Reference Documents

- `ebenezer_meeting_notes_session.md` - Full context from December 4, 2025 design meeting
- `assets/content/site-content.md` - All text content scraped from production site
- `assets/ASSET-MANIFEST.md` - Inventory of all downloaded assets

## Deployment

**Pilot Domain:** ebenezermilton.org (may not be final domain)
**Hosting:** Digital Ocean VPS droplet with Caddy
**Repo:** https://github.com/charles-hood/ebz-redesign

**Caddy config:**
```
ebenezermilton.org {
    root * /var/www/ebz-redesign/site
    file_server
    encode gzip
}
```

**To deploy updates:**
```bash
cd /var/www/ebz-redesign && git pull
```

## Session History

### December 7, 2025 (Session 5)
- Created portrait video (720x1280) for mobile hero section:
  - Source photos from `/Users/charles/Downloads/church-photos-to-video/`
  - Custom focal points for each of 6 images to keep subjects centered in portrait crop
  - Script: `create_portrait_slideshow.py` in that directory for future regeneration
  - Final focal points: Pardue Center (0.70), Worship Band (0.22), Glenn & Candi (0.35), Guitar Session (0.75), Pavilion (0.32), Youth Group (0.72)
- Implemented responsive video swap in hero section:
  - Desktop/tablet (768px+): landscape video (`hero-slideshow.mp4`)
  - Mobile (<768px): portrait video (`hero-slideshow-mobile.mp4`)
  - CSS classes: `.hero-video-desktop`, `.hero-video-mobile`
- Darkened mobile hero overlay for better text readability:
  - Desktop: 0.7/0.5/0.8 opacity gradient (unchanged)
  - Mobile: 0.8/0.6/0.85 opacity gradient (~10% darker)
- Tightened section spacing site-wide:
  - Section padding: 8rem → 5rem desktop (80px), 3rem mobile (48px)
  - Section header margin: 5rem → 3rem (48px)
  - Reduces "scroll fatigue" while maintaining visual separation

### December 6, 2025 (Session 4)
- Fixed Google Maps embed in Plan Your Visit section:
  - Changed from text query to exact coordinates (34.0954361, -84.367749)
  - Used proper Google Maps embed format with place ID
  - Fixed incorrect zip code (was 30004, corrected to 30075)
- Changed "Get Directions" button from Apple Maps to Google Maps universal link
- Added Juicer.io Facebook feed integration:
  - New "Follow Us on Facebook" section after Give, before footer
  - Positioned as "bonus content" for engaged scrollers (doesn't interrupt main flow)
  - JS embed (not iframe) for better responsiveness
  - Fixed modal positioning via Juicer custom CSS
  - Decision: No icon next to heading - clean design wins
- Created GitHub repository:
  - Repo: https://github.com/charles-hood/ebz-redesign
  - Only essential files committed (site/, CLAUDE.md, .gitignore)
  - Working files excluded via .gitignore
- Updated canonical URLs from ebzchurch.org to ebenezermilton.org for pilot
- Deployed to Digital Ocean VPS with Caddy
- Site live at https://ebenezermilton.org

### December 6, 2025 (Session 3)
- Added favicon (`logo-header.png`) to all 7 HTML pages
- Updated Sunday Worship card image to `glenn-contemporary.jpg`
- Created "Host an Event" modal for Pardue Center:
  - Contact info for Robbie Underwood and Lisa Coxworth
  - Images: `pavillion.jpg` and `pardue-stage.jpg`
  - Phone number and email links
- Created "Plan Your Wedding" modal with similar structure:
  - Images: `wedding-venue.jpg` and `pavillion.jpg`
- Fixed staff modal photo cropping (added `imagePosition` to staffData in main.js)
- Fixed footer links across all pages:
  - Give → https://app.onechurchsoftware.com/ebz/egiving
  - Our History → history.html
  - What We Believe → beliefs.html
  - Events → events.html
- Created `beliefs.html` - statement of faith page:
  - Content from legacy site
  - Image floated right with text wrap
  - "We believe" phrases emphasized in accent color
  - CTA at bottom
- Added hero video background (`hero-slideshow.mp4`) downloaded from legacy site
- Added Give section background image (`full-contemporary.jpg`) with 85% navy overlay
- Created `events.html` - calendar page:
  - Embeds littlewhite.church FullCalendar via iframe
  - Minimal design (calendar has own view toggle)
  - Container widened to 1200px, height 800px
- Added "Calendar" to main navigation on all pages
- Added social media icons (Facebook, YouTube) to footer on all pages
- Standardized all footers with `logo.png` and "A community of faith since 1853" tagline

### December 6, 2025 (Session 2)
- Fixed nav button colors (CSS specificity issue - `.nav-links a` was overriding button colors)
- Redesigned mobile hamburger menu from full-screen overlay to compact dropdown
- Lightened venue section overlay to match hero section (was too blue/dark)
- Updated hero text: "Grow your faith. Celebrate life." (shortened for impact)
- Updated service times throughout site (8:30 AM, 10:00 AM, 11:15 AM)
- Added "Two venues, one church" tagline to Plan Your Visit section
- Fixed staff photo cropping for Glenn, Robbie, Greg (adjusted `object-position`)
- Created `history.html` - full church history with timeline markers and images
- Created `outreach.html` - Drake House, NFCC, veterans, food drives
- Created `beat-the-drum.html` - Kenya orphanage with:
  - Context: HIV/AIDS orphans, Bishop David Thagana, David McBrayer connection
  - Embedded YouTube video (https://youtu.be/keb1jafdu9U)
  - Direct giving link to One Church with fund selection instructions
- Made Connect section cards fully clickable (not just the link text)
- Updated card images:
  - Sunday Worship: `church-hero.jpg`
  - Outreach: `outreach.jpg` (Drake House photo, adjusted crop)
  - Beat The Drum: `beat-the-drum-video.jpg` (YouTube thumbnail)
- Extracted Beat The Drum children photo from `/Users/charles/projects/BTD/` newsletter files

### December 6, 2025 (Session 1)
- Scraped assets and content from ebzchurch.org
- Built modern single-page site with mobile-first responsive design
- Integrated One Church Software for sermons and giving
- Added staff section with clickable bio modals
- Created Pardue Center venue section
- Implemented SEO meta tags targeting local search terms
- Added QR code for giving
- Made logo transparent and optimized for header
- Added dynamic copyright year
