/* frameBus — publishes "this frame's scroll position is final" to the 3D canvas.

   The illustrations are drawn into one page-sized canvas and positioned from
   each card's getBoundingClientRect(). React Three Fiber runs its own
   requestAnimationFrame loop, which the browser invokes BEFORE the GSAP ticker
   that drives Lenis — so every 3D frame was drawn against the PREVIOUS scroll
   position while the DOM painted at the new one. During a fling that is 50-400
   pixels of drift per frame: the illustrations visibly slide out of their
   cards.

   So the canvas no longer runs its own loop (frameloop="never"). App.js ticks
   this bus straight after lenis.raf(), and the canvas advances exactly one
   frame from there — scroll and illustrations are always the same frame. */
const subscribers = new Set();

export function onPostScrollFrame(cb) {
  subscribers.add(cb);
  return () => subscribers.delete(cb);
}

export function emitPostScrollFrame(timeMs) {
  subscribers.forEach((cb) => cb(timeMs));
}
