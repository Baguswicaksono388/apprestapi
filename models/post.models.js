module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", { //nama table post
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    }, {
        // Mengunci nama table
        freezeTableName: true
    });

    return Post;
}