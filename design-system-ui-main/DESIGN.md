---
name: 标准设计系统 设计系统
description: 企业级暗/亮双主题设计规范，基于 Ant Design 6 + React 19 的完整 token 体系与组件库
colors:
  primary: "#5264E0"
  primary-hover-dark: "#6B80F0"
  primary-hover-light: "#3F50C0"
  primary-active-dark: "#3F50C0"
  primary-active-light: "#2D40B0"
  success: "#43CB89"
  warning: "#FFA564"
  danger: "#FF6464"
  neutral: "#8a8f99"
  bg-base-dark: "#17191C"
  bg-base-light: "#f0f1f5"
  bg-card-dark: "#222427"
  bg-card-light: "#ffffff"
  bg-elevated-dark: "#2C2E31"
  bg-elevated-light: "#f5f6fa"
  bg-input-dark: "#1d1f23"
  bg-input-light: "#f5f6fa"
  text-primary-dark: "#f2f3f5"
  text-primary-light: "#3d414a"
  text-secondary-dark: "#8a8f99"
  text-secondary-light: "#787b84"
  text-inverse: "#ffffff"
  border-dark: "#323640"
  border-light: "#e4e5e9"
typography:
  body:
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif'
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5715
  heading:
    fontSize: "16px"
    fontWeight: 600
  caption:
    fontSize: "12px"
    fontWeight: 400
  data:
    fontSize: "28px"
    fontWeight: 600
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  2xl: "24px"
  3xl: "32px"
  4xl: "40px"
  5xl: "48px"
canvas:
  default: "1440x900"
  note: "图谱平台 / AI 平台 / 数据中台 MasterGo 设计稿画布统一 1440×900，不再使用 1920×1080"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-inverse}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "8px 16px"
  button-default:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary-dark}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "8px 16px"
  input:
    backgroundColor: "{colors.bg-input-dark}"
    textColor: "{colors.text-primary-dark}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "10px 12px"
  card:
    backgroundColor: "{colors.bg-card-dark}"
    rounded: "{rounded.lg}"
    padding: "16px"
  tag:
    rounded: "{rounded.sm}"
    padding: "4px 12px"
---

# Design System: 标准设计系统

## 1. Overview

**Creative North Star: "The Command Center"**

标准设计系统 is an enterprise data platform design system — precise, restrained, and functional. It serves data engineers and analysts working in low-light environments for extended sessions. Every color, shadow, and spacing decision is optimized for information density without fatigue.

The system operates on a strict **dark-first philosophy**: the default theme is dark (`#17191C` background), with a complete light-theme variant available via `data-theme="light"`. All tokens exist in mirrored dark/light pairs; no token is theme-specific.

**Architecture:** The documentation site uses a single-page scroll layout with IntersectionObserver-driven scroll-spy. A global observer tracks all section IDs (`#colors`, `#typography`, `#components-button`, etc.) and syncs the sidebar highlight + URL hash in real time. Scroll-driven CSS animations (`animation-timeline: view()`) reveal each section with a fade-up + blur-in as it enters the viewport. All seven sections render in a single continuous flow — no route switching, no page reloads.

