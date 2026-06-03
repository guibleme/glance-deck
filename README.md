# Glance Deck

Steam Deck themes inspired by the official [Glance](https://github.com/glanceapp/glance) dashboard palettes, packaged for Decky CSS Loader.

[![CSS Loader](https://img.shields.io/badge/Decky-CSS%20Loader-1b75bb?style=for-the-badge)](https://docs.deckthemes.com/CSSLoader/)
[![DeckThemes](https://img.shields.io/badge/DeckThemes-ready-45d6a3?style=for-the-badge)](https://deckthemes.com/)
[![Manifest v8](https://img.shields.io/badge/manifest-v8-8b5cf6?style=for-the-badge)](./Glance%20Deck/theme.json)
[![Ko-fi](https://img.shields.io/badge/support-Ko--fi-ff5f5f?style=for-the-badge)](https://ko-fi.com/glorynemesis)

Glance has a really clean, readable color system for dashboards. This project brings those palettes into the Steam Deck UI so the Deck gets that same quiet, sharp, at-a-glance feeling while still looking native in Gaming Mode.

## Palettes

`Glance Deck` installs as one CSS Loader theme with a `Palette` dropdown.

Dark palettes:

- Teal City
- Catppuccin Frappe
- Catppuccin Macchiato
- Catppuccin Mocha
- Camouflage
- Gruvbox Dark
- Kanagawa Dark
- Tucan
- Dracula
- Shades of Purple
- Neon Pink

Light palettes:

- Catppuccin Latte
- Peachy
- Zebra

## Install

### Manual install

1. Install [Decky Loader](https://github.com/SteamDeckHomebrew/decky-loader).
2. Install CSS Loader from the Decky plugin store.
3. Switch your Steam Deck to Desktop Mode.
4. Copy the `Glance Deck` folder into:

   ```text
   /home/deck/homebrew/themes/
   ```

5. Return to Gaming Mode.
6. Open Quick Access Menu > Decky > CSS Loader.
7. Press Refresh, enable `Glance Deck`, and choose a palette.

### Git install

If you use Git on your Deck:

```bash
cd /home/deck/homebrew/themes
git clone https://github.com/guibleme/glance-deck.git
cp -r glance-deck/"Glance Deck" .
```

Then refresh CSS Loader in Gaming Mode.

## DeckThemes submission

Use DeckThemes' Git submission flow:

| Field | Value |
| --- | --- |
| Repo URL | `https://github.com/guibleme/glance-deck` |
| Subfolder | `Glance Deck` |
| Manifest | `8` |
| Target | `System-Wide` |

## Development

CSS Loader can watch files while you edit. Create this file on the Deck:

```text
/home/deck/homebrew/themes/WATCH
```

After that, edits to CSS files under `Glance Deck/` should reload automatically. If they do not, open CSS Loader and press Refresh.

## Accessibility

Every palette is calibrated against the theme roles used in Steam's UI:

- Main text clears 7:1 on primary surfaces.
- Muted labels clear 4.5:1 on all surfaces.
- Accent, success, and danger text clear 4.5:1 where they appear as text.
- Focused/primary controls keep 7:1 contrast between label and background.

Run the audit before shipping palette changes:

```bash
node scripts/audit-contrast.mjs
```

## Credits

Palette values come from the official [Glance themes documentation](https://github.com/glanceapp/glance/blob/main/docs/themes.md).

Made by Gui. Polished with Codex.

Support the work on [Ko-fi](https://ko-fi.com/glorynemesis).
