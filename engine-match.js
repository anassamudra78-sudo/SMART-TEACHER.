// ==========================================================
// FILE: engine-match.js
// FUNGSI: Mesin Utama Game "Match & Drop" (Versi Anti-Macet Tablet)
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
    } else {
        alert("Sabar Pak, mode Sort & Build segera menyusul! 🚀");
    }
}

function mulaiGameMatch() {
    const container = document.getElementById('main-content');
    matchState.skor = 0;
    matchState.pasanganTerjawab = 0;

    let soalAcak = [...matchState.dataSoal].sort(() => Math.random() - 0.5);
    let artiAcak = [...matchState.dataSoal].sort(() => Math.random() - 0.5);

    container.innerHTML = `
        <div class="max-w-4xl mx-auto p-4 md:p-8 mt-4 fade-in">
            <!-- HEADER GAME -->
            <div class="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm mb-8 border border-slate-200">
                <h2 class="text-xl md:text-2xl font-black text-blue-600 flex items-center"><i class="fa-solid fa-puzzle-piece mr-2"></i>MATCH & DROP</h2>
                <div class="text-base md:text-lg font-bold text-amber-500 bg-amber-50 px-4 py-1 rounded-xl shadow-inner">Skor: <span id="skor-match" class="font-black text-amber-600 text-xl">0</span></div>
                <button onclick="bukaDragAndDropArena()" class="bg-slate-100 hover:bg-rose-500 hover:text-white text-slate-700 px-4 py-2 rounded-xl font-bold transition-colors">
                    Keluar
                </button>
            </div>

            <!-- PAPAN MAIN -->
            <div class="flex justify-between gap-4 md:gap-10 relative" id="area-permainan">
                
                <!-- KIRI: KOSAKATA ARAB -->
                <div class="w-1/2 flex flex-col gap-4 z-20">
                    ${soalAcak.map(item => `
                        <div class="kartu-soal bg-blue-500 text-white font-arabic text-3xl md:text-4xl font-bold p-5 rounded-2xl shadow-lg text-center transition-transform flex justify-center items-center min-h-[90px] relative" data-id="${item.id}" style="touch-action: none; user-select: none;">
                            ${item.soal}
                        </div>
                    `).join('')}
                </div>

                <!-- KANAN: KOTAK TARGET JAWABAN -->
                <div class="w-1/2 flex flex-col gap-4 z-10">
                    ${artiAcak.map(item => `
                        <div class="kotak-target bg-white border-4 border-dashed border-slate-300 text-slate-500 font-bold text-lg md:text-xl p-5 rounded-2xl text-center flex items-center justify-center min-h-[90px] transition-colors relative overflow-hidden" data-target="${item.id}">
                            <span class="pointer-events-none select-none">${item.arti}</span>
                        </div>
                    `).join('')}
                </div>

            </div>
        </div>
    `;

    // Panggil fungsi paksa sentuh
    aktifkanSensorJariBrutal();
}

