// ==========================================================
// FILE: engine-sort.js
// FUNGSI: Mesin "Sort & Drop" (FIXED RESET STATE & SMOOTH DRAG)
// ==========================================================

let sortState = {
    skor: 0,
    itemTerjawab: 0,
    layout: 'kiri-kanan', 
    kategori: [
        { id: "isim", judul: "ISIM", subjudul: "Kata Benda", tema: "cyan" },
        { id: "fiil", judul: "FI'IL", subjudul: "Kata Kerja", tema: "rose" }
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

function bukaSetupGame(jenisGame) {
    if (jenisGame === 'sort') {
        sortState.layout = 'kiri-kanan'; 
        // PERBAIKAN 1: Reset total (Deep Copy) status terjawab agar bersih saat Main Lagi
        sortState.dataSoal = sortState.dataSoalAsli.map(item => ({...item, terjawab: false})).sort(() => Math.random() - 0.5);
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
        // PERBAIKAN 1: Reset total status terjawab setiap memulai sesi baru
        sortState.dataSoal = sortState.dataSoalAsli.map(item => ({...item, terjawab: false})).sort(() => Math.random() - 0.5);
    }

    let isKiriKanan = sortState.layout === 'kiri-kanan';
    let layoutUtama = isKiriKanan ? 'flex-row' : 'flex-col';
    let porsiSoal = isKiriKanan ? 'w-5/12 h-full border-r' : 'w-full h-[45%] border-b';
    let porsiKeranjang = isKiriKanan ? 'w-7/12 h-full' : 'w-full h-[55%]';
    let gridSoal = isKiriKanan ? 'grid-cols-2 lg:grid-cols-2' : 'grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8';

    container.innerHTML = `
        <div class="max-w-7xl mx-auto px-2 md:px-4 py-3 flex flex-col fade-in relative select-none" style="height: calc(100vh - 80px); min-height: 500px;">
            
            <div class="absolute top-1/4 left-1/4 w-[30%] h-[30%] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
            
            <div class="flex-none bg-slate-900 border border-slate-700/80 shadow-md rounded-xl px-4 py-2.5 flex justify-between items-center mb-3 shrink-0 relative z-10">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 bg-indigo-500/20 rounded-lg flex items-center justify-center border border-indigo-400/30 shrink-0">
                        <i class="fa-solid fa-layer-group text-white text-sm"></i>
                    </div>
                    <h2 class="text-sm md:text-base font-black text-white tracking-wide leading-none hidden sm:block">SORT & DROP</h2>
                </div>
                
                <div class="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 shrink-0 mx-2">
                    <button onclick="ubahGayaLayout('kiri-kanan')" class="px-3 md:px-4 py-1.5 rounded-md text-[10px] md:text-xs font-bold transition-all ${isKiriKanan ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-white'}">Kiri-Kanan</button>
                    <button onclick="ubahGayaLayout('atas-bawah')" class="px-3 md:px-4 py-1.5 rounded-md text-[10px] md:text-xs font-bold transition-all ${!isKiriKanan ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-white'}">Atas-Bawah</button>
                </div>

                <div class="flex items-center gap-2 md:gap-4 shrink-0">
                    <div class="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 flex items-center">
                        <span class="text-[9px] md:text-[10px] font-bold text-slate-400 mr-2 uppercase hidden sm:block">Skor</span>
                        <span id="skor-sort" class="text-sm md:text-base font-black text-amber-400 leading-none">${Math.round(sortState.skor)}</span>
                    </div>
                    <button onclick="bukaDragAndDropArena()" class="bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white w-8 h-8 md:w-9 md:h-9 rounded-lg transition-all border border-slate-700 flex items-center justify-center">
                        <i class="fa-solid fa-xmark text-xs md:text-sm"></i>
                    </button>
                </div>
            </div>

            <div class="flex-1 flex ${layoutUtama} bg-slate-900/60 backdrop-blur-md border border-slate-700/60 rounded-2xl shadow-xl overflow-hidden relative z-10 min-h-0">

                <div class="${porsiSoal} border-slate-700/50 flex flex-col min-h-0">
                    <div class="flex-none bg-slate-800/40 p-2.5 border-b border-slate-700/50 flex justify-between items-center px-4">
                        <h3 class="font-black text-slate-400 uppercase tracking-[0.2em] text-[10px]">Seret Objek</h3>
                        <span class="bg-indigo-500/20 text-indigo-300 text-[9px] font-black px-2 py-0.5 rounded border border-indigo-500/30 shrink-0">${sortState.dataSoal.length} Soal</span>
                    </div>
                    
                    <div class="flex-1 overflow-y-auto p-3 sm:p-4">
                        <div class="grid ${gridSoal} gap-2.5 sm:gap-3" id="wadah-balok-sort">
                            ${sortState.dataSoal.map(item => {
                                if(item.terjawab) return ''; 

                                let isGambar = item.tipe === 'gambar';
                                let visual = isGambar 
                                    ? `<span class="text-3xl drop-shadow-md mb-0.5 pointer-events-none">${item.soal}</span>` 
                                    : `<span class="font-arabic text-2xl md:text-3xl text-white pointer-events-none drop-shadow-md leading-none mb-1">${item.soal}</span>`;
                                
                                return `
                                    <div class="balok-sort touch-none bg-slate-800 border border-slate-600 hover:border-indigo-400 rounded-xl p-2 flex flex-col items-center justify-center cursor-grab transition-all shadow-sm relative group h-16 md:h-20 w-full" data-id="${item.id}" data-kat="${item.kat}" data-terkunci="false">
                                        ${visual}
                                        <span class="text-[9px] md:text-[10px] text-slate-400 font-bold pointer-events-none tracking-wider uppercase truncate w-full text-center mt-auto">${item.arti}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>

                <div class="${porsiKeranjang} p-3 sm:p-4 grid grid-cols-2 gap-3 sm:gap-4 min-h-0">
                    ${sortState.kategori.map(kat => {
                        let isCyan = kat.tema === 'cyan';
                        let bgHeader = isCyan ? 'bg-cyan-950/80' : 'bg-rose-950/80';
                        let borderColor = isCyan ? 'border-cyan-500/30' : 'border-rose-500/30';
                        let textColor = isCyan ? 'text-cyan-400' : 'text-rose-400';
                        let dropZoneBg = isCyan ? 'bg-cyan-950/10' : 'bg-rose-950/10';
                        
                        let balokMasuk = sortState.dataSoal.filter(s => s.terjawab && s.kat === kat.id).map(b => {
                            let itemVisual = b.tipe === 'gambar' 
                                ? `<span class="text-sm md:text-base">${b.soal}</span>` 
                                : `<span class="font-arabic text-base md:text-lg text-white">${b.soal}</span>`;
                                
                            return `
                                <div class="w-full bg-slate-900 border-l-2 ${isCyan ? 'border-cyan-500' : 'border-rose-500'} border-y border-r border-slate-700/80 rounded-lg p-1.5 md:p-2 shadow-sm flex items-center justify-between shrink-0">
                                    <div class="flex items-center gap-2 overflow-hidden">
                                        <div class="w-6 h-6 md:w-7 md:h-7 rounded bg-slate-800 flex items-center justify-center shrink-0 shadow-inner">
                                            ${itemVisual}
                                        </div>
                                        <span class="text-[9px] md:text-[10px] font-bold text-slate-300 uppercase truncate pr-1">${b.arti}</span>
                                    </div>
                                    <i class="fa-solid fa-check ${textColor} text-[10px] shrink-0 ml-1"></i>
                                </div>
                            `;
                        }).join('');

                        return `
                            <div class="keranjang-target flex flex-col h-full rounded-2xl border-2 border-dashed ${borderColor} ${dropZoneBg} overflow-hidden transition-all relative min-h-0" data-target="${kat.id}" data-tema="${kat.tema}">
                                
                                <div class="flex-none ${bgHeader} border-b ${borderColor} p-2.5 md:p-3 text-center z-10 shrink-0">
                                    <h2 class="text-sm md:text-lg font-black ${textColor} tracking-[0.1em] drop-shadow-sm leading-none">${kat.judul}</h2>
                                    <p class="text-slate-300/80 text-[8px] md:text-[9px] font-bold uppercase mt-1 tracking-widest">${kat.subjudul}</p>
                                </div>
                                
                                <div class="isi-keranjang flex-1 overflow-y-auto p-2 md:p-3 flex flex-col gap-1.5 md:gap-2 relative z-10">
                                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] ${balokMasuk ? 'hidden' : ''}">
                                        <i class="fa-solid fa-box-open text-6xl md:text-8xl ${textColor}"></i>
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
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;
        let initialWidth = 0;
        let initialHeight = 0;

        // PERBAIKAN 2: Menggunakan Pointer Events agar hitungan koordinat drag mulus (tidak nyentak)
        balok.addEventListener('pointerdown', function(e) {
            if (balok.getAttribute('data-terkunci') === 'true') return;
            
            isDragging = true;
            balok.setPointerCapture(e.pointerId);
            
            // Kalkulasi offset agar posisi balok sesuai titik sentuh jari
            let rect = balok.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            
            initialWidth = rect.width;
            initialHeight = rect.height;

            balok.style.zIndex = 9999;
            balok.classList.add('scale-105', 'shadow-[0_10px_30px_rgba(0,0,0,0.5)]', 'border-indigo-400');
        });

        balok.addEventListener('pointermove', function(e) {
            if (!isDragging) return;
            e.preventDefault(); 
            
            // Terapkan position fixed hanya saat benar-benar mulai digeser untuk mencegah glitch
            if (balok.style.position !== 'fixed') {
                balok.style.width = initialWidth + 'px';
                balok.style.height = initialHeight + 'px';
                balok.style.position = 'fixed';
            }
            
            balok.style.left = (e.clientX - offsetX) + 'px';
            balok.style.top = (e.clientY - offsetY) + 'px';
        });

        balok.addEventListener('pointerup', function(e) {
            if (!isDragging) return;
            isDragging = false;
            balok.releasePointerCapture(e.pointerId);
            
            balok.classList.remove('scale-105', 'shadow-[0_10px_30px_rgba(0,0,0,0.5)]', 'border-indigo-400');
            
            // Deteksi area drop
            balok.style.display = 'none';
            let elemenDiBawah = document.elementFromPoint(e.clientX, e.clientY);
            balok.style.display = 'flex';

            let keranjangTarget = elemenDiBawah ? elemenDiBawah.closest('.keranjang-target') : null;

            if (keranjangTarget) {
                if (balok.getAttribute('data-kat') === keranjangTarget.getAttribute('data-target')) {
                    balok.setAttribute('data-terkunci', 'true');
                    let idSoal = balok.getAttribute('data-id');
                    let soalData = sortState.dataSoal.find(s => s.id === idSoal);
                    if(soalData) soalData.terjawab = true;
                    
                    mulaiGameSort(true);
                    
                    let tema = keranjangTarget.getAttribute('data-tema');
                    let targetWarna = tema === 'cyan' ? 'cyan' : 'rose';
                    let TargetElement = document.querySelector(`.keranjang-target[data-target="${soalData.kat}"]`);
                    
                    if (TargetElement) {
                        TargetElement.classList.remove('border-dashed');
                        TargetElement.classList.add('border-solid', `border-${targetWarna}-500`, `bg-${targetWarna}-900/40`);
                        setTimeout(() => {
                            if (TargetElement) {
                                TargetElement.classList.add('border-dashed');
                                TargetElement.classList.remove('border-solid', `border-${targetWarna}-500`, `bg-${targetWarna}-900/40`);
                            }
                        }, 200);
                    }
                    
                    let nilaiPerSoal = 100 / sortState.dataSoal.length;
                    sortState.skor += nilaiPerSoal;
                    sortState.itemTerjawab++;
                    
                    document.getElementById('skor-sort').innerText = Math.round(sortState.skor);
                    if (typeof playSoundEffect === 'function') playSoundEffect('correct'); 

                    if (sortState.itemTerjawab === sortState.dataSoal.length) {
                        setTimeout(() => selebrasiKemenanganSort(), 400);
                    }
                } else {
                    kembalikanKeAsal(balok, wadahAsal, keranjangTarget);
                }
            } else {
                kembalikanKeAsal(balok, wadahAsal, null);
            }
        });
    });

    function kembalikanKeAsal(balok, wadahAsal, keranjangTarget) {
        balok.style.position = 'relative';
        balok.style.left = 'auto';
        balok.style.top = 'auto';
        balok.style.width = '100%';
        balok.style.height = ''; 
        balok.style.zIndex = '1';
        wadahAsal.appendChild(balok);
        
        if (typeof playSoundEffect === 'function') playSoundEffect('wrong'); 
        
        if (keranjangTarget) {
            keranjangTarget.classList.remove('border-dashed');
            keranjangTarget.classList.add('border-solid', 'border-rose-500', 'bg-rose-950/50');
            setTimeout(() => {
                if (keranjangTarget) {
                    keranjangTarget.classList.add('border-dashed');
                    keranjangTarget.classList.remove('border-solid', 'border-rose-500', 'bg-rose-950/50');
                }
            }, 200);
        }
    }
}

function selebrasiKemenanganSort() {
    let nilaiAkhir = Math.round(sortState.skor);
    if (typeof playCelebrationAudio === 'function') playCelebrationAudio(nilaiAkhir);
    
    const container = document.getElementById('main-content');
    container.innerHTML = `
        <div class="flex items-center justify-center fade-in px-4" style="height: calc(100vh - 80px);">
            <div class="bg-slate-900 border border-slate-700 shadow-2xl rounded-3xl p-8 text-center max-w-sm w-full relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent pointer-events-none"></div>
                <i class="fa-solid fa-medal text-6xl text-amber-400 mb-4 animate-bounce drop-shadow-md"></i>
                <h1 class="text-2xl md:text-3xl font-black text-white mb-2 relative z-10">SELESAI!</h1>
                
                <div class="bg-slate-800 p-5 rounded-2xl mb-6 mt-4 shadow-inner relative z-10 border border-slate-700">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nilai Akhir</p>
                    <p class="text-6xl font-black text-emerald-400 drop-shadow-sm">${nilaiAkhir}</p>
                </div>
                
                <div class="flex justify-center gap-3 relative z-10">
                    <button onclick="bukaDragAndDropArena()" class="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-5 rounded-xl border border-slate-600 transition-colors shadow-sm text-xs uppercase tracking-wider">Menu</button>
                    <button onclick="bukaSetupGame('sort')" class="bg-emerald-500 hover:bg-emerald-400 text-white font-black py-3 px-6 rounded-xl shadow-md transition-transform text-xs uppercase tracking-wider">Main Lagi</button>
                </div>
            </div>
        </div>
    `;
}
