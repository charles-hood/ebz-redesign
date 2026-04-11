# Ebenezer Website — Image Guidelines for Content Owners

**For:** Candi (and anyone providing images for the website)
**From:** Charles
**Last updated:** April 11, 2026

---

## TL;DR — the most common case

You're 90% of the time creating a flyer for a **Coming Up featured event** on the homepage. For that:

> **Use Canva's "Instagram Portrait" preset — 1080 × 1350 pixels.**
> Center your important content. Don't put text in the corners.

That's it. Same image works for Instagram, no extra design step.

---

## Quick reference table

| Image type | Where it shows | Aspect ratio | Minimum size | Notes |
|---|---|---|---|---|
| **Featured event flyer** | Homepage "Coming Up" cards | **4:5 portrait** | 1080 × 1350 | Use Canva "Instagram Portrait" preset |
| **Ministry card photo** | Ministries page grid | **landscape, ~16:9 or 3:2** | 1200 × 800 | Faces in top half — bottom gets cropped |
| **Staff headshot** | Homepage staff section + bio modal | **portrait, ~2:3** | 800 × 1200 | Head centered, neutral background preferred |
| **Hero takeover (seasonal)** | Homepage full hero | landscape, varies | varies | Ask first — handled case-by-case |

---

## 1. Featured event flyers (the Coming Up section)

This is the section near the top of the homepage that highlights upcoming events. As of April 2026 it shows two cards side-by-side on desktop (stacking on mobile), with room to add a third later.

### Recommended size

**1080 × 1350 pixels, 4:5 portrait.**

Why this exact size: it's Canva's "Instagram Portrait" preset, which means you can create one design that works for both the website AND Instagram. No extra design step. Use the same flyer for both.

If your tool doesn't have that preset, anything at a 4:5 aspect ratio works:
- 1080 × 1350 (good)
- 1200 × 1500 (better — slightly more headroom for retina screens)
- 1600 × 2000 (even better — way more headroom, doesn't matter much in practice)

### Design rules for the safest result

1. **Center the important content.** Title, date, key call-to-action — keep them in the middle 80% of the canvas. The cards display the whole image, but if the layout ever changes or the source needs to be re-cropped, edge content is the most likely to be lost.
2. **Don't put critical text within ~50 pixels of any edge.** Safety margin for any future layout changes.
3. **Tell me the background color** if it's not white. We can match it for any padding adjustments (we did this with the RISE Youth flyer's black background).
4. **Don't put text in the corners.** The cards have rounded corners (12px radius), which clips the very corners of the image.

### Common pitfalls to avoid

- **Don't make square images** (Instagram Square 1080 × 1080). The cards will crop the sides, eating any edge text.
- **Don't make landscape images** (16:9, like a Facebook cover). Way too wide for our portrait cards — would crop dramatically top and bottom.
- **Don't make Instagram Story sized images** (1080 × 1920). Too tall — would crop the top and bottom heavily.
- **Don't worry about file size at the source.** Anything under 5MB is fine. I optimize and re-encode all images when adding them to the site.

### How to send the file to me

Drop the image in the project working folder with a descriptive filename like `event-name.png` or `event-name.jpg`. Format doesn't matter — JPG, PNG, even WebP. I'll convert and optimize.

---

## 2. Ministry card photos (the Ministries page)

The Ministries page displays each ministry as a card with a photo at the top (~220 pixels tall) and text below.

### Recommended size

**Landscape orientation, around 16:9 or 3:2 ratio. Minimum 1200 × 800 pixels.** Larger is fine.

The cards crop the image to a fixed height of 220px, anchored to the top. Wider images become wider crops; taller images get their bottoms trimmed.

### Critical design rule

**Keep faces and important content in the TOP HALF of the image.** The bottom of the image gets cropped off in the card display. This is intentional — it means heads don't get cut off — but it means anything important at the bottom of the photo will disappear.

### Acceptable subjects for ministry photos

- Ministry activities in action (group gathering, kids in classrooms, etc.)
- Ministry-specific objects (instruments for music, books for education, craft projects for women's groups)
- Symbolic imagery (a group of hands, an open Bible, etc.)

### What to avoid

- **Photos with members' faces** unless you have explicit permission and it makes sense for that ministry. Sensitive ministries (grief, widows, recovery) should never use member photos.
- **Generic stock photos** that look obviously stock. Real photos of real Ebenezer activities always beat the best stock photo.
- **Photos with critical content in the bottom half** — see the cropping rule above.

---

## 3. Staff headshots

Used in the Staff section on the homepage and in the bio modal that opens when you click a staff card.

### Recommended size

**Portrait orientation, around 2:3 aspect ratio. Minimum 800 × 1200 pixels.**

### Tips

- Head and shoulders, head roughly centered horizontally
- Neutral or simple background (the church sanctuary, a wood wall, plain wall — not a busy or distracting background)
- Good lighting (natural light is usually best)
- Subject looking at camera or slightly off-axis
- Crop loosely — leave some room around the head; we can crop tighter on our side if needed

If you only have a casual phone photo, that's fine — send it and we'll work with it.

---

## 4. Hero takeover graphics (seasonal events)

For special events like Christmas Eve, Easter, Valentine's, etc., we sometimes replace the entire homepage hero with a custom graphic. These are handled case-by-case because the hero has a specific layout that varies by season.

**Don't design a hero takeover without asking first.** Send me the event details first and we'll talk about the right size and format. Past examples:

- **Christmas Eve 2025:** Used the church's existing Christmas Eve graphic (1170 × 780 landscape)
- **Easter 2026:** Custom 2-column layout with a portrait graphic on one side
- **New Year 2026:** A 1536 × 1024 landscape graphic over a snow video background

The right size depends on whether the hero is using a static image, a video background, or a side-by-side layout. Just ask.

---

## What happens after you give me an image

1. I drop it in the project's working folder with whatever filename you give it
2. I check the dimensions and aspect ratio
3. I optimize it: resize if needed (for the cap appropriate to its use), re-encode at JPEG quality 88, strip metadata
4. I rename it to match the site's lowercase-hyphen convention (`spring-fling-market.jpg`, not `Spring Fling Market.png`)
5. I move it to the right folder under `site/images/`
6. I update the relevant HTML to use it
7. I delete the working-folder source file (it's now in the site)
8. Git commit and push

You don't need to worry about any of that — just drop the source file in the working folder and tell me which event/ministry/etc. it's for.

---

## When in doubt — just ask

If you're not sure what size to make something, or you have an unusual image type (a logo, a banner, a social media graphic, etc.), just ask before designing. A 30-second message saves us from the cropping/padding workarounds we sometimes have to do after the fact (like the black bars I added to the RISE Youth card to fix the text clipping).

Common questions to ask:
- "What size should this flyer be?" → 1080 × 1350 unless I say otherwise
- "Can you use this Facebook cover photo for X?" → Probably not the right shape; let's talk
- "I have a square photo but the spot needs portrait" → Send it anyway and we'll figure out cropping or padding
- "Should this go in Coming Up or somewhere else?" → Tell me what the event is and I'll suggest the right home
