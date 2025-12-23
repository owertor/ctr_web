import React from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material';

const FormikTextField = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  
  const hasError = meta.touched && Boolean(meta.error);
  
  return (
    <TextField
      {...field}
      {...props}
      error={hasError}
      helperText={meta.touched && meta.error}
      sx={{
        '& .MuiOutlinedInput-root': {
          '&.Mui-error': {
            '& fieldset': {
              borderColor: '#d32f2f',
              borderWidth: 2,
            },
          },
        },
        '& .MuiFormHelperText-root.Mui-error': {
          fontWeight: 500,
          fontSize: '0.8rem',
        },
        ...props.sx
      }}
    />
  );
};

export default FormikTextField;