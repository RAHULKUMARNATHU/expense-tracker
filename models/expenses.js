module.exports = function (sequelize, DataTypes) {
  const expenses = sequelize.define(
    "expenses",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      amount: {
        type:DataTypes.DOUBLE(10, 2) 
      }
    },
    {
      tableName: "expenses",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )

  expenses.associate = function (model) {
    expenses.belongsTo(model.users, {
      foreignKey: "user_id",
      targetKey: "user_id",
    })
  }

  expenses.associate = function (model) {
    expenses.belongsTo(model.categories, {
      foreignKey: "category_id",
      targetKey: "category_id",
    })
  }  

  return expenses
}
