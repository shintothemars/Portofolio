// src/components/ProjectMeta.tsx
import React from 'react';

interface ProjectMetaProps {
  role?: string[];
  tools?: string[];
  year?: number | string;
  type?: string;
  impact?: string;
  learned?: string;
  client?: string;
  duration?: string;
  team?: string;
}

export default function ProjectMeta({
  role,
  tools,
  year,
  type,
  impact,
  learned,
  client,
  duration,
  team,
}: ProjectMetaProps) {
  return (
    <div className="project-meta-wrapper">
      <div className="project-meta-grid">
        {role && role.length > 0 && (
          <div className="project-meta-item">
            <div className="project-meta-label">ROLE</div>
            <div className="project-meta-value">{role.join(' · ')}</div>
          </div>
        )}

        {year && (
          <div className="project-meta-item">
            <div className="project-meta-label">YEAR</div>
            <div className="project-meta-value">{year}</div>
          </div>
        )}

        {type && (
          <div className="project-meta-item">
            <div className="project-meta-label">PROJECT TYPE</div>
            <div className="project-meta-value">{type}</div>
          </div>
        )}

        {client && (
          <div className="project-meta-item">
            <div className="project-meta-label">CLIENT</div>
            <div className="project-meta-value">{client}</div>
          </div>
        )}

        {duration && (
          <div className="project-meta-item">
            <div className="project-meta-label">DURATION</div>
            <div className="project-meta-value">{duration}</div>
          </div>
        )}

        {team && (
          <div className="project-meta-item">
            <div className="project-meta-label">TEAM</div>
            <div className="project-meta-value">{team}</div>
          </div>
        )}

        {impact && (
          <div className="project-meta-item full-width">
            <div className="project-meta-label">IMPACT</div>
            <div className="project-meta-value">{impact}</div>
          </div>
        )}

        {learned && (
          <div className="project-meta-item full-width">
            <div className="project-meta-label">KEY TAKEAWAY</div>
            <div className="project-meta-value">{learned}</div>
          </div>
        )}
      </div>

      {tools && tools.length > 0 && (
        <div className="project-tools-section">
          <div className="project-meta-label">TOOLS & TECHNOLOGIES</div>
          <div className="project-tools">
            {tools.map((tool) => (
              <span key={tool} className="tool-tag">
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
