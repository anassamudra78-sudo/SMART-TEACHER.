// ==========================================================
// FILE: engine-match.js
// FUNGSI: Mesin Game "Match & Drop" (Skor Maksimal 100)
// ==========================================================

let matchState = {
    skor: 0,
    pasanganTerjawab: 0,
    dataSoal: [
        { id: "p1", tipe: "teks", soal: "كِتَابٌ", arti: "Buku" },
        { id: "p2", tipe: "gambar", soal: "https://cdn-icons-png.flaticon.com/512/103/103085.png", arti: "بَطَّةٌ" },
        { id: "p3", tipe: "teks", soal: "مَدْرَسَةٌ", arti: "Sekolah" },
        { id: "p4", tipe: "gambar", soal: "https://cdn-icons-png.flaticon.com/512/2984/2984920.png", arti: "أَرْنَبٌ" }
    ]
};

function bukaSetupGame(jenisGame) {
    if (jenisGame === 'match') mulaiGameMatch();
}

function mulaiGameMatch() {
    const container = document.getElementById('main-content');
    matchState.skor = 0;
    matchState.pasanganTerjawab = 0;

    let soalAcak = [...matchState.dataSoal].sort(() => Math.random() - 0.5);
    let artiAcak = [...matchState.dataSoal].sort(() => Math.random() - 0.5);

    container.innerHTML = `
        <div class="max-w-5xl mx-auto p-4 md:p-8 mt-4 select-none touch-none fade-in">
            <div class="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm mb-8 border border-slate-200">
                <h2 class="text-xl font-black text-blue-600"><i class="fa-solid fa-puzzle-piece mr-2"></i>MATCH & DROP</h2>
                <div class="font-bold text-amber-500">Nilai: <span id="skor-match" class="font-black text-amber-600">0</span></div>
                <button onclick="bukaDragAndDropArena()" class="bg-slate-100 px-4 py-2 rounded-xl font-bold">Keluar</button>
            </div>

            <div class="flex flex-col md:flex-row gap-8 relative bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <!-- WADAH KIRI -->
                <div class="w-full md:w-1/2" id="wadah-kiri">
                    <h3 class="text-center font-bold text-slate-400 mb-4 uppercase text-sm tracking-widest">Pilih Balok</h3>
                    <div class="grid grid-cols-2 gap-4">
                        ${soalAcak.map(item => {
                            let isiKartu = item.tipe === 'gambar' 
                                ? `<img src="${item.soal}" class="max-h-[80px] max-w-full object-contain pointer-events-none select-none" alt="gambar">` 
                                : `<span class="pointer-events-none select-none drop-shadow-md font-arabic text-4xl">${item.soal}</span>`;
                            
                            return `
                                <div class="kartu-soal bg-blue-500 text-white border-2 border-blue-400 p-2 rounded-2xl flex justify-center items-center h-[110px] shadow-lg transition-transform cursor-pointer relative" data-id="${item.id}">
                                    ${isiKartu}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- WADAH KANAN -->
                <div class="w-full md:w-1/2">
                    <h3 class="text-center font-bold text-slate-400 mb-4 uppercase text-sm tracking-widest">Pasangkan ke Kotak</h3>
                    <div class="flex flex-col gap-4">
                        ${artiAcak.map(item => `
                            <div class="flex items-center gap-3">
                                <div class="kotak-target w-28 h-20 bg-white border-4 border-dashed border-slate-300 rounded-xl flex items-center justify-center transition-colors shrink-0 overflow-hidden" data-target="${item.id}"></div>
                                <div class="flex-1 bg-slate-800 text-white font-bold p-4 rounded-xl text-center h-20 flex items-center justify-center shadow-inner ${item.arti.match(/[\u0600-\u06FF]/) ? 'font-arabic text-3xl' : 'text-xl'}">
                                    ${item.arti}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    pasangSensorSederhana();
}

function pasangSensorSederhana() {
    const kartus = document.querySelectorAll('.kartu-soal');
    const wadahKiri = document.getElementById('wadah-kiri').querySelector('.grid');
    
    kartus.forEach(kartu => {
        let terkunci = false;

        kartu.addEventListener('touchstart', function(e) {
            if(terkunci) return;
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
            kartu.classList.remove('scale-105', 'shadow-2xl');
            
            let sentuhan = e.changedTouches[0];
            kartu.style.display = 'none';
            let elemenDiBawah = document.elementFromPoint(sentuhan.clientX, sentuhan.clientY);
            kartu.style.display = 'flex';

            let kotakTarget = elemenDiBawah ? elemenDiBawah.closest('.kotak-target') : null;

            if (kotakTarget && !kotakTarget.classList.contains('terisi')) {
                if (kartu.getAttribute('data-id') === kotakTarget.getAttribute('data-target')) {
                    // JAWABAN BENAR
                    terkunci = true;
                    kartu.style.position = 'static';
                    kartu.classList.replace('bg-blue-500', 'bg-emerald-500');
                    kartu.classList.replace('border-blue-400', 'border-emerald-400');
                    kartu.classList.add('w-full', 'h-full');
                    kartu.innerHTML += `<div class="absolute top-1 right-1 bg-white text-emerald-600 rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-sm"><i class="fa-solid fa-check"></i></div>`;
                    
                    kotakTarget.innerHTML = '';
                    kotakTarget.appendChild(kartu);
                    kotakTarget.classList.replace('border-dashed', 'border-solid');
                    kotakTarget.classList.replace('border-slate-300', 'border-emerald-500');
                    kotakTarget.classList.add('terisi', 'bg-emerald-50');
                    
                    // RUMUS NILAI: 100 dibagi jumlah soal
                    let nilaiPerSoal = 100 / matchState.dataSoal.length;
                    matchState.skor += nilaiPerSoal;
                    matchState.pasanganTerjawab++;
                    
                    // Tampilkan skor bulat di atas layar
                    document.getElementById('skor-match').innerText = Math.round(matchState.skor);
                    
                    if (typeof playSoundEffect === 'function') playSoundEffect('correct'); 

                    if (matchState.pasanganTerjawab === matchState.dataSoal.length) {
                        setTimeout(() => selebrasiKemenangan(), 400);
                    }
                } else {
                    // SALAH
                    kartu.style.position = 'static';
                    wadahKiri.appendChild(kartu);
                    
                    if (typeof playSoundEffect === 'function') playSoundEffect('wrong'); 
                    
                    kotakTarget.classList.add('bg-rose-100', 'border-rose-500');
                    setTimeout(() => kotakTarget.classList.remove('bg-rose-100', 'border-rose-500'), 300);
                }
            } else {
                kartu.style.position = 'static';
                wadahKiri.appendChild(kartu);
            }
        });
    });
}

function selebrasiKemenangan() {
    let nilaiAkhir = Math.round(matchState.skor);

    if (typeof playCelebrationAudio === 'function') {
        playCelebrationAudio(nilaiAkhir);
    }

    const container = document.getElementById('main-content');
    container.innerHTML = `
        <div class="max-w-2xl mx-auto mt-10 p-8 bg-slate-900 rounded-[2.5rem] text-center border-4 border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.4)] fade-in">
            <i class="fa-solid fa-trophy text-6xl text-amber-400 mb-6 animate-bounce"></i>
            <h1 class="text-4xl font-black text-white mb-2">PERMAINAN SELESAI!</h1>
            <p class="text-slate-400 mb-8">Pencapaian Mode Match & Drop</p>
            
            <div class="bg-slate-800 p-6 rounded-3xl mb-8 border border-slate-700">
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Nilai Akhir</p>
                <p class="text-7xl font-black text-emerald-400 drop-shadow-md">${nilaiAkhir}</p>
            </div>
            
            <div class="flex justify-center gap-4">
                <button onclick="bukaDragAndDropArena()" class="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-2xl">Menu Game</button>
                <button onclick="mulaiGameMatch()" class="bg-emerald-500 hover:bg-emerald-400 text-white font-black py-3 px-8 rounded-2xl shadow-lg">MAIN LAGI</button>
            </div>
        </div>
    `;
}
