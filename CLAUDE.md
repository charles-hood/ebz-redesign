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
│   ├── events.html           # Calendar page (OCS v3.1 grid/list toggle)
│   ├── ministries.html       # Ministries landing page (10 ministry cards)
│   ├── test-events-forward.html  # Test page for events-forward layout
│   ├── embed-events.html     # Helper page (may be unused)
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
│       ├── wedding-venue.jpg # Wedding modal image (sanctuary exterior)
│       ├── wedding-pavilion.jpg # Real wedding ceremony in pavilion
│       ├── pavillion.jpg     # Event modal image (empty pavilion)
│       ├── pardue-stage.jpg  # Event modal image
│       ├── outreach.jpg      # Drake House volunteers photo
│       ├── beat-the-drum.jpg # BTD children in uniforms (content page)
│       ├── beat-the-drum-video.jpg  # YouTube thumbnail (card image)
│       ├── beliefs-hero.png  # Beliefs page image
│       ├── give-qr.png       # QR code for giving
│       ├── staff/            # Staff headshots
│       └── ministries/       # Ministry card photos
│           ├── nursery.jpg
│           ├── youth.jpg
│           ├── men.jpg
│           ├── women.jpg
│           ├── music.jpg
│           └── worship-service.jpg
└── ebenezer_meeting_notes_session.md  # Context from design meeting
```

## Technical Stack

- **Static HTML/CSS/JS** - no framework, easy to host anywhere
- **Fonts**: Playfair Display (headings) + DM Sans (body) via Google Fonts
- **No build process** - edit and refresh

## Third-Party Integrations

### One Church Software (OCS v3.1 Embeds)
Used for church management, giving, sermons, events, and calendar. All embeds use the **v3.1 embed system** (`cdn.onechurchsoftware.com/embed/v3.1.js`).

**IMPORTANT:** Do NOT use legacy `bridge.js` or `inplace.bridge.js` — they conflict with v3.1.js on Chrome (causes `ServingScheduleResponse` TypeError). All pages now use v3.1 only.

**Latest Sermon (auto-updating, on index.html):**
```html
<div class="ocs-embed" data-ocs-bg="#ffffff" data-ocs-title="#333333" data-ocs-text="#333333" data-ocs-box="#ffffff" data-ocs-show-description="false" data-ocs-show-speaker="false" data-ocs-tenant="ebz" data-ocs-embed="sermons/latest"></div>
```
This automatically shows the most recent sermon — **zero weekly maintenance**.

**Sermon Archive (on sermons.html):**
```html
<div class="ocs-embed" data-ocs-bg="#ffffff" data-ocs-title="#333333" data-ocs-text="#333333" data-ocs-box="#ffffff" data-ocs-button="#020a0d" data-ocs-show-filters="false" data-ocs-show-speaker="false" data-ocs-show-series="false" data-ocs-tenant="ebz" data-ocs-embed="sermons/listing"></div>
```

**Single Featured Event (on index.html "Coming Up" section):**
```html
<div class="ocs-embed" data-ocs-id="10490" data-ocs-primary="#020a0d" data-ocs-description="false" data-ocs-tenant="ebz" data-ocs-embed="event"></div>
```
Change `data-ocs-id` to promote a different event. Find event IDs in OCS admin.

**Events Calendar Grid (on events.html):**
```html
<div class="ocs-embed" data-ocs-bg="#ffffff" data-ocs-tenant="ebz" data-ocs-embed="events/calendar"></div>
```

**Events Listing (on events.html):**
```html
<div class="ocs-embed" data-ocs-bg="#ffffff" data-ocs-title="#333333" data-ocs-text="#333333" data-ocs-box="#ffffff" data-ocs-accent="#020a0d" data-ocs-button="#020a0d" data-ocs-tenant="ebz" data-ocs-embed="events/listing"></div>
```

**Script (one per page, in `<head>` for reliable initialization):**
```html
<script async src="https://cdn.onechurchsoftware.com/embed/v3.1.js"></script>
```

**Giving URL:** https://app.onechurchsoftware.com/ebz/egiving

### YouTube
- Channel: https://www.youtube.com/@ebenezermethodistchurchofm6983/streams
- Livestream every Sunday at 11:15 AM

### Social Media
- **Facebook:** https://www.facebook.com/EbzMethodistChurch
- **YouTube:** https://www.youtube.com/@ebenezermethodistchurchofm6983/streams
- **Instagram (Pardue Center):** https://www.instagram.com/parduecenterofficial
- **Instagram (Youth/RISE):** https://www.instagram.com/rise_youth__/ (not yet linked on site — add when youth section is built)

Social icons (Facebook, YouTube, Instagram) are in the footer of all pages. Instagram also appears as a "See Our Space" button in the Pardue Center venue section on the homepage.

### Juicer (Facebook Feed)
Aggregates Facebook posts into an embedded feed on the homepage. Using **Starter plan** (no branding).

**Feed URL:** https://www.juicer.io/feeds/ebzmethodistchurch

**Implementation:**
```html
<!-- In <head> -->
<link href="https://assets.juicer.io/embed.css" media="all" rel="stylesheet">

