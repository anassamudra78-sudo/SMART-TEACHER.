// ==========================================================
// FILE: ui-dragdrop.js 
// FUNGSI: Mengelola Lobi dan Antarmuka Drag & Drop Arena (Plek Kuis)
// ==========================================================

function renderDragDropPage(container) {
    let kelasOpts = AppState.db.kelas.map(k => `<option value="${k.id}">${k.kode}</option>`).join('');   
    let mapelOpts = AppState.db.mapel.map(m => `<option value="${m.id}">${m.nama}</option>`).join('');

    container.innerHTML = `
        <div class="max-w-5xl mx-auto space-y-6">
            <div class="relative bg-slate-900 rounded-[2.5rem] border border-indigo-500/20 shadow-2xl overflow-hidden p-8 lg:p-12 text-center mb-6">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl bg-gradient-to-b from-indigo-500/10 to-transparent blur-3xl pointer-events-none"></div>
                <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
                
                <div class="relative z-10">
                    <span class="inline-block py-1.5 px-4 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-black tracking-widest uppercase mb-4 shadow-inner">DRAG & DROP ARENA</span>
                    
                    <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-slate-400 mb-4 drop-shadow-lg">Pilih Mode Permainan</h2>
                    
                    <p class="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                        Pilih jenis permainan Match, Sort, atau Build untuk melatih pemahaman siswa dengan sistem seret dan letakkan (Drag & Drop).
                    </p>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        <!-- KOTAK 1: MATCH -->
                        <div class="bg-slate-950/80 border border-emerald-500/30 p-6 rounded-3xl flex flex-col justify-between text-left shadow-xl hover:border-emerald-500 transition-all group">
                            <div>
                                <div class="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center text-xl font-black mb-4 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                                    <i class="fa-solid fa-puzzle-piece"></i>
                                </div>
                                <h3 class="text-lg font-black text-white mb-1">Match & Drop</h3>
                                <p class="text-xs text-slate-400 mb-6">Pasangkan balok soal ke kotak jawaban yang tepat.</p>
                            </div>
                            <button onclick="bukaLobiDragDropModal('match')" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md">
                                <i class="fa-solid fa-play mr-2"></i> Pilih Match
                            </button>
                        </div>

                        <!-- KOTAK 2: SORT -->
                        <div class="bg-slate-950/80 border border-amber-500/30 p-6 rounded-3xl flex flex-col justify-between text-left shadow-xl hover:border-amber-500 transition-all group">
                            <div>
                                <div class="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center text-xl font-black mb-4 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                                    <i class="fa-solid fa-layer-group"></i>
                                </div>
                                <h3 class="text-lg font-black text-white mb-1">Sort & Drop</h3>
                                <p class="text-xs text-slate-400 mb-6">Kelompokkan berbagai item ke dalam kategori yang sesuai.</p>
                            </div>
                            <button onclick="bukaLobiDragDropModal('sort')" class="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md">
                                <i class="fa-solid fa-play mr-2"></i> Pilih Sort
                            </button>
                        </div>

                        <!-- KOTAK 3: BUILD -->
                        <div class="bg-slate-950/80 border border-violet-500/30 p-6 rounded-3xl flex flex-col justify-between text-left shadow-xl hover:border-violet-500 transition-all group">
                            <div>
                                <div class="w-12 h-12 bg-violet-500/20 text-violet-400 rounded-2xl flex items-center justify-center text-xl font-black mb-4 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                                    <i class="fa-solid fa-cubes"></i>
                                </div>
                                <h3 class="text-lg font-black text-white mb-1">Build & Drop</h3>
                                <p class="text-xs text-slate-400 mb-6">Susun potongan kata menjadi satu kalimat atau struktur utuh.</p>
                            </div>
                            <button onclick="bukaLobiDragDropModal('build')" class="w-full bg-violet-600 hover:bg-violet-500 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md">
                                <i class="fa-solid fa-play mr-2"></i> Pilih Build
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

let jenisGameDndAktif = 'match';

function bukaLobiDragDropModal(jenis) {
    jenisGameDndAktif = jenis;
    let namaLabel = jenis === 'match' ? 'Match & Drop' : (jenis === 'sort' ? 'Sort & Drop' : 'Build & Drop');
    
    let kelasOpts = AppState.db.kelas.map(k => `<option value="${k.id}">${k.kode}</option>`).join('');
    let mapelOpts = AppState.db.mapel.map(m => `<option value="${m.id}">${m.nama}</option>`).join('');

    // Sembunyikan sidebar utama agar benar-benar full layar seperti kuis
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('mobile-menu-btn');
    if (sidebar && menuBtn) {
        sidebar.classList.remove('md:flex');
        menuBtn.classList.remove('md:hidden');
    }

    const container = document.getElementById('main-content');
    container.innerHTML = `
        <div class="max-w-2xl mx-auto bg-slate-900/95 p-8 rounded-[2rem] border-2 border-orange-500/30 shadow-2xl text-center fade-in relative z-20">
            <div class="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                <div class="flex items-center space-x-3 text-left">
                    <div class="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black shadow-md">
                        <i class="fa-solid fa-gamepad text-lg"></i>
                    </div>
                    <div>
                        <h3 class="text-sm font-black text-white leading-tight">DRAG & DROP ARENA</h3>
                        <p class="text-xs text-orange-400 font-bold">Mode: ${namaLabel}</p>
                    </div>
                </div>
                <button onclick="switchTab('dragdrop')" class="bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-colors">
                    <i class="fa-solid fa-circle-xmark mr-1"></i> Keluar
                </button>
            </div>

            <i class="fa-solid fa-user-graduate text-5xl text-amber-400 mb-4 animate-bounce"></i>
            <h3 class="text-2xl font-black text-white mb-1">Identitas Pemain</h3>
            <p class="text-xs text-slate-400 mb-5">Pilih kelas dan siswa untuk memulai permainan ${namaLabel}!</p>
            
            <div class="space-y-4 text-left">
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
                    <select id="lobby-dnd-kelas" onchange="updateLobbySiswaDnd()" class="w-full p-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-amber-500 text-xs">
                        <option value="">-- Pilih Kelas --</option>
                        ${kelasOpts}
                    </select>
                </div>
                <div>
                    <label class="text-xs font-bold text-slate-300 block mb-1">2. Mata Pelajaran</label>
                    <select id="lobby-dnd-mapel" class="w-full p-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-amber-500 text-xs">
                        <option value="">-- Pilih Mapel --</option>
                        ${mapelOpts}
                    </select>
                </div>
                <div>
                    <label class="text-xs font-bold text-slate-300 block mb-1">3. Nama Siswa</label>
                    <div class="flex space-x-2 mb-2">
                        <select id="lobby-dnd-siswa" class="flex-1 p-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-amber-500 text-xs">
                            <option value="">-- Pilih Kelas Terlebih Dahulu --</option>
                        </select>
                        <button type="button" onclick="undiPemainDndSpin()" class="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-900 font-black px-3.5 rounded-xl shadow-lg transition-all flex items-center shrink-0 text-xs">
                            <i class="fa-solid fa-dice text-base mr-1"></i> Undi
                        </button>
                    </div>
                    <input type="text" id="lobby-dnd-manual" placeholder="Atau ketik nama manual..." class="w-full p-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none focus:border-amber-500 text-xs">
                </div>
            </div>

            <button onclick="mulaiPermainanDragDropFix()" class="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black py-3.5 rounded-xl shadow-lg transition-all text-base uppercase tracking-wider">
                MULAI MENGERJAKAN SOAL
            </button>
            <button onclick="switchTab('dragdrop')" class="w-full mt-2.5 text-slate-400 font-bold hover:text-white py-1.5 text-xs transition-colors">
                Batal / Kembali
            </button>
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
    const listSiswa = AppState.db.siswa.filter(s => s.kelasId === klsId);
    if (listSiswa.length === 0) return showAlert('Peringatan', 'Belum ada siswa!');
    
    let pemenang = listSiswa[Math.floor(Math.random() * listSiswa.length)];
    document.getElementById('lobby-dnd-siswa').value = pemenang.id;
    if (typeof eksekusiUndianMewah === 'function') {
        eksekusiUndianMewah('single', pemenang.nama, null, listSiswa.map(s => s.nama));
    }
}

function mulaiPermainanDragDropFix() {
    const kelasId = document.getElementById('lobby-dnd-kelas').value;
    const mapelId = document.getElementById('lobby-dnd-mapel').value;
    const siswaId = document.getElementById('lobby-dnd-siswa').value;
    const manualName = document.getElementById('lobby-dnd-manual').value.trim();

    if (!manualName && (!kelasId || !mapelId || !siswaId)) {
        return showAlert("Peringatan", "Harap Pilih Kelas, Mapel, dan Siswa ATAU Ketik nama manual!", "error");
    }

    // Masuk ke mesin game masing-masing
    if (jenisGameDndAktif === 'match' && typeof mulaiGameMatch === 'function') mulaiGameMatch();
    else if (jenisGameDndAktif === 'sort' && typeof mulaiGameSort === 'function') mulaiGameSort();
    else if (jenisGameDndAktif === 'build' && typeof mulaiGameBuild === 'function') mulaiGameBuild();
}
