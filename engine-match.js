// ==========================================================
// FILE: engine-match.js
// FUNGSI: Mesin Utama Game "Match & Drop" (VERSI SEMPURNA)
// ==========================================================

let matchState = {
    skor: 0,
    pasanganTerjawab: 0,
    dataSoal: [
        { id: "p1", soal: "كِتَابٌ", arti: "Buku" },
        { id: "p2", soal: "قَلَمٌ", arti: "Pulpen" },
        { id: "p3", soal: "مَدْرَسَةٌ", arti: "Sekolah" },
        { id: "p4", soal: "مُعَلِّمٌ", arti: "Guru" }
    ]
};

function bukaSetupGame(jenisGame) {
    if (jenisGame === 'match') {
        mulaiGameMatch();
    }
}

function mulaiGameMatch() {
    const container = document.getElementById('main-content');
    matchState.skor = 0;
    matchState.pasanganTerjawab = 0;

    // Acak urutan
    let soalAcak = [...matchState.dataSoal].sort(() => Math.random() - 0.5);
    let artiAcak = [...matchState.dataSoal].sort(() => Math.random() - 0.5);

    container.innerHTML = `
        <div class="max-w-4xl mx-auto p-4 md:p-8 mt-4 select-none touch-none fade-in">
            <!-- HEADER -->
            <div class="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm mb-8 border border-slate-200">
                <h2 class="text-xl md:text-2xl font-black text-blue-600"><i class="fa-solid fa-puzzle-piece mr-2"></i>MATCH & DROP</h2>
                <div class="font-bold text-amber-500 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200 shadow-inner">Skor: <span id="skor-match" class="font-black text-amber-600 text-xl">${matchState.skor}</span></div>
                <button onclick="bukaDragAndDropArena()" class="bg-slate-100 hover:bg-rose-100 hover:text-rose-600 px-4 py-2 rounded-xl font-bold transition-colors"><i class="fa-solid fa-arrow-left mr-2"></i>Keluar</button>
            </div>

            <!-- AREA MAIN -->
            <div class="flex justify-between gap-4 md:gap-10 relative">
                <!-- WADAH KIRI (SOAL) -->
                <div class="w-1/2 flex flex-col gap-4" id="wadah-kiri">
                    ${soalAcak.map(item => `
                        <div class="kartu-soal bg-blue-500 text-white font-arabic text-3xl md:text-4xl font-bold p-5 rounded-2xl text-center flex justify-center items-center min-h-[90px] shadow-lg cursor-pointer transition-colors" data-id="${item.id}">
                            ${item.soal}
                        </div>
                    `).join('')}
                </div>

                <!-- WADAH KANAN (JAWABAN) -->
                <div class="w-1/2 flex flex-col gap-4">
                    ${artiAcak.map(item => `
                        <div class="kotak-target bg-white border-4 border-dashed border-slate-300 text-slate-500 font-bold text-lg md:text-xl p-5 rounded-2xl text-center flex items-center justify-center min-h-[90px] transition-colors overflow-hidden" data-target="${item.id}">
                            <span>${item.arti}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    pasangSensorSederhana();
}

