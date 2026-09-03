// src/components/ProjectFilter.tsx
import React from 'react';

interface ProjectFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  projectCounts?: Record<string, number>;
}

export default function ProjectFilter({
  categories,
  activeCategory,
  onSelectCategory,
  projectCounts = {},
}: ProjectFilterProps) {
  return (
    <div
      className="project-filter-container"
      role="toolbar"
      aria-label="Filter projects by category"
    >
      <div className="project-filter-label" aria-hidden="true">
        FILTER /
      </div>
      <div className="project-filter-list" role="tablist">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          const count = projectCounts[cat];

          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              className={`filter-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat)}
              data-cursor-label="FILTER"
            >
              <span className="filter-btn-text">{cat}</span>
              {typeof count === 'number' && (
                <span className="filter-count" aria-hidden="true">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
