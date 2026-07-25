# Ebenezer Website — Tier 2 Design Discussion

**For:** Candi and Glenn
**From:** Charles
**Date:** April 11, 2026

---

> ## ⚠️ Out of date as of July 24, 2026
>
> The Pardue Center's rental and venue content was removed from the website at the
> direction of Ralf Yopb, Finance committee chairman, while Ebenezer's relationship with
> the Center is being renegotiated. Ebenezer's own activities were not affected: the
> 10:00 service, sermons, and the calendar are all still there.
>
> That makes **items 1 and 2 below moot** — item 1 proposed a "Plan Your Wedding" card
> that would open a modal which no longer exists, and item 2 asked where to position a
> venue section that has been deleted. Both are marked obsolete in place. **Items 3, 4,
> and 5 are unaffected and still open for discussion.**

---

## Why this exists

We just finished a round of design and code audits on the website. Several outside reviewers (technical and design) looked at the site and found things worth improving. Most of those things were small, mechanical, and easy fixes — I went ahead and made those (icons, colors, spacing, accessibility, performance, broken links). That work is already live.

But a handful of items are bigger. They touch content, page priority, or how visitors navigate the site, and they need your input before I can move forward. **None of these are urgent** — the site is in good shape today. These are "make it better" decisions, not "fix it" decisions.

This document covers five items for discussion. Each one explains what we noticed, what we're considering, and what I need from you to move forward.

---

## 1. The "Get Connected" cards on the homepage  
> **❌ OBSOLETE (July 2026)** — Option A proposed replacing a card with "Plan Your Wedding," which opened the wedding inquiry modal. That modal was deleted with the rest of the venue content. If you still want to change what the three cards are, that is a fresh conversation.

### What we have now

Three cards on the homepage between the staff section and the venue section: **Sunday Worship**, **Outreach**, and **Beat The Drum**. Each is a clickable card with a photo, a heading, and a short description.

### What the audit flagged

The "Sunday Worship" card links to the same place as the "Plan a Visit" button at the top of every page. So a visitor who lands on the homepage already has multiple ways to find service times — the card just adds a fourth path to the same destination, taking up real estate that could point somewhere genuinely new.

The audit also noted that "Get Connected" as a section header doesn't tell visitors what's actually in the section. It's not specifically about ministries (those have their own page now), it's not about services, it's not about outreach exclusively. It's a mixed bag.

### What we're proposing

**Option A — replace the Sunday Worship card with a "Plan Your Wedding" card.** This would open the wedding inquiry modal that's already built. Benefit: gives the wedding venue a second presence on the homepage, addresses the audit's concern that the venue is invisible until you scroll halfway down the page. The card would use one of the existing wedding photos.

**Option B — replace it with a "Ministries" card** linking to the new ministries landing page. Benefit: showcases the ministries page work we did, gives that page more discoverability.

**Option C — keep all three current cards but rename the section header** to something more specific like "Where to Start" or "Ways to Get Involved."

**Option D — leave it alone.** The audit's concern is real but mild. If you like the current cards, we can do nothing here.

### What I need from you

Candi: which option (or combination) feels right? My personal lean is **Option A** because it directly addresses the dual-identity issue (church + venue) without losing anything important — you can still find service times at the top of every page, in the hero, and in the visit section below.

---

## 2. Where the Pardue Center sits on the homepage  
> **❌ OBSOLETE (July 2026)** — the Pardue Center section no longer exists on the homepage, so there is nothing left to reposition.

### What we have now

The Pardue Center venue section is the seventh major section on the homepage, in this order:

1. Hero (welcome + service times)
2. Coming Up (featured event)
3. Mission statement
4. Watch (latest sermon)
5. About (170 years history)
6. Get Connected (the cards from item 1)
7. Staff
8. **The Pardue Center**
9. Plan Your Visit
10. Give

### What the audit flagged

If someone arrives via a Google search for "wedding venue Milton GA" or "event venue North Atlanta," they land on the homepage and have to scroll past **six full sections of church content** before they see anything about the venue they were searching for. The SEO is doing its job (bringing people in), but the homepage experience punishes them for arriving — they see sermons, our staff, our history, and our mission before they see "yes, you can rent this space for your wedding."

### What we're proposing

