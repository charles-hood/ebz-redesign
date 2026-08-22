# Ebenezer Church Website — Design & UI Review

**Date:** April 11, 2026
**Scope:** site/ as of April 11, 2026. Read-through review, no files modified. All line refs verified against current source.

---

## 1. Design system: what's working, what's drifting

**Working:**
- Playfair/DM Sans pairing is well-chosen for a historic-church-meets-modern-venue brand. The clamp-based type scale (style.css:104–107) is sensibly tuned.
- Navy/gold/off-white palette is restrained and legible. Container max-widths (1200 / 800) give clean line lengths in narrative pages like history.html.
- Section padding reduction noted in CLAUDE.md (8rem → 5rem → 3rem mobile) was the right call — the site doesn't suffer "scroll fatigue."
- The mission statement section (index.html:106–113, style.css:505–527) is the single strongest design moment. Playfair at clamp(1.5rem, 3vw, 2.25rem) with navy-highlighted key verbs is quietly confident.

**Drifting:**
- **Gold accent (`--color-accent: #c9a227`) is undernourished.** Grep'd references: footer-link hover, venue-tagline, capstone-rule, focus-visible outline, ministry subtitle, easter-location. That's it. The palette claims navy/gold/white but reads navy/white with the occasional gold footnote. You have a color you're not spending.
- **Inline styles are creeping in.** index.html:27–29, 92, 94–101, 123, 372; beat-the-drum.html:165–167, 169–173, 181–183, 240–241. Each one is a small deviation from the design system — a bespoke shadow, a bespoke padding, a bespoke max-width. They're signals that the card/section components aren't quite flexible enough for what you're trying to express.
- **H4 deliberately uses DM Sans** (style.css:1219–1224 on `.visit-item h4`). That's fine for the "Service Times / Location / What to Expect" row, but elsewhere h4 inherits Playfair (style.css:97–107). So h4 silently changes family depending on context — a minor system inconsistency that'll bite when you add a new page.

**Recommendation:** Do a color audit pass — find 3-4 places to introduce gold intentionally. The easiest wins: section-title underlines (à la the beliefs capstone-rule), hover state on primary buttons, current-page nav indicator. *Effort: quick tweak.*

---

## 2. Homepage — section-by-section

### 2.1 Hero (index.html:58–87, style.css:306–502)

**Currently:** Video background, navy gradient overlay, centered content stack: tagline → h1 → SUNDAYS label → two service lines → address link → two CTAs. Then a scroll indicator at bottom.

**What's weak:**
- **Seven stacked elements is dense.** Tagline, title, section heading ("Sundays"), two service lines, address, then the button row. Each has its own color/opacity/case treatment. The eye has to do a lot of work before it reaches the CTAs. The service-times breakout (Session 17 change) was the right call — listing them separately respects that they're actually different styles — but it pushed density higher.
- **H1 wrap is unpredictable.** "Growing in Grace, Perfected in Love" at 64px desktop will wrap to two lines in the 640px content area. Because it's a two-clause phrase, the wrap point matters — if it breaks after "Grace," the comma dangles awkwardly. Consider forcing the break with a `<br>` after the comma, or tighten `max-width: 800px` (style.css:402) to keep the two clauses balanced.
- **Nothing in the hero speaks to the venue audience.** Hero is 100% church-first. The dual identity doesn't appear until section 7 (Venue, line 347). A "wedding venue Milton GA" prospect scrolls past a full church sermon, mission statement, and staff grid before seeing content for them.
- **`.hero-scroll` indicator** (index.html:83–86, style.css:475–502) is a nice touch on desktop but feels dated — the pulsing vertical line is a 2017 trope. Not broken, just flag it for future consideration.

**What to change:**
1. **Add a subtle venue hook** in the hero, styled like the `.hero-address` link (style.css:453–466). Something like a small italic "Looking for the Pardue Center? →" below the CTAs, or a second address-style secondary link. Don't add it as a button — keep the primary CTA pair clean. This is the single most direct answer to the dual-identity problem for the highest-traffic audience. *Effort: quick tweak.*
2. **Tighten the hero stack.** Drop the "SUNDAYS" label (style.css:428–434) — the two service lines below it already imply it. That's one less thing to parse. *Effort: quick tweak.*
3. **Consider moving the scroll indicator inside the button row's orbit or retiring it.** *Effort: quick tweak.*