<!-- In page body -->
<ul class="juicer-feed" data-feed-id="ebzmethodistchurch" data-per="6"></ul>
<script src="https://assets.juicer.io/embed.js" type="text/javascript"></script>
```

- `data-per="6"` limits to 6 posts (default is 15)
- CSS loaded explicitly in `<head>` (required for mobile styling)
- Modal positioning CSS configured in Juicer dashboard (not in local style.css)

## Key Design Decisions

### Hero Messaging
**Current:** "Growing in Grace, Perfected in Love" (updated Jan 2026 per Candi's request)

The dual identity (church + venue) is reinforced in the Plan Your Visit section with "Two venues, one church — find the service that fits you."

### Logo
Using the steeple icon only (`logo-header.png`) rather than the full horizontal logo. The square steeple icon with "Est. 1853" fits better in the header and balances with the nav buttons. Background was made transparent using ImageMagick to blend with the off-white header.

### Navigation Structure
```
Get Started | About | Watch | The Pardue Center | Ministries | Calendar | [Give] | [Plan a Visit]
```
Updated Feb 2026 per Candi's request. "Get Started" links to #visit (interim until dedicated page is built). "The Pardue Center" links to #venue. "Ministries" links to `ministries.html`. Other nav items link to homepage sections or existing pages. Calendar links to `events.html`.

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
Staff cards are clickable and open a modal with full bio and email link. Staff data is stored in `main.js` as a JavaScript object for easy updates. Email addresses are set via JavaScript (not in HTML) to reduce scraper harvesting. Note: This can cause issues with browser extensions that intercept `mailto:` links on page load.

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
- ✅ Events/Calendar page - `events.html` with OCS v3.1 grid/list toggle (replaced littlewhite.church)
- ✅ Calendar in main navigation
- ✅ Social media icons in footer (Facebook, YouTube)
- ✅ Wedding inquiry modal with contact info and images
- ✅ Event inquiry modal with contact info and images
- ✅ Hero video background (looping slideshow from legacy site)
- ✅ Give section background image
- ✅ Favicon on all pages
- ✅ Map embed - fixed with exact coordinates and Google place ID
- ✅ Facebook content workflow - Juicer.io integration on homepage
- ✅ OCS v3.1 embed migration - all pages now use v3.1 (no more bridge.js)
- ✅ Auto-updating sermon - `sermons/latest` embed, zero weekly maintenance
- ✅ Featured event section - "Coming Up" on homepage with single event card by ID
- ✅ Ministries landing page - `ministries.html` with cards for all 10 ministries
- ✅ Nav restructure per Candi - new order with Get Started, Ministries, The Pardue Center
- ✅ Mission statement updated - "To know the love of God, to share it with others, and make disciples of Jesus Christ."
- ✅ Address corrected to Roswell, GA (was Milton) on all pages
- ✅ Address in hero - subtle Google Maps link below service times
- ✅ robots.txt and sitemap.xml (April 2026 audit follow-up)
- ✅ aria-expanded/aria-controls on mobile nav toggle (April 2026 audit follow-up)
- ✅ :focus-visible keyboard focus ring (April 2026 audit follow-up)
- ✅ Lazy loading and fetchpriority hints on all content images (April 2026 audit follow-up)
- ✅ Image optimization pass — site/images halved from ~50MB to 20MB (April 2026 audit follow-up)

## Church Information

**Address:** 12900 Arnold Mill Road, Roswell, GA 30075
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
| Robbie Underwood | Facilities Manager | robbie@ebzchurch.org |
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

**Primary domain:** ebzchurch.org (www.ebzchurch.org)
**Alias domain:** ebenezermilton.org (www.ebenezermilton.org) — serves the same content
**Hosting:** Digital Ocean VPS droplet with Caddy
**Repo:** https://github.com/charles-hood/ebz-redesign

The legacy WordPress site at ebzchurch.org was replaced by this repo in April 2026. Both domains point at `/var/www/ebz-redesign/site` via the same Caddy block.

**Caddy config (abbreviated):**
```
ebenezermilton.org, www.ebenezermilton.org,
ebzchurch.org, www.ebzchurch.org {
    root * /var/www/ebz-redesign/site
    file_server
    encode gzip

    # Cache control for static assets and HTML (see full config on server)

    try_files {path} {path}.html {path}/ /index.html
}
```

**Extensionless URL routing (important):**
The `{path}.html` segment in `try_files` is what makes extensionless URLs like `https://ebzchurch.org/events` resolve to `events.html`. **The `<link rel="canonical">` tags on every sub-page (`events.html`, `sermons.html`, `history.html`, `beliefs.html`, `ministries.html`, `outreach.html`, `beat-the-drum.html`, `easter.html`) all point at extensionless URLs like `https://ebzchurch.org/events`.** Those canonicals depend on this Caddy rule to resolve correctly.

