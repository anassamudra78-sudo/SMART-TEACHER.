function renderLobbyBattle(roomCode, isHost) {
    const container = document.getElementById('main-content');
    
    container.innerHTML = `
        <div class="max-w-3xl mx-auto p-6 text-center">
            
            <div class="bg-amber-100 text-amber-700 p-3 rounded-lg mb-6 border border-amber-200 flex items-center justify-center gap-2 font-bold text-sm">
                <i class="fa-solid fa-triangle-exclamation"></i>
                MODE DEMO: Simulasi Multiplayer (Belum Terkoneksi Server Real-time)
            </div>

            <h2 class="text-3xl font-black mb-2">LOBBY PERTANDINGAN</h2>
            <div class="text-xl mb-8">KODE ROOM: <span class="font-mono bg-slate-800 text-white px-4 py-1 rounded tracking-widest">${roomCode}</span></div>

            <div class="grid grid-cols-2 gap-8 mb-10">
                <!-- PEMAIN 1 -->
                <div class="bg-white p-6 rounded-3xl shadow-lg border-4 border-indigo-500">
                    <div class="w-24 h-24 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">🧑‍🎓</div>
                    <h3 class="text-xl font-bold mb-2">Player 1 (Kamu)</h3>
                    <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold"><i class="fa-solid fa-check mr-1"></i> SIAP</span>
                </div>

                <!-- PEMAIN 2 -->
                <div class="bg-slate-50 p-6 rounded-3xl shadow border-2 border-dashed border-slate-300">
                    <div class="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl animate-pulse text-slate-400">?</div>
                    <h3 class="text-xl font-bold text-slate-500 mb-2">Menunggu Lawan...</h3>
                    <span class="bg-slate-200 text-slate-500 px-3 py-1 rounded-full text-xs font-bold">BELUM SIAP</span>
                </div>
            </div>

            <button disabled class="bg-slate-300 text-slate-500 font-black text-xl py-4 px-12 rounded-2xl shadow">
                MULAI PERTANDINGAN (Menunggu)
            </button>
        </div>
    `;
}
