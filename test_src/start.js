/**
 * Start
 * – builds the .testBars structure
 * – injects ARIA roles / attributes for accessibility
 * – keeps each meter’s value & label in sync with voice activity
 */

function start () {
  const { midi, socket, voices, synth } = window.colours;

  /* ---------- 1. build the visual / semantic voice meters ---------- */

  const params     = new URLSearchParams(window.location.search);
  const polyphony  = Number(params.get('voices')) || 4;

  const container  = document.querySelector('.testBars');
  if (!container) {
    console.warn('[start] .testBars container not found');
    return;
  }

  // give the group a landmark & label
  container.setAttribute('role',        'group');
  container.setAttribute('aria-label',  'Active notes');

  // hide the purely decorative colour bars from AT
  document
    .querySelector('.bars')
    ?.setAttribute('aria-hidden', 'true');

  // clear and rebuild the voice meters
  container.innerHTML = '';
  for (let i = 0; i < polyphony; i++) {
    const div = document.createElement('div');
    div.id            = `voice${i}`;
    div.className     = 'testBar voice';

    /* --- ARIA semantics for a musical “meter” --- */
    div.setAttribute('tabindex',    '0');          // focusable
    div.setAttribute('role', 'status');
    div.setAttribute('aria-label',  'Note off');

    div.innerHTML = `<span>${i}</span>`;
    container.appendChild(div);
  }

  const meterEls = [...container.querySelectorAll('.testBar')];

  /* helper to keep aria attributes in sync */
  function updateMeter (idx, pitch, vel) {
    const el = meterEls[idx];
    if (!el) return;

    const active = pitch >= 0 && vel > 0;
    el.style.backgroundColor = active
      ? noteColours.daze.hex[pitch % 12]
      : 'black';

el.setAttribute(
  'aria-label',
  'Off'
);
  }

  /* ---------- 2. set up Tone synth & MIDI mapping ---------- */

  window.colours.synth = new Tone.PolySynth(polyphony, Tone.Synth).toMaster();
  Tone.start();

  // note-on / note-off handler
  midi.map[0].noteRange['0,127'] = (pitch, velocity) => {
    const voiceState = voices.update(pitch, velocity, true); // returns full array

    voiceState.forEach((v, i) =>
      updateMeter(i, v.pitch, v.velocity)
    );

    socket.emitNote(0, pitch, velocity);
  };

  // sustain pedal (supports continuous control)
    midi.map[0].cc[64] = value => {
    socket.emitCC(0, 64, value);

    const event = new CustomEvent('sustainchange', {
        detail: {
        value: value,            // 0–127
        normalized: value / 127  // 0–1 float, if needed
        }
    });

    window.dispatchEvent(event);
    };

  // custom sensor boards on channel 15
  for (let i = 0; i < 6; i++) {
    midi.map[15].cc[i] = v => socket.emitCC(15, i, v);
  }

  midi.listen();
}

export default start;