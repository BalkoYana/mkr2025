require('dotenv').config();

const config = {
    port: process.env.PORT || 3003,

    mongodb_url: process.env.MONGOURI || 'mongodb+srv://balkoyana1:Balko777@cluster0.zpv7z.mongodb.net/invoicing_project?appName=Cluster0',
    jwtSecret: process.env.JWT_SECRET || 'secret',
    enableScheduleJobs: process.env.ENABLE_SCHEDULE_JOBS || true,
};

module.exports = config;