Move the Pardue Center section higher in the homepage order — likely to position 4 or 5, somewhere after the mission statement and before the staff grid. The church audience doesn't lose anything (people who scroll the page will see all the same content in roughly the same order), but venue prospects find their content sooner.

A more cautious version: leave the venue where it is, but add a small "Looking for the Pardue Center?" link in the hero next to the address. That solves the discovery problem without rearranging the page.

### What I need from you

Candi: how do you feel about the venue showing up earlier? This is genuinely a values question — the church is the church's primary identity, and the venue is a means to an end (ministry funding, community outreach). Putting the venue too prominent might feel off-mission. Putting it too late may keep losing the venue audience we're paying to attract.

**Three positions to choose from:**
- **Aggressive:** Move venue to position 4 or 5. Maximum visibility for venue audience.
- **Moderate:** Keep venue where it is, but add a hero link. Visitors who scan the hero see "Looking for the Pardue Center? →" and can jump directly.
- **Conservative:** Leave it as-is. The audit's concern is real but manageable.

---

## 3. Rebuilding the Sermons page

### What we have now

The sermons page (`ebzchurch.org/sermons`) is currently a bare wrapper around the One Church Software sermon archive embed. There's a "Sermons" heading at the top, a one-line subtitle, and then the embed listing every sermon. That's it.

### What the audit flagged

The sermons page is the weakest sub-page on the site by a clear margin. Compared to pages like History or Beliefs (which have layout, photos, narrative structure), Sermons is just a frame around an iframe. There's no:
- Featured "Latest Message" block at the top
- Any context about who preaches or what a typical message is like
- Any "if you're new, listen to this first" guidance
- Any link to the church's YouTube channel

The homepage's Watch section actually shows more love for sermons than the sermons page itself.

### What we're proposing

A real rebuild of the sermons page with:
1. **Latest Message hero** at the top — a featured block showing the most recent sermon with title, date, speaker, scripture, and a play button. (We'd reuse the same embed pattern that's already on the homepage.)
2. **Short preamble paragraph** — 2-3 sentences about how teaching works at Ebenezer. Could mention typical message length, expository style, current series if any.
3. **YouTube channel button** — direct link to the church's YouTube channel for people who want to subscribe and watch on YouTube.
4. **Then the existing archive listing** below.

### What I need from you

Glenn: this is your call. Two things specifically:
1. **Preamble copy.** If you wanted to write 2-3 sentences welcoming someone who just landed on the sermons page — what would they say? Think of it as the answer to "if I'm new here and looking at your sermon archive for the first time, what should I know?"
2. **A "Start Here" sermon, if any.** Is there a particular message you'd want a first-time visitor to hear? It could be a sermon series intro, a message about who Ebenezer is, or anything you'd point a friend to. We could feature it specifically.

If you'd rather not, we can still do the rebuild without a Start Here pick — just the latest message + preamble + archive.

---

## 4. The Beliefs page

### What we have now

The "What We Believe" page lists 12 statements of faith, each starting with "We believe..." in a flowing paragraph format. There's a Bible image floated to the right of the first few paragraphs, and a mission statement capstone at the bottom.

### What the audit flagged

12 consecutive "We believe..." paragraphs gets monotonous around paragraph 5. The repetition makes the page feel longer than it needs to and harder to skim. Visitors who want to quickly find what Ebenezer says about (say) salvation or the Holy Spirit have to read through most of the list to get there.

### What we're proposing

Group the 12 beliefs into themed sections with small subheadings, like:

