const dbQuestionBank = require("../models/index-question-bank");
const PracticeStudySd = dbQuestionBank.practice_study_sd;
const QuestionBankSd = dbQuestionBank.question_bank_sd;
// const Op = dbQuestionBank.Sequilize.Op;

exports.findAll = (req, res) => {
    // const id_question_bank_sd = req.query.id_question_bank_sd;
    // let condition = id_question_bank_sd ? { id_question_bank_sd: { [Op.like]: `%${id_question_bank_sd}%` } } : null;

    PracticeStudySd.findAll({
        attributes: ['id', 'id_question_bank_sd', 'id_subject_main']
    })
        .then((data) => {
            res.status(200).send({
                status: "200",
                message: "success",
                data: data
            });
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrive"
            });
        });
};

exports.getSoalLatihanSD = (req, res) => {
    const post = {
        id_question_bank_sd: req.body.id_question_bank_sd
    }

    QuestionBankSd.hasMany(PracticeStudySd, { foreignKey: 'id_question_bank_sd' });
    PracticeStudySd.belongsTo(QuestionBankSd, { foreignKey: 'id_question_bank_sd' });

    PracticeStudySd.findAll({
        where: {
            id_question_bank_sd: post.id_question_bank_sd
        },
        attributes: ['id_question_bank_sd'],
        include: [{
            model: QuestionBankSd,
            attributes: ['question','answer','option_a','option_b','option_c','option_d']
        }]
    })
        .then((data) => {
            res.status(200).send({
                status: "200",
                message: "success",
                data: data
            });
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrive"
            });
        });
}