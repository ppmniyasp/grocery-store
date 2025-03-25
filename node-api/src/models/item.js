const { DataTypes }    = require("sequelizer");
const { sequelize }    = require("../config/db");

// define item model
const Item  = sequelize.define( "item", {
    id : {
        type: DataTypes.INTEGER,
        autoInciment: true,
        primaryKey: true
    },
    code : {
        type : DataTypes.STRING(50),
        allowNull: false
    },
    name : {
        type : DataTypes.STRING(100),
        allowNull: false
    },
    rate : {
        type : DataTypes.FLOAT,
        allowNull   : false
    },
    stock :{
        type    : DataTypes.INTEGER,
        allowNull   : false
    },
    categoryid  : {
        type   : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model   : "categorymst",
            key : "id"
        },
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
    },
    isactive   : {
        type    : DataTypes.CHAR(1),
        allowNull : true,
        defaultValue : "Y"
    }
},{
    tableName   : "itemmst",
    timestamps  : true
});

module.exports = Item;
 