// =========================================================================
// PENGENDALI AUDIO KHUSUS DRAG & DROP
// =========================================================================
const DND_AUDIO = {
    bgm: new Audio("https://anassamudra78-sudo.github.io/audio-smart-teacher/Sound%20kuis%20berjalan.mp3"),
    benar: new Audio("https://anassamudra78-sudo.github.io/audio-smart-teacher/benardnd.mp3"),
    salah: new Audio("https://anassamudra78-sudo.github.io/audio-smart-teacher/salahdnd.mp3"),
    selesai: new Audio("https://anassamudra78-sudo.github.io/audio-smart-teacher/Sound%20effect%20kuis%20Benar%20.mp3")
};
DND_AUDIO.bgm.loop = true;

function playDndBgm() { 
    DND_AUDIO.bgm.volume = 0.7; 
    DND_AUDIO.bgm.play().catch(e => console.log(e)); 
}
function stopDndBgm() { 
    DND_AUDIO.bgm.pause(); 
    DND_AUDIO.bgm.currentTime = 0; 
}
function playDndSfx(jenis) { 
    if (DND_AUDIO[jenis]) {
        DND_AUDIO[jenis].currentTime = 0; 
        DND_AUDIO[jenis].play().catch(e => console.log(e)); 
    }
}
// ==========================================================
// FILE: ui-dragdrop.js / UI-KUIS.JS (VERSI FINAL PASTI BERUBAH)
// ==========================================================

