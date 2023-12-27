import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Card } from '@mui/material';

interface BlankCardProps {
  children?: ReactNode;
  className?: string;
}

const BlankCard: React.FC<BlankCardProps> = ({ children, className }) => {
  return (
    <Card
      sx={{ p: 0, position: 'relative' }}
      className={className}
      elevation={9}
      variant={undefined}
    >
      {children}
    </Card>
  );
};

BlankCard.propTypes = {
  children: PropTypes.node,
};

export default BlankCard;
