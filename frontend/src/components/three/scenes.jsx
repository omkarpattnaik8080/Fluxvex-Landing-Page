/* The nine Iso3D scenes — one per illustrated section. Flat-vector isometric,
   interactive: cursor tilt, drag-to-rotate, hover-reactive packets, click pulses. */
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { OrthographicCamera, Line, Edges } from "@react-three/drei";
import { GoogleAdsMark, MetaMark, GA4Mark } from "@/components/brand/IntegrationMarks";
import { HelpCircle, MessageSquare, Repeat, Plug, SlidersHorizontal, Sparkles, Send } from "lucide-react";
import { C, IsoWorld, Tile, Wire, Billboard, PulseRings, Beam, Chip, Burst, Satellite, useSvgTexture, useTextTexture, useGlowTexture, useImgTexture } from "./kit3d";

/* ---------- shared bits ---------- */

export const WORLD = {
  workflow: { w: 10.6, h: 6.6 },
  prompt: { w: 7.6, h: 6.4 },
  pipeline: { w: 11, h: 5.6 },
  featureSources: { w: 8.8, h: 5.0 },
  featureAi: { w: 8.8, h: 5.0 },
  featureDelivery: { w: 9.6, h: 5.2 },
  platform: { w: 10.4, h: 7 },
  vision: { w: 11, h: 6.6 },
  layers: { w: 10, h: 5.0 },
};

function useBrandTextures() {
  const g = useSvgTexture(<GoogleAdsMark size={64} />, "brand-g");
  const m = useSvgTexture(<MetaMark size={64} />, "brand-m");
  const a = useSvgTexture(<GA4Mark size={64} />, "brand-a");
  const fx = useImgTexture(`${process.env.PUBLIC_URL || ""}/fluxvex-icon.png`, "brand-fx");
  return [g, m, a, fx];
}

function useIconTexture(Icon, key, color = C.accent) {
  return useSvgTexture(<Icon size={64} strokeWidth={1.8} />, key, color);
}

function useCanvasTexture(w, h, draw) {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    draw(c.getContext("2d"), w, h);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    tex.aspect = w / h;
    return tex;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function Cam({ zoom, target = [0, 0, 0] }) {
  return (
    <OrthographicCamera
      makeDefault
      position={[14, 14, 14]}
      zoom={zoom || 40}
      near={-100}
      far={500}
      onUpdate={(c) => c.lookAt(target[0], target[1], target[2])}
    />
  );
}

/* ---------- How it works — step-driven pipeline ---------- */

function AssemblingBar() {
  const bar = useRef(null);
  useFrame((s) => {
    if (!bar.current) return;
    const t = (s.clock.elapsedTime % 1.6) / 1.6;
    const v = 0.08 + 0.92 * (1 - Math.pow(1 - t, 3));
    bar.current.scale.x = v;
    bar.current.position.x = -1.4 * (1 - v) * 0.5;
  });
  return (
    <group position={[0.3, 0.035, 1.55]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.4, 0.1]} />
        <meshBasicMaterial color="#E7E5DE" />
      </mesh>
      <mesh ref={bar} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <planeGeometry args={[1.4, 0.1]} />
        <meshBasicMaterial color={C.accent} />
      </mesh>
    </group>
  );
}

