const { Sepatu } = require('../models');

const findAllSepatus = async (req, res) => {
    try {
        const data = await Sepatu.findAll();
        const result = {
            status: 'ok',
            data: data
        };
        res.json(result);
    } catch (error) {
        console.log('Error finding all Sepatus', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

const getSepatuById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Sepatu.findByPk(id);

        if (data === null) {
            return res.status(404).json({
                status: 'failed',
                message: `Data Sepatu with id ${id} is not found`
            });
        }

        res.json({
            status: 'ok',
            data: data
        });
    } catch (error) {
        console.log(error, 'Error get Sepatu by id');
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};

const createNewSepatu = async (req, res) => {
    try {
        // Mendapatkan request body
        const { nama, merk, jenis, ukuran, harga, stok } = req.body;

        // Membuat sepatu baru
        const newSepatu = await Sepatu.create({ nama, merk, jenis, ukuran, harga, stok });

        // Mengembalikan respons ke client
        res.status(201).json({
            status: 'ok',
            data: {
                id: newSepatu.id,
                nama: newSepatu.nama,
                merk: newSepatu.merk,
                jenis: newSepatu.jenis,
                ukuran: newSepatu.ukuran,
                harga: newSepatu.harga,
                stok: newSepatu.stok,
                createdAt: newSepatu.createdAt,
                updatedAt: newSepatu.updatedAt
            }
        });
    } catch (error) {
        console.log(error, 'Error create new Sepatu');
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};

const updateSepatu = async (req, res) => {
    try {
        // Mendapatkan req.params untuk mendapatkan data sepatu berdasarkan ID
        const { id } = req.params;

        // Mendapatkan req.body untuk mendapatkan data yang ingin diupdate (nama, merk, jenis, ukuran, harga, stok)
        const { nama, merk, jenis, ukuran, harga, stok } = req.body;

        // Mencari sepatu berdasarkan ID
        const sepatu = await Sepatu.findByPk(id);

        // Jika sepatu tidak ditemukan, kirim respons 404
        if (!sepatu) {
            return res.status(404).json({
                status: 'failed',
                message: `Data sepatu with id ${id} does not exist`
            });
        }

        // Memperbarui data sepatu
        sepatu.nama = nama;
        sepatu.merk = merk;
        sepatu.jenis = jenis;
        sepatu.ukuran = ukuran;
        sepatu.harga = harga;
        sepatu.stok = stok;
        sepatu.updatedAt = new Date();

        // Menyimpan perubahan
        await sepatu.save();

        // Mengembalikan respons ke client
        res.json({
            status: 'ok',
            data: {
                id: sepatu.id,
                nama: sepatu.nama,
                merk: sepatu.merk,
                jenis: sepatu.jenis,
                ukuran: sepatu.ukuran,
                harga: sepatu.harga,
                stok: sepatu.stok,
                createdAt: sepatu.createdAt,
                updatedAt: sepatu.updatedAt
            }
        });
    } catch (error) {
        console.log(error, 'Error updating sepatu');
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};

const destroySepatu = async (req, res) => {
    try {
        // Mendapatkan req.params untuk mendapatkan data sepatu berdasarkan ID
        const { id } = req.params;

        // Mencari sepatu berdasarkan ID
        const sepatu = await Sepatu.findByPk(id);

        // Jika sepatu tidak ditemukan, kirim respons 404
        if (!sepatu) {
            return res.status(404).json({
                status: 'failed',
                message: `Data sepatu with id ${id} does not exist`
            });
        }

        // Menghapus sepatu
        await sepatu.destroy();

        // Mengembalikan respons ke client
        res.json({
            status: 'ok',
            message: `Success delete sepatu with id ${id}`
        });
    } catch (error) {
        console.log(error, 'Error destroy sepatu');
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};


module.exports = { findAllSepatus, getSepatuById, createNewSepatu, updateSepatu, destroySepatu };