- **God** (statements 1-3 — about God, the Trinity)
- **Jesus Christ** (statements about Christ's life, death, resurrection)
- **Salvation and the Holy Spirit** (statements about how we're saved)
- **The Church and the Future** (statements about the church, scripture, eternity)

The actual content stays exactly the same — same words, same theology, same number of beliefs. We're just adding 3-4 small section headings to break the wall of text into digestible chunks.

### What I need from you

Glenn: this is a content reorganization on a page you wrote, so I want your blessing before touching it. Two specific questions:

1. **Are you OK with us adding subheadings?** They wouldn't change a single word of the existing text — they'd just group the paragraphs you already wrote.
2. **If yes, do you want to define the groupings yourself,** or are you fine with me proposing a grouping for your review? I'm happy to draft something and let you adjust.

The mission capstone at the bottom stays exactly as-is — that's the strongest moment on the page and we shouldn't touch it.

---

## 5. The "Coming Up" featured event on the homepage

### Status update (April 11, 2026)

Candi already moved this forward partially. The section now supports **multiple featured events side-by-side** instead of just one — currently showing two cards (Spring Fling Market + RISE Youth) that stack to one column on mobile. Adding a third card later is a 4-line HTML change. So the "single postage stamp" complaint is resolved.

What's still open from the original audit suggestion below is the **metadata fields** question — whether we want to add date, time, location, and description text *around* each card image, or keep them as image-only. Read on for the original framing.

### What we have now

The "Coming Up" section near the top of the homepage shows two flyer images side-by-side, each clickable to its event page on One Church Software. There's no date, no time, no description, no extra context — just the flyer images.

### What the audit flagged

The current pattern only works when the flyer is professionally designed. When it's a quick internal graphic, the cards look rough.

### What we're proposing

Add metadata around each card:
- Event title (e.g., "Spring Fling Market")
- Date and time ("Saturday, April 18 · 10am–2pm")
- Location ("The Pardue Center")
- 1-2 sentence description ("Join us for our annual spring market featuring local vendors, food, and activities for kids.")
- A button ("Learn More" or "Get Tickets")

This way even a hastily-made flyer image still looks intentional because the metadata around it carries the message. The downside is that updating a featured event becomes a 5-minute task instead of a 30-second image swap — someone has to type in the date, location, and description each time.

### What I need from you

Candi: this is a workflow change. Two questions:

1. **Are you willing to enter event metadata (4-5 fields) each time you change a featured event?** If yes, we do the rebuild. If no, we leave it as the image-only cards we have now (which already look better than the single-image version).
2. **If yes, who's the source of truth for those fields?** Are they already in One Church Software when you create the event? If so, we can just copy/paste from there.

There's also a middle option: build the new card design but keep the metadata-free fallback for "I don't have time to fill in the fields right now." The card would gracefully degrade to just an image when the metadata fields are empty.

---

## Items I'm NOT asking about

A few audit suggestions I've already decided against (or already done) — flagging them so you know they were considered:

- **"Drop Get Started from the nav"** — the audit suggested this because Get Started currently links to the same place as Plan a Visit. I considered it and decided against — Candi specifically asked for Get Started, and there's a planned dedicated Get Started page that will give it its own destination. The current redundancy is temporary by design.

- **"Replace the venue feature emoji with SVG icons"** — done in the last commit. The emoji (🏛️💒🎉) are now stroke-style icons in white that match the rest of the site's visual language.

- **"Add active state to the current nav item"** — done in the last commit. Visit `events.html` or `ministries.html` and you'll see a small gold underline on the current page's nav link.

- **"Unify the footer link columns across pages"** — done in the last commit. Every page now has the same footer structure: Quick Links (Watch, About, Ministries, The Pardue Center, Give) and Resources (History, Beliefs, Staff, Outreach, Events).

- **"Hide the placeholder Education ministry card"** — done in the last commit. The "Details coming soon" card is hidden until Glenn ships the photo and content.

- **"Rename the Facebook feed section"** — done in the last commit. "Follow Us on Facebook" is now "From Our Feed" — frames it as content rather than a conversion ask.

---

## Summary — what I need from you

| # | Item | Decision needed from | Estimated effort if approved |
|---|---|---|---|
| ~~1~~ | ~~Get Connected cards — replace Sunday Worship?~~ | — | **Obsolete (July 2026)** |
| ~~2~~ | ~~Pardue Center position on homepage~~ | — | **Obsolete (July 2026)** |
| 3 | Rebuild sermons.html | Glenn (preamble + Start Here pick) | 1-2 hours |
| 4 | Restructure beliefs.html into themed groups | Glenn (blessing + groupings) | 30 minutes |
| 5 | Coming Up featured event card rebuild | Candi (workflow change OK?) | 1-2 hours |

**Total if the three remaining items are approved:** roughly 3-4 hours of work.

**No deadline.** Take whatever time you need to think these through. Reply to any of them in any order. If something feels off or you want a different approach, say so — these are starting points, not finished plans.
