import React from 'react';
import { Box } from '@mui/material';

const MDBox = ({ children, ...rest }) => {
  return (
    <Box {...rest}>
      {children}
    </Box>
  );
};

export default MDBox;