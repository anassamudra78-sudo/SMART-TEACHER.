// ==========================================================
// FILE: ui-dragdrop.js 
// FUNGSI: Mengelola Lobi dan Antarmuka Drag & Drop Arena
// ==========================================================

function renderDragDropPage(container) {
    container.innerHTML = `
        <div class="max-w-5xl mx-auto space-y-6 fade-in pb-20">
            <!-- HEADER (HERO) -->
            <div class="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 rounded-[2.5rem] border border-indigo-500/20 shadow-2xl overflow-hidden p-8 lg:p-12 text-center mb-6 relative">
                <!-- Elemen Dekorasi -->
                <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                
                <div class="relative z-10">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 mb-6">
                        <i class="fa-solid fa-gamepad"></i>
                        <span class="text-xs font-black tracking-widest uppercase shadow-inner">PLAY & LEARN</span>
                    </div>
                    
                    <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-slate-400 mb-4 drop-shadow-lg">Drag & Drop Arena</h2>
                    <p class="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-8">Pilih mode permainan interaktif di bawah ini. Geser dan letakkan balok ke tempat yang benar untuk mendapatkan poin!</p>
                </div>
            </div>

            <!-- PILIHAN 3 GAME DND -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10 max-w-6xl mx-auto">
                <!-- GAME 1: MATCH & DROP -->
                <div class="bg-slate-900 border border-slate-700 p-6 rounded-[2rem] text-center shadow-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:border-emerald-500/50 group flex flex-col justify-between h-full">
                    <div>
                        <div class="w-20 h-20 mx-auto bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-emerald-500 transition-colors">
                            <i class="fa-solid fa-puzzle-piece text-4xl text-emerald-500 group-hover:text-white transition-colors"></i>
                        </div>
                        <h3 class="text-xl font-black text-white mb-2 tracking-wide uppercase">Match & Drop</h3>
                        <p class="text-xs text-slate-400 mb-6 leading-relaxed">Pasangkan balok soal ke kotak jawaban yang tepat. Cocok untuk kosakata dan definisi.</p>
                    </div>
                    <button onclick="bukaLobiDragDrop('match')" class="w-full bg-slate-800 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-slate-600 hover:border-emerald-400 font-bold py-3.5 px-6 rounded-xl transition-all uppercase text-xs tracking-wider shadow-md flex items-center justify-center">
                        <i class="fa-solid fa-play mr-2"></i> Mainkan Sekarang
                    </button>
                </div>

                <!-- GAME 2: SORT & DROP -->
                <div class="bg-slate-900 border border-slate-700 p-6 rounded-[2rem] text-center shadow-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:border-amber-500/50 group flex flex-col justify-between h-full">
                    <div>
                        <div class="w-20 h-20 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors">
                            <i class="fa-solid fa-layer-group text-4xl text-amber-500 group-hover:text-slate-900 transition-colors"></i>
                        </div>
                        <h3 class="text-xl font-black text-white mb-2 tracking-wide uppercase">Sort & Drop</h3>
                        <p class="text-xs text-slate-400 mb-6 leading-relaxed">Kelompokkan berbagai item ke dalam kategori yang sesuai. Cocok untuk klasifikasi.</p>
                    </div>
                    <button onclick="bukaLobiDragDrop('sort')" class="w-full bg-slate-800 hover:bg-amber-500 text-amber-400 hover:text-slate-900 border border-slate-600 hover:border-amber-400 font-bold py-3.5 px-6 rounded-xl transition-all uppercase text-xs tracking-wider shadow-md flex items-center justify-center">
                        <i class="fa-solid fa-play mr-2"></i> Mainkan Sekarang
                    </button>
                </div>

                <!-- GAME 3: BUILD & DROP -->
                <div class="bg-slate-900 border border-slate-700 p-6 rounded-[2rem] text-center shadow-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-violet-500/50 group flex flex-col justify-between h-full">
                    <div>
                        <div class="w-20 h-20 mx-auto bg-violet-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-violet-500 transition-colors">
                            <i class="fa-solid fa-cubes text-4xl text-violet-500 group-hover:text-white transition-colors"></i>
                        </div>
                        <h3 class="text-xl font-black text-white mb-2 tracking-wide uppercase">Build & Drop</h3>
                        <p class="text-xs text-slate-400 mb-6 leading-relaxed">Susun potongan kata menjadi satu kalimat utuh. Cocok untuk tata bahasa dan sintaksis.</p>
                    </div>
                    <button onclick="bukaLobiDragDrop('build')" class="w-full bg-slate-800 hover:bg-violet-500 text-violet-400 hover:text-white border border-slate-600 hover:border-violet-400 font-bold py-3.5 px-6 rounded-xl transition-all uppercase text-xs tracking-wider shadow-md flex items-center justify-center">
                        <i class="fa-solid fa-play mr-2"></i> Mainkan Sekarang
                    </button>
                </div>
            </div>
        </div>
    `;
}

