'use client'

import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Helmet, HelmetProvider } from 'react-helmet-async';


interface PageContainerProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, description, children }) => (
  <div>
    <HelmetProvider>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    {children}
    </HelmetProvider>
  </div>
);

PageContainer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default PageContainer;
