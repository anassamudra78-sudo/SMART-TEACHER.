// ==========================================================
// FILE: engine-sort.js
// FUNGSI: Mesin "Sort & Drop" (DENGAN TOP BAR GLOBAL & TIMER)
// ==========================================================

let sortState = {
    skor: 0,
    itemTerjawab: 0,
    layout: 'kiri-kanan', 
    sisaWaktu: 0,
    timerInterval: null,
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

function hitungSkalaOtomatisSort(jumlahSoal, isKiriKanan) {
    if (isKiriKanan) {
        if (jumlahSoal <= 8) {
            return { tinggiKotak: "h-14 md:h-16", teksArab: "text-2xl md:text-3xl", teksEmoji: "text-4xl", gap: "gap-2 md:gap-3", gridKiri: "grid-cols-2 md:grid-cols-2" };
        } else {
            return { tinggiKotak: "h-10 md:h-12", teksArab: "text-xl", teksEmoji: "text-2xl md:text-3xl", gap: "gap-2", gridKiri: "grid-cols-3 md:grid-cols-4" };
        }
    } else {
        if (jumlahSoal <= 8) {
            return { tinggiKotak: "h-10 md:h-12", teksArab: "text-xl md:text-2xl", teksEmoji: "text-2xl md:text-3xl", gap: "gap-1.5 md:gap-2", gridKiri: "grid-cols-4" };
        } else {
            return { tinggiKotak: "h-8 md:h-10", teksArab: "text-lg", teksEmoji: "text-xl", gap: "gap-1 md:gap-1.5", gridKiri: "grid-cols-5 md:grid-cols-6 lg:grid-cols-8" };
        }
    }
}

function bukaSetupGame(jenisGame) {
    if (jenisGame === 'match' && typeof mulaiGameMatch === 'function') {
        mulaiGameMatch();
    } else if (jenisGame === 'sort' && typeof mulaiGameSort === 'function') {
        mulaiGameSort();
    } else if (jenisGame === 'build' && typeof mulaiGameBuild === 'function') {
        mulaiGameBuild();
    }
}

function ubahGayaLayoutSort(gayaBaru) {
    sortState.layout = gayaBaru;
    mulaiGameSort(true); 
}

// Variabel penyimpan ronde soal (Multi-Soal & Rentang)
let sortPaketRonde = [];
let sortIndexRonde = 0;

function jalankanTimerSort(isRenderUlang) {
    if (isRenderUlang) return; 
    
    sortState.sisaWaktu = window.dndDurasiPilihan || 15;
    
    if (sortState.timerInterval) clearInterval(sortState.timerInterval);
    if (typeof updateTimerDnd === 'function') updateTimerDnd(sortState.sisaWaktu);

    sortState.timerInterval = setInterval(() => {
        sortState.sisaWaktu--;
        if (typeof updateTimerDnd === 'function') updateTimerDnd(sortState.sisaWaktu);

        if (sortState.sisaWaktu <= 5 && sortState.sisaWaktu > 0) {
             if (typeof playTick === 'function') playTick(900);
        }

        if (sortState.sisaWaktu <= 0) {
            clearInterval(sortState.timerInterval);
            if (typeof playDndSound === 'function') playDndSound('salah');
            
            // Lanjut ke paket soal berikutnya jika waktu ronde habis
            sortIndexRonde++;
            if (sortIndexRonde < sortPaketRonde.length) {
                setTimeout(() => mulaiGameSort(false, true), 800);
            } else {
                selebrasiKemenanganSort();
            }
        }
    }, 1000);
}

function mulaiGameSort(isRenderUlang = false, lanjutRondeBerikutnya = false) {
    const subtitleEl = document.getElementById('dnd-topbar-subtitle');
    const container = document.getElementById('dnd-game-container');
    if (!container) return;

    // 1. Jika baru mulai dari lobi, kelompokkan soal berdasarkan noSoal dan filter sesuai rentang
    if (!isRenderUlang && !lanjutRondeBerikutnya) {
        sortState.skor = 0;
        sortIndexRonde = 0;
        if (typeof updateSkorDnd === 'function') updateSkorDnd(0);

        let sumberData = (AppState.db.dnd && AppState.db.dnd.sort && AppState.db.dnd.sort.length > 0)
            ? JSON.parse(JSON.stringify(AppState.db.dnd.sort))
            : JSON.parse(JSON.stringify(sortState.dataSoalAsli));

        let kelompok = {};
        sumberData.forEach(item => {
            let no = parseInt(item.noSoal) || 1;
            if (!kelompok[no]) kelompok[no] = [];
            kelompok[no].push(item);
        });

        let daftarNomor = Object.keys(kelompok).map(Number).sort((a, b) => a - b);

        const dari = (window.dndRentang && window.dndRentang.dari) ? window.dndRentang.dari : 1;
        const sampai = (window.dndRentang && window.dndRentang.sampai) ? window.dndRentang.sampai : daftarNomor.length;
        daftarNomor = daftarNomor.slice(dari - 1, sampai);

        sortPaketRonde = daftarNomor.map(no => ({ noSoal: no, items: kelompok[no] }));

        if (window.dndRentang && window.dndRentang.acak) {
            sortPaketRonde.sort(() => Math.random() - 0.5);
        }
    }

    if (sortPaketRonde.length === 0 || sortIndexRonde >= sortPaketRonde.length) {
        selebrasiKemenanganSort();
        return;
    }

    const paketAktif = sortPaketRonde[sortIndexRonde];

    // 2. Siapkan data soal untuk ronde aktif (kecuali saat hanya ganti layout)
    if (!isRenderUlang) {
        sortState.itemTerjawab = 0;
        sortState.dataSoalAsli = paketAktif.items;
        sortState.dataSoal = sortState.dataSoalAsli.map(item => ({...item, terjawab: false, salah: 0})).sort(() => Math.random() - 0.5);
    }

    if (subtitleEl) {
        subtitleEl.innerText = `Sort & Drop • Soal ${sortIndexRonde + 1} dari ${sortPaketRonde.length} (Paket #${paketAktif.noSoal})`;
    }

    let isKiriKanan = sortState.layout === 'kiri-kanan';
    let skala = hitungSkalaOtomatisSort(sortState.dataSoal.length, isKiriKanan);

    let classContainer = isKiriKanan 
        ? "max-w-7xl mx-auto p-2 md:p-4 select-none fade-in pb-20 w-full h-full" 
        : "max-w-7xl mx-auto px-2 md:px-4 pt-1 pb-4 select-none fade-in w-full h-full";
        
    let classHeader = isKiriKanan 
        ? "flex flex-wrap justify-between items-center bg-slate-900/90 backdrop-blur-md p-2 md:p-3 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] mb-4 border border-indigo-500/20 gap-3 relative z-10"
        : "flex flex-wrap justify-between items-center bg-slate-900/90 backdrop-blur-md p-2 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] mb-2 border border-indigo-500/20 gap-2 relative z-10";

    let classPapan = isKiriKanan
        ? "flex flex-col lg:flex-row gap-4 md:gap-6 bg-slate-900/90 backdrop-blur-md p-4 md:p-6 rounded-3xl border border-indigo-500/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)] relative overflow-hidden min-h-[480px]"
        : "flex flex-col gap-2 md:gap-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-3xl border border-indigo-500/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)] relative overflow-hidden min-h-[480px]";

    let classWadahKiri = isKiriKanan ? "w-full lg:w-5/12 flex flex-col z-10" : "w-full flex flex-col z-10";
    let classWadahKanan = isKiriKanan ? "w-full lg:w-7/12 flex flex-col z-10" : "w-full flex flex-col z-10";
    
    let pembatas = isKiriKanan 
        ? `<div class="hidden lg:block w-px bg-slate-700/50 mx-1 z-10"></div>` 
        : `<div class="w-full h-px bg-slate-700/50 my-1 z-10"></div>`;

    let headerWadahKiri = isKiriKanan
        ? `<div class="flex justify-between items-center border-b border-slate-700/50 pb-2 mb-4">
             <h3 class="font-bold text-slate-300 uppercase tracking-widest text-xs">Pilih Balok</h3>
             <span class="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700">${sortState.dataSoal.length} Item</span>
           </div>`
        : `<div class="flex justify-between items-center border-b border-slate-700/50 pb-1 mb-2">
             <h3 class="font-bold text-slate-300 uppercase tracking-widest text-[10px]">Pilih Balok</h3>
             <span class="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700">${sortState.dataSoal.length} Item</span>
           </div>`;

    let headerKategori = isKiriKanan
        ? `<h3 class="text-center font-bold text-slate-300 mb-4 uppercase tracking-widest text-xs border-b border-slate-700/50 pb-2">Kelompokkan ke Kotak</h3>`
        : `<h3 class="text-center font-bold text-slate-300 mb-2 uppercase tracking-widest text-[10px] border-b border-slate-700/50 pb-1">Kelompokkan ke Kotak</h3>`;

    let gridKategori = isKiriKanan
        ? "grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-[300px]"
        : "grid grid-cols-1 md:grid-cols-2 gap-3 h-full min-h-[230px] md:min-h-[250px]";

    container.innerHTML = `
        <div class="min-h-screen w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 py-3 px-2">
            <div class="${classContainer}">
                
                <div class="${classHeader}">
                    <span class="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-black uppercase tracking-wider">
                        Soal ${sortIndexRonde + 1} dari ${sortPaketRonde.length}
                    </span>
                    <div class="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 shrink-0 shadow-inner">
                        <button onclick="ubahGayaLayoutSort('kiri-kanan')" class="px-4 md:px-6 py-2 rounded-md text-[10px] md:text-xs font-bold transition-all ${isKiriKanan ? 'bg-amber-600 text-slate-900 shadow-md' : 'text-slate-500 hover:text-white'}">Layout Kiri-Kanan</button>
                        <button onclick="ubahGayaLayoutSort('atas-bawah')" class="px-4 md:px-6 py-2 rounded-md text-[10px] md:text-xs font-bold transition-all ${!isKiriKanan ? 'bg-amber-600 text-slate-900 shadow-md' : 'text-slate-500 hover:text-white'}">Layout Atas-Bawah</button>
                    </div>
                </div>

                <div class="${classPapan}">
                    <div class="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                    <div class="${classWadahKiri}" id="wadah-kiri-sort">
                        ${headerWadahKiri}
                        <div class="grid ${skala.gridKiri} ${skala.gap}" id="grid-balok-sort">
                            ${sortState.dataSoal.map(item => {
                                if (item.terjawab) return `<div class="${skala.tinggiKotak} w-full invisible"></div>`;
                                
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

                    ${pembatas}

                    <div class="${classWadahKanan}">
                        ${headerKategori}
                        <div class="${gridKategori}">
                            ${sortState.kategori.map(kat => {
                                let isCyan = kat.tema === 'cyan';
                                let colorTheme = isCyan ? 'cyan' : 'emerald';
                                
                                let balokItemClass = isKiriKanan 
                                    ? `w-[calc(50%-4px)] lg:w-[calc(50%-6px)] bg-slate-800 border-l-4 border-${colorTheme}-500 border-y border-r border-slate-700 rounded-lg p-1.5 flex items-center shadow-sm fade-in`
                                    : `w-[calc(50%-3px)] lg:w-[calc(50%-4px)] bg-slate-800 border-l-4 border-${colorTheme}-500 border-y border-r border-slate-700 rounded-lg p-1 md:p-1.5 flex items-center shadow-sm fade-in`;

                                let teksArtiClass = isKiriKanan
                                    ? `text-[9px] md:text-[10px] font-bold text-slate-300 uppercase truncate border-l border-slate-600 pl-2.5 ml-2.5 flex-1`
                                    : `text-[9px] font-bold text-slate-300 uppercase truncate border-l border-slate-600 pl-2 ml-2 flex-1`;
                                    
                                let bgHeaderKotak = isKiriKanan 
                                    ? `bg-${colorTheme}-950/40 border-b border-${colorTheme}-500/30 p-2 md:p-3 text-center shrink-0 z-10`
                                    : `bg-${colorTheme}-950/40 border-b border-${colorTheme}-500/30 p-1.5 text-center shrink-0 z-10`;

                                let areaDropSort = isKiriKanan 
                                    ? `area-drop-sort flex-1 p-2 md:p-3 flex flex-wrap content-start gap-1.5 md:gap-2 overflow-y-auto relative z-10`
                                    : `area-drop-sort flex-1 p-1.5 md:p-2 flex flex-wrap content-start gap-1.5 overflow-y-auto relative z-10`;

                                let balokMasuk = sortState.dataSoal.filter(s => s.terjawab && s.kat === kat.id).map(b => {
                                    let visual = b.soal;
                                    let fontClass = b.tipe === 'gambar' ? 'text-lg md:text-xl' : 'font-arabic text-xl md:text-2xl';
                                    
                                    return `
                                        <div class="${balokItemClass}">
                                            <div class="w-8 md:w-10 flex items-center justify-center shrink-0">
                                                <span class="${fontClass} text-white drop-shadow-md text-center leading-none">${visual}</span>
                                            </div>
                                            <span class="${teksArtiClass}">${b.arti}</span>
                                        </div>
                                    `;
                                }).join('');

                                return `
                                    <div class="kotak-target-sort flex flex-col h-full bg-slate-950/70 border-2 border-dashed border-${colorTheme}-500/40 rounded-xl relative overflow-hidden transition-all" data-target="${kat.id}" data-tema="${colorTheme}">
                                        <div class="${bgHeaderKotak}">
                                            <h2 class="text-${colorTheme}-400 font-black tracking-widest text-sm">${kat.judul}</h2>
                                            <p class="text-[8px] text-slate-400 uppercase font-bold tracking-wider">${kat.subjudul}</p>
                                        </div>
                                        <div class="${areaDropSort}">
                                            <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] ${balokMasuk ? 'hidden' : ''}">
                                                <i class="fa-solid fa-box-open text-5xl md:text-6xl text-${colorTheme}-500"></i>
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
        </div>
    `;
    pasangSensorSort();
    jalankanTimerSort(isRenderUlang);
}

function pasangSensorSort() {
    const kartus = document.querySelectorAll('.kartu-soal-sort');
    const wadahKiri = document.getElementById('grid-balok-sort');
    const kolomKiriUtama = document.getElementById('wadah-kiri-sort');

    kartus.forEach(kartu => {
        let terkunci = false;

        kartu.addEventListener('touchstart', function(e) {
            if(terkunci) return;
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
            kartu.style.left = (sentuhan.clientX - (kartu.offsetWidth / 2)) + 'px';
            kartu.style.top = (sentuhan.clientY - (kartu.offsetHeight / 2)) + 'px';
        }, {passive: false});

        kartu.addEventListener('touchend', function(e) {
            if(terkunci) return;
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

                    let isKiriKanan = sortState.layout === 'kiri-kanan';
                    let skala = hitungSkalaOtomatisSort(sortState.dataSoal.length, isKiriKanan);

                    kartu.className = `${skala.tinggiKotak} w-full invisible`;
                    kartu.innerHTML = '';
                    kartu.style.position = 'static';
                    wadahKiri.appendChild(kartu);

                    let balokItemClass = isKiriKanan
                        ? `w-[calc(50%-4px)] lg:w-[calc(50%-6px)] bg-slate-800 border-l-4 border-${tema}-500 border-y border-r border-slate-700 rounded-lg p-1.5 flex items-center shadow-sm fade-in`
                        : `w-[calc(50%-3px)] lg:w-[calc(50%-4px)] bg-slate-800 border-l-4 border-${tema}-500 border-y border-r border-slate-700 rounded-lg p-1 md:p-1.5 flex items-center shadow-sm fade-in`;

                    let teksArtiClass = isKiriKanan
                        ? `text-[9px] md:text-[10px] font-bold text-slate-300 uppercase truncate border-l border-slate-600 pl-2.5 ml-2.5 flex-1`
                        : `text-[9px] font-bold text-slate-300 uppercase truncate border-l border-slate-600 pl-2 ml-2 flex-1`;

                    let fontClass = soalData.tipe === 'gambar' ? 'text-lg md:text-xl' : 'font-arabic text-xl md:text-2xl';

                    let elemenMasuk = document.createElement('div');
                    elemenMasuk.className = balokItemClass;
                    elemenMasuk.innerHTML = `
                        <div class="w-8 md:w-10 flex items-center justify-center shrink-0">
                            <span class="${fontClass} text-white drop-shadow-md text-center leading-none">${soalData.soal}</span>
                        </div>
                        <span class="${teksArtiClass}">${soalData.arti}</span>
                    `;

                    let areaDrop = kotakTarget.querySelector('.area-drop-sort');
                    let iconKosong = areaDrop.querySelector('.absolute');
                    if (iconKosong) iconKosong.style.display = 'none';
                    areaDrop.appendChild(elemenMasuk);

                    // Hitung poin proporsional terhadap jumlah ronde yang dimainkan
                    let bobotPerSoal = 100 / (sortPaketRonde.length || 1);
                    let nilaiBawaan = bobotPerSoal / sortState.dataSoal.length;
                    let nilaiDidapat = Math.max(0, nilaiBawaan - (soalData.salah * (nilaiBawaan * 0.25)));
                    sortState.skor += nilaiDidapat;

                    if (typeof updateSkorDnd === 'function') updateSkorDnd(Math.round(sortState.skor));

                    sortState.itemTerjawab++;
                    // Putar efek suara benar DND per balok
                    if (typeof playDndSound === 'function') playDndSound('benar'); 

                    // Cek jika 1 Nomor Soal selesai sempurna
                    if (sortState.itemTerjawab === sortState.dataSoal.length) {
                        if (sortState.timerInterval) clearInterval(sortState.timerInterval);

                        // Putar suara kuis benar saat 1 soal selesai sempurna!
                        if (typeof playDndSound === 'function') playDndSound('selesai');
                        if (typeof confetti === 'function') confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

                        sortIndexRonde++;
                        if (sortIndexRonde < sortPaketRonde.length) {
                            setTimeout(() => mulaiGameSort(false, true), 1800);
                        } else {
                            setTimeout(() => selebrasiKemenanganSort(), 1800);
                        }
                    }
                } else {
                    kartu.style.position = 'static';
                    wadahKiri.appendChild(kartu);
                    // Putar efek suara salah DND per balok
                    if (typeof playDndSound === 'function') playDndSound('salah'); 
                    
                    let idSoal = kartu.getAttribute('data-id');
                    let soalData = sortState.dataSoal.find(s => s.id === idSoal);
                    if(soalData) soalData.salah += 1;
                    
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
    if (sortState.timerInterval) clearInterval(sortState.timerInterval);
    if (typeof stopDndBGM === 'function') stopDndBGM();
    
    let nilaiAkhir = Math.round(sortState.skor);
    if (typeof playCelebrationAudio === 'function') {
        playCelebrationAudio(nilaiAkhir);
    }
    
    const subtitleEl = document.getElementById('dnd-topbar-subtitle');
    if (subtitleEl) subtitleEl.innerText = "Permainan Selesai";

    const container = document.getElementById('dnd-game-container');
    container.innerHTML = `
        <div class="min-h-screen w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 py-8 px-4">
            <div class="max-w-2xl mx-auto p-8 bg-slate-900/95 rounded-[2.5rem] text-center border border-indigo-500/30 shadow-[0_0_40px_rgba(251,191,36,0.2)] fade-in">
                <i class="fa-solid fa-medal text-6xl text-amber-400 mb-6 animate-bounce drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"></i>
                <h1 class="text-4xl font-black text-white mb-2">SORTING SELESAI!</h1>
                <p class="text-xs text-slate-400">Semua paket soal pada rentang pilihan telah dikelompokkan.</p>
                
                <div class="bg-slate-800/80 p-6 rounded-3xl mb-8 mt-6 border border-slate-700">
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Nilai Akhir</p>
                    <p class="text-7xl font-black text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]">${nilaiAkhir}</p>
                </div>
                
                <div class="flex justify-center gap-4">
                    <button onclick="keluarFullscreenDnd()" class="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-2xl border border-slate-600 transition-colors">Menu Game</button>
                    <button onclick="startDndBGM(); mulaiGameSort(false, false);" class="bg-amber-500 hover:bg-amber-400 text-slate-900 font-black py-3 px-8 rounded-2xl shadow-[0_0_15px_rgba(251,191,36,0.4)] transition-transform">MAIN LAGI</button>
                </div>
            </div>
        </div>
    `;
}
