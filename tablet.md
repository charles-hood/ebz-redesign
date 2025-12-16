# Tablet Video - NOT IMPLEMENTED

## Summary
On December 8, 2025, we attempted to add a third "medium" landscape video optimized for tablets and small desktops. The implementation was completed but reverted because it didn't look good.

## What Was Attempted

### 3-Tier Video System
| Breakpoint | Video | Dimensions |
|------------|-------|------------|
| 1024px+ | `hero-slideshow.mp4` | 1920x1080 |
| 768px-1023px | `hero-slideshow-tablet.mp4` | 1280x720 |
| <768px | `hero-slideshow-mobile.mp4` | 720x1280 |

### Tablet Video Focal Points
More centered than the portrait mobile video since 16:9 landscape crops are less aggressive:

| Image | Focal X | Notes |
|-------|---------|-------|
| Pardue Center | 0.55 | Slightly right of center |
| Worship Band | 0.35 | Pulled toward center |
| Pastor Glenn | 0.45 | Near center |
| Guitar Session | 0.60 | Balance guitarist and listener |
| Pavilion Event | 0.45 | Center on gathering |
| Youth Group | 0.55 | Kids slightly right |

### Files Created
- `create_tablet_slideshow.py` - Script to generate tablet video (still exists in `/Users/charles/Downloads/church-photos-to-video/`)
- `tablet_crops/` - Cropped images for review (still exists)
- `hero-slideshow-tablet.mp4` - Generated video (deleted from site)

### CSS Changes (Reverted)
```css
/* Desktop video by default, tablet and mobile hidden */
.hero-video-tablet,
.hero-video-mobile {
    display: none;
}

/* Tablet/small desktop: 768px - 1023px */
@media (min-width: 768px) and (max-width: 1023px) {
    .hero-video-desktop {
        display: none;
    }
    .hero-video-tablet {
        display: block;
    }
}
```

## Current Implementation
Back to 2-tier system:
- Desktop (768px+): `hero-slideshow.mp4` (1920x1080)
- Mobile (<768px): `hero-slideshow-mobile.mp4` (720x1280 portrait)

## If Revisiting Later
1. The generation script is at `/Users/charles/Downloads/church-photos-to-video/create_tablet_slideshow.py`
2. Adjust focal points in the IMAGES array
3. Run with venv: `source venv/bin/activate && python3 create_tablet_slideshow.py`
4. Review cropped images in `tablet_crops/` before generating video
5. Copy to site and update CSS/HTML as shown above
