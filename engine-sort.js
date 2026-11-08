// ==========================================================
// FILE: engine-sort.js
// FUNGSI: Mesin "Sort & Drop" (FIT TO SCREEN - TANPA SCROLL LUAR)
// ==========================================================

let sortState = {
    skor: 0,
    itemTerjawab: 0,
    layout: 'kiri-kanan', 
    kategori: [
        { id: "isim", judul: "ISIM", subjudul: "Kata Benda", tema: "cyan" },
        { id: "fiil", judul: "FI'IL", subjudul: "Kata Kerja", tema: "rose" }
    ],
    // Contoh 8 soal
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

    // PENGATURAN KELAS CSS (Berbasis Sisa Layar / Tinggi Fleksibel)
    let classBungkusUtama = sortState.layout === 'kiri-kanan' 
        ? 'flex flex-row h-full w-full' 
        : 'flex flex-col h-full w-full'; 
        
    let classWadahSoal = sortState.layout === 'kiri-kanan' 
        ? 'w-5/12 h-full flex flex-col pr-4 border-r border-slate-700/50' 
        : 'w-full h-auto flex flex-col mb-4 pb-4 border-b border-slate-700/50';

    let classWadahKeranjang = sortState.layout === 'kiri-kanan' 
        ? 'w-7/12 h-full pl-2 grid grid-cols-2 gap-4' 
        : 'w-full flex-1 grid grid-cols-2 gap-4';

    let classGridBalok = sortState.layout === 'kiri-kanan'
        ? 'grid grid-cols-2 gap-2 mt-2 overflow-y-auto pr-1 pb-1'
        : 'flex flex-wrap justify-center gap-2 mt-2';

    // Set container utama agar memakan sisa tinggi layar (Fit Screen)
    container.innerHTML = `
        <div class="max-w-7xl mx-auto px-2 md:px-4 flex flex-col fade-in relative" style="height: calc(100vh - 80px);">
            
            <div class="absolute top-0 left-1/4 w-[30%] h-[30%] bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none z-0"></div>
            
            <!-- HEADER KOMPAK (Menghemat Ruang) -->
            <div class="bg-slate-900 border border-slate-700 shadow-sm rounded-xl px-4 py-2.5 flex justify-between items-center mb-4 shrink-0 relative z-10">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center border border-indigo-400/30">
                        <i class="fa-solid fa-layer-group text-white text-sm"></i>
                    </div>
                    <h2 class="text-sm md:text-base font-black text-white tracking-wide">SORT & DROP</h2>
                </div>
                
                <div class="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
                    <button onclick="ubahGayaLayout('kiri-kanan')" class="px-3 py-1 rounded-md text-[10px] md:text-xs font-bold transition-all ${sortState.layout === 'kiri-kanan' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'}">Kiri-Kanan</button>
                    <button onclick="ubahGayaLayout('atas-bawah')" class="px-3 py-1 rounded-md text-[10px] md:text-xs font-bold transition-all ${sortState.layout === 'atas-bawah' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'}">Atas-Bawah</button>
                </div>

                <div class="flex items-center gap-3">
                    <div class="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 flex items-center">
                        <span class="text-[10px] font-bold text-slate-400 mr-1.5 uppercase">Skor</span>
                        <span id="skor-sort" class="text-base font-black text-amber-400">${Math.round(sortState.skor)}</span>
                    </div>
                    <button onclick="bukaDragAndDropArena()" class="bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white w-8 h-8 rounded-lg transition-all border border-slate-700 flex items-center justify-center">
                        <i class="fa-solid fa-xmark text-sm"></i>
                    </button>
                </div>
            </div>

            <!-- AREA GAME UTAMA (Fills remaining height) -->
            <div class="flex-1 bg-slate-900/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 shadow-xl overflow-hidden relative z-10 flex flex-col">
                <div class="${classBungkusUtama}">
                    
                    <!-- AREA SOAL -->
                    <div class="${classWadahSoal}">
                        <div class="flex items-center justify-between shrink-0 mb-1">
                            <h3 class="font-black text-slate-400 uppercase tracking-widest text-[9px] md:text-[10px]">Seret Objek</h3>
                            <span class="bg-indigo-500/20 text-indigo-300 text-[9px] font-black px-2 py-0.5 rounded border border-indigo-500/30">${sortState.dataSoal.length} Soal</span>
                        </div>
                        
                        <div class="${classGridBalok}" id="wadah-balok-sort">
                            ${sortState.dataSoal.map(item => {
                                if(item.terjawab) return ''; 

                                let isGambar = item.tipe === 'gambar';
                                let visual = isGambar 
                                    ? `<span class="text-3xl drop-shadow-md mb-0.5 pointer-events-none">${item.soal}</span>` 
                                    : `<span class="font-arabic text-2xl md:text-3xl text-white pointer-events-none drop-shadow-md leading-none mb-1">${item.soal}</span>`;
                                
                                let wClass = isGambar ? 'bg-slate-800' : 'bg-slate-800';
                                
                                // Ukuran balok dikunci agar padat
                                let sizeClass = sortState.layout === 'kiri-kanan' 
                                    ? 'w-full h-16 md:h-[72px]' 
                                    : 'w-20 h-20 md:w-[85px] md:h-[85px]';

                                return `
                                    <div class="balok-sort touch-none ${wClass} border border-slate-600 hover:border-indigo-400 rounded-xl p-2 flex flex-col items-center justify-center cursor-grab transition-all shadow-sm relative group shrink-0 ${sizeClass}" data-id="${item.id}" data-kat="${item.kat}">
                                        ${visual}
                                        <span class="text-[9px] md:text-[10px] text-slate-400 font-bold pointer-events-none tracking-wider uppercase truncate w-full text-center">${item.arti}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- AREA KATEGORI -->
                    <div class="${classWadahKeranjang}" id="area-kategori">
                        ${sortState.kategori.map(kat => {
                            let isCyan = kat.tema === 'cyan';
                            let bgHeader = isCyan ? 'bg-cyan-950/80' : 'bg-rose-950/80';
                            let borderColor = isCyan ? 'border-cyan-500/30' : 'border-rose-500/30';
                            let textColor = isCyan ? 'text-cyan-400' : 'text-rose-400';
                            let dropZoneBg = isCyan ? 'bg-cyan-950/10' : 'bg-rose-950/10';
                            
                            let balokMasuk = sortState.dataSoal.filter(s => s.terjawab && s.kat === kat.id).map(b => {
                                let itemVisual = b.tipe === 'gambar' 
                                    ? `<span class="text-base">${b.soal}</span>` 
                                    : `<span class="font-arabic text-lg text-white">${b.soal}</span>`;
                                    
                                return `
                                    <div class="w-full bg-slate-900 border-l-2 ${isCyan ? 'border-cyan-500' : 'border-rose-500'} border-y border-r border-slate-700/80 rounded-lg p-1.5 shadow-sm flex items-center justify-between">
                                        <div class="flex items-center gap-2 overflow-hidden">
                                            <div class="w-6 h-6 rounded bg-slate-800 flex items-center justify-center shrink-0">
                                                ${itemVisual}
                                            </div>
                                            <span class="text-[9px] font-bold text-slate-300 uppercase truncate">${b.arti}</span>
                                        </div>
                                        <i class="fa-solid fa-check ${textColor} text-[10px] shrink-0 ml-1"></i>
                                    </div>
                                `;
                            }).join('');

                            return `
                                <div class="keranjang-target flex flex-col rounded-xl border border-dashed ${borderColor} ${dropZoneBg} overflow-hidden transition-all h-full" data-target="${kat.id}" data-tema="${kat.tema}">
                                    
                                    <div class="${bgHeader} border-b ${borderColor} p-2.5 text-center shrink-0">
                                        <h2 class="text-sm md:text-base font-black ${textColor} tracking-[0.1em] drop-shadow-sm leading-none">${kat.judul}</h2>
                                        <p class="text-slate-300/80 text-[8px] font-bold uppercase mt-1">${kat.subjudul}</p>
                                    </div>
                                    
                                    <!-- Area isi bisa di-scroll internal JIKA penuh, sehingga layar utama tidak jebol ke bawah -->
                                    <div class="isi-keranjang flex-1 p-2 flex flex-col gap-1.5 overflow-y-auto relative">
                                        <div class="placeholder-icon absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] ${balokMasuk ? 'hidden' : ''}">
                                            <i class="fa-solid fa-box-open text-6xl ${textColor}"></i>
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
    const baloks = document.querySelectorAll('.balok-sort');
    const wadahAsal = document.getElementById('wadah-balok-sort');
    
    baloks.forEach(balok => {
        let terkunci = false;

        balok.addEventListener('touchstart', function(e) {
            if(terkunci) return;
            balok.style.zIndex = 9999;
            balok.classList.add('scale-105', 'shadow-xl', 'border-indigo-400');
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
            balok.classList.remove('scale-105', 'shadow-xl', 'border-indigo-400');
            
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
                    balok.style.position = 'static';
                    wadahAsal.appendChild(balok);
                    if (typeof playSoundEffect === 'function') playSoundEffect('wrong'); 
                    
                    keranjangTarget.classList.remove('border-dashed');
                    keranjangTarget.classList.add('border-solid', 'border-rose-500', 'bg-rose-950/40');
                    setTimeout(() => {
                        keranjangTarget.classList.add('border-dashed');
                        keranjangTarget.classList.remove('border-solid', 'border-rose-500', 'bg-rose-950/40');
                    }, 200);
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
        <div class="flex items-center justify-center" style="height: calc(100vh - 80px);">
            <div class="bg-slate-900 border border-slate-700 shadow-2xl rounded-[2rem] p-8 text-center max-w-md w-full fade-in">
                <i class="fa-solid fa-medal text-6xl text-amber-400 mb-4 animate-bounce"></i>
                <h1 class="text-2xl font-black text-white mb-2">SELESAI!</h1>
                
                <div class="bg-slate-800 p-4 rounded-xl mb-6 mt-4">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nilai Akhir</p>
                    <p class="text-5xl font-black text-emerald-400">${nilaiAkhir}</p>
                </div>
                
                <div class="flex justify-center gap-3">
                    <button onclick="bukaDragAndDropArena()" class="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 px-4 rounded-xl border border-slate-600 transition-colors shadow-sm text-xs uppercase">Menu</button>
                    <button onclick="bukaSetupGame('sort')" class="bg-emerald-500 hover:bg-emerald-400 text-white font-black py-2.5 px-6 rounded-xl shadow-md transition-transform text-xs uppercase">Main Lagi</button>
                </div>
            </div>
        </div>
    `;
}
