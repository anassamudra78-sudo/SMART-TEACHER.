// ==========================================================
// FILE: engine-match.js 
// FUNGSI: Mesin Game "Match & Drop" (PERFECT DRAG & OVERLAY FIX)
// ==========================================================

let matchState = {
    skor: 0,
    itemTerjawab: 0,
    dataSoal: [
        { id: "1", kiri: "كِتَابٌ", kanan: "Buku" },
        { id: "2", kiri: "مَدْرَسَةٌ", kanan: "Sekolah" },
        { id: "3", kiri: "قَلَمٌ", kanan: "Pena" },
        { id: "4", kiri: "مَسْجِدٌ", kanan: "Masjid" },
        { id: "5", kiri: "كُرْسِيٌّ", kanan: "Kursi" },
        { id: "6", kiri: "مَكْتَبٌ", kanan: "Meja" },
        { id: "7", kiri: "أُسْتَاذٌ", kanan: "Guru" },
        { id: "8", kiri: "تِلْمِيْذٌ", kanan: "Siswa" }
    ],
    soalAcak: [],
    jawabanAcak: []
};

// ==========================================================
// KECERDASAN SKALA (AUTO-SCALING) BERDASARKAN JUMLAH SOAL
// ==========================================================
function hitungSkalaOtomatis(jumlahSoal) {
    if (jumlahSoal <= 8) {
        return {
            gridKolom: 'grid-cols-2 lg:grid-cols-2',
            tinggiBalok: 'h-[70px] md:h-[80px]',
            teksArab: 'text-2xl md:text-3xl',
            teksIndo: 'text-sm md:text-base',
            gap: 'gap-3 md:gap-4',
            padding: 'p-3 md:p-4'
        };
    } else if (jumlahSoal <= 16) {
        return {
            gridKolom: 'grid-cols-3 lg:grid-cols-3',
            tinggiBalok: 'h-[55px] md:h-[65px]',
            teksArab: 'text-xl md:text-2xl',
            teksIndo: 'text-xs md:text-sm',
            gap: 'gap-2 md:gap-3',
            padding: 'p-2 md:p-3'
        };
    } else {
        return {
            gridKolom: 'grid-cols-4 lg:grid-cols-4',
            tinggiBalok: 'h-[45px] md:h-[50px]',
            teksArab: 'text-lg md:text-xl',
            teksIndo: 'text-[10px] md:text-xs',
            gap: 'gap-1.5 md:gap-2',
            padding: 'p-1.5 md:p-2'
        };
    }
}

function bukaSetupGame(jenisGame) {
    if (jenisGame === 'match') {
        mulaiGameMatch();
    } else if (jenisGame === 'sort') {
        if (typeof mulaiGameSort === 'function') mulaiGameSort();
    } else if (jenisGame === 'build') {
        if (typeof mulaiGameBuild === 'function') mulaiGameBuild();
    }
}

