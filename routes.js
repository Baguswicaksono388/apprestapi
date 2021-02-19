//file ini fungsinya membuat semacam navigasi
'use strict'

module.exports = function (app) {
    var jsonku = require("./controller");

    app.route('/').get(jsonku.index);
    app.route('/showdatamahasiswa').get(jsonku.showDataMahasiswa);
    app.route('/showmahasiswabyid/:id').get(jsonku.showMahasiswaById);
}