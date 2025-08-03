import React from 'react';
import { Button } from '@mui/material';

const MDButton = ({ children, ...props }) => {
  return (
    <Button {...props}>
      {children}
    </Button>
  );
};

export default MDButton;