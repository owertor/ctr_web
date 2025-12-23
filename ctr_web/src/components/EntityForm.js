import React from 'react';
import { Formik, Form } from 'formik';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Box,
  Typography,
  Divider,
  Tooltip,
  IconButton
} from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';
import FormikTextField from './FormikTextField';
import { 
  entityValidationSchema,
  MIN_AGE,
  MAX_AGE,
  COMPANY_FOUNDED_DATE,
  ALLOWED_EMAIL_DOMAINS
} from '../validation/entityValidation';

const EntityForm = ({ 
  open, 
  onClose, 
  onSubmit, 
  entity = null, 
  loading = false,
  error = ''
}) => {
  const isEditMode = Boolean(entity);
  
  const initialValues = {
    firstName: entity?.firstName || '',
    lastName: entity?.lastName || '',
    email: entity?.email || '',
    age: entity?.age || '',
    hireDate: entity?.hireDate || new Date().toISOString().split('T')[0]
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const dataToSubmit = {
      ...values,
      age: Number(values.age)
    };
    
    await onSubmit(dataToSubmit);
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <span>{isEditMode ? 'Edit Entity' : 'Add New Entity'}</span>
          <Tooltip title="Validation rules apply">
            <IconButton size="small">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </DialogTitle>
      
      <Formik
        initialValues={initialValues}
        validationSchema={entityValidationSchema}
        onSubmit={handleFormSubmit}
        enableReinitialize
        validateOnBlur={true}
        validateOnChange={true}
      >
        {({ isSubmitting, isValid, dirty, errors, touched }) => (
          <Form>
            <DialogContent>
              {/* Подсказки по валидации */}
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>Validation Rules:</strong>
                  <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                    <li>Names must start with a capital letter and contain only letters</li>
                    <li>Email must be corporate: {ALLOWED_EMAIL_DOMAINS.join(' or ')}</li>
                    <li>Age must be between {MIN_AGE} and {MAX_AGE}</li>
                    <li>Hire date must be after {COMPANY_FOUNDED_DATE} and not in the future</li>
                  </ul>
                </Typography>
              </Alert>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              
              <Grid container spacing={2}>
                {/* First Name */}
                <Grid item xs={6}>
                  <FormikTextField
                    fullWidth
                    name="firstName"
                    label="First Name *"
                    placeholder="e.g., John"
                    disabled={loading}
                    // HTML5 validation attributes
                    inputProps={{
                      minLength: 2,
                      maxLength: 50,
                      pattern: '[A-Za-z]+',
                      title: 'Only letters allowed, must start with capital'
                    }}
                  />
                </Grid>
                
                {/* Last Name */}
                <Grid item xs={6}>
                  <FormikTextField
                    fullWidth
                    name="lastName"
                    label="Last Name *"
                    placeholder="e.g., Doe"
                    disabled={loading}
                    inputProps={{
                      minLength: 2,
                      maxLength: 50,
                      pattern: '[A-Za-z]+',
                      title: 'Only letters allowed, must start with capital'
                    }}
                  />
                </Grid>
                
                {/* Email */}
                <Grid item xs={12}>
                  <FormikTextField
                    fullWidth
                    name="email"
                    label="Corporate Email *"
                    type="email"
                    placeholder="e.g., john.doe@company.com"
                    disabled={loading}
                    // HTML5 validation
                    inputProps={{
                      pattern: '.+@(company\\.com|corp\\.company\\.com)$',
                      title: 'Must be a corporate email (@company.com)'
                    }}
                  />
                </Grid>
                
                {/* Age */}
                <Grid item xs={6}>
                  <FormikTextField
                    fullWidth
                    name="age"
                    label="Age *"
                    type="number"
                    placeholder={`${MIN_AGE}-${MAX_AGE}`}
                    disabled={loading}
                    // HTML5 validation
                    inputProps={{ 
                      min: MIN_AGE, 
                      max: MAX_AGE,
                      step: 1
                    }}
                  />
                </Grid>
                
                {/* Hire Date */}
                <Grid item xs={6}>
                  <FormikTextField
                    fullWidth
                    name="hireDate"
                    label="Hire Date *"
                    type="date"
                    disabled={loading}
                    InputLabelProps={{ shrink: true }}
                    // HTML5 validation
                    inputProps={{
                      min: COMPANY_FOUNDED_DATE,
                      max: new Date().toISOString().split('T')[0]
                    }}
                  />
                </Grid>
              </Grid>

              {/* Показываем общее количество ошибок */}
              {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Divider sx={{ mb: 1 }} />
                  <Typography variant="body2" color="error">
                    Please fix {Object.keys(errors).filter(key => touched[key]).length} validation error(s) before submitting
                  </Typography>
                </Box>
              )}
            </DialogContent>
            
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={onClose} disabled={loading || isSubmitting}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                disabled={loading || isSubmitting || !isValid || !dirty}
                startIcon={(loading || isSubmitting) && <CircularProgress size={20} />}
              >
                {loading || isSubmitting ? 'Saving...' : (isEditMode ? 'Update' : 'Add')}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EntityForm;