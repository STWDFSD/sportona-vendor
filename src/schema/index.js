import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});
const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const venderProfileSchema = yup.object().shape({
  logo: yup
    .mixed()
    .required('A file is required')
    .test('fileSize', 'File is too large, max size is 1MB', value => {
      return value && value[0].size <= 1048576; // 1MB
    })
    .test(
      'fileDimensions',
      'File dimensions must be within 400x400px',
      value => {
        if (!value) return false;

        const img = new Image();
        const objectUrl = URL.createObjectURL(value[0]);

        return new Promise(resolve => {
          img.onload = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(img.width <= 400 && img.height <= 400);
          };
          img.src = objectUrl;
        });
      }
    ),
  name: yup.string().required('Vendor name is required'),
  username: yup.string().required('Vendor name is required'),
  address: yup.string().required('Street address is required'),
  postcode: yup.string().required('Postcode  is required'),
  startingTime: yup.string().required('Please add starting time'),
  endingTime: yup.string().required('Please add ending time'),
  trainingDays: yup
    .array()
    .of(
      yup.object({
        id: yup.number().required(),
        day: yup.string().required(),
        isSelected: yup.boolean().required(),
      })
    )
    .test(
      'at-least-one-day-selected',
      'Please select at least one training day',
      days => days && days.some(day => day.isSelected)
    ),

  country: yup.string().optional(),
  countryCode: yup.string().optional(),
  countryISOCode: yup.string().optional(),
  latitude: yup.number().optional(),
  longitude: yup.number().optional(),
  location: yup.string().optional(),
});

export const venderServiceSchema = yup.object().shape({
  service: yup.string().required('Please select a service'),
  cover: yup
    .mixed()
    .required('A file is required')
    .test('fileSize', 'File is too large, max size is 1MB', value => {
      // Check if the value is a string (URL) or a file
      if (typeof value === 'string') return true; // Allow string URLs without size validation
      return value && value.size <= 1048576; // Check file size if it's a file
    }),

  descriptionEn: yup
    .string()
    .required('Description is required!')
    .min(20, 'Description must be at least 20 characters')
    .max(200, 'Description must be at most 200 characters'),
});

export const addBatchSchema = yup.object().shape({
  service: yup.string().required('Please select a service'),
  // Define the type for the array
  name: yup
    .string()
    .required('Please add a batch name')
    .min(3, 'Description must be at least 3 characters')
    .max(30, 'Description must be at most 30 characters'),
  code: yup
    .string()
    .required('Please add a code ')
    .min(3, 'Description must be at least 3 characters')
    .max(30, 'Description must be at most 30 characters'),
  price: yup.number().required('Please add price'),
  startingTime: yup
    .string()
    .matches(timeFormat, 'Starting time must be in the format HH:mm')
    .required('Please add starting time'),

  endingTime: yup
    .string()
    .matches(timeFormat, 'Ending time must be in the format HH:mm')
    .required('Please add ending time')
    .test(
      'is-greater',
      'Ending time must be greater than starting time',
      function (value) {
        const { startingTime } = this.parent;
        if (!startingTime || !value) return true; // Skip validation if either is missing
        return value > startingTime; // Ensure ending time is after starting time
      }
    ),
  totalCandidates: yup
    .number()
    .typeError('Candidates must be a number')
    .required('Please add number of  Candidates'),
  trainingDays: yup
    .array()
    .of(
      yup.object({
        id: yup.number().required(),
        day: yup.string().required(),
        isSelected: yup.boolean().required(),
      })
    )
    .test(
      'at-least-one-day-selected',
      'Please select at least one training day',
      days => days && days.some(day => day.isSelected)
    ),
  trainer: yup.string().required('please select a trainer'),
});

export const addTrainerSchema = yup.object().shape({
  services: yup.string().required('Please select a service'),

  avatar: yup
    .mixed()
    .required('A file is required')
    .test('fileSize', 'File is too large, max size is 1MB', value => {
      return value && value.size <= 1048576; // Check file size is <= 1MB
    })
    .test(
      'fileDimensions',
      'Image dimensions must be 400px x 400px or smaller',
      value => {
        return new Promise(resolve => {
          if (!value) return resolve(false);

          const img = new Image();
          img.src = URL.createObjectURL(value);

          img.onload = () => {
            const { width, height } = img;
            resolve(width <= 400 && height <= 400);
          };

          img.onerror = () => resolve(false);
        });
      }
    ),
  Fname: yup
    .string()
    .required('First name is required!')
    .min(4, 'First name must be at least 4 characters')
    .max(20, 'First name must be at most 20 characters'),

  Lname: yup
    .string()
    .required('Last name is required!')
    .min(4, 'Last name must be at least 4 characters')
    .max(20, 'Last name must be at most 20 characters'),

  services: yup
    .array()
    .of(yup.string().required('Each service must be a valid string')) // Validate that each item in the array is a string
    .min(1, 'At least one service must be selected')
    .required('Services are required'),

  cost: yup
    .number()
    .typeError('Cost must be a number')
    .required('Cost is required')
    .positive('Cost must be a positive number')
    .integer('Cost must be an integer')
    .min(1, 'Cost must be at least 1'),
  startingTime: yup.string().required('Starting time is required'),

  endingTime: yup
    .string()
    .required('Ending time is required')
    .test(
      'is-after-starting-time',
      'Ending time must be after starting time',
      function (value) {
        const { startingTime } = this.parent; // Access startingTime
        return startingTime && value > startingTime; // Ensure ending time is after starting time
      }
    ),
  trainingDays: yup
    .array()
    .of(
      yup.object({
        id: yup.number().required(),
        day: yup.string().required(),
        isSelected: yup.boolean().required(),
      })
    )
    .test(
      'at-least-one-day-selected',
      'Please select at least one training day',
      days => days && days.some(day => day.isSelected)
    ),
});

export const addHallSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required!')
    .min(4, 'Title must be at least 4 characters')
    .max(50, 'Title must be at most 50 characters'),

  size: yup
    .number()
    .typeError('Room size must be a number')
    .required('Room size is required')
    .positive('Room size must be a positive number')
    .integer('Room size must be an integer')
    .min(1, 'Room size must be at least 1'),

  totalCandidates: yup
    .number()
    .typeError('Occupancy must be a number')
    .required('Occupancy is required')
    .positive('Occupancy must be a positive number')
    .integer('Occupancy must be an integer')
    .min(1, 'Occupancy must be at least 1'),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
  country: yup.string().required('Please select your country'), // Add validation for country selection
});

export const schema = yup.object().shape({
  quote: yup
    .string()
    .max(200, 'Maximum 200 characters allowed')
    .required('Quote is required'),
  offeredPrice: yup
    .number()
    .typeError('Offered Price must be a number')
    .required('Offered Price is required'),
});
