import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const paletteDir = join("Glance Deck", "palettes");

function parseHsl(value) {
  const match = value.match(/hsl\(([-\d.]+)\s+([-\d.]+)%\s+([-\d.]+)%\)/);
  if (!match) throw new Error(`Unsupported color: ${value}`);
  return {
    h: Number(match[1]),
    s: Number(match[2]) / 100,
    l: Number(match[3]) / 100,
  };
}

function hslToRgb({ h, s, l }) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return [r + m, g + m, b + m];
}

function luminance(color) {
  return hslToRgb(color)
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    )
    .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
}

function contrast(a, b) {
  const l1 = luminance(a);
  const l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function parseVars(css) {
  return Object.fromEntries(
    [...css.matchAll(/--(glance-[\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [
      name,
      parseHsl(value.trim()),
    ]),
  );
}

const checks = [
  ["text on bg", "glance-text", "glance-bg", 7],
  ["text on surface 1", "glance-text", "glance-surface-1", 7],
  ["text on surface 2", "glance-text", "glance-surface-2", 7],
  ["text on surface 3", "glance-text", "glance-surface-3", 4.5],
  ["muted on bg", "glance-muted", "glance-bg", 4.5],
  ["muted on surface 1", "glance-muted", "glance-surface-1", 4.5],
  ["muted on surface 2", "glance-muted", "glance-surface-2", 4.5],
  ["muted on surface 3", "glance-muted", "glance-surface-3", 4.5],
  ["primary on bg", "glance-primary", "glance-bg", 4.5],
  ["primary on surface 1", "glance-primary", "glance-surface-1", 4.5],
  ["primary on surface 2", "glance-primary", "glance-surface-2", 4.5],
  ["primary on surface 3", "glance-primary", "glance-surface-3", 4.5],
  ["contrast on primary", "glance-primary-contrast", "glance-primary", 7],
  ["positive on bg", "glance-positive", "glance-bg", 4.5],
  ["positive on surface 2", "glance-positive", "glance-surface-2", 4.5],
  ["negative on bg", "glance-negative", "glance-bg", 4.5],
  ["negative on surface 2", "glance-negative", "glance-surface-2", 4.5],
];

let failures = 0;

for (const file of readdirSync(paletteDir).filter((name) => name.endsWith(".css")).sort()) {
  const vars = parseVars(readFileSync(join(paletteDir, file), "utf8"));
  const failed = [];

  for (const [name, fg, bg, threshold] of checks) {
    const ratio = contrast(vars[fg], vars[bg]);
    if (ratio < threshold) {
      failures += 1;
      failed.push(`${name} ${ratio.toFixed(2)} < ${threshold}`);
    }
  }

  if (failed.length) {
    console.log(`${file}: FAIL`);
    for (const line of failed) console.log(`  - ${line}`);
  } else {
    console.log(`${file}: PASS`);
  }
}

if (failures) {
  console.log(`\n${failures} failing checks`);
  process.exitCode = 1;
} else {
  console.log("\nAll contrast checks passed");
}
