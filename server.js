const app = require("./app");
const {sequelize} = require("./models");
const config = require("./config")

app.listen(config.port, "0.0.0.0", async () => {
    await sequelize.authenticate();
    // await sequelize.sync({alter: true});
    // await sequelize.sync({force: true});
    console.log(`Connected to DB and listening on port ${config.port}...`);
})