/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { useState } from "react";
import { Localized } from "./MSLocalized";

const ACCENT_COLORS = [
  { id: "blue", className: "nox-accent-blue", label: "Blue" },
  { id: "purple", className: "nox-accent-purple", label: "Purple" },
  { id: "pink", className: "nox-accent-pink", label: "Pink" },
  { id: "red", className: "nox-accent-red", label: "Red" },
  { id: "orange", className: "nox-accent-orange", label: "Orange" },
  { id: "yellow", className: "nox-accent-yellow", label: "Yellow" },
  { id: "green", className: "nox-accent-green", label: "Green" },
  { id: "teal", className: "nox-accent-teal", label: "Teal" },
  { id: "indigo", className: "nox-accent-indigo", label: "Indigo" },
  { id: "gold", className: "nox-accent-gold", label: "Gold" },
  { id: "silver", className: "nox-accent-silver", label: "Silver" },
  { id: "graphite", className: "nox-accent-graphite", label: "Graphite" },
];

const GLASS_INTENSITY_OPTIONS = [
  { id: "low", label: "Low", description: "Subtle transparency" },
  { id: "medium", label: "Medium", description: "Balanced effect" },
  { id: "high", label: "High", description: "Strong transparency" },
];

export const VisualSettings = ({ onAccentChange, onTransparencyChange, onGlassIntensityChange }) => {
  const [selectedAccent, setSelectedAccent] = useState("blue");
  const [transparency, setTransparency] = useState(50);
  const [glassIntensity, setGlassIntensity] = useState("medium");
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [roundedCorners, setRoundedCorners] = useState(true);

  const handleAccentSelect = (accentId) => {
    setSelectedAccent(accentId);
    onAccentChange?.(accentId);
  };

  const handleTransparencyChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setTransparency(value);
    onTransparencyChange?.(value);
  };

  const handleGlassIntensitySelect = (intensity) => {
    setGlassIntensity(intensity);
    onGlassIntensityChange?.(intensity);
  };

  return (
    <div className="nox-visual-settings">
      <div className="nox-visual-settings-section">
        <h3 data-l10n-id="visual-settings-accent-title">Accent Color</h3>
        <div className="nox-accent-selector">
          {ACCENT_COLORS.map((accent) => (
            <button
              key={accent.id}
              className={`nox-accent-option ${accent.className} ${selectedAccent === accent.id ? "selected" : ""}`}
              onClick={() => handleAccentSelect(accent.id)}
              aria-label={accent.label}
              title={accent.label}
            />
          ))}
        </div>
      </div>

      <div className="nox-visual-settings-section">
        <h3 data-l10n-id="visual-settings-transparency-title">Transparency</h3>
        <div className="nox-transparency-slider">
          <div className="nox-slider-label">
            <span data-l10n-id="visual-settings-transparency-low">Low</span>
            <span data-l10n-id="visual-settings-transparency-high">High</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={transparency}
            onChange={handleTransparencyChange}
            className="nox-slider"
          />
        </div>
      </div>

      <div className="nox-visual-settings-section">
        <h3 data-l10n-id="visual-settings-glass-title">Glass Effect Intensity</h3>
        <div className="nox-glass-intensity-selector">
          {GLASS_INTENSITY_OPTIONS.map((option) => (
            <button
              key={option.id}
              className={`nox-glass-intensity-option ${glassIntensity === option.id ? "selected" : ""}`}
              onClick={() => handleGlassIntensitySelect(option.id)}
            >
              <div className="nox-glass-intensity-label">{option.label}</div>
              <div className="nox-glass-intensity-description">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="nox-visual-settings-section">
        <div className="nox-toggle-option" onClick={() => setAnimationsEnabled(!animationsEnabled)}>
          <div>
            <div className="nox-toggle-label" data-l10n-id="visual-settings-animations-title">
              Enable Animations
            </div>
            <div className="nox-toggle-description" data-l10n-id="visual-settings-animations-description">
              Smooth transitions and effects
            </div>
          </div>
          <div className={`nox-toggle-switch ${animationsEnabled ? "checked" : ""}`} />
        </div>

        <div className="nox-toggle-option" onClick={() => setRoundedCorners(!roundedCorners)}>
          <div>
            <div className="nox-toggle-label" data-l10n-id="visual-settings-corners-title">
              Rounded Corners
            </div>
            <div className="nox-toggle-description" data-l10n-id="visual-settings-corners-description">
              Modern rounded interface elements
            </div>
          </div>
          <div className={`nox-toggle-switch ${roundedCorners ? "checked" : ""}`} />
        </div>
      </div>

      <div className="nox-visual-settings-section">
        <h3 data-l10n-id="visual-settings-theme-preview-title">Theme Preview</h3>
        <div className="nox-theme-preview-container">
          <div>
            <div className="nox-theme-preview nox-theme-preview-light" />
            <div className="nox-theme-preview-title" data-l10n-id="visual-settings-theme-light">
              Light
            </div>
          </div>
          <div>
            <div className="nox-theme-preview nox-theme-preview-dark" />
            <div className="nox-theme-preview-title" data-l10n-id="visual-settings-theme-dark">
              Dark
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};