export function WorkflowScene({ input, reduce, visible, zoom, step = 0 }) {
  const [gTex, mTex, aTex, fxTex] = useBrandTextures();
  const sources = [
    { tex: gTex, z: -1.6, base: C.sky },
    { tex: mTex, z: 0, base: C.blue },
    { tex: aTex, z: 1.6, base: C.amber },
  ];
  const engineActive = step === 1 || step === 2 || step === 3;
  const [stepBurst, setStepBurst] = useState(0);
  useEffect(() => {
    setStepBurst(performance.now());
  }, [step]);
  return (
    <>
      <Cam zoom={zoom} />
      <IsoWorld input={input} reduce={reduce}>
        {sources.map((s, i) => (
          <Tile key={i} position={[-3.3, 0, s.z]} size={[1.15, 0.2, 1.15]} texture={s.tex} dim={step !== 0} active={step === 0} base={s.base} />
        ))}
        <Tile position={[0.3, 0, 0]} size={[1.75, 0.26, 1.75]} texture={fxTex} texScale={0.5} dim={step === 0} active={engineActive} base={C.accent} glowColor={engineActive ? C.violet : null} />
        <DocTile position={[3.6, 0, 0]} dim={step !== 3} active={step === 3} base={step === 3 ? C.mint : null} />
        {sources.map((s, i) => (
          <Wire key={i} from={[-2.55, 0.05, s.z]} to={[-0.85, 0.05, 0]} active={step === 0} dim={step !== 0} delay={i * 0.2} period={1.4} />
        ))}
        <Wire from={[1.4, 0.05, 0]} to={[2.95, 0.05, 0]} active={step === 3} delay={0.1} period={1.4} />
        {engineActive && (
          <>
            <Satellite radius={1.55} y={1.05} color={C.amber} phase={0} reduce={reduce} />
            <Satellite radius={1.55} y={1.1} color={C.violet} phase={Math.PI} speed={-0.7} reduce={reduce} />
            <Beam position={[0.3, 0, 0]} color={C.accent} />
          </>
        )}
        {step === 0 && <Beam position={[-3.3, 0, 0]} color={C.sky} width={4.6} />}
        {step === 3 && <Beam position={[3.6, 0, 0]} color={C.mint} />}
        <Burst position={[0.3, 0.1, 0]} trigger={stepBurst} color={engineActive ? C.accent : C.sky} />
        {step === 3 && <Burst position={[3.6, 0.2, 0]} trigger={stepBurst + 300} color={C.mint} />}
        <group key={step}>
          {step === 0 &&
            sources.map((s, i) => (
              <Billboard key={i} position={[-3.3, 1.55, s.z]} phase={i} reduce={reduce} fade={!reduce}
                spec={{ lines: [{ text: "✓ Authorized", color: C.green, size: 24 }], size: 24, h: 0.42 }} />
            ))}
          {step === 1 && (
            <>
              <Billboard position={[0.3, 2.0, 0]} reduce={reduce}
                spec={{ lines: [{ text: "Northbeam Media · Client", size: 24 }, { text: "June 2025", color: C.accent, size: 21 }], size: 24, h: 0.78 }} />
              <Chip position={[-3.3, 2.5, 1.6]} value="3" label="sources connected" color={C.sky} delay={0.35} reduce={reduce} />
            </>
          )}
          {step === 2 && (
            <>
              <Billboard position={[0.3, 2.0, 0]} reduce={reduce}
                spec={{ lines: [{ text: "Fluxvex is assembling…", size: 24 }, { text: "Campaign metrics · Channel results · Summary", size: 17, color: C.green, weight: 600 }], size: 24, h: 0.82 }} />
              <AssemblingBar />
            </>
          )}
          {step === 3 && (
            <>
              <Billboard position={[3.6, 1.8, -0.5]} reduce={reduce} spec={{ pill: true, lines: [{ text: "Export PDF", color: "#FFFFFF", size: 22 }], h: 0.5 }} />
              <Billboard position={[3.6, 1.15, 0.6]} reduce={reduce} spec={{ lines: [{ text: "Schedule send", color: C.soft, size: 21 }], size: 21, h: 0.44 }} />
              <Chip position={[1.9, 2.0, -1.3]} value="2.4x" label="ROAS · June" color={C.mint} delay={0.3} reduce={reduce} />
            </>
          )}
        </group>
      </IsoWorld>
    </>
  );
}

/* ---------- Why a prompt isn't a reporting system ---------- */

export function PromptScene({ input, reduce, zoom }) {
  const q = useIconTexture(HelpCircle, "ic-q", "#6B6F76");
  const msg = useIconTexture(MessageSquare, "ic-msg", "#6B6F76");
  const rep = useIconTexture(Repeat, "ic-rep", "#6B6F76");
  const inkGlow = useGlowTexture("#101014");
  const pkt = useRef(null);
  useFrame((s) => {
    if (reduce) return;
    const a = s.clock.elapsedTime * ((2 * Math.PI) / 7);
    if (pkt.current) pkt.current.position.set(Math.cos(a) * 1.9, 0.14, Math.sin(a) * 1.9);
  });
  const circle = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      pts.push([Math.cos(a) * 1.9, 0.02, Math.sin(a) * 1.9]);
    }
    return pts;
  }, []);
  const tiles = [
    { tex: q, a: Math.PI / 2 },
    { tex: msg, a: Math.PI * 2.1 },
    { tex: rep, a: Math.PI * 3.3 },
  ];
  return (
    <>
      <Cam zoom={zoom} />
      <IsoWorld input={input} reduce={reduce} interactive={false} ground={12}>
        <Line points={circle} dashed dashSize={0.14} gapSize={0.1} lineWidth={1.4} color="#9B9DA3" transparent opacity={0.8} />
        <sprite ref={pkt} scale={[0.3, 0.3, 1]}>
          <spriteMaterial map={inkGlow} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.9} />
        </sprite>
        {tiles.map((t, i) => (
          <group key={i} position={[Math.cos(t.a) * 1.9, 0, Math.sin(t.a) * 1.9]}>
            <Tile size={[0.95, 0.18, 0.95]} texture={t.tex} interactive={false} />
          </group>
        ))}
        <Billboard position={[0, 2.35, 0]} reduce={reduce}
          spec={{ lines: [{ text: "\u201CClaude, how did the client's ads do in June?\u201D", size: 23 }, { text: "· · ·", size: 22, color: "#8A8C93" }], size: 23, h: 0.92 }} />
      </IsoWorld>
    </>
  );
}

