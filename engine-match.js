// ==========================================================
// FILE: engine-match.js
// FUNGSI: Mesin Utama Game "Match & Drop" (Cocokkan Pasangan)
// ==========================================================

let matchState = {
    skor: 0,
    pasanganTerjawab: 0,
    // Ini bank soalnya. Nanti Bapak bisa tambah sebanyak apapun.
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

    // Sistem cerdas: Acak urutan soal (kiri) dan arti (kanan) setiap kali main
    let soalAcak = [...matchState.dataSoal].sort(() => Math.random() - 0.5);
    let artiAcak = [...matchState.dataSoal].sort(() => Math.random() - 0.5);

    container.innerHTML = `
        <div class="max-w-4xl mx-auto p-4 md:p-8 mt-4 fade-in touch-none select-none">
            <!-- HEADER GAME -->
            <div class="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm mb-8 border border-slate-200">
                <h2 class="text-xl md:text-2xl font-black text-blue-600 flex items-center"><i class="fa-solid fa-puzzle-piece mr-2"></i>MATCH & DROP</h2>
                <div class="text-base md:text-lg font-bold text-amber-500 bg-amber-50 px-4 py-1 rounded-xl">Skor: <span id="skor-match" class="font-black text-amber-600 text-xl">0</span></div>
                <button onclick="bukaDragAndDropArena()" class="bg-slate-100 hover:bg-rose-500 hover:text-white text-slate-700 px-4 py-2 rounded-xl font-bold transition-colors">
                    Keluar
                </button>
            </div>

            <!-- PAPAN MAIN -->
            <div class="flex justify-between gap-4 md:gap-10 relative">
                
                <!-- KIRI: KOSAKATA ARAB (BISA DISERET) -->
                <div class="w-1/2 flex flex-col gap-4 z-20">
                    ${soalAcak.map(item => `
                        <div class="kartu-soal bg-blue-500 text-white font-arabic text-3xl md:text-4xl font-bold p-5 rounded-2xl shadow-lg text-center cursor-grab transition-transform flex justify-center items-center h-[90px]" data-id="${item.id}" style="touch-action: none;">
                            ${item.soal}
                        </div>
                    `).join('')}
                </div>

                <!-- KANAN: KOTAK TARGET JAWABAN -->
                <div class="w-1/2 flex flex-col gap-4 z-10">
                    ${artiAcak.map(item => `
                        <div class="kotak-target bg-white border-4 border-dashed border-slate-300 text-slate-500 font-bold text-lg md:text-xl p-5 rounded-2xl text-center flex items-center justify-center h-[90px] transition-colors relative overflow-hidden" data-target="${item.id}">
                            <span class="pointer-events-none">${item.arti}</span>
                        </div>
                    `).join('')}
                </div>

            </div>
        </div>
    `;

    // Nyalakan sensor sentuhan jari
    aktifkanSensorJari();
}

function aktifkanSensorJari() {
    const kartus = document.querySelectorAll('.kartu-soal');
    
    kartus.forEach(kartu => {
        let posisiAwalX = 0, posisiAwalY = 0;
        let geserX = 0, geserY = 0;
        let terpasang = false;

        kartu.addEventListener('pointerdown', (e) => {
            if (terpasang) return;
            kartu.setPointerCapture(e.pointerId);
            posisiAwalX = e.clientX;
            posisiAwalY = e.clientY;
            kartu.style.zIndex = 100;
            kartu.style.transition = 'none';
            kartu.classList.add('scale-105', 'rotate-2', 'shadow-2xl', 'bg-blue-400');
        });

        kartu.addEventListener('pointermove', (e) => {
            if (!kartu.hasPointerCapture(e.pointerId)) return;
            geserX = e.clientX - posisiAwalX;
            geserY = e.clientY - posisiAwalY;
            kartu.style.transform = `translate(${geserX}px, ${geserY}px) scale(1.05) rotate(2deg)`;
        });

        kartu.addEventListener('pointerup', (e) => {
            if (terpasang) return;
            kartu.releasePointerCapture(e.pointerId);
            kartu.classList.remove('scale-105', 'rotate-2', 'shadow-2xl', 'bg-blue-400');
            kartu.style.transition = 'transform 0.3s ease';

            // Cek elemen apa yang ada di bawah jari saat dilepas
            kartu.style.display = 'none';
            let elemenDiBawah = document.elementFromPoint(e.clientX, e.clientY);
            kartu.style.display = 'flex'; // kembalikan ke display flex agar teks di tengah

            let kotakTarget = elemenDiBawah ? elemenDiBawah.closest('.kotak-target') : null;

            // Jika jari dilepas tepat di atas kotak jawaban
            if (kotakTarget && !kotakTarget.classList.contains('terisi')) {
                let idSoal = kartu.getAttribute('data-id');
                let idTarget = kotakTarget.getAttribute('data-target');

                if (idSoal === idTarget) {
                    // 1. JIKA JAWABAN BENAR!
                    terpasang = true;
                    
                    // Masukkan kartu Arab ke dalam kotak Target Indonesia
                    kartu.style.transform = 'translate(0,0)';
                    kartu.style.position = 'static';
                    kartu.classList.remove('bg-blue-500', 'cursor-grab');
                    kartu.classList.add('bg-emerald-500', 'cursor-default', 'w-full');
                    
                    kotakTarget.innerHTML = ''; // Hapus teks arti Indonesia
                    kotakTarget.appendChild(kartu); // Taruh kotak Arab ke dalamnya
                    kotakTarget.classList.remove('border-slate-300', 'border-dashed');
                    kotakTarget.classList.add('border-emerald-500', 'border-solid', 'bg-emerald-50', 'terisi');
                    
                    // Tambah skor 100 poin
                    matchState.skor += 100;
                    document.getElementById('skor-match').innerText = matchState.skor;
                    matchState.pasanganTerjawab++;

                    if (typeof playSoundEffect === 'function') playSoundEffect('correct'); // Bunyi cling!

                    // Cek apakah semua sudah terjawab
                    if (matchState.pasanganTerjawab === matchState.dataSoal.length) {
                        setTimeout(() => {
                            if (typeof playSoundEffect === 'function') playSoundEffect('selebrasi');
                            if (typeof confetti === 'function') confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
                            
                            // Ubah tombol keluar jadi Main Lagi
                            const areaPermainan = document.querySelector('.flex.justify-between.gap-4');
                            areaPermainan.innerHTML = `<div class="w-full text-center p-10 bg-slate-900 rounded-3xl mt-4"><h1 class="text-5xl font-black text-amber-400 mb-4">LUAR BIASA!</h1><p class="text-white text-xl">Semua pasangan cocok sempurna. Skor akhir: ${matchState.skor}</p><button onclick="mulaiGameMatch()" class="mt-6 bg-emerald-500 text-white font-black py-3 px-8 rounded-xl shadow-lg">MAIN LAGI</button></div>`;
                        }, 500);
                    }
                } else {
                    // 2. JIKA JAWABAN SALAH (Kembali memantul ke kiri)
                    kartu.style.transform = 'translate(0, 0)';
                    if (typeof playSoundEffect === 'function') playSoundEffect('wrong'); // Bunyi tet!
                    
                    kotakTarget.classList.add('bg-rose-100', 'border-rose-500');
                    setTimeout(() => kotakTarget.classList.remove('bg-rose-100', 'border-rose-500'), 300);
                }
            } else {
                // 3. JIKA DILEPAS DI SEMBARANG TEMPAT (Memantul ke kiri)
                kartu.style.transform = 'translate(0, 0)';
            }
        });
    });
}
