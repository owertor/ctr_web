import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Logout as LogoutIcon,
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon
} from '@mui/icons-material';
import EnhancedTable from './EnhancedTable/EnhancedTable';
import EntityForm from './EntityForm';
import {
  fetchEntities,
  addEntity,
  updateEntity,
  deleteEntity,
  deleteManyEntities,
  clearEntityError
} from '../redux/Actions/EntityActions';
import { setTheme } from '../redux/Actions/ThemeActions';

const EntityManagement = ({ currentUser, onLogout }) => {
  const dispatch = useDispatch();
  
  // Redux state
  const { entities, loading, adding, updating, deletingIds, error } = useSelector(
    state => state.entities
  );
  const { theme } = useSelector(state => state.theme);

  // Local state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState(null);
  const [formError, setFormError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Загрузка данных
  useEffect(() => {
    dispatch(fetchEntities());
  }, [dispatch]);

  // Показ ошибок
  useEffect(() => {
    if (error) {
      setSnackbar({ open: true, message: error, severity: 'error' });
      dispatch(clearEntityError());
    }
  }, [error, dispatch]);

  // Handlers
  const handleOpenForm = () => {
    setEditingEntity(null);
    setFormError('');
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingEntity(null);
    setFormError('');
  };

  const handleEdit = (entity) => {
    setEditingEntity(entity);
    setFormError('');
    setIsFormOpen(true);
  };

  const handleSubmit = async (formData) => {
    let result;
    
    if (editingEntity) {
      result = await dispatch(updateEntity(editingEntity.id, formData));
    } else {
      result = await dispatch(addEntity(formData));
    }

    if (result.success) {
      handleCloseForm();
      setSnackbar({
        open: true,
        message: editingEntity ? 'Employee updated successfully' : 'Employee added successfully',
        severity: 'success'
      });
    } else {
      setFormError(result.error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      const result = await dispatch(deleteEntity(id));
      if (result.success) {
        setSnackbar({ open: true, message: 'Employee deleted successfully', severity: 'success' });
      }
    }
  };

  const handleDeleteMany = async (ids) => {
    const result = await dispatch(deleteManyEntities(ids));
    if (result.success) {
      setSnackbar({ 
        open: true, 
        message: `${ids.length} employees deleted successfully`, 
        severity: 'success' 
      });
    }
  };

  const handleToggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            📁 Entity Management
          </Typography>
          
          <Typography sx={{ mr: 2 }}>
            Welcome, {currentUser.firstName}!
          </Typography>
          
          <IconButton color="inherit" onClick={handleToggleTheme}>
            {theme === 'light' ? <DarkIcon /> : <LightIcon />}
          </IconButton>
          
          <IconButton color="inherit" onClick={onLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Action buttons */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            Employees
          </Typography>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenForm}
          >
            Add Employee
          </Button>
        </Box>

        {/* Table */}
        <EnhancedTable
          entities={entities}
          loading={loading}
          deletingIds={deletingIds}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDeleteMany={handleDeleteMany}
        />

        {/* Form Dialog */}
        <EntityForm
          open={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
          entity={editingEntity}
          loading={adding || updating}
          error={formError}
        />

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default EntityManagement;