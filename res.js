'use strict' //ini fungsinya untuk mengetatkan variabel yang ada di js

exports.ok = function (values, res) {
    var data = {
        'status': 200,
        'values': values
    }

    res.json(data);
    res.end();
};

// response for Nested matakuliah
exports.okNested = function (values, res) {
    // lakukan akumulasi
    const hasil = values.reduce((akumulasikan, item) => {
        // tentukan key group
        if (akumulasikan[item.nama]) {
            // buat variable group nama mahasiswa
            const group = akumulasikan[item.nama];
            // Cek jika isi array adlah matkul
            if (Array.isArray(group.matakuliah)) {
                // tambahkan value ke dalam group matakuliah
                group.matakuliah.push(item.matakuliah) //push : memasukkan value baru kedalam array
            } else {
                group.matakuliah = [group.matakuliah, item.matakuliah]
            }
        } else {
            akumulasikan[item.nama] = item;
        }
        return akumulasikan;
    }, {});

    var data = {
        'status': 200,
        'values': hasil
    }

    res.json(data);
    res.end();
}