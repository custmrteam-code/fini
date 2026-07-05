'use client';

export default function HealthGauge({ score, size = 140, strokeWidth = 10, label = 'Score', color }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (color) return color;
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#eab308';
    if (score >= 40) return '#f97316';
    return '#f43f5e';
  };

  const getGrade = () => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B+';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C';
    return 'D';
  };

  return (
    <div className="gauge-container">
      <svg className="gauge-svg" width={size} height={size}>
        <circle
          className="gauge-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="gauge-fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={getColor()}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <g className="gauge-text-group">
          <text x={size / 2} y={size / 2 - 8} className="gauge-score" style={{ fontSize: size * 0.18 }}>
            {score}
          </text>
          <text x={size / 2} y={size / 2 + 14} className="gauge-label" style={{ fontSize: size * 0.065 }}>
            {label}
          </text>
        </g>
      </svg>
    </div>
  );
}
