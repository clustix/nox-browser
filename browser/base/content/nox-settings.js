/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const PREF_ACCENT = "nox.browser.accentColor";
const PREF_TRANSPARENCY = "nox.browser.transparency";
const PREF_GLASS = "nox.browser.glassIntensity";
const PREF_LIQUID_GLASS = "nox.browser.liquidGlass";
const PREF_ANIMATIONS = "nox.browser.animationsEnabled";
const PREF_ROUNDED = "nox.browser.roundedCorners";

const ACCENT_COLORS = {
  blue: "#0a84ff",
  purple: "#a855f7",
  pink: "#ff2d55",
  red: "#ff3b30",
  orange: "#ff9500",
  yellow: "#ffcc00",
  green: "#34c759",
  teal: "#32ade6",
  indigo: "#5856d6",
  gold: "#d4a017",
  silver: "#b8b8c0",
  graphite: "#5a5a66",
};

const GLASS_LEVELS = {
  low: { blur: 10, sat: 1.3 },
  medium: { blur: 20, sat: 1.6 },
  high: { blur: 32, sat: 2 },
};

var gNoxSettings = {
  init() {
    this.apply();
    for (const pref of [
      PREF_ACCENT,
      PREF_TRANSPARENCY,
      PREF_GLASS,
      PREF_LIQUID_GLASS,
      PREF_ANIMATIONS,
      PREF_ROUNDED,
    ]) {
      Services.prefs.addObserver(pref, () => this.apply());
    }
  },

  apply() {
    const root = document.documentElement;

    const accent = Services.prefs.getCharPref(PREF_ACCENT, "purple");
    root.style.setProperty(
      "--nox-accent-color",
      ACCENT_COLORS[accent] || ACCENT_COLORS.purple
    );

    const transparency = Math.min(
      100,
      Math.max(0, Services.prefs.getIntPref(PREF_TRANSPARENCY, 50))
    );
    root.style.setProperty(
      "--nox-surface-alpha",
      (0.4 + (100 - transparency) / 100 * 0.6).toFixed(2)
    );

    const glass = Services.prefs.getCharPref(PREF_GLASS, "medium");
    const level = GLASS_LEVELS[glass] || GLASS_LEVELS.medium;
    root.style.setProperty("--nox-glass-blur", `${level.blur}px`);
    root.style.setProperty("--nox-glass-sat", String(level.sat));

    root.style.setProperty(
      "--nox-glass-enabled",
      Services.prefs.getBoolPref(PREF_LIQUID_GLASS, true) ? "1" : "0"
    );

    root.style.setProperty(
      "--nox-anim",
      Services.prefs.getBoolPref(PREF_ANIMATIONS, true) ? "1" : "0"
    );

    root.style.setProperty(
      "--nox-radius",
      Services.prefs.getBoolPref(PREF_ROUNDED, true) ? "20px" : "0px"
    );
  },
};

window.addEventListener("load", () => gNoxSettings.init(), { once: true });
