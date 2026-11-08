// ==========================================================
// FILE: engine-match.js
// FUNGSI: Mesin Game "Match & Drop" (FIX TAMPILAN TERPOTONG & GAMBAR 404)
// ==========================================================

let matchState = {
    skor: 0,
    pasanganTerjawab: 0,
    dataSoal: [
        { id: "p1", tipe: "teks", soal: "كِتَابٌ", arti: "Buku" },
        // Menggunakan gambar dari server Wikipedia yang kebal blokir (Anti 404)
        { id: "p2", tipe: "gambar", soal: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Mallard2.jpg/150px-Mallard2.jpg", arti: "بَطَّةٌ" },
        { id: "p3", tipe: "teks", soal: "مَدْرَسَةٌ", arti: "Sekolah" },
        { id: "p4", tipe: "gambar", soal: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Oryctolagus_cuniculus_Rcdo.jpg/150px-Oryctolagus_cuniculus_Rcdo.jpg", arti: "أَرْنَبٌ" }
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

    // Penambahan pb-32 (padding bawah) agar bisa digeser/scroll kalau layar sempit
    container.innerHTML = `
        <div class="max-w-6xl mx-auto p-4 mt-2 select-none touch-none fade-in pb-32">
            
            <div class="flex justify-between items-center bg-white p-3 md:p-4 rounded-xl shadow-sm mb-4 border border-slate-200">
                <h2 class="text-lg md:text-xl font-black text-blue-600 flex items-center gap-2"><i class="fa-solid fa-puzzle-piece"></i>MATCH & DROP</h2>
                <div class="font-bold text-amber-500 bg-amber-50 px-4 py-1 rounded-xl border border-amber-200 shadow-inner">Nilai: <span id="skor-match" class="font-black text-amber-600 text-lg">0</span></div>
                <button onclick="bukaDragAndDropArena()" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-1 rounded-xl font-bold transition-colors">Keluar</button>
            </div>

            <div class="flex flex-col md:flex-row gap-4 md:gap-6 bg-slate-50 p-4 md:p-6 rounded-2xl border border-slate-200 shadow-md">
                
                <!-- WADAH KIRI (Lebih Ramping) -->
                <div class="w-full md:w-1/2 flex flex-col" id="wadah-kiri">
                    <h3 class="text-center font-bold text-slate-400 mb-3 uppercase tracking-widest text-xs border-b-2 border-slate-200 pb-2">Pilih Balok</h3>
                    <div class="grid grid-cols-2 gap-3">
                        ${soalAcak.map(item => {
                            let isiKartu = item.tipe === 'gambar' 
                                ? `<img src="${item.soal}" class="h-14 md:h-16 w-auto object-contain pointer-events-none drop-shadow-md" alt="gambar" onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/150px-No_image_available.svg.png';">` 
                                : `<span class="pointer-events-none select-none drop-shadow-md font-arabic text-3xl md:text-4xl">${item.soal}</span>`;
                            
                            return `
                                <div class="kartu-soal bg-blue-500 text-white border-2 border-blue-400 rounded-xl flex justify-center items-center h-20 md:h-24 shadow-md transition-transform cursor-grab relative overflow-hidden" data-id="${item.id}">
                                    ${isiKartu}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <div class="hidden md:block w-px bg-slate-200 mx-1"></div>

                <!-- WADAH KANAN (Lebih Ramping agar 4 kotak muat) -->
                <div class="w-full md:w-1/2 flex flex-col">
                    <h3 class="text-center font-bold text-slate-400 mb-3 uppercase tracking-widest text-xs border-b-2 border-slate-200 pb-2">Pasangkan ke Kotak</h3>
                    <div class="flex flex-col gap-3">
                        ${artiAcak.map(item => `
                            <div class="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-slate-100">
                                <div class="kotak-target w-24 md:w-28 h-16 md:h-20 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center transition-all shrink-0 relative" data-target="${item.id}"></div>
                                <div class="flex-1 bg-slate-800 text-white font-bold p-2 rounded-lg text-center h-16 md:h-20 flex items-center justify-center shadow-inner ${item.arti.match(/[\u0600-\u06FF]/) ? 'font-arabic text-2xl md:text-3xl' : 'text-lg'}">
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
                    terkunci = true;
                    kartu.style.position = 'static';
                    kartu.classList.remove('bg-blue-500', 'border-blue-400');
                    kartu.classList.add('bg-emerald-500', 'border-emerald-400', 'w-full', 'h-full');
                    kartu.innerHTML += `<div class="absolute -top-1 -right-1 bg-white text-emerald-600 rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md border border-emerald-500"><i class="fa-solid fa-check"></i></div>`;
                    
                    kotakTarget.innerHTML = '';
                    kotakTarget.appendChild(kartu);
                    kotakTarget.classList.remove('border-dashed', 'border-slate-300', 'bg-slate-50');
                    kotakTarget.classList.add('border-solid', 'border-emerald-500', 'bg-emerald-50', 'terisi');
                    
                    let nilaiPerSoal = 100 / matchState.dataSoal.length;
                    matchState.skor += nilaiPerSoal;
                    matchState.pasanganTerjawab++;
                    
                    document.getElementById('skor-match').innerText = Math.round(matchState.skor);
                    if (typeof playSoundEffect === 'function') playSoundEffect('correct'); 

                    if (matchState.pasanganTerjawab === matchState.dataSoal.length) {
                        setTimeout(() => selebrasiKemenangan(), 400);
                    }
                } else {
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
            
            <div class="bg-slate-800 p-6 rounded-3xl mb-8 mt-6 border border-slate-700">
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
