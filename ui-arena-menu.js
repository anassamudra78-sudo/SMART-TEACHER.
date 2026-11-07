// ==========================================================
// FILE: ui-arena-menu.js
// FUNGSI: Render Halaman Utama Drag & Drop Arena
// ==========================================================

function bukaDragAndDropArena() {
    const container = document.getElementById('main-content'); // Gunakan container utama aplikasi Bapak
    
    container.innerHTML = `
        <div class="max-w-5xl mx-auto p-4 md:p-8 animate-fade-in text-center">
            
            <!-- HEADER -->
            <div class="mb-10">
                <div class="inline-block bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full font-bold text-sm mb-4 border border-indigo-200 shadow-sm">
                    <i class="fa-solid fa-gamepad mr-2"></i>SMART TEACHER GAME CENTER
                </div>
                <h1 class="text-4xl md:text-5xl font-black text-slate-800 mb-3 drop-shadow-sm">DRAG & DROP ARENA</h1>
                <p class="text-slate-500 text-lg font-medium">"Belajar, Bermain, dan Tantang Temanmu!"</p>
            </div>

            <!-- KARTU GAME -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                
                <!-- KARTU 1: MATCH & DROP -->
                <div class="group relative bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(59,130,246,0.15)] border-2 border-transparent hover:border-blue-400 hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden text-left" onclick="bukaSetupGame('match')">
                    <div class="absolute top-0 right-0 bg-blue-500 text-white font-bold text-xs px-3 py-1 rounded-bl-xl z-10">SOLO & BATTLE</div>
                    <div class="w-16 h-16 bg-blue-100 text-blue-500 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-inner">
                        <i class="fa-solid fa-puzzle-piece"></i>
                    </div>
                    <h2 class="text-2xl font-black text-slate-800 mb-2">Match & Drop</h2>
                    <p class="text-slate-500 text-sm mb-6 leading-relaxed">Cocokkan dua objek yang memiliki hubungan yang benar. Pasangkan kosakata, arti, atau gambar!</p>
                    <button class="w-full bg-slate-50 text-blue-600 font-bold py-3 rounded-xl border border-blue-100 group-hover:bg-blue-500 group-hover:text-white transition-colors shadow-sm">MAIN SEKARANG</button>
                </div>

                <!-- KARTU 2: SORT & DROP -->
                <div class="group relative bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(16,185,129,0.15)] border-2 border-transparent hover:border-emerald-400 hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden text-left" onclick="bukaSetupGame('sort')">
                    <div class="absolute top-0 right-0 bg-emerald-500 text-white font-bold text-xs px-3 py-1 rounded-bl-xl z-10">SOLO & BATTLE</div>
                    <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-inner">
                        <i class="fa-solid fa-layer-group"></i>
                    </div>
                    <h2 class="text-2xl font-black text-slate-800 mb-2">Sort & Drop</h2>
                    <p class="text-slate-500 text-sm mb-6 leading-relaxed">Kelompokkan jawaban ke kategori yang tepat. Bedakan Isim, Fi'il, dan materi lainnya dengan cepat!</p>
                    <button class="w-full bg-slate-50 text-emerald-600 font-bold py-3 rounded-xl border border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white transition-colors shadow-sm">MAIN SEKARANG</button>
                </div>

                <!-- KARTU 3: BUILD & DROP -->
                <div class="group relative bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(168,85,247,0.15)] border-2 border-transparent hover:border-purple-400 hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden text-left" onclick="bukaSetupGame('build')">
                    <div class="absolute top-0 right-0 bg-purple-500 text-white font-bold text-xs px-3 py-1 rounded-bl-xl z-10">SOLO & BATTLE</div>
                    <div class="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-inner">
                        <i class="fa-solid fa-cubes"></i>
                    </div>
                    <h2 class="text-2xl font-black text-slate-800 mb-2">Build & Drop</h2>
                    <p class="text-slate-500 text-sm mb-6 leading-relaxed">Susun potongan kata atau balok menjadi urutan kalimat (Bahasa Arab) yang sempurna!</p>
                    <button class="w-full bg-slate-50 text-purple-600 font-bold py-3 rounded-xl border border-purple-100 group-hover:bg-purple-500 group-hover:text-white transition-colors shadow-sm">MAIN SEKARANG</button>
                </div>

            </div>
        </div>
    `;
}
