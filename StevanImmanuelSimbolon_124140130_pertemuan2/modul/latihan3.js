// ==========================================
// LATIHAN 3: CLASSES, GETTER/SETTER, COMPUTED PROPERTIES, & DEFAULT PARAMETERS
// ==========================================

// ------------------------------------------
// 1 & 2. Class Product, Inheritance, Getter & Setter
// ------------------------------------------
console.log("=== BAGIAN 1 & 2: CLASS, INHERITANCE, GETTER/SETTER ===");

class Product {
  constructor(name, price) {
    this.name = name;
    this._price = price;
  }

  // Getter format mata uang
  get price() {
    return `Rp${this._price.toLocaleString("id-ID")}`;
  }

  // Setter dengan validasi nilai
  set price(value) {
    if (value < 0) {
      throw new Error("Harga tidak boleh negatif!");
    }
    this._price = value;
  }

  getInfo() {
    return `${this.name} | ${this.price}`;
  }
}

// Inheritance 1: DigitalProduct
class DigitalProduct extends Product {
  constructor(name, price, downloadLink) {
    super(name, price);
    this.downloadLink = downloadLink;
  }

  getInfo() {
    return `${super.getInfo()} | Tipe: Digital (Link: ${this.downloadLink})`;
  }
}

// Inheritance 2: PhysicalProduct
class PhysicalProduct extends Product {
  constructor(name, price, weightKg) {
    super(name, price);
    this.weightKg = weightKg;
  }

  getInfo() {
    return `${super.getInfo()} | Tipe: Fisik (Berat: ${this.weightKg} kg)`;
  }
}

const ebook = new DigitalProduct("E-Book JavaScript ES6", 75000, "https://itera.ac.id/ebook-es6");
const bukuFisik = new PhysicalProduct("Buku Panduan Web Dev", 120000, 0.5);

console.log(ebook.getInfo());
console.log(bukuFisik.getInfo());

// Uji Setter & Getter
ebook.price = 85000;
console.log("Harga ebook setelah diupdate via setter:", ebook.price);

try {
  ebook.price = -1000;
} catch (err) {
  console.error("Error setter harga negatif:", err.message);
}

// ------------------------------------------
// 3. Computed Property Names (Dynamic Keys)
// ------------------------------------------
console.log("\n=== BAGIAN 3: COMPUTED PROPERTY NAMES ===");

const keyKategori = "kategori";
const prefix = "attr_";
const timestamp = "tanggal_dibuat";

const produkDinamis = {
  id: 101,
  nama: "Laptop Dev",
  [keyKategori]: "Elektronik",
  [`${prefix}garansi`]: "2 Tahun",
  [`${prefix}warna`]: "Space Grey",
  [timestamp]: new Date().toISOString().split("T")[0]
};

console.log("Objek dengan dynamic keys:", produkDinamis);

// ------------------------------------------
// 4. Combine Default Parameters dengan Destructuring
// ------------------------------------------
console.log("\n=== BAGIAN 4: DEFAULT PARAMETERS + DESTRUCTURING ===");

function buatPesanan({
  produk = "Produk Umum",
  kuantitas = 1,
  diskonPersen = 0,
  metodeBayar = "Transfer Bank",
  pengiriman: { kurir = "JNE", express = false } = {}
} = {}) {
  return {
    produk,
    kuantitas,
    diskonPersen: `${diskonPersen}%`,
    metodeBayar,
    kurir,
    express
  };
}

// Uji tanpa argumen (memakai seluruh default value)
console.log("Pesanan default:", buatPesanan());

// Uji dengan partial parameter
console.log(
  "Pesanan kustom:",
  buatPesanan({
    produk: "Mouse Wireless",
    kuantitas: 2,
    diskonPersen: 10,
    pengiriman: { kurir: "SiCepat", express: true }
  })
);