**Key Characteristics:**
- 4px baseline grid for all spacing
- MasterGo 设计稿画布统一 1440×900（图谱平台 / AI 平台 / 数据中台三平台一致）
- Single primary accent (#5264E0 indigo) used at ≤15% surface coverage
- Semantic color roles (success/warning/danger) shared across components
- z-index shadow system (z0–z16) for elevation
- Ant Design 6 ThemeConfig adapter for seamless component library integration
- All values exposed as CSS custom properties (`--ds-*`, `--shadow-*`)
- Scroll-driven section reveal animations (fade-up + blur-in, 700ms ease)
- Hash-based deep linking to any section or component (`#comp-button`, `#comp-menu`)

**Anti-references:** This system explicitly rejects gradient text, glassmorphism, neon accents, hero metrics templates, identical card grids, and any decoration that competes with data legibility.

## 2. Colors

The palette is built around a single indigo primary (`#5264E0`) against deep charcoal backgrounds (dark) or cool gray surfaces (light). Semantic colors — success green, warning orange, danger red — maintain consistent hue across both themes with adjusted lightness for perceptual parity.

### Primary
- **Indigo** (#5264E0): Primary actions, links, focus rings, selected states. The only color that commands attention. Hover lightens to #6B80F0 (dark) or darkens to #3F50C0 (light) to maintain contrast against their respective backgrounds.

### Semantic
- **Success Green** (#43CB89): Completion states, positive metrics, confirmed actions.
- **Warning Amber** (#FFA564): Pending states, attention-needed indicators, cautionary actions.
- **Danger Red** (#FF6464): Destructive actions, error states, critical alerts.

### Neutral
- **Text Primary** (#f2f3f5 dark / #1d1f23 light): Body copy, headings, primary content.
- **Text Secondary** (#8a8f99 dark / #656a74 light): Descriptions, metadata, secondary labels.
- **Text Tertiary** (#6d717a dark / #b8bcc4 light): Placeholders, disabled text, captions.
- **Border** (#323640 dark / #e4e5e9 light): Component boundaries, dividers, table lines.
- **Background Base** (#17191C dark / #f0f1f5 light): Page-level background.

### Named Rules
**The One Accent Rule.** The primary indigo (#5264E0) must not appear on more than 15% of any screen's surface area. Its rarity is what gives it authority. If everything is blue, nothing is important.

**The Gray-on-Color Rule.** Never place gray text on a colored background. Use a darker shade of the background's own hue instead.

## 3. Typography

**Font Stack:** System-native sans-serif (`-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei"`). No web fonts are loaded — the system prioritizes instant rendering and zero layout shift over typographic distinctiveness.

**Character:** Technical, precise, neutral. The typography doesn't draw attention to itself. Hierarchy is conveyed through weight (400→500→600) and size (12px→14px→16px→28px), never through color or decoration.

### Hierarchy
- **Data** (600, 28px, 36px line-height): Large metric numbers in stat cards and dashboards.
- **Heading** (600, 16px, 24px line-height): Section titles, modal headers, card titles.
- **Body** (400, 14px, 22px line-height): All body copy. Line length capped at 75ch in content areas.
- **Caption** (400, 12px, 18px line-height): Metadata, timestamps, helper text, table footnotes.
- **Button** (500, 14px, 22px line-height): Interactive element labels. Medium weight for legibility.

## 4. Elevation

The system uses a z-index shadow vocabulary (z0–z16) rather than Material-style elevation numbers. Shadows are heavier in dark theme (higher opacity against dark backgrounds) and lighter in light theme — a deliberate asymmetry that maintains perceived depth parity.

**Philosophy:** Surfaces are flat at rest. Shadows appear as a response to state (hover, modal overlay, dropdown). The default page has no decorative shadows.

### Shadow Vocabulary
- **z0** (`none`): Flat surfaces at rest.
- **z1** (`0 1px 2px rgba(0,0,0,0.30)` dark / `0.06` light): Card default, subtle boundary.
- **z2** (`0 2px 12px rgba(0,0,0,0.35)` dark / `0.08` light): Card hover, tooltip, dropdown.
- **z4** (`0 4px 20px rgba(0,0,0,0.40)` dark / `0.10` light): Modal, drawer, elevated panel.
- **z8** (`0 8px 40px rgba(0,0,0,0.50)` dark / `0.12` light): Notification, popover.
- **z16** (`0 16px 56px rgba(0,0,0,0.55)` dark / `0.15` light): Maximum elevation, full-screen overlay.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as a response to state: hover, elevation, or focus. A card with a permanent box-shadow is an anti-pattern.

## 5. Components

### Buttons
- **Shape:** 6px border-radius (md), 4px (sm), 8px (lg).
- **Primary:** `background: #5264E0`, white text, 500 weight. Hover lightens to #6B80F0 (dark) or darkens to #3F50C0 (light).
- **Default:** Transparent background, border `var(--ds-border-muted)`, text `var(--ds-text-primary)`. Hover border shifts to primary.
- **Text:** No border, no background. Inherits text color, primary on hover.
- **Danger:** `background: #FF6464`, white text. Reserved for irreversible actions.
- **Height:** 36px (default), 28px (small), 40px (large).

### Cards
- **Shape:** 8px border-radius, 3px colored top-border for status variants.
- **Background:** `var(--ds-bg-card)` with 1px border.
- **Status variants:** 4 semantic colors via top border — neutral (draft), primary (in-progress), success (completed), warning (review).
- **Stats variant:** Large metric number (28px/600) + caption, optional square avatar icon.

### Inputs
- **Shape:** 6px border-radius, 36px height.
- **Background:** `var(--ds-bg-input)` with 1px border. Focus border shifts to primary with 2px glow.
- **States:** Default, hover (border lightens), focus (primary border + glow), error (red border + message), disabled (reduced opacity).
- **Variants:** Search (prefix icon + clear), Password (toggle visibility), TextArea (rows + character count).

### Tables
- **Header:** `var(--ds-bg-elevated)` background, medium-weight text.
- **Row hover:** Subtle background shift (`var(--ds-bg-hover)`).
- **Row selected:** Primary-subtle background with primary border-left indicator.
- **Column dividers:** 1px × 14px short vertical lines between header columns.

### Navigation (Sidebar)
- **Width:** 200px expanded, 56px collapsed.
- **Background:** `var(--ds-bg-sidebar)`, separated from content by 1px border.
- **Items:** 44px height (level 1), 36px (level 2). 4px border-radius. 24×24px icons.
- **Active:** Primary-subtle background, `var(--ds-text-inverse)` text, 700 weight.
- **Hover:** Subtle background shift. Transition 150ms ease.
- **Collapse:** Bottom-pinned toggle with chevron icon, 300ms width transition.
- **Scroll-spy:** IntersectionObserver tracks current section in viewport; sidebar auto-highlights and auto-expands "组件规范" submenu. Clicking any sidebar item triggers `scrollIntoView({ behavior: 'smooth' })` with a 700ms observer mute to prevent race conditions.
- **Icon theming:** SVG nav icons use `fill="#8A8F99"` (consistent across all items). On light theme, a CSS `filter: brightness(0)` rule applied via `.nav-icon-img` class inverts them to dark — necessary because SVGs loaded as `<img>` cannot inherit `currentColor`.

### Tags
- **Shape:** 4px border-radius, 4px vertical / 12px horizontal padding.
- **Colors:** Mapped to Ant Design's processing/success/warning/error/default color system.
- **Usage:** Status indicators in tables and cards. 12px font size.

### Modals
- **Shape:** 12px border-radius, 24px internal padding.
- **Header:** Title + optional icon (color-coded by type: primary/warning/success/danger).
- **Width:** 420px default, 640px large.
- **Footer:** Right-aligned action buttons (cancel + confirm).

## 6. Do's and Don'ts

### Do:
- **Do** use CSS custom properties (`var(--ds-*)`) for all colors. Never hardcode hex values.
- **Do** use the 4px baseline grid for all spacing. Every gap should be divisible by 4.
- **Do** maintain dark/light parity: every color token must have valid values in both themes.
- **Do** use semantic color roles (success/warning/danger) consistently across components.
- **Do** keep primary accent coverage under 15% of any screen.
- **Do** test all components in both themes before shipping.

### Don't:
- **Don't** use gradient text, glassmorphism, or neon accents — these compete with data legibility.
- **Don't** place gray text on colored backgrounds. Use a shade of the background's own hue.
- **Don't** use box-shadow on static cards. Shadows are for state changes only.
- **Don't** hardcode Ant Design token values in components — use the ThemeConfig adapter.
- **Don't** introduce new color values without adding them to both `index.css` and `antd-theme.ts`.
- **Don't** use identical card grids without visual hierarchy. Vary size, color, or content weight.
- **Don't** use `font-size` below 12px. Caption text at 12px is the floor.