export function PipelineScene({ input, reduce, zoom, visible }) {
  const texs = [
    useIconTexture(Plug, "ic-plug"),
    useIconTexture(SlidersHorizontal, "ic-sld"),
    useIconTexture(Sparkles, "ic-spk"),
    useIconTexture(Send, "ic-send"),
  ];
  const loopGlow = useGlowTexture(C.accent);
  const xs = [-3.9, -1.3, 1.3, 3.9];
  const bases = [C.accent, C.violet, C.amber, C.mint];
  const pkt = useRef(null);
  const [burst, setBurst] = useState(0);
  useEffect(() => {
    if (reduce || !visible) return undefined;
    setBurst(performance.now());
    const id = setInterval(() => setBurst(performance.now()), 3200);
    return () => clearInterval(id);
  }, [reduce, visible]);
  useFrame((s) => {
    if (!pkt.current || reduce) return;
    const tt = (s.clock.elapsedTime / 3) % 1;
    pkt.current.position.set(-3.9 + tt * 7.8, 0.12, 1.35);
  });
  return (
    <>
      <Cam zoom={zoom} />
      <IsoWorld input={input} reduce={reduce} ground={18}>
        {xs.map((x, i) => (
          <Tile key={i} position={[x, 0, 0]} size={[1.2, 0.2, 1.2]} texture={texs[i]} texScale={0.55} active={i === 2} base={bases[i]} glowColor={i === 2 ? C.amber : null} />
        ))}
        <Burst position={[3.9, 0.15, 0]} trigger={burst} color={C.mint} />
        {xs.slice(0, -1).map((x, i) => (
          <Wire key={i} from={[x + 0.85, 0.05, 0]} to={[xs[i + 1] - 0.85, 0.05, 0]} delay={i * 0.25} period={1.3} />
        ))}
        <Line points={[[3.9, 0.014, 1.35], [-3.9, 0.014, 1.35]]} dashed dashSize={0.14} gapSize={0.1} lineWidth={1.3} color={C.accent} transparent opacity={0.3} />
        <sprite ref={pkt} scale={[0.28, 0.28, 1]}>
          <spriteMaterial map={loopGlow} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.55} />
        </sprite>
        <Billboard position={[3.9, 1.7, 0]} reduce={reduce} spec={{ pill: true, lines: [{ text: "Client-ready", color: "#FFFFFF", size: 22 }], h: 0.52 }} />
        <Billboard position={[0, 2.3, 0.4]} reduce={reduce} spec={{ lines: [{ text: "Same dependable loop, every cycle", size: 24 }], size: 24, h: 0.52 }} />
      </IsoWorld>
    </>
  );
}

/* ---------- FeatureGrid — three islands ---------- */

function ReportBoard() {
  const tex = useCanvasTexture(660, 520, (ctx, w, h) => {
    ctx.fillStyle = "#FFFFFF";
    const r = 26;
    ctx.beginPath();
    ctx.roundRect(4, 4, w - 8, h - 8, r);
    ctx.fill();
    ctx.strokeStyle = "rgba(16,16,20,0.10)";
    ctx.lineWidth = 3;
    ctx.stroke();
    const rows = [
      ["Campaign metrics", "12", false],
      ["Channel results", "+24", true],
      ["Audience insights", "8", false],
    ];
    ctx.font = '600 34px "Inter Tight", Inter, sans-serif';
    rows.forEach(([label, count, hot], i) => {
      const y = 80 + i * 150;
      if (hot) {
        ctx.fillStyle = "rgba(61,67,232,0.10)";
        ctx.beginPath();
        ctx.roundRect(24, y - 52, w - 48, 116, 18);
        ctx.fill();
        ctx.fillStyle = C.accent;
        ctx.beginPath();
        ctx.arc(56, y + 4, 11, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = "rgba(16,16,20,0.3)";
        ctx.beginPath();
        ctx.arc(56, y + 4, 11, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = hot ? C.ink : "#5B5F68";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(label, 84, y + 6);
      ctx.fillStyle = hot ? C.accent : "rgba(16,16,20,0.06)";
      ctx.beginPath();
      ctx.roundRect(w - 150, y - 28, 106, 62, 31);
      ctx.fill();
      ctx.fillStyle = hot ? "#FFFFFF" : "#5B5F68";
      ctx.textAlign = "center";
      ctx.font = '700 30px "Inter Tight", Inter, sans-serif';
      ctx.fillText(count, w - 97, y + 6);
    });
  });
  return (
    <group position={[3.1, 0, 0]}>
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[2.5, 0.12, 2.1]} />
        <meshBasicMaterial color={C.white} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.125, 0]}>
        <planeGeometry args={[2.34, 1.84]} />
        <meshBasicMaterial map={tex} transparent depthWrite={false} />
      </mesh>
    </group>
  );
}

export function FeatureSourcesScene({ input, reduce, visible, zoom }) {
  const [gTex, mTex, aTex, fxTex] = useBrandTextures();
  const sources = [
    { tex: gTex, pos: [0.3, 0, -3.0], base: C.sky, from: [0.35, 0.05, -1.9], to: [0.38, 0.05, -1.0] },
    { tex: mTex, pos: [-2.9, 0, 0.7], base: C.blue, from: [-1.12, 0.05, 0.32], to: [-0.53, 0.05, 0.2] },
    { tex: aTex, pos: [-1.8, 0, 2.7], base: C.amber, from: [-1.14, 0.05, 1.88], to: [-0.22, 0.05, 0.76] },
  ];
  return (
    <>
      <Cam zoom={zoom} />
      <IsoWorld input={input} reduce={reduce} ground={14}>
        <PulseRings position={[0.4, 0.025, 0]} input={input} />
        <Beam position={[0.4, 0, 0]} color={C.accent} height={2.1} width={1.5} opacity={0.13} />
        {sources.map((s, i) => (
          <Tile key={i} position={s.pos} size={[1.1, 0.2, 1.1]} texture={s.tex} base={s.base} />
        ))}
        {sources.map((s, i) => (
          <Wire key={i} from={s.from} to={s.to} delay={i * 0.22} period={1.4} />
        ))}
        <Tile position={[0.4, 0, 0]} size={[1.7, 0.3, 1.7]} texture={fxTex} texScale={0.5} active base={C.accent} glowColor={C.accent} />
        <Satellite radius={1.6} y={0.95} color={C.violet} phase={0.6} reduce={reduce} />
        <Satellite radius={1.6} y={1.02} color={C.amber} phase={Math.PI + 0.6} speed={-0.75} reduce={reduce} />
        <Wire from={[1.3, 0.05, 0.12]} to={[1.8, 0.05, 0.08]} delay={0.55} period={1.5} />
        <ReportBoard />
        <Chip position={[0.4, 2.35, 0]} value="3 → 1" label="sources · one schema" color={C.accent} delay={0.4} reduce={reduce} />
      </IsoWorld>
    </>
  );
}

