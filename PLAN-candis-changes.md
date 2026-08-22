# Ebenezer Church Website Redesign - Candi's Changes

## Overview

Candi has requested a significant restructure of the website navigation and content. This plan organizes all requested changes, identifies what content we have vs. what's missing, and provides a summary to send back to Candi.

---

## Proposed Navigation Structure

| # | Current Nav | Proposed Nav |
|---|-------------|--------------|
| 1 | Watch | **Get Started** (new) |
| 2 | About | About |
| 3 | Connect | **Watch** |
| 4 | Calendar | **The Pardue Center** |
| 5 | The Center | **Ministries** (new section with 10 sub-pages) |
| 6 | [Give] | **Calendar** |
| 7 | [Plan a Visit] | [Give] (assumed, keep as button) |
| 8 | | [Plan a Visit] (assumed, keep as button) |

---

## Section-by-Section Breakdown

### 1. Get Started (NEW PAGE)
**Purpose:** New visitor landing page

| Item | Status | Notes |
|------|--------|-------|
| Service times | ✅ Have | 8:30 AM, 10:00 AM, 11:15 AM |
| Service photos | ✅ Have | `worship 1.jpg`, `Ebenezer Methodist Church 2025-78.jpg` |
| Directions/Map | ✅ Have | Already on current site |

**Ready to build:** Yes

---

### 2. About (MODIFY EXISTING)
**Changes requested:**

| Item | Status | Notes |
|------|--------|-------|
| Glenn welcome video | ⏳ In Progress | Candi says "Working on this" |
| Pardue Center photo/info moved to TOP | ✅ Ready | Reverse current order |
| Our Team section | ✅ Have | Already exists |
| Robbie title → "Facilities Manager" | ✅ DONE | Already updated |

**Ready to build:** Partially (waiting on Glenn video)

---

### 3. Watch
**No changes mentioned** - keep current sermon embed functionality.

---

### 4. The Pardue Center (EXPAND EXISTING)
**Changes requested:**

| Item | Status | Notes |
|------|--------|-------|
| What it is / how it came about | ⏳ In Progress | Candi says "Working on this" |
| Room capacity list | ✅ Have | From `PC room capacity list.docx` |
| Floor plan - Downstairs | ✅ Have | `PC downstairs map.png` |
| Floor plan - Upstairs | ✅ Have | `PC upstairs map.png` |
| Photos of rooms | ✅ Have | `board room 1.jpg`, `board room 2.jpg` |

**Room Capacities:**
- Meeting Rooms 1, 2, 5, 6: 15-20
- Meeting Room 3: 20-25
- Meeting Room 4: 30-35
- Pardue Room: 16-20
- Main Ballroom: 300 (banquet), 320 chairs
- Pavilion: 300 chairs

**Ready to build:** Partially (waiting on "what it is / how it came about" text)

---

### 5. Ministries (NEW SECTION - 10 sub-pages)

| Ministry | Verbiage | Photo | Ready? |
|----------|----------|-------|--------|
| **Children's Ministry** | ✅ | ✅ `Nursery banner.jpg` | YES |
| **Youth (RISE)** | ✅ | ✅ `youth 2.jpeg` | YES |
| **Men** | ✅ | ✅ `men's retreat 2.jpg` | YES |
| **Women** | ✅ | ✅ `IMG_4286.jpg` | YES |
| **Outreach/Missions** | ✅ | ✅ existing on site | YES |
| **Grief** | ✅ | ❌ NEED PHOTO (or decision to skip) | NO |
| **Widows** | ✅ | ❌ NEED PHOTO (or decision to skip) | NO |
| **Prayer** | ✅ | ❌ NEED PHOTO (or decision to skip) | NO |
| **Education** | ✅ | ⏳ Glenn working on it | NO |
| **Music** | ✅ | ✅ `genesis praise 2.jpg` | YES |

**Ready to build:** 6 of 10 ministries

---

### 6. Calendar
**No changes mentioned** - keep current littlewhite.church embed.

---

## Time-Sensitive: Valentine Hero Takeover

