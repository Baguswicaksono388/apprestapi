module.exports = (sequelize, Sequelize) => {
    const Has_Model_Roles = sequelize.define("has_model_roles", {
        role_id: {
            type: Sequelize.INTEGER(11)
        },
        model_id: {
            type: Sequelize.INTEGER(11)
        }
    }, {
        // Mengunci nama table
        freezeTableName: true
    })
    return Has_Model_Roles;
}