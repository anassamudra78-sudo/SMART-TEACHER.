function bukaDragAndDropArena() {
    const container = document.getElementById('main-content');
    
    container.innerHTML = `
        <div class="max-w-6xl mx-auto p-4 md:p-8 mt-2 fade-in relative pb-20">
            
            <!-- Efek Cahaya Latar -->
            <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <!-- HEADER LOBI -->
            <div class="text-center mb-12 md:mb-16 relative z-10">
                <div class="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 text-slate-300 px-5 py-2 rounded-full text-xs font-bold tracking-widest mb-6 uppercase shadow-sm">
                    <i class="fa-solid fa-gamepad text-indigo-400"></i> Smart Teacher Game Center
                </div>
                <h1 class="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-md">
                    DRAG & DROP <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">ARENA</span>
                </h1>
                <p class="text-slate-400 text-base md:text-lg font-medium max-w-2xl mx-auto">"Belajar, Bermain, dan Tantang Temanmu!"</p>
            </div>

            <!-- KOTAK PILIHAN GAME -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
                
                <!-- KARTU 1: MATCH & DROP -->
                <div class="bg-slate-900 border border-slate-700 p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300 flex flex-col group h-full">
                    
                    <div class="flex justify-between items-start mb-8">
                        <div class="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 group-hover:bg-blue-500/20 transition-colors">
                            <i class="fa-solid fa-puzzle-piece text-2xl text-blue-400"></i>
                        </div>
                        <div class="bg-blue-500/10 border border-blue-500/30 text-blue-400 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                            Solo & Battle
                        </div>
                    </div>
                    
                    <h3 class="text-2xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors">Match & Drop</h3>
                    <p class="text-slate-400 text-sm leading-relaxed mb-8 flex-1">Cocokkan dua objek yang memiliki hubungan yang benar. Pasangkan kosakata, arti, atau gambar dengan akurat!</p>
                    
                    <button onclick="bukaSetupGame('match')" class="w-full py-4 rounded-2xl font-black text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center gap-2">
                        <i class="fa-solid fa-play text-sm"></i> MAIN SEKARANG
                    </button>
                </div>

                <!-- KARTU 2: SORT & DROP -->
                <div class="bg-slate-900 border border-slate-700 p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300 flex flex-col group h-full">
                    
                    <div class="flex justify-between items-start mb-8">
                        <div class="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 group-hover:bg-emerald-500/20 transition-colors">
                            <i class="fa-solid fa-layer-group text-2xl text-emerald-400"></i>
                        </div>
                        <div class="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                            Solo & Battle
                        </div>
                    </div>
                    
                    <h3 class="text-2xl font-black text-white mb-3 group-hover:text-emerald-400 transition-colors">Sort & Drop</h3>
                    <p class="text-slate-400 text-sm leading-relaxed mb-8 flex-1">Kelompokkan jawaban ke kategori yang tepat. Bedakan Isim, Fi'il, dan materi lainnya dengan secepat kilat!</p>
                    
                    <button onclick="bukaSetupGame('sort')" class="w-full py-4 rounded-2xl font-black text-white bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center gap-2">
                        <i class="fa-solid fa-play text-sm"></i> MAIN SEKARANG
                    </button>
                </div>

                <!-- KARTU 3: BUILD & DROP -->
                <div class="bg-slate-900 border border-slate-700 p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-300 flex flex-col group h-full">
                    
                    <div class="flex justify-between items-start mb-8">
                        <div class="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 group-hover:bg-purple-500/20 transition-colors">
                            <i class="fa-solid fa-cubes-stacked text-2xl text-purple-400"></i>
                        </div>
                        <div class="bg-purple-500/10 border border-purple-500/30 text-purple-400 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                            Solo & Battle
                        </div>
                    </div>
                    
                    <h3 class="text-2xl font-black text-white mb-3 group-hover:text-purple-400 transition-colors">Build & Drop</h3>
                    <p class="text-slate-400 text-sm leading-relaxed mb-8 flex-1">Susun potongan kata atau balok menjadi urutan kalimat (Bahasa Arab) yang utuh dan sempurna!</p>
                    
                    <button onclick="bukaSetupGame('build')" class="w-full py-4 rounded-2xl font-black text-white bg-gradient-to-r from-purple-600 to-fuchsia-500 shadow-[0_4px_15px_rgba(168,85,247,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center gap-2">
                        <i class="fa-solid fa-play text-sm"></i> MAIN SEKARANG
                    </button>
                </div>

            </div>
        </div>
    `;
}
