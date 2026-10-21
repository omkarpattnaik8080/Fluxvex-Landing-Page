/* Minimal markdown renderer for the legal documents (headings, tables, lists, bold, fill-in chips). */

function renderInline(text, keyBase) {
  const nodes = [];
  const regex = /(\*\*[^*]+\*\*)|(\[[^\][]{3,200}\])/g;
  let last = 0;
  let m;
  let k = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(<span key={`${keyBase}-t${k++}`}>{text.slice(last, m.index)}</span>);
    if (m[1]) {
      nodes.push(
        <strong key={`${keyBase}-b${k++}`} className="font-semibold text-ink">
          {m[1].slice(2, -2)}
        </strong>
      );
    } else {
      nodes.push(
        <span
          key={`${keyBase}-p${k++}`}
          title="To be completed before final publication"
          className="mx-0.5 inline-flex items-center rounded border border-dashed border-accent/50 bg-accent-tint px-1.5 py-0.5 text-[11px] font-medium text-accent"
        >
          {m[2]}
        </span>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(<span key={`${keyBase}-end`}>{text.slice(last)}</span>);
  return nodes;
}

function renderTable(rows) {
  const parsed = rows
    .filter((r) => !/^\|[\s|:-]+\|$/.test(r))
    .map((r) => r.slice(1, -1).split("|").map((c) => c.trim()));
  const [head, ...body] = parsed;
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-line" key="tbl">
      <table className="w-full min-w-[560px] border-collapse text-left text-[13px]">
        <thead>
          <tr className="border-b border-line bg-elevated">
            {head.map((c, i) => (
              <th key={i} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-black/50">
                {renderInline(c, `th${i}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((cells, r) => (
            <tr key={r} className={`border-b border-hairline last:border-b-0 ${r % 2 ? "bg-surface/60" : "bg-page"}`}>
              {cells.map((c, i) => (
                <td key={i} className="px-4 py-3 align-top leading-relaxed text-ink-soft">
                  {renderInline(c, `td${r}-${i}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LegalDoc({ markdown }) {
  const lines = markdown.split("\n");
  const out = [];
  let i = 0;
  let key = 0;
  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();
    if (!t) {
      i += 1;
      continue;
    }
    if (t.startsWith("### ")) {
      out.push(
        <h3 key={key++} className="mt-8 text-[16px] font-semibold text-ink">
          {renderInline(t.slice(4), `h3${key}`)}
        </h3>
      );
      i += 1;
      continue;
    }
    if (t.startsWith("## ")) {
      out.push(
        <h2 key={key++} className="mt-12 border-b border-line pb-2 font-display text-xl font-semibold tracking-tight text-ink">
          {renderInline(t.slice(3), `h2${key}`)}
        </h2>
      );
      i += 1;
      continue;
    }
    if (t.startsWith("# ")) {
      out.push(
        <h1 key={key++} className="font-display text-3xl font-semibold tracking-tighter2 text-ink sm:text-4xl">
          {renderInline(t.slice(2), `h1${key}`)}
        </h1>
      );
      i += 1;
      continue;
    }
    if (t === "---") {
      out.push(<hr key={key++} className="my-10 border-line" />);
      i += 1;
      continue;
    }
    if (t.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(lines[i].trim());
        i += 1;
      }
      out.push(renderTable(rows));
      continue;
    }
    if (t.startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i += 1;
      }
      out.push(
        <ul key={key++} className="mt-3 list-disc space-y-1.5 pl-5 text-[14.5px] leading-relaxed text-ink-soft marker:text-accent/60">
          {items.map((it, j) => (
            <li key={j}>{renderInline(it, `li${key}-${j}`)}</li>
          ))}
        </ul>
      );
      continue;
    }
    if (/^\d+\.\s/.test(t)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i += 1;
      }
      out.push(
        <ol key={key++} className="mt-3 list-decimal space-y-1.5 pl-5 text-[14.5px] leading-relaxed text-ink-soft marker:font-semibold marker:text-ink">
          {items.map((it, j) => (
            <li key={j}>{renderInline(it, `ol${key}-${j}`)}</li>
          ))}
        </ol>
      );
      continue;
    }
    const para = [line];
    i += 1;
    while (i < lines.length && lines[i].trim() && !/^(#{1,3} |---|\||- |\d+\. )/.test(lines[i].trim())) {
      para.push(lines[i]);
      i += 1;
    }
    out.push(
      <p key={key++} className="mt-4 text-[14.5px] leading-[1.75] text-ink-soft">
        {renderInline(para.join(" "), `p${key}`)}
      </p>
    );
  }
  return <div>{out}</div>;
}

export default LegalDoc;
