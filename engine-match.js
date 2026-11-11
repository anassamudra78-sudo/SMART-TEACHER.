// ==========================================================
// FILE: engine-match.js
// FUNGSI: Mesin Game "Match & Drop" (DENGAN TOP BAR GLOBAL)
// ==========================================================
let matchState = {
    skor: 0,
    pasanganTerjawab: 0,
    sisaWaktu: 0,
    timerInterval: null,
    dataSoal: [
        { id: "p1", tipe: "teks", soal: "كِتَابٌ", arti: "Buku" },
        { id: "p2", tipe: "gambar", soal: "🦆", arti: "Bebek" }, 
        { id: "p3", tipe: "teks", soal: "مَدْرَسَةٌ", arti: "Sekolah" },
        { id: "p4", tipe: "gambar", soal: "🐇", arti: "Kelinci" },
        { id: "p5", tipe: "teks", soal: "مَسْجِدٌ", arti: "Masjid" },
        { id: "p6", tipe: "gambar", soal: "🖋️", arti: "Pena" },
        { id: "p7", tipe: "teks", soal: "كُرْسِيٌّ", arti: "Kursi" },
        { id: "p8", tipe: "gambar", soal: "🚗", arti: "Mobil" }
    ]
};

function hitungSkalaOtomatis(jumlahSoal) {
    if (jumlahSoal <= 4) {
        return {
            tinggiKotak: "h-20 md:h-24",      
            lebarDrop: "w-24 md:w-32",
            teksArab: "text-3xl md:text-4xl",
            teksIndo: "text-lg md:text-xl",
            teksEmoji: "text-5xl md:text-6xl",
            gap: "gap-3 md:gap-4",
            gridKiri: "grid-cols-2",          
            gridKanan: "grid-cols-1"          
        };
    } else if (jumlahSoal <= 8) {
        return {
            tinggiKotak: "h-14 md:h-16",      
            lebarDrop: "w-20 md:w-24",
            teksArab: "text-2xl md:text-3xl",
            teksIndo: "text-base md:text-lg",
            teksEmoji: "text-4xl",
            gap: "gap-2 md:gap-3",
            gridKiri: "grid-cols-3",          
            gridKanan: "grid-cols-1 md:grid-cols-2" 
        };
    } else if (jumlahSoal <= 15) {
        return {
            tinggiKotak: "h-10 md:h-12",      
            lebarDrop: "w-16 md:w-20",
            teksArab: "text-xl",
            teksIndo: "text-sm md:text-base",
            teksEmoji: "text-2xl md:text-3xl",
            gap: "gap-2",
            gridKiri: "grid-cols-3 md:grid-cols-4",
            gridKanan: "grid-cols-2 md:grid-cols-3"
        };
    } else {
        return {
            tinggiKotak: "h-8 md:h-10",        
            lebarDrop: "w-12 md:w-16",
            teksArab: "text-lg",
            teksIndo: "text-xs",
            teksEmoji: "text-xl",
            gap: "gap-1 md:gap-2",
            gridKiri: "grid-cols-4 md:grid-cols-5",
            gridKanan: "grid-cols-2 md:grid-cols-3"
        };
    }
}

// Fungsi Universal Anti-Bentrok
function bukaSetupGame(jenisGame) {
    if (jenisGame === 'match' && typeof mulaiGameMatch === 'function') {
        mulaiGameMatch();
    } else if (jenisGame === 'sort' && typeof mulaiGameSort === 'function') {
        mulaiGameSort();
    } else if (jenisGame === 'build' && typeof mulaiGameBuild === 'function') {
        mulaiGameBuild();
    }
}

function jalankanTimerMatch() {
    // Ambil dari variabel global
    matchState.sisaWaktu = window.dndDurasiPilihan || 15;
    
    if (matchState.timerInterval) clearInterval(matchState.timerInterval);
    if (typeof updateTimerDnd === 'function') updateTimerDnd(matchState.sisaWaktu);

    matchState.timerInterval = setInterval(() => {
        matchState.sisaWaktu--;
        if (typeof updateTimerDnd === 'function') updateTimerDnd(matchState.sisaWaktu);

        if (matchState.sisaWaktu <= 5 && matchState.sisaWaktu > 0) {
             if (typeof playTick === 'function') playTick(900);
        }

        if (matchState.sisaWaktu <= 0) {
            clearInterval(matchState.timerInterval);
            if (typeof playSoundEffect === 'function') playSoundEffect('habis');
            selebrasiKemenangan();
        }
    }, 1000);
}

