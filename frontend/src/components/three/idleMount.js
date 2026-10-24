/* idleMount — serialized, scroll-aware pre-builder for the 3D scenes.

   Building a scene graph (geometries, canvas/SVG textures, first shader
   compile) costs several milliseconds. Doing that at the moment a section
   scrolls into view is exactly what a dropped frame looks like, so every
   illustration used to "hitch" on first approach.

   Instead each scene queues itself here and is built in a calm moment: one
   scene per idle slot, never while the user is actively scrolling. Off-screen
   scenes cost nothing per frame (see sceneFrame.js), so pre-building them is
   free at steady state and the scroll path stays clear. */

const queue = new Set();
let pumping = false;
let lastScrollAt = 0;

if (typeof window !== "undefined") {
  window.addEventListener(
    "scroll",
    () => {
      lastScrollAt = performance.now();
    },
    { passive: true }
  );
}

const whenIdle = (fn) =>
  typeof window.requestIdleCallback === "function"
    ? window.requestIdleCallback(fn, { timeout: 1500 })
    : setTimeout(fn, 200);

function pump() {
  if (!queue.size) {
    pumping = false;
    return;
  }
  whenIdle(() => {
    if (performance.now() - lastScrollAt < 250) {
      setTimeout(pump, 250);
      return;
    }
    const job = queue.values().next().value;
    queue.delete(job);
    job();
    pump();
  });
}

export function queueIdleMount(job) {
  queue.add(job);
  if (!pumping) {
    pumping = true;
    pump();
  }
  return () => queue.delete(job);
}
