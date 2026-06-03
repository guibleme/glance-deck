# Glance Deck Design Notes

## Design Strategy

Glance Deck uses a restrained product UI strategy: tinted surfaces, one palette accent, clear text roles, and minimal decorative effects. The theme should sit behind the user's task instead of becoming the task.

## Color Roles

Each palette defines these CSS variables:

- `--glance-bg`: base app background.
- `--glance-surface-1`: top bars, QAM shells, menu shells.
- `--glance-surface-2`: panels, rows, dialogs, cards.
- `--glance-surface-3`: stronger selected or secondary control surfaces.
- `--glance-border`: separators and structural borders.
- `--glance-text`: primary text.
- `--glance-muted`: secondary text and lightweight labels.
- `--glance-primary`: accent, focus, selected controls, primary buttons.
- `--glance-primary-contrast`: text/icons on primary accent backgrounds.
- `--glance-positive`: success/progress states.
- `--glance-negative`: danger/error states.

## Accessibility Targets

- Primary text clears 7:1 contrast on `bg`, `surface-1`, and `surface-2`.
- Primary text clears at least 4.5:1 on `surface-3`.
- Muted text clears 4.5:1 on all surfaces.
- Accent, success, and danger text clear 4.5:1 where used as text.
- Text/icons on focused primary controls clear 7:1.

Run:

```bash
node scripts/audit-contrast.mjs
```

## Steam Deck Specifics

The Deck is viewed at handheld distance and often under uneven ambient light. Thin SteamOS labels, slider values, status labels, and QAM text need more contrast than desktop UI would usually require.

Avoid relying on opacity for hierarchy. Use the `muted` token instead, with `opacity: 1` on lightweight text.

## Shape

Default corner radius is `6px`.

CSS Loader exposes a `Corner Radius` slider:

- `0px`: square and utilitarian.
- `4px`: compact native feel.
- `6px`: default, lightly softened.
- `8px`: friendlier but still controlled.
- `12px`: soft.
- `16px`: very soft.

All theme-owned rounded surfaces should use `--glance-radius`.

## Effects

Suppress fades, glows, and pseudo-element shadows when they interfere with reading the Quick Access Menu or Steam menu. Focus state should be communicated through accent background and clear text contrast, not heavy glow.

## Component Rules

- Focused rows on `--glance-primary` must force nested labels, values, icons, and lightweight text to `--glance-primary-contrast`.
- Default menu and QAM labels should use `--glance-text` or `--glance-muted` with `opacity: 1`.
- Separators should be quiet and structural, not bright decorative lines.
- Do not introduce layout changes unless a selector is clearly tied to readability.
- Never use unqualified `.gpfocus *` or `.gpfocuswithin *` overrides inside QAM. Decky can apply focus classes to parent containers, which can accidentally recolor an entire panel.
