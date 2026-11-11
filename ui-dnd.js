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
