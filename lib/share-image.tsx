import { defaultSiteUrl } from "@/lib/site";

const host = defaultSiteUrl.replace(/^https?:\/\//, "");

function Flag({
  label,
  level,
  color,
}: {
  label: string;
  level: string;
  color: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 168,
        background: "rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: "14px 16px 16px",
      }}
    >
      <div
        style={{
          fontSize: 14,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: "rgba(243,240,232,0.62)",
        }}
      >
        {label}
      </div>
      <div style={{ marginTop: 8, fontSize: 32, color, fontWeight: 700 }}>
        {level}
      </div>
    </div>
  );
}

/** 1200×630 scorecard used for Open Graph and Twitter large cards. */
export function ShareCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#f3f0e8",
        padding: 36,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          background: "#16181d",
          color: "#f3f0e8",
          borderRadius: 28,
          padding: "42px 52px 36px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: 2.4,
            textTransform: "uppercase",
            color: "rgba(243,240,232,0.68)",
          }}
        >
          <div>AppGate Pack · free /check</div>
          <div>No login · no payment</div>
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 22,
            color: "rgba(243,240,232,0.72)",
          }}
        >
          Capacitor shell · three native features
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 54,
            lineHeight: 1.05,
            letterSpacing: -1,
            fontWeight: 700,
          }}
        >
          Will Apple bounce this wrapper?
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: 28,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 118,
                lineHeight: 0.86,
                letterSpacing: -4,
                color: "#e24c1f",
                fontWeight: 700,
              }}
            >
              HIGH
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 18,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Your wrapper risk
            </div>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <Flag label="4.2" level="HIGH" color="#e24c1f" />
            <Flag label="4.3" level="MED" color="#e2b34a" />
            <Flag label="Metadata" level="LOW" color="#d7ebe4" />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 32,
            fontSize: 18,
            color: "rgba(243,240,232,0.55)",
          }}
        >
          <div>Heuristic only. Not a review prediction. Apple decides.</div>
          <div>{`${host}/check`}</div>
        </div>
      </div>
    </div>
  );
}
