const baseUrl = 'http://localhost:3333'; // Sesuaikan dengan port server Anda

// Fungsi untuk mendapatkan semua sepatu
async function getAllSepatu() {
    try {
        const response = await fetch(`${baseUrl}/sepatu`);
        const data = await response.json();
        console.log('Data dari server:', data);
        displaySepatuInTable(data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Fungsi untuk menampilkan data sepatu dalam tabel
function displaySepatuInTable(sepatuData) {
    const sepatuTableBody = $('#sepatuTableBody');
    sepatuTableBody.empty();

    console.log(typeof sepatuData);

    if (Array.isArray(sepatuData) || (sepatuData && Array.isArray(sepatuData.data))) {
        const sepatuList = Array.isArray(sepatuData) ? sepatuData : sepatuData.data;

        sepatuList.forEach(sepatu => {
            const row = `
                <tr data-id="${sepatu.id}" id="row_${sepatu.id}">
                    <td>${sepatu.id}</td>
                    <td>${sepatu.nama}</td>
                    <td>${sepatu.merk}</td>
                    <td>${sepatu.jenis}</td>
                    <td>${sepatu.ukuran}</td>
                    <td>Rp.${sepatu.harga}.000</td>
                    <td>${sepatu.stok}</td>
                    <td>
                        <button class="btn btn-primary" onclick="editSepatu(${sepatu.id})" data-toggle="modal" data-target="#editModal">Edit</button>
                        <button class="btn btn-danger" onclick="confirmDelete(${sepatu.id})">Hapus</button>
                    </td>
                </tr>
            `;
            sepatuTableBody.append(row);
        });
    } else {
        console.error('Sepatu data is not an array.');
    }
}

// Fungsi untuk menambahkan sepatu dari formulir
async function tambahSepatu(sepatuData) {
    try {
        const response = await fetch(`${baseUrl}/sepatu`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sepatuData),
        });

        const data = await response.json();
        console.log('Sepatu berhasil ditambahkan:', data);

        // Panggil fungsi untuk mendapatkan semua sepatu untuk memperbarui antarmuka pengguna
        await getAllSepatu();

        // Tampilkan notifikasi sukses
        Swal.fire('Sukses!', 'Data sepatu berhasil ditambahkan.', 'success');

        // Mengosongkan nilai formulir setelah berhasil menyimpan
        document.getElementById('sepatuForm').reset();
    } catch (error) {
        console.error('Error:', error.message);
    }
}

document.getElementById('sepatuForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const sepatuData = {};
    formData.forEach((value, key) => {
        sepatuData[key] = value;
    });

    // Panggil fungsi untuk menambahkan sepatu
    await tambahSepatu(sepatuData);

    // Setelah menambahkan, dapatkan kembali semua sepatu untuk memperbarui antarmuka pengguna
    await getAllSepatu();
});

// Fungsi untuk mengambil data sepatu berdasarkan ID dan menampilkan modal form pengeditan
async function editSepatu(id) {
    try {
        const response = await fetch(`${baseUrl}/sepatu/${id}`);
        const data = await response.json();

        if (data.status === 'ok') {
            const sepatu = data.data;

            // Isi nilai input pada form pengeditan dengan data sepatu yang dipilih
            $('#editSepatuForm #editNama').val(sepatu.nama);
            $('#editSepatuForm #editMerk').val(sepatu.merk);
            $('#editSepatuForm #editJenis').val(sepatu.jenis);
            $('#editSepatuForm #editUkuran').val(sepatu.ukuran);
            $('#editSepatuForm #editHarga').val(sepatu.harga);
            $('#editSepatuForm #editStok').val(sepatu.stok);
            $('#editSepatuForm #editSepatuId').val(sepatu.id);

            // Tampilkan modal form pengeditan
            $('#editModal').modal('show');
        } else {
            console.error('Error getting sepatu data:', data.message);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Fungsi untuk menyimpan perubahan pada data sepatu setelah diedit
async function saveEditedSepatu() {
    try {
        const editForm = document.getElementById('editSepatuForm');
        const formData = new FormData(editForm);
        const sepatuData = {};
        formData.forEach((value, key) => {
            sepatuData[key] = value;
        });

        // Mengambil data sepatu sebelum diedit (sebelum formulir diisi)
        const sepatuSebelum = await fetch(`${baseUrl}/sepatu/${sepatuData.editSepatuId}`);
        const sepatuSebelumData = await sepatuSebelum.json();

        // Membandingkan nilai sebelum dan setelah pengeditan
        const isDataSama = JSON.stringify(sepatuSebelumData) === JSON.stringify(sepatuData);

        if (isDataSama) {
            // Tampilkan notifikasi bahwa data tidak berubah
            Swal.fire('Perhatian!', 'Data sepatu tidak mengalami perubahan.', 'warning');
        } else {
            // Melakukan permintaan PATCH hanya jika ada perubahan pada data
            const response = await fetch(`${baseUrl}/sepatu/${sepatuData.editSepatuId}`, {
                method: 'PATCH', // Jangan lupa pastikan API server mendukung metode PATCH
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sepatuData),
            });

            const data = await response.json();

            if (data.status === 'ok') {
                // Sembunyikan modal form pengeditan setelah berhasil menyimpan perubahan
                $('#editModal').modal('hide');

                // Panggil fungsi untuk mendapatkan semua sepatu untuk memperbarui antarmuka pengguna
                await getAllSepatu();

                // Tampilkan notifikasi sukses
                Swal.fire('Sukses!', 'Data sepatu berhasil diupdate.', 'success');
            } else {
                console.error('Error updating sepatu data:', data.message);
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}
// Fungsi untuk konfirmasi penghapusan sepatu
async function confirmDelete(id) {
    const result = await Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Anda tidak akan dapat mengembalikan ini!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, hapus!'
    });

    if (result.isConfirmed) {
        // Panggil fungsi untuk menghapus sepatu
        await deleteSepatu(id);

        // Tampilkan notifikasi sukses
        Swal.fire('Sukses!', 'Data sepatu berhasil dihapus.', 'success');
    }
}

// Fungsi untuk menghapus sepatu berdasarkan ID
async function deleteSepatu(id) {
    try {
        const response = await fetch(`${baseUrl}/sepatu/${id}`, {
            method: 'DELETE',
        });

        const data = await response.json();

        if (data.status === 'ok') {
            // Panggil fungsi untuk mendapatkan semua sepatu untuk memperbarui antarmuka pengguna
            await getAllSepatu();
        } else {
            console.error('Error deleting sepatu:', data.message);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Panggil fungsi untuk mendapatkan semua sepatu saat halaman dimuat
getAllSepatu();
