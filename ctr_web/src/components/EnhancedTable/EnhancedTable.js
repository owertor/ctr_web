import React, { useState, useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  TextField,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  ListItemText,
  Typography,
  Toolbar,
  alpha,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterListIcon,
  ViewColumn as ViewColumnIcon
} from '@mui/icons-material';

// Определение колонок
const ALL_COLUMNS = [
  { id: 'id', label: 'ID', type: 'number', width: 70 },
  { id: 'firstName', label: 'First Name', type: 'string', width: 150 },
  { id: 'lastName', label: 'Last Name', type: 'string', width: 150 },
  { id: 'email', label: 'Email', type: 'string', width: 250 },
  { id: 'age', label: 'Age', type: 'number', width: 80 },
  { id: 'hireDate', label: 'Hire Date', type: 'date', width: 130 }
];

// Компаратор для сортировки
function descendingComparator(a, b, orderBy, type) {
  let aValue = a[orderBy];
  let bValue = b[orderBy];

  if (type === 'date') {
    aValue = new Date(aValue);
    bValue = new Date(bValue);
  }

  if (bValue < aValue) return -1;
  if (bValue > aValue) return 1;
  return 0;
}

function getComparator(order, orderBy, columns) {
  const column = columns.find(col => col.id === orderBy);
  const type = column?.type || 'string';

  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy, type)
    : (a, b) => -descendingComparator(a, b, orderBy, type);
}

