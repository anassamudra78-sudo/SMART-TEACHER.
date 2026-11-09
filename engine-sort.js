// ==========================================================
// FILE: engine-sort.js
// FUNGSI: Mesin Game "Sort & Drop" (DARK MODE ELEGANT + SMOOTH DRAG)
// ==========================================================

let sortState = {
    skor: 0,
    itemTerjawab: 0,
    kategori: [
        { id: "isim", judul: "ISIM", subjudul: "Kata Benda", tema: "cyan" },
        { id: "fiil", judul: "FI'IL", subjudul: "Kata Kerja", tema: "emerald" }
    ],
    dataSoalAsli: [
        { id: "s1", soal: "كِتَابٌ", arti: "Buku", kat: "isim", tipe: "teks" },
        { id: "s2", soal: "🏃", arti: "Berlari", kat: "fiil", tipe: "gambar" },
        { id: "s3", soal: "مَدْرَسَةٌ", arti: "Sekolah", kat: "isim", tipe: "teks" },
        { id: "s4", soal: "✍️", arti: "Menulis", kat: "fiil", tipe: "gambar" },
        { id: "s5", soal: "🍎", arti: "Apel", kat: "isim", tipe: "gambar" },
        { id: "s6", soal: "جَلَسَ", arti: "Duduk", kat: "fiil", tipe: "teks" },
        { id: "s7", soal: "🕌", arti: "Masjid", kat: "isim", tipe: "gambar" },
        { id: "s8", soal: "يَذْهَبُ", arti: "Pergi", kat: "fiil", tipe: "teks" }
    ],
    dataSoal: []
};

function hitungSkalaOtomatisSort(jumlahSoal) {
    if (jumlahSoal <= 8) {
        return {
            tinggiKotak: "h-14 md:h-16",
            teksArab: "text-2xl md:text-3xl",
            teksEmoji: "text-4xl",
            gap: "gap-2 md:gap-3",
            gridKiri: "grid-cols-2 md:grid-cols-2",
        };
    } else {
        return {
            tinggiKotak: "h-10 md:h-12",
            teksArab: "text-xl",
            teksEmoji: "text-2xl md:text-3xl",
            gap: "gap-2",
            gridKiri: "grid-cols-3 md:grid-cols-4",
        };
    }
}

function bukaSetupGame(jenisGame) {
    if (jenisGame === 'sort') {
        mulaiGameSort();
    } else if (jenisGame === 'match') {
        if (typeof mulaiGameMatch === 'function') mulaiGameMatch();
    } else if (jenisGame === 'build') {
        if (typeof mulaiGameBuild === 'function') mulaiGameBuild();
    }
}