function renderDragDropPage(container) {
    // --- 1. SAPU JAGAT: Bersihkan efek melayang di main-content ---
    const mc = document.getElementById('main-content');
    if (mc) mc.removeAttribute('style');
    
    // --- 2. Matikan status mode game ---
    window.isDragDropMode = false;
    
    // --- 3. Pastikan layar hitam modal tertutup ---
    const modal = document.getElementById('dnd-arena-modal');
    if (modal) modal.classList.add('hidden');
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
                    <!-- TOMBOL PINTU MASUK EDITOR SOAL DND -->
<div class="mt-6 flex justify-center">
    <button onclick="bukaEditorSoalDnd()" class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-6 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all flex items-center border border-indigo-400 hover:scale-105">
        <i class="fa-solid fa-pen-ruler mr-2"></i> Buat / Edit Soal DND
    </button>
</div>
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
                    <button onclick="bukaLobiDragDrop('match')" class="w-full bg-slate-800 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-slate-600 hover:border-emerald-400 font-bold py-3.5 px-6 rounded-xl transition-all uppercase text-xs tracking-wider shadow-md flex items-center justify-center mt-auto">
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
                    <button onclick="bukaLobiDragDrop('sort')" class="w-full bg-slate-800 hover:bg-amber-500 text-amber-400 hover:text-slate-900 border border-slate-600 hover:border-amber-400 font-bold py-3.5 px-6 rounded-xl transition-all uppercase text-xs tracking-wider shadow-md flex items-center justify-center mt-auto">
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
                    <button onclick="bukaLobiDragDrop('build')" class="w-full bg-slate-800 hover:bg-violet-500 text-violet-400 hover:text-white border border-slate-600 hover:border-violet-400 font-bold py-3.5 px-6 rounded-xl transition-all uppercase text-xs tracking-wider shadow-md flex items-center justify-center mt-auto">
                        <i class="fa-solid fa-play mr-2"></i> MAINKAN SEKARANG
                    </button>
                </div>
            </div>
        </div>
    `;
}

// =========================================================================
// FUNGSI MEMBUKA LOBI DRAG & DROP (FULLSCREEN MURNI & TERINTEGRASI)
// =========================================================================

let gameDndTerpilih = '';

// Trik membuat main-content fullscreen 100% tanpa membuat elemen ganda
function amankanLayarPenuhDragDrop() {
    const mc = document.getElementById('main-content');
    if (!mc) return null;
    
    // Jadikan main-content fullscreen menutupi segalanya
    mc.style.position = 'fixed';
    mc.style.top = '0';
    mc.style.left = '0';
    mc.style.right = '0';
    mc.style.bottom = '0';
    
    // INI PERBAIKANNYA: Turunkan z-index jadi 9900 agar tidak menutupi Undian (9999)
    mc.style.zIndex = '9900'; 
    
    mc.style.backgroundColor = '#020617';
    mc.style.overflowY = 'auto';
    mc.style.padding = '0'; // Hilangkan padding sisa bawaan
    mc.style.margin = '0';

    // Penanda sakti agar sistem Hitung Mundur tahu kita sedang di Drag & Drop
    window.isDragDropMode = true; 
    
    return mc;
}

function bukaLobiDragDrop(jenisGame) {
    gameDndTerpilih = jenisGame;
    
    // 1. Langsung buka modal fullscreen (Kamar khusus yang sudah ada Top Bar-nya)
    const modal = document.getElementById('dnd-arena-modal');
    if (modal) modal.classList.remove('hidden');
    window.isDragDropMode = true;

    // 2. Ubah judul dinamis di Top Bar sesuai game yang dipilih
    let namaGame = jenisGame === 'match' ? 'MATCH & DROP' : (jenisGame === 'sort' ? 'SORT & DROP' : 'BUILD & DROP');
    const subtitleEl = document.getElementById('dnd-topbar-subtitle');
    if (subtitleEl) subtitleEl.innerText = `Persiapan: ${namaGame}`;

    // 3. Bidik wadah kosong di bawah Top Bar
    const container = document.getElementById('dnd-game-container');
    if (!container) return;

    let kelasOpts = AppState.db.kelas.map(k => `<option value="${k.id}">${k.kode}</option>`).join('');
    let mapelOpts = AppState.db.mapel.map(m => `<option value="${m.id}">${m.nama}</option>`).join('');

    // 4. Masukkan HANYA form lobi ke dalam wadah (Top bar lama dihapus)
    container.innerHTML = `
        <div class="max-w-xl mx-auto p-4 select-none fade-in pb-12 mt-4 sm:mt-8 w-full">
            <div class="bg-slate-900/95 p-6 sm:p-8 rounded-[2rem] border-2 border-amber-500/30 shadow-2xl relative overflow-hidden text-center z-20">
                
                <i class="fa-solid fa-user-graduate text-5xl text-amber-400 mb-4 animate-bounce"></i>
                <h3 class="text-2xl font-black text-white mb-1">Identitas Pemain & Mode Game</h3>
                <p class="text-xs text-slate-400 mb-5">Pilih mode game dan pemain untuk memulai permainan!</p>

                <div class="grid grid-cols-2 gap-2 p-1.5 bg-slate-800 rounded-2xl mb-5 border border-slate-700">
                    <button class="py-2.5 text-xs font-extrabold rounded-xl transition-all bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md flex items-center justify-center">
                        <i class="fa-solid fa-user mr-1.5"></i> Single Player
                    </button>
                    <button class="py-2.5 text-xs font-extrabold rounded-xl transition-all text-slate-400 hover:text-white flex items-center justify-center">
                        <i class="fa-solid fa-bolt text-amber-400 mr-1.5"></i> Mode Duel (2 Siswa)
                    </button>
                </div>

                <div class="space-y-4 text-left mt-3">
                <!-- RENTANG SOAL (MINI) -->
                    <div class="flex items-center gap-2 mb-2 bg-slate-800/50 p-2 rounded-xl border border-slate-700">
                        <label class="text-[11px] font-bold text-slate-300 whitespace-nowrap"><i class="fa-solid fa-list-ol mr-1"></i> Rentang Soal :</label>
                        <input type="number" id="dnd-soal-dari" placeholder="1" min="1" class="w-12 p-1 rounded-lg bg-slate-900 text-white border border-slate-600 text-center text-[11px] outline-none focus:border-amber-500">
                        <span class="text-[11px] text-slate-400 font-bold">sampai</span>
                        <input type="number" id="dnd-soal-sampai" placeholder="Akhir" class="w-12 p-1 rounded-lg bg-slate-900 text-white border border-slate-600 text-center text-[11px] outline-none focus:border-amber-500">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-slate-300 block mb-1">⏱️ Durasi Waktu Per Soal</label>
                        <select id="lobby-dnd-durasi" class="w-full p-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-amber-500 text-xs">
                            <option value="10">10 Detik</option>
                            <option value="15" selected>15 Detik (Default)</option>
                            <option value="30">30 Detik</option>
                            <option value="60">60 Detik</option>
                        </select>
                    </div>

                    <div>
                        <label class="text-xs font-bold text-slate-300 block mb-1">1. Pilih Kelas</label>
                        <select id="lobby-dnd-kelas" onchange="updateLobbySiswaDnd()" class="w-full p-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-amber-500 text-xs transition-colors">
                            <option value="">-- Pilih Kelas --</option>
                            ${kelasOpts}
                        </select>
                    </div>
                    
                    <div>
                        <label class="text-xs font-bold text-slate-300 block mb-1">2. Mata Pelajaran</label>
                        <select id="lobby-dnd-mapel" class="w-full p-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-amber-500 text-xs transition-colors">
                            <option value="">-- Pilih Mapel --</option>
                            ${mapelOpts}
                        </select>
                    </div>

                    <div>
                        <label class="text-xs font-bold text-slate-300 block mb-1">3. Nama Siswa</label>
                        <div class="flex space-x-2 mb-2">
                            <select id="lobby-dnd-siswa" class="flex-1 p-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-amber-500 text-xs transition-colors">
                                <option value="">-- Pilih Kelas Terlebih Dahulu --</option>
                            </select>
                            <button onclick="undiPemainDndSpin()" class="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-900 font-black px-3.5 rounded-xl shadow-lg transition-all flex items-center shrink-0 text-xs">
                                <i class="fa-solid fa-dice text-base mr-1"></i> Undi
                            </button>
                        </div>
                        <input type="text" id="lobby-dnd-manual" placeholder="Atau ketik nama manual..." class="w-full p-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-amber-500 text-xs transition-colors">
                    </div>

                    <div>
                        <label class="text-xs font-bold text-slate-300 block mb-1">4. Simpan Nilai ke Kategori (Opsional)</label>
                        <select id="lobby-dnd-kategori" class="w-full p-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-amber-500 text-xs transition-colors">
                            <option value="">-- Tidak Disimpan (Hanya Latihan) --</option>
                            <option value="Tugas (TP/Bab 1)">Tugas (TP/Bab 1)</option>
                            <option value="Sumatif (TP/Bab 1)">Sumatif (TP/Bab 1)</option>
                            <option value="Tugas (TP/Bab 2)">Tugas (TP/Bab 2)</option>
                            <option value="Sumatif (TP/Bab 2)">Sumatif (TP/Bab 2)</option>
                        </select>
                    </div>

                    <div class="p-3 bg-slate-800/80 border border-slate-700 rounded-xl flex items-center justify-between">
                        <label for="dnd-acak-soal" class="text-xs font-bold text-slate-300 cursor-pointer flex items-center select-none">
                            <i class="fa-solid fa-shuffle text-amber-400 mr-2.5"></i> Acak Urutan Soal (Shuffle)
                        </label>
                        <input type="checkbox" id="dnd-acak-soal" class="w-5 h-5 accent-amber-500 cursor-pointer" checked>
                    </div>
                </div>

                <button onclick="masukKeArenaGameDnd()" class="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black py-3.5 rounded-xl shadow-lg transition-all text-base">
                    MULAI MENGERJAKAN SOAL
                </button>
                <button onclick="keluarFullscreenDnd()" class="w-full mt-2.5 text-slate-400 font-bold hover:text-white py-1.5 text-xs transition-colors">
                    Batal / Kembali
                </button>
            </div>
            
            <div class="text-center mt-6 opacity-50">
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">SMART TEACHER Interactive Game Engine • Drag & Drop Edition</p>
            </div>
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
// -------------------------------------------------------------
// TIMER HITUNG MUNDUR (DENGAN KECERDASAN PELACAK LOBI DND)
// -------------------------------------------------------------
function mulaiHitungMundurDnd(detikTunggu) {
    const overlayCount = document.createElement('div');
    overlayCount.id = 'layar-hitung-mundur';
    overlayCount.className = 'fixed inset-0 z-[99999] bg-slate-950 flex flex-col items-center justify-center transition-all duration-300';
    
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

function keluarFullscreenDnd() {
    if (typeof stopDndBgm === 'function') stopDndBgm();
    window.isDragDropMode = false;
    
    // 1. Tutup layar hitam / modal game (jika user keluar dari dalam game)
    const modal = document.getElementById('dnd-arena-modal');
    if (modal) modal.classList.add('hidden');
    
    const wadahGame = document.getElementById('dnd-game-container');
    if (wadahGame) wadahGame.innerHTML = '';
    
    // 2. KEMBALIKAN MAIN-CONTENT KE NORMAL (Cabut paksaan fullscreen)
    const mc = document.getElementById('main-content');
    if (mc) {
        // Ini kunci mutlak agar Top Bar Global tidak tertutup lagi
        mc.style.position = '';
        mc.style.top = '';
        mc.style.left = '';
        mc.style.right = '';
        mc.style.bottom = '';
        mc.style.zIndex = '';
        mc.style.backgroundColor = '';
        mc.style.overflowY = '';
        mc.style.padding = '';
        mc.style.margin = '';
        
        // 3. Bersihkan Lobi, lalu render ulang Menu Awal (3 Kotak)
        mc.innerHTML = ''; 
        if (typeof renderDragDropPage === 'function') {
            renderDragDropPage(mc);
        } else if (typeof switchTab === 'function') {
            switchTab('dragdrop');
        }
    }
    
    window.scrollTo(0, 0);
}

function updateLobbySiswaDnd() {
    const kelasId = document.getElementById('lobby-dnd-kelas').value;
    const selectSiswa = document.getElementById('lobby-dnd-siswa');
    if (!kelasId) {
        if (selectSiswa) selectSiswa.innerHTML = '<option value="">-- Pilih Kelas Terlebih Dahulu --</option>';
        return;
    }
    let siswaKelas = AppState.db.siswa.filter(s => s.kelasId === kelasId);
    let opts = siswaKelas.map(s => `<option value="${s.id}">${s.nama}</option>`).join('');
    if (selectSiswa) selectSiswa.innerHTML = `<option value="">-- Pilih Siswa yang Mengerjakan --</option>${opts}`;
}

// =====================================================================
// MESIN UNDIAN KHUSUS DRAG & DROP (JIPLAKAN MANDIRI, 100% AMAN DARI KUIS)
// =====================================================================

function undiPemainDndSpin() {
    const klsId = document.getElementById('lobby-dnd-kelas').value;
    if (!klsId) return showAlert('Peringatan', 'Pilih kelas terlebih dahulu!');
    const listSiswa = AppState.db.siswa.filter(s => s.kelasId === klsId);
    if (listSiswa.length === 0) return showAlert('Peringatan', 'Belum ada siswa!');
    
    let pemenang = listSiswa[Math.floor(Math.random() * listSiswa.length)];
    document.getElementById('lobby-dnd-siswa').value = pemenang.id;
    
    // Panggil mesin undian MEWAH KHUSUS DND
    eksekusiUndianMewahDnd(pemenang.nama, listSiswa.map(s => s.nama));
}

function eksekusiUndianMewahDnd(pemenang, daftarSemuaSiswa) {
    const layarLama = document.getElementById('layar-undian-dnd');
    if (layarLama) layarLama.remove();
    const overlay = document.createElement('div');
    overlay.id = 'layar-undian-dnd';
    overlay.className = 'fixed inset-0 z-[9999] bg-slate-950/95 flex items-center justify-center backdrop-blur-md transition-opacity';
    
    overlay.innerHTML = `
        <div class="text-center relative px-6 w-full max-w-4xl mx-auto">
            <h2 class="text-emerald-400 font-black text-xl lg:text-2xl mb-8 tracking-widest uppercase animate-pulse">Mencari Pemain Drag & Drop...</h2>
            <div class="w-full bg-gradient-to-br from-emerald-600 to-teal-900 border-4 border-emerald-400 px-8 py-8 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.5)] flex items-center justify-center min-h-[160px]">
                <div id="nama-slot-dnd" class="font-black text-white w-full uppercase tracking-wider text-center break-words leading-tight" style="text-shadow: 2px 2px 10px rgba(0,0,0,0.5);">
                    ???
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    const elNama = document.getElementById('nama-slot-dnd');
    
    // --- MENGAMBIL MESIN AUDIO DARI KUIS ---
    const ctx = typeof getAudioCtx === 'function' ? getAudioCtx() : null;
    
    // Efek putar nama beserta suaranya
    let waktu = 0;
    let interval = 60;
    let timer = setInterval(() => {
        waktu += interval;
        
        // --- SUNTIKAN SUARA TIK-TIK-TIK PERSIS KUIS ---
        if (ctx && ctx.state === 'running') {
            try {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(450, ctx.currentTime);
                gain.gain.setValueAtTime(0.03, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.05);
            } catch(e) {}
        }
        // ----------------------------------------------

        let acak = daftarSemuaSiswa[Math.floor(Math.random() * daftarSemuaSiswa.length)];
        
        elNama.innerText = acak;
        elNama.style.fontSize = acak.length > 20 ? '1.8rem' : '3.2rem';
        
        if (waktu >= 3000) {
            clearInterval(timer);
            elNama.innerText = pemenang;
            elNama.style.fontSize = pemenang.length > 20 ? '2rem' : '3.6rem';
            elNama.style.color = '#fbbf24';
            elNama.style.transform = 'scale(1.05)';
            
            // Memutar suara 'Ting!' saat terpilih
            if (typeof playSoundEffect === 'function') playSoundEffect('terpilih');
            if (typeof confetti === 'function') confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } });
            
            setTimeout(() => tampilkanTombolKonfirmasiUndianDnd(overlay), 1000);
        }
    }, interval);
}

function tampilkanTombolKonfirmasiUndianDnd(overlay) {
    const btnBox = document.createElement('div');
    btnBox.className = 'absolute bottom-10 lg:bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row gap-4 z-[99999] fade-in';
    btnBox.innerHTML = `
        <button onclick="aksiUndianSelesaiDnd('ulang')" class="bg-slate-900/80 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/50 font-black py-3.5 px-8 rounded-2xl shadow-xl transition-all hover:scale-105 flex items-center justify-center">
            <i class="fa-solid fa-rotate-right mr-2 text-lg"></i> Undi Ulang
        </button>
        <button onclick="aksiUndianSelesaiDnd('lanjut')" class="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black py-3.5 px-10 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.5)] border border-emerald-400/50 transition-all hover:scale-105 flex items-center justify-center">
            <i class="fa-solid fa-play mr-2 text-lg"></i> Lanjut Game DnD
        </button>
    `;
    overlay.appendChild(btnBox);
}

function aksiUndianSelesaiDnd(aksi) {
    const overlay = document.getElementById('layar-undian-dnd');
    if (overlay) overlay.remove();

    if (aksi === 'lanjut') {
        // PASTI AMAN: Langsung panggil hitung mundur milik DnD sendiri
        mulaiHitungMundurDnd(3);
    } else {
        // Putar ulang undian DnD
        undiPemainDndSpin(); 
    }
}

function masukKeArenaGameDnd() {
    const kelasId = document.getElementById('lobby-dnd-kelas').value;
    const siswaId = document.getElementById('lobby-dnd-siswa').value;
    const manualName = document.getElementById('lobby-dnd-manual').value.trim();

    if (!manualName && (!kelasId || !siswaId)) {
        return showAlert("Peringatan", "Harap Pilih Kelas, Mapel, dan Siswa ATAU Ketik nama manual!", "error");
    }

    // --- TAMBAHAN KUNCI: Simpan durasi ke memori global SEBELUM Lobi dihapus ---
    const durasiEl = document.getElementById('lobby-dnd-durasi');
    window.dndDurasiPilihan = durasiEl ? parseInt(durasiEl.value) : 15;
// --- TAMBAHAN BARU: Simpan rentang soal dan nyalakan musik ---
    const dariEl = document.getElementById('dnd-soal-dari');
    const sampaiEl = document.getElementById('dnd-soal-sampai');
    window.dndRentang = {
        dari: dariEl && dariEl.value ? parseInt(dariEl.value) : 1,
        sampai: sampaiEl && sampaiEl.value ? parseInt(sampaiEl.value) : 999
    };
    if (typeof playDndBgm === 'function') playDndBgm();
    
    // Baru jalankan mesin game yang akan menimpa layar lobi
    if (gameDndTerpilih === 'match' && typeof mulaiGameMatch === 'function') mulaiGameMatch();
    else if (gameDndTerpilih === 'sort' && typeof mulaiGameSort === 'function') mulaiGameSort();
    else if (gameDndTerpilih === 'build' && typeof mulaiGameBuild === 'function') mulaiGameBuild();
}// Fungsi untuk membuka halaman Drag & Drop Arena dari tombol menu
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

// =========================================================================
// PENDETEKSI SWIPE BACK / TOMBOL BACK HP (MENCEGAH TOP BAR HILANG)
// =========================================================================
window.addEventListener('popstate', function() {
    // 1. Cabut paksaan fullscreen di main-content secara otomatis
    const mc = document.getElementById('main-content');
    if (mc && mc.style.position === 'fixed') {
        mc.style.position = '';
        mc.style.top = '';
        mc.style.left = '';
        mc.style.right = '';
        mc.style.bottom = '';
        mc.style.zIndex = '';
        mc.style.backgroundColor = '';
        mc.style.overflowY = '';
        mc.style.padding = '';
        mc.style.margin = '';
    }
    
    // 2. Pastikan modal game (layar hitam) juga ikut tertutup
    const modal = document.getElementById('dnd-arena-modal');
    if (modal) modal.classList.add('hidden');
    
    window.isDragDropMode = false;
});

// =========================================================================
// REMOTE CONTROL TOP BAR DRAG & DROP (SKOR, TIMER, MUSIK)
// =========================================================================

// 1. Fungsi Remote untuk update Skor
function updateSkorDnd(skorBaru) {
    const elSkor = document.getElementById('dnd-score-val');
    if (elSkor) {
        elSkor.innerText = skorBaru;
        // Efek denyut kecil saat skor bertambah
        elSkor.parentElement.classList.add('scale-110', 'text-amber-300');
        setTimeout(() => elSkor.parentElement.classList.remove('scale-110', 'text-amber-300'), 200);
    }
}

// 2. Fungsi Remote untuk update Timer (Dengan efek tegang saat waktu mau habis)
function updateTimerDnd(sisaDetik) {
    const elTimer = document.getElementById('dnd-timer-val');
    const boxTimer = document.getElementById('dnd-topbar-timer');
    if (elTimer) elTimer.innerText = sisaDetik + "s";
    
    if (boxTimer) {
        if (sisaDetik <= 5 && sisaDetik > 0) {
            // Efek merah berdenyut tegang seperti di kuis
            boxTimer.className = "bg-rose-600 border-2 border-rose-400 text-white px-3 py-1.5 rounded-xl text-xs font-black flex items-center animate-pulse ring-2 ring-rose-500/50 shadow-lg scale-105 transition-all";
        } else {
            // Kembali normal
            boxTimer.className = "bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center";
        }
    }
}

// 3. Fungsi Remote untuk Tombol Musik (Bisa On/Off)
let isDndMusicPlaying = true;
function toggleDndBGM() {
    isDndMusicPlaying = !isDndMusicPlaying;
    const btnMusic = document.getElementById('dnd-topbar-music');
    
    if (isDndMusicPlaying) {
        if (AppState.audio.elements.bgm) AppState.audio.elements.bgm.play().catch(e => console.log(e));
        if (btnMusic) {
            btnMusic.innerHTML = '<i class="fa-solid fa-volume-high mr-1.5"></i> Musik Nyala';
            btnMusic.className = "bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-3 py-1.5 rounded-xl text-xs font-black flex items-center transition-colors";
        }
    } else {
        if (AppState.audio.elements.bgm) AppState.audio.elements.bgm.pause();
        if (btnMusic) {
            btnMusic.innerHTML = '<i class="fa-solid fa-volume-xmark mr-1.5"></i> Musik Mati';
            btnMusic.className = "bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-xl text-xs font-black flex items-center transition-colors";
        }
    }
}

// =========================================================================
// STUDIO SOAL DRAG & DROP (RUANG EDITOR GURU)
// =========================================================================

function bukaEditorSoalDnd() {
    const mc = document.getElementById('main-content');
    if (!mc) return;
    
    // 1. Inisialisasi Database Khusus DND jika belum ada di aplikasi
    if (!AppState.db.dnd) {
        AppState.db.dnd = { match: [], sort: [], build: [] };
    }

    // 2. Render tampilan Dashboard Studio Soal
    mc.innerHTML = `
        <div class="max-w-5xl mx-auto space-y-6 fade-in pb-10 mt-4 px-2 sm:px-0">
            
            <div class="flex justify-between items-center bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-700">
                <h2 class="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                    <i class="fa-solid fa-pen-ruler text-indigo-400"></i> <span class="hidden sm:inline">Studio Soal Drag & Drop</span>
                </h2>
                <button onclick="renderDragDropPage(document.getElementById('main-content'))" class="bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold border border-slate-700 hover:border-rose-500 transition-all flex items-center">
                    <i class="fa-solid fa-arrow-left mr-1.5"></i> Kembali ke Lobi
                </button>
            </div>

            <div class="bg-indigo-950/30 border border-indigo-500/30 p-4 rounded-2xl text-center">
                <p class="text-sm text-indigo-200 font-bold">Pilih jenis game Drag & Drop yang ingin Bapak kelola soalnya:</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Card Editor Match -->
                <div class="bg-slate-800 p-6 rounded-3xl border-2 border-emerald-500/30 text-center shadow-xl relative overflow-hidden group hover:border-emerald-500 transition-colors">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
                    <i class="fa-solid fa-puzzle-piece text-5xl text-emerald-400 mb-4 drop-shadow-lg group-hover:scale-110 transition-transform"></i>
                    <h3 class="text-xl font-black text-white mb-2">Match & Drop</h3>
                    <p class="text-xs text-slate-400 mb-6">Buat bank soal memasangkan balok (Kosakata ke Arti/Definisi).</p>
                    <button onclick="bukaFormEditorDnd('match')" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all shadow-md">
                        Kelola Soal Match
                    </button>
                </div>

                <!-- Card Editor Sort -->
                <div class="bg-slate-800 p-6 rounded-3xl border-2 border-amber-500/30 text-center shadow-xl relative overflow-hidden group hover:border-amber-500 transition-colors">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
                    <i class="fa-solid fa-layer-group text-5xl text-amber-400 mb-4 drop-shadow-lg group-hover:scale-110 transition-transform"></i>
                    <h3 class="text-xl font-black text-white mb-2">Sort & Drop</h3>
                    <p class="text-xs text-slate-400 mb-6">Buat bank soal pengelompokan kategori (Misal: Isim & Fi'il).</p>
                    <button onclick="bukaFormEditorDnd('sort')" class="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-black py-3 rounded-xl transition-all shadow-md">
                        Kelola Soal Sort
                    </button>
                </div>

                <!-- Card Editor Build -->
                <div class="bg-slate-800 p-6 rounded-3xl border-2 border-violet-500/30 text-center shadow-xl relative overflow-hidden group hover:border-violet-500 transition-colors">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none"></div>
                    <i class="fa-solid fa-cubes text-5xl text-violet-400 mb-4 drop-shadow-lg group-hover:scale-110 transition-transform"></i>
                    <h3 class="text-xl font-black text-white mb-2">Build & Drop</h3>
                    <p class="text-xs text-slate-400 mb-6">Buat bank soal menyusun urutan potongan kata menjadi kalimat.</p>
                    <button onclick="bukaFormEditorDnd('build')" class="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl transition-all shadow-md">
                        Kelola Soal Build
                    </button>
                </div>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

// =========================================================================
// STUDIO SOAL DRAG & DROP (DASHBOARD & 3 EDITOR LENGKAP EXCEL & MANUAL)
// =========================================================================

function bukaEditorSoalDnd() {
    const mc = document.getElementById('main-content');
    if (!mc) return;
    
    if (!AppState.db.dnd) {
        AppState.db.dnd = { match: [], sort: [], build: [] };
    }

    mc.innerHTML = `
        <div class="max-w-5xl mx-auto space-y-6 fade-in pb-10 mt-4 px-2 sm:px-0">
            
            <div class="flex justify-between items-center bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-700">
                <h2 class="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                    <i class="fa-solid fa-pen-ruler text-indigo-400"></i> <span class="hidden sm:inline">Studio Soal Drag & Drop</span>
                </h2>
                <button onclick="renderDragDropPage(document.getElementById('main-content'))" class="bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold border border-slate-700 hover:border-rose-500 transition-all flex items-center">
                    <i class="fa-solid fa-arrow-left mr-1.5"></i> Kembali ke Lobi
                </button>
            </div>

            <div class="bg-indigo-950/30 border border-indigo-500/30 p-4 rounded-2xl text-center">
                <p class="text-sm text-indigo-200 font-bold">Pilih jenis game Drag & Drop yang ingin Bapak kelola soalnya:</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Card Editor Match -->
                <div class="bg-slate-800 p-6 rounded-3xl border-2 border-emerald-500/30 text-center shadow-xl relative overflow-hidden group hover:border-emerald-500 transition-colors">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
                    <i class="fa-solid fa-puzzle-piece text-5xl text-emerald-400 mb-4 drop-shadow-lg group-hover:scale-110 transition-transform"></i>
                    <h3 class="text-xl font-black text-white mb-2">Match & Drop</h3>
                    <p class="text-xs text-slate-400 mb-6">Kelola bank soal memasangkan balok (Kosakata & Arti).</p>
                    <button onclick="bukaFormEditorDnd('match')" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all shadow-md">
                        Kelola Soal Match
                    </button>
                </div>

                <!-- Card Editor Sort -->
                <div class="bg-slate-800 p-6 rounded-3xl border-2 border-amber-500/30 text-center shadow-xl relative overflow-hidden group hover:border-amber-500 transition-colors">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
                    <i class="fa-solid fa-layer-group text-5xl text-amber-400 mb-4 drop-shadow-lg group-hover:scale-110 transition-transform"></i>
                    <h3 class="text-xl font-black text-white mb-2">Sort & Drop</h3>
                    <p class="text-xs text-slate-400 mb-6">Kelola bank soal pengelompokan kategori (Isim / Fi'il).</p>
                    <button onclick="bukaFormEditorDnd('sort')" class="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-black py-3 rounded-xl transition-all shadow-md">
                        Kelola Soal Sort
                    </button>
                </div>

                <!-- Card Editor Build -->
                <div class="bg-slate-800 p-6 rounded-3xl border-2 border-violet-500/30 text-center shadow-xl relative overflow-hidden group hover:border-violet-500 transition-colors">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none"></div>
                    <i class="fa-solid fa-cubes text-5xl text-violet-400 mb-4 drop-shadow-lg group-hover:scale-110 transition-transform"></i>
                    <h3 class="text-xl font-black text-white mb-2">Build & Drop</h3>
                    <p class="text-xs text-slate-400 mb-6">Kelola bank soal menyusun kalimat dari potongan kata.</p>
                    <button onclick="bukaFormEditorDnd('build')" class="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl transition-all shadow-md">
                        Kelola Soal Build
                    </button>
                </div>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

function bukaFormEditorDnd(jenis) {
    const mc = document.getElementById('main-content');
    if (!mc) return;

    if (jenis === 'match') {
        renderEditorMatchDnd(mc);
    } else if (jenis === 'sort') {
        renderEditorSortDnd(mc);
    } else if (jenis === 'build') {
        renderEditorBuildDnd(mc);
    }
}


// =========================================================================
// 1. EDITOR MATCH & DROP (LENGKAP EXCEL & MANUAL)
// =========================================================================
function renderEditorMatchDnd(container) {
    if (!AppState.db.dnd.match || AppState.db.dnd.match.length === 0) {
         AppState.db.dnd.match = [
            { id: "m1", tipe: "teks", soal: "كِتَابٌ", arti: "Buku" },
            { id: "m2", tipe: "gambar", soal: "🦆", arti: "Bebek" }
         ];
    }

    let daftarSoalHtml = AppState.db.dnd.match.map((item, index) => `
        <div class="bg-slate-800 p-3 rounded-xl border border-slate-700 flex justify-between items-center mb-3 hover:border-emerald-500/50 transition-colors">
            <div class="flex items-center gap-3 md:gap-4">
                <span class="bg-emerald-900/50 text-emerald-400 font-black w-8 h-8 flex items-center justify-center rounded-lg text-xs border border-emerald-500/30 shrink-0">${index + 1}</span>
                <div>
                    <p class="${item.tipe === 'gambar' ? 'text-2xl' : 'font-arabic text-xl'} text-white leading-none mb-1">${item.soal}</p>
                    <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Arti: <span class="text-emerald-300">${item.arti}</span> <span class="ml-2 px-1.5 py-0.5 bg-slate-700 rounded text-slate-300 text-[9px]">${item.tipe}</span></p>
                </div>
            </div>
            <button onclick="hapusSoalMatch('${item.id}')" class="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-colors shrink-0">
                <i class="fa-solid fa-trash-can text-xs"></i>
            </button>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="max-w-6xl mx-auto space-y-6 fade-in pb-10 mt-4 px-2 sm:px-0">
            <div class="flex justify-between items-center bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-700">
                <h2 class="text-base sm:text-xl font-black text-white flex items-center gap-2">
                    <i class="fa-solid fa-puzzle-piece text-emerald-400"></i> Editor Match & Drop
                </h2>
                <button onclick="bukaEditorSoalDnd()" class="bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold border border-slate-700 hover:border-rose-500 transition-all flex items-center">
                    <i class="fa-solid fa-arrow-left mr-1.5"></i> Kembali
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-1 space-y-6">
                    <div class="bg-slate-800 p-5 rounded-3xl border border-slate-700 shadow-xl">
                        <h3 class="font-black text-emerald-400 mb-3 uppercase tracking-widest text-sm flex items-center"><i class="fa-solid fa-file-excel mr-2"></i> Import Excel</h3>
                        <p class="text-[10px] text-slate-400 mb-4 leading-relaxed">Download template Excel, isi soal, lalu upload kembali ke sini.</p>
                        <button onclick="downloadTemplateMatchExcel()" class="w-full mb-4 bg-slate-700 hover:bg-slate-600 text-emerald-400 font-bold py-2.5 rounded-xl text-xs transition-colors border border-slate-600 flex items-center justify-center">
                            <i class="fa-solid fa-download mr-2"></i> Download Template
                        </button>
                        <div class="relative overflow-hidden">
                            <input type="file" id="file-excel-match" accept=".xlsx, .xls" onchange="bacaExcelMatch(event)" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
                            <div class="bg-emerald-900/30 border border-emerald-500/30 text-emerald-300 text-xs font-bold py-3 px-4 rounded-xl text-center flex flex-col items-center justify-center transition-all hover:bg-emerald-800/40">
                                <i class="fa-solid fa-cloud-arrow-up text-xl mb-1"></i>
                                <span>Klik untuk Upload Excel</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-slate-800 p-5 rounded-3xl border border-slate-700 shadow-xl">
                        <h3 class="font-black text-emerald-400 mb-4 uppercase tracking-widest text-sm flex items-center"><i class="fa-solid fa-plus-circle mr-2"></i> Tambah Manual</h3>
                        <div class="space-y-4">
                            <div>
                                <label class="text-[11px] font-bold text-slate-400 block mb-1.5 uppercase">Tipe Balok</label>
                                <select id="match-input-tipe" class="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-xl p-3 outline-none focus:border-emerald-500 font-bold transition-colors">
                                    <option value="teks">Teks (Arab/Latin)</option>
                                    <option value="gambar">Gambar (Emoji)</option>
                                </select>
                            </div>
                            <div>
                                <label class="text-[11px] font-bold text-slate-400 block mb-1.5 uppercase">Soal (Kosakata/Emoji)</label>
                                <input type="text" id="match-input-soal" class="w-full bg-slate-900 border border-slate-700 text-white font-arabic text-xl rounded-xl p-3 outline-none focus:border-emerald-500 transition-colors" dir="auto" placeholder="Contoh: كِتَابٌ">
                            </div>
                            <div>
                                <label class="text-[11px] font-bold text-slate-400 block mb-1.5 uppercase">Arti (Pasangan)</label>
                                <input type="text" id="match-input-arti" class="w-full bg-slate-900 border border-slate-700 text-white text-sm font-bold rounded-xl p-3 outline-none focus:border-emerald-500 transition-colors" placeholder="Contoh: Buku">
                            </div>
                            <button onclick="tambahSoalMatch()" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-xl shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center">
                                <i class="fa-solid fa-floppy-disk mr-2"></i> Simpan ke Daftar
                            </button>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-2 bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-700 shadow-inner flex flex-col lg:h-[80vh]">
                    <div class="flex justify-between items-center mb-4 border-b border-slate-800 pb-3 shrink-0">
                        <h3 class="font-black text-white text-sm sm:text-base flex items-center"><i class="fa-solid fa-list mr-2 text-slate-400"></i>Daftar Pasangan (<span class="text-emerald-400 ml-1">${AppState.db.dnd.match.length}</span>)</h3>
                        <button onclick="simpanKeDatabaseMatch()" class="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-2 rounded-xl shadow-md transition-transform hover:scale-105 flex items-center">
                            <i class="fa-solid fa-cloud-arrow-up mr-1.5"></i> Simpan Permanen
                        </button>
                    </div>
                    <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        ${daftarSoalHtml || '<div class="text-center bg-slate-800/50 rounded-2xl py-12 border border-dashed border-slate-700"><i class="fa-solid fa-box-open text-4xl text-slate-600 mb-3"></i><p class="text-slate-400 text-xs font-bold">Belum ada pasangan soal.</p></div>'}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function tambahSoalMatch() {
    const tipe = document.getElementById('match-input-tipe').value;
    const soal = document.getElementById('match-input-soal').value.trim();
    const arti = document.getElementById('match-input-arti').value.trim();
    if (!soal || !arti) return alert('Soal dan Arti tidak boleh kosong!');
    let idUnik = 'm_' + Date.now();
    AppState.db.dnd.match.push({ id: idUnik, tipe: tipe, soal: soal, arti: arti });
    renderEditorMatchDnd(document.getElementById('main-content'));
}

function hapusSoalMatch(id) {
    AppState.db.dnd.match = AppState.db.dnd.match.filter(item => item.id !== id);
    renderEditorMatchDnd(document.getElementById('main-content'));
}

function simpanKeDatabaseMatch() {
    if (typeof saveDatabase === 'function') saveDatabase();
    alert('Bank Soal Match & Drop tersimpan permanen!');
}

function downloadTemplateMatchExcel() {
    if (typeof XLSX === 'undefined') return alert('Library Excel belum siap.');
    const ws_data = [
        ['Tipe Balok', 'Soal (Kosakata/Emoji)', 'Arti (Pasangan)'],
        ['PENTING: Kolom Tipe Balok HANYA boleh diisi teks atau gambar.', '', ''],
        ['teks', 'كِتَابٌ', 'Buku'],
        ['gambar', '🚗', 'Mobil']
    ];
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template_Match_Drop");
    XLSX.writeFile(wb, "Template_Soal_Match_Drop.xlsx");
}

function bacaExcelMatch(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonRows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            let jumlahBerhasil = 0;
            for (let i = 2; i < jsonRows.length; i++) {
                let row = jsonRows[i];
                if (!row || row.length < 3) continue;
                let tipe = row[0] ? String(row[0]).trim().toLowerCase() : 'teks';
                let soal = row[1] ? String(row[1]).trim() : '';
                let arti = row[2] ? String(row[2]).trim() : '';
                if (!soal || !arti) continue;
                if (tipe !== 'teks' && tipe !== 'gambar') tipe = 'teks';
                let idUnik = 'm_' + Date.now() + '_' + i;
                AppState.db.dnd.match.push({ id: idUnik, tipe: tipe, soal: soal, arti: arti });
                jumlahBerhasil++;
            }
            if (jumlahBerhasil > 0) {
                renderEditorMatchDnd(document.getElementById('main-content'));
                alert(`${jumlahBerhasil} soal match berhasil diimport!`);
            }
        } catch (err) {
            alert('Gagal membaca Excel: ' + err.message);
        }
        event.target.value = '';
    };
    reader.readAsArrayBuffer(file);
}


// =========================================================================
// 2. EDITOR SORT & DROP (LENGKAP EXCEL & MANUAL)
// =========================================================================
function renderEditorSortDnd(container) {
    if (!AppState.db.dnd.sort || AppState.db.dnd.sort.length === 0) {
         AppState.db.dnd.sort = [
            { id: "s1", soal: "كِتَابٌ", arti: "Buku", kat: "isim", tipe: "teks" },
            { id: "s2", soal: "🏃", arti: "Berlari", kat: "fiil", tipe: "gambar" }
         ];
    }

    let daftarSoalHtml = AppState.db.dnd.sort.map((item, index) => `
        <div class="bg-slate-800 p-3 rounded-xl border border-slate-700 flex justify-between items-center mb-3 hover:border-amber-500/50 transition-colors">
            <div class="flex items-center gap-3 md:gap-4">
                <span class="bg-amber-900/50 text-amber-400 font-black w-8 h-8 flex items-center justify-center rounded-lg text-xs border border-amber-500/30 shrink-0">${index + 1}</span>
                <div>
                    <p class="${item.tipe === 'gambar' ? 'text-2xl' : 'font-arabic text-xl'} text-white leading-none mb-1">${item.soal}</p>
                    <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Arti: <span class="text-amber-300">${item.arti}</span> | Kategori: <span class="text-indigo-400 uppercase font-black">${item.kat}</span></p>
                </div>
            </div>
            <button onclick="hapusSoalSort('${item.id}')" class="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-colors shrink-0">
                <i class="fa-solid fa-trash-can text-xs"></i>
            </button>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="max-w-6xl mx-auto space-y-6 fade-in pb-10 mt-4 px-2 sm:px-0">
            <div class="flex justify-between items-center bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-700">
                <h2 class="text-base sm:text-xl font-black text-white flex items-center gap-2">
                    <i class="fa-solid fa-layer-group text-amber-400"></i> Editor Sort & Drop
                </h2>
                <button onclick="bukaEditorSoalDnd()" class="bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold border border-slate-700 hover:border-rose-500 transition-all flex items-center">
                    <i class="fa-solid fa-arrow-left mr-1.5"></i> Kembali
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-1 space-y-6">
                    <div class="bg-slate-800 p-5 rounded-3xl border border-slate-700 shadow-xl">
                        <h3 class="font-black text-amber-400 mb-3 uppercase tracking-widest text-sm flex items-center"><i class="fa-solid fa-file-excel mr-2"></i> Import Excel</h3>
                        <p class="text-[10px] text-slate-400 mb-4 leading-relaxed">Download template Excel sort, isi soal dan kategorinya, lalu upload.</p>
                        <button onclick="downloadTemplateSortExcel()" class="w-full mb-4 bg-slate-700 hover:bg-slate-600 text-amber-400 font-bold py-2.5 rounded-xl text-xs transition-colors border border-slate-600 flex items-center justify-center">
                            <i class="fa-solid fa-download mr-2"></i> Download Template
                        </button>
                        <div class="relative overflow-hidden">
                            <input type="file" id="file-excel-sort" accept=".xlsx, .xls" onchange="bacaExcelSort(event)" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
                            <div class="bg-amber-900/30 border border-amber-500/30 text-amber-300 text-xs font-bold py-3 px-4 rounded-xl text-center flex flex-col items-center justify-center transition-all hover:bg-amber-800/40">
                                <i class="fa-solid fa-cloud-arrow-up text-xl mb-1"></i>
                                <span>Klik untuk Upload Excel</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-slate-800 p-5 rounded-3xl border border-slate-700 shadow-xl">
                        <h3 class="font-black text-amber-400 mb-4 uppercase tracking-widest text-sm flex items-center"><i class="fa-solid fa-plus-circle mr-2"></i> Tambah Manual</h3>
                        <div class="space-y-4">
                            <div>
                                <label class="text-[11px] font-bold text-slate-400 block mb-1.5 uppercase">Tipe Balok</label>
                                <select id="sort-input-tipe" class="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-xl p-3 outline-none focus:border-amber-500 font-bold transition-colors">
                                    <option value="teks">Teks (Arab/Latin)</option>
                                    <option value="gambar">Gambar (Emoji)</option>
                                </select>
                            </div>
                            <div>
                                <label class="text-[11px] font-bold text-slate-400 block mb-1.5 uppercase">Soal</label>
                                <input type="text" id="sort-input-soal" class="w-full bg-slate-900 border border-slate-700 text-white font-arabic text-xl rounded-xl p-3 outline-none focus:border-amber-500 transition-colors" dir="auto" placeholder="Contoh: كِتَابٌ">
                            </div>
                            <div>
                                <label class="text-[11px] font-bold text-slate-400 block mb-1.5 uppercase">Arti</label>
                                <input type="text" id="sort-input-arti" class="w-full bg-slate-900 border border-slate-700 text-white text-sm font-bold rounded-xl p-3 outline-none focus:border-amber-500 transition-colors" placeholder="Contoh: Buku">
                            </div>
                            <div>
                                <label class="text-[11px] font-bold text-slate-400 block mb-1.5 uppercase">Kategori (isim / fiil)</label>
                                <input type="text" id="sort-input-kat" class="w-full bg-slate-900 border border-slate-700 text-white text-sm font-bold rounded-xl p-3 outline-none focus:border-amber-500 transition-colors" placeholder="isim atau fiil">
                            </div>
                            <button onclick="tambahSoalSort()" class="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-black py-3 rounded-xl shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center">
                                <i class="fa-solid fa-floppy-disk mr-2"></i> Simpan ke Daftar
                            </button>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-2 bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-700 shadow-inner flex flex-col lg:h-[80vh]">
                    <div class="flex justify-between items-center mb-4 border-b border-slate-800 pb-3 shrink-0">
                        <h3 class="font-black text-white text-sm sm:text-base flex items-center"><i class="fa-solid fa-list mr-2 text-slate-400"></i>Daftar Soal Sort (<span class="text-amber-400 ml-1">${AppState.db.dnd.sort.length}</span>)</h3>
                        <button onclick="simpanKeDatabaseSort()" class="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-2 rounded-xl shadow-md transition-transform hover:scale-105 flex items-center">
                            <i class="fa-solid fa-cloud-arrow-up mr-1.5"></i> Simpan Permanen
                        </button>
                    </div>
                    <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        ${daftarSoalHtml || '<div class="text-center bg-slate-800/50 rounded-2xl py-12 border border-dashed border-slate-700"><i class="fa-solid fa-box-open text-4xl text-slate-600 mb-3"></i><p class="text-slate-400 text-xs font-bold">Belum ada soal sort.</p></div>'}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function tambahSoalSort() {
    const tipe = document.getElementById('sort-input-tipe').value;
    const soal = document.getElementById('sort-input-soal').value.trim();
    const arti = document.getElementById('sort-input-arti').value.trim();
    const kat = document.getElementById('sort-input-kat').value.trim().toLowerCase();
    if (!soal || !arti || !kat) return alert('Semua kolom wajib diisi!');
    let idUnik = 's_' + Date.now();
    AppState.db.dnd.sort.push({ id: idUnik, soal: soal, arti: arti, kat: kat, tipe: tipe });
    renderEditorSortDnd(document.getElementById('main-content'));
}

function hapusSoalSort(id) {
    AppState.db.dnd.sort = AppState.db.dnd.sort.filter(item => item.id !== id);
    renderEditorSortDnd(document.getElementById('main-content'));
}

function simpanKeDatabaseSort() {
    if (typeof saveDatabase === 'function') saveDatabase();
    alert('Bank Soal Sort & Drop tersimpan permanen!');
}

function downloadTemplateSortExcel() {
    if (typeof XLSX === 'undefined') return alert('Library Excel belum siap.');
    const ws_data = [
        ['Tipe Balok', 'Soal (Kosakata/Emoji)', 'Arti / Keterangan', 'Kategori (isim / fiil)'],
        ['PENTING: Kolom Kategori isi dengan isim atau fiil.', '', '', ''],
        ['teks', 'كِتَابٌ', 'Buku', 'isim'],
        ['gambar', '🏃', 'Berlari', 'fiil']
    ];
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template_Sort_Drop");
    XLSX.writeFile(wb, "Template_Soal_Sort_Drop.xlsx");
}

function bacaExcelSort(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonRows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            let jumlahBerhasil = 0;
            for (let i = 2; i < jsonRows.length; i++) {
                let row = jsonRows[i];
                if (!row || row.length < 4) continue;
                let tipe = row[0] ? String(row[0]).trim().toLowerCase() : 'teks';
                let soal = row[1] ? String(row[1]).trim() : '';
                let arti = row[2] ? String(row[2]).trim() : '';
                let kat = row[3] ? String(row[3]).trim().toLowerCase() : 'isim';
                if (!soal || !arti) continue;
                if (tipe !== 'teks' && tipe !== 'gambar') tipe = 'teks';
                let idUnik = 's_' + Date.now() + '_' + i;
                AppState.db.dnd.sort.push({ id: idUnik, soal: soal, arti: arti, kat: kat, tipe: tipe });
                jumlahBerhasil++;
            }
            if (jumlahBerhasil > 0) {
                renderEditorSortDnd(document.getElementById('main-content'));
                alert(`${jumlahBerhasil} soal sort berhasil diimport!`);
            }
        } catch (err) {
            alert('Gagal membaca file: ' + err.message);
        }
        event.target.value = '';
    };
    reader.readAsArrayBuffer(file);
}


// =========================================================================
// 3. EDITOR BUILD & DROP (LENGKAP EXCEL & MANUAL)
// =========================================================================
function renderEditorBuildDnd(container) {
    if (!AppState.db.dnd.build || AppState.db.dnd.build.length === 0) {
         AppState.db.dnd.build = [
            {
                id: "b1",
                arti: "Ahmad pergi ke sekolah",
                susunan: [
                    { id: "w1", teks: "ذَهَبَ" },
                    { id: "w2", teks: "أَحْمَدُ" },
                    { id: "w3", teks: "إِلَى" },
                    { id: "w4", teks: "الْمَدْرَسَةِ" }
                ]
            }
         ];
    }

    let daftarSoalHtml = AppState.db.dnd.build.map((item, index) => {
        let deretanKata = item.susunan.map(w => `<span class="px-2 py-1 bg-slate-700 rounded text-white font-arabic text-sm">${w.teks}</span>`).join(' ');
        return `
            <div class="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center mb-3 hover:border-violet-500/50 transition-colors">
                <div class="space-y-1">
                    <div class="flex items-center gap-2">
                        <span class="bg-violet-900/50 text-violet-400 font-black px-2.5 py-1 rounded text-xs border border-violet-500/30">Soal ${index + 1}</span>
                        <p class="text-xs font-bold text-slate-300">Arti: <span class="text-violet-300">"${item.arti}"</span></p>
                    </div>
                    <div class="flex flex-wrap gap-1.5 pt-1">${deretanKata}</div>
                </div>
                <button onclick="hapusSoalBuild('${item.id}')" class="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-colors shrink-0 ml-4">
                    <i class="fa-solid fa-trash-can text-xs"></i>
                </button>
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <div class="max-w-6xl mx-auto space-y-6 fade-in pb-10 mt-4 px-2 sm:px-0">
            <div class="flex justify-between items-center bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-700">
                <h2 class="text-base sm:text-xl font-black text-white flex items-center gap-2">
                    <i class="fa-solid fa-cubes text-violet-400"></i> Editor Build & Drop
                </h2>
                <button onclick="bukaEditorSoalDnd()" class="bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold border border-slate-700 hover:border-rose-500 transition-all flex items-center">
                    <i class="fa-solid fa-arrow-left mr-1.5"></i> Kembali
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-1 space-y-6">
                    <div class="bg-slate-800 p-5 rounded-3xl border border-slate-700 shadow-xl">
                        <h3 class="font-black text-violet-400 mb-3 uppercase tracking-widest text-sm flex items-center"><i class="fa-solid fa-file-excel mr-2"></i> Import Excel</h3>
                        <p class="text-[10px] text-slate-400 mb-4 leading-relaxed">Download template susunan kalimat, isi kata-katanya, lalu upload kembali.</p>
                        <button onclick="downloadTemplateBuildExcel()" class="w-full mb-4 bg-slate-700 hover:bg-slate-600 text-violet-400 font-bold py-2.5 rounded-xl text-xs transition-colors border border-slate-600 flex items-center justify-center">
                            <i class="fa-solid fa-download mr-2"></i> Download Template
                        </button>
                        <div class="relative overflow-hidden">
                            <input type="file" id="file-excel-build" accept=".xlsx, .xls" onchange="bacaExcelBuild(event)" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
                            <div class="bg-violet-900/30 border border-violet-500/30 text-violet-300 text-xs font-bold py-3 px-4 rounded-xl text-center flex flex-col items-center justify-center transition-all hover:bg-violet-800/40">
                                <i class="fa-solid fa-cloud-arrow-up text-xl mb-1"></i>
                                <span>Klik untuk Upload Excel</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-slate-800 p-5 rounded-3xl border border-slate-700 shadow-xl">
                        <h3 class="font-black text-violet-400 mb-4 uppercase tracking-widest text-sm flex items-center"><i class="fa-solid fa-plus-circle mr-2"></i> Tambah Manual</h3>
                        <div class="space-y-4">
                            <div>
                                <label class="text-[11px] font-bold text-slate-400 block mb-1.5 uppercase">Arti Kalimat</label>
                                <input type="text" id="build-input-arti" class="w-full bg-slate-900 border border-slate-700 text-white text-sm font-bold rounded-xl p-3 outline-none focus:border-violet-500 transition-colors" placeholder="Contoh: Ahmad pergi ke sekolah">
                            </div>
                            <div>
                                <label class="text-[11px] font-bold text-slate-400 block mb-1.5 uppercase">Potongan Kata (Pisahkan koma)</label>
                                <textarea id="build-input-kata" rows="3" class="w-full bg-slate-900 border border-slate-700 text-white font-arabic text-lg rounded-xl p-3 outline-none focus:border-violet-500 transition-colors" placeholder="ذَهَبَ, أَحْمَدُ, إِلَى, الْمَدْرَسَةِ"></textarea>
                            </div>
                            <button onclick="tambahSoalBuild()" class="w-full bg-violet-600 hover:bg-violet-500 text-white font-black py-3 rounded-xl shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center">
                                <i class="fa-solid fa-floppy-disk mr-2"></i> Simpan ke Daftar
                            </button>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-2 bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-700 shadow-inner flex flex-col lg:h-[80vh]">
                    <div class="flex justify-between items-center mb-4 border-b border-slate-800 pb-3 shrink-0">
                        <h3 class="font-black text-white text-sm sm:text-base flex items-center"><i class="fa-solid fa-list mr-2 text-slate-400"></i>Daftar Kalimat Build (<span class="text-violet-400 ml-1">${AppState.db.dnd.build.length}</span>)</h3>
                        <button onclick="simpanKeDatabaseBuild()" class="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-2 rounded-xl shadow-md transition-transform hover:scale-105 flex items-center">
                            <i class="fa-solid fa-cloud-arrow-up mr-1.5"></i> Simpan Permanen
                        </button>
                    </div>
                    <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        ${daftarSoalHtml || '<div class="text-center bg-slate-800/50 rounded-2xl py-12 border border-dashed border-slate-700"><i class="fa-solid fa-box-open text-4xl text-slate-600 mb-3"></i><p class="text-slate-400 text-xs font-bold">Belum ada kalimat build.</p></div>'}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function tambahSoalBuild() {
    const arti = document.getElementById('build-input-arti').value.trim();
    const kataStr = document.getElementById('build-input-kata').value.trim();
    if (!arti || !kataStr) return alert('Arti dan potongan kata wajib diisi!');
    let arrKata = kataStr.split(',').map((k, idx) => ({ id: 'w' + (idx + 1), teks: k.trim() })).filter(k => k.teks !== '');
    let idUnik = 'b_' + Date.now();
    AppState.db.dnd.build.push({ id: idUnik, arti: arti, susunan: arrKata });
    renderEditorBuildDnd(document.getElementById('main-content'));
}

function hapusSoalBuild(id) {
    AppState.db.dnd.build = AppState.db.dnd.build.filter(item => item.id !== id);
    renderEditorBuildDnd(document.getElementById('main-content'));
}

function simpanKeDatabaseBuild() {
    if (typeof saveDatabase === 'function') saveDatabase();
    alert('Bank Soal Build & Drop tersimpan permanen!');
}

function downloadTemplateBuildExcel() {
    if (typeof XLSX === 'undefined') return alert('Library Excel belum siap.');
    const ws_data = [
        ['Arti / Terjemahan Kalimat', 'Potongan Kata (Pisahkan dengan koma ,)'],
        ['PENTING: Kolom kedua adalah urutan kata benar dipisahkan koma.', ''],
        ['Ahmad pergi ke sekolah', 'ذَهَبَ, أَحْمَدُ, إِلَى, الْمَدْرَسَةِ'],
        ['Siswa membaca Al-Quran', 'قَرَأَ, الطَّالِبُ, الْقُرْآنَ']
    ];
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template_Build_Drop");
    XLSX.writeFile(wb, "Template_Soal_Build_Drop.xlsx");
}

function bacaExcelBuild(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonRows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            let jumlahBerhasil = 0;
            for (let i = 2; i < jsonRows.length; i++) {
                let row = jsonRows[i];
                if (!row || row.length < 2) continue;
                let arti = row[0] ? String(row[0]).trim() : '';
                let kataStr = row[1] ? String(row[1]).trim() : '';
                if (!arti || !kataStr) continue;
                let arrKata = kataStr.split(',').map((k, idx) => ({ id: 'w' + (idx + 1), teks: k.trim() })).filter(k => k.teks !== '');
                let idUnik = 'b_' + Date.now() + '_' + i;
                AppState.db.dnd.build.push({ id: idUnik, arti: arti, susunan: arrKata });
                jumlahBerhasil++;
            }
            if (jumlahBerhasil > 0) {
                renderEditorBuildDnd(document.getElementById('main-content'));
                alert(`${jumlahBerhasil} soal kalimat berhasil diimport!`);
            }
        } catch (err) {
            alert('Gagal membaca Excel: ' + err.message);
        }
        event.target.value = '';
    };
    reader.readAsArrayBuffer(file);
}