function pasangSensorSederhana() {
    const kartus = document.querySelectorAll('.kartu-soal');
    const wadahKiri = document.getElementById('wadah-kiri');
    
    kartus.forEach(kartu => {
        let terkunci = false;

        // 1. DUKUNGAN LAYAR SENTUH (HP/TABLET)
        kartu.addEventListener('touchstart', function(e) {
            if(terkunci) return;
            kartu.style.zIndex = 9999;
            kartu.classList.add('bg-blue-400', 'scale-105', 'shadow-2xl');
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
            kartu.classList.remove('bg-blue-400', 'scale-105', 'shadow-2xl');
            
            let sentuhan = e.changedTouches[0];
            kartu.style.display = 'none';
            let elemenDiBawah = document.elementFromPoint(sentuhan.clientX, sentuhan.clientY);
            kartu.style.display = 'flex';

            let kotakTarget = elemenDiBawah ? elemenDiBawah.closest('.kotak-target') : null;
            cekJawaban(kartu, kotakTarget, wadahKiri);
        });

        // 2. DUKUNGAN MOUSE (LAPTOP/PC)
        let isDragging = false;
        kartu.addEventListener('mousedown', function(e) {
            if(terkunci) return;
            isDragging = true;
            kartu.style.zIndex = 9999;
            kartu.classList.add('bg-blue-400', 'scale-105', 'shadow-2xl');
        });

        document.addEventListener('mousemove', function(e) {
            if(!isDragging || terkunci) return;
            e.preventDefault();
            kartu.style.position = 'fixed';
            kartu.style.left = (e.clientX - (kartu.offsetWidth / 2)) + 'px';
            kartu.style.top = (e.clientY - (kartu.offsetHeight / 2)) + 'px';
        });

        document.addEventListener('mouseup', function(e) {
            if(!isDragging || terkunci) return;
            isDragging = false;
            kartu.classList.remove('bg-blue-400', 'scale-105', 'shadow-2xl');
            
            kartu.style.display = 'none';
            let elemenDiBawah = document.elementFromPoint(e.clientX, e.clientY);
            kartu.style.display = 'flex';

            let kotakTarget = elemenDiBawah ? elemenDiBawah.closest('.kotak-target') : null;
            cekJawaban(kartu, kotakTarget, wadahKiri);
        });

        // 3. LOGIKA PENILAIAN (DIPAKAI OLEH SENTUHAN & MOUSE)
        function cekJawaban(kartu, kotakTarget, wadahKiri) {
            if (kotakTarget && !kotakTarget.classList.contains('terisi')) {
                if (kartu.getAttribute('data-id') === kotakTarget.getAttribute('data-target')) {
                    // JAWABAN BENAR
                    terkunci = true;
                    kartu.style.position = 'static';
                    kartu.classList.replace('bg-blue-500', 'bg-emerald-500'); // Ubah warna jadi hijau
                    kartu.innerHTML += ' <i class="fa-solid fa-check-circle ml-2 text-white/80"></i>'; // Tambah centang
                    
                    kotakTarget.innerHTML = '';
                    kotakTarget.appendChild(kartu);
                    kotakTarget.classList.replace('border-dashed', 'border-solid');
                    kotakTarget.classList.replace('border-slate-300', 'border-emerald-500');
                    kotakTarget.classList.add('terisi', 'bg-emerald-50', 'shadow-inner');
                    
                    matchState.skor += 100;
                    matchState.pasanganTerjawab++;
                    document.getElementById('skor-match').innerText = matchState.skor;
                    
                    // Panggil suara Cling! dari file kuis Bapak (jika ada)
                    if (typeof playSoundEffect === 'function') playSoundEffect('correct');

                    if (matchState.pasanganTerjawab === matchState.dataSoal.length) {
                        selebrasiKemenangan();
                    }
                } else {
                    // JAWABAN SALAH (Kembali ke kiri + Merah kedip)
                    kartu.style.position = 'static';
                    wadahKiri.appendChild(kartu);
                    
                    if (typeof playSoundEffect === 'function') playSoundEffect('wrong'); // Suara Tetot!
                    
                    kotakTarget.classList.add('bg-rose-100', 'border-rose-500');
                    setTimeout(() => kotakTarget.classList.remove('bg-rose-100', 'border-rose-500'), 300);
                }
            } else {
                // DILEPAS DI LUAR KOTAK
                kartu.style.position = 'static';
                wadahKiri.appendChild(kartu);
            }
        }
    });
}

function selebrasiKemenangan() {
    setTimeout(() => {
        // Tembakkan Suara & Kembang Api (Confetti) dari file kuis Bapak
        if (typeof playSoundEffect === 'function') playSoundEffect('selebrasi');
        if (typeof confetti === 'function') confetti({ particleCount: 200, spread: 120, origin: { y: 0.6 } });
        
        const container = document.getElementById('main-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto mt-10 p-8 bg-slate-900 rounded-[2.5rem] text-center border-4 border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.4)] fade-in">
                <i class="fa-solid fa-trophy text-6xl text-amber-400 mb-6 animate-bounce"></i>
                <h1 class="text-4xl md:text-5xl font-black text-white mb-2">LUAR BIASA!</h1>
                <p class="text-slate-400 text-sm md:text-base mb-8">Kamu berhasil menyelesaikan mode Match & Drop</p>
                
                <div class="bg-slate-800 p-6 rounded-3xl mb-8 border border-slate-700 shadow-inner">
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Skor</p>
                    <p class="text-6xl font-black text-emerald-400">${matchState.skor}</p>
                </div>
                
                <div class="flex flex-col md:flex-row justify-center gap-4">
                    <button onclick="bukaDragAndDropArena()" class="bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-md">
                        <i class="fa-solid fa-gamepad mr-2"></i> Menu Game
                    </button>
                    <button onclick="mulaiGameMatch()" class="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black py-4 px-8 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all active:scale-95">
                        <i class="fa-solid fa-rotate-right mr-2"></i> MAIN LAGI
                    </button>
                </div>
            </div>
        `;
    }, 500);
}
