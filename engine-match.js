// ==========================================================
// FILE: engine-match.js
// FUNGSI: Mesin Utama Game "Match & Drop" (Anti-Macet)
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
            <div class="flex justify-between gap-4 md:gap-10 relative">
                
                <!-- KIRI: KOSAKATA ARAB -->
                <div class="w-1/2 flex flex-col gap-4 z-20">
                    ${soalAcak.map(item => `
                        <div class="kartu-soal bg-blue-500 text-white font-arabic text-3xl md:text-4xl font-bold p-5 rounded-2xl shadow-lg text-center cursor-grab transition-transform flex justify-center items-center min-h-[90px]" data-id="${item.id}" style="touch-action: none; user-select: none;">
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

    aktifkanSensorJari();
}

function aktifkanSensorJari() {
    const kartus = document.querySelectorAll('.kartu-soal');
    
    kartus.forEach(kartu => {
        let terpasang = false;
        let startX = 0, startY = 0;
        let currentX = 0, currentY = 0;

        function mulaiDrag(e) {
            if(terpasang) return;
            // Deteksi posisi sentuhan (mouse atau jari)
            let clientX = e.clientX || (e.touches && e.touches[0].clientX);
            let clientY = e.clientY || (e.touches && e.touches[0].clientY);
            
            startX = clientX - currentX;
            startY = clientY - currentY;
            
            kartu.style.zIndex = 1000;
            kartu.style.transition = 'none';
            kartu.classList.add('scale-105', 'rotate-2', 'shadow-2xl', 'bg-blue-400');
            
            // Kunci event ke seluruh dokumen agar tidak lepas kalau digeser cepat
            document.addEventListener('mousemove', prosesDrag);
            document.addEventListener('touchmove', prosesDrag, {passive: false});
            document.addEventListener('mouseup', selesaiDrag);
            document.addEventListener('touchend', selesaiDrag);
        }

        function prosesDrag(e) {
            if(terpasang) return;
            e.preventDefault(); // PENTING: Mencegah layar HP ikut tergulung (scroll) saat menggeser kotak

            let clientX = e.clientX || (e.touches && e.touches[0].clientX);
            let clientY = e.clientY || (e.touches && e.touches[0].clientY);
            
            currentX = clientX - startX;
            currentY = clientY - startY;
            
            kartu.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.05) rotate(2deg)`;
        }

        function selesaiDrag(e) {
            document.removeEventListener('mousemove', prosesDrag);
            document.removeEventListener('touchmove', prosesDrag);
            document.removeEventListener('mouseup', selesaiDrag);
            document.removeEventListener('touchend', selesaiDrag);
            
            if(terpasang) return;
            
            kartu.classList.remove('scale-105', 'rotate-2', 'shadow-2xl', 'bg-blue-400');
            kartu.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; // Animasi memantul

            // Ambil titik koordinat saat jari dilepaskan
            let clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
            let clientY = e.clientY || (e.changedTouches && e.changedTouches[0].clientY);

            // Trik membaca elemen di bawah kartu
            kartu.style.display = 'none';
            let elemenDiBawah = document.elementFromPoint(clientX, clientY);
            kartu.style.display = 'flex'; 

            let kotakTarget = elemenDiBawah ? elemenDiBawah.closest('.kotak-target') : null;

            // Jika jari dilepas tepat di atas kotak jawaban
            if (kotakTarget && !kotakTarget.classList.contains('terisi')) {
                let idSoal = kartu.getAttribute('data-id');
                let idTarget = kotakTarget.getAttribute('data-target');

                if (idSoal === idTarget) {
                    // JIKA BENAR
                    terpasang = true;
                    kartu.style.transform = 'translate(0px, 0px)';
                    currentX = 0; currentY = 0;
                    
                    kartu.classList.remove('bg-blue-500', 'cursor-grab');
                    kartu.classList.add('bg-emerald-500', 'cursor-default', 'w-full');
                    
                    kotakTarget.innerHTML = ''; 
                    kotakTarget.appendChild(kartu); 
                    kotakTarget.classList.remove('border-slate-300', 'border-dashed');
                    kotakTarget.classList.add('border-emerald-500', 'border-solid', 'bg-emerald-50', 'terisi', 'shadow-inner');
                    
                    matchState.skor += 100;
                    document.getElementById('skor-match').innerText = matchState.skor;
                    matchState.pasanganTerjawab++;

                    if (typeof playSoundEffect === 'function') playSoundEffect('correct');

                    if (matchState.pasanganTerjawab === matchState.dataSoal.length) {
                        setTimeout(() => {
                            if (typeof playSoundEffect === 'function') playSoundEffect('selebrasi');
                            if (typeof confetti === 'function') confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
                            
                            const areaPermainan = document.querySelector('.flex.justify-between.gap-4.md\\:gap-10');
                            areaPermainan.innerHTML = `<div class="w-full text-center p-10 bg-slate-900 rounded-3xl mt-4 border-4 border-amber-500/30"><h1 class="text-5xl font-black text-amber-400 mb-4 animate-bounce">LUAR BIASA!</h1><p class="text-white text-xl">Skor akhir: <span class="text-emerald-400 font-bold">${matchState.skor}</span></p><button onclick="mulaiGameMatch()" class="mt-6 bg-emerald-500 hover:bg-emerald-400 text-white font-black py-4 px-10 rounded-2xl shadow-lg transition-transform active:scale-95">MAIN LAGI</button></div>`;
                        }, 500);
                    }
                } else {
                    // JIKA SALAH
                    kartu.style.transform = 'translate(0px, 0px)';
                    currentX = 0; currentY = 0;
                    if (typeof playSoundEffect === 'function') playSoundEffect('wrong');
                    
                    kotakTarget.classList.add('bg-rose-100', 'border-rose-500');
                    setTimeout(() => kotakTarget.classList.remove('bg-rose-100', 'border-rose-500'), 300);
                }
            } else {
                // JIKA DILEPAS DI LUAR AREA
                kartu.style.transform = 'translate(0px, 0px)';
                currentX = 0; currentY = 0;
            }
        }

        // Pasang sensor ganda (Mouse & Layar Sentuh HP)
        kartu.addEventListener('mousedown', mulaiDrag);
        kartu.addEventListener('touchstart', mulaiDrag, {passive: false});
    });
}
