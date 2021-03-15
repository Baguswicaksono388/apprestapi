module.exports = (sequelize, Sequelize) => {
    const Question_Bank_Sd = sequelize.define("question_bank_sd", {
        question: {
            type: Sequelize.TEXT
        },
        answer: {
            type: Sequelize.TEXT
        },
        option_a: {
            type: Sequelize.TEXT
        },
        option_b: {
            type: Sequelize.TEXT
        },
        option_c: {
            type: Sequelize.TEXT
        },
        option_d: {
            type: Sequelize.TEXT
        },
        status_approved: {
            type: Sequelize.ENUM('0','1')
        },
        show_question: {
            type: Sequelize.ENUM('0','1')
        },
        rate_question: {
            type: Sequelize.FLOAT
        },
        level_question: {
            type: Sequelize.FLOAT
        },
        from: {
            type: Sequelize.ENUM('0','1')
        }
        // deleteAt: {
        //     type: Sequelize.TIMESTAMP
        // }
    }, {
        // Mengunci nama table
        freezeTableName: true
    });

    Question_Bank_Sd.associate = function(models) {
        Question_Bank_Sd.belongsTo(models.role, {foreignKey: 'id'});
    }

    return Question_Bank_Sd;
}