function aktifkanSensorJariBrutal() {
    const kartus = document.querySelectorAll('.kartu-soal');
    
    kartus.forEach(kartu => {
        let startX = 0, startY = 0, posX = 0, posY = 0;

        // Mengganti addEventListener dengan fungsi "paksa" bawaan asli JavaScript
        kartu.ontouchstart = mulaiTarik;
        kartu.onmousedown = mulaiTarik; // Untuk laptop/mouse

        function mulaiTarik(e) {
            e.preventDefault(); // Paksa browser berhenti melakukan scroll layar
            
            if (e.type === 'touchstart') {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            } else {
                startX = e.clientX;
                startY = e.clientY;
            }

            kartu.style.zIndex = "1000";
            kartu.style.transition = "none"; // Matikan animasi saat ditarik agar jari tidak delay
            kartu.classList.add('bg-blue-400', 'scale-105', 'shadow-2xl');

            // Tangkap gerakan di seluruh layar
            document.ontouchend = lepasTarik;
            document.ontouchmove = prosesTarik;
            document.onmouseup = lepasTarik;
            document.onmousemove = prosesTarik;
        }

        function prosesTarik(e) {
            let gerakX, gerakY;
            
            if (e.type === 'touchmove') {
                gerakX = e.touches[0].clientX;
                gerakY = e.touches[0].clientY;
            } else {
                gerakX = e.clientX;
                gerakY = e.clientY;
            }

            posX = gerakX - startX;
            posY = gerakY - startY;

            // Geser kartu mengikuti koordinat jari
            kartu.style.transform = `translate(${posX}px, ${posY}px) rotate(2deg)`;
        }

        function lepasTarik(e) {
            // Matikan sensor seluruh layar
            document.ontouchend = null;
            document.ontouchmove = null;
            document.onmouseup = null;
            document.onmousemove = null;

            kartu.style.zIndex = "10";
            kartu.style.transition = "transform 0.3s ease"; // Nyalakan lagi animasi pantulan
            kartu.classList.remove('bg-blue-400', 'scale-105', 'shadow-2xl');

            // Ambil koordinat titik terakhir saat jari diangkat
            let akhirX, akhirY;
            if (e.type === 'touchend') {
                akhirX = e.changedTouches[0].clientX;
                akhirY = e.changedTouches[0].clientY;
            } else {
                akhirX = e.clientX;
                akhirY = e.clientY;
            }

            // Trik siluman: hilangkan sejenak kartu untuk melihat apa yang ada di baliknya
            kartu.style.display = 'none';
            let elemenDiBawah = document.elementFromPoint(akhirX, akhirY);
            kartu.style.display = 'flex';

            let kotakTarget = elemenDiBawah ? elemenDiBawah.closest('.kotak-target') : null;

            // Logika Penilaian
            if (kotakTarget && !kotakTarget.classList.contains('terisi')) {
                let idSoal = kartu.getAttribute('data-id');
                let idTarget = kotakTarget.getAttribute('data-target');

                if (idSoal === idTarget) {
                    // JAWABAN BENAR!
                    kartu.style.transform = 'translate(0px, 0px)';
                    kartu.style.position = 'static'; // Lepaskan dari mode melayang
                    kartu.ontouchstart = null; // Kunci kartu agar tidak bisa ditarik lagi
                    kartu.onmousedown = null;
                    
                    kartu.classList.remove('bg-blue-500');
                    kartu.classList.add('bg-emerald-500', 'w-full');
                    
                    kotakTarget.innerHTML = ''; 
                    kotakTarget.appendChild(kartu);
                    kotakTarget.classList.remove('border-slate-300', 'border-dashed');
                    kotakTarget.classList.add('border-emerald-500', 'bg-emerald-50', 'terisi', 'shadow-inner');
                    
                    matchState.skor += 100;
                    document.getElementById('skor-match').innerText = matchState.skor;
                    matchState.pasanganTerjawab++;

                    if (typeof playSoundEffect === 'function') playSoundEffect('correct');

                    // Cek Menang
                    if (matchState.pasanganTerjawab === matchState.dataSoal.length) {
                        setTimeout(() => {
                            if (typeof playSoundEffect === 'function') playSoundEffect('selebrasi');
                            if (typeof confetti === 'function') confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
                            
                            const areaPermainan = document.getElementById('area-permainan');
                            areaPermainan.innerHTML = `<div class="w-full text-center p-10 bg-slate-900 rounded-3xl mt-4 border-4 border-emerald-500"><h1 class="text-5xl font-black text-amber-400 mb-4 animate-bounce">LUAR BIASA!</h1><p class="text-white text-xl">Skor akhir: <span class="text-emerald-400 font-bold">${matchState.skor}</span></p><button onclick="mulaiGameMatch()" class="mt-6 bg-emerald-500 hover:bg-emerald-400 text-white font-black py-4 px-10 rounded-2xl shadow-lg active:scale-95">MAIN LAGI</button></div>`;
                        }, 500);
                    }
                } else {
                    // JAWABAN SALAH
                    kartu.style.transform = 'translate(0px, 0px)';
                    if (typeof playSoundEffect === 'function') playSoundEffect('wrong');
                    kotakTarget.classList.add('bg-rose-100', 'border-rose-500');
                    setTimeout(() => kotakTarget.classList.remove('bg-rose-100', 'border-rose-500'), 300);
                }
            } else {
                // DILEPAS DI LUAR KOTAK
                kartu.style.transform = 'translate(0px, 0px)';
            }
        }
    });
}
