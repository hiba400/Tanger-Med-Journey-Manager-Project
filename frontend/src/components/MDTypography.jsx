import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const MDTypography = React.forwardRef(({ variant, children, ...rest }, ref) => {
  return (
    <Typography variant={variant} ref={ref} {...rest}>
      {children}
    </Typography>
  );
});

MDTypography.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

MDTypography.defaultProps = {
  variant: 'body1',
};

export default MDTypography;