/* Drafting document — skeleton lines fill in with violet ink, one by one */
function DraftDoc({ reduce }) {
  const tex = useCanvasTexture(760, 560, (ctx, w, h) => {
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.roundRect(4, 4, w - 8, h - 8, 24);
    ctx.fill();
    ctx.strokeStyle = "rgba(16,16,20,0.10)";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "rgba(16,16,20,0.92)";
    ctx.font = '700 46px "Inter Tight", Inter, sans-serif';
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("June summary", 48, 92);
    ctx.fillStyle = "rgba(16,16,20,0.07)";
    [200, 300, 400].forEach((y, i) => {
      ctx.beginPath();
      ctx.roundRect(48, y - 22, [600, 430, 510][i], 44, 22);
      ctx.fill();
    });
  });
  const barTex = useCanvasTexture(160, 24, (ctx) => {
    ctx.fillStyle = C.violet;
    ctx.beginPath();
    ctx.roundRect(0, 0, 160, 24, 12);
    ctx.fill();
  });
  const LINES = [
    { z: -0.269, w: 2.01 },
    { z: 0.011, w: 1.44 },
    { z: 0.247, w: 1.71 },
  ];
  const bars = useRef([]);
  const pen = useRef(null);
  const glow = useGlowTexture(C.violet);
  useFrame((s) => {
    const T = 4.8;
    const t = reduce ? LINES.length : ((s.clock.elapsedTime % T) / T) * LINES.length;
    const idx = Math.min(LINES.length - 1, Math.floor(t));
    const prog = Math.min(1, t - idx);
    bars.current.forEach((b, i) => {
      if (!b) return;
      const p = i < idx ? 1 : i === idx ? Math.max(0.02, prog) : 0;
      b.visible = p > 0.02;
      b.scale.x = Math.max(0.001, p);
      b.position.x = -1.12 + (LINES[i].w * p) / 2;
    });
    if (pen.current) {
      const on = !reduce && prog > 0.02 && prog < 0.99;
      pen.current.visible = on;
      if (on) pen.current.position.set(-1.12 + (LINES[idx].w * prog) / 2 + 0.07, 0.17, LINES[idx].z);
    }
  });
  return (
    <group position={[1.55, 0, 0.15]}>
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[2.75, 0.12, 2.05]} />
        <meshBasicMaterial color={C.white} />
        <Edges threshold={15} color={C.hairline} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.125, 0]}>
        <planeGeometry args={[2.55, 1.88]} />
        <meshBasicMaterial map={tex} transparent depthWrite={false} />
      </mesh>
      {LINES.map((ln, i) => (
        <mesh
          key={i}
          ref={(r) => (bars.current[i] = r)}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-1.12 + ln.w / 2, 0.135, ln.z]}
          scale={[0.001, 1, 1]}
          visible={false}
        >
          <planeGeometry args={[ln.w, 0.15]} />
          <meshBasicMaterial map={barTex} transparent depthWrite={false} opacity={0.9} />
        </mesh>
      ))}
      <sprite ref={pen} position={[0, 0.17, 0]} scale={[0.42, 0.42, 1]} renderOrder={12} visible={false}>
        <spriteMaterial map={glow} transparent depthWrite={false} depthTest={false} blending={THREE.AdditiveBlending} opacity={0.95} />
      </sprite>
    </group>
  );
}

export function FeatureAiScene({ input, reduce, visible, zoom }) {
  const [gTex, mTex, aTex, fxTex] = useBrandTextures();
  const zs = [-1.5, 0, 1.5];
  const bases = [C.sky, C.blue, C.amber];
  const [dotFrame, setDotFrame] = useState(0);
  useEffect(() => {
    if (reduce || !visible) return undefined;
    const id = setInterval(() => setDotFrame((f) => (f + 1) % 3), 420);
    return () => clearInterval(id);
  }, [reduce, visible]);
  return (
    <>
      <Cam zoom={zoom} />
      <IsoWorld input={input} reduce={reduce} ground={14}>
        {zs.map((z, i) => (
          <Tile key={i} position={[-3.6, 0, z]} size={[0.95, 0.18, 0.95]} texture={[gTex, mTex, aTex][i]} base={bases[i]} />
        ))}
        {zs.map((z, i) => (
          <Wire key={i} from={[-3.05, 0.05, z * 0.6]} to={[-2.02, 0.05, 0]} delay={i * 0.2} period={1.4} />
        ))}
        <Tile position={[-1.35, 0, 0]} size={[1.3, 0.26, 1.3]} texture={fxTex} texScale={0.5} active base={C.violet} glowColor={C.violet} />
        <Wire from={[-0.65, 0.05, 0]} to={[0.14, 0.05, 0.1]} delay={0.45} period={1.4} />
        <DraftDoc reduce={reduce} />
        <Beam position={[1.55, 0, 0.15]} color={C.violet} height={2.7} width={2.1} opacity={0.12} />
        <group position={[1.55, 0, 0.15]}>
          <Satellite radius={2.05} y={1.3} color={C.amber} phase={0.8} reduce={reduce} />
          <Satellite radius={2.05} y={1.38} color={C.sky} phase={Math.PI + 0.8} speed={-0.8} size={0.11} reduce={reduce} />
        </group>
        <Billboard position={[-1.35, 1.75, 0]} reduce={reduce}
          spec={{ lines: [{ text: "AI · drafting summary" + "·".repeat(dotFrame + 1), size: 24 }], size: 24, h: 0.58 }} />
        <Billboard position={[2.45, 1.85, -0.85]} reduce={reduce} phase={1.2}
          spec={{ lines: [{ text: "Meta Ads · ROAS 2.4x", size: 24 }], size: 24, h: 0.58 }} />
        <Chip position={[-0.9, 0.95, 2.6]} value="+24%" label="channel results" color={C.mint} delay={0.4} reduce={reduce} />
      </IsoWorld>
    </>
  );
}

