// ==========================================================
// FILE: ui-dragdrop.js / UI-KUIS.JS (VERSI FINAL PASTI BERUBAH)
// ==========================================================

function renderDragDropPage(container) {
    container.innerHTML = `
        <div class="max-w-5xl mx-auto space-y-6 fade-in pb-4">
            <!-- HERO SECTION -->
            <div class="relative bg-slate-900 rounded-[2.5rem] border border-indigo-500/20 shadow-2xl overflow-hidden px-6 py-7 lg:py-8 text-center">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl bg-gradient-to-b from-indigo-500/10 to-transparent blur-3xl pointer-events-none"></div>
                <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
                
                <div class="relative z-10">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 mb-2">
                        <i class="fa-solid fa-gamepad text-xs"></i>
                        <span class="text-[10px] font-black tracking-widest uppercase">PLAY & LEARN</span>
                    </div>
                    
                    <!-- PERBAIKAN HURUF G: Ditambahkan pb-2 dan leading-normal agar ekor huruf tidak terpotong -->
                    <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-slate-400 mb-2 pb-2 leading-normal drop-shadow-lg">Drag & Drop Arena</h2>
                    
                    <p class="text-slate-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
                        Pilih mode permainan interaktif di bawah ini. Geser dan letakkan balok ke tempat yang benar untuk mendapatkan poin!
                    </p>
                </div>
            </div>

            <!-- PILIHAN 3 GAME -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 max-w-5xl mx-auto">
                <!-- MATCH & DROP -->
                <div class="bg-slate-900 border border-slate-700 px-6 py-7 lg:p-8 rounded-[2.5rem] text-center shadow-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:border-emerald-500/50 group flex flex-col justify-between h-full min-h-[300px]">
                    <div>
                        <div class="w-16 h-16 mx-auto bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-emerald-500 transition-colors">
                            <i class="fa-solid fa-puzzle-piece text-3xl text-emerald-500 group-hover:text-white transition-colors"></i>
                        </div>
                        <h3 class="text-lg font-black text-white mb-3 tracking-wide uppercase">Match & Drop</h3>
                        <p class="text-xs text-slate-400 mb-6 leading-relaxed">Pasangkan balok soal ke kotak jawaban yang tepat. Cocok untuk kosakata dan definisi.</p>
                    </div>
                    <button onclick="bukaLobiPersiapanDnd('match')" class="w-full bg-slate-800 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-slate-600 hover:border-emerald-400 font-bold py-3.5 px-6 rounded-xl transition-all uppercase text-xs tracking-wider shadow-md flex items-center justify-center mt-auto">
                        <i class="fa-solid fa-play mr-2"></i> MAINKAN SEKARANG
                    </button>
                </div>

                <!-- SORT & DROP -->
                <div class="bg-slate-900 border border-slate-700 px-6 py-7 lg:p-8 rounded-[2.5rem] text-center shadow-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:border-amber-500/50 group flex flex-col justify-between h-full min-h-[300px]">
                    <div>
                        <div class="w-16 h-16 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-amber-500 transition-colors">
                            <i class="fa-solid fa-layer-group text-3xl text-amber-500 group-hover:text-slate-900 transition-colors"></i>
                        </div>
                        <h3 class="text-lg font-black text-white mb-3 tracking-wide uppercase">Sort & Drop</h3>
                        <p class="text-xs text-slate-400 mb-6 leading-relaxed">Kelompokkan berbagai item ke dalam kategori yang sesuai. Cocok untuk klasifikasi.</p>
                    </div>
                    <button onclick="bukaLobiPersiapanDnd('sort')" class="w-full bg-slate-800 hover:bg-amber-500 text-amber-400 hover:text-slate-900 border border-slate-600 hover:border-amber-400 font-bold py-3.5 px-6 rounded-xl transition-all uppercase text-xs tracking-wider shadow-md flex items-center justify-center mt-auto">
                        <i class="fa-solid fa-play mr-2"></i> MAINKAN SEKARANG
                    </button>
                </div>

                <!-- BUILD & DROP -->
                <div class="bg-slate-900 border border-slate-700 px-6 py-7 lg:p-8 rounded-[2.5rem] text-center shadow-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-violet-500/50 group flex flex-col justify-between h-full min-h-[300px]">
                    <div>
                        <div class="w-16 h-16 mx-auto bg-violet-500/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-violet-500 transition-colors">
                            <i class="fa-solid fa-cubes text-3xl text-violet-500 group-hover:text-white transition-colors"></i>
                        </div>
                        <h3 class="text-lg font-black text-white mb-3 tracking-wide uppercase">Build & Drop</h3>
                        <p class="text-xs text-slate-400 mb-6 leading-relaxed">Susun potongan kata menjadi satu kalimat utuh. Cocok untuk tata bahasa dan sintaksis.</p>
                    </div>
                    <button onclick="bukaLobiPersiapanDnd('build')" class="w-full bg-slate-800 hover:bg-violet-500 text-violet-400 hover:text-white border border-slate-600 hover:border-violet-400 font-bold py-3.5 px-6 rounded-xl transition-all uppercase text-xs tracking-wider shadow-md flex items-center justify-center mt-auto">
                        <i class="fa-solid fa-play mr-2"></i> MAINKAN SEKARANG
                    </button>
                </div>
            </div>
        </div>
    `;
}

