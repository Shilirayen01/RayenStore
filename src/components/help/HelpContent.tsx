// src/components/Help/HelpContent.tsx
import React from 'react';
import { HelpItem } from '../../data/helpContent';

interface Props {
  items: HelpItem[];
  activeId: string;
}

const HelpContent: React.FC<Props> = ({ items, activeId }) => {
  const activeItem = items.find((item) => item.id === activeId);

  if (!activeItem) return null;

  return (
    <div className="pb-4">
      <h3 className="mb-3 fw-semibold">{activeItem.question}</h3>
      {activeItem.answer.split('\n\n').map((paragraph, index) => (
        <p key={index} className="mb-3 text-muted">{paragraph}</p>
      ))}
    </div>
  );
};

export default HelpContent;
