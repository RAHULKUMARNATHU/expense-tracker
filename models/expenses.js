module.exports = function (sequelize, DataTypes) {
  const expenses = sequelize.define(
    "expenses",
    {
      expense_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
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
  return expenses
}