function mulaiGameMatch() {
    const container = document.getElementById('main-content');
    matchState.skor = 0;
    matchState.itemTerjawab = 0;

    matchState.soalAcak = [...matchState.dataSoal].sort(() => Math.random() - 0.5);
    matchState.jawabanAcak = [...matchState.dataSoal].sort(() => Math.random() - 0.5);

    let skala = hitungSkalaOtomatis(matchState.dataSoal.length);

    container.innerHTML = `
        <div class="max-w-7xl mx-auto px-2 md:px-4 py-3 flex flex-col fade-in relative select-none" style="height: calc(100vh - 80px); min-height: 500px;">
            
            <div class="absolute top-1/4 left-1/4 w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
            
            <!-- HEADER KOMPAK -->
            <div class="flex-none bg-slate-900 border border-slate-700/80 shadow-md rounded-xl px-4 py-2.5 flex justify-between items-center mb-3 shrink-0 relative z-10">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30 shrink-0">
                        <i class="fa-solid fa-puzzle-piece text-white text-sm"></i>
                    </div>
                    <h2 class="text-sm md:text-base font-black text-white tracking-wide leading-none hidden sm:block">MATCH & DROP</h2>
                </div>

                <div class="flex items-center gap-2 md:gap-4 shrink-0">
                    <div class="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 flex items-center">
                        <span class="text-[9px] md:text-[10px] font-bold text-slate-400 mr-2 uppercase hidden sm:block">Skor</span>
                        <span id="skor-match" class="text-sm md:text-base font-black text-amber-400 leading-none">0</span>
                    </div>
                    <button onclick="bukaDragAndDropArena()" class="bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white w-8 h-8 md:w-9 md:h-9 rounded-lg transition-all border border-slate-700 flex items-center justify-center">
                        <i class="fa-solid fa-xmark text-xs md:text-sm"></i>
                    </button>
                </div>
            </div>

            <!-- ARENA UTAMA (Locked Grid) -->
            <div class="flex-1 flex flex-row bg-slate-900/60 backdrop-blur-md border border-slate-700/60 rounded-2xl shadow-xl overflow-hidden relative z-10 min-h-0">

                <!-- KIRI: KOTAK SOAL (Draggable) -->
                <div class="w-5/12 h-full border-r border-slate-700/50 flex flex-col min-h-0">
                    <div class="flex-none bg-slate-800/40 p-2.5 border-b border-slate-700/50 flex justify-between items-center px-4">
                        <h3 class="font-black text-slate-400 uppercase tracking-[0.2em] text-[10px]">Pilih & Seret Balok</h3>
                    </div>
                    
                    <!-- Internal scroll jika soal terlalu banyak -->
                    <div class="flex-1 overflow-y-auto p-3 sm:p-4">
                        <div class="grid ${skala.gridKolom} ${skala.gap}" id="wadah-balok-match">
                            ${matchState.soalAcak.map(item => `
                                <div class="balok-soal-match touch-none bg-indigo-600 border border-indigo-400 text-white rounded-xl ${skala.padding} flex flex-col items-center justify-center cursor-grab transition-all shadow-md relative group ${skala.tinggiBalok} w-full" data-id="${item.id}" data-terkunci="false">
                                    <span class="font-arabic ${skala.teksArab} drop-shadow-sm pointer-events-none">${item.kiri}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- KANAN: WADAH JAWABAN (Dropzone) -->
                <div class="w-7/12 h-full flex flex-col min-h-0">
                    <div class="flex-none bg-slate-800/40 p-2.5 border-b border-slate-700/50 flex justify-between items-center px-4">
                        <h3 class="font-black text-slate-400 uppercase tracking-[0.2em] text-[10px]">Pasangkan ke Sini</h3>
                    </div>
                    
                    <div class="flex-1 overflow-y-auto p-3 sm:p-4">
                        <div class="grid ${skala.gridKolom} ${skala.gap}">
                            ${matchState.jawabanAcak.map(item => `
                                <div class="wadah-jawaban-match bg-slate-950/50 border-2 border-dashed border-slate-600 rounded-xl flex items-center p-1 md:p-1.5 transition-colors relative overflow-hidden ${skala.tinggiBalok} w-full" data-target="${item.id}">
                                    <!-- Area kosong tempat balok masuk -->
                                    <div class="area-drop w-1/2 h-full border border-dashed border-slate-700 rounded-lg flex items-center justify-center relative shrink-0">
                                        <i class="fa-solid fa-plus text-slate-700 text-[10px] md:text-xs"></i>
                                    </div>
                                    <!-- Teks Jawaban di Sebelah Kanan -->
                                    <div class="flex-1 text-center px-1 md:px-2 overflow-hidden">
                                        <span class="font-bold text-slate-300 ${skala.teksIndo} truncate block">${item.kanan}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;
    pasangSensorMatch();
}

function pasangSensorMatch() {
    const baloks = document.querySelectorAll('.balok-soal-match');
    const wadahAsal = document.getElementById('wadah-balok-match');
    
    baloks.forEach(balok => {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;
        let initialClass = balok.className; 
        
        balok.addEventListener('pointerdown', function(e) {
            if (balok.getAttribute('data-terkunci') === 'true') return;
            
            isDragging = true;
            balok.setPointerCapture(e.pointerId);
            
            let rect = balok.getBoundingClientRect();
            balok.style.width = rect.width + 'px';
            balok.style.height = rect.height + 'px';
            
            // MAGIS JARI: Titik berat selalu di tengah jari Bapak
            offsetX = rect.width / 2;
            offsetY = rect.height / 2;
            
            // MAGIS Z-INDEX: Lempar ke layer teratas agar tidak tenggelam tertutup kotak lain
            document.body.appendChild(balok);

            balok.style.position = 'fixed';
            balok.style.left = (e.clientX - offsetX) + 'px';
            balok.style.top = (e.clientY - offsetY) + 'px';
            balok.style.zIndex = '999999';
            
            balok.classList.add('scale-105', 'shadow-[0_20px_50px_rgba(0,0,0,0.6)]', 'ring-2', 'ring-white/50');
            balok.style.opacity = '0.9';
        });

        balok.addEventListener('pointermove', function(e) {
            if (!isDragging) return;
            e.preventDefault(); 
            
            balok.style.left = (e.clientX - offsetX) + 'px';
            balok.style.top = (e.clientY - offsetY) + 'px';
        });

        balok.addEventListener('pointerup', function(e) {
            if (!isDragging) return;
            isDragging = false;
            balok.releasePointerCapture(e.pointerId);
            
            balok.classList.remove('scale-105', 'shadow-[0_20px_50px_rgba(0,0,0,0.6)]', 'ring-2', 'ring-white/50');
            balok.style.opacity = '1';
            
            balok.style.display = 'none';
            let elemenDiBawah = document.elementFromPoint(e.clientX, e.clientY);
            balok.style.display = 'flex';

            let wadahTarget = elemenDiBawah ? elemenDiBawah.closest('.wadah-jawaban-match') : null;

            if (wadahTarget && wadahTarget.querySelector('.area-drop').children.length === 1) { // cek jika wadah masih kosong (hanya ada icon plus)
                if (balok.getAttribute('data-id') === wadahTarget.getAttribute('data-target')) {
                    // BENAR: Masuk & Mengunci
                    balok.setAttribute('data-terkunci', 'true');
                    
                    // Bersihkan styling inline sebelum menanamkan ke target
                    kembalikanStyling(balok);
                    
                    // Ubah wujud balok agar pas masuk ke area kiri wadah jawaban
                    balok.className = 'w-full h-full bg-emerald-600 border border-emerald-400 text-white rounded-md flex items-center justify-center shadow-inner pointer-events-none transition-colors';
                    
                    let areaDrop = wadahTarget.querySelector('.area-drop');
                    areaDrop.innerHTML = ''; 
                    areaDrop.appendChild(balok);
                    
                    // Efek Kotak Menyala Hijau
                    wadahTarget.classList.remove('border-dashed', 'border-slate-600', 'bg-slate-950/50');
                    wadahTarget.classList.add('border-solid', 'border-emerald-500', 'bg-emerald-950/40');
                    
                    let nilaiPerSoal = 100 / matchState.dataSoal.length;
                    matchState.skor += nilaiPerSoal;
                    matchState.itemTerjawab++;
                    
                    document.getElementById('skor-match').innerText = Math.round(matchState.skor);
                    if (typeof playSoundEffect === 'function') playSoundEffect('correct');

                    if (matchState.itemTerjawab === matchState.dataSoal.length) {
                        setTimeout(() => selebrasiKemenanganMatch(), 500);
                    }
                } else {
                    // SALAH: Kembalikan
                    kembalikanKeAsal(balok, wadahAsal, wadahTarget, initialClass);
                }
            } else {
                kembalikanKeAsal(balok, wadahAsal, null, initialClass);
            }
        });
    });

    function kembalikanStyling(balok) {
        balok.style.position = '';
        balok.style.left = '';
        balok.style.top = '';
        balok.style.width = '';
        balok.style.height = ''; 
        balok.style.zIndex = '';
    }

    function kembalikanKeAsal(balok, wadahAsal, wadahTarget, initialClass) {
        kembalikanStyling(balok);
        balok.className = initialClass; // Kembalikan ke class asli (biru)
        wadahAsal.appendChild(balok);
        
        if (typeof playSoundEffect === 'function') playSoundEffect('wrong');
        
        if (wadahTarget) {
            wadahTarget.classList.remove('border-slate-600');
            wadahTarget.classList.add('border-rose-500', 'bg-rose-950/30');
            setTimeout(() => {
                wadahTarget.classList.add('border-slate-600');
                wadahTarget.classList.remove('border-rose-500', 'bg-rose-950/30');
            }, 300);
        }
    }
}

function selebrasiKemenanganMatch() {
    let nilaiAkhir = Math.round(matchState.skor);
    if (typeof playCelebrationAudio === 'function') playCelebrationAudio(nilaiAkhir);
    
    const container = document.getElementById('main-content');
    container.innerHTML = `
        <div class="flex items-center justify-center fade-in px-4" style="height: calc(100vh - 80px);">
            <div class="bg-slate-900 border border-slate-700 shadow-2xl rounded-3xl p-8 text-center max-w-sm w-full relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"></div>
                <i class="fa-solid fa-medal text-6xl text-amber-400 mb-4 animate-bounce drop-shadow-md"></i>
                <h1 class="text-2xl md:text-3xl font-black text-white mb-2 relative z-10">SELESAI!</h1>
                
                <div class="bg-slate-800 p-5 rounded-2xl mb-6 mt-4 shadow-inner relative z-10 border border-slate-700">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nilai Akhir</p>
                    <p class="text-6xl font-black text-emerald-400 drop-shadow-sm">${nilaiAkhir}</p>
                </div>
                
                <div class="flex justify-center gap-3 relative z-10">
                    <button onclick="bukaDragAndDropArena()" class="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-5 rounded-xl border border-slate-600 transition-colors shadow-sm text-xs uppercase tracking-wider">Menu</button>
                    <button onclick="bukaSetupGame('match')" class="bg-blue-600 hover:bg-blue-500 text-white font-black py-3 px-6 rounded-xl shadow-md transition-transform text-xs uppercase tracking-wider">Main Lagi</button>
                </div>
            </div>
        </div>
    `;
}