function mulaiGameSort(isRenderUlang = false) {
    const container = document.getElementById('main-content');
    if (!isRenderUlang) {
        sortState.skor = 0;
        sortState.itemTerjawab = 0;
        sortState.dataSoal = sortState.dataSoalAsli.map(item => ({...item, terjawab: false})).sort(() => Math.random() - 0.5);
    }

    let skala = hitungSkalaOtomatisSort(sortState.dataSoal.length);

    container.innerHTML = `
        <div class="max-w-7xl mx-auto p-2 md:p-4 mt-2 select-none fade-in pb-20">
            
            <!-- HEADER (TEMA GELAP) -->
            <div class="flex justify-between items-center bg-slate-900 p-3 md:p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] mb-4 border border-slate-700">
                <h2 class="text-base md:text-xl font-black text-white flex items-center gap-2 drop-shadow-md"><i class="fa-solid fa-layer-group text-amber-400"></i>SORT & DROP</h2>
                <div class="font-bold text-amber-400 bg-slate-800 px-4 py-1 md:py-2 rounded-xl border border-slate-700 shadow-inner">Nilai: <span id="skor-sort" class="font-black text-white text-lg md:text-xl ml-1">${Math.round(sortState.skor)}</span></div>
                <button onclick="bukaDragAndDropArena()" class="bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-1 md:py-2 rounded-xl font-bold transition-colors border border-slate-600">Keluar</button>
            </div>

            <!-- PAPAN MAIN (TEMA GELAP SAMA DENGAN MATCH) -->
            <div class="flex flex-col lg:flex-row gap-4 md:gap-6 bg-[#0f172a] p-4 md:p-6 rounded-3xl border border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.4)] relative overflow-hidden">
                
                <!-- Efek cahaya samar di latar -->
                <div class="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                <!-- WADAH KIRI (PILIH BALOK) -->
                <div class="w-full lg:w-5/12 flex flex-col z-10" id="wadah-kiri-sort">
                    <div class="flex justify-between items-center border-b border-slate-700/50 pb-2 mb-4">
                        <h3 class="font-bold text-slate-400 uppercase tracking-widest text-xs">Pilih Balok</h3>
                        <span class="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700">${sortState.dataSoal.length} Soal</span>
                    </div>
                    
                    <div class="grid ${skala.gridKiri} ${skala.gap}" id="grid-balok-sort">
                        ${sortState.dataSoal.map(item => {
                            if (item.terjawab) return '';
                            let isGambar = item.tipe === 'gambar';
                            let isiKartu = isGambar 
                                ? `<span class="drop-shadow-lg ${skala.teksEmoji} pointer-events-none mt-1">${item.soal}</span>` 
                                : `<span class="drop-shadow-lg font-arabic ${skala.teksArab} text-center leading-none text-white pointer-events-none mt-1">${item.soal}</span>`;
                            
                            return `
                                <div class="kartu-soal-sort bg-slate-800 border-2 border-slate-600 text-slate-200 touch-none rounded-xl md:rounded-2xl flex flex-col justify-center items-center ${skala.tinggiKotak} shadow-lg transition-transform cursor-grab relative overflow-hidden p-1" data-id="${item.id}" data-kat="${item.kat}">
                                    ${isiKartu}
                                    <span class="text-[9px] text-slate-400 font-bold uppercase mt-1 pointer-events-none tracking-widest">${item.arti}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <div class="hidden lg:block w-px bg-slate-700/50 mx-1 z-10"></div>

                <!-- WADAH KANAN (KATEGORI) -->
                <div class="w-full lg:w-7/12 flex flex-col z-10">
                    <h3 class="text-center font-bold text-slate-400 mb-4 uppercase tracking-widest text-xs border-b border-slate-700/50 pb-2">Kelompokkan ke Kotak</h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-[300px]">
                        ${sortState.kategori.map(kat => {
                            let isCyan = kat.tema === 'cyan';
                            let colorTheme = isCyan ? 'cyan' : 'emerald';
                            
                            // Mengubah wujud balok yang sudah masuk keranjang menjadi lebih compact
                            let balokMasuk = sortState.dataSoal.filter(s => s.terjawab && s.kat === kat.id).map(b => {
                                let visual = b.tipe === 'gambar' ? b.soal : b.soal;
                                let fontClass = b.tipe === 'gambar' ? 'text-sm' : 'font-arabic text-base';
                                
                                return `
                                    <div class="w-[calc(50%-4px)] lg:w-[calc(50%-6px)] bg-slate-800 border-l-4 border-${colorTheme}-500 border-y border-r border-slate-700 rounded-lg p-1.5 flex items-center gap-2 shadow-sm">
                                        <div class="w-6 h-6 rounded bg-slate-900 flex items-center justify-center shrink-0 border border-slate-700">
                                            <span class="${fontClass} text-white">${visual}</span>
                                        </div>
                                        <span class="text-[9px] font-bold text-slate-300 uppercase truncate">${b.arti}</span>
                                    </div>
                                `;
                            }).join('');

                            return `
                                <div class="kotak-target-sort flex flex-col h-full bg-slate-900 border-2 border-dashed border-${colorTheme}-500/40 rounded-2xl relative overflow-hidden transition-all" data-target="${kat.id}" data-tema="${colorTheme}">
                                    <div class="bg-${colorTheme}-950/40 border-b border-${colorTheme}-500/30 p-2 md:p-3 text-center shrink-0 z-10">
                                        <h2 class="text-${colorTheme}-400 font-black tracking-widest text-sm md:text-base">${kat.judul}</h2>
                                        <p class="text-[8px] md:text-[9px] text-slate-400 uppercase font-bold tracking-wider">${kat.subjudul}</p>
                                    </div>
                                    
                                    <!-- Area isi bisa otomatis scroll kalau soalnya sangat banyak -->
                                    <div class="area-drop-sort flex-1 p-2 md:p-3 flex flex-wrap content-start gap-1.5 md:gap-2 overflow-y-auto relative z-10">
                                        <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] ${balokMasuk ? 'hidden' : ''}">
                                            <i class="fa-solid fa-box-open text-6xl text-${colorTheme}-500"></i>
                                        </div>
                                        ${balokMasuk}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

            </div>
        </div>
    `;
    pasangSensorSort();
}

function pasangSensorSort() {
    const kartus = document.querySelectorAll('.kartu-soal-sort');
    const wadahKiri = document.getElementById('grid-balok-sort');
    const kolomKiriUtama = document.getElementById('wadah-kiri-sort');

    kartus.forEach(kartu => {
        let terkunci = false;

        kartu.addEventListener('touchstart', function(e) {
            if(terkunci) return;
            
            // JURUS MELAYANG (Seperti Match)
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
            
            // JURUS TENGAH JARI (Seperti Match)
            kartu.style.left = (sentuhan.clientX - (kartu.offsetWidth / 2)) + 'px';
            kartu.style.top = (sentuhan.clientY - (kartu.offsetHeight / 2)) + 'px';
        }, {passive: false});

        kartu.addEventListener('touchend', function(e) {
            if(terkunci) return;
            
            // KEMBALIKAN LAPISAN
            kolomKiriUtama.style.zIndex = '10';
            kartu.classList.remove('scale-105', 'shadow-2xl');
            
            let sentuhan = e.changedTouches[0];
            kartu.style.display = 'none';
            let elemenDiBawah = document.elementFromPoint(sentuhan.clientX, sentuhan.clientY);
            kartu.style.display = 'flex';

            let kotakTarget = elemenDiBawah ? elemenDiBawah.closest('.kotak-target-sort') : null;

            if (kotakTarget) {
                if (kartu.getAttribute('data-kat') === kotakTarget.getAttribute('data-target')) {
                    terkunci = true;
                    
                    let idSoal = kartu.getAttribute('data-id');
                    let soalData = sortState.dataSoal.find(s => s.id === idSoal);
                    if(soalData) soalData.terjawab = true;
                    
                    let tema = kotakTarget.getAttribute('data-tema');
                    kotakTarget.classList.remove('border-dashed');
                    kotakTarget.classList.add('border-solid', `border-${tema}-500`, `bg-${tema}-900/30`);
                    setTimeout(() => {
                        kotakTarget.classList.add('border-dashed');
                        kotakTarget.classList.remove('border-solid', `border-${tema}-500`, `bg-${tema}-900/30`);
                    }, 200);

                    // Re-render keranjang agar balok terpasang otomatis
                    mulaiGameSort(true);
                    
                    let nilaiPerSoal = 100 / sortState.dataSoal.length;
                    sortState.skor += nilaiPerSoal;
                    sortState.itemTerjawab++;
                    
                    document.getElementById('skor-sort').innerText = Math.round(sortState.skor);
                    if (typeof playSoundEffect === 'function') playSoundEffect('correct'); 

                    if (sortState.itemTerjawab === sortState.dataSoal.length) {
                        setTimeout(() => selebrasiKemenanganSort(), 400);
                    }
                } else {
                    kartu.style.position = 'static';
                    wadahKiri.appendChild(kartu);
                    if (typeof playSoundEffect === 'function') playSoundEffect('wrong'); 
                    
                    kotakTarget.classList.remove('border-dashed');
                    kotakTarget.classList.add('border-solid', 'border-rose-500', 'bg-rose-900/40');
                    setTimeout(() => {
                        kotakTarget.classList.add('border-dashed');
                        kotakTarget.classList.remove('border-solid', 'border-rose-500', 'bg-rose-900/40');
                    }, 300);
                }
            } else {
                kartu.style.position = 'static';
                wadahKiri.appendChild(kartu);
            }
        });
    });
}

function selebrasiKemenanganSort() {
    let nilaiAkhir = Math.round(sortState.skor);
    if (typeof playCelebrationAudio === 'function') {
        playCelebrationAudio(nilaiAkhir);
    }
    const container = document.getElementById('main-content');
    container.innerHTML = `
        <div class="max-w-2xl mx-auto mt-10 p-8 bg-slate-900 rounded-[2.5rem] text-center border border-slate-700 shadow-[0_0_40px_rgba(251,191,36,0.2)] fade-in">
            <i class="fa-solid fa-medal text-6xl text-amber-400 mb-6 animate-bounce drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"></i>
            <h1 class="text-4xl font-black text-white mb-2">SORTING SELESAI!</h1>
            
            <div class="bg-slate-800 p-6 rounded-3xl mb-8 mt-6 border border-slate-700">
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Nilai Akhir</p>
                <p class="text-7xl font-black text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]">${nilaiAkhir}</p>
            </div>
            
            <div class="flex justify-center gap-4">
                <button onclick="bukaDragAndDropArena()" class="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-2xl border border-slate-600 transition-colors">Menu Game</button>
                <button onclick="mulaiGameSort()" class="bg-amber-500 hover:bg-amber-400 text-slate-900 font-black py-3 px-8 rounded-2xl shadow-[0_0_15px_rgba(251,191,36,0.4)] transition-transform">MAIN LAGI</button>
            </div>
        </div>
    `;
}
