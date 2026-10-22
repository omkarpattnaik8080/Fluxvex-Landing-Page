/* Iso3D — flat-vector isometric kit for R3F.
   ONE language with the SVG IsoKit: cream ground, white tiles with hairline edges,
   accent dashed wires with traveling packets, screen-facing label billboards. */
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line, Edges } from "@react-three/drei";
import { renderToStaticMarkup } from "react-dom/server";

export const C = {
  accent: "#3D43E8",
  ink: "#0B0B0D",
  soft: "#5B5F68",
  mint: "#0E8A3E",
  white: "#FFFFFF",
  dim: "#EDEBE4",
  hairline: "#C6C4BD",
  hairlineActive: "#8B8FE0",
};

const texCache = new Map();

function svgToTexture(svg, key) {
  if (texCache.has(key)) return texCache.get(key);
  const url = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  const img = new Image();
  const tex = new THREE.Texture();
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  img.onload = () => {
    tex.image = img;
    tex.needsUpdate = true;
  };
  img.src = url;
  texCache.set(key, tex);
  return tex;
}

export function useSvgTexture(element, key, color) {
  const el = useRef(element);
  el.current = element;
  return useMemo(() => {
    let svg = renderToStaticMarkup(el.current);
    if (!svg.includes("xmlns=")) svg = svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
    if (color) svg = svg.replace(/currentColor/g, color);
    return svgToTexture(svg, key + (color || ""));
  }, [key, color]);
}

/* PNG asset texture (e.g. the Fluxvex icon), clipped to the rounded mark shape */
export function useImgTexture(url, key) {
  return useMemo(() => {
    if (texCache.has(key)) return texCache.get(key);
    const tex = new THREE.Texture();
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = c.height = 160;
      const ctx = c.getContext("2d");
      ctx.save();
      roundRect(ctx, 8, 8, 144, 144, 34);
      ctx.clip();
      ctx.drawImage(img, 0, 0, 160, 160);
      ctx.restore();
      tex.image = c;
      tex.needsUpdate = true;
    };
    img.src = url;
    texCache.set(key, tex);
    return tex;
  }, [url, key]);
}

