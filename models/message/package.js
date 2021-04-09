module.exports = (sequelize, Sequelize) => {
    const Package = sequelize.define("Package", {
        package_message : {
            type : Sequelize.INTEGER
        }
    }, {
        // Mengunci nama table
        freezeTableName: true
    })
    
    return Package;
}