If the Caddy `try_files` ever loses the `{path}.html` fallback, extensionless URLs will silently fall through to `/index.html` with a 200 response, and every canonical on the site will return homepage content — a self-referential SEO mess. Codex flagged this as a repo-level audit finding in April 2026 because the dependency is invisible to anyone reading only the repo; the Caddy config lives on the server. Verification command after any Caddy change:
```bash
curl -sL https://ebzchurch.org/events | grep -o '<title>[^<]*</title>'
# Expect: <title>Events | Ebenezer Methodist Church | Milton, GA</title>
# NOT the homepage title.
```

**To deploy updates:**
```bash
cd /var/www/ebz-redesign && git pull
```

## Featured Event Update Pattern

To promote a different event on the homepage "Coming Up" section:

1. Find the event ID in One Church Software admin
2. Edit `site/index.html` — change **both** the `data-ocs-id` and the overlay `<a>` href:
```html
<div style="position: relative; cursor: pointer; max-width: 600px; margin: 0 auto;">
    <div class="ocs-embed" data-ocs-id="NEW_ID" data-ocs-primary="#020a0d" data-ocs-description="false" data-ocs-tenant="ebz" data-ocs-embed="event"></div>
    <a href="https://ebz.onechurchsoftware.com/api/share/events/NEW_ID" target="_blank" rel="noopener" style="position: absolute; inset: 0; z-index: 10;"></a>
</div>
```
3. Commit and deploy

**OCS share URL format:** `https://ebz.onechurchsoftware.com/api/share/events/{EVENT_ID}`

This replaces the old hero takeover pattern for routine event promotion. Hero takeovers are still available for major holidays.

**Note:** The sermon embed (`sermons/latest`) auto-updates — no maintenance needed for weekly sermons.

## Seasonal Hero Takeover Pattern

