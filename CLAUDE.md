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
│   ├── btd-update-feb-2026.html  # BTD Feb 2026 update (unlinked but on disk)
│   ├── btd-update-may-2026.html  # BTD May 2026 update (current, linked from beat-the-drum.html)
│   ├── GLADYS-NYAMBURA-NJERI.pdf  # Memorial PDF linked from May 2026 update
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
- ✅ Venue feature SVG icons (replaced platform-inconsistent emoji) (April 2026 design audit Tier 1)
- ✅ Nav active state CSS rule (gold accent underline) (April 2026 design audit Tier 1)
- ✅ Coming Up section background flip (broke up stacked alt-bg sections) (April 2026 design audit Tier 1)
- ✅ Education placeholder ministry card hidden until content ready (April 2026 design audit Tier 1)
- ✅ Footer unification across all pages — 10-link Option 5 set (5+5) (April 2026 design audit Tier 1)
- ✅ Juicer section heading rename "Follow Us on Facebook" → "From Our Feed" (April 2026 design audit Tier 1)
- ✅ Grief Support ministry card photo (`not-alone.jpg`) (April 2026 Session 20)
- ✅ Widows ministry card photo (`widows.jpg`, beaded craft project) (April 2026 Session 20)
- ✅ Events page default view → list-without-images on all viewports (April 2026 Session 20, Candi UX call)
- ✅ Multi-card "Coming Up" featured events grid (2-card responsive layout) (April 2026 Session 20)

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
| Lisa Coxworth | Administrative Assistant | office@ebzchurch.org |

Robbie Underwood (Facilities Manager) and Asa Sellers (Worship Leader) were
offboarded effective June 17, 2026 and removed from the site (Session 23). With
Robbie gone, **Lisa is the sole contact in the Event and Wedding inquiry modals**
— update if a new facilities/venue contact is designated.

### Beat The Drum Village Partnership
- **Location:** Kenya
- **Mission:** Home for children orphaned by HIV/AIDS
- **Leader:** Bishop David Thagana
- **Ebenezer Connection:** Started via film project by David McBrayer
- **Currently Supporting:** 31 children (was 33 until May 2026; count reduced after Gladys's passing on 10 May 2026 and one other departure)
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

    try_files {path} {path}.html {path}/
    handle_errors {
        rewrite * /404.html
        file_server
    }
}
```

**Extensionless URL routing (important):**
The `{path}.html` segment in `try_files` is what makes extensionless URLs like `https://ebzchurch.org/events` resolve to `events.html`. **The `<link rel="canonical">` tags on every sub-page (`events.html`, `sermons.html`, `history.html`, `beliefs.html`, `ministries.html`, `outreach.html`, `beat-the-drum.html`, `easter.html`) all point at extensionless URLs like `https://ebzchurch.org/events`.** Those canonicals depend on this Caddy rule to resolve correctly.

If the Caddy `try_files` ever loses the `{path}.html` fallback, extensionless URLs will silently fall through to a 404 (or, prior to April 2026, to `/index.html` with a 200 response causing a self-referential SEO mess). Codex flagged this as a repo-level audit finding because the dependency is invisible to anyone reading only the repo; the Caddy config lives on the server. Verification command after any Caddy change:
```bash
curl -sL https://ebzchurch.org/events | grep -o '<title>[^<]*</title>'
# Expect: <title>Events | Ebenezer Methodist Church | Milton, GA</title>
# NOT the homepage title.
```

**404 handling:**
`site/404.html` is the branded not-found page (full nav, footer, and a few suggested destinations). Caddy's `handle_errors` block rewrites any error to `/404.html` and serves it, so 404s get proper status codes instead of the old soft-404 pattern (which returned 200 serving the homepage for any unknown path). The old pattern was flagged during the April 2026 traffic analytics work — it broke GoAccess's bot-probe filtering and was arguably an SEO/security smell. Removing the `/index.html` fallback is safe because `{path}.html` still catches extensionless URLs before the fallback ever runs.

**To deploy updates:**
```bash
cd /var/www/ebz-redesign && git pull
```

