module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '4f1122df6b0ce4ca4d3ff45c613886e6'),
  },
});
