import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Link,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock
} from '@mui/icons-material';
import FormikTextField from './FormikTextField';
import Registration from './Registration';
import { loginValidationSchema } from '../validation/entityValidation';

const Login = ({ onLogin, onRegister }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: ''
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setError('');

    try {
      await onLogin(values.username, values.password);
      navigate('/entities');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const handleRegister = async (userData) => {
    try {
      await onRegister(userData);
      setShowRegistration(false);
      await onLogin(userData.username, userData.password);
      navigate('/entities');
    } catch (err) {
      throw err;
    }
  };

  if (showRegistration) {
    return (
      <Registration 
        onRegister={handleRegister}
        onSwitchToLogin={() => setShowRegistration(false)}
      />
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 400 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              📁 Entity Management
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
              Please sign in to continue
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={loginValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, isValid, dirty }) => (
                <Form>
                  <FormikTextField
                    fullWidth
                    name="username"
                    label="Username"
                    placeholder="Enter your username"
                    margin="normal"
                    disabled={loading}
                    autoFocus
                    // HTML5 validation
                    inputProps={{
                      minLength: 3,
                      required: true
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      )
                    }}
                  />
                  
                  <FormikTextField
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    margin="normal"
                    disabled={loading}
                    // HTML5 validation
                    inputProps={{
                      minLength: 6,
                      required: true
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
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
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>

                  <Typography align="center" variant="body2">
                    First time here?{' '}
                    <Link
                      component="button"
                      type="button"
                      onClick={() => setShowRegistration(true)}
                      sx={{ cursor: 'pointer' }}
                    >
                      Create your account
                    </Link>
                  </Typography>
                </Form>
              )}
            </Formik>

            {/* Подсказка для тестирования */}
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="caption">
                Test credentials: alex / alex123
              </Typography>
            </Alert>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;