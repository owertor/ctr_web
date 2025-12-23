import * as Yup from 'yup';

// ===== БИЗНЕС-ПРАВИЛА (КОНСТАНТЫ) =====

// Компания основана в 2010 году
export const COMPANY_FOUNDED_DATE = '2010-01-01';

// Допустимый возраст сотрудников
export const MIN_AGE = 18;
export const MAX_AGE = 65;

// Корпоративный домен email
export const CORPORATE_EMAIL_DOMAIN = '@company.com';

// Допустимые домены email (можно расширить)
export const ALLOWED_EMAIL_DOMAINS = ['@company.com', '@corp.company.com'];

// Рабочие часы для записи (пример бизнес-правила)
export const WORKING_HOURS = [
  { start: '08:30', end: '11:30', label: 'Morning shift' },
  { start: '12:30', end: '16:00', label: 'Afternoon shift' }
];

// Запрещённые имена (пример)
export const FORBIDDEN_NAMES = ['admin', 'test', 'user', 'root'];

// ===== КАСТОМНЫЕ ВАЛИДАТОРЫ =====

// Проверка, что имя начинается с заглавной буквы
const startsWithCapital = (value) => {
  if (!value) return false;
  return /^[A-Z]/.test(value);
};

// Проверка, что строка содержит только буквы
const onlyLetters = (value) => {
  if (!value) return false;
  return /^[A-Za-z]+$/.test(value);
};

// Проверка корпоративного email
const isCorporateEmail = (value) => {
  if (!value) return false;
  return ALLOWED_EMAIL_DOMAINS.some(domain => 
    value.toLowerCase().endsWith(domain)
  );
};

// Проверка, что дата не в будущем
const isNotFutureDate = (value) => {
  if (!value) return false;
  return new Date(value) <= new Date();
};

// Проверка, что дата после основания компании
const isAfterCompanyFounded = (value) => {
  if (!value) return false;
  return new Date(value) >= new Date(COMPANY_FOUNDED_DATE);
};

// Проверка на запрещённые имена
const isNotForbiddenName = (value) => {
  if (!value) return true;
  return !FORBIDDEN_NAMES.includes(value.toLowerCase());
};

// ===== СХЕМА ВАЛИДАЦИИ YUP =====

export const entityValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .test(
      'starts-with-capital',
      'First name must start with a capital letter',
      startsWithCapital
    )
    .test(
      'only-letters',
      'First name must contain only letters',
      onlyLetters
    )
    .test(
      'not-forbidden',
      'This name is not allowed',
      isNotForbiddenName
    ),

  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .test(
      'starts-with-capital',
      'Last name must start with a capital letter',
      startsWithCapital
    )
    .test(
      'only-letters',
      'Last name must contain only letters',
      onlyLetters
    ),

  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format')
    .test(
      'corporate-email',
      `Email must be a corporate email (${ALLOWED_EMAIL_DOMAINS.join(' or ')})`,
      isCorporateEmail
    ),

  age: Yup.number()
    .required('Age is required')
    .typeError('Age must be a number')
    .integer('Age must be a whole number')
    .min(MIN_AGE, `Employee must be at least ${MIN_AGE} years old`)
    .max(MAX_AGE, `Employee must be no older than ${MAX_AGE} years`),

  hireDate: Yup.date()
    .required('Hire date is required')
    .typeError('Invalid date format')
    .test(
      'not-future',
      'Hire date cannot be in the future',
      isNotFutureDate
    )
    .test(
      'after-company-founded',
      `Hire date must be after company was founded (${COMPANY_FOUNDED_DATE})`,
      isAfterCompanyFounded
    )
});

// ===== СХЕМА ДЛЯ РЕГИСТРАЦИИ =====

export const registrationValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .test('starts-with-capital', 'Must start with a capital letter', startsWithCapital),

  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .test('starts-with-capital', 'Must start with a capital letter', (value) => {
      if (!value) return true; // Optional field
      return startsWithCapital(value);
    }),

  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),

  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers and underscores'
    )
    .test('not-forbidden', 'This username is not allowed', isNotForbiddenName),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),

  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match')
});

// ===== СХЕМА ДЛЯ ЛОГИНА =====

export const loginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),

  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
});