// ==========================================================
// FILE: engine-sort.js
// FUNGSI: Mesin "Sort & Drop" (FLEXIBLE LAYOUT, SOLID & SIMETRIS)
// ==========================================================

let sortState = {
    skor: 0,
    itemTerjawab: 0,
    layout: 'kiri-kanan', // Mode default
    kategori: [
        { id: "isim", judul: "ISIM", subjudul: "Kata Benda", tema: "cyan" },
        { id: "fiil", judul: "FI'IL", subjudul: "Kata Kerja", tema: "rose" }
    ],
    // Mendukung teks dan gambar sekaligus
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

function bukaSetupGame(jenisGame) {
    if (jenisGame === 'sort') {
        sortState.layout = 'kiri-kanan'; 
        sortState.dataSoal = [...sortState.dataSoalAsli].sort(() => Math.random() - 0.5);
        mulaiGameSort();
    }
}

function ubahGayaLayout(gayaBaru) {
    sortState.layout = gayaBaru;
    mulaiGameSort(true); 
}

function mulaiGameSort(isRenderUlang = false) {
    const container = document.getElementById('main-content');
    
    if (!isRenderUlang) {
        sortState.skor = 0;
        sortState.itemTerjawab = 0;
        sortState.dataSoal = [...sortState.dataSoalAsli].sort(() => Math.random() - 0.5);
    }

    // PENGATURAN GRID SIMETRIS BERDASARKAN MODE
    let classBungkusUtama = sortState.layout === 'kiri-kanan' 
        ? 'flex flex-col lg:flex-row items-stretch' 
        : 'flex flex-col'; 
        
    let classWadahSoal = sortState.layout === 'kiri-kanan' 
        ? 'w-full lg:w-5/12' 
        : 'w-full';

    let classWadahKeranjang = sortState.layout === 'kiri-kanan' 
        ? 'w-full lg:w-7/12 grid grid-cols-1 md:grid-cols-2' 
        : 'w-full grid grid-cols-1 md:grid-cols-2';

    let classGridBalok = sortState.layout === 'kiri-kanan'
        ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2'
        : 'flex flex-wrap justify-center';

    container.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 md:px-6 pt-4 pb-12 select-none fade-in relative">
            
            <!-- CAHAYA LATAR SOLID -->
            <div class="absolute top-0 left-1/4 w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
            
            <!-- HEADER & KONTROL LAYOUT -->
            <div class="bg-slate-900 border border-slate-700 shadow-xl rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 relative z-10 gap-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg border border-indigo-400/50">
                        <i class="fa-solid fa-layer-group text-white text-lg"></i>
                    </div>
                    <div>
                        <h2 class="text-lg md:text-xl font-black text-white tracking-wide leading-none">SORT & DROP</h2>
                    </div>
                </div>
                
                <!-- TOMBOL GAYA LAYOUT -->
                <div class="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shadow-inner">
                    <button onclick="ubahGayaLayout('kiri-kanan')" class="px-5 py-2 rounded-lg text-xs font-bold transition-all ${sortState.layout === 'kiri-kanan' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-white'}">Kiri-Kanan</button>
                    <button onclick="ubahGayaLayout('atas-bawah')" class="px-5 py-2 rounded-lg text-xs font-bold transition-all ${sortState.layout === 'atas-bawah' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-white'}">Atas-Bawah</button>
                </div>

                <div class="flex items-center gap-4">
                    <div class="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 flex items-center shadow-inner">
                        <span class="text-xs font-bold text-slate-400 mr-2 uppercase">Skor</span>
                        <span id="skor-sort" class="text-xl font-black text-amber-400 leading-none">${Math.round(sortState.skor)}</span>
                    </div>
                    <button onclick="bukaDragAndDropArena()" class="bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white w-10 h-10 rounded-xl font-bold transition-all border border-slate-700 flex items-center justify-center">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>

            <!-- LAYOUT UTAMA (Dinamis berubah posisi tapi tetap simetris) -->
            <div class="${classBungkusUtama} gap-6 lg:gap-8 relative z-10">
                
                <!-- WADAH SOAL -->
                <div class="${classWadahSoal} bg-slate-900/80 backdrop-blur-md border border-slate-700/80 rounded-[2rem] p-5 shadow-xl h-fit">
                    <div class="flex items-center justify-between mb-5 pb-4 border-b border-slate-700/50">
                        <h3 class="font-black text-slate-400 uppercase tracking-widest text-[10px] md:text-xs">Seret Objek Ini</h3>
                    </div>
                    
                    <div class="${classGridBalok} gap-3 md:gap-4" id="wadah-balok-sort">
                        ${sortState.dataSoal.map(item => {
                            if(item.terjawab) return ''; 

                            let isGambar = item.tipe === 'gambar';
                            let visual = isGambar 
                                ? `<span class="text-4xl md:text-5xl drop-shadow-md mb-1 pointer-events-none">${item.soal}</span>` 
                                : `<span class="font-arabic text-3xl md:text-4xl text-white group-hover:scale-110 transition-transform pointer-events-none drop-shadow-md leading-none mb-1 md:mb-2">${item.soal}</span>`;
                            
                            let wClass = isGambar ? 'bg-slate-800 border-slate-600' : 'bg-slate-800 border-slate-600 hover:border-indigo-500';
                            let sizeClass = sortState.layout === 'kiri-kanan' ? 'w-full h-[100px]' : 'w-[100px] h-[100px] md:w-[120px] md:h-[120px]';

                            return `
                                <div class="balok-sort touch-none ${wClass} border-2 rounded-2xl p-3 flex flex-col items-center justify-center cursor-grab transition-all shadow-lg hover:shadow-indigo-500/20 relative group overflow-hidden ${sizeClass}" data-id="${item.id}" data-kat="${item.kat}">
                                    ${visual}
                                    <span class="text-[10px] md:text-xs text-slate-400 font-bold pointer-events-none tracking-widest uppercase">${item.arti}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- WADAH KATEGORI -->
                <div class="${classWadahKeranjang} gap-5 md:gap-6" id="area-kategori">
                    ${sortState.kategori.map(kat => {
                        let isCyan = kat.tema === 'cyan';
                        let bgHeader = isCyan ? 'bg-cyan-950/80' : 'bg-rose-950/80';
                        let borderColor = isCyan ? 'border-cyan-500/40' : 'border-rose-500/40';
                        let textColor = isCyan ? 'text-cyan-400' : 'text-rose-400';
                        let dropZoneBg = isCyan ? 'bg-cyan-950/20' : 'bg-rose-950/20';
                        
                        let balokMasuk = sortState.dataSoal.filter(s => s.terjawab && s.kat === kat.id).map(b => {
                            let itemVisual = b.tipe === 'gambar' 
                                ? `<span class="text-xl md:text-2xl">${b.soal}</span>` 
                                : `<span class="font-arabic text-xl md:text-2xl text-white">${b.soal}</span>`;
                                
                            return `
                                <div class="w-full bg-slate-900 border-l-4 ${isCyan ? 'border-cyan-500' : 'border-rose-500'} border-y border-r border-slate-700 rounded-xl p-3 md:p-4 shadow-sm flex items-center justify-between transition-all">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-600 shadow-inner">
                                            ${itemVisual}
                                        </div>
                                        <span class="text-xs font-bold text-slate-300 tracking-wide uppercase">${b.arti}</span>
                                    </div>
                                    <i class="fa-solid fa-circle-check ${textColor} text-lg"></i>
                                </div>
                            `;
                        }).join('');

                        return `
                            <div class="keranjang-target flex flex-col rounded-[2rem] border-2 border-dashed ${borderColor} ${dropZoneBg} overflow-hidden shadow-inner transition-all relative min-h-[300px] md:min-h-[400px]" data-target="${kat.id}" data-tema="${kat.tema}">
                                
                                <div class="${bgHeader} border-b ${borderColor} p-4 text-center relative z-10 shadow-md">
                                    <h2 class="text-2xl font-black ${textColor} tracking-[0.15em] drop-shadow-md mb-1">${kat.judul}</h2>
                                    <p class="text-slate-300 text-[10px] font-bold uppercase tracking-widest">${kat.subjudul}</p>
                                </div>
                                
                                <div class="isi-keranjang flex-1 p-4 md:p-5 flex flex-col gap-3 relative z-10">
                                    <div class="placeholder-icon absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] z-0 ${balokMasuk ? 'hidden' : ''}">
                                        <i class="fa-solid fa-box-open text-7xl md:text-8xl ${textColor}"></i>
                                    </div>
                                    ${balokMasuk}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

            </div>
        </div>
    `;
    pasangSensorSort();
}

function pasangSensorSort() {
    const baloks = document.querySelectorAll('.balok-sort');
    const wadahAsal = document.getElementById('wadah-balok-sort');
    
    baloks.forEach(balok => {
        let terkunci = false;

        balok.addEventListener('touchstart', function(e) {
            if(terkunci) return;
            balok.style.zIndex = 9999;
            balok.classList.add('scale-105', 'shadow-[0_20px_50px_rgba(0,0,0,0.5)]', 'ring-4', 'ring-indigo-500/50');
        }, {passive: false});

        balok.addEventListener('touchmove', function(e) {
            if(terkunci) return;
            e.preventDefault(); 
            let sentuhan = e.touches[0];
            balok.style.position = 'fixed';
            balok.style.left = (sentuhan.clientX - (balok.offsetWidth / 2)) + 'px';
            balok.style.top = (sentuhan.clientY - (balok.offsetHeight / 2)) + 'px';
        }, {passive: false});

        balok.addEventListener('touchend', function(e) {
            if(terkunci) return;
            balok.classList.remove('scale-105', 'shadow-[0_20px_50px_rgba(0,0,0,0.5)]', 'ring-4', 'ring-indigo-500/50');
            
            let sentuhan = e.changedTouches[0];
            balok.style.display = 'none';
            let elemenDiBawah = document.elementFromPoint(sentuhan.clientX, sentuhan.clientY);
            balok.style.display = 'flex';

            let keranjangTarget = elemenDiBawah ? elemenDiBawah.closest('.keranjang-target') : null;

            if (keranjangTarget) {
                if (balok.getAttribute('data-kat') === keranjangTarget.getAttribute('data-target')) {
                    terkunci = true;
                    let idSoal = balok.getAttribute('data-id');
                    let soalData = sortState.dataSoal.find(s => s.id === idSoal);
                    if(soalData) soalData.terjawab = true;
                    
                    // Render ulang agar animasi chip solid terjadi sempurna
                    mulaiGameSort(true);
                    
                    let tema = keranjangTarget.getAttribute('data-tema');
                    let targetWarna = tema === 'cyan' ? 'cyan' : 'rose';
                    let TargetElement = document.querySelector(`.keranjang-target[data-target="${soalData.kat}"]`);
                    
                    if (TargetElement) {
                        TargetElement.classList.remove('border-dashed');
                        TargetElement.classList.add('border-solid', `border-${targetWarna}-500`, `bg-${targetWarna}-900/30`);
                        setTimeout(() => {
                            TargetElement.classList.add('border-dashed');
                            TargetElement.classList.remove('border-solid', `border-${targetWarna}-500`, `bg-${targetWarna}-900/30`);
                        }, 400);
                    }
                    
                    let nilaiPerSoal = 100 / sortState.dataSoal.length;
                    sortState.skor += nilaiPerSoal;
                    sortState.itemTerjawab++;
                    
                    document.getElementById('skor-sort').innerText = Math.round(sortState.skor);
                    if (typeof playSoundEffect === 'function') playSoundEffect('correct'); 

                    if (sortState.itemTerjawab === sortState.dataSoal.length) {
                        setTimeout(() => selebrasiKemenanganSort(), 600);
                    }
                } else {
                    balok.style.position = 'static';
                    wadahAsal.appendChild(balok);
                    if (typeof playSoundEffect === 'function') playSoundEffect('wrong'); 
                    
                    keranjangTarget.classList.remove('border-dashed');
                    keranjangTarget.classList.add('border-solid', 'border-rose-500', 'bg-rose-950/50');
                    setTimeout(() => {
                        keranjangTarget.classList.add('border-dashed');
                        keranjangTarget.classList.remove('border-solid', 'border-rose-500', 'bg-rose-950/50');
                    }, 300);
                }
            } else {
                balok.style.position = 'static';
                wadahAsal.appendChild(balok);
            }
        });
    });
}

function selebrasiKemenanganSort() {
    let nilaiAkhir = Math.round(sortState.skor);
    if (typeof playCelebrationAudio === 'function') playCelebrationAudio(nilaiAkhir);
    
    const container = document.getElementById('main-content');
    container.innerHTML = `
        <div class="max-w-2xl mx-auto mt-10 p-8 bg-slate-900 rounded-[2.5rem] text-center border border-slate-700 shadow-[0_0_40px_rgba(16,185,129,0.2)] fade-in">
            <i class="fa-solid fa-medal text-6xl text-amber-400 mb-6 animate-bounce drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"></i>
            <h1 class="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">SORTING SELESAI!</h1>
            
            <div class="bg-slate-800 p-6 rounded-3xl mb-8 mt-6 border border-slate-700">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Nilai Akhir</p>
                <p class="text-7xl font-black text-emerald-400 drop-shadow-md">${nilaiAkhir}</p>
            </div>
            
            <div class="flex justify-center gap-4">
                <button onclick="bukaDragAndDropArena()" class="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 px-6 rounded-2xl border border-slate-600 transition-colors shadow-sm text-sm uppercase tracking-widest">Menu Utama</button>
                <button onclick="bukaSetupGame('sort')" class="bg-emerald-500 hover:bg-emerald-400 text-white font-black py-3.5 px-8 rounded-2xl shadow-[0_4px_15px_rgba(16,185,129,0.4)] transition-transform text-sm uppercase tracking-widest">MAIN LAGI</button>
            </div>
        </div>
    `;
}
