/**
 * NEURAL CONSTELLATION MODULE
 * Dynamic physics nodes with brighter connective synapses and cursor tethering.
 */

export function initNeuralConstellation() {
  let canvas = document.getElementById('neural-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'neural-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    document.body.prepend(canvas);
  }

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let mouse = { x: -1000, y: -1000 };
  let isRunning = true;

  const NUM_NODES = 75;
  let nodes = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initNodes();
  }

  function initNodes() {
    nodes = [];
    for (let i = 0; i < NUM_NODES; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        radius: 1.6 + Math.random() * 2.2
      });
    }
  }

  window.addEventListener('resize', resize, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  }, { passive: true });

  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    isRunning = !document.hidden;
    if (isRunning) requestAnimationFrame(draw);
  });

  function draw() {
    if (!isRunning) return;

    ctx.clearRect(0, 0, width, height);

    // Update positions & mouse connection
    for (let n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      // Mouse connection (brighter, responsive)
      if (mouse.x > 0) {
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < 170) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(224, 93, 114, ${0.7 * (1 - mdist / 170)})`;
          ctx.lineWidth = 1.3;
          ctx.stroke();
        }
      }
    }

    // Inter-node synaptic connections (brighter burgundy)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const n1 = nodes[i];
        const n2 = nodes[j];
        const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
        if (dist < 145) {
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(195, 68, 86, ${0.45 * (1 - dist / 145)})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }
    }

    // Glowing nodes
    for (let n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(247, 247, 248, 0.85)';
      ctx.shadowColor = '#B53F52';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(draw);
  }

  resize();
  requestAnimationFrame(draw);
}
