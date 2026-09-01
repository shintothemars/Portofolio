// src/components/ProjectMeta.tsx
interface ProjectMetaProps {
  role: string[];
  tools: string[];
  year: string;
  type: string;
  impact: string;
  learned?: string;
}

export default function ProjectMeta({
  role,
  tools,
  year,
  type,
  impact,
  learned,
}: ProjectMetaProps) {
  return (
    <div>
      <div className="project-meta-grid">
        <div className="project-meta-item">
          <div className="project-meta-label">Role</div>
          <div className="project-meta-value">{role.join(', ')}</div>
        </div>
        <div className="project-meta-item">
          <div className="project-meta-label">Year</div>
          <div className="project-meta-value">{year}</div>
        </div>
        <div className="project-meta-item" style={{ gridColumn: '1 / -1' }}>
          <div className="project-meta-label">Project Type</div>
          <div className="project-meta-value">{type}</div>
        </div>
        <div className="project-meta-item" style={{ gridColumn: '1 / -1' }}>
          <div className="project-meta-label">Impact</div>
          <div className="project-meta-value">{impact}</div>
        </div>
        {learned && (
          <div className="project-meta-item" style={{ gridColumn: '1 / -1' }}>
            <div className="project-meta-label">What I Learned</div>
            <div className="project-meta-value">{learned}</div>
          </div>
        )}
      </div>

      <div>
        <div className="project-meta-label" style={{ marginBottom: '12px' }}>
          Tools & Technologies
        </div>
        <div className="project-tools">
          {tools.map((tool) => (
            <span key={tool} className="tool-tag">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
