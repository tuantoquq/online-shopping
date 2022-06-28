import { check } from 'express-validator';

export const validateLoginCustomerAndShopper = [
    check('email', 'Email does not empty').not().isEmpty(),
    check('password', 'Password does not empty').not().isEmpty(),
];

export const validateAdmin = [
    check('username', 'Username does not empty').not().isEmpty().isLength({ min: 6 }),
    check('password', 'Password does not empty')
        .not()
        .isEmpty()
        .isLength({ min: 6, max: 20 }),
];

export const validateRegister = [
    check('email', 'Email does not empty').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('firstName', 'First Name does not empty').not().isEmpty(),
    check('lastName', 'Last Name does not empty').not().isEmpty(),
    check('password', 'Password more than 6 characters').isLength({ min: 6 }),
    check('phoneNumber', 'Invalid phoneNumber')
        .isLength({ min: 10, max: 12 })
        .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/),
    check('dateOfBirth', 'Date of birth does not empty').not().isEmpty(),
    check('gender', 'Gender does not empty').not().isEmpty(),
];
