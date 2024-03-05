module.exports = {
    port: process.env.PORT,

    jwt_secret: process.env.JWT_SECRET,
    refresh_secret: process.env.REFRESH_SECRET,
    access_token_timeout: process.env.ACCESS_TOKEN_TIMEOUT,
    refresh_token_timeout: process.env.REFRESH_TOKEN_TIMEOUT,



    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbDatabase: process.env.DB_DATABASE,
    dbHost: process.env.DB_HOST,
    dbPort: parseInt(process.env.DB_PORT),
    dbDialect: process.env.DB_DIALECT,
    dgLogging: process.env.DB_LOGGING === "true"
}