**Cache policy & `?v=` busting convention (June 2026):**

Caddy serves HTML and the un-versioned CSS/JS with `Cache-Control: no-cache` (revalidate before use — a cheap ETag 304 when unchanged), and only true media (`*.jpg *.jpeg *.png *.gif *.webp *.svg *.ico *.mp4 *.webm *.woff *.woff2 *.ttf`) with `public, max-age=31536000, immutable`. Server-side matchers (in `/etc/caddy/Caddyfile`, not the repo):

```caddy
@immutable path *.jpg *.jpeg *.png *.gif *.webp *.svg *.ico *.mp4 *.webm *.woff *.woff2 *.ttf
@revalidate not path *.jpg *.jpeg *.png *.gif *.webp *.svg *.ico *.mp4 *.webm *.woff *.woff2 *.ttf
header @immutable Cache-Control "public, max-age=31536000, immutable"
header @revalidate Cache-Control "no-cache"
```

The `@revalidate` matcher uses `not path *.<media>` so it also covers extensionless routes (`/events`, `/sermons`) that an `*.html` matcher would miss. `no-cache` on HTML means content changes (staff removals, event swaps) go live on the next revalidate, not after an hour.

**Why this exists:** before June 2026, Caddy served `style.css`/`main.js` as `immutable, max-age=31536000` despite their filenames never changing across edits — so returning visitors could hold a stale copy for up to a year. Discovered during the Asa/Robbie offboarding: the old cached CSS still had the deleted "hide one contact card on mobile" rules, which would have hidden Lisa (now the sole modal contact) on returning mobile devices.