let gameDndTerpilih = '';

function bukaLobiDragDrop(jenisGame) {
    gameDndTerpilih = jenisGame;
    const container = document.getElementById('main-content');
    
    let namaGame, iconGame, warnaTema, textBtn;
    if (jenisGame === 'match') {
        namaGame = "MATCH & DROP";
        iconGame = "fa-puzzle-piece";
        warnaTema = "emerald";
        textBtn = "text-white";
    } else if (jenisGame === 'sort') {
        namaGame = "SORT & DROP";
        iconGame = "fa-layer-group";
        warnaTema = "amber";
        textBtn = "text-slate-900";
    } else if (jenisGame === 'build') {
        namaGame = "BUILD & DROP";
        iconGame = "fa-cubes";
        warnaTema = "violet";
        textBtn = "text-white";
    }

    let kelasOpts = AppState.db.kelas.map(k => `<option value="${k.id}">${k.kode}</option>`).join('');

    container.innerHTML = `
        <div class="max-w-4xl mx-auto p-2 md:p-4 mt-2 select-none fade-in pb-20">
            
            <div class="flex flex-wrap justify-between items-center bg-slate-900 p-2 md:p-3 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] mb-4 border border-slate-700 gap-2">
                <div class="flex items-center gap-3 px-2">
                    <div class="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md">
                        <i class="fa-solid fa-gamepad text-sm md:text-lg"></i>
                    </div>
                    <div>
                        <h2 class="text-xs md:text-base font-black text-white leading-tight tracking-wide">DRAG & DROP ARENA</h2>
                        <p class="text-[9px] md:text-xs text-${warnaTema}-400 font-bold">Persiapan: ${namaGame}</p>
                    </div>
                </div>

                <div class="flex items-center gap-1.5 md:gap-2 shrink-0">
                    <div class="hidden sm:flex bg-rose-900/50 text-rose-400 border border-rose-700 px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold items-center gap-1.5">
                        <i class="fa-solid fa-stopwatch"></i> Bebas
                    </div>
                    <button class="bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold flex items-center gap-1.5 transition-colors">
                        <i class="fa-solid fa-volume-high"></i> <span class="hidden sm:block">Musik Nyala</span>
                    </button>
                    <button onclick="bukaDragAndDropArena()" class="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold flex items-center gap-1.5 transition-colors">
                        <i class="fa-solid fa-arrow-right-from-bracket"></i> <span class="hidden sm:block">Keluar</span>
                    </button>
                </div>
            </div>

            <div class="bg-slate-900 p-5 md:p-8 rounded-[2rem] border border-slate-700 shadow-2xl relative overflow-hidden mt-6 max-w-3xl mx-auto">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1.5 bg-${warnaTema}-500 rounded-b-full shadow-[0_0_15px_rgba(var(--tw-colors-${warnaTema}-500),0.8)]"></div>
                
                <div class="text-center mb-8 mt-4 flex flex-col items-center">
                    <i class="fa-solid fa-user-graduate text-4xl md:text-5xl text-amber-400 mb-4 drop-shadow-md"></i>
                    <h3 class="text-xl md:text-2xl font-black text-white">Identitas Pemain</h3>
                    <p class="text-[10px] md:text-xs text-slate-400 mt-1">Pilih kelas dan siswa yang akan bermain</p>
                </div>

                <div class="space-y-4">
                    <div>
                        <label class="text-[10px] md:text-xs font-bold text-slate-400 ml-1 mb-1 block">1. Pilih Kelas</label>
                        <select id="lobby-dnd-kelas" onchange="updateLobbySiswaDnd()" class="w-full bg-slate-950 border border-slate-800 text-slate-300 text-xs md:text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-${warnaTema}-500 transition-colors">
                            <option value="">-- Pilih Kelas --</option>
                            ${kelasOpts}
                        </select>
                    </div>
                    
                    <div>
                        <label class="text-[10px] md:text-xs font-bold text-slate-400 ml-1 mb-1 block">2. Nama Siswa</label>
                        <div class="flex gap-2">
                            <select id="lobby-dnd-siswa" class="flex-1 bg-slate-950 border border-slate-800 text-slate-300 text-xs md:text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-${warnaTema}-500 transition-colors">
                                <option value="">-- Pilih Kelas Terlebih Dahulu --</option>
                            </select>
                            <button onclick="undiPemainDndSpin()" class="bg-amber-500 hover:bg-amber-400 text-slate-900 font-black px-4 md:px-5 rounded-xl flex items-center gap-2 shadow-md transition-colors">
                                <i class="fa-solid fa-dice"></i> Undi
                            </button>
                        </div>
                        <input type="text" id="lobby-dnd-manual" placeholder="Atau ketik nama manual..." class="w-full bg-slate-900 border border-slate-800 text-slate-300 text-xs md:text-sm rounded-xl px-4 py-3 mt-2 focus:outline-none focus:border-${warnaTema}-500 transition-colors">
                    </div>
                </div>

                <div class="mt-8">
                    <button onclick="masukKeArenaGameDnd()" class="w-full bg-${warnaTema}-500 hover:bg-${warnaTema}-400 ${textBtn} font-black text-sm md:text-base py-4 rounded-xl shadow-[0_0_20px_rgba(var(--tw-colors-${warnaTema}-500),0.3)] transition-transform transform hover:scale-[1.02] flex justify-center items-center gap-2 uppercase tracking-wide">
                        MULAI MENGERJAKAN SOAL
                    </button>
                    <button onclick="bukaDragAndDropArena()" class="w-full text-center mt-4 text-slate-400 hover:text-white text-[10px] md:text-xs font-bold transition-colors">
                        Batal / Kembali
                    </button>
                </div>
            </div>
        </div>
    `;
}

