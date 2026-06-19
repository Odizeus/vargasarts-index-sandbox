# Image Optimization Audit

This audit identifies the highest-value image optimization work for the Odizeus art portfolio website.

## Summary

The site is image-heavy, which is expected for an artist portfolio. The biggest performance gains will come from optimizing the artwork gallery images while preserving visual quality.

Priority should be based on how many images each page loads and whether those images appear both as thumbnails and modal images.

## Highest Priority Pages

### 1. `digital_art.html`

Highest priority.

Why:

- Uses 21 visible gallery images.
- Uses the same 21 images again in the modal slideshow.
- Thumbnail images currently do not use `loading="lazy"`.
- This page likely has the largest total image payload.

Recommended actions:

- Add `loading="lazy"` to all visible gallery thumbnails.
- Keep modal images as normal images for now to avoid disrupting modal behavior.
- Compress each image carefully while preserving artwork detail.
- Consider creating separate smaller thumbnail versions later.

Important referenced images include:

- `assets/img/digital_art/SunflowerB.jpg`
- `assets/img/digital_art/Lightning.jpg`
- `assets/img/digital_art/BetaF.jpg`
- `assets/img/digital_art/Numero1.jpg` through `Numero7.jpg`
- `assets/img/digital_art/Sunset.jpg`
- `assets/img/digital_art/WinterIsHere.jpg`
- `assets/img/digital_art/Flowersunrise.jpg`
- `assets/img/digital_art/MountainsSunrise.jpg`
- `assets/img/digital_art/Fantasyc.jpg`
- `assets/img/digital_art/Engy.jpg`
- `assets/img/digital_art/IronMisael.jpg`
- `assets/img/digital_art/Boruto.jpg`
- `assets/img/digital_art/NightDreamer.jpg`
- `assets/img/digital_art/Fire_on_Water.jpg`
- `assets/img/digital_art/grogu.jpg`

### 2. `paintings.html`

High priority.

Why:

- Uses 13 visible painting thumbnails.
- Uses the same paintings again in the modal slideshow.
- Thumbnail image paths have already been standardized to lowercase `paintings`.
- `loading="lazy"` has already been added to active gallery thumbnails.

Recommended actions:

- Compress painting JPGs carefully.
- Preserve full-quality originals outside the deployed website.
- Later, consider smaller thumbnail files for gallery grid images.

Important referenced images include:

- `assets/img/paintings/ForbiddenNectar.jpg`
- `assets/img/paintings/Monarca.jpg`
- `assets/img/paintings/Alpha.jpg`
- `assets/img/paintings/GoldPanter.jpg`
- `assets/img/paintings/Beta.jpg`
- `assets/img/paintings/wildlifeZ.jpg`
- `assets/img/paintings/wildlifeB.jpg`
- `assets/img/paintings/BlackPhanter.jpg`
- `assets/img/paintings/Sunrise.jpg`
- `assets/img/paintings/Oasis.jpg`
- `assets/img/paintings/LostinTime.jpg`
- `assets/img/paintings/CloudStories.jpg`
- `assets/img/paintings/Mthood.jpg`

### 3. `sales.html`

Medium-high priority.

Why:

- Uses active sales card images.
- Uses modal images for sales artwork.
- Contains eBay-linked products where image quality matters for buyer trust.
- Some active sales thumbnails do not currently use `loading="lazy"`.

Recommended actions:

- Add `loading="lazy"` to active sales thumbnails.
- Do not over-compress sales images because they support purchasing decisions.
- Remove unused Stripe script later if eBay is the only payment method.

Important active sale images include:

- `assets/img/paintings/ForbiddenNectar.jpg`
- `assets/img/paintings/Sunrise.jpg`
- `assets/img/paintings/Bettaff.jpg`
- `assets/img/paintings/Blueflowers.jpg`

### 4. `drawings.html`

Lower priority.

Why:

- Uses only three active gallery thumbnails.
- `loading="lazy"` is already present on active thumbnails.
- Image alt text has already been improved.

Referenced active images:

- `assets/img/drawings/Tiger.jpg`
- `assets/img/drawings/Lionfish.jpg`
- `assets/img/drawings/Dewdrop.jpg`

Note:

- `Bubbledog.jpg` appears in the modal but its gallery thumbnail is commented out. This should be reviewed later.

### 5. `wall_murals.html`

Lower priority.

Why:

- Uses only one active mural image.
- `loading="lazy"` is already present on the active gallery image.

Referenced active image:

- `assets/img/murals/wall_butterfly.jpg`

### 6. `about.html`

Lower priority.

Why:

- Uses one portrait image.
- The image is visually important but not a gallery-heavy performance risk.

Referenced image:

- `assets/img/Ulises_Vargas.png`

## Recommended Compression Strategy

### Keep originals safe

Before replacing any artwork images, keep original full-quality files outside the deployed website.

Recommended folder outside production:

- `originals/`
- external backup drive
- cloud backup

### Suggested export settings

For artwork JPGs:

- Format: JPG
- Quality: 78-85
- Progressive JPG: yes
- Strip unnecessary metadata: yes
- Keep color natural; do not use aggressive compression

For PNG portraits/logos:

- Use PNG only if transparency is required.
- Otherwise convert to high-quality JPG or WebP.

### Best future structure

Long-term ideal structure:

```text
assets/img/paintings/originals/   # not deployed, or kept out of production
assets/img/paintings/thumbs/      # small gallery thumbnails
assets/img/paintings/full/        # modal display images
```

For GitHub Pages, a practical version is:

```text
assets/img/paintings/thumbs/
assets/img/paintings/full/
assets/img/digital_art/thumbs/
assets/img/digital_art/full/
```

Then HTML thumbnails should use `thumbs/`, and modal images should use `full/`.

## Recommended Next Work Order

1. Add `loading="lazy"` to `digital_art.html` gallery thumbnails.
2. Add `loading="lazy"` to active `sales.html` thumbnails.
3. Compress `digital_art` images first.
4. Compress `paintings` images second.
5. Review whether separate thumbnail files should be created.
6. Review `Bubbledog.jpg` modal/gallery mismatch.

## Caution

Do not blindly compress all artwork with aggressive settings. This is an artist portfolio, so image quality is part of the product. Use moderate compression and visually inspect results before replacing production files.
