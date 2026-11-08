// ==========================================================
// FILE: engine-sort.js
// FUNGSI: Mesin "Sort & Drop" (DINAMIS: BISA GANTI GAYA LAYOUT & KONTEN)
// ==========================================================

let sortState = {
    skor: 0,
    itemTerjawab: 0,
    layout: 'kiri-kanan', // Default layout
    kategori: [
        { id: "isim", judul: "ISIM", subjudul: "(Kata Benda)", warna: "cyan" },
        { id: "fiil", judul: "FI'IL", subjudul: "(Kata Kerja)", warna: "rose" }
    ],
    // Data dicampur teks dan gambar (emoji) agar dinamis
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
    dataSoal: [] // Data yang sedang dimainkan
};

function bukaSetupGame(jenisGame) {
    if (jenisGame === 'match') {
        if (typeof mulaiGameMatch === 'function') mulaiGameMatch();
    } else if (jenisGame === 'sort') {
        sortState.layout = 'kiri-kanan'; 
        sortState.dataSoal = [...sortState.dataSoalAsli].sort(() => Math.random() - 0.5);
        mulaiGameSort();
    }
}

// Fungsi untuk mengganti layout secara langsung
function ubahGayaLayout(gayaBaru) {
    sortState.layout = gayaBaru;
    mulaiGameSort(true); // render ulang tanpa mereset skor/data
}