// =========================================================================
// LOBI DRAG & DROP (MENGGUNAKAN JALUR MURNI KUIS ARENA)
// =========================================================================

let gameDndTerpilih = '';

function tutupLobiDnd() {
    // Keluar yang sangat bersih: cukup sembunyikan kamar modalnya!
    const modal = document.getElementById('dnd-arena-modal');
    if (modal) modal.classList.add('hidden');
    
    // Kembalikan fullscreen browser ke normal jika sedang aktif
    const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
    if(exit && document.fullscreenElement) exit.call(document).catch(e => console.log(e));
}

function bukaLobiPersiapanDnd(jenisGame) {
    gameDndTerpilih = jenisGame;
    
    const modal = document.getElementById('dnd-arena-modal');
    const body = document.getElementById('dnd-arena-body');
    
    if (!modal || !body) return alert("Error: Kamar Modal belum dipasang!");
    modal.classList.remove('hidden');

    let kelasOpts = AppState.db.kelas.map(k => `<option value="${k.id}">${k.kode}</option>`).join('');
    let mapelOpts = AppState.db.mapel.map(m => `<option value="${m.id}">${m.nama}</option>`).join('');
    
    let namaGameDisplay = jenisGame === 'match' ? 'MATCH & DROP' : (jenisGame === 'sort' ? 'SORT & DROP' : 'BUILD & DROP');

    body.innerHTML = `
        <div class="bg-slate-900 p-6 rounded-[2rem] border border-amber-500/30 max-w-lg mx-auto w-full shadow-2xl text-center relative z-20">
            <div class="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-amber-500/20">
                <i class="fa-solid fa-hand-pointer text-2xl text-amber-400"></i>
            </div>
            <h3 class="text-xl font-black text-white mb-1">Identitas Pemain</h3>
            <p class="text-xs text-slate-400 mb-4">Mode: <span class="font-bold text-amber-400 uppercase">${namaGameDisplay}</span></p>
            
            <div class="grid grid-cols-2 gap-2 p-1 bg-slate-800 rounded-xl mb-4 border border-slate-700">
                <button type="button" class="py-2 text-xs font-extrabold rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md">
                    <i class="fa-solid fa-user mr-1"></i> Single Player
                </button>
                <button type="button" class="py-2 text-xs font-extrabold rounded-lg text-slate-400 hover:text-white">
                    <i class="fa-solid fa-bolt text-amber-400 mr-1"></i> Mode Duel
                </button>
            </div>
            
            <div class="space-y-3 text-left">
                <div>
                    <label class="text-[11px] font-bold text-slate-300 block mb-1">⏱️ Durasi Waktu Per Soal</label>
                    <select id="lobby-dnd-durasi" class="w-full p-2 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-amber-500 text-xs">
                        <option value="15" selected>15 Detik (Default)</option>
                        <option value="30">30 Detik</option>
                        <option value="60">60 Detik</option>
                    </select>
                </div>
                <div>
                    <label class="text-[11px] font-bold text-slate-300 block mb-1">1. Pilih Kelas</label>
                    <select id="lobby-dnd-kelas" onchange="updateLobbySiswaDnd()" class="w-full p-2 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-amber-500 text-xs">
                        <option value="">-- Pilih Kelas --</option>
                        ${kelasOpts}
                    </select>
                </div>
                <div>
                    <label class="text-[11px] font-bold text-slate-300 block mb-1">2. Mata Pelajaran</label>
                    <select id="lobby-dnd-mapel" class="w-full p-2 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-amber-500 text-xs">
                        <option value="">-- Pilih Mapel --</option>
                        ${mapelOpts}
                    </select>
                </div>
                <div>
                    <label class="text-[11px] font-bold text-slate-300 block mb-1">3. Nama Siswa</label>
                    <div class="flex space-x-2 mb-1.5">
                        <select id="lobby-dnd-siswa" class="flex-1 p-2 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-amber-500 text-xs">
                            <option value="">-- Pilih Kelas Dulu --</option>
                        </select>
                        <button type="button" onclick="undiPemainDndSpin()" class="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-black px-3 rounded-xl shadow transition-all flex items-center shrink-0 text-xs">
                            <i class="fa-solid fa-dice mr-1"></i> Undi
                        </button>
                    </div>
                    <input type="text" id="lobby-dnd-manual" placeholder="Atau ketik nama manual..." class="w-full p-2 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-amber-500 text-xs">
                </div>
                <div>
                    <label class="text-[11px] font-bold text-slate-300 block mb-1">4. Simpan Nilai ke Kategori</label>
                    <select id="lobby-dnd-kategori" class="w-full p-2 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-amber-500 text-xs">
                        <option value="">-- Tidak Disimpan (Hanya Latihan) --</option>
                        <option value="Sumatif (TP/Bab 1)">Sumatif (TP/Bab 1)</option>
                    </select>
                </div>
            </div>

            <button onclick="masukKeArenaGameDnd()" class="w-full mt-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black py-3 rounded-xl shadow-lg transition-all text-sm">
                MULAI PERMAINAN
            </button>
            <button onclick="tutupLobiDnd()" class="w-full mt-2 text-slate-400 font-bold hover:text-white py-1 text-xs transition-colors">
                Batal / Kembali
            </button>
        </div>
    `;

    if (AppState.kuis && AppState.kuis.kelasAktif) {
        setTimeout(() => {
            const selKelas = document.getElementById('lobby-dnd-kelas');
            if (selKelas) {
                selKelas.value = AppState.kuis.kelasAktif;
                updateLobbySiswaDnd();
            }
        }, 50);
    }
}
// FUNGSI PEMBANTU LOBI (Pastikan menggantikan yang lama)
function updateLobbySiswaDnd() {
    const kelasId = document.getElementById('lobby-dnd-kelas').value;
    const selectSiswa = document.getElementById('lobby-dnd-siswa');
    
    if (kelasId && AppState.kuis) {
        AppState.kuis.kelasAktif = kelasId;
        localStorage.setItem('ST_LAST_KELAS', kelasId);
    }
    
    if (!kelasId) {
        if (selectSiswa) selectSiswa.innerHTML = '<option value="">-- Pilih Kelas Dulu --</option>';
        return;
    }
    let siswaKelas = AppState.db.siswa.filter(s => s.kelasId === kelasId);
    let opts = siswaKelas.map(s => `<option value="${s.id}">${s.nama}</option>`).join('');
    if (selectSiswa) selectSiswa.innerHTML = `<option value="">-- Pilih Siswa --</option>${opts}`;
}

