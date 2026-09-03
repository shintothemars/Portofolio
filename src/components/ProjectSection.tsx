// src/components/ProjectSection.tsx
import React from 'react';
import type { Project } from '../data/projects';
import ProjectCard from './ProjectCard';

interface ProjectSectionProps {
  projects: Project[];
}

export default function ProjectSection({ projects }: ProjectSectionProps) {
  if (projects.length === 0) {
    return (
      <div className="container-wide no-projects-found">
        <div className="no-projects-box">
          <span className="no-projects-code">404_EMPTY_FILTER</span>
          <p>No projects match the selected category.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-container">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          total={projects.length}
          reverse={index % 2 !== 0}
        />
      ))}
    </div>
  );
}