| Item | Status | Notes |
|------|--------|-------|
| Flier image | ✅ Have | `valentine-breakfast.png` |
| Event date | Feb 14 | 9-11 AM, preschoolers to 5th graders |
| Implementation | ✅ DONE | Deployed Jan 29, 2026 |

**Implementation details:**
- Flyer displays over church-hero.jpg with standard navy overlay
- No click-through (flyer has all info)
- Use `?regular` URL parameter to see normal hero

---

## Missing Content Summary (Send to Candi)

### WAITING ON CANDI:

1. **Glenn welcome video** for About section
2. **Pardue Center description** ("what it is and how it came about")

### DECISIONS NEEDED FROM CANDI:

3. **Grief, Widows, Prayer photos** - Candi noted she's "not sure how to illustrate" these. Options:
   - Use generic/stock imagery
   - Use symbolic images (candle, hands praying, etc.)
   - Skip photos for these ministries
   - Use the same photo across similar ministries

4. **Education photo** - Glenn is working on this

---

## Implementation Phases

### Phase 1: Quick Wins (Can do now)
- [x] Robbie title change (DONE)
- [x] Valentine hero takeover (DONE - deployed Jan 29)

### Phase 2: New Pages with Complete Content
- [ ] Get Started page
- [ ] Children's Ministry page
- [ ] Youth Ministry page
- [ ] Men's Ministry page
- [ ] Women's Ministry page
- [ ] Music Ministry page
- [ ] Outreach/Missions page (expand existing)

### Phase 3: Pages Waiting on Content
- [ ] About section reorder + Glenn video
- [ ] Pardue Center expansion (room capacities, maps, description)
- [ ] Education Ministry page (need photo)
- [ ] Grief Ministry page (need photo decision)
- [ ] Widows Ministry page (need photo decision)
- [ ] Prayer Ministry page (need photo decision)

### Phase 4: Navigation Restructure
- [ ] Update nav across all pages
- [ ] Create Ministries landing page with cards linking to sub-pages
- [ ] Test all internal links

---

## Message for Candi

**Copy/paste this to send to Candi:**

---

Hi Candi,

I'm organizing everything for the website updates. Here's what I still need:

**Content you mentioned is "in progress":**
1. Glenn's welcome video for the About section
2. The Pardue Center description ("what it is and how it came about")
3. Education ministry photo

**Decisions needed:**
4. For Grief, Widows, and Prayer ministries - you mentioned you weren't sure how to illustrate these. Options:
   - I can find appropriate symbolic images
   - We can use the same tasteful image across similar ministries
   - We can display these without photos

   What's your preference?

Everything else is ready to go! (Valentine flyer is now live on the homepage.)

---

## Files to Create/Modify

### New Pages:
- `site/get-started.html`
- `site/ministries.html` (landing page)
- `site/ministries/childrens.html`
- `site/ministries/youth.html`
- `site/ministries/men.html`
- `site/ministries/women.html`
- `site/ministries/outreach.html`
- `site/ministries/grief.html`
- `site/ministries/widows.html`
- `site/ministries/prayer.html`
- `site/ministries/education.html`
- `site/ministries/music.html`
- `site/pardue-center.html` (expand from current section)

### Modified Files:
- `site/index.html` - nav restructure, hero takeover
- `site/css/style.css` - new ministry page styles
- All existing pages - nav updates

### Images to Copy to site/images:
- `worship 1.jpg`
- `Ebenezer Methodist Church 2025-78.jpg`
- `genesis praise 2.jpg`
- `littewhilechurch-historic-sanctuary.JPG`
- `board room 1.jpg`
- `board room 2.jpg`
- `IMG_4286.jpg`
- `men's retreat 2.jpg`
- `Nursery banner.jpg`
- `jesus with children.jpg`
- `PC downstairs map.png`
- `PC upstairs map.png`
- `Valentine Breakfast flier FINAL.png`
- `youth 2.jpeg` (from Downloads)

---

## Verification

After implementation:
1. Test all navigation links on desktop and mobile
2. Verify all images load correctly
3. Check responsive layout on ministry pages
4. Test Valentine hero takeover with `?regular` toggle
5. Verify Robbie's title shows "Facilities Manager" everywhere