function Dial({ position }) {
  const ringTex = useCanvasTexture(160, 160, (ctx) => {
    ctx.strokeStyle = "#E4E2DB";
    ctx.lineWidth = 11;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(80, 80, 62, 0, Math.PI * 2);
    ctx.stroke();
  });
  const arcTex = useCanvasTexture(160, 160, (ctx) => {
    ctx.strokeStyle = C.accent;
    ctx.lineWidth = 11;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(80, 80, 62, -Math.PI / 2, -Math.PI / 2 + 4.4);
    ctx.stroke();
  });
  const arc = useRef(null);
  const timeTex = useTextTexture({ lines: [{ text: "00:03", size: 30, weight: 700 }], size: 30, h: 0.4 });
  useFrame((s) => {
    if (arc.current) arc.current.material.rotation = -s.clock.elapsedTime * 1.1;
  });
  return (
    <group position={position}>
      <sprite scale={[1.4, 1.4, 1]}>
        <spriteMaterial map={ringTex} transparent depthWrite={false} />
      </sprite>
      <sprite ref={arc} scale={[1.4, 1.4, 1]}>
        <spriteMaterial map={arcTex} transparent depthWrite={false} />
      </sprite>
      <sprite position={[0, 0, 0.01]} scale={[0.4 * (timeTex.aspect || 3), 0.4, 1]} renderOrder={5}>
        <spriteMaterial map={timeTex} transparent depthWrite={false} depthTest={false} />
      </sprite>
    </group>
  );
}

export function FeatureDeliveryScene({ input, reduce, visible, zoom }) {
  const reqTex = useCanvasTexture(360, 480, (ctx, w, h) => {
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.roundRect(2, 2, w - 4, h - 4, 20);
    ctx.fill();
    ctx.fillStyle = C.ink;
    ctx.beginPath();
    ctx.roundRect(20, 20, 64, 64, 12);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = '700 40px "Inter Tight", Inter, sans-serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("N", 52, 54);
    ctx.fillStyle = "rgba(61,67,232,0.55)";
    ctx.fillRect(20, 104, w - 40, 12);
    ctx.fillStyle = "rgba(16,16,20,0.15)";
    ctx.fillRect(20, 132, w - 90, 8);
    ctx.fillStyle = "rgba(16,16,20,0.10)";
    ctx.fillRect(20, 152, w - 140, 8);
  });
  const spk = useIconTexture(Sparkles, "ic-spk2");
  return (
    <>
      <Cam zoom={zoom} />
      <IsoWorld input={input} reduce={reduce} ground={14}>
        <group position={[-3.5, 0, 0]}>
          <mesh position={[0, 0.09, 0]}>
            <boxGeometry args={[1.05, 0.18, 1.35]} />
            <meshBasicMaterial color={C.white} />
            <Edges threshold={15} color={C.hairline} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.185, 0]}>
            <planeGeometry args={[0.62, 0.84]} />
            <meshBasicMaterial map={reqTex} transparent depthWrite={false} />
          </mesh>
        </group>
        <Wire from={[-2.85, 0.05, 0]} to={[-1.2, 0.05, 0]} period={1.3} />
        <Tile position={[-0.4, 0, 0]} size={[1.3, 0.24, 1.3]} texture={spk} texScale={0.55} active base={C.violet} glowColor={C.violet} />
        <Wire from={[0.45, 0.05, 0]} to={[2.0, 0.05, 0]} delay={0.4} period={1.3} />
        <group position={[3.0, 0, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
            <planeGeometry args={[1.24, 1.6]} />
            <meshBasicMaterial color={C.mint} transparent opacity={0.9} depthWrite={false} />
          </mesh>
          <mesh position={[0, 0.09, 0]}>
            <boxGeometry args={[1.05, 0.18, 1.35]} />
            <meshBasicMaterial color={C.white} />
            <Edges threshold={15} color={C.hairlineActive} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.185, 0]}>
            <planeGeometry args={[0.62, 0.84]} />
            <meshBasicMaterial map={reqTex} transparent depthWrite={false} />
          </mesh>
        </group>
        <Billboard position={[-2.2, 2.0, 0.9]} reduce={reduce}
          spec={{ lines: [{ text: "Generating report…", size: 24 }, { text: "3 integrations live", size: 19, color: C.accent, weight: 700 }], size: 24, h: 0.9 }} />
        <Dial position={[3.0, 1.7, -1.0]} />
      </IsoWorld>
    </>
  );
}