### 2.2 "Coming Up" featured event (index.html:89–103)

**Currently:** A 500px-wide centered image, inline-styled with box-shadow and border-radius, wrapped in an `<a>` to the OCS share page. Section header is "Coming Up" centered above, margin-bottom 1rem. Padding 2rem/3.5rem.

**This is the weakest component on the homepage.** Specifically:
- **500px on a 1200px container** reads as a postage stamp surrounded by empty alt-background. Visually it feels lonely and small-scale relative to everything around it. On desktop the image occupies ~42% of the container width.
- **Zero metadata.** No date, no location, no description — the entire message is carried by whatever flyer JPEG was uploaded. When the flyer is polished (Easter, Spring Fling), it works. When it's a quick internal graphic, the section looks rough. You've built a pattern that only works when the flyer is good, which is a *fragile* pattern.
- **The section is shorter than its neighbors** (2rem/3.5rem padding vs 5rem standard), so it reads as a strip between hero and mission rather than as a first-class homepage section. Combined with the alt background color, it blurs into the mission section below (which *also* has alt bg — see 2.3).
- **No fallback state.** What happens between events? There's always an upcoming event somewhere, but if the flyer isn't ready the section just shows stale content.

**What to change:**
- **Redesign as a proper event card.** Image on one side (or top on mobile), title + date + location + short description + button on the other. Use the existing `.card` treatment or a new variant that matches it. When there's no featured event, fall back to the OCS `events/listing` embed showing the next 2-3 events. *Effort: medium refactor.*
- **Don't hide the section details inside the flyer JPEG.** A caption ("Saturday, April 18 · Pardue Center") outside the image means a hastily-made graphic still looks intentional.

### 2.3 Mission statement (index.html:106–113)

Strong. The only issue is that it lives on `--color-bg-alt` immediately after "Coming Up" which also lives on `--color-bg-alt`. Two off-white sections stacked breaks the site's white/alt cadence. Flip one of them to white (the featured event can be white, mission stays alt). *Effort: quick tweak.*

### 2.4 Watch (index.html:116–132)

**Currently:** Section header + OCS `sermons/latest` embed + "View All Sermons" secondary button.

**Issue:** You're at the mercy of OCS's card styling, which won't match your site's border-radius, shadow, or typography. The embed renders a black box you can't polish. Since this is the only "media" moment on the homepage, it's worth framing harder: a background treatment (`--color-bg-alt`?), a left-side narrative ("Our latest message") and the embed on the right, or a custom wrapper div that the embed sits inside of. Currently the embed just floats in a white section, no frame. *Effort: quick tweak to medium.*

### 2.5 About (index.html:135–150)

Fine. 2-column grid, image left, text right, "Our Story" CTA. H2 "170 Years & Growing" is memorable. One observation: the lead copy ("For over 170 years...") repeats the 170 years beat that the heading already made. You could tighten the opening paragraph.

### 2.6 Connect cards (index.html:153–192, style.css:646–702)

**Currently:** Three cards — Sunday Worship, Outreach, Beat The Drum.

**Weak spots:**
- **Only 3 cards, and one is redundant.** "Sunday Worship" links to `#visit` (line 160), which is the same destination as the hero "Plan Your Visit" button, the nav "Get Started" item, and the nav "Plan a Visit" button. The card has no novel destination. It's a fourth affordance for the same action.
- **The section header "Get Connected / There's a place for you here"** is generic-evangelical and doesn't tell the user what this section is *about*. It's not ministries (that has its own page now), it's not services (Sunday Worship), it's not outreach explicitly. The cards are actually "ways to go deeper at Ebenezer" but the header doesn't cue that.
- **Only 3 cards with `grid-template-columns: repeat(3, 1fr)`** means on 1200px desktop each card is ~380px wide — they feel slightly over-stretched. 4 cards would fit better proportionally.

**What to change:**
- Replace Sunday Worship with a genuinely new card: **Ministries** (→ ministries.html), or **Plan Your Wedding** (→ opens wedding modal, addresses venue audience), or **Sermons** (→ sermons.html). *Effort: quick tweak.*
- Rename section header to something concrete like "Ways to Connect" or "Where to Start" — give it orientation. *Effort: copy question for Candi.*
- Consider expanding to 4 cards — you have the room. *Effort: quick tweak.*

