// api/utils/validators.js
const { body, param, validationResult } = require('express-validator');
const validator = require('validator');
const User = require('../models/User');

const isEgyptianPhone = (value) => {
    return validator.isMobilePhone(value, 'ar-EG');
};

const isStrongPassword = (value) => {
    return validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1
    });
};

const registerValidationRules = [
    body('name')
        .trim()
        .notEmpty().withMessage({
            en: 'Name is required',
            ar: 'الاسم مطلوب'
        })
        .isLength({ min: 3 }).withMessage({
            en: 'Name must be at least 3 characters',
            ar: 'الاسم يجب أن يكون 3 أحرف على الأقل'
        }),

    body('email')
        .trim()
        .notEmpty().withMessage({
            en: 'Email is required',
            ar: 'البريد الإلكتروني مطلوب'
        })
        .isEmail().withMessage({
            en: 'Invalid email format',
            ar: 'صيغة البريد الإلكتروني غير صحيحة'
        })
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new Error(JSON.stringify({
                    en: 'Email already in use',
                    ar: 'البريد الإلكتروني مستخدم بالفعل'
                }));
            }
        }),

    body('phone_number')
        .trim()
        .notEmpty().withMessage({
            en: 'Phone number is required',
            ar: 'رقم الهاتف مطلوب'
        })
        .custom(isEgyptianPhone).withMessage({
            en: 'Invalid Egyptian phone number',
            ar: 'رقم هاتف مصري غير صحيح'
        }),

    body('guardianPhone')
        .trim()
        .notEmpty().withMessage({
            en: 'Guardian phone is required',
            ar: 'رقم ولي الأمر مطلوب'
        })
        .custom(isEgyptianPhone).withMessage({
            en: 'Invalid guardian phone number',
            ar: 'رقم ولي الأمر غير صحيح'
        }),

    body('password')
        .notEmpty().withMessage({
            en: 'Password is required',
            ar: 'كلمة المرور مطلوبة'
        })
        .custom(isStrongPassword).withMessage({
            en: 'Password must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 number',
            ar: 'يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، حرف كبير، حرف صغير، ورقم'
        })
];

const loginValidationRules = [
    body('email')
        .trim()
        .notEmpty().withMessage({
            en: 'Email is required',
            ar: 'البريد الإلكتروني مطلوب'
        })
        .isEmail().withMessage({
            en: 'Invalid email format',
            ar: 'صيغة البريد الإلكتروني غير صحيحة'
        }),

    body('password')
        .notEmpty().withMessage({
            en: 'Password is required',
            ar: 'كلمة المرور مطلوبة'
        })
];

const courseValidationRules = [
    body('title')
        .trim()
        .notEmpty().withMessage({
            en: 'Course title is required',
            ar: 'عنوان الكورس مطلوب'
        })
        .isLength({ min: 5 }).withMessage({
            en: 'Title must be at least 5 characters',
            ar: 'العنوان يجب أن يكون 5 أحرف على الأقل'
        }),

    body('teacher')
        .trim()
        .notEmpty().withMessage({
            en: 'Teacher name is required',
            ar: 'اسم المدرس مطلوب'
        })
];

// === معالج الأخطاء ===
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const formattedErrors = {};
    errors.array().forEach(err => {
        const errorMsg = JSON.parse(err.msg); // تحويل رسالة الخطأ من JSON
        formattedErrors[err.path] = {
            en: errorMsg.en,
            ar: errorMsg.ar
        };
    });

    return res.status(422).json({
        errors: formattedErrors,
        message: {
            en: 'Validation failed',
            ar: 'فشل التحقق من البيانات'
        }
    });
};

module.exports = {
    registerValidationRules,
    loginValidationRules,
    courseValidationRules,
    validate
};