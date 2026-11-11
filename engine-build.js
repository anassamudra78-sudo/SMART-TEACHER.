// ==========================================================
// FILE: engine-build.js
// FUNGSI: Mesin "Build & Drop" (DENGAN TOP BAR GLOBAL & TIMER)
// ==========================================================

let buildState = {
    skor: 0,
    soalAktif: 0,
    kataTerjawab: 0,
    sisaWaktu: 0,
    timerInterval: null,
    dataSoal: [
        {
            id: "b1",
            arti: "Ahmad pergi ke sekolah",
            susunan: [
                { id: "w1", teks: "ذَهَبَ" },
                { id: "w2", teks: "أَحْمَدُ" },
                { id: "w3", teks: "إِلَى" },
                { id: "w4", teks: "الْمَدْرَسَةِ" }
            ]
        },
        {
            id: "b2",
            arti: "Siswa membaca Al-Quran di dalam Masjid",
            susunan: [
                { id: "w1", teks: "قَرَأَ" },
                { id: "w2", teks: "الطَّالِبُ" },
                { id: "w3", teks: "الْقُرْآنَ" },
                { id: "w4", teks: "فِي" },
                { id: "w5", teks: "الْمَسْجِدِ" }
            ]
        },
        {
            id: "b3",
            arti: "Buku itu ada di atas meja kayu",
            susunan: [
                { id: "w1", teks: "Buku" },
                { id: "w2", teks: "itu" },
                { id: "w3", teks: "ada" },
                { id: "w4", teks: "di" },
                { id: "w5", teks: "atas" },
                { id: "w6", teks: "meja" }
            ]
        }
    ],
    potonganAcak: []
};

function bukaSetupGame(jenisGame) {
    if (jenisGame === 'match' && typeof mulaiGameMatch === 'function') {
        mulaiGameMatch();
    } else if (jenisGame === 'sort' && typeof mulaiGameSort === 'function') {
        mulaiGameSort();
    } else if (jenisGame === 'build' && typeof mulaiGameBuild === 'function') {
        mulaiGameBuild();
    }
}

function jalankanTimerBuild() {
    // Ambil dari variabel global
    buildState.sisaWaktu = window.dndDurasiPilihan || 15;
    
    if (buildState.timerInterval) clearInterval(buildState.timerInterval);
    if (typeof updateTimerDnd === 'function') updateTimerDnd(buildState.sisaWaktu);

    buildState.timerInterval = setInterval(() => {
        buildState.sisaWaktu--;
        if (typeof updateTimerDnd === 'function') updateTimerDnd(buildState.sisaWaktu);

        if (buildState.sisaWaktu <= 5 && buildState.sisaWaktu > 0) {
             if (typeof playTick === 'function') playTick(900);
        }

        if (buildState.sisaWaktu <= 0) {
            clearInterval(buildState.timerInterval);
            if (typeof playSoundEffect === 'function') playSoundEffect('habis');
            selebrasiKemenanganBuild();
        }
    }, 1000);
}

