// ==========================================================
// FILE: engine-match.js
// FUNGSI: Mesin Game "Match & Drop" (Desain Bersih & Anti Gambar Rusak)
// ==========================================================

let matchState = {
    skor: 0,
    pasanganTerjawab: 0,
    dataSoal: [
        { id: "p1", tipe: "teks", soal: "كِتَابٌ", arti: "Buku" },
        { id: "p2", tipe: "gambar", soal: "🦆", arti: "بَطَّةٌ" }, // Memakai Emoji agar mustahil gagal dimuat
        { id: "p3", tipe: "teks", soal: "مَدْرَسَةٌ", arti: "Sekolah" },
        { id: "p4", tipe: "gambar", soal: "🐇", arti: "أَرْنَبٌ" } // Memakai Emoji agar mustahil gagal dimuat
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
        <div class="max-w-6xl mx-auto p-4 mt-2 select-none touch-none fade-in pb-32">
            
            <!-- HEADER -->
            <div class="flex justify-between items-center bg-white p-3 md:p-4 rounded-2xl shadow-sm mb-6 border border-slate-200">
                <h2 class="text-lg md:text-xl font-black text-blue-600 flex items-center gap-2"><i class="fa-solid fa-puzzle-piece"></i>MATCH & DROP</h2>
                <div class="font-bold text-amber-500 bg-amber-50 px-5 py-2 rounded-xl border border-amber-200 shadow-inner">Nilai: <span id="skor-match" class="font-black text-amber-600 text-xl">0</span></div>
                <button onclick="bukaDragAndDropArena()" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2 rounded-xl font-bold transition-colors">Keluar</button>
            </div>

            <div class="flex flex-col md:flex-row gap-6 bg-slate-50 p-5 md:p-8 rounded-3xl border border-slate-200 shadow-md">
                
                <!-- WADAH KIRI (PILIH BALOK) -->
                <div class="w-full md:w-1/2 flex flex-col" id="wadah-kiri">
                    <h3 class="text-center font-black text-slate-400 mb-4 uppercase tracking-widest text-xs border-b-2 border-slate-200 pb-3">Pilih Balok</h3>
                    <div class="grid grid-cols-2 gap-4">
                        ${soalAcak.map(item => {
                            let isGambar = item.tipe === 'gambar';
                            // Jika gambar/emoji ukurannya besar, jika teks pakai font Arab
                            let isiKartu = isGambar 
                                ? `<span class="pointer-events-none select-none drop-shadow-sm text-6xl md:text-7xl">${item.soal}</span>` 
                                : `<span class="pointer-events-none select-none drop-shadow-md font-arabic text-3xl md:text-5xl">${item.soal}</span>`;
                            
                            // Jika gambar latar PUTIH, jika teks latar BIRU
                            let cssKartu = isGambar
                                ? `bg-white border-2 border-slate-300 text-slate-800`
                                : `bg-blue-500 text-white border-2 border-blue-400`;
                            
                            return `
                                <div class="kartu-soal ${cssKartu} rounded-2xl flex justify-center items-center h-24 md:h-28 shadow-md transition-transform cursor-grab relative overflow-hidden" data-id="${item.id}" data-tipe="${item.tipe}">
                                    ${isiKartu}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <div class="hidden md:block w-px bg-slate-200 mx-2"></div>

                <!-- WADAH KANAN (KOTAK TARGET) -->
                <div class="w-full md:w-1/2 flex flex-col">
                    <h3 class="text-center font-black text-slate-400 mb-4 uppercase tracking-widest text-xs border-b-2 border-slate-200 pb-3">Pasangkan ke Kotak</h3>
                    <div class="flex flex-col gap-4">
                        ${artiAcak.map(item => `
                            <div class="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
                                <!-- Kotak Tujuan yang Kosong -->
                                <div class="kotak-target w-28 md:w-32 h-20 md:h-24 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center transition-all shrink-0 relative p-1" data-target="${item.id}"></div>
                                <!-- Teks Sasaran -->
                                <div class="flex-1 bg-slate-100 text-slate-700 font-bold p-2 rounded-xl text-center h-20 md:h-24 flex items-center justify-center border border-slate-200 shadow-inner ${item.arti.match(/[\u0600-\u06FF]/) ? 'font-arabic text-3xl md:text-4xl' : 'text-lg md:text-xl'}">
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
            kartu.classList.add('scale-110', 'shadow-2xl');
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
            kartu.classList.remove('scale-110', 'shadow-2xl');
            
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
                    kartu.className = 'kartu-soal flex justify-center items-center w-full h-full rounded-xl transition-all relative shadow-sm ' + 
                                      (tipe === 'gambar' ? 'bg-emerald-50 border-2 border-emerald-400' : 'bg-emerald-500 text-white border-2 border-emerald-400');
                                      
                    kartu.innerHTML += `<div class="absolute -top-2 -right-2 bg-white text-emerald-600 rounded-full w-7 h-7 flex items-center justify-center text-sm shadow-md border-2 border-emerald-500"><i class="fa-solid fa-check"></i></div>`;
                    
                    kotakTarget.innerHTML = '';
                    kotakTarget.appendChild(kartu);
                    kotakTarget.classList.remove('border-dashed', 'border-slate-300', 'bg-slate-50');
                    kotakTarget.classList.add('border-solid', 'border-emerald-500', 'bg-emerald-100', 'terisi');
                    
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
