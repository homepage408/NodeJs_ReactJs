'use strict';
exports.ok = function (values, res) {
    var data = {
        'status': 200,
        'value': values
    };

    res.json(data);
    res.end();
};

// Response untuk nested Matakuliah
exports.okNested = function (values, res) {
    // Lakukan akumulasi
    const hasil = values.reduce((akumulasikan, item) => {
        // Tentukan key Group nya
        if (akumulasikan[item.nama]) {
            // Buat variable group nama mahasiswa
            const group = akumulasikan[item.nama];
            // cek jika isi array adalah matakuliah
            if (Array.isArray(group.matakuliah)) {
                // tambahkan valuesnya ke dalam group matakuliah
                group.matakuliah.push(item.matakuliah)
            } else {
                group.matakuliah = [group.matakuliah, item.matakuliah];
            }
        } else {
            akumulasikan[item.nama] = item;
        }
        return akumulasikan;
    }, {});

    var data = {
        'status': 200,
        'value': hasil,
    };

    res.json(data);
    res.end();
}