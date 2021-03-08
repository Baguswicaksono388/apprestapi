module.exports = (sequelize, Sequelize) => {
    const Registration = sequelize.define("user", {
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
    }, {
        // Mengunci nama table
        freezeTableName: true
    });

    return Registration;
}