function mulaiGameSort(isRenderUlang = false) {
    const container = document.getElementById('main-content');
    
    if (!isRenderUlang) {
        sortState.skor = 0;
        sortState.itemTerjawab = 0;
        sortState.dataSoal = [...sortState.dataSoalAsli].sort(() => Math.random() - 0.5);
    }

    // Penentuan Class CSS berdasarkan Layout yang dipilih
    let classBungkusUtama = sortState.layout === 'kiri-kanan' 
        ? 'flex flex-col lg:flex-row items-stretch' 
        : 'flex flex-col'; // Atas-Bawah
        
    let classWadahSoal = sortState.layout === 'kiri-kanan' 
        ? 'w-full lg:w-4/12' 
        : 'w-full';

    let classWadahKeranjang = sortState.layout === 'kiri-kanan' 
        ? 'w-full lg:w-8/12 grid grid-cols-1 sm:grid-cols-2' 
        : 'w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

    let classGridBalok = sortState.layout === 'kiri-kanan'
        ? 'grid grid-cols-2'
        : 'flex flex-wrap justify-center';

    container.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 md:px-6 pt-2 pb-10 mt-1 select-none fade-in relative">
            
            <!-- Efek Cahaya Latar -->
            <div class="absolute top-0 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <!-- HEADER & PANEL KONTROL GAYA -->
            <div class="flex flex-col md:flex-row justify-between items-center bg-slate-900 p-3 md:p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] mb-6 border border-slate-700 relative z-10 gap-4">
                
                <h2 class="text-base md:text-xl font-black text-white flex items-center gap-2 drop-shadow-md">
                    <i class="fa-solid fa-layer-group text-emerald-400"></i>SORT & DROP
                </h2>
                
                <!-- TOGGLE GAYA LAYOUT -->
                <div class="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
                    <button onclick="ubahGayaLayout('kiri-kanan')" class="px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${sortState.layout === 'kiri-kanan' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}">Kiri-Kanan</button>
                    <button onclick="ubahGayaLayout('atas-bawah')" class="px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${sortState.layout === 'atas-bawah' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}">Atas-Bawah</button>
                </div>

                <div class="flex items-center gap-3">
                    <div class="font-bold text-emerald-400 bg-slate-800 px-4 py-1.5 rounded-xl border border-slate-700 shadow-inner">Nilai: <span id="skor-sort" class="font-black text-white ml-1">${Math.round(sortState.skor)}</span></div>
                    <button onclick="bukaDragAndDropArena()" class="bg-slate-700 hover:bg-rose-600 text-slate-200 px-4 py-1.5 rounded-xl font-bold transition-colors border border-slate-600">Keluar</button>
                </div>
            </div>

            <!-- LAYOUT UTAMA (Dinamis berubah kelas CSS-nya) -->
            <div class="${classBungkusUtama} gap-6 relative z-10">
                
                <!-- AREA KATA (ITEMS TO SORT) -->
                <div class="${classWadahSoal} bg-slate-900/90 backdrop-blur-md p-4 md:p-6 rounded-3xl border border-slate-700 shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex flex-col">
                    <h3 class="text-center font-bold text-slate-400 mb-4 uppercase tracking-widest text-[10px] md:text-xs border-b border-slate-700/80 pb-3 flex items-center justify-center gap-2">
                        <i class="fa-solid fa-hand-pointer text-indigo-400"></i> Seret Objek ke Kategori
                    </h3>
                    
                    <div class="${classGridBalok} gap-3" id="wadah-balok-sort">
                        ${sortState.dataSoal.map((item, index) => {
                            if(item.terjawab) return ''; // Sembunyikan jika sudah dirender di keranjang

                            let kontenVisual = item.tipe === 'gambar' 
                                ? `<span class="text-4xl md:text-5xl drop-shadow-md mb-1 pointer-events-none">${item.soal}</span>` 
                                : `<span class="font-arabic text-2xl md:text-3xl drop-shadow-md leading-none mb-1 pointer-events-none">${item.soal}</span>`;
                            
                            let w = item.tipe === 'gambar' ? 'bg-slate-800 border-slate-600' : 'bg-indigo-600 border-indigo-500';
                            let classUkuran = sortState.layout === 'kiri-kanan' ? 'w-full' : 'w-24 md:w-28';

                            return `
                                <div class="balok-sort touch-none ${w} border-2 text-white rounded-xl md:rounded-2xl p-3 shadow-lg cursor-grab transition-transform relative overflow-hidden flex flex-col items-center justify-center min-h-[80px] ${classUkuran}" data-id="${item.id}" data-kat="${item.kat}">
                                    ${kontenVisual}
                                    <span class="text-[10px] font-bold text-white/70 pointer-events-none tracking-wide">${item.arti}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- AREA KERANJANG KATEGORI -->
                <div class="${classWadahKeranjang} gap-5 md:gap-6" id="area-kategori">
                    ${sortState.kategori.map(kat => {
                        let warnaGaris = kat.warna === 'cyan' ? 'border-cyan-500' : 'border-rose-500';
                        let warnaHeaderBg = kat.warna === 'cyan' ? 'bg-cyan-950' : 'bg-rose-950';
                        let warnaTeks = kat.warna === 'cyan' ? 'text-cyan-400' : 'text-rose-400';
                        let warnaWadahDalam = kat.warna === 'cyan' ? 'bg-cyan-950/20' : 'bg-rose-950/20';
                        
                        // Render ulang balok yang sudah masuk ke keranjang ini
                        let balokMasuk = sortState.dataSoal.filter(s => s.terjawab && s.kat === kat.id).map(b => {
                            let kontenGepeng = b.tipe === 'gambar' ? `<span class="text-xl">${b.soal}</span>` : `<span class="font-arabic text-lg text-white">${b.soal}</span>`;
                            return `
                                <div class="bg-slate-800 border border-emerald-500 text-emerald-400 rounded-xl px-3 py-1.5 shadow-sm flex items-center justify-between transition-all w-full md:w-[48%]">
                                    <div class="flex items-center gap-2">
                                        ${kontenGepeng}
                                        <span class="text-[10px] text-slate-400">(${b.arti})</span>
                                    </div>
                                    <i class="fa-solid fa-check-circle text-emerald-500 text-sm"></i>
                                </div>
                            `;
                        }).join('');

                        return `
                            <div class="keranjang-target bg-slate-900 border-2 ${warnaGaris} rounded-3xl flex flex-col transition-all shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden h-full min-h-[200px]" data-target="${kat.id}">
                                
                                <div class="${warnaHeaderBg} border-b ${warnaGaris} p-3 text-center shadow-md">
                                    <h2 class="text-xl md:text-2xl font-black ${warnaTeks} tracking-widest drop-shadow-md">${kat.judul}</h2>
                                </div>
                                
                                <div class="isi-keranjang flex-1 ${warnaWadahDalam} p-3 flex flex-row flex-wrap gap-2 content-start transition-colors relative z-0">
                                    <div class="placeholder-teks absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 ${balokMasuk ? 'hidden' : ''}">
                                        <i class="fa-solid fa-box-open text-5xl ${warnaTeks}"></i>
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
            balok.classList.add('scale-110', 'shadow-2xl');
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
            balok.classList.remove('scale-110', 'shadow-2xl');
            
            let sentuhan = e.changedTouches[0];
            balok.style.display = 'none';
            let elemenDiBawah = document.elementFromPoint(sentuhan.clientX, sentuhan.clientY);
            balok.style.display = 'flex';

            let keranjangTarget = elemenDiBawah ? elemenDiBawah.closest('.keranjang-target') : null;

            if (keranjangTarget) {
                if (balok.getAttribute('data-kat') === keranjangTarget.getAttribute('data-target')) {
                    terkunci = true;
                    balok.style.position = 'static';
                    
                    let idSoal = balok.getAttribute('data-id');
                    let soalData = sortState.dataSoal.find(s => s.id === idSoal);
                    if(soalData) soalData.terjawab = true;
                    
                    // Trigger render ulang agar tampilannya rapi sesuai mode layout
                    mulaiGameSort(true); 

                    let nilaiPerSoal = 100 / sortState.dataSoal.length;
                    sortState.skor += nilaiPerSoal;
                    sortState.itemTerjawab++;
                    
                    document.getElementById('skor-sort').innerText = Math.round(sortState.skor);
                    if (typeof playSoundEffect === 'function') playSoundEffect('correct'); 

                    if (sortState.itemTerjawab === sortState.dataSoal.length) {
                        setTimeout(() => selebrasiKemenanganSort(), 500);
                    }
                } else {
                    balok.style.position = 'static';
                    wadahAsal.appendChild(balok);
                    if (typeof playSoundEffect === 'function') playSoundEffect('wrong'); 
                    
                    let wadahDalam = keranjangTarget.querySelector('.isi-keranjang');
                    wadahDalam.classList.add('bg-rose-900/50');
                    setTimeout(() => wadahDalam.classList.remove('bg-rose-900/50'), 300);
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
            <h1 class="text-4xl font-black text-white mb-2">PENGELOMPOKKAN SELESAI!</h1>
            
            <div class="bg-slate-800 p-6 rounded-3xl mb-8 mt-6 border border-slate-700">
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Nilai Akhir</p>
                <p class="text-7xl font-black text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">${nilaiAkhir}</p>
            </div>
            
            <div class="flex justify-center gap-4">
                <button onclick="bukaDragAndDropArena()" class="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-2xl border border-slate-600 transition-colors">Menu Game</button>
                <button onclick="bukaSetupGame('sort')" class="bg-emerald-500 hover:bg-emerald-400 text-white font-black py-3 px-8 rounded-2xl shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-transform">MAIN LAGI</button>
            </div>
        </div>
    `;
}