/* ---------- Platform — orbiting sources around the hub ---------- */

function OrbitWire({ index, count, radius, reduce }) {
  const line = useRef(null);
  const pkt = useRef(null);
  const glow = useGlowTexture(C.accent);
  const curve = useMemo(() => {
    const v = (x, y, z) => new THREE.Vector3(x, y, z);
    return new THREE.QuadraticBezierCurve3(v(0, 0, 0), v(0, 0, 0), v(0, 0, 0));
  }, []);
  useFrame((s) => {
    if (!line.current || !pkt.current) return;
    const a = s.clock.elapsedTime * (reduce ? 0 : 0.22) + (index * Math.PI * 2) / count;
    curve.v0.set(Math.cos(a) * radius, 0.14, Math.sin(a) * radius);
    curve.v1.set(Math.cos(a) * radius * 0.45, 1.15, Math.sin(a) * radius * 0.45);
    curve.v2.set(0, 0.32, 0);
    const pts = curve.getPoints(24);
    line.current.geometry.setPositions(pts.flatMap((p) => [p.x, p.y, p.z]));
    const tt = ((s.clock.elapsedTime / 1.5) + index * 0.33) % 1;
    pkt.current.position.copy(curve.getPoint(tt));
  });
  return (
    <>
      <Line ref={line} points={Array.from({ length: 25 }, () => [0, 0, 0])} dashed dashSize={0.15} gapSize={0.1} lineWidth={1.4} color={C.accent} transparent opacity={0.7} />
      <sprite ref={pkt} scale={[0.36, 0.36, 1]}>
        <spriteMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
    </>
  );
}

export function PlatformScene({ input, reduce, visible, zoom }) {
  const [gTex, mTex, aTex, fxTex] = useBrandTextures();
  const orbit = useRef(null);
  const radius = 2.8;
  useFrame((s, dt) => {
    if (!orbit.current || reduce) return;
    const speed = input.hover ? 0.34 : 0.18;
    orbit.current.rotation.y += dt * speed;
    orbit.current.rotation.y += input.yaw * 0.02;
  });
  const names = ["Google Ads", "Meta Ads", "GA4"];
  return (
    <>
      <Cam zoom={zoom} target={[0.5, 0.55, 0]} />
      <IsoWorld input={input} reduce={reduce} dragClamp={1.1} ground={18}>
        <PulseRings position={[0, 0.03, 0]} input={input} />
        <Tile position={[0, 0, 0]} size={[1.9, 0.28, 1.9]} texture={fxTex} texScale={0.5} active base={C.accent} glowColor={C.violet} />
        <Burst position={[0, 0.3, 0]} input={input} color={C.amber} count={10} />
        <Satellite radius={1.45} y={1.15} color={C.amber} phase={0.4} reduce={reduce} />
        <Satellite radius={1.45} y={1.2} color={C.violet} phase={Math.PI} speed={-0.75} reduce={reduce} />
        <Satellite radius={1.45} y={1.1} color={C.sky} phase={Math.PI * 0.55} speed={1.15} size={0.11} reduce={reduce} />
        <group ref={orbit}>
          {[gTex, mTex, aTex].map((tex, i) => {
            const a = (i * Math.PI * 2) / 3;
            const orbitBases = [C.sky, C.blue, C.amber];
            return (
              <group key={i} position={[Math.cos(a) * radius, 0, Math.sin(a) * radius]}>
                <Tile size={[1.2, 0.2, 1.2]} texture={tex} base={orbitBases[i]} />
                <Billboard position={[0, 1.25, 0]} reduce={reduce} phase={i * 1.3}
                  spec={{ lines: [{ text: names[i], size: 20 }], size: 20, h: 0.42 }} />
              </group>
            );
          })}
          {[0, 1, 2].map((i) => (
            <OrbitWire key={i} index={i} count={3} radius={radius} reduce={reduce} />
          ))}
        </group>
        <Wire from={[1.0, 0.05, 0]} to={[3.6, 0.05, 0]} delay={0.5} period={1.5} />
        <DocTile position={[4.4, 0, 0]} base={C.mint} />
        <Billboard position={[4.4, 1.9, 0]} reduce={reduce} phase={2}
          spec={{ lines: [{ text: "✓ Client report ready", color: C.green, size: 22 }], size: 22, h: 0.5 }} />
        <Billboard position={[4.4, 1.2, 1.1]} reduce={reduce} spec={{ pill: true, lines: [{ text: "Export PDF", color: "#FFFFFF", size: 20 }], h: 0.46 }} />
        <Chip position={[-4.55, 2.0, -1.1]} value="2.4x" label="ROAS · June" color={C.mint} delay={0.3} reduce={reduce} phase={1} />
        <Chip position={[-4.0, 1.45, 1.75]} value="+38%" label="conversions" color={C.accent} delay={0.7} reduce={reduce} phase={2.2} />
      </IsoWorld>
    </>
  );
}

/* ---------- Our vision — the ecosystem, zoomed out ---------- */

