// src/pages/HelpPage.tsx
import React, { useState } from 'react';
import HelpSidebar from '../components/help/HelpSidebar';
import HelpContent from '../components/help/HelpContent';
import { helpContent } from '../data/helpContent';

const HelpPage: React.FC = () => {
  const [activeId, setActiveId] = useState(helpContent[0].id);

  return (
    <div className="container py-5">
      <h2 className="mb-5 fw-bold">Aide</h2>
      <div className="row">
        <div className="col-md-4 col-lg-3">
          <HelpSidebar items={helpContent} activeId={activeId} onSelect={setActiveId} />
        </div>
        <div className="col-md-8 col-lg-9">
          <HelpContent items={helpContent} activeId={activeId} />
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
