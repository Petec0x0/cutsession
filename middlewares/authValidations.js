const { User, Merchant } = require('../models');

const loginValidationSchema = {
    username: {
        isLength: {
            min: 6,
            max: 20
        }
    },
    password: {
        isLength: {
            min: 6,
        },
        errorMessage: "Password must be greater than 6 characters",
    },
    accessType: {
        notEmpty: true,
        isIn: {
            options: [['USER', 'MERCHANT']],
        },
        errorMessage: "Please provide a valid access type",
    }
}

const registerUserValidationSchema = {
    name: {
        notEmpty: true,
        isLength: {
            min: 2,
            max: 25
        },
        errorMessage: "Name field must be greater than 2 and less that 25 characters"
    },
    dob: {
        toDate: true,
        isRFC3339: true,
        errorMessage: "Date of birth field must be a valid  RFC 3339 date"
    },
    email: {
        normalizeEmail: true,
        custom: {
            options: value => {
                return User.find({
                    email: value
                }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('Email address already taken')
                    }
                })
            }
        }
    },
    cityOfResidence: {
        notEmpty: true,
        isLength: {
            max: 20
        }
    },
    username: {
        custom: {
            options: value => {
                return User.find({
                    username: value
                }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('Username already in use')
                    }
                })
            }
        },
        isLength: {
            min: 6,
            max: 20
        }
    },
    password: {
        isLength: {
            min: 6,
        },
        errorMessage: "Password must be greater than 6 characters",
    },
    phoneNumber: {
        notEmpty: true,
        isLength: {
            max: 20
        },
        errorMessage: "Phone number cannot be empty"
    }
}

const registerMerchantValidationSchema = {
    name: {
        notEmpty: true,
        isLength: {
            min: 2,
            max: 25
        },
        errorMessage: "Name field must be greater than 2 and less that 25 characters"
    },
    email: {
        normalizeEmail: true,
        custom: {
            options: value => {
                return Merchant.find({
                    email: value
                }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('Email address already taken')
                    }
                })
            }
        }
    },
    cityOfResidence: {
        notEmpty: true,
        isLength: {
            max: 20
        }
    },
    username: {
        custom: {
            options: value => {
                return Merchant.find({
                    username: value
                }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('Username already in use')
                    }
                })
            }
        },
        isLength: {
            min: 6,
            max: 20
        }
    },
    password: {
        isLength: {
            min: 6,
        },
        errorMessage: "Password must be greater than 6 characters",
    },
    phoneNumber: {
        notEmpty: true,
        isLength: {
            max: 20
        },
        errorMessage: "Phone number cannot be empty"
    }
}

module.exports = { registerUserValidationSchema, registerMerchantValidationSchema, loginValidationSchema };