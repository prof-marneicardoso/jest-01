
import { DataTypes } from "sequelize";
import configDB from "../config/db.js";

const Product = configDB.define('Product', {
    name: {
        type: DataTypes.STRING(50),  // varchar(50)
        allowNull: false,   // NOT NULL
    },
    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,   // NOT NULL
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,    // NULL
    },
}, {
    tableName: 'products',  // Nome da tabela
    timestamps: true,       // Cria campos createdAt e updatedAt automaticamente
});

export default Product;
