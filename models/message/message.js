module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {
        id_sender: {
            type: Sequelize.INTEGER
        },
        id_receiver: {
            type: Sequelize.INTEGER
        },
        message: {
            type: Sequelize.STRING(200)
        }
    }, {
        // Mengunci nama table
        freezeTableName: true
    })

    return Message;
}