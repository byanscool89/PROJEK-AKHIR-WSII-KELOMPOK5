// main.js
const baseUrl = 'http://localhost:3333'; // Sesuaikan dengan port server Anda

// Fungsi untuk mendapatkan semua sepatu
async function getAllSepatu() {
    try {
        const response = await fetch('http://localhost:3333/sepatu');
        const data = await response.json();
        console.log('Data dari server:', data);
        displaySepatu(data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Fungsi untuk menampilkan data sepatu dalam card
function displaySepatu(sepatuData) {
    const sepatuContainer = $('#sepatuContainer');
    sepatuContainer.empty();

    console.log(typeof sepatuData);

    if (Array.isArray(sepatuData) || (sepatuData && Array.isArray(sepatuData.data))) {
        const sepatuList = Array.isArray(sepatuData) ? sepatuData : sepatuData.data;

        sepatuList.forEach((sepatu, index) => {
            const card = `
                <div class="card shadow-sm col-md-3 mb-4 mx-md-2">
                    <div class="card-body">
                        <h5 class="card-title text-primary">${sepatu.nama}</h5>
                        <p class="card-text">Merk: ${sepatu.merk}</p>
                        <p class="card-text">Jenis: ${sepatu.jenis}</p>
                        <p class="card-text">Ukuran: ${sepatu.ukuran}</p>
                        <p class="card-text">Harga: Rp${sepatu.harga}.000</p>
                        <p class="card-text">Stok: ${sepatu.stok}</p>
                    </div>
                </div>
            `;
            sepatuContainer.append(card);

            if ((index + 1) % 3 === 0) {
                sepatuContainer.append('<div class="w-100 d-md-none d-lg-none d-xl-none"></div>');
            }
        });
    } else {
        console.error('Sepatu data is not an array.');
    }
}

// Panggil fungsi untuk mendapatkan semua sepatu saat halaman dimuat
getAllSepatu();