function undiPemainDndSpin() {
    const klsId = document.getElementById('lobby-dnd-kelas').value;
    if (!klsId) return showAlert('Peringatan', 'Pilih kelas terlebih dahulu!');
    const listSiswa = AppState.db.siswa.filter(s => s.kelasId === klsId);
    if (listSiswa.length === 0) return showAlert('Peringatan', 'Belum ada siswa!');
    
    let pemenang = listSiswa[Math.floor(Math.random() * listSiswa.length)];
    document.getElementById('lobby-dnd-siswa').value = pemenang.id;
    if (typeof eksekusiUndianMewah === 'function') eksekusiUndianMewah('single', pemenang.nama, null, listSiswa.map(s => s.nama));
}
// -------------------------------------------------------------
// TIMER HITUNG MUNDUR (DENGAN KECERDASAN PELACAK LOBI DND)
// -------------------------------------------------------------
function mulaiHitungMundur(detikTunggu) {
    const overlayCount = document.createElement('div');
    overlayCount.id = 'layar-hitung-mundur';
    overlayCount.className = 'fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center transition-all duration-300';
    
    overlayCount.innerHTML = `
        <h2 class="text-slate-400 font-bold text-xl uppercase tracking-[0.3em] mb-8">Persiapan Kuis</h2>
        <div id="angka-mundur" class="text-[12rem] lg:text-[18rem] font-black text-amber-500 leading-none" style="text-shadow: 0 0 25px rgba(245,158,11,0.4);">
            ${detikTunggu}
        </div>
    `;
    document.body.appendChild(overlayCount);

    const angkaEl = document.getElementById('angka-mundur');
    let sisaDetik = detikTunggu;
    const ctx = getAudioCtx(); 

    function playBeepShort() {
        if (ctx.state === 'running') {
            try {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'square'; 
                osc.frequency.setValueAtTime(600, ctx.currentTime);
                gain.gain.setValueAtTime(0.5, ctx.currentTime); 
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.1);
            } catch(e) {}
        }
    }

    function playBeepLong() {
        if (ctx.state === 'running') {
            try {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'square'; 
                osc.frequency.setValueAtTime(800, ctx.currentTime); 
                gain.gain.setValueAtTime(0.8, ctx.currentTime); 
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8); 
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.8);
            } catch(e) {}
        }
    }

    playBeepShort(); 

    let timerMundur = setInterval(() => {
        sisaDetik--;
        
        if (sisaDetik > 0) {
            angkaEl.innerText = sisaDetik;
            angkaEl.style.transform = 'scale(1.2)';
            setTimeout(() => angkaEl.style.transform = 'scale(1)', 150);
            playBeepShort();
            
        } else {
            clearInterval(timerMundur);
            overlayCount.style.background = "#020617"; 
            angkaEl.innerText = "MULAI!";
            angkaEl.className = "text-[6rem] lg:text-[10rem] font-black text-emerald-500 tracking-widest";
            angkaEl.style.textShadow = "0 0 35px rgba(16,185,129,0.5)"; 
            playBeepLong();

            setTimeout(() => {
                overlayCount.remove();
                
                // --- DETEKSI PINTAR: APAKAH KITA DI DRAG & DROP ATAU KUIS? ---
                if (window.isDragDropMode) {
                    if (typeof masukKeArenaGameDnd === 'function') masukKeArenaGameDnd();
                } else {
                    if (typeof mulaiKuisSebenarnya === 'function') mulaiKuisSebenarnya(); 
                }
                
            }, 800);
        }
    }, 1000);
}

