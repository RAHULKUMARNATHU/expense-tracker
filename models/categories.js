module.exports = function (sequelize, DataTypes) {
  const categories = sequelize.define(
    "categories",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      user_id: {
      type:DataTypes.INTEGER,
      required:true
    }
    },
    {
      tableName: "categories",
      classMethod: {},
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return categories;
};
