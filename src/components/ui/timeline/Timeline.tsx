import "./timeline.css";

export type TimelineBadge = {
  label: string;
};

export type TimelineStep = {
  id: string;
  time: string;
  description: string;
  badges?: TimelineBadge[];
  side?: "left" | "right" | "center";
};

export type TimelineProps = {
  title?: string;
  steps: TimelineStep[];
};

export default function Timeline({ title, steps }: TimelineProps) {
  return (
    <div className="timeline">
      {title && <h2 className="timeline_title">{title}</h2>}

      <div className="timeline_track">
        <div className="timeline_line" />
        <ul className="timeline_steps">
          {steps.map((step) => (
            <li key={step.id} className={`timeline_step timeline_step_${step.side ?? "center"}`}>
              <span className="timeline_dot" />
              <div className="timeline_content">
                {step.badges && step.badges.length > 0 && (
                  <div className="timeline_badges">
                    {step.badges.map((badge) => (
                      <span key={badge.label} className="timeline_badge">
                        {badge.label}
                      </span>
                    ))}
                  </div>
                )}
                <p className="timeline_time">{step.time}</p>
                <p className="timeline_description">{step.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