function updateLobbySiswaDnd() {
    const kelasId = document.getElementById('lobby-dnd-kelas').value;
    const selectSiswa = document.getElementById('lobby-dnd-siswa');

    if(!kelasId) {
        if (selectSiswa) selectSiswa.innerHTML = '<option value="">-- Pilih Kelas Terlebih Dahulu --</option>';
        return;
    }

    let siswaKelas = AppState.db.siswa.filter(s => s.kelasId === kelasId);
    let opts = siswaKelas.map(s => `<option value="${s.id}">${s.nama}</option>`).join('');

    if (selectSiswa) selectSiswa.innerHTML = `<option value="">-- Pilih Siswa yang Mengerjakan --</option>${opts}`;
}

function undiPemainDndSpin() {
    const klsId = document.getElementById('lobby-dnd-kelas').value;
    if (!klsId) return showAlert('Peringatan', 'Pilih kelas terlebih dahulu!');

    const listSiswa = AppState.db.siswa.filter(s => s.kelasId === klsId);
    if (listSiswa.length === 0) return showAlert('Peringatan', 'Belum ada siswa!');

    const daftarSemuaNama = listSiswa.map(s => s.nama);
    let acakSiswa = [...listSiswa].sort(() => 0.5 - Math.random());
    let pemenang = acakSiswa[0];

    document.getElementById('lobby-dnd-siswa').value = pemenang.id;
    
    if (typeof eksekusiUndianMewah === 'function') {
        eksekusiUndianMewah('single', pemenang.nama, null, daftarSemuaNama);
    }
}

function masukKeArenaGameDnd() {
    const kelasId = document.getElementById('lobby-dnd-kelas').value;
    const siswaId = document.getElementById('lobby-dnd-siswa').value;
    const manualName = document.getElementById('lobby-dnd-manual').value.trim();

    if (!manualName && (!kelasId || !siswaId)) {
        return showAlert("Peringatan", "Harap Pilih Kelas dan Siswa ATAU Ketik nama manual!", "error");
    }

    if (gameDndTerpilih === 'match') {
        if (typeof mulaiGameMatch === 'function') mulaiGameMatch();
    } else if (gameDndTerpilih === 'sort') {
        if (typeof mulaiGameSort === 'function') mulaiGameSort();
    } else if (gameDndTerpilih === 'build') {
        if (typeof mulaiGameBuild === 'function') mulaiGameBuild();
    }
}

function bukaDragAndDropArena() {
    switchTab('dragdrop');
}
