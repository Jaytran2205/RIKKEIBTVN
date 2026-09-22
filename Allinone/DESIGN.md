# Design System

<!-- impeccable:design-schema 1 -->

## Design Direction & Mode

- **Mode:** `Operate` (Driving exam portal & administrative productivity tools) kết hợp `Read` (Mẹo thi lý thuyết & tài liệu cẩm nang).
- **Core Aesthetic:** Accessible, High-Contrast Modern Government & EdTech System. Sạch sẽ, chuẩn mực, loại bỏ hiệu ứng AI lặp lại (zero generic glows, zero nested cards, no kickers).

## Color Palette

- **Primary Text:** `#0F172A` (Deep Slate - WCAG AAA 14:1 contrast ratio)
- **Secondary Text:** `#475569` (Muted Slate)
- **Brand / Authority:** `#0F3D6E` (Vietnam Administrative Trust Navy)
- **Interactive Action:** `#2563EB` (Royal Blue) / Hover: `#1D4ED8`
- **Danger (Paralyzed Questions):** `#DC2626` / Light Bg: `#FEF2F2` / Border: `#FECACA`
- **Success (Passed / Correct):** `#16A34A` / `#059669` / Light Bg: `#ECFDF5` / Border: `#A7F3D0`
- **Warning / Tip Accent:** `#D97706` / `#F59E0B` / Light Bg: `#FFFBEB` / Border: `#FDE68A`
- **Surface Canvas:** `#F8FAFC` (Soft off-white for zero eye fatigue)
- **Card Background:** `#FFFFFF` with clean 1px border `#E2E8F0`

## Elevation & Depth (Impeccable Standard)

- **Cards:** 1px border (`#E2E8F0`) + crisp single-layer elevation shadow:
  - Default: `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.06);`
  - Hover: `box-shadow: 0 8px 16px -4px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.04); transform: translateY(-2px);`
- **Refused Patterns (Anti-patterns removed):**
  - Không dùng bóng phát sáng có màu trên nền tối (zero dark colored halos).
  - Không lồng card trong card (flatten card hierarchy).
  - Không dùng viền 1px kết hợp với bóng mờ tỏa rộng 50px (zero gpt-thin-border-wide-shadow).

## Typography Hierarchy

- **Font Family:** System-first sans font stack `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- **Title (H1/H2):** Bold 700/800, line-height 1.25, letter-spacing -0.02em
- **Body:** 15px - 16px, line-height 1.6, color `#334155`
- **Code & Numbers:** `font-variant-numeric: tabular-nums;`

## Browser Surfaces & Polish

- **Custom Selection:** `::selection { background: #DBEAFE; color: #1E3A8A; }`
- **Keyboard Navigation:** `:focus-visible { outline: 2px solid #2563EB; outline-offset: 2px; }`
- **Active Click State:** `.btn:active { transform: scale(0.98); }`
