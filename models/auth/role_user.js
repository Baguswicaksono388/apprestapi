module.exports = (sequelize, Sequelize) => {
    const Role_Users = sequelize.define("role_user", {
        url: {
            type: Sequelize.STRING(20),
        },
        role_id: {
            type: Sequelize.INTEGER(11)
        }
    }, {
        //Mengunci nama table
        freezeTableName: true
    })

    return Role_Users;
}