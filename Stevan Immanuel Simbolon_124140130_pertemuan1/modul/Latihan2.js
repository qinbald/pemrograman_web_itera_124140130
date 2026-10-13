// Latihan 2: Loop, Fungsi, dan Logika Dasar

// --- 1. Tabel Perkalian ---
const ANGKA_PILIHAN = 7;

console.log(`=== 1. Tabel Perkalian ${ANGKA_PILIHAN} ===`);
for (let i = 1; i <= 10; i++) {
  console.log(`${ANGKA_PILIHAN} x ${i} = ${ANGKA_PILIHAN * i}`);
}

// --- 2. Faktorial ---
function faktorial(n) {
  if (n < 0) return null;
  if (n === 0 || n === 1) return 1;
  let hasil = 1;
  for (let i = 2; i <= n; i++) {
    hasil *= i;
  }
  return hasil;
}

console.log("\n=== 2. Faktorial ===");
[0, 1, 5, 10, 12].forEach((n) => {
  console.log(`${n}! = ${faktorial(n)}`);
});

// --- 3. Bilangan Prima ---
function adalahPrima(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

console.log("\n=== 3. Cek Bilangan Prima ===");
[1, 2, 3, 4, 13, 17, 20, 97].forEach((n) => {
  console.log(`${n}: ${adalahPrima(n) ? "Prima" : "Bukan prima"}`);
});

// --- 4. Kalkulator BMI ---
function hitungBMI(beratKg, tinggiCm) {
  const tinggiM = tinggiCm / 100;
  const bmi = beratKg / (tinggiM * tinggiM);

  let kategori;
  if (bmi < 18.5) kategori = "Kurus";
  else if (bmi < 25) kategori = "Normal";
  else if (bmi < 30) kategori = "Gemuk";
  else kategori = "Obesitas";

  return { bmi: bmi.toFixed(2), kategori };
}

console.log("\n=== 4. Kalkulator BMI ===");
const dataBMI = [
  { nama: "Stevan", berat: 65, tinggi: 170 },
  { nama: "Wang",   berat: 90, tinggi: 165 },
  { nama: "Jian",   berat: 45, tinggi: 158 },
];
dataBMI.forEach(({ nama, berat, tinggi }) => {
  const { bmi, kategori } = hitungBMI(berat, tinggi);
  console.log(`${nama} | Berat: ${berat}kg, Tinggi: ${tinggi}cm → BMI: ${bmi} (${kategori})`);
});

// --- 5. FizzBuzz ---
console.log("\n=== 5. FizzBuzz (1-100) ===");
for (let i = 1; i <= 100; i++) {
  if (i % 15 === 0) console.log("FizzBuzz");
  else if (i % 3 === 0) console.log("Fizz");
  else if (i % 5 === 0) console.log("Buzz");
  else console.log(i);
}
