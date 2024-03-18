import { Sequelize } from "sequelize";

const sequelize = new Sequelize('angular-test', 'root', '70546414',{
    host: 'localhost',
    dialect: "mysql",
});

export default sequelize;