function masukKeArenaGameDnd() {
    const durasi = document.getElementById('lobby-dnd-durasi')?.value || 15;
    const kelasId = document.getElementById('lobby-dnd-kelas')?.value;
    const siswaId = document.getElementById('lobby-dnd-siswa')?.value;
    const manualName = document.getElementById('lobby-dnd-manual')?.value.trim();
    
    // Validasi wajib isi nama / siswa
    if (!manualName && (!kelasId || !siswaId)) {
        return showAlert("Peringatan", "Harap Pilih Kelas dan Siswa, ATAU ketik nama manual!");
    }

    // Tentukan nama pemain final
    let namaPemain = manualName;
    if (!manualName && siswaId) {
        const siswa = AppState.db.siswa.find(s => s.id === siswaId);
        if (siswa) namaPemain = siswa.nama;
    }

    // Simpan pengaturan ke state global AppState
    AppState.dnd = AppState.dnd || {};
    AppState.dnd.waktuPerSoal = parseInt(durasi);
    AppState.dnd.pemain = namaPemain;
    AppState.dnd.kelasId = kelasId;
    AppState.dnd.kategori = document.getElementById('lobby-dnd-kategori')?.value || '';
    
    // Tutup Lobi dengan bersih
    tutupLobiDnd();

    // Jalankan hitung mundur khas Kuis Arena (3 detik), lalu mulai gamenya
    if (typeof mulaiHitungMundur === 'function') {
        mulaiHitungMundur(3, () => {
            jalankanEngineGameDndAktif();
        });
    } else {
        // Cadangan jika fungsi hitung mundur tidak terpanggil
        jalankanEngineGameDndAktif();
    }
}

// Fungsi pengarah ke file engine game masing-masing
function jalankanEngineGameDndAktif() {
    if (gameDndTerpilih === 'match' && typeof mulaiGameMatch === 'function') {
        mulaiGameMatch();
    } else if (gameDndTerpilih === 'sort' && typeof mulaiGameSort === 'function') {
        mulaiGameSort();
    } else if (gameDndTerpilih === 'build' && typeof mulaiGameBuild === 'function') {
        mulaiGameBuild();
    } else {
        showAlert("Informasi", "Engine untuk game " + gameDndTerpilih + " akan segera dimuat!");
    }
}

// Fungsi untuk membuka halaman Drag & Drop Arena dari tombol menu
function bukaDragAndDropArena() {
    const container = document.getElementById('main-content');
    
    // Cek dan buka halaman Drag & Drop
    if (typeof renderDragDropPage === 'function') {
        renderDragDropPage(container);
    } else if (typeof switchTab === 'function') {
        switchTab('dragdrop');
    } else {
        console.error("Fungsi renderDragDropPage tidak ditemukan.");
    }
}

