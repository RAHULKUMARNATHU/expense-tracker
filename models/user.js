module.exports = function(sequelize , DataTypes) {
    const users = sequelize.define(
        'users',
        {
            user_id: {
                type : DataTypes.INTEGER,
                autoIncrement : true,
                primaryKey : true
            },
            first_name: {
                type : DataTypes.STRING(50),
                allowNull : false
            },
            last_name:{
                type:DataTypes.STRING(50),
                allowNull:false
            },
            email:{
                type : DataTypes.STRING(200),
                allowNull : false,
                unique: true
            },
            password:{
                type:DataTypes.STRING(200),
                allowNull:false
            }
            
        },
        {
            tableName: 'users',
            classMethod:{},
            timestamps: true,
            createdAt: 'created_at',
            updatedAt : 'updated_at'
        }
    );

    return users;
}
