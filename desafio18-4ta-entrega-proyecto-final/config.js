import 'dotenv/config';

export default {
    PORT: process.env.PORT,
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
    MONGO_LOCAL_URL: process.env.MONGO_LOCAL_URL,

    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_HOST: process.env.DB_HOST,

    ETHEREAL_PORT: process.env.ETHEREAL_PORT,
    ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL,
    ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD,
    ETHEREAL_NAME: process.env.ETHEREAL_NAME,
    ETHEREAL_HOST: process.env.ETHEREAL_HOST,

    GMAIL_EMAIL: process.env.GMAIL_EMAIL,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD
}