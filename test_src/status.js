export function initStatusBar(socket) {
  const serverEl   = document.getElementById('server-status');
  const midiEl     = document.getElementById('midi-status');
  const midiListEl = document.getElementById('midi-devices');

  if (!serverEl || !midiEl || !midiListEl) {
    console.warn('[statusBar] Missing required DOM elements');
    return;
  }

  function setStatus(el, text, cssClass) {
    el.classList.remove('connected', 'error', 'disconnected');
    el.classList.add(cssClass);
    const strong = el.querySelector('strong');
    if (strong) strong.textContent = text;
  }

  /* Socket.IO status */
  if (socket?.connected) {
    setStatus(serverEl, 'Connected', 'connected');
  }

  socket?.once('connect',      () => setStatus(serverEl, 'Connected', 'connected'));
  socket?.once('disconnect',   () => setStatus(serverEl, 'Disconnected', 'disconnected'));
  socket?.once('connect_error',() => setStatus(serverEl, 'Connection error', 'error'));

  /* MIDI device status */
  if (!navigator.requestMIDIAccess) {
    setStatus(midiEl, 'Unavailable', 'error');
    return;
  }

  navigator.requestMIDIAccess({ sysex: false })
    .then(access => {
      function updateDevices() {
        const inputs = Array.from(access.inputs.values());
        if (inputs.length === 0) {
          setStatus(midiEl, 'Disconnected', 'disconnected');
          midiListEl.innerHTML = '';
          return;
        }

        setStatus(midiEl, `Connected (${inputs.length})`, 'connected');
        midiListEl.innerHTML = '';
        for (const input of inputs) {
          const li = document.createElement('li');
          li.textContent = input.name || `MIDI Input ${input.id}`;
          midiListEl.appendChild(li);
        }
      }

      updateDevices();
      access.addEventListener('statechange', updateDevices);
    })
    .catch(() => setStatus(midiEl, 'Unavailable', 'error'));
}