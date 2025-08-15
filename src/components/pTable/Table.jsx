import React from "react";
import elements from "../../utils/elements.json";
import "./table.css";

// Helper: classnames
function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

// Spacers to shape s/p-block gaps in periods 2–3
const SPACERS = [
  { key: "p2-gap", xStart: 3, xEnd: 12, y: 2 },
  { key: "p3-gap", xStart: 3, xEnd: 12, y: 3 },
];

// Lanthanide/Actinide row labels
const ROW_LABELS = [
  { key: "lanth-label", text: "Lanthanides", xStart: 1, xEnd: 3, y: 8 },
  { key: "act-label", text: "Actinides", xStart: 1, xEnd: 3, y: 9 },
];

/**
 * PeriodicTable component
 * @param {{
 *   assigned?: number[] | Set<number>,
 *   pending?: number[] | Set<number>,
 *   onCellClick?: (el: any) => void,
 *   readOnly?: boolean,
 *   ariaLabel?: string,
 * }} props
 */
export default function PeriodicTable({
  assigned = [],
  pending = [],
  onCellClick,
  readOnly = true,
  ariaLabel = "Periodic table",
}) {
  const assignedSet = assigned instanceof Set ? assigned : new Set(assigned);
  const pendingSet = pending instanceof Set ? pending : new Set(pending);
  const clickable = typeof onCellClick === "function" && !readOnly;

  // Key row configuration
  const keyRowY = 2;
  const keyStartX = 6;
  const keyItems = [
    {
      label: "Available",
      className: "cell family-nonmetal",
      Z: "",
      symbol: "N",
      name: "Nitrogen",
    },
    {
      label: "Pending",
      className: "cell pending",
      Z: "",
      symbol: "N",
      name: "Nitrogen",
    },
    {
      label: "Unavailable",
      className: "cell assigned",
      Z: "",
      symbol: "N",
      name: "Nitrogen",
    },
  ];

  return (
    <div className="periodic-wrapper">
      {/* Key above table headings */}
      <div className="periodic-key" aria-hidden>
        <div className="periodic-key-item">
          <div className="periodic-key-label">Available</div>
          <div className="cell family-nonmetal">
            <div className="number"></div>
            <div className="symbol">N</div>
            <div className="name">Nitrogen</div>
          </div>
        </div>

        <div className="periodic-key-item">
          <div className="periodic-key-label">Pending</div>
          <div className="cell pending">
            <div className="number"></div>
            <div className="symbol">N</div>
            <div className="name">Nitrogen</div>
          </div>
        </div>

        <div className="periodic-key-item">
          <div className="periodic-key-label">Unavailable</div>
          <div className="cell assigned">
            <div className="number"></div>
            <div className="symbol">N</div>
            <div className="name">Nitrogen</div>
          </div>
        </div>
      </div>
      <div className="periodic-group-labels" aria-hidden>
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i}>Group {i + 1}</span>
        ))}
      </div>

      <div className="periodic-grid" role="grid" aria-label={ariaLabel}>
        {SPACERS.map((s) => (
          <div
            key={s.key}
            className="spacer"
            style={{ gridColumn: `${s.xStart} / ${s.xEnd + 1}`, gridRow: s.y }}
            aria-hidden
          />
        ))}

        {ROW_LABELS.map((r) => (
          <div
            key={r.key}
            className="row-label"
            style={{ gridColumn: `${r.xStart} / ${r.xEnd + 1}`, gridRow: r.y }}
            aria-hidden
          >
            <span>↳</span> {r.text}
          </div>
        ))}

        {elements.map((el) => {
          const isAssigned = assignedSet.has(el.Z);
          const isPending = !isAssigned && pendingSet.has(el.Z);
          const familyClass = el.family ? `family-${el.family}` : undefined;
          const className = cx(
            "cell",
            familyClass,
            isAssigned && "assigned",
            isPending && "pending"
          );
          const tabIndex = clickable ? 0 : -1;
          const handle = clickable
            ? () => onCellClick && onCellClick(el)
            : undefined;

          return (
            <div
              key={el.Z}
              role={clickable ? "button" : undefined}
              tabIndex={tabIndex}
              aria-pressed={clickable ? false : undefined}
              aria-label={`${el.name} (${el.symbol}), atomic number ${el.Z}`}
              className={className}
              data-atomic={el.Z}
              data-symbol={el.symbol}
              data-name={el.name}
              data-family={el.family}
              style={{
                gridColumn: el.x,
                gridRow: el.y,
                cursor: clickable ? "pointer" : "default",
              }}
              onClick={handle}
              onKeyDown={
                clickable
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ")
                        handle && handle();
                    }
                  : undefined
              }
            >
              <div className="number">{el.Z}</div>
              <div className="symbol">{el.symbol}</div>
              <div className="name">{el.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