### 2.7 Venue section — Pardue Center (index.html:347–382, style.css:1112–1193)

**Currently:** Full-bleed background image, left-weighted navy gradient overlay, left-aligned content with tagline, h2, description, 3 feature items with emoji icons, 3 CTAs.

**What's strong:** This is one of the more polished sections — the left-gradient overlay creates room for text while keeping the photo as the hero. "Now Open" gold tagline is one of the few places the accent color actually earns its keep.

**What's weak:**
- **🏛️ 💒 🎉** — the emoji feature icons (line 360–369). These are the single worst-polish element on the entire homepage. Emoji render platform-differently (Apple rounder, Android flatter, Windows uglier), they sit at inconsistent baselines with text, and they undercut the otherwise serious typography. Every other element on the page is navy, gold, Playfair, DM Sans, SVG — and then emoji. *This is the #1 easy win on the site.*
- **"Feature" chips with icon+text** pattern is under-designed. Each feature is just an emoji + a label. No hierarchy, no border, no shape. They read as bullet points trying to be more than bullet points.
- **Venue h2** uses white Playfair (style.css:1160–1163) which is good, but the venue is where the "wedding venue Milton GA" SEO keyword lives — no SEO-friendly sub-heading like "North Atlanta Event Venue" or similar.

**What to change:**
1. **Replace the emoji with SVG icons.** Stroke-based, 24×24, navy or gold. Heroicons, Phosphor, or Lucide style. The 3 existing feature labels can stay. This is the single highest-polish/lowest-effort change on the site. *Effort: quick tweak.*
2. **Reconsider the feature chip design.** Could be vertical stack with icon above label, or horizontal with hairline separator. Or drop the icons entirely and use a comma-separated inline list: "Modern Worship Space · Wedding Venue · Community Events." *Effort: quick tweak.*

### 2.8 Plan Your Visit (index.html:385–423)