export function VisionScene({ input, reduce, visible, zoom }) {
  const [gTex, mTex, aTex, fxTex] = useBrandTextures();
  const zs = [-1.9, 0, 1.9];
  return (
    <>
      <Cam zoom={zoom} />
      <IsoWorld input={input} reduce={reduce} dragClamp={0.8} ground={18}>
        {zs.map((z, i) => (
          <Tile key={i} position={[-3.8, 0, z]} size={[1.15, 0.2, 1.15]} texture={[gTex, mTex, aTex][i]} base={[C.sky, C.blue, C.amber][i]} />
        ))}
        {zs.map((z, i) => (
          <Wire key={i} from={[-3.0, 0.05, z]} to={[-1.0, 0.05, 0]} delay={i * 0.2} period={1.4} />
        ))}
        <Tile position={[-0.15, 0, 0]} size={[1.6, 0.26, 1.6]} texture={fxTex} texScale={0.5} active base={C.accent} glowColor={C.violet} />
        <Satellite radius={1.5} y={1.1} color={C.amber} phase={1.2} reduce={reduce} />
        <Satellite radius={1.5} y={1.15} color={C.violet} phase={Math.PI + 1.2} speed={-0.8} reduce={reduce} />
        <Beam position={[-0.15, 0, 0]} color={C.accent} />
        <Wire from={[0.9, 0.05, 0]} to={[2.5, 0.05, 0]} delay={0.6} period={1.4} />
        <DocTile position={[3.3, 0, 0]} base={C.mint} />
        <Billboard position={[-0.2, 2.2, 1.4]} reduce={reduce} phase={0} spec={{ lines: [{ text: "One connected pipeline", size: 21 }], size: 21, h: 0.46 }} />
        <Billboard position={[0.2, 2.0, -1.2]} reduce={reduce} phase={1.4} spec={{ lines: [{ text: "✓ Fluxvex AI · drafting", color: C.green, size: 21 }], size: 21, h: 0.46 }} />
        <Billboard position={[3.3, 1.7, 1.0]} reduce={reduce} phase={2.6} spec={{ lines: [{ text: "On schedule", size: 21 }], size: 21, h: 0.44 }} />
        <Chip position={[-2.2, 2.4, -1.6]} value="5 → 500" label="clients, one workflow" color={C.violet} delay={0.5} reduce={reduce} phase={0.8} />
      </IsoWorld>
    </>
  );
}

/* ---------- Inside Fluxvex — three layers fan apart on hover ---------- */

