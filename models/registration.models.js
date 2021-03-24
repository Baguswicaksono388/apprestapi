module.exports = (sequelize, Sequelize) => {
    const Registration = sequelize.define("users", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING,
            access: false
        },
        role_id: {
            type: Sequelize.TINYINT
        }
    },{
        sequelize,
        paranoid: true,
      
        // If you want to give a custom name to the deletedAt column
        deletedAt: 'destroyTime'
    },{
        // Mengunci nama table
        freezeTableName: true
    });

    return Registration;
}