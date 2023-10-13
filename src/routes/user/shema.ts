import Joi from 'joi';

export default {
  registrationSchema: {
    payload: Joi.object({
      email: Joi.string().email().required().example('example@mail.ru'),

      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,20}$'))
        .required()
        .example('ExaMpl30'),

      name: Joi.string().min(1).max(20).required(),

      dateOfBirth: Joi.string()
        .isoDate()
        .required()
        .example('2004-10-12 00:00:00'),
    }),
  },

  authorizationSchema: {
    payload: Joi.object({
      email: Joi.string().email().required().example('example@mail.ru'),

      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,20}$'))
        .required()
        .example('ExaMpl30'),
    }),
  },
};
