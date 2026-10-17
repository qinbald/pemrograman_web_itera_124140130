// 1. KELAS DATA (CLASS TASKITEM)
class TaskItem {
  // Destructuring pada parameter constructor
  constructor({ id, matkul, title, deadline, completed = false }) {
    this.id = id;
    this.matkul = matkul;
    this.title = title;
    this.deadline = deadline;
    this.completed = completed;
  }
}

// 2. FUNGSI BANTU MENGGUNAKAN ARROW FUNCTION

// Arrow Function 1: Format tanggal ke gaya Indonesia
const formatTanggal = (dateString) => {
  if (!dateString) return "-";
  const [tahun, bulan, hari] = dateString.split("-");
  return `${hari}/${bulan}/${tahun}`;
};

// Arrow Function 2: Format jam dan tanggal hari ini
const formatWaktuLengkap = (dateObj) => {
  const opsi = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const tanggal = dateObj.toLocaleDateString("id-ID", opsi);
  const jam = dateObj.toLocaleTimeString("id-ID");
  return `${tanggal} | ${jam}`;
};

// Arrow Function 3: Membuat ID unik berbasis timestamp
const buatIdUnik = () => `${Date.now()}`;

// 3. KELAS UTAMA APLIKASI (CLASS DASHBOARDAPP)
class DashboardApp {
  constructor() {
    // State aplikasi
    this.tasks = [];
    this.storageKey = "mahasiswa_dashboard_tasks";

    // Elemen DOM
    this.taskForm = document.getElementById("task-form");
    this.inputEditId = document.getElementById("edit-id");
    this.inputMatkul = document.getElementById("task-matkul");
    this.inputTitle = document.getElementById("task-title");
    this.inputDeadline = document.getElementById("task-deadline");
    this.btnSubmit = document.getElementById("btn-submit");
    this.btnCancel = document.getElementById("btn-cancel");
    this.formTitle = document.getElementById("form-title");
    this.taskListElement = document.getElementById("task-list");
    this.taskCountElement = document.getElementById("task-count");

    // Widget Header
    this.jamElement = document.getElementById("jam-sekarang");
    this.cuacaSuhu = document.getElementById("cuaca-suhu");
    this.cuacaAngin = document.getElementById("cuaca-angin");
    this.quoteText = document.getElementById("quote-text");
    this.quoteAuthor = document.getElementById("quote-author");
  }

  // Inisialisasi awal aplikasi
  init() {
    this.loadFromStorage();
    this.setupEventListeners();
    this.startClock();
    this.fetchWeather();
    this.fetchQuote();
    this.renderTasks();
  }

