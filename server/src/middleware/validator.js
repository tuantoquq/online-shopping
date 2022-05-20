import { check } from 'express-validator';

export const validateLoginCustomerAndShopper = [
    check('email', 'Email does not empty').not().isEmpty(),
    check('password', 'Password does not empty').not().isEmpty(),
];

export const validateRegister = [
    check('email', 'Email does not empty').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('username', 'Username does not empty').not().isEmpty(),
    check('firstName', 'First Name does not empty').not().isEmpty(),
    check('lastName', 'Last Name does not empty').not().isEmpty(),
    check('password', 'Password more than 6 characters').isLength({ min: 6 }),
];
