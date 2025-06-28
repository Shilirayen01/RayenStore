import React from 'react';

interface ServiceFeatureItemProps {
  iconClass: string;
  title: string;
  description?: string;
}

const ServiceFeatureItem: React.FC<ServiceFeatureItemProps> = ({ iconClass, title, description }) => {
  return (
    <div className="my-2 mx-3">
      <i className={`${iconClass} fs-2 text-white mb-2 d-block`} aria-hidden="true"></i>
      <p className="mb-0 small text-white">
        {title}
        {description && <><br/>{description}</>}
      </p>
    </div>
  );
};

export default ServiceFeatureItem;