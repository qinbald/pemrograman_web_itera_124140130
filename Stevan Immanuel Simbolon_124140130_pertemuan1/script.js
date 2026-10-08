// Array untuk menampung daftar belanjaan
let keranjang = [];

// Ambil elemen form dan input
const formBarang = document.getElementById("formBarang");
const inputNama = document.getElementById("namaBarang");
const inputHarga = document.getElementById("hargaBarang");
const inputJumlah = document.getElementById("jumlahBarang");

// Ambil elemen pesan error
const errorNama = document.getElementById("errorNama");
const errorHarga = document.getElementById("errorHarga");
const errorJumlah = document.getElementById("errorJumlah");

// Ambil elemen tabel dan total
const daftarKeranjang = document.getElementById("daftarKeranjang");
const totalBelanjaEl = document.getElementById("totalBelanja");
const jumlahDiskonEl = document.getElementById("jumlahDiskon");
const keteranganDiskonEl = document.getElementById("keteranganDiskon");
const totalAkhirEl = document.getElementById("totalAkhir");
const inputUangBayar = document.getElementById("uangBayar");
const pesanPembayaranEl = document.getElementById("pesanPembayaran");
const tombolReset = document.getElementById("tombolReset");

// Fungsi pembantu untuk ubah angka jadi format Rupiah
function formatRupiah(angka) {
  return "Rp" + Math.round(angka).toLocaleString("id-ID");
}

// Muat data keranjang yang tersimpan di localStorage saat web dibuka
function muatKeranjang() {
  const dataTersimpan = localStorage.getItem("keranjangKantin");
  if (dataTersimpan) {
    keranjang = JSON.parse(dataTersimpan);
  } else {
    keranjang = [];
  }
  tampilkanKeranjang();
  hitungTotal();
}

// Simpan data keranjang ke localStorage
function simpanKeranjang() {
  localStorage.setItem("keranjangKantin", JSON.stringify(keranjang));
}

// Render tabel keranjang dari array
function tampilkanKeranjang() {
  daftarKeranjang.innerHTML = "";

  if (keranjang.length === 0) {
    daftarKeranjang.innerHTML = '<tr><td colspan="6" class="kosong">Keranjang masih kosong.</td></tr>';
    return;
  }

  for (let i = 0; i < keranjang.length; i++) {
    const barang = keranjang[i];
    const tr = document.createElement("tr");
    const isiBaris = [
      i + 1,
      barang.nama,
      formatRupiah(barang.harga),
      barang.qty,
      formatRupiah(barang.subtotal)
    ];

    // Gunakan textContent supaya nama barang tidak dibaca sebagai HTML
    for (let j = 0; j < isiBaris.length; j++) {
      const td = document.createElement("td");
      td.textContent = isiBaris[j];
      tr.appendChild(td);
    }

    const tdAksi = document.createElement("td");
    const tombolHapus = document.createElement("button");
    tombolHapus.type = "button";
    tombolHapus.className = "tombol bahaya kecil";
    tombolHapus.textContent = "Hapus";
    tombolHapus.addEventListener("click", function () {
      hapusBarang(i);
    });
    tdAksi.appendChild(tombolHapus);
    tr.appendChild(tdAksi);
    daftarKeranjang.appendChild(tr);
  }
}

// Hapus barang berdasarkan index
function hapusBarang(index) {
  keranjang.splice(index, 1);
  simpanKeranjang();
  tampilkanKeranjang();
  hitungTotal();
}

// Hitung total belanja, diskon 10%, dan total akhir
function hitungTotal() {
  let total = 0;

  for (let i = 0; i < keranjang.length; i++) {
    total = total + keranjang[i].subtotal;
  }

  let diskon = 0;
  if (total >= 50000) {
    diskon = total * 0.1;
    keteranganDiskonEl.textContent = "Mendapat diskon 10% (belanja >= Rp50.000).";
  } else {
    keteranganDiskonEl.textContent = "Diskon 10% berlaku untuk belanja minimal Rp50.000.";
  }

  const totalAkhir = total - diskon;

  totalBelanjaEl.textContent = formatRupiah(total);
  jumlahDiskonEl.textContent = formatRupiah(diskon);
  totalAkhirEl.textContent = formatRupiah(totalAkhir);

  hitungKembalian(totalAkhir);
}

