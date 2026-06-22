import { useState } from "react";

function CustomSelect({ options = [], value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <div
        className="input"
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer" }}
      >
        {value || placeholder || "Select"}
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            width: "100%",
            background: "#0f1d32",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            zIndex: 1000,
          }}
        >
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              style={{
                padding: "0.7rem",
                cursor: "pointer",
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;