import elements from "../../utils/elements.json";
import "./table.css";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

const SPACERS = [
  { key: "p2-gap", xStart: 3, xEnd: 12, y: 2 },
  { key: "p3-gap", xStart: 3, xEnd: 12, y: 3 },
];

const ROW_LABELS = [
  { key: "lanth-label", text: "Lanthanides", xStart: 1, xEnd: 3, y: 8 },
  { key: "act-label", text: "Actinides", xStart: 1, xEnd: 3, y: 9 },
];

export default function PeriodicTable({
  assigned = [],
  onCellClick,
  readOnly = true,
  ariaLabel = "Periodic table",
}) {
  const assignedSet = assigned instanceof Set ? assigned : new Set(assigned);
  const clickable = typeof onCellClick === "function" && !readOnly;

  return (
    <div className="periodic-wrapper">
      <div className="periodic-key" aria-label="Element availability key">
        <div className="periodic-key-item">
          <span className="key-swatch available-swatch" /> Available
        </div>
        <div className="periodic-key-item">
          <span className="key-swatch assigned-swatch" /> Unavailable
        </div>
      </div>

      <div className="periodic-scroll-region" tabIndex="0" aria-label="Scrollable periodic table">
        <div className="periodic-canvas">
          <div className="periodic-group-labels" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, index) => (
              <span key={index}>{index + 1}</span>
            ))}
          </div>

          <div className="periodic-grid" role="grid" aria-label={ariaLabel}>
            {SPACERS.map((spacer) => (
              <div
                key={spacer.key}
                className="spacer"
                style={{ gridColumn: `${spacer.xStart} / ${spacer.xEnd + 1}`, gridRow: spacer.y }}
                aria-hidden="true"
              />
            ))}

            {ROW_LABELS.map((row) => (
              <div
                key={row.key}
                className="row-label"
                style={{ gridColumn: `${row.xStart} / ${row.xEnd + 1}`, gridRow: row.y }}
                aria-hidden="true"
              >
                <span>↳</span> {row.text}
              </div>
            ))}

            {elements.map((element) => {
              const isAssigned = assignedSet.has(element.Z);
              const isClickable = clickable && !isAssigned;
              const className = cx(
                "cell",
                element.family && `family-${element.family}`,
                isAssigned && "assigned",
                isClickable && "clickable"
              );
              const chooseElement = () => {
                if (isClickable) onCellClick(element);
              };

              return (
                <div
                  key={element.Z}
                  role={isClickable ? "button" : "gridcell"}
                  tabIndex={isClickable ? 0 : -1}
                  aria-disabled={isAssigned || undefined}
                  aria-label={`${element.name}, symbol ${element.symbol}, atomic number ${element.Z}${isAssigned ? ", unavailable" : ", available"}`}
                  className={className}
                  style={{ gridColumn: element.x, gridRow: element.y }}
                  onClick={chooseElement}
                  onKeyDown={(event) => {
                    if (isClickable && (event.key === "Enter" || event.key === " ")) {
                      event.preventDefault();
                      chooseElement();
                    }
                  }}
                >
                  <span className="number">{element.Z}</span>
                  <strong className="symbol">{element.symbol}</strong>
                  <span className="name">{element.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
