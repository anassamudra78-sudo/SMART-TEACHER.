// ==========================================================
// FILE: engine-match.js 
// FUNGSI: Mesin Game "Match & Drop" (TAMPILAN ASLI + Z-INDEX CSS FIX)
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

    container.innerHTML = `
        <div class="max-w-6xl mx-auto px-4 pt-4 pb-12 select-none fade-in">
            <!-- HEADER -->
            <div class="flex justify-between items-center bg-slate-900 p-4 rounded-2xl shadow-md mb-6 border border-slate-700/80 relative z-10">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-blue-500/20 border border-blue-500/50 rounded-xl flex items-center justify-center">
                        <i class="fa-solid fa-puzzle-piece text-blue-400 text-lg"></i>
                    </div>
                    <div>
                        <h2 class="text-lg font-black text-white leading-tight tracking-wide">MATCH & DROP</h2>
                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Pasangkan Kosakata</p>
                    </div>
                </div>
                
                <div class="flex items-center gap-4">
                    <div class="font-bold text-amber-400 bg-slate-800/80 px-5 py-2 rounded-xl border border-slate-700 shadow-inner">
                        Nilai: <span id="skor-match" class="font-black text-white ml-2 text-lg">0</span>
                    </div>
                    <button onclick="bukaDragAndDropArena()" class="bg-slate-800 hover:bg-rose-600 hover:border-rose-500 text-slate-300 hover:text-white px-5 py-2 rounded-xl font-bold transition-all border border-slate-700 shadow-sm text-sm hidden md:block">
                        Keluar
                    </button>
                    <button onclick="bukaDragAndDropArena()" class="bg-slate-800 hover:bg-rose-600 text-slate-300 w-10 h-10 rounded-xl md:hidden flex items-center justify-center border border-slate-700">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>

            <!-- LAYOUT UTAMA (KIRI & KANAN) -->
            <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch relative">
                
                <!-- KOLOM KIRI: BALOK SOAL (Ditambah z-50 agar otomatis di atas kolom kanan) -->
                <div class="w-full lg:w-5/12 relative z-50">
                    <div class="bg-slate-900/60 backdrop-blur-sm p-5 rounded-[2rem] border border-slate-700/50 shadow-lg h-full">
                        <h3 class="text-center font-black text-slate-400 mb-5 uppercase tracking-[0.2em] text-[10px] border-b border-slate-700/50 pb-3">Pilih & Seret Balok</h3>
                        
                        <div class="grid grid-cols-2 gap-3" id="wadah-balok-match">
                            ${matchState.soalAcak.map(item => `
                                <div class="balok-soal-match touch-none bg-blue-600 hover:bg-blue-500 border-2 border-blue-400 rounded-2xl p-4 flex flex-col items-center justify-center cursor-grab transition-transform shadow-md relative h-24" data-id="${item.id}" data-terkunci="false">
                                    <span class="font-arabic text-3xl text-white pointer-events-none drop-shadow-md">${item.kiri}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- KOLOM KANAN: WADAH JAWABAN (z-10, lebih rendah dari kiri) -->
                <div class="w-full lg:w-7/12 relative z-10">
                    <div class="bg-slate-900/40 p-5 rounded-[2rem] border border-slate-700/30 h-full">
                        <h3 class="text-center font-black text-slate-400 mb-5 uppercase tracking-[0.2em] text-[10px] border-b border-slate-700/50 pb-3">Pasangkan ke Sini</h3>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${matchState.jawabanAcak.map(item => `
                                <div class="wadah-jawaban-match bg-slate-800/80 border-2 border-dashed border-slate-600 rounded-2xl flex items-center p-2 transition-colors relative h-20" data-target="${item.id}">
                                    <div class="area-drop w-1/2 h-full border border-dashed border-slate-600 rounded-xl flex items-center justify-center bg-slate-900/50 shrink-0">
                                        <i class="fa-solid fa-plus text-slate-500 text-sm"></i>
                                    </div>
                                    <div class="flex-1 text-center px-3">
                                        <span class="font-bold text-slate-300 text-sm md:text-base">${item.kanan}</span>
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
            
            // POSISI PERSIS DI TENGAH JARI BAPAK
            offsetX = rect.width / 2;
            offsetY = rect.height / 2;

            balok.style.position = 'fixed';
            balok.style.left = (e.clientX - offsetX) + 'px';
            balok.style.top = (e.clientY - offsetY) + 'px';
            balok.style.zIndex = '999999';
            
            balok.classList.add('scale-105', 'shadow-2xl', 'ring-4', 'ring-blue-400/50');
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
            
            balok.classList.remove('scale-105', 'shadow-2xl', 'ring-4', 'ring-blue-400/50');
            balok.style.opacity = '1';
            
            balok.style.display = 'none';
            let elemenDiBawah = document.elementFromPoint(e.clientX, e.clientY);
            balok.style.display = 'flex';

            let wadahTarget = elemenDiBawah ? elemenDiBawah.closest('.wadah-jawaban-match') : null;

            if (wadahTarget && wadahTarget.querySelector('.area-drop').children.length === 1) { 
                if (balok.getAttribute('data-id') === wadahTarget.getAttribute('data-target')) {
                    balok.setAttribute('data-terkunci', 'true');
                    balok.style.position = 'static';
                    
                    balok.className = 'w-full h-full bg-emerald-600 border border-emerald-400 text-white rounded-lg flex items-center justify-center shadow-inner transition-colors pointer-events-none';
                    let spanArab = balok.querySelector('.font-arabic');
                    if (spanArab) {
                        spanArab.classList.remove('text-3xl');
                        spanArab.classList.add('text-xl');
                    }
                    
                    let areaDrop = wadahTarget.querySelector('.area-drop');
                    areaDrop.innerHTML = '';
                    areaDrop.appendChild(balok);
                    
                    wadahTarget.classList.remove('border-dashed', 'border-slate-600', 'bg-slate-800/80');
                    wadahTarget.classList.add('border-solid', 'border-emerald-500', 'bg-emerald-900/30');
                    
                    let nilaiPerSoal = 100 / matchState.dataSoal.length;
                    matchState.skor += nilaiPerSoal;
                    matchState.itemTerjawab++;
                    
                    document.getElementById('skor-match').innerText = Math.round(matchState.skor);
                    if (typeof playSoundEffect === 'function') playSoundEffect('correct');

                    if (matchState.itemTerjawab === matchState.dataSoal.length) {
                        setTimeout(() => selebrasiKemenanganMatch(), 500);
                    }
                } else {
                    balok.style.position = 'static';
                    wadahAsal.appendChild(balok);
                    if (typeof playSoundEffect === 'function') playSoundEffect('wrong');
                    
                    wadahTarget.classList.add('border-rose-500', 'bg-rose-900/30');
                    setTimeout(() => {
                        wadahTarget.classList.remove('border-rose-500', 'bg-rose-900/30');
                    }, 300);
                }
            } else {
                balok.style.position = 'static';
                wadahAsal.appendChild(balok);
            }
        });
    });
}

function selebrasiKemenanganMatch() {
    let nilaiAkhir = Math.round(matchState.skor);
    if (typeof playCelebrationAudio === 'function') playCelebrationAudio(nilaiAkhir);
    
    const container = document.getElementById('main-content');
    container.innerHTML = `
        <div class="max-w-2xl mx-auto mt-10 p-8 bg-slate-900 rounded-[2.5rem] text-center border border-slate-700 shadow-[0_0_40px_rgba(59,130,246,0.2)] fade-in">
            <i class="fa-solid fa-medal text-6xl text-amber-400 mb-6 animate-bounce drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"></i>
            <h1 class="text-4xl font-black text-white mb-2 tracking-tight">MATCHING SELESAI!</h1>
            
            <div class="bg-slate-800 p-6 rounded-3xl mb-8 mt-6 border border-slate-700">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nilai Akhir</p>
                <p class="text-7xl font-black text-emerald-400 drop-shadow-md">${nilaiAkhir}</p>
            </div>
            
            <div class="flex justify-center gap-4">
                <button onclick="bukaDragAndDropArena()" class="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 px-6 rounded-2xl border border-slate-600 transition-colors shadow-sm text-sm uppercase tracking-widest">Menu Utama</button>
                <button onclick="bukaSetupGame('match')" class="bg-blue-500 hover:bg-blue-400 text-white font-black py-3.5 px-8 rounded-2xl shadow-[0_4px_15px_rgba(59,130,246,0.4)] transition-transform text-sm uppercase tracking-widest">MAIN LAGI</button>
            </div>
        </div>
    `;
}
