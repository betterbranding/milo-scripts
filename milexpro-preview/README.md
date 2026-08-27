# MILEXPRO™ Website Preview

Reskin of the V3 "Editorial Material" template (`/tasklet/agent/home/v3-source/`) into the locked MILEXPRO™ builder/trade brand kit, per `BUILD_BRIEF.md`.

## How to preview

Open `index.html` directly in a browser (double-click, or `file://` path), or serve the folder locally:

```
cd /tasklet/agent/home/milexpro-preview
python3 -m http.server 8000
```

Then visit `http://localhost:8000/index.html`. The site is a hash-routed single page app:

- `#home` — Home
- `#milex` — MILEX™ (product)
- `#science` — The Science
- `#compliance` — Compliance & Specs
- `#partner` — Partner With Us

## What changed vs. V3

**Palette / brand kit**
- Replaced the consumer green/navy/sky palette with the locked MILEXPRO™ trade kit: Orange `#FF8200`, Black `#111111`, White `#FFFFFF`, Grey `#BFBFBF`. No green or navy appears anywhere.
- Rebuilt the visual hierarchy toward ~60% dark/black surfaces, 30% orange, 10% white/grey (dark hero, dark marquee, dark stats, dark problem section, dark envelope section, and the CTA bands all use black; light sections are used for the bento proof grid, process steps, and compliance detail).
- Navbar is dark black at all scroll positions (not the light glass-blur nav from V3), with a white nav-link/orange-active link scheme and an orange "Submit Your Plans" CTA pill.
- Nav logo is a styled text wordmark (`MILEXPRO` in orange Barlow Condensed 800 + a white "TM" superscript) since no official MILEXPRO™ logo file exists yet. Per brand compliance, this is a placeholder, not a reconstruction of an official logo.

**Typography**
- Swapped League Spartan + Nunito Sans for Barlow Condensed (display) + Barlow (body), loaded via the Google Fonts link specified in the brief.

**Copy**
- Home hero, "cost of doing nothing" problem section, 3-step process, and CTAs were rewritten from scratch for a builder/trade audience (not copied from the current MilexPro.com site).
- Removed all "R-60 as standard" framing. Every R-value claim uses the approved verbatim framing: "Requirements vary by climate zone and jurisdiction; generally R-38 to R-49 in Texas, R-30 to R-49 in Oklahoma," paired with an ASTM C518 tested disclaimer caption.
- Product application rules are stated explicitly wherever the three products are introduced: MILEX™ Thermal MAX® (attics, new + retrofit), TimberBatt™ (wall cavity, new construction only), TimberBoard® (exterior sheathing, new construction only). MILEX™ Wall MAX® is never mentioned.
- MILEX™ Thermal MAX® wordmark is split-colored per the compliance rule: "MILEX™" in orange, "Thermal MAX®" in ink/white depending on background.
- Footer copyright line uses the legal entity name `MILO Insulation of Texas, LLC` and lists all trademarks.
- Service area is stated as "throughout Texas and Oklahoma" everywhere relevant. No specific location count, no prices, no waterproof/zero-settlement/guaranteed-savings claims, no competitor names, no "pink stuff," no "allergen-free"/"hypoallergenic," no em dashes, no emojis.

**Structure**
- Nav updated to 5 items: Home, MILEX™, The Science, Compliance & Specs, Partner With Us.
- Added a new page not present in V3: **Compliance & Specs** (R-value framing card, spec grid, approved product application matrix, testing badges, ASTM disclaimer).
- Renamed and rebuilt the old "Builders" page as **Partner With Us** (value-prop split, numbered builder-benefits grid, contact card, final CTA).
- `script.js` is the V3 file verbatim except the `PAGES` array, which was updated to `['home','milex','science','compliance','partner']`. All reveal/count-up/scrolly/hash-routing/mobile-menu logic is unchanged.
- Mobile menu overlay footer line updated to "Built for Builders. · MILEXPRO™".

**Assets**
- Reuses V3 image assets by absolute GitHub Pages URL (no new uploads needed for this preview): jobsite/construction imagery for the hero and partner page, product photo, Thermal Puff™ imagery, macro fiber, hands-fiber, and the badge row. Consumer-only assets (logo.png, mascot.png, milo-standing.png, milo-crossed.png, hero-field.jpg) were excluded per the brief.

## QA sweep results

- Zero em dashes (U+2014) or " — " sequences anywhere in the HTML/CSS/JS.
- No emojis.
- No banned terms found: "pink stuff," "allergen-free," "hypoallergenic," "waterproof," "water-resistant," "zero-settlement," "guaranteed savings."
- The only "R-60" occurrence is in the approved spec-grid range "R-11 to R-60," which is allowed context.
- Google Fonts link loads Barlow + Barlow Condensed only; zero references to League Spartan or Nunito Sans remain.
- `PAGES` array in `script.js` updated to the 5 MILEXPRO™ routes.
- Trademark counts confirmed present throughout: MILEXPRO™ (19), MILEX™ (39), Thermal MAX® (12), TimberBatt™ (6), TimberBoard® (6).
- No occurrences of the banned consumer colors (`#288D11`, `#074387`, `#052F5F`) or the mascot anywhere in the CSS or HTML.
- Verified visually in-browser across all 5 pages (desktop viewport): hero, marquee, stats, problem tiles, bento grid, envelope/system section, process steps, final CTA, and footer all render with the correct dark/orange/white hierarchy and correct copy per the brief.

## Judgment calls / follow-ups for Greg

See the parent agent's final summary message for the full list of judgment calls made during the build (headline wording, section pacing, wordmark styling, placeholder nav logo, image selections) and outstanding items (official MILEXPRO™ logo file, real jobsite photography, mobile-viewport screenshot pass).