function mulaiGameMatch() {
    const subtitleEl = document.getElementById('dnd-topbar-subtitle');
    if (subtitleEl) subtitleEl.innerText = "Sedang Bermain...";

    const container = document.getElementById('dnd-game-container');
    if (!container) return;
    
    matchState.skor = 0;
    matchState.pasanganTerjawab = 0;
    
    // Reset Skor di Top Bar ke 0
    if (typeof updateSkorDnd === 'function') updateSkorDnd(0);

    let soalAcak = [...matchState.dataSoal].sort(() => Math.random() - 0.5);
    let artiAcak = [...matchState.dataSoal].sort(() => Math.random() - 0.5);

    let skala = hitungSkalaOtomatis(matchState.dataSoal.length);

    container.innerHTML = `
        <div class="max-w-7xl mx-auto p-2 md:p-4 mt-2 select-none fade-in pb-20 w-full h-full">
            <div class="flex flex-col lg:flex-row gap-4 md:gap-6 bg-[#0f172a] p-4 md:p-6 rounded-3xl border border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.4)] relative overflow-hidden h-full min-h-[500px]">
                <div class="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div class="w-full lg:w-5/12 flex flex-col z-10" id="wadah-kiri">
                    <h3 class="text-center font-bold text-slate-400 mb-4 uppercase tracking-widest text-xs border-b border-slate-700/50 pb-2">Pilih Balok</h3>
                    <div class="grid ${skala.gridKiri} ${skala.gap}">
                        ${soalAcak.map(item => {
                            let isGambar = item.tipe === 'gambar';
                            let isiKartu = isGambar 
                                ? `<div class="w-full h-full flex items-center justify-center pointer-events-none p-1"><span class="drop-shadow-lg ${skala.teksEmoji}">${item.soal}</span></div>` 
                                : `<div class="w-full h-full flex items-center justify-center pointer-events-none p-1"><span class="drop-shadow-lg font-arabic ${skala.teksArab} text-center leading-none text-white">${item.soal}</span></div>`;
                            
                            let cssKartu = isGambar
                                ? `bg-slate-800 border-2 border-slate-600 text-slate-200`
                                : `bg-slate-800 border-2 border-slate-600 text-white`; 
                            
                            return `
                                <div class="kartu-soal ${cssKartu} touch-none rounded-xl md:rounded-2xl flex justify-center items-center ${skala.tinggiKotak} shadow-lg transition-transform cursor-grab relative overflow-hidden" data-id="${item.id}" data-tipe="${item.tipe}" data-salah="0">
                                    ${isiKartu}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <div class="hidden lg:block w-px bg-slate-700/50 mx-1 z-10"></div>

                <div class="w-full lg:w-7/12 flex flex-col z-10">
                    <h3 class="text-center font-bold text-slate-400 mb-4 uppercase tracking-widest text-xs border-b border-slate-700/50 pb-2">Pasangkan ke Kotak</h3>
                    <div class="grid ${skala.gridKanan} ${skala.gap}">
                        ${artiAcak.map(item => `
                            <div class="flex items-stretch gap-2 bg-slate-800 p-1.5 md:p-2 rounded-xl md:rounded-2xl shadow-md border border-slate-700 ${skala.tinggiKotak}">
                                <div class="kotak-target ${skala.lebarDrop} bg-slate-900 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center transition-all shrink-0 relative p-1 overflow-hidden" data-target="${item.id}"></div>
                                <div class="flex-1 bg-slate-700/50 text-slate-200 font-bold p-1 md:p-2 rounded-lg flex items-center justify-center border border-slate-600/50 shadow-inner overflow-hidden">
                                    <span class="text-center leading-tight break-words w-full px-1 ${item.arti.match(/[\u0600-\u06FF]/) ? 'font-arabic ' + skala.teksArab : skala.teksIndo}">
                                        ${item.arti}
                                    </span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    pasangSensorSederhana();
    jalankanTimerMatch(); // <-- Timer mulai berjalan
}

function pasangSensorSederhana() {
    const kartus = document.querySelectorAll('.kartu-soal');
    const wadahKiri = document.getElementById('wadah-kiri').querySelector('.grid');
    const kolomKiriUtama = document.getElementById('wadah-kiri');
    
    kartus.forEach(kartu => {
        let terkunci = false;

        kartu.addEventListener('touchstart', function(e) {
            if(terkunci) return;
            kolomKiriUtama.style.zIndex = '9999';
            kolomKiriUtama.style.position = 'relative';
            kartu.style.zIndex = 9999;
            kartu.classList.add('scale-105', 'shadow-2xl');
        }, {passive: false});

        kartu.addEventListener('touchmove', function(e) {
            if(terkunci) return;
            e.preventDefault(); 
            let sentuhan = e.touches[0];
            kartu.style.position = 'fixed';
            kartu.style.left = (sentuhan.clientX - (kartu.offsetWidth / 2)) + 'px';
            kartu.style.top = (sentuhan.clientY - (kartu.offsetHeight / 2)) + 'px';
        }, {passive: false});

        kartu.addEventListener('touchend', function(e) {
            if(terkunci) return;
            kolomKiriUtama.style.zIndex = '10';
            kartu.classList.remove('scale-105', 'shadow-2xl');
            
            let sentuhan = e.changedTouches[0];
            kartu.style.display = 'none';
            let elemenDiBawah = document.elementFromPoint(sentuhan.clientX, sentuhan.clientY);
            kartu.style.display = 'flex';

            let kotakTarget = elemenDiBawah ? elemenDiBawah.closest('.kotak-target') : null;

            if (kotakTarget && !kotakTarget.classList.contains('terisi')) {
                if (kartu.getAttribute('data-id') === kotakTarget.getAttribute('data-target')) {
                    terkunci = true;
                    kartu.style.position = 'static';
                    
                    let tipe = kartu.getAttribute('data-tipe');
                    kartu.className = 'kartu-soal flex justify-center items-center w-full h-full rounded-lg transition-all relative shadow-[0_0_15px_rgba(16,185,129,0.4)] bg-emerald-500 text-white border-2 border-emerald-400';
                                      
                    kartu.innerHTML += `<div class="absolute -top-1 -right-1 bg-white text-emerald-600 rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-md border border-emerald-500"><i class="fa-solid fa-check"></i></div>`;
                    
                    kotakTarget.innerHTML = '';
                    kotakTarget.appendChild(kartu);
                    kotakTarget.classList.remove('border-dashed', 'border-slate-600', 'bg-slate-900', 'p-1');
                    kotakTarget.classList.add('border-solid', 'border-emerald-500', 'bg-emerald-900/30', 'terisi');
                    
                    let salahCount = parseInt(kartu.getAttribute('data-salah')) || 0;
                    let nilaiBawaan = 100 / matchState.dataSoal.length; 
                    let persenPotongan = 0.25; 
                    
                    let nilaiDidapat = Math.max(0, nilaiBawaan - (salahCount * (nilaiBawaan * persenPotongan)));
                    matchState.skor += nilaiDidapat;
                    
                    // UPDATE SKOR DI TOP BAR!
                    if (typeof updateSkorDnd === 'function') updateSkorDnd(Math.round(matchState.skor));

                    matchState.pasanganTerjawab++;
                    if (typeof playSoundEffect === 'function') playSoundEffect('correct'); 

                    if (matchState.pasanganTerjawab === matchState.dataSoal.length) {
                        if (matchState.timerInterval) clearInterval(matchState.timerInterval); // Matikan timer menang
                        setTimeout(() => selebrasiKemenangan(), 400);
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

function selebrasiKemenangan() {
    if (matchState.timerInterval) clearInterval(matchState.timerInterval); // Jaga-jaga matikan timer
    
    let nilaiAkhir = Math.round(matchState.skor);
    if (typeof playCelebrationAudio === 'function') playCelebrationAudio(nilaiAkhir);
    
    const subtitleEl = document.getElementById('dnd-topbar-subtitle');
    if (subtitleEl) subtitleEl.innerText = "Permainan Selesai";

    const container = document.getElementById('dnd-game-container');
    container.innerHTML = `
        <div class="max-w-2xl mx-auto mt-10 p-8 bg-slate-900 rounded-[2.5rem] text-center border border-slate-700 shadow-[0_0_40px_rgba(16,185,129,0.2)] fade-in">
            <i class="fa-solid fa-trophy text-6xl text-amber-400 mb-6 animate-bounce drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"></i>
            <h1 class="text-4xl font-black text-white mb-2">PERMAINAN SELESAI!</h1>
            
            <div class="bg-slate-800 p-6 rounded-3xl mb-8 mt-6 border border-slate-700">
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Nilai Akhir</p>
                <p class="text-7xl font-black text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">${nilaiAkhir}</p>
            </div>
            
            <div class="flex justify-center gap-4">
                <button onclick="keluarFullscreenDnd()" class="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-2xl border border-slate-600 transition-colors">Menu Game</button>
                <button onclick="mulaiGameMatch()" class="bg-emerald-500 hover:bg-emerald-400 text-white font-black py-3 px-8 rounded-2xl shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-transform">MAIN LAGI</button>
            </div>
        </div>
    `;
}