// Toolbar с действиями
function EnhancedTableToolbar({ 
  numSelected, 
  onDeleteSelected,
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  visibleColumns,
  onColumnsChange,
  deleting
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [showColumns, setShowColumns] = useState(false);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        flexWrap: 'wrap',
        gap: 2,
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Entities
        </Typography>
      )}

      {/* Поиск */}
      <TextField
        size="small"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => onSearchChange('')}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ width: 250 }}
      />

      {/* Кнопка фильтров */}
      <Tooltip title="Filter list">
        <IconButton onClick={() => setShowFilters(!showFilters)}>
          <FilterListIcon color={Object.values(filters).some(v => v) ? 'primary' : 'inherit'} />
        </IconButton>
      </Tooltip>

      {/* Кнопка выбора колонок */}
      <Tooltip title="Select columns">
        <IconButton onClick={() => setShowColumns(!showColumns)}>
          <ViewColumnIcon />
        </IconButton>
      </Tooltip>

      {/* Удаление выбранных */}
      {numSelected > 0 && (
        <Tooltip title="Delete selected">
          <IconButton onClick={onDeleteSelected} disabled={deleting}>
            {deleting ? <CircularProgress size={24} /> : <DeleteIcon />}
          </IconButton>
        </Tooltip>
      )}

      {/* Панель фильтров */}
      {showFilters && (
        <Box sx={{ width: '100%', display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
          <TextField
            size="small"
            label="Min Age"
            type="number"
            value={filters.minAge || ''}
            onChange={(e) => onFilterChange('minAge', e.target.value)}
            sx={{ width: 120 }}
          />

          <TextField
            size="small"
            label="Max Age"
            type="number"
            value={filters.maxAge || ''}
            onChange={(e) => onFilterChange('maxAge', e.target.value)}
            sx={{ width: 120 }}
          />

          <TextField
            size="small"
            label="Hire Date From"
            type="date"
            value={filters.hireDateFrom || ''}
            onChange={(e) => onFilterChange('hireDateFrom', e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 160 }}
          />

          <TextField
            size="small"
            label="Hire Date To"
            type="date"
            value={filters.hireDateTo || ''}
            onChange={(e) => onFilterChange('hireDateTo', e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 160 }}
          />
        </Box>
      )}

      {/* Панель выбора колонок */}
      {showColumns && (
        <Box sx={{ width: '100%', mt: 1 }}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel>Visible Columns</InputLabel>
            <Select
              multiple
              value={visibleColumns}
              onChange={(e) => onColumnsChange(e.target.value)}
              input={<OutlinedInput label="Visible Columns" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip 
                      key={value} 
                      label={ALL_COLUMNS.find(c => c.id === value)?.label} 
                      size="small" 
                    />
                  ))}
                </Box>
              )}
            >
              {ALL_COLUMNS.map((column) => (
                <MenuItem key={column.id} value={column.id}>
                  <Checkbox checked={visibleColumns.indexOf(column.id) > -1} />
                  <ListItemText primary={column.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
    </Toolbar>
  );
}

// Заголовок таблицы
function EnhancedTableHead({ 
  columns,
  onSelectAllClick, 
  order, 
  orderBy, 
  numSelected, 
  rowCount, 
  onRequestSort 
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.type === 'number' ? 'right' : 'left'}
            sortDirection={orderBy === column.id ? order : false}
            sx={{ fontWeight: 'bold', width: column.width }}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : 'asc'}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center" sx={{ fontWeight: 'bold', width: 120 }}>
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

// Итоговая строка
function SummaryRow({ entities, columns }) {
  const avgAge = entities.length > 0 
    ? (entities.reduce((sum, e) => sum + (e.age || 0), 0) / entities.length).toFixed(1)
    : 0;

  // Находим самую раннюю и самую позднюю дату найма
  const hireDates = entities.map(e => new Date(e.hireDate)).filter(d => !isNaN(d));
  const earliestHire = hireDates.length > 0 
    ? new Date(Math.min(...hireDates)).toLocaleDateString() 
    : '-';

  return (
    <TableRow sx={{ backgroundColor: 'action.hover' }}>
      <TableCell />
      {columns.map((column) => (
        <TableCell 
          key={column.id} 
          align={column.type === 'number' ? 'right' : 'left'}
          sx={{ fontWeight: 'bold' }}
        >
          {column.id === 'firstName' && `Total: ${entities.length} records`}
          {column.id === 'age' && `Avg: ${avgAge}`}
          {column.id === 'hireDate' && `Earliest: ${earliestHire}`}
        </TableCell>
      ))}
      <TableCell />
    </TableRow>
  );
}

// Главный компонент
function EnhancedTable({ 
  entities, 
  loading,
  deletingIds,
  onEdit, 
  onDelete, 
  onDeleteMany 
}) {
  // Состояния
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [visibleColumns, setVisibleColumns] = useState(
    ALL_COLUMNS.map(c => c.id)
  );

  // Колонки для отображения
  const columns = useMemo(() => 
    ALL_COLUMNS.filter(col => visibleColumns.includes(col.id)),
    [visibleColumns]
  );

  // Фильтрация данных
  const filteredEntities = useMemo(() => {
    return entities.filter(entity => {
      // Поиск по тексту
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesSearch = 
          entity.firstName.toLowerCase().includes(term) ||
          entity.lastName.toLowerCase().includes(term) ||
          entity.email.toLowerCase().includes(term) ||
          entity.id.toString().includes(term);
        if (!matchesSearch) return false;
      }

      // Фильтр по минимальному возрасту
      if (filters.minAge && entity.age < Number(filters.minAge)) {
        return false;
      }

      // Фильтр по максимальному возрасту
      if (filters.maxAge && entity.age > Number(filters.maxAge)) {
        return false;
      }

      // Фильтр по дате найма (от)
      if (filters.hireDateFrom && new Date(entity.hireDate) < new Date(filters.hireDateFrom)) {
        return false;
      }

      // Фильтр по дате найма (до)
      if (filters.hireDateTo && new Date(entity.hireDate) > new Date(filters.hireDateTo)) {
        return false;
      }

      return true;
    });
  }, [entities, searchTerm, filters]);

  // Сортировка данных
  const sortedEntities = useMemo(() => {
    return [...filteredEntities].sort(getComparator(order, orderBy, columns));
  }, [filteredEntities, order, orderBy, columns]);

  // Данные для текущей страницы
  const paginatedEntities = useMemo(() => {
    return sortedEntities.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [sortedEntities, page, rowsPerPage]);

  // Обработчики
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = paginatedEntities.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setSelected([]);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setSelected([]);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setPage(0);
  };

  const handleDeleteSelected = async () => {
    if (window.confirm(`Are you sure you want to delete ${selected.length} items?`)) {
      await onDeleteMany(selected);
      setSelected([]);
    }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Форматирование значений ячеек
  const formatCellValue = (column, value) => {
    if (value === null || value === undefined) return '-';

    if (column.type === 'date') {
      return new Date(value).toLocaleDateString();
    }

    return value;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        onDeleteSelected={handleDeleteSelected}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFilterChange={handleFilterChange}
        visibleColumns={visibleColumns}
        onColumnsChange={setVisibleColumns}
        deleting={deletingIds.length > 0}
      />

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader size="medium">
          <EnhancedTableHead
            columns={columns}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={paginatedEntities.length}
          />
          <TableBody>
            {paginatedEntities.map((row) => {
              const isItemSelected = isSelected(row.id);
              const isDeleting = deletingIds.includes(row.id);

              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                  sx={{ 
                    cursor: 'pointer',
                    opacity: isDeleting ? 0.5 : 1
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      onChange={(event) => handleClick(event, row.id)}
                      disabled={isDeleting}
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell 
                      key={column.id}
                      align={column.type === 'number' ? 'right' : 'left'}
                    >
                      {formatCellValue(column, row[column.id])}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton 
                        size="small" 
                        onClick={() => onEdit(row)}
                        disabled={isDeleting}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton 
                        size="small" 
                        onClick={() => onDelete(row.id)}
                        disabled={isDeleting}
                        color="error"
                      >
                        {isDeleting ? (
                          <CircularProgress size={20} />
                        ) : (
                          <DeleteIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}

            {/* Итоговая строка */}
            <SummaryRow entities={filteredEntities} columns={columns} />
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={filteredEntities.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Rows per page:"
      />
    </Paper>
  );
}

export default EnhancedTable;