**The `?v=` convention:** every HTML reference to `css/style.css` and `js/main.js` carries a `?v=YYYYMMDD` query (currently `?v=20260617`). **Bump that date string in all HTML files whenever you edit `style.css` or `main.js`** — it changes the cache key and forces a fresh fetch even from browsers that already cached the old asset (changing server headers alone can't flush an already-`immutable` copy; only a new URL or a hard refresh can). The `no-cache` Caddy policy is the safety net if a bump is ever forgotten. One-liner to bump:
```bash
cd site && for f in *.html; do sed -i '' -E 's#(style\.css\?v=)[0-9]+#\1NEWDATE#g; s#(main\.js\?v=)[0-9]+#\1NEWDATE#g' "$f"; done
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

## Traffic Analytics

Self-hosted Caddy access logs + GoAccess, set up April 2026. No JS, no cookies, no third-party analytics — the site itself has zero analytics code, all tracking happens server-side from access logs.

**Dashboard:** https://stats.ebzchurch.org (HTTP basic auth; creds are NOT in this repo — ask Charles)

**How it works:** Caddy writes JSON access logs for the `ebenezermilton.org, ebzchurch.org` site block to `/var/log/caddy/ebz-access.log` (50MB roll, 10 kept, 720h retention ≈ 30 days). A systemd timer runs every 5 minutes, converts the JSON to Apache Combined Log Format via `jq`, pipes it through GoAccess, and writes a static HTML report to `/var/www/ebz-stats/report.html`. Caddy serves that HTML at the stats subdomain behind basic auth. IPs are anonymized (`--anonymize-ip` zeros the last octet) in the report.

**Key server paths (not in repo — documented for future Claude sessions):**
- `/etc/caddy/Caddyfile` — `log` directive inside the main site block + `stats.ebzchurch.org` site block with `basic_auth`
- `/usr/local/bin/goaccess-ebz.sh` — the jq → GoAccess pipeline script
- `/etc/systemd/system/goaccess-ebz.{service,timer}` — 5-min regeneration
- `/var/log/caddy/ebz-access.log` + rotated gzips — raw logs
- `/var/www/ebz-stats/report.html` — the served dashboard

**Common ops:**
- Regenerate on demand: `systemctl start goaccess-ebz.service`
- Check timer: `systemctl list-timers goaccess-ebz.timer`
- Reset history: stop timer, truncate the access log + delete rotated `.gz` files, re-run service
- Extend pattern to another site: copy the `log` block, script (different paths), and timer unit

**Candi-facing summary page (`/`) vs full GoAccess (`/details`):**

The stats subdomain serves a simplified, server-rendered summary at `/` — two big numbers (visitors this week + last week with a ▲/▼ delta), top 5 pages with friendly names, a 14-day bar list, and an "updated" timestamp. Bots are filtered out (`--ignore-crawlers`). The full GoAccess dashboard (all 15+ panels) is still available one click away at `/details`. Both regenerate from the same 5-min run.

**FRIENDLY name map (cosmetic only, optional to maintain):**

The summary page's "top pages" section shows real pages with polished display names from a `FRIENDLY` bash associative array in `/usr/local/bin/goaccess-ebz.sh`. Pages not in the map still appear — they just render with a cleaned-up raw URL (leading slash and `.html` stripped) instead of a hand-picked label. E.g., a new `/youth-camp-2026.html` auto-surfaces as "youth-camp-2026"; adding `FRIENDLY["/youth-camp-2026.html"]="Youth Camp 2026"` prettifies it.

Bot probes are filtered out by cross-referencing GoAccess's `not_found` panel — any URL that's ever 404'd gets dropped from top-pages. This works because ebzchurch.org now returns proper 404s for unknown paths (see Deployment section). Before the April 2026 `try_files` cleanup, bot probes soft-404'd with status 200 and had to be blocked via a strict allowlist; that's no longer needed.

**Wash-out caveat (through ~May 18, 2026):** ~30 minutes of pre-cleanup log entries remain where bot probes like `/staff`, `/dump.sql`, `/database.sql` logged as status 200. Those will stay visible in Candi's top-pages until they age out of the 30-day log retention. Explanation for her if she notices: "old bot visits from before we locked things down, they'll clear naturally."

**Limitations by design (not gaps — tradeoffs):**
- No session stitching, no event tracking (e.g. "Give button clicks"), no bounce rate. For that you'd layer Plausible or similar on top.
- `--ignore-crawlers` is on, but it's based on GoAccess's known-bot list — stealthier bots still count.
- 5-minute lag between visit and dashboard update (not real-time).
- History starts April 18, 2026 — Caddy wasn't logging access before then (only errors). First 8 days show "— (not enough history yet)" in the week-over-week delta; meaningful comparison starts April 26.

## Session History

### June 16, 2026 (Session 23) - Staff Offboarding: Remove Asa & Robbie

Asa Sellers (Worship Leader) and Robbie Underwood (Facilities Manager) were let go
effective June 17, 2026 at 2pm. Removed both from the site in advance so the deploy
could go out quickly once their Microsoft 365 accounts were offboarded. Committed
locally first and deliberately held — push was scheduled for June 17 2pm (after the
M365 offboarding), nudged by a one-time claude.ai reminder routine
(`trig_01KNmuzswWRFa85uUbHQi4GD`, since fired and disabled).

**Pushed June 17, 2026** to `origin/main`. The original commit `f1f7f5d` was amended
to fold in this CLAUDE.md Session 23 doc update (new hash **`f5930fe`**); Session 22
(`40fe920`) rode along since it was also still local. The Fortinet TLS error did NOT
recur on push this time. Server deploy (`cd /var/www/ebz-redesign && git pull`) is the
final step that takes both names off the live site.

Single commit `f1f7f5d` ("Remove Asa Sellers and Robbie Underwood from staff and
contacts"):
- **Staff cards** removed from `index.html` "Meet Our Team" (Glenn + Lisa remain);
  **staff bio objects** removed from `main.js`
- **Event + Wedding inquiry modals**: Robbie's contact card removed from both —
  **Lisa Coxworth is now the sole venue/event contact** (carried his phone line
  onto her event-modal card). Removed the now-broken mobile "show Robbie / hide
  Lisa" CSS rules that assumed two cards, plus the dead `[data-staff="robbie"]`
  image-position rule.
- **RISE Youth copy** on `ministries.html`: "a relevant message from our youth
  minister, Asa Sellers" → "from our youth ministry team" (per Candi's call to
  genericize rather than drop the clause)
- **Orphaned staff photos** `asa-sellers.jpg`, `robbie-underwood.jpg` `git rm`'d
  (recoverable from history)

**Staff-grid centering fix (folded into the same commit).** With only 2 cards left,
the fixed-column grid (`repeat(4, 1fr)` etc.) pinned them to the left with dead
space on the right. Switched all five `.staff-grid` breakpoint rules from
fixed-count `1fr` tracks to `repeat(auto-fit, minmax(Npx, max-content))` +
`justify-content: center` on the base rule. Now self-centers for any number of
cards (better than decrementing the column count by hand — see the updated grid
lesson in MEMORY.md). Also bumped Lisa's bio: twins 15 → 16 years old.

**Decisions confirmed with Charles:** (1) venue/event contact → Lisa only (vs.
generic office card or leaving a gap); (2) RISE copy → genericize the name. Both
via AskUserQuestion before editing.

### May 31, 2026 (Session 22) - Coming Up Refresh: RISE Link + Evergreen Pavilion Graphic

Two "Coming Up" featured-event cards on `index.html` refreshed (commit `7b78c23`):

1. **RISE Youth card** — link bumped from a past Thursday (event 10403) to an upcoming one (event 10399). RISE is a weekly Thursday gathering; the card should always point a couple weeks ahead so it never links to a past date. Routine maintenance — when the linked occurrence passes, bump to the next.

2. **Worship in the Pavilion card** — replaced the date-specific May 24 graphic (`worship-in-pavilion-may24.jpg`, still on disk, now unreferenced) with an **evergreen** version (`worship-in-pavilion.jpg`) reading "8:30 a.m. 4th Sunday of each month." Link repointed from the past May 24 occurrence (11611) to the next 4th-Sunday occurrence (11691).

**The schedule is the 4th Sunday, NOT the last Sunday.** These differ in five-Sunday months (May 2026: 4th = May 24, last = May 31). First-pass graphic mistakenly said "last Sunday"; caught when Charles went to create the recurring calendar event and asked specifically for the 4th Sunday. Corrected before commit.

**Graphic source — Charles made it himself in ChatGPT, not via the API.** I first generated candidates with the audiobook skill's `generate_images.py` (gpt-image-1 `images.edit` with the may24 flyer as reference). Those came out decent but had two issues: (a) gpt-image-1 reinvents the photo rather than compositing text onto the real pavilion, so the building was a realistic look-alike, not the actual Ebenezer pavilion; (b) text punctuation was a dice-roll ("8:30 a.m" dropped the trailing period on the first try). Charles's own ChatGPT version used the **real pavilion photo** with crisp correct text — strictly better. Lesson: for these flyers, Charles generating in ChatGPT (where he can iterate visually and keep the real photo) beats the API path. The API path is a fallback, not the default. See [reference_flyer_generation.md](memory/reference_flyer_generation.md).

**Image processing:** source PNG was 1122×1402 (already 4:5, 0.8004) → `magick -resize 1080x1350 -strip -interlace Plane -sampling-factor 4:2:0 -quality 88` → `site/images/worship-in-pavilion.jpg` (~306KB). No crop needed. (Aside on cropping 2:3→4:5: gpt-image-1's only portrait size is 1024×1536 (2:3); converting to 4:5 crops 256px of height. A *center* crop clips the top title — use a *top-anchored* crop to drop expendable foreground instead. Moot here since Charles's source was already 4:5.)

**OCS recurring events (learned this session):** the Add Event recurrence dropdown auto-derives its monthly presets from the **start Date** you pick. Set the date to a 4th Sunday (e.g., 6/28/2026) and "Monthly on the 4th Sunday" appears; set it to a last Sunday and you get "Monthly on the last Sunday." Or use "Custom…" for explicit control. Recurring series have **no stable public/series URL** — each occurrence has its own event ID, so featured-event cards link to a specific upcoming occurrence and get bumped when it passes (same pattern as RISE). See [reference_ocs_recurring_events.md](memory/reference_ocs_recurring_events.md).

**Push blocked by network TLS interception.** `git push` failed with "SSL certificate problem: unable to get local issuer certificate" on both the church/office network (a **Fortinet FortiGate** firewall re-signing GitHub's cert with its own CA — confirmed via `openssl s_client`, issuer `O=Fortinet … CN=FGT40FTK24099T85`) and on Zaxby's guest wifi. Homebrew git's OpenSSL doesn't trust the injected CA; `/usr/bin/curl` works because it uses the macOS keychain via Secure Transport. Exporting keychain CAs to a bundle didn't help (the Fortinet root isn't installed in any keychain git could read). **Fix that worked: iPhone tethering** (bypasses the intercepting middlebox). See [project_church_network_tls.md](memory/project_church_network_tls.md).

**Deploy:** `cd /var/www/ebz-redesign && git pull` on the VPS (pending as of session end).

### May 25, 2026 (Session 21) - BTD May 2026 Update with Gladys Memorial

Replaced the Feb 2026 quarterly update on `beat-the-drum.html` with the May 2026 newsletter from Mrs. Esther Muchiri (GOA Compassion Director). The May newsletter includes news of Gladys Nyambura Njeri's passing on 10 May 2026 after a two-year journey with diabetes and dialysis. The Feb update is left on disk (`btd-update-feb-2026.html`) but no longer linked from anywhere.

**Build pattern matches Feb 2026 (Session 13 era):** `site/btd-update-may-2026.html` is hand-built in the site template (church nav/footer, site CSS variables, back-link, May 2026 date pill, signature, donate box) — not a direct docx-to-HTML conversion. The auto-conversion artifact at `/Users/charles/projects/BTD/btd-newsletter-may-2026.html` (output of the `btd_may_2026.py` workflow there) was used only as a content source, not a final page. Images were extracted from `/Users/charles/Downloads/BTD  UPDATE-MAY UPDATE  2026.docx` directly (unzip the docx, pull `word/media/image{1..7}.jpeg`) and optimized at q88 with skip-if-grew into `site/images/btd-update-may/`. Total image footprint ~840KB.

**Memorial section styling — new `.memorial-section` block.** Distinct from the regular `<h2>` cadence:
- Soft `--color-bg-alt` panel with a muted slate-grey top border (`#6b7a8a`) — deliberately not gold, since the gold accent reads celebratory and felt wrong for a memorial
- Small-caps "IN LOVING MEMORY" eyebrow text
- Name rendered in Playfair display font, "Called home · 10 May 2026" dateline beneath
- Centered portrait of Gladys (200px desktop, 160px mobile) above three memorial paragraphs
- PDF link inline at the bottom of the memorial block: `Read more about Gladys's life and journey →` (links to `GLADYS-NYAMBURA-NJERI.pdf` in the site root)
- Followed by a separately-captioned `<figure>` with the burial photo ("Kids during Gladys's burial")

**Child count synced 33 → 31 on `beat-the-drum.html` in five places:** stat card, intro paragraph, donate-box copy, `meta description`, `og:description`. The number change reflects the May newsletter's reported count after Gladys's passing and one other departure. Future BTD updates that change the count should sync these five locations.

**Source fidelity revert pass — important workflow note.** First-pass build included ~15 silent copy edits to Mrs. Muchiri's prose (em-dash for em-dash substitutions, `got → received`, Americanizing `counselling → counseling`, dropping `also`, merging parallel "We thank God... We thank God..." sentences, etc.). Charles caught this with the direct question "are we sure this is true to the source document?" Reverted to source phrasing on a section-by-section diff, keeping only: typo fixes (`ssupport → support`, `live → lives`), grammar agreement (`mattress → mattresses` to match "worn out ones"), tense correction in the Gladys paragraph (`has been → had been` since she's passed), typography (`3 day → three-day`, hyphenated compound adjectives, commas after introductory phrases), and paragraph breaks in long source blocks for readability. The author is a Kenyan partner ministry director; her BrE spellings (`counselling`, `in and out of hospital`) and rhetorical repetition stay. Captured the rule in [feedback_preserve_third_party_voice.md](memory/feedback_preserve_third_party_voice.md) — for Ebenezer's own marketing copy this is looser, but for community-partner content it is strict.