function mulaiGameBuild(lanjutSoalBerikutnya = false) {
    const subtitleEl = document.getElementById('dnd-topbar-subtitle');
    if (subtitleEl) subtitleEl.innerText = "Sedang Bermain...";

    const container = document.getElementById('dnd-game-container');
    if (!container) return;
    
    if (!lanjutSoalBerikutnya) {
        buildState.skor = 0;
        buildState.soalAktif = 0;
        if (typeof updateSkorDnd === 'function') updateSkorDnd(0);
    }
    
    buildState.kataTerjawab = 0;
    let soalSekarang = buildState.dataSoal[buildState.soalAktif];
    
    buildState.potonganAcak = soalSekarang.susunan.map(item => ({...item, salah: 0})).sort(() => Math.random() - 0.5);

    let jumlahKata = soalSekarang.susunan.length;
    let gridKiri = jumlahKata <= 4 ? "grid-cols-2" : "grid-cols-3 md:grid-cols-4";
    let tinggiKotak = "h-14 md:h-20";

    let isArabic = soalSekarang.susunan.some(item => /[\u0600-\u06FF]/.test(item.teks));
    let arahSusunan = isArabic ? 'flex-row-reverse' : 'flex-row';
    let fontTeks = isArabic ? 'font-arabic text-2xl md:text-3xl' : 'font-black text-sm md:text-lg tracking-wide uppercase';

    container.innerHTML = `
        <div class="max-w-7xl mx-auto p-2 md:p-4 mt-2 select-none fade-in pb-20 w-full h-full">
            
            <div class="flex flex-wrap justify-between items-center bg-slate-900 p-3 md:p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] mb-4 border border-slate-700 gap-3 relative z-10">
                <h2 class="text-base md:text-xl font-black text-white flex items-center gap-2 drop-shadow-md shrink-0">
                    <i class="fa-solid fa-cubes text-violet-400"></i><span class="hidden sm:block">BUILD & DROP</span>
                </h2>
                
                <div class="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 shadow-inner">
                    <span class="text-[10px] md:text-xs text-slate-400 font-bold uppercase">Level Soal:</span>
                    <span class="text-violet-400 font-black text-sm md:text-base">${buildState.soalAktif + 1} / ${buildState.dataSoal.length}</span>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row gap-4 md:gap-6 bg-[#0f172a] p-4 md:p-6 rounded-3xl border border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.4)] relative overflow-hidden min-h-[450px]">
                
                <div class="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div class="w-full lg:w-5/12 flex flex-col z-10" id="wadah-kiri-build">
                    <div class="flex justify-between items-center border-b border-slate-700/50 pb-2 mb-4">
                        <h3 class="font-bold text-slate-400 uppercase tracking-widest text-xs">Potongan Kata</h3>
                        <span class="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700">${jumlahKata} Balok</span>
                    </div>
                    
                    <div class="grid ${gridKiri} gap-2 md:gap-3" id="grid-balok-build">
                        ${buildState.potonganAcak.map(item => `
                            <div class="kartu-soal-build bg-slate-800 border-2 border-slate-600 text-white touch-none rounded-xl flex justify-center items-center ${tinggiKotak} shadow-lg transition-transform cursor-grab relative overflow-hidden p-2" data-id="${item.id}" data-salah="0">
                                <span class="drop-shadow-md text-center leading-none pointer-events-none ${fontTeks}">${item.teks}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="hidden lg:block w-px bg-slate-700/50 mx-1 z-10"></div>

                <div class="w-full lg:w-7/12 flex flex-col z-10">
                    <h3 class="text-center font-bold text-slate-400 mb-4 uppercase tracking-widest text-xs border-b border-slate-700/50 pb-2">Susun Menjadi Kalimat</h3>
                    
                    <div class="flex flex-col h-full bg-slate-900 border-2 border-dashed border-violet-500/40 rounded-2xl relative overflow-hidden transition-all min-h-[250px]">
                        
                        <div class="bg-violet-950/40 border-b border-violet-500/30 p-3 md:p-4 text-center shrink-0 z-10">
                            <p class="text-xs md:text-sm text-slate-300 font-bold tracking-wide">"${soalSekarang.arti}"</p>
                        </div>
                        
                        <div class="flex-1 p-3 md:p-6 flex ${arahSusunan} flex-wrap justify-center gap-2 md:gap-4 relative z-10 content-center" id="area-target-kalimat">
                            ${soalSekarang.susunan.map((item, index) => `
                                <div class="kotak-target-build w-16 sm:w-20 md:w-24 lg:w-[100px] ${tinggiKotak} bg-slate-950 border-2 border-dashed border-slate-600 rounded-xl flex items-center justify-center transition-all shrink-0 relative overflow-hidden shadow-inner" data-target="${item.id}">
                                    <span class="text-slate-600 text-[10px] md:text-xs font-bold absolute bottom-1 right-1 md:bottom-1.5 md:right-1.5 opacity-50">${index + 1}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;
    pasangSensorBuild();
    jalankanTimerBuild(); // Timer menyala setiap pindah level soal
}

function pasangSensorBuild() {
    const kartus = document.querySelectorAll('.kartu-soal-build');
    const wadahKiri = document.getElementById('grid-balok-build');
    const kolomKiriUtama = document.getElementById('wadah-kiri-build');
    let soalSekarang = buildState.dataSoal[buildState.soalAktif];

    kartus.forEach(kartu => {
        let isDragging = false;
        let terkunci = false;

        kartu.addEventListener('pointerdown', function(e) {
            if(terkunci) return;
            isDragging = true;
            kartu.setPointerCapture(e.pointerId);
            
            kolomKiriUtama.style.zIndex = '9999';
            kolomKiriUtama.style.position = 'relative';
            
            kartu.style.zIndex = 9999;
            kartu.classList.add('scale-105', 'shadow-2xl');
            
            kartu.style.position = 'fixed';
            kartu.style.left = (e.clientX - (kartu.offsetWidth / 2)) + 'px';
            kartu.style.top = (e.clientY - (kartu.offsetHeight / 2)) + 'px';
        });

        kartu.addEventListener('pointermove', function(e) {
            if(!isDragging || terkunci) return;
            e.preventDefault(); 
            kartu.style.left = (e.clientX - (kartu.offsetWidth / 2)) + 'px';
            kartu.style.top = (e.clientY - (kartu.offsetHeight / 2)) + 'px';
        });

        kartu.addEventListener('pointerup', function(e) {
            if(!isDragging || terkunci) return;
            isDragging = false;
            kartu.releasePointerCapture(e.pointerId);
            
            kolomKiriUtama.style.zIndex = '10';
            kartu.classList.remove('scale-105', 'shadow-2xl');
            
            kartu.style.display = 'none';
            let elemenDiBawah = document.elementFromPoint(e.clientX, e.clientY);
            kartu.style.display = 'flex';

            let kotakTarget = elemenDiBawah ? elemenDiBawah.closest('.kotak-target-build') : null;

            if (kotakTarget && !kotakTarget.classList.contains('terisi')) {
                if (kartu.getAttribute('data-id') === kotakTarget.getAttribute('data-target')) {
                    terkunci = true;
                    kartu.style.position = 'static';
                    
                    let spacer = document.createElement('div');
                    spacer.className = kartu.className.replace('bg-slate-800', 'bg-transparent').replace('border-slate-600', 'border-transparent') + ' invisible';
                    spacer.style.pointerEvents = 'none';
                    wadahKiri.insertBefore(spacer, kartu);
                    
                    kartu.className = 'kartu-soal flex justify-center items-center w-full h-full rounded-lg transition-all relative shadow-[0_0_15px_rgba(139,92,246,0.4)] bg-violet-600 text-white border-2 border-violet-400 fade-in';
                    kartu.innerHTML += `<div class="absolute -top-1 -right-1 bg-white text-violet-600 rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-[8px] md:text-[10px] shadow-md border border-violet-500"><i class="fa-solid fa-check"></i></div>`;
                    
                    kotakTarget.innerHTML = '';
                    kotakTarget.appendChild(kartu);
                    kotakTarget.classList.remove('border-dashed', 'border-slate-600', 'bg-slate-950');
                    kotakTarget.classList.add('border-solid', 'border-violet-500', 'bg-violet-900/30', 'terisi', 'shadow-[0_0_10px_rgba(139,92,246,0.3)]');
                    
                    let totalNilaiGame = 100;
                    let totalKataSemuaSoal = buildState.dataSoal.reduce((acc, curr) => acc + curr.susunan.length, 0);
                    let nilaiPerKata = totalNilaiGame / totalKataSemuaSoal;
                    
                    let salahCount = parseInt(kartu.getAttribute('data-salah')) || 0;
                    let nilaiDidapat = Math.max(0, nilaiPerKata - (salahCount * (nilaiPerKata * 0.25)));
                    
                    buildState.skor += nilaiDidapat;
                    buildState.kataTerjawab++;
                    
                    // UPDATE SKOR DI TOP BAR GLOBAL
                    if (typeof updateSkorDnd === 'function') updateSkorDnd(Math.round(buildState.skor));

                    if (typeof playSoundEffect === 'function') playSoundEffect('correct'); 

                    if (buildState.kataTerjawab === soalSekarang.susunan.length) {
                        // Matikan timer sejenak karena soal sudah selesai disusun
                        if (buildState.timerInterval) clearInterval(buildState.timerInterval);
                        
                        buildState.soalAktif++;
                        if (buildState.soalAktif < buildState.dataSoal.length) {
                            setTimeout(() => mulaiGameBuild(true), 1200);
                        } else {
                            setTimeout(() => selebrasiKemenanganBuild(), 800);
                        }
                    }
                } else {
                    kartu.style.position = 'static';
                    wadahKiri.appendChild(kartu);
                    if (typeof playSoundEffect === 'function') playSoundEffect('wrong'); 
                    
                    let salahCount = parseInt(kartu.getAttribute('data-salah')) || 0;
                    kartu.setAttribute('data-salah', salahCount + 1);
                    
                    kotakTarget.classList.add('bg-rose-900/50', 'border-rose-500');
                    setTimeout(() => kotakTarget.classList.remove('bg-rose-900/50', 'border-rose-500'), 300);
                }
            } else {
                kartu.style.position = 'static';
                wadahKiri.appendChild(kartu);
            }
        });
    });
}

function selebrasiKemenanganBuild() {
    if (buildState.timerInterval) clearInterval(buildState.timerInterval);
    
    let nilaiAkhir = Math.round(buildState.skor);
    if (typeof playCelebrationAudio === 'function') playCelebrationAudio(nilaiAkhir);
    
    const subtitleEl = document.getElementById('dnd-topbar-subtitle');
    if (subtitleEl) subtitleEl.innerText = "Permainan Selesai";

    const container = document.getElementById('dnd-game-container');
    container.innerHTML = `
        <div class="max-w-2xl mx-auto mt-10 p-8 bg-slate-900 rounded-[2.5rem] text-center border border-slate-700 shadow-[0_0_40px_rgba(139,92,246,0.2)] fade-in">
            <i class="fa-solid fa-medal text-6xl text-amber-400 mb-6 animate-bounce drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"></i>
            <h1 class="text-3xl md:text-4xl font-black text-white mb-2">KALIMAT SEMPURNA!</h1>
            
            <div class="bg-slate-800 p-6 rounded-3xl mb-8 mt-6 border border-slate-700">
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Nilai Akhir</p>
                <p class="text-7xl font-black text-violet-400 drop-shadow-[0_0_15px_rgba(139,92,246,0.4)]">${nilaiAkhir}</p>
            </div>
            
            <div class="flex justify-center gap-4">
                <button onclick="keluarFullscreenDnd()" class="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-2xl border border-slate-600 transition-colors">Menu Game</button>
                <button onclick="mulaiGameBuild()" class="bg-violet-600 hover:bg-violet-500 text-white font-black py-3 px-8 rounded-2xl shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-transform">MAIN LAGI</button>
            </div>
        </div>
    `;
}