// Hitung kembalian berdasarkan input uang pembayaran
function hitungKembalian(totalAkhir) {
  const uangBayar = parseFloat(inputUangBayar.value);

  // Jika input uang bayar masih kosong
  if (isNaN(uangBayar) || inputUangBayar.value.trim() === "") {
    pesanPembayaranEl.className = "pesan";
    pesanPembayaranEl.textContent = "Kembalian: Rp0";
    return;
  }

  if (uangBayar < totalAkhir) {
    pesanPembayaranEl.className = "pesan kurang";
    pesanPembayaranEl.textContent = "Uang pembayaran belum cukup";
  } else {
    const kembalian = uangBayar - totalAkhir;
    pesanPembayaranEl.className = "pesan";
    pesanPembayaranEl.textContent = "Kembalian: " + formatRupiah(kembalian);
  }
}

// Reset error pesan
function bersihkanError() {
  errorNama.textContent = "";
  errorHarga.textContent = "";
  errorJumlah.textContent = "";
}

// Handle submit form tambah barang
formBarang.addEventListener("submit", function (event) {
  // Mencegah form reload halaman
  event.preventDefault();
  bersihkanError();

  const nama = inputNama.value.trim();
  const harga = parseFloat(inputHarga.value);
  const qty = parseInt(inputJumlah.value, 10);

  let valid = true;

  // Validasi nama barang: minimal 3 karakter
  if (nama.length < 3) {
    errorNama.textContent = "Nama barang minimal 3 karakter.";
    valid = false;
  }

  // Validasi harga satuan: angka positif, minimal Rp 500
  if (isNaN(harga) || harga < 500) {
    errorHarga.textContent = "Harga minimal Rp 500 dan harus berupa angka positif.";
    valid = false;
  }

  // Validasi jumlah barang: bilangan bulat minimal 1
  if (isNaN(qty) || qty < 1 || String(inputJumlah.value).includes(".")) {
    errorJumlah.textContent = "Jumlah barang minimal 1 dan harus bilangan bulat.";
    valid = false;
  }

  // Jika ada validasi yang gagal, hentikan proses
  if (!valid) {
    return;
  }

  // Hitung subtotal barang baru
  const subtotal = harga * qty;

  // Masukkan objek barang ke array keranjang
  keranjang.push({
    nama: nama,
    harga: harga,
    qty: qty,
    subtotal: subtotal
  });

  // Simpan, render ulang, dan hitung ulang total
  simpanKeranjang();
  tampilkanKeranjang();
  hitungTotal();

  // Kosongkan form setelah berhasil disimpan
  formBarang.reset();
});

// Event listener saat user mengetik nominal uang bayar
inputUangBayar.addEventListener("input", function () {
  // Ambil total belanja saat ini dari fungsi hitungTotal
  let total = 0;
  for (let i = 0; i < keranjang.length; i++) {
    total = total + keranjang[i].subtotal;
  }
  let diskon = 0;
  if (total >= 50000) {
    diskon = total * 0.1;
  }
  const totalAkhir = total - diskon;
  hitungKembalian(totalAkhir);
});

// Tombol reset untuk mulai transaksi baru
tombolReset.addEventListener("click", function () {
  const konfirmasi = confirm("Yakin ingin mereset keranjang dan memulai transaksi baru?");
  if (konfirmasi) {
    keranjang = [];
    localStorage.removeItem("keranjangKantin");
    formBarang.reset();
    inputUangBayar.value = "";
    bersihkanError();
    tampilkanKeranjang();
    hitungTotal();
  }
});

// Jalankan fungsi awal saat halaman selesai dimuat
muatKeranjang();
