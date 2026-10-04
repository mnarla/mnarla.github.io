/**
 * MAIN JAVASCRIPT ENTRY POINT
 * Coordinates modular subsystems and smooth multi-page navigation
 */

import { initScrollProgress } from './modules/scroll-progress.js';
import { initProjectFilters } from './modules/filters.js';
import { initCustomCursor } from './modules/cursor.js';
import { initEmailCopy } from './modules/clipboard.js';
import { initArchitectureDrawers } from './modules/architecture-drawer.js';
import { initPageTransitions } from './modules/page-transition.js';
import { initScrollReveal } from './modules/scroll-reveal.js';
import { initNeuralConstellation } from './modules/neural-constellation.js';

document.addEventListener('DOMContentLoaded', () => {
  initNeuralConstellation();
  initPageTransitions();
  initScrollProgress();
  initProjectFilters();
  initCustomCursor();
  initEmailCopy();
  initArchitectureDrawers();
  initScrollReveal();
});