export function LayersScene({ input, reduce, visible, zoom }) {
  const dataTex = useCanvasTexture(720, 470, (ctx, w, h) => {
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.roundRect(4, 4, w - 8, h - 8, 22);
    ctx.fill();
    ctx.fillStyle = C.accent;
    ctx.beginPath();
    ctx.roundRect(4, 4, w - 8, 74, 22);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = '700 30px "Inter Tight", Inter, sans-serif';
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.fillText("CONNECTED DATA", 36, 42);
    for (let r = 0; r < 3; r++) {
      const y = 120 + r * 112;
      ctx.fillStyle = ["rgba(56,189,248,0.16)", "rgba(47,125,246,0.14)", "rgba(245,197,24,0.18)"][r];
      ctx.beginPath();
      ctx.roundRect(36, y, 130, 56, 14);
      ctx.fill();
      ctx.fillStyle = "rgba(16,16,20,0.30)";
      ctx.fillRect(196, y + 8, w - 260, 16);
      ctx.fillStyle = "rgba(16,16,20,0.16)";
      ctx.fillRect(196, y + 36, w - 380, 12);
    }
  });
  const aiTex = useCanvasTexture(720, 470, (ctx, w, h) => {
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.roundRect(4, 4, w - 8, h - 8, 22);
    ctx.fill();
    ctx.fillStyle = C.violet;
    ctx.beginPath();
    ctx.roundRect(4, 4, w - 8, 74, 22);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = '700 30px "Inter Tight", Inter, sans-serif';
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.fillText("FLUXVEX AI", 36, 42);
    ctx.fillStyle = "rgba(123,92,255,0.12)";
    [120, 204, 288].forEach((y, i) => {
      ctx.beginPath();
      ctx.roundRect(36, y, w - 72 - i * 60, 50, 14);
      ctx.fill();
    });
    ctx.fillStyle = C.violet;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(58, 145 + i * 84, 9, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  const brandTex = useCanvasTexture(720, 470, (ctx, w, h) => {
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.roundRect(4, 4, w - 8, h - 8, 22);
    ctx.fill();
    ctx.fillStyle = C.mint;
    ctx.beginPath();
    ctx.roundRect(4, 4, w - 8, 74, 22);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = '700 30px "Inter Tight", Inter, sans-serif';
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.fillText("BRANDED DELIVERY", 36, 42);
    ctx.fillStyle = C.accent;
    ctx.fillRect(36, 110, w - 72, 46);
    ctx.fillStyle = C.ink;
    ctx.beginPath();
    ctx.roundRect(36, 186, 56, 56, 10);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = '700 30px "Inter Tight", Inter, sans-serif';
    ctx.textAlign = "center";
    ctx.fillText("N", 64, 215);
    ctx.fillStyle = "rgba(16,16,20,0.14)";
    [196, 258, 320].forEach((y, i) => {
      ctx.beginPath();
      ctx.roundRect(110, y, w - 146 - i * 70, 36, 10);
      ctx.fill();
    });
  });
  const grp = useRef(null);
  const labelTex = [
    useTextTexture({ lines: [{ text: "Connected data", size: 22, color: C.soft }], size: 22, h: 0.44 }),
    useTextTexture({ lines: [{ text: "Fluxvex AI", size: 22, color: C.violet }], size: 22, h: 0.44 }),
    useTextTexture({ lines: [{ text: "Branded delivery", size: 22, color: C.mint }], size: 22, h: 0.44 }),
  ];
  const chipTex = [
    useTextTexture({ lines: [{ text: "3 sources · one schema", size: 19, weight: 700, color: "#FFFFFF" }], pill: true, bg: C.accent, h: 0.38 }),
    useTextTexture({ lines: [{ text: "Drafts · flags anomalies", size: 19, weight: 700, color: "#FFFFFF" }], pill: true, bg: C.violet, h: 0.38 }),
    useTextTexture({ lines: [{ text: "Your logo · your voice", size: 19, weight: 700, color: "#FFFFFF" }], pill: true, bg: C.mint, h: 0.38 }),
  ];
  const sep = useRef(1);
  useFrame((s, dt) => {
    if (!grp.current) return;
    const target = input.hover && !reduce ? 1.48 : 1;
    sep.current += (target - sep.current) * Math.min(1, dt * 6);
    grp.current.children.forEach((child, i) => {
      if (child.userData.baseY !== undefined) {
        /* fan pivots around the middle layer so nothing clips the frame */
        child.position.y = (child.userData.baseY - 1.14) * sep.current + 1.14 + (reduce ? 0 : Math.sin(s.clock.elapsedTime * 0.9 + i * 1.1) * 0.05);
      }
    });
  });
  const slabs = [dataTex, aiTex, brandTex];
  const plate = [C.accent, C.violet, C.mint];
  return (
    <>
      <Cam zoom={zoom} target={[0, 0.82, 0]} />
      <IsoWorld input={input} reduce={reduce} interactive={false} ground={14}>
        <group ref={grp}>
          {slabs.map((tex, i) => {
            const baseY = 0.34 + i * 0.9;
            return (
              <group key={i} userData={{ baseY }} position={[0, baseY, 0]}>
                <mesh position={[0, -0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                  <planeGeometry args={[4.35, 2.94]} />
                  <meshBasicMaterial color={plate[i]} transparent opacity={0.28} depthWrite={false} />
                </mesh>
                <mesh>
                  <boxGeometry args={[4.1, 0.14, 2.7]} />
                  <meshBasicMaterial color={C.white} />
                  <Edges threshold={15} color={i === 1 ? C.hairlineActive : C.hairline} />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.075, 0]}>
                  <planeGeometry args={[3.9, 2.52]} />
                  <meshBasicMaterial map={tex} transparent depthWrite={false} />
                </mesh>
                <sprite position={[2.72, 0.16, -0.2]} scale={[0.5 * (labelTex[i].aspect || 3), 0.5, 1]} renderOrder={10}>
                  <spriteMaterial map={labelTex[i]} transparent depthWrite={false} depthTest={false} />
                </sprite>
                <sprite position={[-2.72, 0.05, (i - 1) * 1.65]} scale={[0.4 * (chipTex[i].aspect || 4), 0.4, 1]} renderOrder={10}>
                  <spriteMaterial map={chipTex[i]} transparent depthWrite={false} depthTest={false} opacity={0.97} />
                </sprite>
              </group>
            );
          })}
          <Satellite radius={2.9} y={1.9} color={C.amber} phase={0.8} size={0.11} reduce={reduce} speed={-1.2} />
          <Satellite radius={2.9} y={2.0} color={C.sky} phase={Math.PI * 0.7} size={0.1} reduce={reduce} speed={1.4} />
        </group>
      </IsoWorld>
    </>
  );
}

/* ---------- scene registry ---------- */
export const SCENES = {
  workflow: WorkflowScene,
  prompt: PromptScene,
  pipeline: PipelineScene,
  featureSources: FeatureSourcesScene,
  featureAi: FeatureAiScene,
  featureDelivery: FeatureDeliveryScene,
  platform: PlatformScene,
  vision: VisionScene,
  layers: LayersScene,
};

/* ---------- shared doc tile ---------- */
function DocTile({ position, dim = false, active = false }) {
  const tex = useCanvasTexture(360, 490, (ctx, w, h) => {
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.roundRect(2, 2, w - 4, h - 4, 18);
    ctx.fill();
    ctx.fillStyle = "rgba(61,67,232,0.7)";
    ctx.fillRect(18, 18, w - 36, 22);
    ctx.fillStyle = "rgba(16,16,20,0.15)";
    ctx.fillRect(18, 56, w - 80, 10);
    ctx.fillStyle = "rgba(16,16,20,0.10)";
    ctx.fillRect(18, 76, w - 140, 10);
    ctx.fillStyle = C.ink;
    ctx.beginPath();
    ctx.roundRect(18, h - 60, 40, 40, 8);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = '700 24px "Inter Tight", Inter, sans-serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("N", 38, h - 39);
  });
  return (
    <group position={position}>
      <mesh position={[0, 0.09, 0]}>
        <boxGeometry args={[1.0, 0.18, 1.35]} />
        <meshBasicMaterial color={dim ? C.dim : C.white} />
        <Edges threshold={15} color={active ? C.hairlineActive : C.hairline} />
      </mesh>
      {!dim && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.185, 0]}>
          <planeGeometry args={[0.6, 0.82]} />
          <meshBasicMaterial map={tex} transparent depthWrite={false} />
        </mesh>
      )}
    </group>
  );
}
