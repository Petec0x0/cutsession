const createSessionValidationSchema = {
    merchantId: {
        isMongoId: true
    },
    startsAt: {
        notEmpty: true,
        matches: {
            options: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])*\w$/i,
            errorMessage: 'Please provide a valid time string'
        },
        customSanitizer: {
            options: (value) => {
                const reg = /[a-z]$/i;
                return value.replace(reg, "");
            },
        }
    },
    endsAt: {
        notEmpty: true,
        matches: {
            options: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])*\w$/i,
            errorMessage: 'Please provide a valid time string'
        },
        customSanitizer: {
            options: (value) => {
                const reg = /[a-z]$/i;
                return value.replace(reg, "");
            },
        }
    },
    type: {
        notEmpty: true,
        isIn: {
            options: [['WeekDay', 'WeekEnd']],
            errorMessage: "Please provide a valid type",
        },
        custom: {
            options: (value, { req }) => {
                const startsAt = req.body.startsAt.split(':');
                const endsAt = req.body.endsAt.split(':');
                
                let weekDayStartTIme = 9 * 60;
                let weekDayEndTIme = 20 * 60;
                let weekEndStartTIme = 10 * 60;
                let weekEndEndTIme = 22 * 60;
                
                let sT = parseInt(startsAt[0]) * 60 + parseInt(startsAt[1]);
                let eT = parseInt(endsAt[0]) * 60 + parseInt(endsAt[1]);

                // make starAt time is not greater than ensAt time
                if(sT > eT){
                    throw ("startsAt time can't be higher than endsAt time");
                }
                
                switch (value) {
                    case 'WeekDay':
                        /**
                         * make sure start and end time are between the 
                         * weekDayStartTIme & weekDayEndTIme
                         */
                        if(!((sT >= weekDayStartTIme) && (sT < weekDayEndTIme))){
                            throw ("startsAt time has to fall between 9am and 8pm");
                        }

                        if(!((eT > weekDayStartTIme) && (eT <= weekDayEndTIme))){
                            throw ("endsAt time has to fall between 9am and 8pm");
                        }
                        break;
                    case 'WeekEnd':
                        /**
                         * make sure start and end time are between the 
                         * weekEndStartTIme & weekEndEndTIme
                         */
                        if(!((sT >= weekEndStartTIme) && (sT < weekEndEndTIme))){
                            throw ("startsAt time has to fall between 10am and 10pm");
                        }

                        if(!((eT > weekEndStartTIme) && (eT <= weekEndEndTIme))){
                            throw ("endsAt time has to fall between 10am and 10pm");
                        }
                        break;
                    default:
                        break;
                }
                
                // make sure time slots is either 45, 60 or 90 minutes console.log(eT - sT)
                const timeSlot = eT - sT;
                if(!([45, 60, 90].includes(timeSlot))){
                    throw ("Time slot has to be 45, 60 or 90 minutes");
                }

                return value;
            },
        },

    }
}

module.exports = { createSessionValidationSchema };