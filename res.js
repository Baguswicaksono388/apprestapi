'use strict' //ini fungsinya untuk mengetatkan variabel yang ada di js

exports.ok = function (values, res) {
    var data = {
        'status': 200,
        'values': values
    }

    res.json(data);
    res.end();
};