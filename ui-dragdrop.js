// ==========================================================
// FILE: ui-dragdrop.js 
// FUNGSI: Mengelola Lobi dan Antarmuka Drag & Drop Arena
// ==========================================================

function renderDragDropPage(container) {
    container.innerHTML = `
        <div class="max-w-6xl mx-auto space-y-3 fade-in pb-8">
            <!-- HERO SECTION (UKURAN ATAS DIKECILKAN SEDIKIT AGAR TIDAK KELUAR LAYAR) -->
            <div class="relative bg-slate-900 rounded-[2rem] border border-indigo-500/20 shadow-xl overflow-hidden px-6 py-4 text-center mb-3">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl bg-gradient-to-b from-indigo-500/10 to-transparent blur-3xl pointer-events-none"></div>
                
                <div class="relative z-10">
                    <span class="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-black tracking-widest uppercase mb-1 shadow-inner">SMART TEACHER GAME CENTER</span>
                    
                    <h2 class="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-slate-400 mb-1 drop-shadow-lg">Drag & Drop Arena</h2>
                    
                    <p class="text-slate-400 text-xs md:text-sm max-w-xl mx-auto">
                        "Belajar, Bermain, dan Tantang Temanmu!"
                    </p>
                </div>
            </div>

            <!-- PILIHAN 3 GAME (DESAIN ASLI YANG BAGUS) -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                <!-- MATCH & DROP -->
                <div class="bg-slate-900/90 border border-slate-800 p-5 rounded-[2rem] text-center shadow-lg transition-all hover:border-blue-500/50 flex flex-col justify-between h-full">
                    <div>
                        <div class="flex justify-between items-center mb-3">
                            <div class="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                                <i class="fa-solid fa-puzzle-piece text-lg"></i>
                            </div>
                            <span class="text-[10px] font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">SOLO & BATTLE</span>
                        </div>
                        <h3 class="text-base font-black text-white mb-2 text-left">Match & Drop</h3>
                        <p class="text-xs text-slate-400 mb-6 text-left leading-relaxed">
                            Cocokkan dua objek yang memiliki hubungan yang benar. Pasangkan kosakata, arti, atau gambar dengan akurat!
                        </p>
                    </div>
                    <button onclick="bukaLobiDragDrop('match')" class="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black py-3 px-6 rounded-2xl transition-all uppercase text-xs tracking-wider shadow-lg flex items-center justify-center">
                        <i class="fa-solid fa-play mr-2"></i> MAIN SEKARANG
                    </button>
                </div>

                <!-- SORT & DROP -->
                <div class="bg-slate-900/90 border border-slate-800 p-5 rounded-[2rem] text-center shadow-lg transition-all hover:border-emerald-500/50 flex flex-col justify-between h-full">
                    <div>
                        <div class="flex justify-between items-center mb-3">
                            <div class="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                                <i class="fa-solid fa-layer-group text-lg"></i>
                            </div>
                            <span class="text-[10px] font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">SOLO & BATTLE</span>
                        </div>
                        <h3 class="text-base font-black text-white mb-2 text-left">Sort & Drop</h3>
                        <p class="text-xs text-slate-400 mb-6 text-left leading-relaxed">
                            Kelompokkan jawaban ke kategori yang tepat. Bedakan Isim, Fi'il, dan materi lainnya dengan secepat kilat!
                        </p>
                    </div>
                    <button onclick="bukaLobiDragDrop('sort')" class="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black py-3 px-6 rounded-2xl transition-all uppercase text-xs tracking-wider shadow-lg flex items-center justify-center">
                        <i class="fa-solid fa-play mr-2"></i> MAIN SEKARANG
                    </button>
                </div>

                <!-- BUILD & DROP -->
                <div class="bg-slate-900/90 border border-slate-800 p-5 rounded-[2rem] text-center shadow-lg transition-all hover:border-purple-500/50 flex flex-col justify-between h-full">
                    <div>
                        <div class="flex justify-between items-center mb-3">
                            <div class="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
                                <i class="fa-solid fa-cubes text-lg"></i>
                            </div>
                            <span class="text-[10px] font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">SOLO & BATTLE</span>
                        </div>
                        <h3 class="text-base font-black text-white mb-2 text-left">Build & Drop</h3>
                        <p class="text-xs text-slate-400 mb-6 text-left leading-relaxed">
                            Susun potongan kata atau balok menjadi urutan kalimat (Bahasa Arab) yang utuh dan sempurna!
                        </p>
                    </div>
                    <button onclick="bukaLobiDragDrop('build')" class="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black py-3 px-6 rounded-2xl transition-all uppercase text-xs tracking-wider shadow-lg flex items-center justify-center">
                        <i class="fa-solid fa-play mr-2"></i> MAIN SEKARANG
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
    let warnaTema = jenisGame === 'match' ? 'blue' : (jenisGame === 'sort' ? 'emerald' : 'purple');
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
        if (selectSsiswa) selectSsiswa.innerHTML = '<option value="">-- Pilih Kelas Terlebih Dahulu --</option>';
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

    if (jenisGameDndAktif === 'match' && typeof mulaiGameMatch === 'function') mulaiGameMatch();
    else if (jenisGameDndAktif === 'sort' && typeof mulaiGameSort === 'function') mulaiGameSort();
    else if (jenisGameDndAktif === 'build' && typeof mulaiGameBuild === 'function') mulaiGameBuild();
}
