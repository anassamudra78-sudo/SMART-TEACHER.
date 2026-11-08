// ==========================================================
// FILE: engine-match.js
// FUNGSI: Mesin Game "Match & Drop" (Dengan Suara & Efek Nyata)
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

// --- MESIN SUARA OTOMATIS (TANPA FILE MP3) ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function bunyi(jenis) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    let osc = audioCtx.createOscillator();
    let gain = audioCtx.createGain();
    
    if (jenis === 'benar') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime); // Nada tinggi (Cling!)
        osc.frequency.setValueAtTime(1108, audioCtx.currentTime + 0.1); 
        gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start(); osc.stop(audioCtx.currentTime + 0.3);
    } else if (jenis === 'salah') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime); // Nada rendah (Tetot!)
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start(); osc.stop(audioCtx.currentTime + 0.3);
    } else if (jenis === 'menang') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime); // Nada Kemenangan (Tadaa!)
        osc.frequency.setValueAtTime(554, audioCtx.currentTime + 0.15);
        osc.frequency.setValueAtTime(659, audioCtx.currentTime + 0.3);
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.45);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.8);
        osc.start(); osc.stop(audioCtx.currentTime + 0.8);
    }
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
}
// ---------------------------------------------

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
        <div class="max-w-4xl mx-auto p-4 md:p-8 mt-4 select-none touch-none fade-in">
            <div class="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm mb-8 border border-slate-200">
                <h2 class="text-xl font-black text-blue-600"><i class="fa-solid fa-puzzle-piece mr-2"></i>MATCH & DROP</h2>
                <div class="font-bold text-amber-500">Skor: <span id="skor-match" class="font-black text-amber-600">${matchState.skor}</span></div>
                <button onclick="bukaDragAndDropArena()" class="bg-slate-100 px-4 py-2 rounded-xl font-bold">Keluar</button>
            </div>

            <div class="flex justify-between gap-4 relative">
                <div class="w-1/2 flex flex-col gap-4" id="wadah-kiri">
                    ${soalAcak.map(item => `
                        <div class="kartu-soal bg-blue-500 text-white font-arabic text-3xl font-bold p-5 rounded-2xl text-center flex justify-center items-center h-[90px] shadow-md transition-colors" data-id="${item.id}">
                            ${item.soal}
                        </div>
                    `).join('')}
                </div>

                <div class="w-1/2 flex flex-col gap-4">
                    ${artiAcak.map(item => `
                        <div class="kotak-target bg-white border-4 border-dashed border-slate-300 text-slate-500 font-bold text-lg p-5 rounded-2xl text-center flex items-center justify-center h-[90px] transition-colors" data-target="${item.id}">
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

        kartu.addEventListener('touchstart', function(e) {
            if(terkunci) return;
            // Pancing audio context di sentuhan pertama agar diizinkan oleh browser HP
            if (audioCtx.state === 'suspended') audioCtx.resume();
            kartu.style.zIndex = 9999;
            kartu.classList.add('bg-blue-400', 'scale-105');
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
            kartu.classList.remove('bg-blue-400', 'scale-105');
            
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
                    kartu.innerHTML += ' <i class="fa-solid fa-check-circle ml-2"></i>';
                    
                    kotakTarget.innerHTML = '';
                    kotakTarget.appendChild(kartu);
                    kotakTarget.classList.replace('border-dashed', 'border-solid');
                    kotakTarget.classList.replace('border-slate-300', 'border-emerald-500');
                    kotakTarget.classList.add('terisi', 'bg-emerald-50');
                    
                    matchState.skor += 100;
                    matchState.pasanganTerjawab++;
                    document.getElementById('skor-match').innerText = matchState.skor;
                    
                    bunyi('benar'); // Panggil suara Cling!

                    if (matchState.pasanganTerjawab === matchState.dataSoal.length) {
                        setTimeout(() => selebrasiKemenangan(), 400);
                    }
                } else {
                    // JAWABAN SALAH
                    kartu.style.position = 'static';
                    wadahKiri.appendChild(kartu);
                    bunyi('salah'); // Panggil suara Tetot!
                    
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
    bunyi('menang');
    if (typeof confetti === 'function') {
        confetti({ particleCount: 200, spread: 120, origin: { y: 0.6 } });
    }

    const container = document.getElementById('main-content');
    container.innerHTML = `
        <div class="max-w-2xl mx-auto mt-10 p-8 bg-slate-900 rounded-[2.5rem] text-center border-4 border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.4)] fade-in">
            <i class="fa-solid fa-trophy text-6xl text-amber-400 mb-6 animate-bounce"></i>
            <h1 class="text-4xl font-black text-white mb-2">LUAR BIASA!</h1>
            <p class="text-slate-400 mb-8">Sempurna! Semua pasangan telah terisi.</p>
            
            <div class="bg-slate-800 p-6 rounded-3xl mb-8 border border-slate-700">
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Skor Akhir</p>
                <p class="text-6xl font-black text-emerald-400">${matchState.skor}</p>
            </div>
            
            <div class="flex justify-center gap-4">
                <button onclick="bukaDragAndDropArena()" class="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-2xl">Menu Game</button>
                <button onclick="mulaiGameMatch()" class="bg-emerald-500 hover:bg-emerald-400 text-white font-black py-3 px-8 rounded-2xl shadow-lg">MAIN LAGI</button>
            </div>
        </div>
    `;
}
