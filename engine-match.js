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

    let soalAcak = [...matchState.dataSoal].sort(() => Math.random() - 0.5);
    let artiAcak = [...matchState.dataSoal].sort(() => Math.random() - 0.5);

    container.innerHTML = `
        <div class="max-w-4xl mx-auto p-4 md:p-8 mt-4 select-none touch-none">
            <div class="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm mb-8 border border-slate-200">
                <h2 class="text-xl font-black text-blue-600">MATCH & DROP</h2>
                <div class="font-bold text-amber-500">Skor: <span id="skor-match" class="font-black text-amber-600">0</span></div>
                <button onclick="bukaDragAndDropArena()" class="bg-slate-100 px-4 py-2 rounded-xl font-bold">Keluar</button>
            </div>

            <div class="flex justify-between gap-4 relative">
                <div class="w-1/2 flex flex-col gap-4" id="wadah-kiri">
                    ${soalAcak.map(item => `
                        <div class="kartu-soal bg-blue-500 text-white font-arabic text-3xl font-bold p-5 rounded-2xl text-center flex justify-center items-center h-[90px]" data-id="${item.id}">
                            ${item.soal}
                        </div>
                    `).join('')}
                </div>

                <div class="w-1/2 flex flex-col gap-4">
                    ${artiAcak.map(item => `
                        <div class="kotak-target bg-white border-4 border-dashed border-slate-300 text-slate-500 font-bold text-lg p-5 rounded-2xl text-center flex items-center justify-center h-[90px]" data-target="${item.id}">
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
            kartu.style.zIndex = 9999;
            kartu.classList.add('bg-blue-400', 'scale-105');
        }, {passive: false});

        kartu.addEventListener('touchmove', function(e) {
            if(terkunci) return;
            e.preventDefault(); // Mematikan scroll layar

            // Kartu dipaksa menempel persis di tengah jari
            let sentuhan = e.touches[0];
            kartu.style.position = 'fixed';
            kartu.style.left = (sentuhan.clientX - (kartu.offsetWidth / 2)) + 'px';
            kartu.style.top = (sentuhan.clientY - (kartu.offsetHeight / 2)) + 'px';
        }, {passive: false});

        kartu.addEventListener('touchend', function(e) {
            if(terkunci) return;
            kartu.classList.remove('bg-blue-400', 'scale-105');
            
            // Cek elemen target di bawah jari saat dilepas
            let sentuhan = e.changedTouches[0];
            kartu.style.display = 'none';
            let elemenDiBawah = document.elementFromPoint(sentuhan.clientX, sentuhan.clientY);
            kartu.style.display = 'flex';

            let kotakTarget = elemenDiBawah ? elemenDiBawah.closest('.kotak-target') : null;

            if (kotakTarget && !kotakTarget.classList.contains('terisi')) {
                if (kartu.getAttribute('data-id') === kotakTarget.getAttribute('data-target')) {
                    // BENAR: Kunci posisi kartu di dalam kotak target
                    terkunci = true;
                    kartu.style.position = 'static';
                    kartu.classList.replace('bg-blue-500', 'bg-emerald-500');
                    
                    kotakTarget.innerHTML = '';
                    kotakTarget.appendChild(kartu);
                    kotakTarget.classList.replace('border-dashed', 'border-solid');
                    kotakTarget.classList.replace('border-slate-300', 'border-emerald-500');
                    kotakTarget.classList.add('terisi');
                    
                    matchState.skor += 100;
                    document.getElementById('skor-match').innerText = matchState.skor;
                } else {
                    // SALAH: Kembalikan ke kiri
                    kartu.style.position = 'static';
                    wadahKiri.appendChild(kartu);
                }
            } else {
                // DILEPAS DI LUAR KOTAK: Kembalikan ke kiri
                kartu.style.position = 'static';
                wadahKiri.appendChild(kartu);
            }
        });
    });
}
