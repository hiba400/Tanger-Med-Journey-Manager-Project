import React from 'react';
import TextField from '@mui/material/TextField';

const MDInput = React.forwardRef((props, ref) => {
  const { label, ...rest } = props;

  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      inputRef={ref}
      {...rest}
    />
  );
});

export default MDInput;