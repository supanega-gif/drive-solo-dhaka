---
name: Drive Solo Dhaka
description: Private 1-on-1 driving lessons in your own car, on Gulshan and Banani streets, 6:00 to 8:00 AM.
colors:
  haze: "#C9D6E3"
  dawn: "#F0C7A8"
  paper: "#FFFFFF"
  mist: "#EEF2F6"
  ink: "#1E2A3A"
  ink-hover: "#2C3D52"
  ink-soft: "#4A5869"
  route: "#E2643B"
  map-water: "#9FB6CC"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "4.1rem"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 118"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "2.6rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 118"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: "'tnum'"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    fontFeature: "'tnum'"
rounded:
  md: "6px"
  lg: "8px"
  xl: "12px"
  full: "9999px"
spacing:
  gutter: "16px"
  gutter-sm: "24px"
  block: "48px"
  section: "80px"
  section-lg: "112px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.ink-hover}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    height: "48px"
  map-frame:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.xl}"
    padding: "12px"
  select-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "48px"
  credential-card:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "16px"
  camera-card:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "16px"
---

# Design System: Drive Solo Dhaka

## Overview

**Creative North Star: "Six A.M. Gulshan"**

The system is the two hours before Dhaka wakes. Flat fields of pre-dawn haze blue and a peach horizon band frame white paper sections; navy ink carries all type and the one action that matters. Nothing is lit, glossy or layered: the morning is rendered as flat colour, ruled lines and a line-drawn street map.

The signature is the schematic map of Gulshan and Banani, drawn at one stroke weight, with the lesson route traced over it in orange. Orange is the lesson itself: where the route goes and when the lesson happens. Display type is Archivo widened like street-map lettering; every time and price sits on tabular figures so 6:00, 8:00 and ৳15,000 read as instrument values, not marketing.

Density is calm and editorial: generous section rhythm, ruled tables and definition lists instead of card grids, one primary button per view. The rejected references are the dark concierge template and the stock driving-school hero.

**Key Characteristics:**
- Flat dawn fields: haze blue at the top and close, peach horizon band at their bottom edge, white and mist between.
- Navy ink for type, rules and the primary action; no second accent.
- Route orange reserved for the lesson: drawn routes, the 6:00 to 8:00 window, the recording dot.
- Archivo widened (118% width, -0.02em) for display; tabular figures everywhere.
- One stroke weight (5 units) for the street map; streets in faded ink, routes in orange.
- Hairline ink rules (15% ink) divide content; 2px solid ink rules open a table or list.

## Colors

A cool pre-dawn palette: two flat sky fields, white paper, deep navy ink, and one warm route colour.

### Primary
- **Ink Navy** (ink): all text, rules, the primary button fill, the footer field, the camera card. The one voice of the page.
- **Lit Ink** (ink-hover): primary button hover only, a step lighter than ink.

### Secondary
- **Route Orange** (route): the lesson. Drawn routes on the map, the lesson window on the time rule, the REC dot on the camera card. Never text, never a button, never a background field.

### Neutral
- **Pre-dawn Haze** (haze): the hero field, the sticky header, the closing section and the phone booking bar.
- **Peach Horizon** (dawn): the 40px horizon band at the bottom edge of the hero and close; at 40% opacity it marks the recommended package row; text selection.
- **Paper** (paper): default section ground, map frames, the dialog, button text on ink.
- **Morning Mist** (mist): alternating section ground (Route, Mentor, FAQ) so paper sections separate without rules or shadows. Added in the build beyond the original direction.
- **Soft Ink** (ink-soft): secondary copy, captions, the driving-school column of the comparison.
- **Lake** (map-water): water on the schematic map only.

### Named Rules
**The Route Is The Lesson Rule.** Orange appears only where it marks the lesson: a drawn route, the 6:00 to 8:00 window, the recording dot. If it is not the lesson, it is not orange.

**The Flat Field Rule.** Grounds are flat fills of haze, dawn, paper, mist or ink. No gradients, no textures, no tinted glass beyond the 95% haze of sticky bars.

## Typography

**Display Font:** Archivo, widened (with system-ui, sans-serif)
**Body Font:** Archivo (with system-ui, sans-serif)

**Character:** One grotesque family in two voices: widened and extra-bold for headings and prices, like street-map lettering; normal width for reading. Tabular figures are set on the body so every time and price aligns.

### Hierarchy
- **Display** (800, 2.5rem phone / 3.75rem tablet / 4.1rem desktop, 1.02, widened): the hero headline only.
- **Headline** (800, 1.875rem to 2.6rem; close uses 2.25rem to 3rem, 1.25, widened): section titles, max 48rem wide.
- **Title** (700, 1.25rem): package names, phase titles, dialog title. Normal width.
- **Body** (400, 1.125rem, 1.625): intros and hero copy at max 36 to 42rem; FAQ answers at 58ch.
- **Label** (600, 0.875rem): session ranges, field labels, time-rule times (700), captions (0.75rem, ink-soft).
- **Price** (800, 1.875rem, widened): package prices, the only figures set in display voice.

### Named Rules
**The Wide Voice Rule.** Widened Archivo is for headlines, the brand name, prices and the credential card titles. Body, labels and buttons stay at normal width.

