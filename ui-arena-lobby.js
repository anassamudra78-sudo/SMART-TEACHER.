// ==========================================================
// FILE: ui-arena-lobby.js
// FUNGSI: Lobi Pertandingan Multiplayer (TEMA GELAP ELEGAN)
// ==========================================================

function renderLobbyBattle(roomCode, isHost) {
    const container = document.getElementById('main-content');
    
    container.innerHTML = `
        <div class="max-w-3xl mx-auto p-4 md:p-6 text-center fade-in relative">
            
            <!-- Efek Cahaya Latar Belakang -->
            <div class="absolute top-0 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div class="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>

            <!-- Pesan Mode Demo (Gelap) -->
            <div class="bg-amber-900/40 text-amber-400 p-3 rounded-xl mb-6 border border-amber-700/50 shadow-inner relative z-10 flex items-center justify-center gap-2 text-sm font-medium">
                <i class="fa-solid fa-triangle-exclamation"></i>
                MODE DEMO: Simulasi Multiplayer (Belum Terkoneksi Server Real-time)
            </div>

            <!-- Header Lobi -->
            <div class="relative z-10 mb-10">
                <h2 class="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-3 drop-shadow-[0_0_10px_rgba(99,102,241,0.3)] tracking-tight">LOBBY PERTANDINGAN</h2>
                <div class="text-lg md:text-xl text-slate-300 font-medium">
                    KODE ROOM: <span class="font-mono bg-slate-800 text-emerald-400 px-4 py-1.5 rounded-lg border border-slate-700 shadow-inner tracking-widest font-bold ml-2">${roomCode || 'DEMO-123'}</span>
                </div>
            </div>

            <!-- Area Pemain -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 relative z-10">
                
                <!-- PEMAIN 1 (KAMU) - Nyala & Aktif -->
                <div class="bg-slate-800/80 backdrop-blur-md p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-indigo-500/50 relative overflow-hidden group hover:border-indigo-400 transition-colors">
                    <div class="absolute inset-0 bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors"></div>
                    
                    <div class="w-24 h-24 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)] border-4 border-slate-800 relative z-10">
                        <i class="fa-solid fa-user-astronaut text-4xl text-white"></i>
                    </div>
                    
                    <h3 class="text-xl font-bold text-white mb-3 relative z-10">Player 1 <span class="text-indigo-400 font-normal">(Kamu)</span></h3>
                    <span class="bg-emerald-900/50 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-500/30 uppercase tracking-widest shadow-inner relative z-10">Siap</span>
                </div>

                <!-- PEMAIN 2 (LAWAN) - Redup & Menunggu -->
                <div class="bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl shadow-md border-2 border-dashed border-slate-700 relative overflow-hidden">
                    <div class="w-24 h-24 bg-slate-800 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-slate-900 relative z-10 opacity-70">
                        <i class="fa-solid fa-user-ninja text-4xl text-slate-500"></i>
                    </div>
                    
                    <h3 class="text-xl font-bold text-slate-500 mb-3 relative z-10 animate-pulse">Menunggu Lawan...</h3>
                    <span class="bg-slate-800 text-slate-500 px-4 py-1.5 rounded-full text-xs font-bold border border-slate-700 uppercase tracking-widest relative z-10">Kosong</span>
                </div>
                
            </div>

            <!-- Tombol Mulai -->
            <div class="relative z-10">
                <button disabled class="bg-slate-800 text-slate-500 font-black text-lg md:text-xl py-4 px-10 md:px-12 rounded-2xl border border-slate-700 w-full md:w-auto shadow-inner cursor-not-allowed transition-all uppercase tracking-widest">
                    MULAI PERTANDINGAN <span class="text-sm font-medium ml-2 normal-case">(Menunggu)</span>
                </button>
            </div>
            
            <div class="mt-6 relative z-10">
                 <button onclick="bukaDragAndDropArena()" class="text-slate-400 hover:text-white font-medium text-sm transition-colors border-b border-transparent hover:border-white pb-1">
                    <i class="fa-solid fa-arrow-left mr-2"></i>Kembali ke Lobi Utama
                 </button>
            </div>

        </div>
    `;
}
