# Ebenezer Church Website Redesign

## Current state (as of 2026-10-19)

1. Live at ebzchurch.org (alias ebenezermilton.org): static HTML in `site/`, served by Caddy on a Digital Ocean droplet; deploy is `git pull` on the server (see Deployment).
2. Pardue Center venue and rental content was removed July 24, 2026 at the Finance chair's direction; nav is 6 items; five venue-era images stay on disk unreferenced. Do not add venue material back (see the directive below).
3. Staff section is "Meet Our Pastors": Glenn Hannigan (Senior Pastor) and Brad Anderson (Associate Pastor, added Oct 19, 2026; his modal emails office@ebzchurch.org until he has an address to publish). Asa Sellers, Robbie Underwood, and Lisa Coxworth were offboarded in June 2026.
4. All Give links and the homepage QR point directly at `https://ebz.onechurchsoftware.com/public/give/5` (changed Aug 21, 2026); the old `app.onechurchsoftware.com/ebz/egiving` redirect dies in September 2026.
5. Women's Retreat (Oct 30 to Nov 1, 2026, Woodlands Camp, Cleveland GA): `womens-retreat.html` added Aug 21 to 22. Registration and payment live in One Church event 11071; the Register button lands on the OCS event page, where the visitor clicks Sign Up (no deep link to the form exists). The page's aggregate counter fetches `/api/retreat/availability` (a `retreat.service` on the VPS, Caddy-proxied) and renders only when the API answers. `retreat-signup-test-9f3a2c.html` is an unlisted noindex test page linking straight to the OCS signup form.
6. Homepage "Coming Up" has one card, the Women's Retreat (comes down after Nov 1, 2026). The Worship in the Pavilion card was pulled Oct 19, 2026 (no Pavilion service on Oct 25, and it still linked to the Aug 23 occurrence 11693); `images/worship-in-pavilion.jpg` stays on disk for when it returns.
7. Hero slideshow is 5 frames, 20 s, rebuilt Oct 19, 2026 (Pavilion event frame removed at Candi's request; 6 frames and 24 s from July 24 to Oct 19); the mp4 `<source>` tags carry `?v=20261019`. CSS/JS carry `?v=20260617` and no longer need bumping.
8. Caddy serves HTML/CSS/JS as `no-cache` and media as `immutable` (since June 2026); a replaced media file under the same name needs a new `?v=`.
9. Sermons (`sermons/latest`) and the events page are OCS v3.1 embeds with no weekly maintenance.
10. Apple Pay domain verification file added Sep 28, 2026 at `site/.well-known/apple-developer-merchantid-domain-association`; both ebzchurch.org and www.ebzchurch.org are registered in OCS. Keep the file (details under One Church Software).
11. Contemporary service moved to **5:00 PM Sundays in the Historic Sanctuary** (Oct 19, 2026, per Candi); it was 10:00 AM in the Pardue Center. All three services are now in the little white church, and the site no longer mentions the Pardue Center except on the Easter page (last Easter's record).
12. The session-by-session narrative was retired to `HISTORY.md` on 2026-08-25; `git log` and auto memory are the record going forward. Do not add dated session entries here.

## Project Overview

This is a modern website redesign for Ebenezer Methodist Church in Milton, GA, a
traditional worship community established in 1853.

> **Pardue Center content was removed July 24, 2026.** The site was originally built
> around a *dual* identity: the historic church **and** The Pardue Center, a 23,000 sq ft
> event venue marketed for weddings, concerts, and community events. At the direction of
> **Ralf Yopb, Finance committee chairman** (who is negotiating Ebenezer's relationship
> with the Center), all material about **renting or using the facility** has been
> stripped. **Ebenezer's own activities may still mention it**: Easter and Christmas Eve
> service locations, sermons, and the calendar all
> remain. Read the Session 27 entry in `HISTORY.md` before adding anything
> Pardue-related back. Older documents in the repo (plans, design review, meeting notes)
> describe the venue-marketing era; treat them as history, not current state.

## Quick Start

```bash
cd /Users/charles/Projects/ebzrefesh/site
python3 -m http.server 8080
```
Then open http://localhost:8080

## Design Direction

Modeled on modern "megachurch" sites (austinstone.org, elevationchurch.org, woodstockcity.org): full-width video hero, a 6-item nav including Calendar, card-based sections, lots of white space, mobile-first, professional but warm.

## Repository Layout

- `site/` is the deployable root: `index.html` plus one page per section (`sermons`, `history`, `outreach`, `beat-the-drum`, `btd-update-feb-2026`, `btd-update-may-2026`, `beliefs`, `events`, `ministries`, `easter`, `womens-retreat`, `404`), `robots.txt`, `sitemap.xml`, `GLADYS-NYAMBURA-NJERI.pdf`, the unlisted `retreat-signup-test-9f3a2c.html`, and `.well-known/apple-developer-merchantid-domain-association` (Apple Pay domain verification, see One Church Software below; keep it).
- `site/css/style.css` and `site/js/main.js` are the only stylesheet and script; staff bios live in `main.js` as a JS object.
- `site/images/` holds all media: the two hero videos, `church-hero.jpg` (video poster), `logo-header.png` (steeple icon, also the favicon), `give-qr.png`, and the `staff/` and `ministries/` subfolders. `pardue-center.jpg`, `pardue-stage.jpg`, `pavillion.jpg`, `wedding-venue.jpg`, and `wedding-pavilion.jpg` are unreferenced since the Pardue removal and kept on disk deliberately; do not re-link them.
- `assets/` is the scrape of the legacy WordPress site (`images/`, `content/site-content.md`, `ASSET-MANIFEST.md`).
- Repo root also holds planning docs (`PLAN-*.md`, `DESIGN-REVIEW-2026-04-11.md`, `ebenezer_meeting_notes_session.md`), `HISTORY.md`, and loose source graphics.
- `ls site/` is the inventory; do not maintain a file tree here.

## Technical Stack

- **Static HTML/CSS/JS**, no framework, easy to host anywhere
- **Fonts**: Playfair Display (headings) + DM Sans (body) via Google Fonts
- **No build process**: edit and refresh

## Third-Party Integrations

### One Church Software (OCS v3.1 Embeds)
Used for church management, giving, sermons, events, and calendar. All embeds use the **v3.1 embed system** (`cdn.onechurchsoftware.com/embed/v3.1.js`).

**IMPORTANT:** Do NOT use legacy `bridge.js` or `inplace.bridge.js`. They conflict with v3.1.js on Chrome (causes `ServingScheduleResponse` TypeError). All pages use v3.1 only.

**Latest Sermon (auto-updating, on index.html):**
```html
<div class="ocs-embed" data-ocs-bg="#ffffff" data-ocs-title="#333333" data-ocs-text="#333333" data-ocs-box="#ffffff" data-ocs-show-description="false" data-ocs-show-speaker="false" data-ocs-tenant="ebz" data-ocs-embed="sermons/latest"></div>
```
This automatically shows the most recent sermon: **zero weekly maintenance**.

**Sermon Archive (on sermons.html):**
```html
<div class="ocs-embed" data-ocs-bg="#ffffff" data-ocs-title="#333333" data-ocs-text="#333333" data-ocs-box="#ffffff" data-ocs-button="#020a0d" data-ocs-show-filters="false" data-ocs-show-speaker="false" data-ocs-show-series="false" data-ocs-tenant="ebz" data-ocs-embed="sermons/listing"></div>
```

**Single Featured Event embed (available for the homepage "Coming Up" section):**
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

**OCS recurring events:** each occurrence has its own event ID and there is no stable series URL, so a card that links to a recurring event points at one upcoming occurrence and must be bumped when it passes. The Pavilion service is the **4th Sunday, not the last Sunday** (they differ in five-Sunday months).

**Giving URL:** https://ebz.onechurchsoftware.com/public/give/5

**Changed August 21, 2026:** the old
`https://app.onechurchsoftware.com/ebz/egiving` redirect URL **stops working in
September 2026** (OCS system upgrade, per the Finance chair's Aug 8 email). All
17 Give links and the homepage QR now point directly at the portal-5 URL above.
Do not reintroduce the egiving URL. There is also an "Ebenezer PC" giving
portal (ID 4, `…/public/give/4`) with its own "Donate PC" QR from the Finance
chair, deliberately NOT on the website (no Pardue giving surface; see the
removal directive above).

**Apple Pay domain verification (added September 28, 2026):**
`site/.well-known/apple-developer-merchantid-domain-association` is the 228-byte
file downloaded from OCS Contributions Settings, Apple Pay tab. It is served with
no extension and no redirect at that path on both `ebzchurch.org` and
`www.ebzchurch.org` (same Caddy block, `try_files {path}` matches it first),
and both domains show Registered in OCS. Never delete, rename, or move it:
Apple re-verifies periodically and a missing file silently drops Apple Pay.
Today it is dormant because giving is not embedded on the site (every Give link
opens the hosted portal, which is already Apple Pay enabled on
onechurchsoftware.com). It matters the day a giving form or portal is embedded
on ebzchurch.org; OCS says such an embed should use the v3.2 embed script
(`cdn.onechurchsoftware.com/embed/v3.2.js`) instead of v3.1.

**Online giving is a link-out, NOT an embed.** The portal URL is OCS's hosted
"Ebenezer Little White Church" giving portal (ID 5). The whole donor form
(amount, card, billing address, state/zip) is rendered and validated by OCS;
nothing in this repo touches it. OCS offers an embed snippet
(`data-ocs-embed="giving"`) but we deliberately don't use it; linking out is
more reliable. Notes for "giving is broken" reports (July 2026 investigation):
the State field is a react-select custom dropdown, prime suspect on old iOS.
Verified working end-to-end July 6, 2026 (Playwright on Chromium + iPhone-emulated
WebKit, and a real $25 donation from Charles's laptop), and again Aug 21, 2026 on
the direct portal URL. If a donor reports a form problem, it's an OCS support
ticket (device model + iOS version + screenshot), not a repo change.

### YouTube
- Channel: https://www.youtube.com/@ebenezermethodistchurchofm6983/streams
- Livestream every Sunday at 11:15 AM

### Social Media
- **Facebook:** https://www.facebook.com/EbzMethodistChurch
- **YouTube:** https://www.youtube.com/@ebenezermethodistchurchofm6983/streams
- **Instagram (Pardue Center):** https://www.instagram.com/parduecenterofficial, **removed from the site July 2026**; it is the venue's promotional account. Do not re-add without checking with Ralf/Candi.
- **Instagram (Youth/RISE):** https://www.instagram.com/rise_youth__/ (not yet linked on site; add when a youth section is built)

Social icons in the footer of all pages are **Facebook and YouTube only**. Ebenezer has no Instagram account of its own; if one is created, that is the handle to add.

### Juicer (Facebook Feed)
Aggregates Facebook posts into an embedded feed on the homepage ("From Our Feed"). Using **Starter plan** (no branding).

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

The Plan Your Visit section says "Traditional or contemporary, find the service that fits you." It said "Two venues, one church" until Oct 19, 2026, when the contemporary service moved from the Pardue Center to 5:00 PM in the Historic Sanctuary.

### Logo
The steeple icon only (`logo-header.png`, "Est. 1853", transparent background) rather than the full horizontal logo; it balances the nav buttons in the header.

### Navigation Structure
```
Get Started | About | Watch | Ministries | Calendar | [Give] | [Plan a Visit]
```
Set Feb 2026 per Candi's request; **"The Pardue Center" (which linked to `#venue`) was removed July 2026**, taking the nav from 7 items to 6. "Get Started" links to `#visit` as an interim until a dedicated page is built; it is redundant with Plan a Visit **by design** and was specifically requested by Candi, so do not drop it. "Ministries" links to `ministries.html`, Calendar to `events.html`; the rest link to homepage sections.

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
Staff cards open a modal with bio and email (close via X, backdrop, or Escape). Staff data is a JS object in `main.js`; email addresses are set via JavaScript, not HTML, to reduce scraper harvesting (this can trip browser extensions that intercept `mailto:` on load).

### Footer
Copyright year is set by a one-line script on `#currentYear`. Footer links are unified across all pages (5+4 since the Pardue link came out of the 5+5 set; cosmetic, unresolved).

## SEO Implementation

Meta tags currently target:
- "Methodist church Milton GA"
- "church Milton Georgia"
- "church Roswell GA"
- "Sunday worship Milton GA"
- "contemporary worship North Atlanta"

Includes Open Graph tags, geo tags, and canonical URLs.

**Venue keywords were deliberately dropped July 2026:** `event venue Milton GA`,
`wedding venue Milton`, `wedding venue North Atlanta`, `concert venue North Metro
Atlanta`, and `Pardue Center`. The homepage `<title>` also changed from "Church & Event
Venue" to "A Community of Faith Since 1853". **Losing rank on those venue terms is the
intended outcome, not a regression.** Do not "fix" it. Expect Google to keep serving the
old title/description for days to weeks after deploy; that lag is not a deployment failure.

### Responsive Breakpoints
Mobile-first; `min-width` breakpoints at 600, 768, 1024, and 1280px, plus `hover: none`, `prefers-reduced-motion`, and print styles.

## Open Items

- **Dedicated Get Started page**: on Candi's pending list; until it exists, Get Started and Plan a Visit both point at `#visit`.
- **Youth section**: not built; link the RISE Instagram when it is. RISE meets Sundays at 6:00 PM in the LWC (moved from Thursdays, Oct 2026; end time unknown).
- **SEO not yet addressed**: Google Business Profile optimization, structured data (Schema.org).
- The "dual-path landing page" idea from the December 2025 meeting is deferred; the church/venue split it was meant to resolve no longer exists.

## Church Information

**Address:** 12900 Arnold Mill Road, Roswell, GA 30075
**Phone:** 770-640-7287
**Email:** office@ebzchurch.org

### Service Times
| Time | Location | Style |
|------|----------|-------|
| 8:30 AM | Historic Sanctuary | Traditional |
| 11:15 AM | Historic Sanctuary | Traditional |
| 5:00 PM | Historic Sanctuary | Contemporary |

Changed Oct 19, 2026: contemporary was 10:00 AM in the Pardue Center.

### Staff
| Name | Title | Email |
|------|-------|-------|
| Glenn Hannigan | Senior Pastor | ghannigan1@yahoo.com |
| Brad Anderson | Associate Pastor (part-time) | office@ebzchurch.org (placeholder) |

**Glenn and Brad are the only staff on the site.** Rev. Brad Anderson, a former
member, joined as part-time Associate Pastor in late August 2026 (July 27 weekly
email) and went on the site Oct 19, 2026; his bio was drafted from that email and
should be replaced with one from Brad or Candi. Genesis Beasley (part-time Worship
Leader, same email) is not on the site. Robbie Underwood (Facilities Manager) and
Asa Sellers (Worship Leader) were offboarded June 17, 2026; Lisa Coxworth
(Administrative Assistant) was offboarded June 30, 2026. The staff section heading
is "Meet Our Pastors". There is no longer any venue/event/wedding
contact surface on the site; general enquiries reach the church through the footer
(office@ebzchurch.org / 770-640-7287).

### Beat The Drum Village Partnership
- **Location:** Kenya
- **Mission:** Home for children orphaned by HIV/AIDS
- **Leader:** Bishop David Thagana
- **Ebenezer Connection:** Started via film project by David McBrayer
- **Currently Supporting:** 31 children (was 33 until May 2026; count reduced after Gladys's passing on 10 May 2026 and one other departure)
- **Giving Fund:** "Beat the Drum (Glory Outreach Assembly)" in One Church dropdown
- **YouTube Video:** https://youtu.be/keb1jafdu9U
- **Image Sources:** `/Users/charles/projects/BTD/` contains newsletter HTML with embedded images
- **Partner-authored content** (the BTD update pages) keeps the author's own voice and British spellings; fix typos only.

## Reference Documents

- `ebenezer_meeting_notes_session.md`: full context from the December 4, 2025 design meeting
- `assets/content/site-content.md`: all text content scraped from the production site
- `assets/ASSET-MANIFEST.md`: inventory of all downloaded assets
- `HISTORY.md`: Sessions 1 to 27 (Dec 2025 to Jul 2026), the completed-TODO list, and the hero-video measurement method

## Deployment

**Primary domain:** ebzchurch.org (www.ebzchurch.org)
**Alias domain:** ebenezermilton.org (www.ebenezermilton.org), serves the same content
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

If the Caddy `try_files` ever loses the `{path}.html` fallback, extensionless URLs will silently fall through to a 404 (or, prior to April 2026, to `/index.html` with a 200 response causing a self-referential SEO mess). The dependency is invisible to anyone reading only the repo; the Caddy config lives on the server. Verification command after any Caddy change:
```bash
curl -sL https://ebzchurch.org/events | grep -o '<title>[^<]*</title>'
# Expect: <title>Events | Ebenezer Methodist Church | Milton, GA</title>
# NOT the homepage title.
```

**404 handling:**
`site/404.html` is the branded not-found page (full nav, footer, and a few suggested destinations). Caddy's `handle_errors` block rewrites any error to `/404.html` and serves it, so 404s get proper status codes instead of the old soft-404 pattern (which returned 200 serving the homepage for any unknown path). The old pattern broke GoAccess's bot-probe filtering and was an SEO/security smell. Removing the `/index.html` fallback is safe because `{path}.html` still catches extensionless URLs before the fallback ever runs.

**Retreat API:** `/api/retreat/*` on the same host is reverse-proxied by Caddy to `retreat.service` on the VPS (added Aug 2026; not in the repo). `womens-retreat.html` reads `/api/retreat/availability` for its counter and degrades to no counter if the call fails.

**To deploy updates** (from the Mac, after `git push`; key and host details in `~/projects/reverse-proxy/vps-details.md`):
```bash
ssh -i ~/.ssh/reverse-proxy-key root@167.71.24.36 'cd /var/www/ebz-redesign && git pull'
```

**Cache policy and `?v=` busting convention (June 2026):**

Caddy serves HTML and the un-versioned CSS/JS with `Cache-Control: no-cache` (revalidate before use, a cheap ETag 304 when unchanged), and only true media (`*.jpg *.jpeg *.png *.gif *.webp *.svg *.ico *.mp4 *.webm *.woff *.woff2 *.ttf`) with `public, max-age=31536000, immutable`. Server-side matchers (in `/etc/caddy/Caddyfile`, not the repo):

```caddy
@immutable path *.jpg *.jpeg *.png *.gif *.webp *.svg *.ico *.mp4 *.webm *.woff *.woff2 *.ttf
@revalidate not path *.jpg *.jpeg *.png *.gif *.webp *.svg *.ico *.mp4 *.webm *.woff *.woff2 *.ttf
header @immutable Cache-Control "public, max-age=31536000, immutable"
header @revalidate Cache-Control "no-cache"
```

The `@revalidate` matcher uses `not path *.<media>` so it also covers extensionless routes (`/events`, `/sermons`) that an `*.html` matcher would miss. `no-cache` on HTML means content changes (staff removals, event swaps) go live on the next revalidate, not after an hour.

**Why this exists:** before June 2026, Caddy served the never-renamed `style.css`/`main.js` as `immutable` for a year, so returning visitors could hold stale CSS/JS for up to a year (found during the June 2026 staff offboarding).

**The `?v=` convention:** every HTML reference to `css/style.css` and `js/main.js` carries a `?v=YYYYMMDD` query (currently `?v=20260617`). With the `no-cache` Caddy policy live, **bumping it is no longer required for CSS/JS**; ETag revalidation already serves fresh copies on the next request, so a plain edit + deploy is enough. Keep the query string in place as harmless belt-and-suspenders; bump it only if CSS/JS are ever moved back onto a long `max-age`. **It IS load-bearing for media**: a replaced `.mp4`, `.png`, or `.jpg` under the same filename never reaches returning browsers unless its URL changes (the hero videos carry `?v=20261019`, the giving QR `?v=20260821`). One-liner to bump CSS/JS if ever needed:
```bash
cd site && for f in *.html; do sed -i '' -E 's#(style\.css\?v=)[0-9]+#\1NEWDATE#g; s#(main\.js\?v=)[0-9]+#\1NEWDATE#g' "$f"; done
```

## Featured Event Update Pattern

The homepage "Coming Up" section is a `.featured-events-grid` of image cards (2-card responsive layout). Each card is an `<a>` wrapping an image; OCS-backed cards link to `https://ebz.onechurchsoftware.com/public/events/{EVENT_ID}`, site pages link directly (the retreat card goes to `womens-retreat.html`). To promote a different OCS event:

1. Find the event ID in One Church Software admin
2. Edit `site/index.html`: swap the card image and its href. If using the OCS embed instead of an image, change **both** the `data-ocs-id` and the overlay `<a>` href:
```html
<div style="position: relative; cursor: pointer; max-width: 600px; margin: 0 auto;">
    <div class="ocs-embed" data-ocs-id="NEW_ID" data-ocs-primary="#020a0d" data-ocs-description="false" data-ocs-tenant="ebz" data-ocs-embed="event"></div>
    <a href="https://ebz.onechurchsoftware.com/api/share/events/NEW_ID" target="_blank" rel="noopener" style="position: absolute; inset: 0; z-index: 10;"></a>
</div>
```
3. Commit and deploy

**OCS share URL format:** `https://ebz.onechurchsoftware.com/api/share/events/{EVENT_ID}`

This replaces the old hero takeover pattern for routine event promotion. Hero takeovers are still available for major holidays.

**Note:** The sermon embed (`sermons/latest`) auto-updates; no maintenance needed for weekly sermons.

## Seasonal Hero Takeover Pattern

For special events (Valentine's, Easter, Christmas, etc.), use this pattern to display a flyer/graphic on the homepage hero. This is a quick operation and should take under 5 minutes.

### To Add a Seasonal Takeover

1. **Copy the flyer image** to `site/images/` (e.g., `valentine-breakfast.png`)

2. **Edit `site/index.html`** and replace the hero section with:
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
        <p class="hero-subtitle" style="margin-top: 1.5rem;">Sundays at 8:30 & 11:15 AM and 5:00 PM</p>
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
            <source src="images/hero-slideshow.mp4?v=20261019" type="video/mp4">
        </video>
        <video class="hero-video-mobile" autoplay loop muted playsinline poster="images/church-hero.jpg">
            <source src="images/hero-slideshow-mobile.mp4?v=20261019" type="video/mp4">
        </video>
    </div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
        <p class="hero-tagline">Welcome to Ebenezer</p>
        <h1>Growing in Grace, Perfected in Love</h1>
        <p class="hero-subtitle">Sundays at 8:30 & 11:15 AM and 5:00 PM</p>
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

- `.hero-bg-seasonal`: uses static image instead of video
- `.hero-content-seasonal`: adds proper padding on mobile (100px top)
- `.seasonal-overlay`: constrains flyer size, centers it, adds shadow and margin

### Notes

- The flyer displays over `church-hero.jpg` with the standard navy overlay
- Service times are commented out during takeover (uncomment when reverting)
- Use `?regular` URL parameter to preview the normal hero during a takeover
- `overflow-x: hidden` on html/body prevents horizontal scroll issues on mobile
- The hero videos are built by scripts in `~/Downloads/church-photos-to-video/` (not the repo); see `HISTORY.md` for the frame-timing method before rebuilding

## Traffic Analytics

Self-hosted Caddy access logs + GoAccess, set up April 2026. No JS, no cookies, no third-party analytics: the site itself has zero analytics code, all tracking happens server-side from access logs.

**Dashboard:** https://stats.ebzchurch.org (HTTP basic auth; creds are NOT in this repo, ask Charles)

**How it works:** Caddy writes JSON access logs for the `ebenezermilton.org, ebzchurch.org` site block to `/var/log/caddy/ebz-access.log` (50MB roll, 10 kept, 720h retention, about 30 days). A systemd timer runs every 5 minutes, converts the JSON to Apache Combined Log Format via `jq`, pipes it through GoAccess, and writes a static HTML report to `/var/www/ebz-stats/report.html`. Caddy serves that HTML at the stats subdomain behind basic auth. IPs are anonymized (`--anonymize-ip` zeros the last octet) in the report.

**Key server paths (not in repo):**
- `/etc/caddy/Caddyfile`: `log` directive inside the main site block + `stats.ebzchurch.org` site block with `basic_auth`
- `/usr/local/bin/goaccess-ebz.sh`: the jq to GoAccess pipeline script
- `/etc/systemd/system/goaccess-ebz.{service,timer}`: 5-min regeneration
- `/var/log/caddy/ebz-access.log` + rotated gzips: raw logs
- `/var/www/ebz-stats/report.html`: the served dashboard

**Common ops:**
- Regenerate on demand: `systemctl start goaccess-ebz.service`
- Check timer: `systemctl list-timers goaccess-ebz.timer`
- Reset history: stop timer, truncate the access log + delete rotated `.gz` files, re-run service
- Extend pattern to another site: copy the `log` block, script (different paths), and timer unit

**Candi-facing summary page (`/`) vs full GoAccess (`/details`):** the stats subdomain serves a simplified, server-rendered summary at `/` (visitors this week and last with a delta, top 5 pages with friendly names, a 14-day bar list, an "updated" timestamp; bots filtered with `--ignore-crawlers`). The full GoAccess dashboard is one click away at `/details`. Both regenerate from the same 5-min run.

**FRIENDLY name map (cosmetic, optional):** top-page display names come from a `FRIENDLY` bash associative array in `goaccess-ebz.sh`. Unmapped pages still appear as a cleaned-up URL (leading slash and `.html` stripped); adding `FRIENDLY["/womens-retreat.html"]="Women's Retreat"` prettifies one. Bot probes are dropped from top-pages by cross-referencing GoAccess's `not_found` panel, which works because the site returns proper 404s (see Deployment).

**Limitations by design:** no session stitching, event tracking, or bounce rate (layer Plausible on top if ever needed); stealthier bots not on GoAccess's list still count; 5-minute lag; history starts April 18, 2026.

## Session History

Moved to `HISTORY.md` on 2026-08-25 (Sessions 1 to 27, Dec 2025 to Jul 2026). Use `git log` for anything after that.
