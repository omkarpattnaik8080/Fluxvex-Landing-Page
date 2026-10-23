/* viewVisibility — module-level pub/sub shared by every Scene3D (mounted anywhere
   in the tree) and the single SceneCanvas. Each Scene3D reports whether its
   section is near the viewport; the Canvas pauses its render loop entirely
   (frameloop "never") when no 3D section is near — zero WebGL work while
   scrolling through non-3D parts of the page. */

const listeners = new Set();
let visibleCount = 0;

export function reportViewVisible(delta) {
  visibleCount = Math.max(0, visibleCount + delta);
  const any = visibleCount > 0;
  listeners.forEach((l) => l(any));
}

export function onAnyViewVisible(fn) {
  listeners.add(fn);
  fn(visibleCount > 0);
  return () => listeners.delete(fn);
}
