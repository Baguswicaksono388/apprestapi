module.exports = (sequelize, Sequelize) => {
    const Roles = sequelize.define("roles", {
        name: {
            type: Sequelize.STRING(10)
        },
        guard_name: {
            type: Sequelize.STRING(10)
        },
    }, {
         // Mengunci nama table
        freezeTableName: true
    })

    return Roles;
}