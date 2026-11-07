function bukaSetupGame(jenisGame) {
    if (jenisGame === 'match') {
        mulaiGameMatch();
    } else {
        alert("Sabar Pak, mode ini segera kita buat! 🚀");
    }
}

function mulaiGameMatch() {
    const container = document.getElementById('main-content');
    
    container.innerHTML = `
        <div class="max-w-4xl mx-auto p-4 md:p-8 mt-4 fade-in">
            <!-- HEADER GAME -->
            <div class="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm mb-8 border border-slate-200">
                <h2 class="text-2xl font-black text-blue-600"><i class="fa-solid fa-puzzle-piece mr-2"></i>MATCH & DROP</h2>
                <button onclick="bukaDragAndDropArena()" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold transition-colors">
                    <i class="fa-solid fa-arrow-left mr-2"></i>Kembali
                </button>
            </div>

            <!-- PAPAN MAIN (TAMPILAN AWAL) -->
            <div class="flex justify-between gap-4 md:gap-10">
                
                <!-- KIRI: KOSAKATA ARAB -->
                <div class="w-1/2 flex flex-col gap-4">
                    <div class="bg-blue-500 text-white font-arabic text-3xl md:text-4xl font-bold p-6 rounded-2xl shadow-lg text-center cursor-grab">كِتَابٌ</div>
                    <div class="bg-blue-500 text-white font-arabic text-3xl md:text-4xl font-bold p-6 rounded-2xl shadow-lg text-center cursor-grab">قَلَمٌ</div>
                </div>

                <!-- KANAN: KOTAK TARGET JAWABAN -->
                <div class="w-1/2 flex flex-col gap-4">
                    <div class="bg-white border-4 border-dashed border-slate-300 text-slate-500 font-bold text-lg md:text-xl p-6 rounded-2xl text-center flex items-center justify-center min-h-[90px]">Buku</div>
                    <div class="bg-white border-4 border-dashed border-slate-300 text-slate-500 font-bold text-lg md:text-xl p-6 rounded-2xl text-center flex items-center justify-center min-h-[90px]">Pulpen</div>
                </div>

            </div>
        </div>
    `;
}