For special events (Valentine's, Easter, Christmas, etc.), use this pattern to display a flyer/graphic on the homepage hero. This is a quick operation - should take under 5 minutes.

### To Add a Seasonal Takeover

1. **Copy the flyer image** to `site/images/` (e.g., `valentine-breakfast.png`)

2. **Edit `site/index.html`** - Replace the hero section with:
```html
<!-- Hero Section - [EVENT NAME] Takeover -->
<section class="hero">
    <div class="hero-bg hero-bg-seasonal">
        <img src="images/church-hero.jpg" alt="">
    </div>
    <div class="hero-overlay"></div>
    <div class="hero-content hero-content-seasonal">
        <img src="images/YOUR-FLYER.png" alt="[Event description]" class="seasonal-overlay">
        <!-- Hidden during takeover - restore when reverting:
        <p class="hero-subtitle" style="margin-top: 1.5rem;">Sundays at 8:30, 10:00 & 11:15 AM</p>
        -->
        <div class="hero-ctas">
            <a href="#visit" class="btn btn-primary btn-lg">Plan Your Visit</a>
            <a href="#watch" class="btn btn-outline-light btn-lg">Watch Online</a>
        </div>
    </div>
    <div class="hero-scroll">
        <span>Scroll</span>
        <div class="scroll-line"></div>
    </div>
</section>
```

3. **Commit and deploy:**
```bash
git add site/images/YOUR-FLYER.png site/index.html
git commit -m "Add [event name] hero takeover"
git push
# Then on server: cd /var/www/ebz-redesign && git pull
```

### To Revert to Regular Hero

Replace the hero section with:
```html
<!-- Hero Section -->
<section class="hero">
    <div class="hero-bg">
        <video class="hero-video-desktop" autoplay loop muted playsinline poster="images/church-hero.jpg">
            <source src="images/hero-slideshow.mp4" type="video/mp4">
        </video>
        <video class="hero-video-mobile" autoplay loop muted playsinline poster="images/church-hero.jpg">
            <source src="images/hero-slideshow-mobile.mp4" type="video/mp4">
        </video>
    </div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
        <p class="hero-tagline">Welcome to Ebenezer</p>
        <h1>Growing in Grace, Perfected in Love</h1>
        <p class="hero-subtitle">Sundays at 8:30, 10:00 & 11:15 AM</p>
        <div class="hero-ctas">
            <a href="#visit" class="btn btn-primary btn-lg">Plan Your Visit</a>
            <a href="#watch" class="btn btn-outline-light btn-lg">Watch Online</a>
        </div>
    </div>
    <div class="hero-scroll">
        <span>Scroll</span>
        <div class="scroll-line"></div>
    </div>
</section>
```

### Key CSS Classes (already in style.css)

- `.hero-bg-seasonal` - Uses static image instead of video
- `.hero-content-seasonal` - Adds proper padding on mobile (100px top)
- `.seasonal-overlay` - Constrains flyer size, centers it, adds shadow and margin

### Notes

- The flyer displays over `church-hero.jpg` with the standard navy overlay
- Service times are commented out during takeover (uncomment when reverting)
- Use `?regular` URL parameter to preview the normal hero during a takeover
- `overflow-x: hidden` on html/body prevents horizontal scroll issues on mobile

## Session History

### April 11, 2026 (Session 18) - External Audit Follow-up: SEO, A11y, Performance
Acted on findings from external audits by Codex (CLI) and Claude MacOS App. Five focused commits, all on `main`.

**Audit findings closed:**

*Footer/canonical/test-page hygiene (`b5fa27c`):*
- Fixed broken `/#fragment` footer links on `sermons.html` (the only page that hadn't been updated when the rest of the site moved to file-route footers)
- Switched `easter.html` canonical from `ebenezermilton.org` to `ebzchurch.org` to match every other page
- Deleted `test-events-forward.html`, `embed-events.html`, `test-event-embed.html` — they were shipping with live branding and crawlable

*Caddy `try_files` dependency documented (`8cd6476`):*
- Added a callout in the Deployment section explaining that every sub-page canonical (`/events`, `/sermons`, etc.) depends on the `{path}.html` segment of Caddy's `try_files` chain. Without it, extensionless URLs silently fall through to `/index.html` with a 200 — a self-referential SEO trap. Includes a one-line `curl` verification command.
- Updated server Caddy config to add the `{path}.html` fallback (server-side change, not in this repo). Verified via WebFetch that all sub-page canonicals now resolve to the correct page content.
- Also updated stale "pilot domain" language — `ebzchurch.org` is now the primary production domain (legacy WordPress retired), `ebenezermilton.org` is an alias.

*Quick-wins batch — a11y, SEO, dead code (`592dce1`):*
- Deleted orphan `1387-147055514.mp4` (11MB at repo root, zero refs) and unused `site/images/logo-header.jpg` (the .png is in use)
- Fixed Robbie title in CLAUDE.md staff table: "Executive Minister" → "Facilities Manager"
- Removed dead parallax handler in `main.js` (targeted `.hero-bg img` which never exists — homepage hero is a `<video>`)
- Removed unused `lastScroll` variable in the header scroll handler
- Moved `.fade-in` animation rules from `main.js` `createElement('style')` injection into `style.css`
- Created `site/robots.txt` and `site/sitemap.xml` (sitemap uses extensionless URLs that match the rel=canonical tags)
- Added `aria-expanded` and `aria-controls="primary-nav"` to `.nav-toggle` on all 10 HTML pages, with the JS click + link-close handlers flipping `aria-expanded` so screen readers can tell when the mobile menu is open
- Added `:focus-visible` outline ring (gold accent) for `.btn`, `.nav-links a`, `.nav-toggle`, `.staff-card`, `.modal-close`, footer links, and `.hero-address`

*Lazy loading and fetchpriority hints (`a7ef542`):*
- Added `loading="lazy" decoding="async"` to ~50 images across 10 pages
- Added `fetchpriority="high" decoding="async"` to 7 LCP images (one per content-heavy sub-page) instead of lazy
- Header logos left untouched (above-the-fold, eager is correct)
- Before this commit, exactly one image on the entire site had `loading="lazy"`

*Image optimization (`846805f`):*
- Re-encoded ~20 images at JPEG q88 with dimension caps appropriate to display size. Total `site/images/` directory dropped from ~50MB to 20MB.
- Hero/full-bleed images: max 2000px wide
- Ministry card images: max 1600px wide
- Staff portraits: max 1000px wide (display at ~250px CSS)
- ImageMagick command: `magick FILE -resize 'WIDTHxWIDTH>' -strip -interlace Plane -sampling-factor 4:2:0 -quality 88 OUT.tmp`
- Auto-skip if re-encoded version is larger than original (catches already-tightly-compressed files like `pavillion.jpg` and `spring-fling-market.jpg`)
- Converted `beliefs-hero.png` (3.0MB photo of a Bible) → `beliefs-hero.jpg` (287KB), 91% saved, updated `beliefs.html` reference
- Deleted 7 orphaned media files (~22MB) that had zero HTML references: `snow-background.mp4`, `ebz-merry-xmas.mp4`, `happy-new-year-2026.png`, `ash-wednesday.png`, `Wedding-Open-House-flier.png`, `holly.png`, `staff/greg-millette.jpg`
- Backup of orphans before deletion: `/Users/charles/Projects/ebzrefesh-archive/orphans-2026-04-11/`

**Discovery:** `church-community.jpg` and `church-side-view-full.jpg` are byte-identical in git (same blob hash). Same photo, two paths, intentionally separate so the church can swap one without affecting the other.

**Items still pending from the audits (deferred):**
- Modal controller dedup in `main.js` (~120 lines of duplicated open/close/ESC/backdrop code across staff/event/wedding/Christmas modals)
- Modal a11y wiring (focus trap, `role="dialog"`, `aria-modal`, focus restoration)
- CSP headers + extracting inline scripts (bigger project — touches Caddy config + every HTML file)
- Hero video re-encoding (`hero-slideshow.mp4` 2.8MB, `hero-slideshow-mobile.mp4` 1.3MB — now the biggest assets)
- WebP conversion for the largest images (could shave another ~30%, requires `<picture>` fallback or direct swap)

### March 12, 2026 (Session 17) - Hero Service Times & Baptism Slideshow Photos
Implemented Candi's homepage feedback: differentiated service times and added baptism photos to hero slideshow.

**What was changed:**

*Hero Service Times (index.html):*
- Replaced single-line "Sundays at 8:30, 10:00 & 11:15 AM" with structured listing
- Now shows: small "SUNDAYS" label, then "8:30 & 11:15 AM Traditional" and "10:00 AM Contemporary"
- Times are bold and larger font (1.5rem desktop, 1.25rem mobile)
- Style labels (Traditional/Contemporary) in lighter weight for visual hierarchy
- CSS classes: `.hero-services`, `.hero-services-heading`, `.hero-service-line`

*Hero Slideshow Videos (both desktop and mobile):*
- Added 2 baptism photos (Glenn baptizing): `child-baptism` and `thea-baptism`
- Slideshow now 8 photos (was 6), 32 seconds total at 4 seconds per photo
- Photos interleaved with existing content (not back-to-back)
- Order: Pardue Center → Worship Band → Pastor Glenn → Child Baptism → Guitar Session → Pavilion → Thea Baptism → Youth Group
- Desktop: portrait source photos cropped to 16:9 landscape; thea-baptism crop shifted up (top=700) to keep Glenn's head in frame
- Mobile: original portrait photos used directly for best framing
- Slideshow scripts updated to use explicit ordered lists instead of alphabetical glob
- Source photos and scripts in `/Users/charles/Downloads/church-photos-to-video/`

**Still pending:**
- Praise team photo for slideshow (waiting on permission from all band members)

### February 27, 2026 (Session 16) - Nav Restructure, Ministries Page, Mission Statement
Implemented Candi and Glenn's feedback: updated mission statement, fixed address, restructured navigation, and created ministries landing page.

**What was changed:**

*Mission Statement (all pages):*
- Updated from "To know the love of God, grow as disciples of His son Jesus Christ, and go share His love" to "To know the love of God, to share it with others, and make disciples of Jesus Christ."
- Changed on index.html, history.html, outreach.html, test-events-forward.html
- Beliefs page: removed "We believe our mission is..." line, replaced with distinct capstone block — gold accent rule + body-font text matching page style, not "We believe" prefix (Glenn's preference: it IS the mission, not a belief about the mission)

*Address Fix (all pages):*
- Corrected postal address from Milton, GA to Roswell, GA on all pages (footers, Plan Your Visit, Google Maps link)
- Meta tags/titles keep "Milton, GA" for SEO targeting
- Added address as subtle Google Maps link in hero below service times (Glenn's request for prominence)
- `.hero-address` class: dimmed white, thin underline, brightens on hover

*Navigation Restructure (all 9 pages):*
- Old: `Watch | About | Connect | Calendar | The Center | [Give] | [Plan a Visit]`
- New: `Get Started | About | Watch | The Pardue Center | Ministries | Calendar | [Give] | [Plan a Visit]`
- Interim linking: Get Started → #visit, About → #about, Watch → #watch, The Pardue Center → #venue, Ministries → ministries.html, Calendar → events.html
- Updated footer Quick Links and breadcrumb "Back to" links on outreach/beat-the-drum pages

*Ministries Landing Page (new):*
- Created `ministries.html` with card grid for all 10 ministries
- Content from Candi's `Ministry wording for new website.docx`
- Photos copied from temp-images/ to site/images/ministries/ (resized to max 1600px)
- Cards with photos: Children's, Youth (RISE), Men, Women, Music, Outreach, Beat The Drum, Prayer
- Cards without photos: Grief ("You Are Not Alone"), Widows ("Continuing With Joy"), Education (placeholder)
- Outreach and Beat The Drum cards link to existing dedicated pages
- `object-position: top` on card images to prevent head cropping

**Still pending from Candi's list:**
- Get Started dedicated page (currently links to #visit)
- About page expansion (waiting on Glenn welcome video)
- Pardue Center dedicated page (waiting on description text; room capacities/maps ready in temp-images/)
- Education ministry photo (Glenn working on it)
- Grief, Widows, Prayer ministry photos (Candi unsure how to illustrate)

### February 18, 2026 (Session 15) - Wedding & Event Modal Polish
Improved both inquiry modals, especially for mobile fit.

**What was changed:**

*Wedding Modal:*
- Swapped empty pavilion photo (`pavillion.jpg`) for real wedding ceremony photo (`wedding-pavilion.jpg`)
- Added Instagram link (`@parduecenterofficial`) below photos in both modals
- Mobile: shows pavilion wedding photo (second), hides sanctuary photo (first)
- Mobile: title shortened to "Weddings" (from "Weddings at Ebenezer")
- Mobile: intro condensed to single sentence ("Our campus offers versatile venues for weddings of any size.")
- Mobile: separate desktop/mobile paragraphs (like headings) for independent text
- Mobile: Instagram text "More Photos on Instagram" (desktop: "See more photos on Instagram")
- Mobile: removed "Get in Touch" heading
- Mobile: phone number integrated into Lisa's contact card, standalone phone line hidden

*Event Modal:*
- Mobile: removed "Get in Touch" heading (same pattern as wedding)
- Mobile: phone number integrated into Robbie's contact card

*CSS Pattern:*
- `.modal-heading-desktop` / `.modal-heading-mobile` classes reused for intro paragraphs
- `.ig-text-desktop` / `.ig-text-mobile` spans for responsive link text
- `.contact-phone-inline` shown on mobile, hidden on desktop
- `.modal-event .event-modal-contact h3` hidden on mobile (covers both modals)

**Desktop unchanged** — both modals still show full content, both photos, both contacts, full text.

### February 18, 2026 (Session 14) - OCS v3.1 Migration, Events-Forward Homepage
Major infrastructure overhaul: migrated all One Church Software embeds from legacy iframe+bridge.js to v3.1 embed system. Redesigned homepage to be more event-centric.

**What was changed:**

*Calendar/Events:*
- Replaced littlewhite.church iframe on events.html with OCS v3.1 calendar embeds
- Added Grid/List toggle buttons (smart defaults: grid on desktop, list on mobile)
- Centered header row with bold "Events" label alongside toggle buttons
- JS creates embeds on demand — only loads the active view initially
- Removed "What's Happening" page header to keep calendar above the fold
- Added 7rem top padding to clear fixed header

*Homepage:*
- Reverted Ash Wednesday hero takeover back to regular video hero
- Added "Coming Up" featured event section after hero (single OCS event embed by ID)
- Replaced legacy sermon iframe + bridge.js with `sermons/latest` v3.1 embed (auto-updates)
- Removed `.video-wrapper` and `.video-info` sidebar — sermon is now full-width card
- Added "View All Sermons" button below sermon card
- v3.1.js moved to `<head>` (per OCS docs recommendation for reliable initialization)

*Featured Event Refinements:*
- Updated featured event from Ash Wednesday (10490) to Wedding Expo (10477)
- OCS single event embeds are NOT natively clickable (confirmed with bare test page)
- Added transparent `<a>` overlay to make card clickable → OCS share page (new tab)
- Capped embed at `max-width: 600px; margin: 0 auto` to prevent full-width blowout
- Responsive padding via `.coming-up` class: 2rem mobile, 3.5rem desktop
- Button renamed: "View Full Calendar" → "View More Events"

*Instagram Integration:*
- Pardue Center Instagram icon added to footer on all 7 pages (Facebook, YouTube, Instagram)
- "See Our Space" button with IG icon added to Pardue Center venue section
- Youth/RISE Instagram (`rise_youth__`) noted for future youth section
- Fixed `.btn` `line-height: 1` in style.css to normalize `<a>` vs `<button>` height

*Events Page:*
- Centered "Events" label + Grid/List toggle buttons in header row
- Renamed "Calendar" button to "Grid"

*Sermons Page:*
- Updated sermons.html to v3.1 `sermons/listing` embed (replaced legacy iframe + inplace.bridge.js)

*Test Files Created:*
- `test-events-forward.html` — used to preview events-forward layout before production
- `embed-events.html` — helper page created during bridge.js conflict debugging

**Key discovery:** `bridge.js` and `v3.1.js` conflict on Chrome when loaded on same page. Solution was to remove bridge.js entirely and use v3.1 for everything.

**Maintenance reduction:**
- Sermon: was 3 manual changes per week → now zero (sermons/latest auto-updates)
- Event promotion: was multi-step hero takeover → now one attribute change (data-ocs-id)
- Weekly sermon updates are NO LONGER NEEDED

**Note:** Old sermon metadata pattern from Session 13 is obsolete. The `sermons/latest` embed handles everything automatically.

### January 4, 2026 (Session 13) - Regular Hero Restored, Multiple Updates
Reverted from New Year's seasonal hero back to regular content. Multiple content and bug fixes.

**What was changed:**
- Reverted hero to regular slideshow video (desktop + mobile versions)
- Updated hero tagline to "Growing in Grace, Perfected in Love" (per Candi's request)
- Updated sermon embed to ID 27 (January 4, 2026 message)
- Added sermon metadata to Watch section: title and scripture reference now display alongside embed
- Reversed history page timeline (newest first: 2024 → 1853) per Pastor Glenn's suggestion
- History page hero image changed to Pardue Center; historic church photo moved to 1853 section
- Updated About section: heading changed to "170 Years & Growing", Pardue Center paragraph moved first
- Fixed fade-in animation bug: removed `.section` from IntersectionObserver (was causing pages to render invisible until scroll)

**Sermon metadata pattern ~~(for weekly updates)~~ — OBSOLETE as of Session 14:**
Replaced by `sermons/latest` v3.1 embed which auto-updates. No manual changes needed.

**Note:** Seasonal CSS classes remain in `style.css` but are inactive (no longer referenced in HTML). Can be reused for future seasonal content.

### December 28, 2025 (Session 12) - New Year's Hero Update
Replaced Christmas video overlay with New Year 2026 graphic. Kept snow video background (still winter).

**What was built:**
- Replaced Christmas video overlay with static PNG image (`happy-new-year-2026.png`)
- Image is clickable, links to #visit section
- Renamed CSS classes from `*-christmas` to `*-seasonal` for reusability
- Responsive sizing using `max-width: min(800px, 90vw)` with viewport units
- Added explicit width/height attributes for layout stability (CLS)
- Fixed `?regular` URL toggle to work with new class names and structure
- Updated sermon embed to ID 26 (December 28, 2025 message)

**To revert to regular (non-seasonal) hero:**
- Add `?regular` to URL (e.g., `http://localhost:8080?regular`)
- Or revert files: `git checkout a543722 -- site/index.html site/css/style.css`

**Assets:**
- `site/images/happy-new-year-2026.png` - New Year 2026 graphic (1536x1024)

### December 25, 2025 (Session 11) - Christmas Day Hero Update
Updated hero for Christmas Day with "Merry Christmas" video overlay on snow background.

**What was built:**
- Removed audio from `ebz-merry-xmas.mp4` using ffmpeg (`-an` flag)
- Snow video (`snow-background.mp4`) remains as full-screen hero background
- Replaced Christmas Eve text/button with looping "Merry Christmas from Ebenezer Church" video
- Video displays at native size (688x464), centered, with rounded corners and shadow
- Mobile responsive: scales to 95% width on screens under 768px
- CSS class: `.christmas-video-overlay`

**To revert to Christmas Eve hero (Session 10):**
```bash
git checkout d909b3c -- site/index.html site/css/style.css
```
This restores the "Christmas Eve at Ebenezer / Candlelight Services" text with "See Service Times" button.

**To revert to regular (non-Christmas) hero:**
```bash
git checkout a543722 -- site/index.html site/css/style.css
```
This restores the regular hero slideshow video with "Grow your faith. Celebrate life." text.

**Note:** The `?regular` toggle was broken by this change but restored in Session 12.

**Assets:**
- `site/images/ebz-merry-xmas.mp4` - 6-second animated Christmas greeting (audio removed)

### December 15, 2025 (Session 10) - Christmas Hero Implementation
Successfully implemented Christmas Eve hero takeover after learning from Session 9's failure.

**Approach (learned from researching megachurch sites):**
- Life.Church, Woodstock City, Austin Stone all do "Christmas as hero" - the seasonal content IS the hero, not a separate announcement bar
- Avoids the fixed-position/mobile rendering issues that killed Session 9
- Hero is already responsive, so Christmas content inherits that

**What was built:**
- Snow video background (`snow-background.mp4`) replaces regular hero slideshow
- Hero text: "Christmas Eve at Ebenezer" / "Candlelight Services" / "December 24"
- Single CTA button: "See Service Times" opens Christmas modal
- Small holly accent above hero text (with aggressive mobile size constraints)
- Christmas modal displays the church's existing graphic (`christmas-eve-graphic.jpg`) edge-to-edge
- Modal includes "Get Directions" button + subtle "RSVP on Facebook" text link
- Tagline in modal: "Join us for a beautiful evening of carols, candlelight, and celebration."

**Christmas Eve Service Times (from graphic):**
- 5:00 PM - Little White Church (Traditional)
- 6:00 PM - The Pavilion (Reception & Fellowship)
- 7:00 PM - The Pardue Center (Contemporary)

**Quick toggle for demos:**
- Add `?regular` to URL to show non-Christmas hero
- JavaScript swaps video, text, and buttons back to normal
- Useful for demoing the "regular" site during Christmas season

**Mobile fixes applied:**
- Holly image: aggressive `!important` constraints (50px max on mobile) to prevent explosion
- Modal button: added `touchend` event listener alongside `click` for better mobile response
- Modal graphic: edge-to-edge (no padding) for more prominent display

**To revert after Christmas (December 26):**
1. In `index.html`, restore hero section from git history: `git show a543722:site/index.html`
2. Or manually change hero-bg back to regular videos, restore original text/buttons
3. CSS and JS can stay - they won't affect anything without the Christmas classes

**Assets added:**
- `site/images/snow-background.mp4` - Pixabay snow video
- `site/images/christmas-eve-graphic.jpg` - Church's existing Canva graphic
- `site/images/holly.png` - Holly accent (was already in repo from Session 9)

**Facebook Event:** https://www.facebook.com/events/872753225205874/

### December 15, 2025 (Session 9) - REVERTED
Attempted announcement bar for Christmas Eve services - **reverted due to poor mobile rendering**.

**What was built (for future reference if revisiting):**
- Announcement bar fixed above header, shifts header/hero down via `body:has(.announcement-bar)`
- Festive variant: green-to-navy gradient with holly leaf images on both sides
- Christmas modal with service graphic, "Get Directions" + "RSVP on Facebook" CTAs
- No dismiss button (persistent) - reasoning: important announcements shouldn't be dismissable

**Why it failed on mobile:**
- Holly images exploded to full size despite CSS constraints
- Even with `max-height`/`max-width`, mobile rendering was poor
- Stacked layout on mobile looked cramped and unprofessional

**Bug discovered (also reverted, re-apply if needed):**
- `.nav-links` has `border-top: 1px solid var(--color-border)` in mobile styles that isn't reset on desktop
- Causes a mystery line below any element positioned above the header
- Fix: add `border: none;` to the desktop `.nav-links` media query (min-width: 768px)

**If revisiting:**
- Consider text-only announcement bar on mobile (no images)
- Or use SVG icons instead of PNG images for better scaling
- Test mobile FIRST before building out desktop features
- Assets saved locally: `christmas-eve.jpg`, `holly-leaves.png` from legacy site

### December 8, 2025 (Session 8)
- Reverted Juicer lazy loading optimizations (broke mobile rendering):
  - Removed IntersectionObserver/MutationObserver approach
  - Removed skeleton placeholder
  - Now uses simple direct embed with standard Juicer script
- Added explicit Juicer CSS link in `<head>` (`assets.juicer.io/embed.css`):
  - Required for proper card styling on mobile Safari
  - embed.js dynamic CSS injection was unreliable on mobile
- Removed duplicate Juicer modal CSS from style.css:
  - Modal positioning now configured in Juicer dashboard custom CSS
  - Keeps styling in one place, reduces local code

### December 8, 2025 (Session 7)
- Attempted Juicer lazy loading optimizations (later reverted in Session 8)
- Upgraded Juicer to Starter plan (removes "Powered by Juicer" branding, more monthly hits)

### December 7, 2025 (Session 6)
- Added Open Graph image meta tag for link previews:
  - Uses `glenn-contemporary.jpg` (2048x1367) - Glenn preaching with worship band
  - Platforms will auto-crop to their preferred aspect ratio
- De-emphasized "Methodist" in public-facing branding (church no longer affiliated with UMC):
  - Changed `og:title` to "Ebenezer Church | Milton, GA"
  - Changed `<title>` tag to "Ebenezer Church | Milton, GA | Church & Event Venue"
  - Kept "Methodist" in `keywords` and `description` meta tags for SEO indexing

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
