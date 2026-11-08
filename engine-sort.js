// ==========================================================
// FILE: engine-sort.js
// FUNGSI: Mesin Game "Sort & Drop" (TEMA GELAP ELEGAN)
// ==========================================================

let sortState = {
    skor: 0,
    itemTerjawab: 0,
    kategori: [
        { id: "isim", judul: "ISIM", subjudul: "Kata Benda", warna: "cyan" },
        { id: "fiil", judul: "FI'IL", subjudul: "Kata Kerja", warna: "rose" }
    ],
    dataSoal: [
        { id: "s1", soal: "كِتَابٌ", arti: "Buku", kat: "isim" },
        { id: "s2", soal: "قَرَأَ", arti: "Membaca", kat: "fiil" },
        { id: "s3", soal: "مَدْرَسَةٌ", arti: "Sekolah", kat: "isim" },
        { id: "s4", soal: "يَكْتُبُ", arti: "Menulis", kat: "fiil" },
        { id: "s5", soal: "قَلَمٌ", arti: "Pena", kat: "isim" },
        { id: "s6", soal: "جَلَسَ", arti: "Duduk", kat: "fiil" },
        { id: "s7", soal: "مَسْجِدٌ", arti: "Masjid", kat: "isim" },
        { id: "s8", soal: "يَذْهَبُ", arti: "Pergi", kat: "fiil" }
    ]
};

function bukaSetupGame(jenisGame) {
    if (jenisGame === 'match') {
        if (typeof mulaiGameMatch === 'function') mulaiGameMatch();
    } else if (jenisGame === 'sort') {
        mulaiGameSort();
    }
}

function mulaiGameSort() {
    const container = document.getElementById('main-content');
    sortState.skor = 0;
    sortState.itemTerjawab = 0;

    let soalAcak = [...sortState.dataSoal].sort(() => Math.random() - 0.5);

    container.innerHTML = `
        <div class="max-w-6xl mx-auto px-4 md:px-6 pt-2 pb-10 mt-1 select-none fade-in relative">
            
            <!-- Efek Cahaya Latar -->
            <div class="absolute top-0 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <!-- HEADER -->
            <div class="flex justify-between items-center bg-slate-900 p-3 md:p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] mb-6 border border-slate-700 relative z-10">
                <h2 class="text-base md:text-xl font-black text-white flex items-center gap-2 drop-shadow-md"><i class="fa-solid fa-layer-group text-emerald-400"></i>SORT & DROP</h2>
                <div class="font-bold text-emerald-400 bg-slate-800 px-4 py-1 md:py-2 rounded-xl border border-slate-700 shadow-inner">Nilai: <span id="skor-sort" class="font-black text-white text-lg md:text-xl ml-1">0</span></div>
                <button onclick="bukaDragAndDropArena()" class="bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-1 md:py-2 rounded-xl font-bold transition-colors border border-slate-600">Keluar</button>
            </div>

            <div class="flex flex-col gap-6 relative z-10">
                
                <!-- AREA ATAS: BALOK KATA ACAK -->
                <div class="bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-700 shadow-lg min-h-[150px]">
                    <h3 class="text-center font-bold text-slate-400 mb-4 uppercase tracking-widest text-xs border-b border-slate-700/50 pb-2">Pilih & Seret Kata</h3>
                    
                    <div class="flex flex-wrap justify-center gap-3 md:gap-4" id="wadah-balok-sort">
                        ${soalAcak.map(item => `
                            <div class="balok-sort touch-none bg-indigo-600 border-2 border-indigo-500 text-white rounded-2xl px-5 py-3 shadow-lg cursor-grab transition-transform relative overflow-hidden flex flex-col items-center justify-center min-w-[100px]" data-id="${item.id}" data-kat="${item.kat}">
                                <span class="font-arabic text-3xl md:text-4xl drop-shadow-md leading-none mb-1 pointer-events-none">${item.soal}</span>
                                <span class="text-[10px] md:text-xs font-medium text-indigo-200 pointer-events-none">${item.arti}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- AREA BAWAH: KERANJANG KATEGORI -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${sortState.kategori.map(kat => {
                        // Menentukan warna keranjang berdasarkan data
                        let warnaGaris = kat.warna === 'cyan' ? 'border-cyan-500' : 'border-rose-500';
                        let warnaBg = kat.warna === 'cyan' ? 'bg-cyan-950/30' : 'bg-rose-950/30';
                        let warnaTeks = kat.warna === 'cyan' ? 'text-cyan-400' : 'text-rose-400';
                        
                        return `
                            <div class="keranjang-target ${warnaBg} border-2 border-dashed${warnaGaris} rounded-3xl p-6 flex flex-col items-center justify-center transition-all shadow-inner relative overflow-hidden min-h-[200px]" data-target="${kat.id}">
                                <i class="fa-solid fa-box-open text-4xl mb-2 ${warnaTeks} opacity-50"></i>
                                <h2 class="text-3xl font-black ${warnaTeks} tracking-widest drop-shadow-md">${kat.judul}</h2>
                                <p class="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">${kat.subjudul}</p>
                                
                                <!-- Wadah jika balok berhasil masuk -->
                                <div class="isi-keranjang w-full flex flex-wrap justify-center gap-2 mt-4 pointer-events-none"></div>
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
            balok.classList.add('scale-110', 'shadow-2xl', 'ring-4', 'ring-indigo-400/50');
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
            balok.classList.remove('scale-110', 'shadow-2xl', 'ring-4', 'ring-indigo-400/50');
            
            let sentuhan = e.changedTouches[0];
            balok.style.display = 'none';
            let elemenDiBawah = document.elementFromPoint(sentuhan.clientX, sentuhan.clientY);
            balok.style.display = 'flex';

            let keranjangTarget = elemenDiBawah ? elemenDiBawah.closest('.keranjang-target') : null;

            if (keranjangTarget) {
                if (balok.getAttribute('data-kat') === keranjangTarget.getAttribute('data-target')) {
                    // BENAR! Masuk Keranjang
                    terkunci = true;
                    balok.style.position = 'static';
                    
                    // Merubah bentuk balok menjadi lebih kecil agar muat banyak di dalam keranjang
                    balok.className = 'bg-slate-800 border border-slate-600 text-white rounded-xl px-3 py-1 shadow-sm flex items-center gap-2 transition-all';
                    balok.innerHTML = `<span class="font-arabic text-xl">${balok.querySelector('.font-arabic').innerText}</span> <i class="fa-solid fa-check text-emerald-400 text-xs"></i>`;
                    
                    let isiKeranjang = keranjangTarget.querySelector('.isi-keranjang');
                    isiKeranjang.appendChild(balok);
                    
                    // Efek keranjang menyala sesaat
                    keranjangTarget.classList.add('bg-emerald-900/40', 'border-emerald-500', 'border-solid');
                    keranjangTarget.classList.remove('border-dashed');
                    setTimeout(() => {
                        keranjangTarget.classList.remove('bg-emerald-900/40', 'border-emerald-500', 'border-solid');
                        keranjangTarget.classList.add('border-dashed');
                    }, 400);
                    
                    let nilaiPerSoal = 100 / sortState.dataSoal.length;
                    sortState.skor += nilaiPerSoal;
                    sortState.itemTerjawab++;
                    
                    document.getElementById('skor-sort').innerText = Math.round(sortState.skor);
                    if (typeof playSoundEffect === 'function') playSoundEffect('correct'); 

                    if (sortState.itemTerjawab === sortState.dataSoal.length) {
                        setTimeout(() => selebrasiKemenanganSort(), 500);
                    }
                } else {
                    // SALAH KERANJANG!
