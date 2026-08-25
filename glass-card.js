/**
 * Terranova — Liquid Glass Card Refraction Sync
 *
 * Load-bearing trick: The card is a window onto a refracted duplicate
 * of the background video, aligned 1:1 with the viewport.
 */

const video = document.getElementById('bg-video');
const card = document.querySelector('[data-glass-card]');
const container = document.getElementById('dup-video-container');
const canvas = document.getElementById('dup-image');

if (video && card && container && canvas) {
  const ctx = canvas.getContext('2d', { alpha: false });
  const DUP_PIXEL_RATIO = 1;

  let currentW = 0;
  let currentH = 0;

  function render() {
    requestAnimationFrame(render);

    const rect = card.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0 || !video.videoWidth || !video.videoHeight) {
      return;
    }

    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;

    // Sizing the duplicate to the viewport rather than to the card is deliberate.
    // The filter shifts each colour channel by a different amount, so the filtered
    // element's own leading edges show hard channel-separation bands. At viewport
    // size those bands fall outside the card and only clean refraction shows.
    container.style.left = `${-rect.left}px`;
    container.style.top = `${-rect.top}px`;
    container.style.width = `${vw}px`;
    container.style.height = `${vh}px`;

    // The duplicate stays at 1× even on retina: the SVG filter's cost scales
    // with pixel count, and what shows through is a soft refraction where 4×
    // the filter work buys nothing.
    const targetW = Math.round(vw * DUP_PIXEL_RATIO);
    const targetH = Math.round(vh * DUP_PIXEL_RATIO);

    if (currentW !== targetW || currentH !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      currentW = targetW;
      currentH = targetH;
    }

    // Draw the current video frame into it, reproducing object-fit: cover
    try {
      const cover = Math.max(vw / video.videoWidth, vh / video.videoHeight);
      const sw = vw / cover;
      const sh = vh / cover;
      const sx = (video.videoWidth - sw) / 2;
      const sy = (video.videoHeight - sh) / 2;
      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, currentW, currentH);
    } catch {
      // Frame may not be decodable yet
    }
  }

  requestAnimationFrame(render);
}