/* Rounded-rect + text drawn to a canvas texture (crisp at 3x) */
export function useTextTexture(spec) {
  const key = JSON.stringify(spec);
  return useMemo(() => {
    const s = 3;
    const pad = 14 * s;
    const font = (w, size) => `${w} ${size * s}px "Inter Tight", Inter, sans-serif`;
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");
    const lines = spec.lines || [];
    ctx.font = font(spec.weight || 600, spec.size || 26);
    const textW = Math.max(...lines.map((l) => ctx.measureText(l.text).width), 1);
    const lineH = (spec.size || 26) * s * 1.3;
    const w = Math.ceil(textW + pad * 2 + (spec.accentChip ? 0 : 0));
    const h = Math.ceil(lineH * lines.length + pad * 1.4);
    c.width = w;
    c.height = h;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (spec.pill) {
        ctx.fillStyle = spec.bg || C.accent;
        roundRect(ctx, 0, 0, w, h, h / 2);
        ctx.fill();
      } else {
        ctx.fillStyle = spec.bg || "#FFFFFF";
        roundRect(ctx, 0, 0, w, h, 12 * s);
        ctx.fill();
        ctx.strokeStyle = spec.border || "rgba(16,16,20,0.10)";
        ctx.lineWidth = 1.5 * s;
        roundRect(ctx, 0.75 * s, 0.75 * s, w - 1.5 * s, h - 1.5 * s, 11.5 * s);
        ctx.stroke();
      }
      ctx.textBaseline = "middle";
      lines.forEach((l, i) => {
        ctx.font = font(l.weight || spec.weight || 600, l.size || spec.size || 26);
        ctx.fillStyle = l.color || spec.color || C.ink;
        ctx.textAlign = l.align || "center";
        ctx.fillText(l.text, l.align === "left" ? pad : w / 2, pad * 0.75 + lineH * i + lineH / 2);
      });
      if (spec.dots) {
        ctx.fillStyle = spec.dotsColor || C.accent;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(w / 2 + (i - 1) * 10 * s, h - pad * 0.75, 2.4 * s, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
    draw();
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    tex.aspect = w / h;
    return tex;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* Soft radial glow texture (packets, active-tile halo, ground shadow) */
export function useGlowTexture(color = C.accent) {
  return useMemo(() => {
    const key = `glow-${color}`;
    if (texCache.has(key)) return texCache.get(key);
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const ctx = c.getContext("2d");
    const g = ctx.createRadialGradient(64, 64, 2, 64, 64, 62);
    g.addColorStop(0, color);
    g.addColorStop(0.45, `${color}55`);
    g.addColorStop(1, `${color}00`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    const tex = new THREE.CanvasTexture(c);
    texCache.set(key, tex);
    return tex;
  }, [color]);
}

/* Grid ground + soft shadow blob + tilt/drag/float */
export function IsoWorld({ children, input, reduce, interactive = true, dragClamp = 0.6, ground = 16 }) {
  const g = useRef(null);
  const gridTex = useMemo(() => {
    const key = "grid";
    if (texCache.has(key)) return texCache.get(key);
    const c = document.createElement("canvas");
    c.width = c.height = 240;
    const ctx = c.getContext("2d");
    ctx.strokeStyle = "rgba(16,16,20,0.055)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 240; i += 24) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 240); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(240, i); ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(ground / 2.4, ground / 2.4);
    texCache.set(key, tex);
    return tex;
  }, [ground]);
  const shadowTex = useGlowTexture("#101014");

  useFrame((state, dt) => {
    const m = g.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    const k = Math.min(1, dt * 6);
    if (reduce) {
      m.rotation.y += (0 - m.rotation.y) * k;
      m.rotation.x += (0 - m.rotation.x) * k;
      m.position.y = 0;
      return;
    }
    const tiltY = (input.px || 0) * 0.10 + (input.yaw || 0);
    const tiltX = (input.py || 0) * 0.05;
    m.rotation.y += (THREE.MathUtils.clamp(tiltY, -dragClamp - 0.35, dragClamp + 0.35) - m.rotation.y) * k;
    m.rotation.x += (tiltX - m.rotation.x) * k;
    m.position.y = Math.sin(t * 0.7) * 0.07;
  });

  return (
    <group ref={g}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.021, 0]}>
        <planeGeometry args={[ground, ground]} />
        <meshBasicMaterial map={gridTex} transparent opacity={0.75} />
      </mesh>
      <sprite position={[0, 0.01, 0]} scale={[6.2, 3.6, 1]}>
        <spriteMaterial map={shadowTex} transparent opacity={0.07} depthWrite={false} />
      </sprite>
      {children}
    </group>
  );
}

/* White tile with hairline edges + optional top decal + active halo */
export function Tile({ position = [0, 0, 0], size = [1, 0.2, 1], texture, texScale = 0.62, active = false, dim = false, hoverLift = 0.12, interactive = true }) {
  const grp = useRef(null);
  const halo = useRef(null);
  const glow = useGlowTexture(C.accent);
  const [hovered, setHovered] = useState(false);
  const lift = useRef(0);
  useFrame((_, dt) => {
    if (!grp.current) return;
    const k = Math.min(1, dt * 8);
    const target = interactive && hovered && !dim ? hoverLift : 0;
    lift.current += (target - lift.current) * k;
    grp.current.position.y = lift.current;
    if (halo.current) {
      const m = halo.current.material;
      const t = (active ? 0.5 : 0) + (hovered && !dim ? 0.25 : 0);
      m.opacity += (t - m.opacity) * k;
      const s = 1 + Math.sin(_.clock.elapsedTime * 2.2) * 0.03;
      halo.current.scale.set(s, s, 1);
    }
  });
  const w = Math.hypot(size[0], size[2]) * 1.25;
  return (
    <group position={position}>
      <group ref={grp}
        onPointerOver={interactive ? (e) => { e.stopPropagation(); setHovered(true); } : undefined}
        onPointerOut={interactive ? () => setHovered(false) : undefined}>
        <mesh position={[0, size[1] / 2, 0]}>
          <boxGeometry args={size} />
          <meshBasicMaterial color={dim ? C.dim : C.white} />
          <Edges threshold={15} color={active ? C.hairlineActive : C.hairline} />
        </mesh>
        {texture && !dim && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, size[1] + 0.012, 0]}>
            <planeGeometry args={[size[0] * texScale, size[2] * texScale]} />
            <meshBasicMaterial map={texture} transparent depthWrite={false} />
          </mesh>
        )}
      </group>
      <sprite ref={halo} position={[0, size[1] / 2, 0]} scale={[w, w * 0.72, 1]}>
        <spriteMaterial map={glow} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
    </group>
  );
}

/* Dashed wire with traveling glowing packet */
export function Wire({ from, to, active = true, dim = false, delay = 0, period = 1.5, height = 0.06 }) {
  const p = useRef(null);
  const glow = useGlowTexture(C.accent);
  const A = useMemo(() => new THREE.Vector3(...from), [from]);
  const B = useMemo(() => new THREE.Vector3(...to), [to]);
  useFrame((state) => {
    const s = p.current;
    if (!s) return;
    if (!active || dim) {
      s.visible = false;
      return;
    }
    const tt = ((state.clock.elapsedTime / period) + delay) % 1;
    s.visible = true;
    s.position.lerpVectors(A, B, tt);
    s.position.y += height;
    const fade = Math.min(tt, 1 - tt) * 6;
    s.material.opacity = Math.max(0, Math.min(1, fade));
  });
  const dimmed = dim ? 0.35 : active ? 1 : 0.55;
  return (
    <group>
      <Line
        points={[from, to]}
        dashed
        dashSize={0.16}
        gapSize={0.11}
        lineWidth={1.4}
        color={active && !dim ? C.accent : "#B9B7B0"}
        transparent
        opacity={dimmed}
      />
      <sprite ref={p} scale={[0.34, 0.34, 1]}>
        <spriteMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
    </group>
  );
}

/* Screen-facing label billboard (canvas text sprite) */
export function Billboard({ position = [0, 1.4, 0], spec, bob = 0.05, phase = 0, fade = true, reduce = false, scale = 1 }) {
  const tex = useTextTexture(spec);
  const s = useRef(null);
  const o = useRef(0);
  useFrame((state, dt) => {
    const sp = s.current;
    if (!sp) return;
    const k = Math.min(1, dt * 5);
    o.current += ((fade ? 1 : 0) - o.current) * k;
    sp.material.opacity = o.current;
    if (!reduce) sp.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.3 + phase) * bob;
  });
  const h = (spec.h || 0.52) * scale;
  return (
    <sprite ref={s} position={position} scale={[h * (tex.aspect || 3), h, 1]}>
      <spriteMaterial map={tex} transparent depthWrite={false} opacity={0} />
    </sprite>
  );
}

/* Expanding pulse rings (idle heartbeat + click burst) */
export function PulseRings({ position = [0, 0.02, 0], input, burst = true }) {
  const r1 = useRef(null);
  const r2 = useRef(null);
  const lastPulse = useRef(0);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const animate = (ring, phase) => {
      if (!ring.current) return;
      const idle = ((t * 0.45 + phase) % 1);
      let s = 0.6 + idle * 2.2;
      let o = (1 - idle) * 0.3;
      if (burst && input && input.pulseAt && input.pulseAt !== lastPulse.current) {
        const bt = (performance.now() - input.pulseAt) / 700;
        if (bt < 1) {
          s = 0.6 + bt * 3.4;
          o = (1 - bt) * 0.85;
        }
      }
      ring.current.scale.set(s, s, 1);
      ring.current.material.opacity = o;
    };
    animate(r1, 0);
    animate(r2, 0.5);
    if (input) lastPulse.current = input.pulseAt;
  });
  return (
    <group position={position}>
      <mesh ref={r1} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.92, 1, 48]} />
        <meshBasicMaterial color={C.accent} transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh ref={r2} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.92, 1, 48]} />
        <meshBasicMaterial color={C.accent} transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}
