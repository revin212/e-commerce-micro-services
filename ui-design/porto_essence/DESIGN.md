# Design System Specification: The Curated Commerce Framework

## 1. Overview & Creative North Star
### The Creative North Star: "The Digital Atelier"
This design system moves beyond the transactional nature of standard e-commerce to create an environment that feels curated, architectural, and high-end. The goal is to evoke the feeling of walking into a premium flagship boutique: quiet, spacious, and meticulously organized.

To achieve this "Digital Atelier" aesthetic, we move away from the "boxy" nature of the web. We embrace **Organic Minimalism**—where structure is defined by light and tone rather than lines and borders. By utilizing intentional asymmetry in product layouts and a high-contrast typography scale, we transform a simple shopping interface into a premium editorial experience.

---

## 2. Color Philosophy: Tonal Depth over Borders
Our palette is rooted in the interplay between soft, expansive neutrals and a high-energy "Electric Indigo."

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Layout boundaries must be established exclusively through background color shifts. Use `surface-container-low` for large section backgrounds against a `surface` base to create a structural "block" without a single line.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine vellum. 
- **Base Layer:** `surface` (#f8f9fa)
- **Secondary Sectioning:** `surface-container-low` (#f3f4f5)
- **Interactive Elevated Elements:** `surface-container-lowest` (#ffffff) for product cards and high-priority modals.
- **Deep Nesting:** Use `surface-container-high` (#e7e8e9) for recessed elements like search bars or inactive filter sidebars.

### The "Glass & Gradient" Rule
To elevate the "Electric Indigo" accent, avoid flat applications on large surfaces.
- **Signature Textures:** Apply a subtle linear gradient (Top-Left to Bottom-Right) from `primary` (#3525cd) to `primary_container` (#4f46e5) for primary CTAs. This creates a "glow" effect that feels alive.
- **Glassmorphism:** For floating headers or navigation overlays, use `surface` at 80% opacity with a `24px` backdrop-blur. This integrates the UI into the content rather than layering it "on top."

---

## 3. Typography: Editorial Authority
We utilize **Inter** not just for readability, but as a structural element. The scale is dramatic, emphasizing the "Premium" nature of the brand.

- **The Display Scale (`display-lg` to `display-sm`):** Used for hero sections and high-end product launches. Tight letter-spacing (-0.02em) is required to give the font a "custom" look.
- **The Headline & Title Scale:** These are the anchors of the page. Use `headline-lg` (2rem) for section headers to command attention.
- **Body & Labels:** `body-md` (0.875rem) is our workhorse. For a premium feel, ensure line-height is generous (1.6x) to provide breathing room.
- **Tonal Contrast:** Always use `on_surface_variant` (#464555) for secondary metadata (e.g., SKU numbers or breadcrumbs) to maintain a clear hierarchy against the `on_surface` (#191c1d) primary text.

---

## 4. Elevation & Depth: The Layering Principle
We reject the standard "drop shadow." We define depth through light physics.

### Tonal Layering
Depth is achieved by "stacking." A `surface-container-lowest` card placed on a `surface-container-low` background creates a natural lift. This is our preferred method of elevation.

### Ambient Shadows
When a component must float (e.g., a cart drawer or a dropdown menu), use **Ambient Shadows**:
- **Color:** A 6% opacity tint of `on_surface` (#191c1d).
- **Blur:** Large, soft diffusion (e.g., `box-shadow: 0 20px 40px rgba(25, 28, 29, 0.06)`).

### The "Ghost Border" Fallback
If contrast is mathematically required for accessibility (WCAG), use a **Ghost Border**:
- **Token:** `outline-variant` (#c7c4d8) at **15% opacity**. It should be felt, not seen.

---

## 5. Components: Refined Primitives

### Buttons: The Signature CTA
- **Primary:** Gradient fill (`primary` to `primary_container`), `DEFAULT` (8px) radius. No border. Text is `on_primary` (#ffffff).
- **Secondary:** `surface-container-highest` background with `on_surface` text.
- **Tertiary:** No background. `primary` text with an underline that appears only on hover.

### Cards & Product Grids
- **Construction:** Forbid the use of divider lines.
- **Separation:** Use `1.5rem` (xl) spacing between cards. The product image should be housed in a `surface-container-highest` container to provide a soft frame for the photography.

### Input Fields
- **Style:** "Soft Recess." Use `surface-container-low` as the background.
- **Active State:** A 2px "Ghost Border" of `primary` at 40% opacity. Avoid heavy outlines.
- **Error:** Utilize `error` (#ba1a1a) for text and `error_container` for a subtle background tint behind the input.

### Signature Component: The "Atelier Carousel"
Instead of a standard horizontal scroll, use staggered heights and varying widths (Asymmetry) to showcase featured products. This breaks the grid and forces the user to engage more deeply with the visual content.

---

## 6. Do's and Don'ts

### Do:
- **Do** use whitespace as a functional tool. If in doubt, double the padding.
- **Do** use `surface_bright` to highlight active tabs or navigation items.
- **Do** treat every product image as high-fashion photography; use the `surface_variant` (#e1e3e4) as a placeholder color for loading states to maintain the cool-toned aesthetic.

### Don't:
- **Don't** use 100% black (#000000). Use our `on_surface` (#191c1d) to keep the look sophisticated and soft.
- **Don't** use standard 1px borders between list items. Use vertical spacing or a 1-step shift in the `surface-container` scale.
- **Don't** use "Electric Indigo" for everything. Reserve it for the final action (Checkout, Add to Cart) to maintain its psychological impact.

---

## 7. Spacing Scale
Our rhythm is strictly 8px-based, ensuring mathematical harmony.
- **Extra Small (sm):** 4px (Internal component padding)
- **Base (DEFAULT):** 8px (Label to Input spacing)
- **Medium (md):** 12px (Inside cards)
- **Large (lg):** 16px (Standard gutter)
- **Extra Large (xl):** 24px (Section nesting)
- **Massive (2xl):** 48px+ (Section breathing room)