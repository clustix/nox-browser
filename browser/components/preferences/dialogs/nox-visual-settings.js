/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const PREF_ACCENT_COLOR = "nox.browser.accentColor";
const PREF_TRANSPARENCY = "nox.browser.transparency";
const PREF_GLASS_INTENSITY = "nox.browser.glassIntensity";

var gNoxVisualSettings = {
  init() {
    this.loadSettings();
    this.setupEventListeners();
  },

  loadSettings() {
    const accent = Services.prefs.getCharPref(PREF_ACCENT_COLOR, "blue");
    const transparency = Services.prefs.getIntPref(PREF_TRANSPARENCY, 50);
    const glassIntensity = Services.prefs.getCharPref(PREF_GLASS_INTENSITY, "medium");

    const accentBtn = document.querySelector(`[data-accent="${accent}"]`);
    if (accentBtn) {
      accentBtn.classList.add("selected");
    }

    const transparencyInput = document.getElementById("nox-transparency");
    if (transparencyInput) {
      transparencyInput.value = transparency;
      document.getElementById("nox-transparency-value").textContent = `${transparency}%`;
    }

    const glassBtn = document.querySelector(`[data-intensity="${glassIntensity}"]`);
    if (glassBtn) {
      glassBtn.classList.add("selected");
    }
  },

  setupEventListeners() {
    document.querySelectorAll(".nox-accent-option").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".nox-accent-option").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
    });

    document.querySelectorAll(".nox-glass-intensity-option").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".nox-glass-intensity-option").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
    });

    const transparencyInput = document.getElementById("nox-transparency");
    if (transparencyInput) {
      transparencyInput.addEventListener("input", (e) => {
        document.getElementById("nox-transparency-value").textContent = `${e.target.value}%`;
      });
    }

    document.getElementById("nox-settings-save").addEventListener("click", () => this.saveSettings());
    document.getElementById("nox-settings-cancel").addEventListener("click", () => this.closeDialog());
  },

  saveSettings() {
    const selectedAccent = document.querySelector(".nox-accent-option.selected");
    const selectedGlass = document.querySelector(".nox-glass-intensity-option.selected");
    const transparency = document.getElementById("nox-transparency").value;

    if (selectedAccent) {
      Services.prefs.setCharPref(PREF_ACCENT_COLOR, selectedAccent.dataset.accent);
    }
    Services.prefs.setIntPref(PREF_TRANSPARENCY, parseInt(transparency, 10));
    if (selectedGlass) {
      Services.prefs.setCharPref(PREF_GLASS_INTENSITY, selectedGlass.dataset.intensity);
    }

    this.closeDialog();
  },

  closeDialog() {
    window.close();
  }
};

document.addEventListener("DOMContentLoaded", () => gNoxVisualSettings.init());