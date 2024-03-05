"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Token extends Model {
        static associate() {
        }
    }

    Token.init(
        {
            token: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            refresh_token:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            tableName: "tokens",
            modelName: "Token",
        }
    );
    return Token;
};