**H2 spacing tweak local to this page only.** The Feb template uses `margin-top: var(--space-2xl)` on `.btd-content h2`. Charles noticed the gap above each heading felt generous (especially the Health heading where there's no preceding image to anchor the eye). Tightened to `--space-xl` in the May page's inline `<style>` only — did not touch Feb. If we standardize this for future updates, lift to a shared rule.

**Commit:** `2917ff0` on `main`. Server deploy: `cd /var/www/ebz-redesign && git pull` on the VPS.

### April 11, 2026 (Session 20) - Ministry Photos, Events Page UX, Multi-Card Coming Up
Same calendar day as Session 19 but a separate logical batch — direct Candi requests rather than audit follow-up. Six small commits:

**Ministry photos finally resolved (commits `d5b7106`, `5be8a34`, `5d21da2`):**

The "Grief, Widows, Prayer ministry photos (Candi unsure how to illustrate)" item has been on the pending list since the ministries page launched in Session 16. Resolved this session:

- **Widows / "Continuing With Joy"** card now uses `images/ministries/widows.jpg` — sourced from `beads.jpg` in the working tree (286KB @ 2048×1529, beaded craft project the group did, no people in frame so no confidentiality concern). Resized to 1600px wide via `magick -resize '1600x1600>'` without quality re-encoding (52% smaller, 286KB → 138KB). The resize-only path beat the q88 reencode because the source was already lightly compressed.
- **Grief / "You Are Not Alone"** card initially used `grief.png` from working tree (`5be8a34`), then was replaced with `not-alone.png` (`5d21da2`) per Candi's preference. Final filename is `images/ministries/not-alone.jpg` (named after the ministry, not the category — semantically clearer than `grief.jpg`). PNG → JPG conversion at q88, 92% smaller (2.0MB → 184KB).
- **Prayer** was already using `worship-service.jpg` as a stand-in from a prior session — this was just confirmed, no change.

All visible ministry cards now have images. Education remains HTML-commented in production until Glenn ships content.

**Events page default view changed (commit `b8c7876`) — Candi's UX call:**

The events page defaulted to grid view on desktop, list-with-images on mobile. Candi noticed two problems:
1. Grid view (a month calendar with text in cells) is mostly empty squares for a church with ~10 events per month — bad fit for the "what's coming up?" reading intent.
2. List-with-images was visually jagged because some events have polished flyers and others don't.

Two-line fix in `events.html`:
- Added `data-ocs-images="false"` to the `events/listing` embed (OCS attribute that suppresses event images in the listing surface)
- Changed default-view JS from `window.innerWidth <= 768 ? 'list' : 'grid'` to just `show('list')`

The Grid/List toggle stays in the header — desktop users who want the month grid can still switch with one click. Event detail pages on OCS still show flyer images when users click into a specific event. The change only affects the listing surface on `events.html`.

**"Coming Up" homepage section: single image → multi-card grid (commits `f84fa4a`, `afab1f4`, `0312777`):**

Per Candi: instead of highlighting one featured event, show 2-3 side-by-side on desktop (stacking on mobile). Initially added the RISE Youth event as the second card, then swapped it for The Encouragement Project Open House (event 11020) in `0312777` because RISE is a recurring weekly Thursday gathering rather than a one-off special event. The current second card uses `images/encouragement-project.jpg`, sourced as a 1080×1350 4:5 JPEG (Canva Instagram Portrait preset — exactly the size now recommended in `PLAN-content-image-guidelines.md`). Native aspect, no padding or cropping needed.

Promoted the previously inline-styled ad-hoc card pattern to real CSS classes:
- `.featured-events-grid` — `display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); max-width: 900px;` — auto-flows to 2 or 3 columns at viewports ≥ 880px-ish, stacks to 1 column under ~580px
- `.featured-event-card` — `aspect-ratio: 4/5; border-radius: 12px; overflow: hidden;` with hover lift transition
- `.featured-event-card img` — `object-fit: cover` to fill the card uniformly

Adding a third featured event later is now a 4-line HTML change (drop in another `<a class="featured-event-card">` block), no CSS or layout work needed.

**Aspect-ratio cropping problem and the padding workaround (commit `afab1f4`, since superseded by `0312777`):**

While RISE was the second card, Candi spotted that it was clipping the "E" in "Every Thursday" on the left edge. Root cause: spring fling is 904×1280 (tall portrait, ~5:7 aspect, 0.706) and RISE was 1024×1024 (square, 1.0). The forced 4:5 card aspect with `object-fit: cover` was cropping ~12.5% from each side of the square RISE image — fine for a centered logo, fatal for edge-anchored text.

Considered alternatives:
- Square (1:1) cards — would crop spring fling 21% top/bottom (loses a third of the flyer)
- 5:6 cards — slightly more balanced but still loses ~10% per side on square images
- `object-fit: contain` — adds visible letterboxing
- Native aspects (no force) — different card heights, jagged layout (the same problem we just fixed on events.html)

**Resolved (at the time) by padding the source image to match the card aspect.** Used ImageMagick `-gravity center -background black -extent 1024x1280` to add 128px of solid black on top and bottom of the RISE image. The RISE design has a black background already, so the padding bars were visually invisible — the card just looked like a slightly taller flyer. The 4:5 card aspect fit the padded image with no crop, preserving all text. File size barely changed (83KB → 85KB) because solid black compresses well.

That whole workaround became moot when RISE got swapped for the Encouragement Project a few minutes later — the new flyer was provided at native 1080×1350 (4:5), so it slotted in cleanly with no padding needed. The RISE image was deleted in `0312777`.

**Useful technique for future, even though we ended up not needing it here:** When forcing a card aspect ratio with `object-fit: cover` would crop important edge content, and you can't get a redesigned source at the right aspect, pad the source image with a background color that blends with the source's own background. Beats the alternatives (different aspect, contain, native sizes). Documented in `PLAN-content-image-guidelines.md` as the fallback when content owners can't provide images at the recommended 1080×1350 size.

**Validation case for the content-owner guidelines doc:** The Encouragement Project flyer was provided at exactly 1080×1350 — the size now recommended in the guidelines doc. Workflow was zero-fuss: drop the file, optimize at q88 (48% smaller), update one HTML reference, done. The contrast between the RISE flow (square image → padding workaround → still fragile) and the Encouragement Project flow (correctly-sized source → straightforward swap) is exactly why the guidelines doc exists.

**Mobile gap polish (commit `dfed17b`):** Candi spotted on her phone that the two stacked Coming Up cards were nearly flush. `.featured-events-grid` gap was `var(--space-lg)` (2rem/32px), which was technically applied but read as too tight between two light-edged card images. Bumped to `var(--space-xl)` (3rem/48px). Desktop side-by-side stays within the 900px max-width container so layout is unchanged — just a hair more column gap there too.

### April 11, 2026 (Session 19) - Tier 1 Design Polish from Design Audit
External design and UI review (separate Claude Code session) identified ~30 items across the homepage and sub-pages. Most were design opinions or stakeholder decisions; several were verifiable bugs and easy polish wins. Triaged into two tiers: mechanical fixes (Tier 1, executed) vs stakeholder-facing changes (Tier 2, deferred to discussion doc).

**Tier 1 — six fixes in commit `463196b`:**

1. **Venue feature emoji → SVG icons.** Replaced 🏛️💒🎉 in the venue features list with white Lucide stroke icons (church / two rings / users) at 1.75rem. Updated `.feature-icon` CSS to be a flex container with proper SVG sizing instead of relying on the now-irrelevant `font-size: 1.25rem`. Single biggest polish-per-effort change in the audit — the emoji was the worst-rendering element on the homepage, platform-inconsistent and clashing with the otherwise serious typography.

2. **`.nav-links a.active` CSS rule.** Added `color: var(--color-primary); border-bottom: 2px solid var(--color-accent); padding-bottom: 2px;` with `:not(.btn)` to exclude buttons. The `class="active"` attribute was already set on `events.html` (Calendar) and `ministries.html` (Ministries) but had no visual effect — pure dead code until now. Visible only on those two pages; other pages don't set active class so this rule does nothing on them.

3. **Coming Up section background → white.** Removed `background: var(--color-bg-alt)` from the inline style at `index.html:27`. Mission section keeps its alt bg, restoring the white/alt cadence that had been broken by two stacked alt sections.

4. **Education ministry card hidden.** Wrapped the placeholder "Details coming soon" card in HTML comment with a TODO. Grid drops from 10 to 9 cards which actually balances better in the 3-column auto-fill layout (3×3 = no orphan row). Restore when Glenn ships photo and content.

5. **Footer unification — Option 5 (5+5) across 10 pages.** Standardized every page footer on a single 10-link set:
   - Quick Links: Watch · About · Ministries · The Pardue Center · Give
   - Resources: Our History · What We Believe · Staff · Outreach · Events
   - Pre-existing footers came in two patterns (Pattern A had Beliefs/Staff/Events but no Pardue Center; Pattern B had Pardue Center but no Beliefs/Events/Outreach). New set is the union of both. Outreach is now in every footer for the first time. Page-internal anchors use `#anchor` on `index.html` and `index.html#anchor` on sub-pages.

6. **Juicer section heading rename.** "Follow Us on Facebook" → "From Our Feed". Reframes as content (something to read) rather than a conversion ask (something to act on). Audit's framing: people who would follow on Facebook already do.

**Audit items considered but NOT executed (from this session):**

- **"Drop Get Started from nav."** Audit was right that it's redundant with Plan a Visit (both link to `#visit`), but the user caught me almost going along with it. Get Started was specifically requested by Candi in Session 16, and CLAUDE.md/MEMORY.md document that the redundancy is *temporary by design* — there's a planned dedicated `/get-started` page on Candi's pending list, and once that exists the two nav items go to different places. Default for stakeholder-requested features is preserve, not reverse. Saved a feedback memory about this pattern. (See [feedback_dont_reverse_stakeholder_requests.md](.claude/.../memory/feedback_dont_reverse_stakeholder_requests.md) in user memory.)

- **"H4 family inconsistency is design drift."** The audit flagged `.visit-item h4` using DM Sans while other h4s use Playfair, calling it drift. It's actually a deliberate choice — those h4s are field labels (Service Times / Location / What to Expect), not headlines, and Playfair would compete with the h2 above. Skipped.

- **"Drop the SUNDAYS label from hero."** Disagreed — the label gives the two service lines context. Without it, "8:30 & 11:15 AM Traditional / 10:00 AM Contemporary" reads as floating numbers. The Session 17 work that added this structure was deliberate.

- **"Hero scroll indicator is dated."** Personal aesthetic call dressed up as a fact. Skipped.

- **"Demote ministry card titles from h2 to h3."** Pedantic semantic argument with no visual change. Defer to a holistic semantic-headings pass if we ever do one.

**Tier 2 — five items deferred to stakeholder discussion (not in this commit):**

Created [`PLAN-tier2-design-discussion.md`](PLAN-tier2-design-discussion.md) at the repo root. Non-technical doc for Candi and Glenn covering:

1. Replace the Sunday Worship Connect card with Plan Your Wedding (or another) — Candi
2. Promote the Pardue Center section higher in the homepage order — Candi (values decision)
3. Rebuild `sermons.html` with a Latest Message hero, preamble, YouTube link — Glenn
4. Restructure `beliefs.html` 12 "We believe" paragraphs into themed groups — Glenn
5. Rebuild "Coming Up" featured event as a metadata card — Candi (workflow change)

Total Tier 2 work if everything is approved: roughly half a day. No deadline.

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
