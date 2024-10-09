/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://car-market_owner:x4GcBE9WmaFV@ep-white-moon-a5gjsnvs.us-east-2.aws.neon.tech/car-market?sslmode=require',
    }
  };