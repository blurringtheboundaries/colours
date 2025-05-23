const testBars = document.querySelectorAll('.testBars .testBar');

/**
 * Update a single testBar’s ARIA attributes.
 * @param {number} index   0-based voice index
 * @param {number} pitch   MIDI pitch (0-127) or -1 when off
 * @param {number} vel     0-127
 */
export function updateNoteMeter(index, pitch, vel) {
  const el = testBars[index];
  if (!el) return;

  const isOn = pitch >= 0 && vel > 0;

  const message = isOn
    ? `Note ${midiToName(pitch)}, velocity ${vel}`
    : 'Note off';
  
 el.setAttribute(
  'aria-label',
  `voice ${index}: ${message}`
);

}

/* Optional util to convert MIDI pitch → note name */
export function midiToName(num) {
  const names = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
  return names[num % 12] + Math.floor(num / 12 - 1);
}