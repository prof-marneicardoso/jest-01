
import { DataTypes } from "sequelize";
import configDB from "../config/db.js";

const User = configDB.define('User', {
    // Campos
    username: {
        type: DataTypes.STRING(30), // varchar(30)
        allowNull: false,   // NOT NULL
    },
    email: {
        type: DataTypes.STRING(50), // varchar(30)
        allowNull: false,   // NOT NULL
        unique: true,       // Não pode repetir o e-mail
    },
}, {
    tableName: 'users', // Nome da tabela
    timestamps: true,   // Cria campos createdAt e updatedAt automaticamente
});

export default User;
