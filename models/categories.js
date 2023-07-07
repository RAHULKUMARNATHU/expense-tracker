module.exports = function (sequelize, DataTypes) {
  const categories = sequelize.define(
    "categories",
    {
      category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      user_id: {
      type:DataTypes.INTEGER,
      allowNull:true
      },
      is_created_by_admin:{
      type: DataTypes.BOOLEAN,
      defaultValue:false,
      allowNull:false
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
