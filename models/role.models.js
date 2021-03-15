module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        name: {
            type: Sequelize.STRING(10)
        }
    }, {
        // Mengunci nama table
        freezeTableName: true
    });

    return Role;
}