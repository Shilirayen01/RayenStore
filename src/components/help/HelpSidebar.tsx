// src/components/Help/HelpSidebar.tsx
import React from 'react';
import { HelpItem } from '../../data/helpContent';

interface Props {
  items: HelpItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

const HelpSidebar: React.FC<Props> = ({ items, activeId, onSelect }) => (
  <div className="list-group">
    {items.map((item) => (
      <button
        key={item.id}
        type="button"
        className={`list-group-item list-group-item-action ${activeId === item.id ? 'active' : ''}`}
        onClick={() => onSelect(item.id)}
      >
        &gt; {item.shortLabel}
      </button>
    ))}
  </div>
);

export default HelpSidebar;