  // Setup Event Listener
  setupEventListeners() {
    this.taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });

    this.btnCancel.addEventListener("click", () => {
      this.resetForm();
    });

    // Event delegation untuk tombol di dalam task list
    this.taskListElement.addEventListener("click", (e) => {
      const target = e.target;
      const id = target.dataset.id;
      if (!id) return;

      if (target.classList.contains("btn-delete")) {
        this.deleteTask(id);
      } else if (target.classList.contains("btn-edit")) {
        this.startEditTask(id);
      } else if (target.classList.contains("task-checkbox")) {
        this.toggleTaskStatus(id);
      }
    });
  }

  // Mulai jam digital
  startClock() {
    const updateJam = () => {
      const sekarang = new Date();
      this.jamElement.textContent = formatWaktuLengkap(sekarang);
    };
    updateJam();
    setInterval(updateJam, 1000);
  }

  // Operasi Asinkron 1: Ambil data cuaca kampus ITERA dari Open-Meteo API
  async fetchWeather() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Gagal mengambil data cuaca");
      }
      const data = await response.json();
      const { temperature, windspeed } = data.current_weather;

      // Render data cuaca dengan Template Literals
      this.cuacaSuhu.textContent = `Suhu: ${temperature}°C`;
      this.cuacaAngin.textContent = `Kecepatan Angin: ${windspeed} km/h`;
    } catch (error) {
      this.cuacaSuhu.textContent = "Data cuaca offline";
      this.cuacaAngin.textContent = "-";
      console.error("Error cuaca:", error);
    }
  }

  // Operasi Asinkron 2: Ambil kutipan harian acak dari DummyJSON API
  async fetchQuote() {
    const url = "https://dummyjson.com/quotes/random";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Gagal mengambil kutipan");
      }
      const data = await response.json();
      const { quote, author } = data;

      this.quoteText.textContent = `"${quote}"`;
      this.quoteAuthor.textContent = `- ${author}`;
    } catch (error) {
      this.quoteText.textContent = '"Teruslah belajar dan jangan menyerah."';
      this.quoteAuthor.textContent = "- Mahasiswa ITERA";
      console.error("Error quote:", error);
    }
  }

  // Membaca data dari localStorage
  loadFromStorage() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        const rawArray = JSON.parse(stored);
        // Mengonversi data objek biasa menjadi instance TaskItem
        this.tasks = rawArray.map((item) => new TaskItem(item));
      } catch (err) {
        this.tasks = [];
        console.error("Gagal parse localStorage:", err);
      }
    } else {
      // Data simulasi awal jika belum ada data
      this.tasks = [
        new TaskItem({
          id: buatIdUnik(),
          matkul: "Pengembangan Aplikasi Web",
          title: "Mengerjakan Tugas Praktikum Dashboard",
          deadline: "2026-10-25",
          completed: false,
        }),
      ];
      this.saveToStorage();
    }
  }

  // Menyimpan data ke localStorage
  saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }

  // Tambah tugas baru menggunakan spread operator
  addTask({ matkul, title, deadline }) {
    const newTask = new TaskItem({
      id: buatIdUnik(),
      matkul,
      title,
      deadline,
      completed: false,
    });

    // Spread operator untuk memperbarui array secara rapi
    this.tasks = [...this.tasks, newTask];
    this.saveToStorage();
    this.renderTasks();
  }

  // Perbarui tugas yang diedit
  updateTask(id, { matkul, title, deadline }) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        return new TaskItem({
          ...task,
          matkul,
          title,
          deadline,
        });
      }
      return task;
    });

    this.saveToStorage();
    this.renderTasks();
  }

  // Hapus tugas dengan filter
  deleteTask(id) {
    const konfirmasi = confirm("Yakin ingin menghapus tugas ini?");
    if (!konfirmasi) return;

    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveToStorage();
    this.renderTasks();

    // Jika sedang mengedit tugas yang dihapus, batalkan mode edit
    if (this.inputEditId.value === id) {
      this.resetForm();
    }
  }

  // Toggle status selesai
  toggleTaskStatus(id) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        return new TaskItem({
          ...task,
          completed: !task.completed,
        });
      }
      return task;
    });

    this.saveToStorage();
    this.renderTasks();
  }

  // Menyiapkan form ke mode edit
  startEditTask(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return;

    this.inputEditId.value = task.id;
    this.inputMatkul.value = task.matkul;
    this.inputTitle.value = task.title;
    this.inputDeadline.value = task.deadline;

    this.formTitle.textContent = "Edit Tugas Kuliah";
    this.btnSubmit.textContent = "Perbarui Tugas";
    this.btnCancel.style.display = "inline-block";
  }

  // Reset form kembali ke mode tambah
  resetForm() {
    this.inputEditId.value = "";
    this.taskForm.reset();
    this.formTitle.textContent = "Tambah Tugas Kuliah";
    this.btnSubmit.textContent = "Simpan Tugas";
    this.btnCancel.style.display = "none";
  }

  // Handle submit form
  handleFormSubmit() {
    let id = this.inputEditId.value;
    const dataInput = {
      matkul: this.inputMatkul.value.trim(),
      title: this.inputTitle.value.trim(),
      deadline: this.inputDeadline.value,
    };

    if (id) {
      this.updateTask(id, dataInput);
    } else {
      this.addTask(dataInput);
    }

    this.resetForm();
  }

  // Render daftar tugas menggunakan Template Literals
  renderTasks() {
    this.taskCountElement.textContent = `${this.tasks.length} Tugas`;

    if (this.tasks.length === 0) {
      this.taskListElement.innerHTML = `
        <div class="empty-message">
          Belum ada tugas tersimpan. Silakan tambahkan tugas baru!
        </div>
      `;
      return;
    }

    // Bangun HTML menggunakan map dan Template Literals
    let htmlTasks = this.tasks
      .map(({ id, matkul, title, deadline, completed }) => {
        return `
          <div class="task-item ${completed ? "completed" : ""}">
            <div class="task-info">
              <span class="task-matkul">${matkul}</span>
              <span class="task-title">${title}</span>
              <span class="task-deadline">Tenggat: ${formatTanggal(deadline)}</span>
            </div>
            <div class="task-actions">
              <input 
                type="checkbox" 
                class="task-checkbox" 
                data-id="${id}" 
                ${completed ? "checked" : ""} 
                title="Tandai selesai"
              >
              <button class="btn btn-edit" data-id="${id}">Edit</button>
              <button class="btn btn-delete" data-id="${id}">Hapus</button>
            </div>
          </div>
        `;
      })
      .join("");

    this.taskListElement.innerHTML = htmlTasks;
  }
}

// Inisialisasi saat seluruh dokumen selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
  const app = new DashboardApp();
  app.init();
});
