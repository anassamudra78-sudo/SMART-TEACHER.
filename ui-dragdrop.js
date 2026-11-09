// ==========================================================
// FILE: ui-dragdrop.js 
// FUNGSI: Mengelola Lobi dan Antarmuka Drag & Drop Arena
// ==========================================================

function renderDragDropPage(container) {
    container.innerHTML = `
        <div class="max-w-5xl mx-auto space-y-4 fade-in pb-8">
            <!-- HERO SECTION - DESAIN ASLI DENGAN PADDING ATAS & BAWAH DIREMPINGKAN -->
            <div class="relative bg-slate-900 rounded-[2.5rem] border border-indigo-500/20 shadow-2xl overflow-hidden px-6 py-5 lg:px-10 lg:py-6 text-center mb-4">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl bg-gradient-to-b from-indigo-500/10 to-transparent blur-3xl pointer-events-none"></div>
                <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
                
                <div class="relative z-10">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 mb-2">
                        <i class="fa-solid fa-gamepad text-xs"></i>
                        <span class="text-[10px] font-black tracking-widest uppercase">PLAY & LEARN</span>
                    </div>
                    
                    <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-slate-400 mb-2 drop-shadow-lg">Drag & Drop Arena</h2>
                    
                    <p class="text-slate-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
                        Pilih mode permainan interaktif di bawah ini. Geser dan letakkan balok ke tempat yang benar untuk mendapatkan poin!
                    </p>
                </div>
            </div>

            <!-- PILIHAN 3 GAME (DESAIN ASLI LENGKAP) -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 max-w-5xl mx-auto">
                <!-- GAME 1: MATCH & DROP -->
                <div class="bg-slate-900 border border-slate-700 p-6 rounded-[2rem] text-center shadow-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:border-emerald-500/50 group flex flex-col justify-between h-full">
                    <div>
                        <div class="w-16 h-16 mx-auto bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-emerald-500 transition-colors">
                            <i class="fa-solid fa-puzzle-piece text-3xl text-emerald-500 group-hover:text-white transition-colors"></i>
                        </div>
                        <h3 class="text-lg font-black text-white mb-2 tracking-wide uppercase">Match & Drop</h3>
                        <p class="text-xs text-slate-400 mb-6 leading-relaxed">Pasangkan balok soal ke kotak jawaban yang tepat. Cocok untuk kosakata dan definisi.</p>
                    </div>
                    <button onclick="bukaLobiDragDrop('match')" class="w-full bg-slate-800 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-slate-600 hover:border-emerald-400 font-bold py-3.5 px-6 rounded-xl transition-all uppercase text-xs tracking-wider shadow-md flex items-center justify-center">
                        <i class="fa-solid fa-play mr-2"></i> Mainkan Sekarang
                    </button>
                </div>

                <!-- GAME 2: SORT & DROP -->
                <div class="bg-slate-900 border border-slate-700 p-6 rounded-[2rem] text-center shadow-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:border-amber-500/50 group flex flex-col justify-between h-full">
                    <div>
                        <div class="w-16 h-16 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors">
                            <i class="fa-solid fa-layer-group text-3xl text-amber-500 group-hover:text-slate-900 transition-colors"></i>
                        </div>
                        <h3 class="text-lg font-black text-white mb-2 tracking-wide uppercase">Sort & Drop</h3>
                        <p class="text-xs text-slate-400 mb-6 leading-relaxed">Kelompokkan berbagai item ke dalam kategori yang sesuai. Cocok untuk klasifikasi.</p>
                    </div>
                    <button onclick="bukaLobiDragDrop('sort')" class="w-full bg-slate-800 hover:bg-amber-500 text-amber-400 hover:text-slate-900 border border-slate-600 hover:border-amber-400 font-bold py-3.5 px-6 rounded-xl transition-all uppercase text-xs tracking-wider shadow-md flex items-center justify-center">
                        <i class="fa-solid fa-play mr-2"></i> Mainkan Sekarang
                    </button>
                </div>

                <!-- GAME 3: BUILD & DROP -->
                <div class="bg-slate-900 border border-slate-700 p-6 rounded-[2rem] text-center shadow-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-violet-500/50 group flex flex-col justify-between h-full">
                    <div>
                        <div class="w-16 h-16 mx-auto bg-violet-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-violet-500 transition-colors">
                            <i class="fa-solid fa-cubes text-3xl text-violet-500 group-hover:text-white transition-colors"></i>
                        </div>
                        <h3 class="text-lg font-black text-white mb-2 tracking-wide uppercase">Build & Drop</h3>
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
    
    let namaGame = jenisGame === 'match' ? 'MATCH & DROP' : (jenisGame === 'sort' ? 'SORT & DROP' : 'BUILD & DROP');
    let warnaTema = jenisGame === 'match' ? 'emerald' : (jenisGame === 'sort' ? 'amber' : 'violet');
    let kelasOpts = AppState.db.kelas.map(k => `<option value="${k.id}">${k.kode}</option>`).join('');

    container.innerHTML = `
        <div class="max-w-2xl mx-auto p-4 select-none fade-in pb-12">
            <div class="bg-slate-900 border border-slate-700 p-4 rounded-2xl flex justify-between items-center shadow-lg mb-6">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black">
                        <i class="fa-solid fa-gamepad text-lg"></i>
                    </div>
                    <div>
                        <h2 class="text-sm font-black text-white">DRAG & DROP ARENA</h2>
                        <p class="text-xs text-${warnaTema}-400 font-bold">Persiapan: ${namaGame}</p>
                    </div>
                </div>
                <button onclick="switchTab('dragdrop')" class="bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors">
                    <i class="fa-solid fa-arrow-right-from-bracket mr-1.5"></i> Keluar
                </button>
            </div>

            <div class="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-700 shadow-2xl relative overflow-hidden">
                <div class="text-center mb-6">
                    <i class="fa-solid fa-user-graduate text-5xl text-amber-400 mb-3 animate-bounce"></i>
                    <h3 class="text-2xl font-black text-white">Identitas Pemain</h3>
                    <p class="text-xs text-slate-400 mt-1">Pilih kelas dan siswa untuk memulai permainan</p>
                </div>

                <div class="space-y-4 text-left">
                    <div>
                        <label class="text-xs font-bold text-slate-300 ml-1 mb-1.5 block">1. Pilih Kelas</label>
                        <select id="lobby-dnd-kelas" onchange="updateLobbySiswaDnd()" class="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-2xl px-4 py-3.5 outline-none focus:border-${warnaTema}-500">
                            <option value="">-- Pilih Kelas --</option>
                            ${kelasOpts}
                        </select>
                    </div>
                    
                    <div>
                        <label class="text-xs font-bold text-slate-300 ml-1 mb-1.5 block">2. Nama Siswa</label>
                        <div class="flex gap-2">
                            <select id="lobby-dnd-siswa" class="flex-1 bg-slate-950 border border-slate-800 text-white text-sm rounded-2xl px-4 py-3.5 outline-none focus:border-${warnaTema}-500">
                                <option value="">-- Pilih Kelas Terlebih Dahulu --</option>
                            </select>
                            <button onclick="undiPemainDndSpin()" class="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-5 rounded-2xl shadow-md text-xs flex items-center gap-1.5">
                                <i class="fa-solid fa-dice text-base"></i> Undi
                            </button>
                        </div>
                        <input type="text" id="lobby-dnd-manual" placeholder="Atau ketik nama manual..." class="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-2xl px-4 py-3.5 mt-2.5 outline-none focus:border-${warnaTema}-500">
                    </div>
                </div>

                <div class="mt-8">
                    <button onclick="masukKeArenaGameDnd()" class="w-full bg-${warnaTema}-600 hover:bg-${warnaTema}-500 text-white font-black text-sm py-4 rounded-2xl shadow-xl transition-all uppercase tracking-wider">
                        MULAI MENGERJAKAN SOAL
                    </button>
                    <button onclick="switchTab('dragdrop')" class="w-full text-center mt-3 text-slate-400 hover:text-white text-xs font-bold">
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
    if (!kelasId) {
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
    const listSiswa = AppState.db.siswa.filter(s => s.kelasId === kelasId);
    if (listSiswa.length === 0) return showAlert('Peringatan', 'Belum ada siswa!');
    
    let pemenang = listSiswa[Math.floor(Math.random() * listSiswa.length)];
    document.getElementById('lobby-dnd-siswa').value = pemenang.id;
    if (typeof eksekusiUndianMewah === 'function') {
        eksekusiUndianMewah('single', pemenang.nama, null, listSiswa.map(s => s.nama));
    }
}

function masukKeArenaGameDnd() {
    const kelasId = document.getElementById('lobby-dnd-kelas').value;
    const siswaId = document.getElementById('lobby-dnd-siswa').value;
    const manualName = document.getElementById('lobby-dnd-manual').value.trim();

    if (!manualName && (!kelasId || !siswaId)) {
        return showAlert("Peringatan", "Harap Pilih Kelas dan Siswa ATAU Ketik nama manual!", "error");
    }

    if (gameDndTerpilih === 'match' && typeof mulaiGameMatch === 'function') mulaiGameMatch();
    else if (gameDndTerpilih === 'sort' && typeof mulaiGameSort === 'function') mulaiGameSort();
    else if (gameDndTerpilih === 'build' && typeof mulaiGameBuild === 'function') mulaiGameBuild();
}