**The Instrument Figures Rule.** Times and prices always use tabular figures; the body sets `tabular-nums` globally, so never override it.

## Layout

A single column centred at 72rem (max-w-6xl) with a 16px gutter on phone and 24px from 640px. Sections stack vertically with 80px padding, 112px from 1024px. Titles lead, an optional intro follows at 16px, and content opens 48px below.

The hero is a two-column grid at desktop (1.15fr text, 1fr map), stacking text over map on phone. The Route section is a three-up grid of map frames from 768px. Safety is two columns from 1024px. Pricing rows become a four-column grid at 1024px (name, price, features, 13rem action). Comparisons are a table at 768px and up and stacked definition lists below.

Section grounds alternate paper and mist; the hero and close sit on haze with the dawn band at their foot. On phone a haze booking bar slides up from the bottom once the hero buttons scroll away, and the page reserves 80px for it.

## Elevation & Depth

The system is flat. Depth comes from field colour (haze, mist, paper, ink) and ruled lines, not shadows. The only shadow is the phone booking bar's upward lift, which separates a fixed bar from scrolling content. The sticky header and bar use 95% haze with backdrop blur.

### Shadow Vocabulary
- **Bar lift** (`box-shadow: 0 -4px 16px rgba(30,42,58,.15)`): the fixed phone booking bar only.

### Named Rules
**The Flat-By-Default Rule.** Cards, map frames, buttons and the dialog carry no shadow. A shadow is allowed only on an element fixed over scrolling content.

## Shapes

Gently rounded and plain. Buttons, fields and icon targets use 6px; credential cards 8px; map frames, photo slots and the dialog 12px; the time-rule bar is a full pill. Borders are ink: 2px solid for the quiet button, the licence card and the top of lists and tables; 1px at 15% ink for row dividers; 2px dashed at 30% ink marks a pending photo slot. Map strokes are 5 units with round caps and joins; landmark nodes are white circles ringed in ink.

## Components

### Buttons
Confident and plain: a filled ink block or an ink outline, never a third style.
- **Shape:** gently rounded (6px), min height 48px.
- **Primary:** ink fill, paper text, semibold, 12px 24px, optional 20px leading icon. Used for the WhatsApp booking action and the recommended package.
- **Hover / Focus:** hover lifts to lit ink; active nudges down 1px; focus is the global 3px ink outline at 3px offset.
- **Quiet:** transparent with a 2px ink border; hover tints 5% ink. Secondary actions and non-recommended packages.

### Map Frame (signature)
The schematic street map on a paper panel (12px radius, 12px padding; 60% paper on the haze hero). Faded-ink streets, orange route, white ink-ringed nodes, an ink square for "Your gate", 11 to 13px Archivo labels. In the hero the route draws itself once on load (2.4s, cubic-bezier(.16,1,.3,1), 0.4s delay); in the roadmap the same map repeats three times as the route grows per phase, static.

### Time Rule (signature)
A 12px pill of 70% paper on haze spanning 5:30 to 9:30, with the 6:00 to 8:00 lesson window filled in orange, 2px ink ticks, and bold tabular times with soft-ink notes beneath.

### Credential Cards
Two ID-card shaped panels (1.586 ratio from 640px, 8px radius, 16px padding): the licence card outlined in 2px ink on paper, the camera card filled ink with paper text and an orange REC dot.

### Ruled Lists and Tables
Comparison, safety points, pricing and FAQ all use the same ruling: a 2px ink or 1px 15% ink top rule, 1px 15% ink dividers, 20px row padding, bold term over soft-ink description. Preferred over cards.

### Pricing Row
A ruled row; the recommended package bleeds to the gutter edge on a 40% dawn tint and takes the primary button.

### Inputs / Fields
- **Style:** native select on paper, 2px border at 25% ink, 6px radius, 48px tall, 14px medium label with "(optional)" in soft ink.
- **Focus:** global 3px ink outline.

### Navigation
Sticky 64px haze bar: widened extra-bold brand left, medium links centre from 1024px with an 8px-offset underline on hover and a 3px ink underline for the current section, WhatsApp text button right. Below 1024px a 44px menu toggle opens a stacked list under a 15% ink rule.

### Dialog
Native modal on paper, 12px radius, max 28rem, 24px padding, 60% ink backdrop.

## Do's and Don'ts

### Do:
- **Do** keep orange to the lesson: routes, the 6:00 to 8:00 window, the recording dot.
- **Do** alternate paper and mist section grounds, and bracket the page with haze fields closed by the 40px dawn band.
- **Do** set headings, brand and prices in widened Archivo (118%, -0.02em, 800) and leave everything else at normal width.
- **Do** reuse the schematic map at one stroke weight (5 units) when a section is about where the lessons happen.
- **Do** separate content with ink rules and definition lists before reaching for cards.
- **Do** keep tap targets at 44px minimum and buttons at 48px.
- **Do** mark missing photography with a dashed slot that says what is coming.

### Don't:
- **Don't** use orange for text, buttons or background fields.
- **Don't** add gradients, glows or shadows to cards, frames or buttons.
- **Don't** introduce a second accent colour or a second typeface.
- **Don't** fill photo slots with stock or AI-generated people.
- **Don't** animate anything beyond the single route draw; reduced motion shows it drawn.