Solid. 2-column grid with details on one side and Google Maps iframe on the other. `.visit-item h4` using DM Sans was a deliberate choice and reads well (the Playfair h4 would've competed with the h2 above).

One note: the "Get Directions" button (line 408) goes to Google Maps with a query param that looks slightly different from the hero's address link (line 77) which includes a `destination_place_id`. Both work; they just encode slightly differently. Cosmetic, not a real issue.

### 2.9 Give (index.html:425–444)

Works well. Full-bleed image background with 85% navy overlay, centered content, white "Give Online" button with gold hover state. The gold hover (`.section-give .btn-primary:hover`, style.css:1288–1292) is one of the few places gold is used intentionally — *this is the pattern to repeat elsewhere.*

### 2.10 Juicer feed (index.html:447–453)

Fine in concept, but the section title is "Follow Us on Facebook" — not a call to action users typically respond to. Consider renaming to "From Our Feed" or "Recent Posts" to reframe it as content, not a conversion ask. The feed-as-content framing works better because people who'd follow you on Facebook already do. *Effort: quick tweak if Candi approves.*

### 2.11 Footer (index.html:455–504, style.css:1382–1468)

Functional. Two observations:
- **Link columns are inconsistent across pages.** index.html has Quick Links (Watch, About, Ministries, Give) + Resources (History, Beliefs, Staff, Events). ministries.html has Quick Links (Watch, About, Ministries, Pardue Center) + Resources (Sermons, Give, History). beliefs.html has a third combination. This is a maintenance bug but also means the footer's information architecture is inconsistent. *Effort: quick tweak to unify.*
- **Visually generic.** Black bg, white text, 4 equal columns. Fine. If you want a moment of character, the brand column could get a tagline treatment — Playfair italic pullquote ("A community of faith since 1853") instead of plain DM Sans. *Effort: quick tweak.*

---

## 3. Navigation

**Currently (all pages):** `Get Started | About | Watch | The Pardue Center | Ministries | Calendar | [Give] | [Plan a Visit]` — 8 items including the two button CTAs.

**Problems:**

1. **Eight items is too many.** At the 1024px desktop breakpoint (style.css:1828, where nav-links becomes horizontal), nav items + logo + gap math is very tight. I count roughly: logo ~150px + 6 text items (avg ~80px each) + 2 buttons (~110px each) + 7 × 32px gaps = ~1094px just for nav content on a 1024px viewport with 24px side padding. You're pinching the breakpoint. The 1024–1199 range is almost certainly squeezed.
2. **Four of the items are homepage anchors** (Get Started, About, Watch, The Pardue Center). When a user is on ministries.html or events.html and clicks "About," they jump to the homepage, scroll to an anchor, losing context. That's four nav items with a weak information scent — they behave differently depending on where you are.
3. **"Get Started" is SaaS-y language for a church.** It implies a multi-step flow that doesn't exist. Plus it's duplicative with "Plan a Visit" — same destination (`#visit`). That's two nav items going to the exact same anchor.
4. **No active-page indicator.** `class="active"` is set on current-page items (e.g., ministries.html:137, events.html:84), but there's no CSS rule for `.nav-links a.active` — grep confirms. The attribute is set but visually nothing happens. *Bug.*

**What to change:**
1. **Drop "Get Started."** It's redundant with the "Plan a Visit" button on the right. *Effort: quick tweak, but a copy decision for Candi.*
2. **Add a visible `.active` state** — style.css needs a rule like `.nav-links a.active { color: var(--color-primary); border-bottom: 2px solid var(--color-accent); }`. This is where the gold accent should earn its keep. *Effort: quick tweak.*
3. **Consider collapsing "Watch" under "Media"** alongside a future "Sermons" link — if sermons.html gets promoted in the nav later, these two belong together. *Effort: think-about-later.*

---

## 4. Sub-pages

### 4.1 sermons.html (113 lines)

**This is the weakest sub-page on the site by a clear margin.** It is literally: nav → page header with "Sermons" and one line of copy → OCS embed → footer. 113 lines, most of which are the nav and footer templates. The page offers zero design, zero context, zero hierarchy. It's a wrapper around an iframe.

**What's missing:**
- No "latest sermon" feature block — the sermons/latest embed on the homepage shows more love than the sermons page itself.
- No context about *who* preaches (Glenn? Asa? Guest?), *what* a typical message is like, *where* it lives (YouTube link, podcast?).
- No series or topic grouping.
- No cross-link to the Watch section on the homepage.

**What to change:**
- **Add a "Latest Message" hero block** at the top of sermons.html (reuse the sermons/latest embed pattern from index.html:122, or wrap it in a custom frame). Then the archive listing below.
- **Add a short preamble paragraph** — 2-3 sentences about how teaching works at Ebenezer. Think of it as "if you're new here, listen to this first."
- **Consider a YouTube channel link button** — the livestream URL is in CLAUDE.md, currently only in footer as an icon.
- *Effort: medium refactor. This is sub-page #1 to redesign.*

### 4.2 events.html (193 lines)

Also bare. Header is just the word "Events" next to a Grid/List toggle, then the OCS calendar embed. No featured events, no "This Sunday," no month context, no visual treatment of the page itself.

**What to change:**
- Add a page header matching other sub-pages (`.page-header` class used by sermons/history/beliefs — events.html uses none of that).
- Consider a "Don't Miss" band at the top with 1-2 upcoming featured events before the full calendar.
- The centered Events/Grid-List chrome (lines 94–101) feels like a stray component — give it a proper container.
- *Effort: medium refactor.*

### 4.3 ministries.html (331 lines)

**Works well as a landing page** — auto-fill grid at `minmax(340px, 1fr)` (line 37) gives 3 columns at 1200px, 2 at tablet, 1 at mobile. Card photos are decent, subtitle + verse + details pattern gives some rhythm.

**Issues:**
- **"Education" card (lines 268–273) looks broken.** The body text is literally "Details coming soon." with no image, no subtitle, no metadata. Sitting in a grid next to polished Children's, Youth, Men, Women cards, it reads as under-construction signage. *Remove the card entirely until content is ready, or give it a subtle "Coming Soon" treatment — muted background, "Under Development" tag, etc.*
- **Variable card heights.** Some cards have photos + verses + details (Children's), some just have a paragraph (Grief, Widows, Education). The auto-fill grid doesn't unify heights, so you get a jagged bottom edge row-by-row. Adding `align-items: stretch` at the grid level or giving all cards consistent sections (even empty ones) would smooth this. *Effort: quick tweak.*
- **Three cards lack images entirely** (Grief, Widows, Education). They look like "placeholder" cards next to their photo'd siblings. Could you commission stock art or use abstract color blocks with an icon? Even a solid navy or gold block with a centered Playfair quote would beat a white rectangle.
- **Card headings use `h2`** (line 162, etc.) while the page has one `h1` in `.ministries-hero`. That's technically fine semantically but visually every card looks as important as the hero title. Consider demoting card titles to `h3`. *Effort: quick tweak.*

### 4.4 beliefs.html (192 lines)

**Works but feels monotonous.** 12 consecutive `<p><strong>We believe</strong>...` paragraphs (lines 102–124). Reading fatigue sets in around paragraph 5. The floated hero image (`.beliefs-image`, max-width 300px, style.css:48–53) wraps text into a narrow ~500px column for the first few paragraphs, which makes the "We believe" repetition even more insistent.

**What to change:**
- **Group the 12 beliefs into themed blocks** — "God" (1-3), "Jesus Christ" (4-5), "Salvation & the Holy Spirit" (6-7), "The Church & the Future" (8-12). Add small `h3` subheadings. This breaks the wall of text without cutting any content and gives the page a structure that matches how people actually think about doctrine.
- **Reconsider the floated image.** A 300px float in an 800px column is aesthetically an odd proportion — either make it full-width above the content (like other sub-pages' hero images) or make it a decorative element in a margin gutter.
- The **mission capstone** (lines 126–129, styled in style.css:529–539) is a nice moment — keep it.
- *Effort: quick tweak to medium.*

### 4.5 history.html

**One of the strongest sub-pages.** Reverse-chronological timeline with pill-shaped `.timeline-marker` chips (style.css:126–137), floated image for the Glenn section, blockquote for the 1931 fire eyewitness, hero image at top. Reads like a thoughtful long-form piece. No changes recommended.

### 4.6 outreach.html

**Solid but homogeneous.** Every program is a `.program-card` — same grey bg, same padding, same h3+p layout (style.css equivalent in outreach.html:63–76). Across 7 programs it gets repetitive. Consider differentiating with icons, varying the card style for "flagship" programs (Drake House, NFCC) vs smaller ones (Coat Drive), or introducing a program type tag.

The navy `.contact-box` at the bottom (lines 77–95) is nice — echoes the Give section. *Effort: quick tweak to medium.*

### 4.7 beat-the-drum.html

Strong — stat cards (33 / 100% / 1), focus area cards, donate box. The "Latest Update" callout (lines 169–173) is an anomaly: inline-styled with `border-left: 4px solid var(--color-accent)` — it's the most accent-color-forward moment on the site. Nice. But also: this callout pattern isn't reused anywhere else. Worth considering as a site-wide "alert / update" component.

### 4.8 easter.html

Holds up well as a seasonal page. Two-column graphic + schedule layout, named divider headings ("Thursday, April 2"), baseline-aligned event rows. Minor: the schedule is 12+ rows on desktop which makes the right column very tall vs the graphic on the left — causes asymmetry. Not critical.

---

## 5. Mobile specifically

**What works:**
- Hero collapses cleanly, buttons stack full-width with `max-width: 300px`.
- Mobile-only tightening of modals (Session 15 & 16) is genuinely thoughtful work. The `.modal-heading-desktop`/`.modal-heading-mobile` pattern and the wedding modal photo swap are the kind of polish that usually only senior frontend folks bother with.
- Staff grid at 2 columns with `max-width: 120px; width: 90%` is the fix from Session notes — works.

**Weak spots:**
- **Nav dropdown** (style.css:1484–1526) is an 8-item vertical stack with 2 buttons at the bottom. On a 375px × 667px iPhone SE, that's a long drawer. Consider grouping into sections (main links vs. "For Visitors" CTAs) or dropping the redundant items (see nav section above).
- **Venue section on mobile** (style.css:1636–1666) centers content and stacks features vertically — but those emoji icons look even worse at smaller sizes. Even more reason to replace them.
- **Ministries grid on mobile** collapses to 1 column. The 3 text-only cards (Grief, Widows, Education) look like plain paragraphs without the visual weight of their photo'd neighbors — more jarring on mobile than desktop where the grid context helps them feel "card-like."
- **Beliefs page floated image on mobile** correctly un-floats. Fine.
- **Events page header** ("Events" + toggle buttons) has `padding-top: 7rem` inline (line 92) to clear the fixed header, but nothing else. On mobile it's especially sparse.

---

## 6. Dual identity assessment

The homepage is **90% church-first.** If a user arrives via "wedding venue Milton GA" Google search, their journey is:

1. Hero: church service times, "Welcome to Ebenezer," "Plan Your Visit" — doesn't speak to them.
2. Coming Up: whatever event is featured — might be church, might be venue-relevant.
3. Mission: church.
4. Watch: sermon embed — not for them.
5. About: 170 years Methodist history — not for them.
6. Connect cards: Sunday Worship / Outreach / Beat The Drum — all church, none venue.
7. Staff: pastors and church admin.
8. **Finally** — Venue section (index.html:347) — content for them.

That's **seven sections** of church-first content before the first wedding-venue prospect sees anything relevant. The SEO brings them in but the homepage journey punishes them for arriving.

**What to change:**
1. **The hero venue hook** (covered in §2.1) — smallest-effort, highest-impact move.
2. **Promote the venue section higher in the page order.** Move it to position 3 or 4, right after the mission or after the Watch section. The church audience doesn't lose anything — they're going to scroll the whole page anyway. The venue audience gains seven sections of relevance. *Effort: medium refactor — CSS-wise trivial, but requires Candi's sign-off and thinking through how mission → venue → watch flows.*
3. **Expand the Connect cards to 4 items and include a "Plan Your Wedding" or "Host an Event" card** (see §2.6) — gives the venue a second homepage presence beyond its main section. *Effort: quick tweak.*

---

## 7. Weakest page, ranked

1. **sermons.html** — unambiguously the weakest. Wrapper around an iframe, no design. Rebuild.
2. **events.html** — second weakest. Tiny header + calendar embed + nothing else.
3. **beliefs.html** — not weak, but monotonous (12 paragraphs, repetitive structure).
4. **Homepage "Coming Up" featured event section** — not a page, but the weakest component on the homepage.

---

## Top 5 highest-impact changes, prioritized

1. **Replace the emoji feature icons (🏛️ 💒 🎉) in the venue section** with SVG icons. (index.html:360–369) — *Single highest polish-per-effort ratio on the site. One quick tweak removes the most visually amateur element on the homepage.*

2. **Rebuild the "Coming Up" featured event section** as a proper event card with metadata, not an inline-styled postage-stamp image. (index.html:89–103) — *Current implementation is a fragile pattern that only works when the flyer is professionally polished. A real card design degrades gracefully when the graphic is rushed.*

3. **Add a venue hook to the hero + promote the venue section higher in the homepage order.** (index.html:58–87 and §347–382) — *Single most direct answer to the dual-identity problem. Seven sections of church-first content before a venue prospect sees their content is a journey that punishes SEO success.*

4. **Redesign sermons.html as an actual page, not an iframe wrapper.** (sermons.html, full file) — *Weakest sub-page on the site. Add a Latest Message block, a short preamble, a YouTube link, and frame the archive listing with real design.*

5. **Fix the `.active` nav state + drop "Get Started" from navigation.** (style.css needs an `.nav-links a.active` rule; index.html:45–54 and same block on all 8 sub-pages) — *Current nav has 8 items including a dead-code `class="active"` with no CSS, and "Get Started" points to the same anchor as "Plan a Visit." Dropping it relieves the 1024px breakpoint pinch AND eliminates a duplicate destination AND gives you a place to spend the gold accent color.*

---

## Quick-tweak punch list (items under ~30 min each)

- Nav: remove "Get Started," add `.active` CSS state using gold accent.
- Venue section: replace emoji with SVG icons.
- Homepage: flip either "Coming Up" or mission section background from alt to white to break the stacked-alt-bg run.
- Homepage: drop the "SUNDAYS" label from hero — service lines already imply it.
- Connect cards: replace redundant "Sunday Worship → #visit" card with a ministries or venue-audience card.
- Ministries: remove or subdue the "Education — Details coming soon" placeholder card.
- Ministries: demote card titles from `h2` to `h3` for hierarchy honesty.
- Footer: unify link columns across all 8+ pages (currently each page has a different combination).
- Juicer section: rename "Follow Us on Facebook" to "From Our Feed" (Candi approval).
- Events page: wrap header in `.page-header` to match sermons/history/beliefs.

Total punch list effort: probably one focused afternoon.
