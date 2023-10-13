import Joi from 'joi';

export const schemaRefresh = Joi.object({
  tokenRefresh: Joi.string()
    .example('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1cm46YXVkaWVuY2U6dGVzdCIsImlzcyI6InVybjppc3N1ZXI6dGVzdCIsImdyb3VwIjoibGFkX2JhY2tlbmRfaW50ZXJucyIsInVpZCI6MCwiZW1haWwiOiJqb2huLmRvZUBnbWFpbC5jb20iLCJpYXQiOjE2Njg0NDA3MTAsImV4cCI6MTY2ODQ0MTYxMH0.-tIuZY2aXczDo9bPM4jLl7G2zx8JOzJM63gqn1DNVsQ')
    .required(),
});

export const schemaLogout = Joi.object({
  tokenAccess: Joi.string()
    .example('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1cm46YXVkaWVuY2U6dGVzdCIsImlzcyI6InVybjppc3N1ZXI6dGVzdCIsImdyb3VwIjoibGFkX2JhY2tlbmRfaW50ZXJucyIsInVpZCI6MCwiZW1haWwiOiJqb2huLmRvZUBnbWFpbC5jb20iLCJpYXQiOjE2Njg0NDA3MTAsImV4cCI6MTY2ODQ0MTYxMH0.-tIuZY2aXczDo9bPM4jLl7G2zx8JOzJM63gqn1DNVsQ')
    .required(),
})