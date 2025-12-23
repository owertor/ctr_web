import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Grid,
  InputAdornment,
  IconButton,
  LinearProgress
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  ArrowBack
} from '@mui/icons-material';
import FormikTextField from './FormikTextField';
import { registrationValidationSchema } from '../validation/entityValidation';

// Компонент индикатора силы пароля
const PasswordStrengthIndicator = ({ password }) => {
  const getStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 15;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 10;
    return Math.min(100, strength);
  };

  const strength = getStrength();
  
  const getColor = () => {
    if (strength < 30) return 'error';
    if (strength < 60) return 'warning';
    return 'success';
  };

  const getLabel = () => {
    if (strength < 30) return 'Weak';
    if (strength < 60) return 'Medium';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <Box sx={{ mt: 1 }}>
      <LinearProgress 
        variant="determinate" 
        value={strength} 
        color={getColor()}
        sx={{ height: 6, borderRadius: 3 }}
      />
      <Typography variant="caption" color={`${getColor()}.main`}>
        Password strength: {getLabel()}
      </Typography>
    </Box>
  );
};

const Registration = ({ onRegister, onSwitchToLogin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setError('');

    try {
      const { confirmPassword, ...userData } = values;
      await onRegister(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 500 }}>
          <CardContent sx={{ p: 4 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <IconButton onClick={onSwitchToLogin} sx={{ mr: 1 }}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h5" component="h1">
                Create Account
              </Typography>
            </Box>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Fill in the form below to create your account
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={registrationValidationSchema}
              onSubmit={handleSubmit}
              validateOnBlur={true}
              validateOnChange={true}
            >
              {({ isSubmitting, isValid, dirty, values, errors, touched }) => (
                <Form>
                  <Grid container spacing={2}>
                    {/* First Name */}
                    <Grid item xs={6}>
                      <FormikTextField
                        fullWidth
                        name="firstName"
                        label="First Name *"
                        placeholder="John"
                        disabled={loading}
                        inputProps={{
                          minLength: 2,
                          pattern: '[A-Za-z]+',
                          required: true
                        }}
                      />
                    </Grid>

                    {/* Last Name */}
                    <Grid item xs={6}>
                      <FormikTextField
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        placeholder="Doe"
                        disabled={loading}
                        inputProps={{
                          minLength: 2,
                          pattern: '[A-Za-z]+'
                        }}
                      />
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12}>
                      <FormikTextField
                        fullWidth
                        name="email"
                        label="Email *"
                        type="email"
                        placeholder="john.doe@example.com"
                        disabled={loading}
                        inputProps={{
                          required: true
                        }}
                      />
                    </Grid>

                    {/* Username */}
                    <Grid item xs={12}>
                      <FormikTextField
                        fullWidth
                        name="username"
                        label="Username *"
                        placeholder="johndoe"
                        disabled={loading}
                        inputProps={{
                          minLength: 3,
                          maxLength: 20,
                          pattern: '[a-zA-Z0-9_]+',
                          required: true
                        }}
                        helperText={
                          !errors.username && touched.username 
                            ? "Username is available" 
                            : undefined
                        }
                      />
                    </Grid>

                    {/* Password */}
                    <Grid item xs={12}>
                      <FormikTextField
                        fullWidth
                        name="password"
                        label="Password *"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Min 8 characters"
                        disabled={loading}
                        inputProps={{
                          minLength: 8,
                          required: true
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                      <PasswordStrengthIndicator password={values.password} />
                    </Grid>

                    {/* Confirm Password */}
                    <Grid item xs={12}>
                      <FormikTextField
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password *"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Repeat your password"
                        disabled={loading}
                        inputProps={{
                          minLength: 8,
                          required: true
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                edge="end"
                              >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                  </Grid>

                  {/* Validation hints */}
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="caption">
                      <strong>Password requirements:</strong>
                      <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px' }}>
                        <li>At least 8 characters</li>
                        <li>At least one uppercase letter</li>
                        <li>At least one lowercase letter</li>
                        <li>At least one number</li>
                      </ul>
                    </Typography>
                  </Alert>

                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading || isSubmitting || !isValid || !dirty}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={onSwitchToLogin}
                    disabled={loading}
                  >
                    Back to Login
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Registration;