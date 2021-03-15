module.exports = (sequelize, Sequelize) => {
    const Practice_Study_Sd = sequelize.define("practice_study_sd", {
        id_question_bank_sd : {
            type: Sequelize.BIGINT(255)
        },
        id_subject_main : {
            type: Sequelize.BIGINT(255),
        }
    }, {
        // Mengunci nama table
        freezeTableName: true
    });

    Practice_Study_Sd.associate = function (models) {
        Practice_Study_Sd.hashOne(models.Question_Bank_Sd, { foreignKey: 'id', sourceKey: 'id_question_bank_sd' });
    }

    return Practice_Study_Sd;
}