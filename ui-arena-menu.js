function bukaDragAndDropArena() {
    const container = document.getElementById('main-content');
    
    container.innerHTML = `
        <div class="max-w-6xl mx-auto p-4 md:p-8 mt-4 fade-in relative pb-20">
            
            <!-- Efek Cahaya Latar Belakang (Estetik) -->
            <div class="absolute top-10 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div class="absolute bottom-10 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <!-- HEADER LOBI -->
            <div class="text-center mb-10 md:mb-16 relative z-10">
                <div class="inline-flex items-center gap-2 bg-indigo-900/50 border border-indigo-500/30 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-4 uppercase shadow-inner">
                    <i class="fa-solid fa-gamepad"></i> Smart Teacher Game Center
                </div>
                <h1 class="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-4 drop-shadow-[0_0_15px_rgba(99,102,241,0.3)] tracking-tight">DRAG & DROP ARENA</h1>
                <p class="text-slate-400 text-base md:text-lg font-medium">"Belajar, Bermain, dan Tantang Temanmu!"</p>
            </div>

            <!-- KOTAK PILIHAN GAME (KARTU GELAP) -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
                
                <!-- KARTU 1: MATCH & DROP (BIRU) -->
                <div class="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_40px_rgba(59,130,246,0.3)] hover:-translate-y-2 transition-all duration-300 flex flex-col group relative overflow-hidden">
                    <div class="absolute top-0 right-0 bg-blue-500/20 text-blue-400 text-[10px] font-black px-4 py-1.5 rounded-bl-2xl rounded-tr-[2rem] border-b border-l border-blue-500/30 uppercase tracking-widest">Solo & Battle</div>
                    
                    <div class="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 border border-slate-700 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300 shadow-inner group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        <i class="fa-solid fa-puzzle-piece text-3xl text-blue-400 group-hover:text-white transition-colors"></i>
                    </div>
                    
                    <h3 class="text-2xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors">Match & Drop</h3>
                    <p class="text-slate-400 text-sm leading-relaxed mb-8 flex-1">Cocokkan dua objek yang memiliki hubungan yang benar. Pasangkan kosakata, arti, atau gambar dengan akurat!</p>
                    
                    <button onclick="bukaSetupGame('match')" class="w-full py-3.5 rounded-xl font-bold text-blue-400 bg-slate-900 border border-slate-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:border-transparent transition-all duration-300 shadow-inner group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">MAIN SEKARANG</button>
                </div>

                <!-- KARTU 2: SORT & DROP (HIJAU) -->
                <div class="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_40px_rgba(16,185,129,0.3)] hover:-translate-y-2 transition-all duration-300 flex flex-col group relative overflow-hidden">
                    <div class="absolute top-0 right-0 bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-4 py-1.5 rounded-bl-2xl rounded-tr-[2rem] border-b border-l border-emerald-500/30 uppercase tracking-widest">Solo & Battle</div>
                    
                    <div class="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 border border-slate-700 group-hover:scale-110 group-hover:bg-emerald-600 transition-all duration-300 shadow-inner group-hover:shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                        <i class="fa-solid fa-layer-group text-3xl text-emerald-400 group-hover:text-white transition-colors"></i>
                    </div>
                    
                    <h3 class="text-2xl font-black text-white mb-3 group-hover:text-emerald-400 transition-colors">Sort & Drop</h3>
                    <p class="text-slate-400 text-sm leading-relaxed mb-8 flex-1">Kelompokkan jawaban ke kategori yang tepat. Bedakan Isim, Fi'il, dan materi lainnya dengan secepat kilat!</p>
                    
                    <button onclick="bukaSetupGame('sort')" class="w-full py-3.5 rounded-xl font-bold text-emerald-400 bg-slate-900 border border-slate-700 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-inner group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">MAIN SEKARANG</button>
                </div>

                <!-- KARTU 3: BUILD & DROP (UNGU) -->
                <div class="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_40px_rgba(168,85,247,0.3)] hover:-translate-y-2 transition-all duration-300 flex flex-col group relative overflow-hidden">
                    <div class="absolute top-0 right-0 bg-purple-500/20 text-purple-400 text-[10px] font-black px-4 py-1.5 rounded-bl-2xl rounded-tr-[2rem] border-b border-l border-purple-500/30 uppercase tracking-widest">Solo & Battle</div>
                    
                    <div class="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 border border-slate-700 group-hover:scale-110 group-hover:bg-purple-600 transition-all duration-300 shadow-inner group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                        <i class="fa-solid fa-cubes-stacked text-3xl text-purple-400 group-hover:text-white transition-colors"></i>
                    </div>
                    
                    <h3 class="text-2xl font-black text-white mb-3 group-hover:text-purple-400 transition-colors">Build & Drop</h3>
                    <p class="text-slate-400 text-sm leading-relaxed mb-8 flex-1">Susun potongan kata atau balok menjadi urutan kalimat (Bahasa Arab) yang utuh dan sempurna!</p>
                    
                    <button onclick="bukaSetupGame('build')" class="w-full py-3.5 rounded-xl font-bold text-purple-400 bg-slate-900 border border-slate-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-fuchsia-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-inner group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">MAIN SEKARANG</button>
                </div>

            </div>
        </div>
    `;
}
