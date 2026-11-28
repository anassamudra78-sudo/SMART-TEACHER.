// ==========================================================
// FILE: ui-master.js
// FUNGSI: Data Akademik (CRUD), Penilaian, Rapor & Absen
// ==========================================================

function renderSekolah(container) {
    container.innerHTML = `
        <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 lg:p-8 max-w-3xl">
            <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-6 border-b dark:border-slate-800 pb-4">Identitas Institusi</h3>
            <div class="space-y-4">
                <div><label class="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">Nama Sekolah</label>
                     <input type="text" id="sch-nama" value="${AppState.db.sekolah.nama}" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500 outline-none dark:text-white"></div>
                <div><label class="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">NPSN</label>
                     <input type="text" id="sch-npsn" value="${AppState.db.sekolah.npsn || ''}" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500 outline-none dark:text-white"></div>
                <div><label class="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">Alamat Lengkap</label>
                     <input type="text" id="sch-alamat" value="${AppState.db.sekolah.alamat || ''}" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500 outline-none dark:text-white"></div>
                <div class="grid grid-cols-2 gap-4">
                    <div><label class="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">Tahun Ajaran</label>
                         <input type="text" id="sch-ta" value="${AppState.db.sekolah.tahunAjaran}" placeholder="2026/2027" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 outline-none dark:text-white"></div>
                    <div><label class="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">Semester</label>
                         <select id="sch-smt" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 outline-none dark:text-white">
                             <option value="Ganjil" ${AppState.db.sekolah.semester==='Ganjil'?'selected':''}>Ganjil</option>
                             <option value="Genap" ${AppState.db.sekolah.semester==='Genap'?'selected':''}>Genap</option>
                         </select></div>
                </div>
                <div><label class="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">Nama Kepala Sekolah</label>
                     <input type="text" id="sch-kepsek" value="${AppState.db.sekolah.kepsek}" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 outline-none dark:text-white"></div>
                <div><label class="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">NIP Kepala Sekolah</label>
                     <input type="text" id="sch-nip" value="${AppState.db.sekolah.nip}" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 outline-none dark:text-white"></div>
                <button onclick="simpanSekolah()" class="mt-6 w-full bg-slate-900 dark:bg-slate-800 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 shadow-lg">Simpan Identitas</button>
            </div>
        </div>
    `;
}

function simpanSekolah() {
    AppState.db.sekolah.nama = document.getElementById('sch-nama').value;
    AppState.db.sekolah.npsn = document.getElementById('sch-npsn').value;
    AppState.db.sekolah.alamat = document.getElementById('sch-alamat').value;
    AppState.db.sekolah.tahunAjaran = document.getElementById('sch-ta').value;
    AppState.db.sekolah.semester = document.getElementById('sch-smt').value;
    AppState.db.sekolah.kepsek = document.getElementById('sch-kepsek').value;
    AppState.db.sekolah.nip = document.getElementById('sch-nip').value;
    forceSaveNotification();
}

function pastikanKolomKKMMapel() {
    if (typeof crudConfig !== 'undefined' && crudConfig.mapel && Array.isArray(crudConfig.mapel.fields)) {
        if (!crudConfig.mapel.fields.some(f => f.id === 'kkm')) {
            crudConfig.mapel.fields.push({ id: 'kkm', label: 'KKM', type: 'number', placeholder: '72' });
        }
    }
}

function renderCRUD(container, type) {
    pastikanKolomKKMMapel();
    const config = crudConfig[type];
    let data = AppState.db[type] || [];
    let filterDropdownHtml = '';

    if (type === 'siswa') {
        const currentFilter = AppState.ui.filterKelasSiswa || '';
        const opsiKelas = AppState.db.kelas.map(k => `<option value="${k.id}" ${currentFilter === k.id ? 'selected' : ''}>${k.kode}</option>`).join('');

        filterDropdownHtml = `
            <select onchange="AppState.ui.filterKelasSiswa = this.value; renderCRUD(document.getElementById('main-content'), '${type}')" class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold py-2 px-3 rounded-xl text-xs shadow-sm transition-all outline-none focus:ring-2 focus:ring-indigo-500 max-w-[130px] truncate shrink-0">
                <option value="">-- Semua Kelas --</option>
                ${opsiKelas}
            </select>
        `;
        if (currentFilter) data = data.filter(item => item.kelasId === currentFilter);
    }

    const dataAsliUtuh = AppState.db[type] || [];
    const kamusRelasi = {};
    config.fields.forEach(f => {
        if (f.type === 'dynamicSelect') {
            kamusRelasi[f.source] = {};
            (AppState.db[f.source] || []).forEach(r => { kamusRelasi[f.source][r.id] = r; });
        }
    });

    let tableRows = data.length === 0
        ? `<tr><td colspan="${config.fields.length+3}" class="text-center py-12 text-slate-400 font-medium text-sm">Belum ada data ${config.title}.</td></tr>`
        : data.map((item, idx) => {
            let tdFields = config.fields.map(f => {
                let val = item[f.id] || '-';
                if(f.type === 'dynamicSelect') {
                    const ref = kamusRelasi[f.source] ? kamusRelasi[f.source][item[f.id]] : null;
                    val = ref ? ref[f.displayField] : (item[f.id] || '<span class="text-rose-400 font-semibold italic">Belum diatur</span>');
                }
                let amanVal = String(val).includes('<span class="text-rose-400') ? val : escapeHTML(val);
                return `<td class="py-4 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300 max-w-[180px] truncate">${amanVal}</td>`;
            }).join('');

            return `
            <tr class="border-b border-slate-100 dark:border-slate-800 hover:bg-brand-50/40 dark:hover:bg-slate-800/40 transition-colors">
                <td class="py-4 px-4 text-center"><input type="checkbox" value="${item.id}" onchange="updateBatchDeleteUI('${type}')" class="crud-cb-${type} w-4 h-4 accent-brand-600 rounded cursor-pointer"></td>
                <td class="py-4 px-4 text-sm font-bold text-slate-500">${idx+1}</td>
                ${tdFields}
                <td class="py-4 px-4 text-right whitespace-nowrap">
                    ${type === 'siswa' ? `<button onclick="lihatQRSiswa('${item.id}')" title="Lihat QR Code" class="text-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-950/50 py-2.5 px-3.5 rounded-xl transition-all mr-1"><i class="fa-solid fa-qrcode text-base"></i></button>` : ''}
                    <button onclick="editCRUD('${type}', '${item.id}')" title="Edit Data" class="text-amber-500 hover:bg-amber-100 dark:hover:bg-amber-950/50 py-2.5 px-3.5 rounded-xl transition-all mr-1"><i class="fa-solid fa-pen-to-square text-base"></i></button>
                    <button onclick="deleteCRUD('${type}', '${item.id}')" title="Hapus Data" class="text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950/50 py-2.5 px-3.5 rounded-xl transition-all"><i class="fa-solid fa-trash-can text-base"></i></button>
                </td>
            </tr>`;
        }).join('');

    const editingItem = AppState.ui.editingId ? dataAsliUtuh.find(i => i.id === AppState.ui.editingId) : null;

    let formFields = config.fields.map(f => {
        let currentVal = editingItem ? (editingItem[f.id] || '') : '';
        let inputHtml = '';
        if(f.type === 'select') {
            let opts = f.opts.map(o => `<option value="${o}" ${currentVal === o ? 'selected' : ''}>${o}</option>`).join('');
            inputHtml = `<select id="form-${f.id}" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500 dark:text-white text-sm shadow-sm">${opts}</select>`;
        } else if(f.type === 'dynamicSelect') {
            let opts = (AppState.db[f.source] || []).map(o => `<option value="${o.id}" ${currentVal === o.id ? 'selected' : ''}>${o[f.displayField]}</option>`).join('');
            inputHtml = `<select id="form-${f.id}" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500 dark:text-white text-sm shadow-sm"><option value="">-- Pilih --</option>${opts}</select>`;
        } else if(f.type === 'date' || f.type === 'time') {
            inputHtml = `<input type="${f.type}" id="form-${f.id}" value="${currentVal}" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500 dark:text-white text-sm shadow-sm">`;
        } else if(f.type === 'number') {
            inputHtml = `<input type="number" id="form-${f.id}" value="${currentVal}" min="0" max="100" placeholder="${f.placeholder || ''}" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500 dark:text-white text-sm shadow-sm">`;
        } else {
            inputHtml = `<input type="text" id="form-${f.id}" value="${currentVal}" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500 dark:text-white text-sm shadow-sm">`;
        }
        return `<div><label class="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">${f.label}</label>${inputHtml}</div>`;
    }).join('');

    container.innerHTML = `
        <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div class="w-full lg:w-1/3 bg-white dark:bg-slate-900 rounded-[2rem] shadow-md border border-slate-100 dark:border-slate-800 p-6 sm:p-8 h-fit shrink-0 lg:sticky lg:top-4 z-20 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <h4 class="font-black text-lg text-slate-800 dark:text-white mb-6 border-b dark:border-slate-800 pb-4">
                    ${editingItem ? `<i class="fa-solid fa-pen-to-square text-amber-500 mr-2"></i>Edit ${config.title}` : `<i class="fa-solid fa-plus-circle text-brand-500 mr-2"></i>Tambah ${config.title}`}
                </h4>
                <div class="space-y-5" id="crud-form">${formFields}</div>
                <div class="flex space-x-3 mt-8">
                    ${editingItem ? `<button onclick="batalEdit('${type}')" class="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-3.5 rounded-xl transition-all shadow-sm">Batal</button>` : ''}
                    <button onclick="saveCRUD('${type}')" class="flex-1 ${editingItem ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30' : 'bg-brand-600 hover:bg-brand-500 shadow-brand-500/30'} text-white font-black py-3.5 rounded-xl shadow-lg transition-transform active:scale-95">
                        ${editingItem ? 'Simpan Edit' : 'Simpan Data'}
                    </button>
                </div>
            </div>

            <div class="w-full lg:w-2/3 bg-white dark:bg-slate-900 rounded-[2rem] shadow-md border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div class="flex flex-col xl:flex-row justify-between items-start xl:items-center p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 gap-4">
                    <h4 class="font-black text-lg text-slate-800 dark:text-white"><i class="fa-solid fa-table-list mr-2 text-indigo-500"></i>Daftar ${config.title}</h4>
                    <div class="flex flex-wrap gap-2 w-full xl:w-auto">
                        ${filterDropdownHtml}
                        <button id="btn-batch-delete-${type}" onclick="deleteBatchCRUD('${type}')" class="hidden bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-5 rounded-xl text-sm shadow-md transition-all flex items-center shrink-0">
                            <i class="fa-solid fa-trash-can mr-2"></i> Hapus (<span id="batch-count-${type}">0</span>)
                        </button>
                        <button onclick="exportExcel('${type}')" class="flex-1 sm:flex-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-emerald-600 hover:border-emerald-300 font-bold py-2.5 px-4 rounded-xl text-sm shadow-sm transition-all"><i class="fa-solid fa-file-excel mr-1.5 text-emerald-500"></i> Ekspor Excel</button>
                        <button onclick="openImportModal('${type}')" class="flex-1 sm:flex-none bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-5 rounded-xl text-sm shadow-md shadow-purple-500/30 transition-all"><i class="fa-solid fa-file-excel mr-1.5"></i> Impor Excel</button>
                    </div>
                </div>
                <div class="overflow-x-auto p-2 custom-scrollbar max-h-[75vh] overflow-y-auto relative">
                    <table class="w-full text-left border-collapse min-w-max">
                        <thead class="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-extrabold sticky top-0 z-10 shadow-sm">
                            <tr class="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-extrabold">
                                <th class="py-4 px-4 w-12 text-center rounded-l-xl"><input type="checkbox" id="select-all-${type}" onchange="toggleSelectAllCRUD('${type}', this.checked)" class="w-4 h-4 accent-brand-600 rounded cursor-pointer" title="Pilih Semua"></th>
                                <th class="py-4 px-4 w-14 text-center">No</th>
                                ${config.fields.map(f => `<th class="py-4 px-4">${f.label}</th>`).join('')}
                                <th class="py-4 px-4 text-right rounded-r-xl">Aksi Opsi</th>
                            </tr>
                        </thead>
                        <tbody>${tableRows}</tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function editCRUD(type, id) {
    AppState.ui.editingId = id;
    renderCRUD(document.getElementById('main-content'), type);
}

function batalEdit(type) {
    AppState.ui.editingId = null;
    renderCRUD(document.getElementById('main-content'), type);
}

function saveCRUD(type) {
    pastikanKolomKKMMapel();
    const config = crudConfig[type];
    if (!AppState.db[type]) AppState.db[type] = [];

    let itemData = {};
    let hasData = false;

    config.fields.forEach(f => {
        const el = document.getElementById(`form-${f.id}`);
        let val = el ? el.value : '';
        if (f.id === 'kkm') {
            val = String(val).trim() !== '' ? Number(val) : 72;
            itemData[f.id] = val;
            hasData = true;
        } else {
            itemData[f.id] = val;
            if(String(val).trim() !== '') hasData = true;
        }
    });

    if(!hasData) return showAlert("Gagal", "Harap isi minimal satu kolom data.", "error");

    if (AppState.ui.editingId) {
        const idx = AppState.db[type].findIndex(i => i.id === AppState.ui.editingId);
        if (idx >= 0) AppState.db[type][idx] = { ...AppState.db[type][idx], ...itemData };
        AppState.ui.editingId = null;
    } else {
        AppState.db[type].push({ id: generateId(), ...itemData });
    }
    forceSaveNotification();
}

function deleteCRUD(type, id) {
    if(confirm('Yakin ingin menghapus data ini? Semua data terkait (jadwal/nilai/absensi) juga akan dibersihkan.')) {
        AppState.db[type] = AppState.db[type].filter(item => item.id !== id);

        if (type === 'kelas') {
            AppState.db.siswa = AppState.db.siswa.filter(s => s.kelasId !== id);
            AppState.db.jadwal = AppState.db.jadwal.filter(j => j.kelasId !== id);
            AppState.db.penilaian = AppState.db.penilaian.filter(p => p.kelasId !== id);
            AppState.db.absensi = AppState.db.absensi.filter(a => a.kelasId !== id);
            AppState.db.jurnal = AppState.db.jurnal.filter(j => j.kelasId !== id);
        } else if (type === 'mapel') {
            AppState.db.jadwal = AppState.db.jadwal.filter(j => j.mapelId !== id);
            AppState.db.penilaian = AppState.db.penilaian.filter(p => p.mapelId !== id);
            AppState.db.jurnal = AppState.db.jurnal.filter(j => j.mapelId !== id);
        } else if (type === 'siswa') {
            AppState.db.penilaian = AppState.db.penilaian.filter(p => p.siswaId !== id);
            AppState.db.absensi = AppState.db.absensi.filter(a => a.siswaId !== id);
        }
        if (AppState.ui.editingId === id) AppState.ui.editingId = null;
        forceSaveNotification();
    }
}

function toggleSelectAllCRUD(type, isChecked) {
    const checkboxes = document.querySelectorAll(`.crud-cb-${type}`);
    checkboxes.forEach(cb => cb.checked = isChecked);
    updateBatchDeleteUI(type);
}

function updateBatchDeleteUI(type) {
    const checkedCbs = document.querySelectorAll(`.crud-cb-${type}:checked`);
    const btn = document.getElementById(`btn-batch-delete-${type}`);
    const countSpan = document.getElementById(`batch-count-${type}`);
    const allCbs = document.querySelectorAll(`.crud-cb-${type}`);
    const selectAllCb = document.getElementById(`select-all-${type}`);

    if (countSpan) countSpan.innerText = checkedCbs.length;
    if (btn) btn.classList.toggle('hidden', checkedCbs.length === 0);
    if (selectAllCb && allCbs.length > 0) selectAllCb.checked = checkedCbs.length === allCbs.length;
}

function deleteBatchCRUD(type) {
    const checkedCbs = document.querySelectorAll(`.crud-cb-${type}:checked`);
    const idsToDelete = Array.from(checkedCbs).map(cb => cb.value);
    if (idsToDelete.length === 0) return;

    const config = crudConfig[type];
    if (confirm(`Yakin ingin menghapus ${idsToDelete.length} data ${config ? config.title : ''} terpilih? Data terkait juga akan dibersihkan.`)) {
        AppState.db[type] = AppState.db[type].filter(item => !idsToDelete.includes(item.id));
        idsToDelete.forEach(id => {
            if (type === 'kelas') {
                AppState.db.siswa = AppState.db.siswa.filter(s => s.kelasId !== id);
                AppState.db.jadwal = AppState.db.jadwal.filter(j => j.kelasId !== id);
                AppState.db.penilaian = AppState.db.penilaian.filter(p => p.kelasId !== id);
                AppState.db.absensi = AppState.db.absensi.filter(a => a.kelasId !== id);
                AppState.db.jurnal = AppState.db.jurnal.filter(j => j.kelasId !== id);
            } else if (type === 'mapel') {
                AppState.db.jadwal = AppState.db.jadwal.filter(j => j.mapelId !== id);
                AppState.db.penilaian = AppState.db.penilaian.filter(p => p.mapelId !== id);
                AppState.db.jurnal = AppState.db.jurnal.filter(j => j.mapelId !== id);
            } else if (type === 'siswa') {
                AppState.db.penilaian = AppState.db.penilaian.filter(p => p.siswaId !== id);
                AppState.db.absensi = AppState.db.absensi.filter(a => a.siswaId !== id);
            }
            if (AppState.ui.editingId === id) AppState.ui.editingId = null;
        });
        forceSaveNotification();
    }
}

function exportExcel(type) {
    const config = crudConfig[type];
    let data = AppState.db[type] || [];
    if (type === 'siswa' && AppState.ui.filterKelasSiswa) data = data.filter(item => item.kelasId === AppState.ui.filterKelasSiswa);
    if(data.length === 0) return showAlert("Info", "Tidak ada data untuk diekspor pada filter ini.", "info");

    let headers = ['No', ...config.fields.map(f => f.label)];
    let rows = data.map((item, idx) => {
        let row = [idx + 1];
        config.fields.forEach(f => {
            let val = item[f.id] || '';
            if(f.type === 'dynamicSelect' && val) {
                let ref = AppState.db[f.source].find(r => r.id === val);
                val = ref ? ref[f.displayField] : val;
            }
            if (typeof val === 'string') val = val.replace(/<[^>]*>?/gm, '');
            row.push(val);
        });
        return row;
    });

    let dataToExport = [headers, ...rows];
    const worksheet = XLSX.utils.aoa_to_sheet(dataToExport);
    const wscols = [{wch: 5}];
    config.fields.forEach(() => wscols.push({wch: 25}));
    worksheet['!cols'] = wscols;

    const workbook = XLSX.utils.book_new();
    let namaSheet = `Data_${config.title}`;
    let namaFile = `Data_${config.title}_SmartTeacher.xlsx`;

    if (type === 'siswa' && AppState.ui.filterKelasSiswa) {
        const refKelas = AppState.db.kelas.find(k => k.id === AppState.ui.filterKelasSiswa);
        if (refKelas) {
            namaSheet = `Siswa_Kelas_${refKelas.kode}`.substring(0, 31);
            namaFile = `Data_Siswa_Kelas_${refKelas.kode}_SmartTeacher.xlsx`;
        }
    }
    XLSX.utils.book_append_sheet(workbook, worksheet, namaSheet);
    XLSX.writeFile(workbook, namaFile);
    showAlert("Berhasil", `File Excel ${namaSheet} berhasil diunduh!`, "success");
}

function getKKMMapel(mapelId) {
    const mapelObj = (AppState.db.mapel || []).find(m => String(m.id) === String(mapelId));
    return mapelObj && mapelObj.kkm !== undefined && mapelObj.kkm !== '' && !isNaN(Number(mapelObj.kkm))
        ? Number(mapelObj.kkm)
        : 72;
}

function simpanKKMMapelLangsung(mapelId, nilaiBaru) {
    const mapelObj = (AppState.db.mapel || []).find(m => String(m.id) === String(mapelId));
    if (!mapelObj) return;

    const kkmAngka = nilaiBaru !== '' && !isNaN(Number(nilaiBaru)) ? Number(nilaiBaru) : 72;
    mapelObj.kkm = kkmAngka;

    localStorage.setItem(AppState.config.storageKey, JSON.stringify(AppState.db));
    if (AppState.config.gasUrl && AppState.config.gasUrl.startsWith("http")) {
        fetch(AppState.config.gasUrl, { method: "POST", mode: "no-cors", body: JSON.stringify(AppState.db) }).catch(() => {});
    }

    document.querySelectorAll('#penilaian-form-container input[id^="nilai-"]').forEach(inp => {
        cekWarnaInputKKM(inp, kkmAngka);
    });

    const statusEl = document.getElementById('status-simpan-kkm');
    if (statusEl) {
        statusEl.textContent = `✓ KKM ${kkmAngka} tersimpan`;
        statusEl.classList.remove('opacity-0');
        setTimeout(() => statusEl.classList.add('opacity-0'), 2000);
    }
}

function cekWarnaInputKKM(inputEl, kkm) {
    const raw = inputEl.value;
    if (raw !== '' && !isNaN(Number(raw)) && Number(raw) < kkm) {
        inputEl.classList.remove('border-slate-200', 'dark:border-slate-700', 'text-brand-700', 'dark:text-brand-300', 'bg-white', 'dark:bg-slate-800');
        inputEl.classList.add('border-rose-500', 'text-rose-600', 'dark:text-rose-400', 'bg-rose-50', 'dark:bg-rose-950/40');
    } else {
        inputEl.classList.remove('border-rose-500', 'text-rose-600', 'dark:text-rose-400', 'bg-rose-50', 'dark:bg-rose-950/40');
        inputEl.classList.add('border-slate-200', 'dark:border-slate-700', 'text-brand-700', 'dark:text-brand-300', 'bg-white', 'dark:bg-slate-800');
    }
}

function renderPenilaian(container) {
    let kelasOpts = AppState.db.kelas.map(k => `<option value="${k.id}">${k.kode}</option>`).join('');
    let mapelOpts = AppState.db.mapel.map(m => `<option value="${m.id}">${m.nama}</option>`).join('');

    container.innerHTML = `
        <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 mb-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div><label class="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1.5">Pilih Kelas</label>
                 <select id="penilaian-kelas" onchange="loadFormPenilaian()" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 dark:text-white"><option value="">-- Pilih --</option>${kelasOpts}</select></div>
            <div><label class="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1.5">Mata Pelajaran</label>
                 <select id="penilaian-mapel" onchange="loadFormPenilaian()" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 dark:text-white"><option value="">-- Pilih --</option>${mapelOpts}</select></div>
            <div><label class="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1.5">Jenis Penilaian</label>
                 <select id="penilaian-jenis" onchange="loadFormPenilaian()" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 dark:text-white">
                     <option value="" disabled selected>-- Pilih Jenis Penilaian --</option>
                     <option value="Tugas TP 1">Tugas (TP/Bab 1)</option>
                     <option value="Sumatif TP 1">Sumatif (TP/Bab 1)</option>
                     <option value="Tugas TP 2">Tugas (TP/Bab 2)</option>
                     <option value="Sumatif TP 2">Sumatif (TP/Bab 2)</option>
                     <option value="Tugas TP 3">Tugas (TP/Bab 3)</option>
                     <option value="Sumatif TP 3">Sumatif (TP/Bab 3)</option>
                     <option value="Tugas TP 4">Tugas (TP/Bab 4)</option>
                     <option value="Sumatif TP 4">Sumatif (TP/Bab 4)</option>
                     <option value="Tugas TP 5">Tugas (TP/Bab 5)</option>
                     <option value="Sumatif TP 5">Sumatif (TP/Bab 5)</option>
                     <option value="Tugas TP 6">Tugas (TP/Bab 6)</option>
                     <option value="Sumatif TP 6">Sumatif (TP/Bab 6)</option>
                     <option value="Tugas TP 7">Tugas (TP/Bab 7)</option>
                     <option value="Sumatif TP 7">Sumatif (TP/Bab 7)</option>
                     <option value="STS">STS (Sumatif Tengah Semester)</option>
                     <option value="SAS">SAS (Sumatif Akhir Semester)</option>
                 </select></div>
        </div>
        <div id="penilaian-form-container"></div>
    `;
    loadFormPenilaian();
}

function loadFormPenilaian() {
    const kelasId = document.getElementById('penilaian-kelas').value;
    const mapelId = document.getElementById('penilaian-mapel').value;
    const jenis = document.getElementById('penilaian-jenis').value;
    const formContainer = document.getElementById('penilaian-form-container');

    if(!kelasId || !mapelId) {
        formContainer.innerHTML = `<p class="text-slate-500 text-center py-10 bg-white dark:bg-slate-900 rounded-3xl border dark:border-slate-800">Pilih kelas dan mata pelajaran.</p>`;
        return;
    }

    const mapelObj = (AppState.db.mapel || []).find(m => String(m.id) === String(mapelId));
    const kkm = getKKMMapel(mapelId);

    const barKKM = `
        <div class="bg-white dark:bg-slate-900 px-6 py-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 mb-4 flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
                <span class="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">KKM ${mapelObj ? escapeHTML(mapelObj.nama) : 'Mapel'}:</span>
                <input type="number" id="input-kkm-mapel" value="${kkm}" min="0" max="100" onchange="simpanKKMMapelLangsung('${mapelId}', this.value)" class="w-20 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-center font-black text-sm text-brand-600 dark:text-brand-400 outline-none focus:ring-2 focus:ring-brand-500">
                <span id="status-simpan-kkm" class="text-xs font-bold text-emerald-500 opacity-0 transition-opacity duration-300"></span>
            </div>
            <p class="text-[11px] text-slate-400">Cukup atur sekali per mapel. Nilai di bawah <b>${kkm}</b> otomatis ditandai <span class="text-rose-500 font-bold">merah</span>.</p>
        </div>
    `;

    if (!jenis) {
        formContainer.innerHTML = barKKM + `<p class="text-slate-500 text-center py-10 bg-white dark:bg-slate-900 rounded-3xl border dark:border-slate-800">Pilih <b>Jenis Penilaian</b> di atas untuk mulai mengisi nilai.</p>`;
        return;
    }

    const siswaKelas = AppState.db.siswa.filter(s => s.kelasId === kelasId);
    if(siswaKelas.length === 0) {
        formContainer.innerHTML = barKKM + `<p class="text-rose-500 text-center py-10 bg-rose-50 dark:bg-rose-950/40 rounded-3xl border border-rose-100 dark:border-rose-900">Belum ada siswa di kelas ini.</p>`;
        return;
    }

    let rows = siswaKelas.map((siswa, idx) => {
        let existing = AppState.db.penilaian.find(p => p.siswaId === siswa.id && p.mapelId === mapelId && p.jenis === jenis);
        let val = existing ? existing.nilai : '';
        const diBawahKKM = val !== '' && !isNaN(Number(val)) && Number(val) < kkm;
        const kelasWarnaInput = diBawahKKM
            ? 'border-rose-500 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40'
            : 'border-slate-200 dark:border-slate-700 text-brand-700 dark:text-brand-300 bg-white dark:bg-slate-800';

        return `
            <tr class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td class="py-3 px-5 text-slate-500 text-sm w-12 text-center">${idx+1}</td>
                <td class="py-3 px-5 text-sm font-bold text-slate-800 dark:text-white">${siswa.nama}</td>
                <td class="py-3 px-5 text-center">
                    <input type="number" id="nilai-${siswa.id}" value="${val}" min="0" max="100"
                        oninput="cekWarnaInputKKM(this, Number(document.getElementById('input-kkm-mapel')?.value || ${kkm}))"
                        class="w-24 border-2 ${kelasWarnaInput} rounded-xl px-3 py-2 outline-none focus:border-brand-500 text-center font-black transition-colors">
                </td>
            </tr>
        `;
    }).join('');

    formContainer.innerHTML = barKKM + `
       <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden fade-in relative max-h-[60vh] overflow-y-auto custom-scrollbar">
            <table class="w-full text-left">
                <thead class="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider font-bold sticky top-0 z-10 shadow-sm">
                    <tr><th class="py-4 px-5 text-center">No</th><th class="py-4 px-5">Nama Lengkap Siswa</th><th class="py-4 px-5 text-center w-40">Input Nilai</th></tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
            <div class="p-5 bg-slate-50 dark:bg-slate-800/50 border-t dark:border-slate-800 flex justify-end">
                <button onclick="simpanPenilaian('${kelasId}', '${mapelId}', '${jenis}')" class="bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg">Simpan Nilai ${jenis}</button>
            </div>
        </div>
    `;
}

function simpanPenilaian(kelasId, mapelId, jenis) {
    const siswaKelas = AppState.db.siswa.filter(s => s.kelasId === kelasId);
    siswaKelas.forEach(siswa => {
        let input = document.getElementById(`nilai-${siswa.id}`);
        if(input && input.value !== '') {
            let val = parseFloat(input.value);
            let existingIndex = AppState.db.penilaian.findIndex(p => p.siswaId === siswa.id && p.mapelId === mapelId && p.jenis === jenis);
            if(existingIndex >= 0) AppState.db.penilaian[existingIndex].nilai = val;
            else AppState.db.penilaian.push({ id: generateId(), siswaId: siswa.id, mapelId: mapelId, kelasId: kelasId, jenis: jenis, nilai: val });
        }
    });
    forceSaveNotification();
}

function ambilNilaiKategori(siswaId, mapelId, daftarAlias) {
    const data = AppState.db.penilaian.find(p =>
        p.siswaId === siswaId &&
        p.mapelId === mapelId &&
        daftarAlias.includes(p.jenis) &&
        p.nilai !== "" && p.nilai !== null && !isNaN(p.nilai)
    );
    return data ? Number(data.nilai) : null;
}

function hitungNilaiProporsional(siswaId, mapelId) {
    const kkm = getKKMMapel(mapelId);
    const tpList = [];
    const nilaiTpValid = [];

    for (let i = 1; i <= 7; i++) {
        const sum = ambilNilaiKategori(siswaId, mapelId, [`Sumatif TP ${i}`, `Sumatif (TP/Bab ${i})`]);
        const tgs = ambilNilaiKategori(siswaId, mapelId, [`Tugas TP ${i}`, `Tugas (TP/Bab ${i})`]);

        let tpRaw = null;
        if (sum !== null && tgs !== null) {
            tpRaw = (0.6 * sum) + (0.4 * tgs);
        } else if (sum !== null) {
            tpRaw = sum;
        } else if (tgs !== null) {
            tpRaw = tgs;
        }

        if (tpRaw !== null) nilaiTpValid.push(tpRaw);

        tpList.push({
            sumatif: sum !== null ? Math.round(sum) : '-',
            tugas: tgs !== null ? Math.round(tgs) : '-',
            tp: tpRaw !== null ? Math.round(tpRaw) : '-'
        });
    }

    const nTugasLama = ambilNilaiKategori(siswaId, mapelId, ['Tugas']);
    if (nilaiTpValid.length === 0 && nTugasLama !== null) {
        nilaiTpValid.push(nTugasLama);
    }

    const rataTPRaw = nilaiTpValid.length > 0
        ? nilaiTpValid.reduce((a, b) => a + b, 0) / nilaiTpValid.length
        : null;
    const duaKaliRataTPRaw = rataTPRaw !== null ? 2 * rataTPRaw : null;

    const nSTSRaw = ambilNilaiKategori(siswaId, mapelId, ['STS', 'UTS']);
    const nSASRaw = ambilNilaiKategori(siswaId, mapelId, ['SAS', 'UAS']);

    let pembilang = 0;
    let pembagi = 0;
    if (duaKaliRataTPRaw !== null) { pembilang += duaKaliRataTPRaw; pembagi += 2; }
    if (nSTSRaw !== null)          { pembilang += nSTSRaw;          pembagi += 1; }
    if (nSASRaw !== null)          { pembilang += nSASRaw;          pembagi += 1; }

    if (pembagi === 0) {
        return {
            kkm,
            tpList,
            rataTP: '-',
            duaKaliRataTP: '-',
            nSTS: '-',
            nSAS: '-',
            akhir: 0,
            predikat: '-'
        };
    }

    const akhir = Math.round(pembilang / pembagi);
    const predikat = akhir >= 90 ? 'A' : (akhir >= 80 ? 'B' : (akhir >= kkm ? 'C' : 'D'));

    return {
        kkm,
        tpList,
        rataTP: rataTPRaw !== null ? Math.round(rataTPRaw) : '-',
        duaKaliRataTP: duaKaliRataTPRaw !== null ? Math.round(duaKaliRataTPRaw) : '-',
        nSTS: nSTSRaw !== null ? Math.round(nSTSRaw) : '-',
        nSAS: nSASRaw !== null ? Math.round(nSASRaw) : '-',
        akhir,
        predikat
    };
}

function renderRekapNilai(container) {
    let kelasOpts = AppState.db.kelas.map(k => `<option value="${k.id}">${k.kode}</option>`).join('');
    let mapelOpts = AppState.db.mapel.map(m => `<option value="${m.id}">${m.nama}</option>`).join('');

    container.innerHTML = `
        <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 mb-6 flex flex-col lg:flex-row lg:items-end gap-4">
            <div class="flex-1">
                <label class="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1.5">Kelas</label>
                <select id="rekap-kelas" onchange="loadRekap()" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none dark:text-white"><option value="">-- Pilih --</option>${kelasOpts}</select>
            </div>
            <div class="flex-1">
                <label class="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1.5">Mata Pelajaran</label>
                <select id="rekap-mapel" onchange="loadRekap()" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none dark:text-white"><option value="">-- Pilih --</option>${mapelOpts}</select>
            </div>
            <div class="shrink-0">
                <button onclick="exportRekapExcel()" class="w-full lg:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl text-sm shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2">
                    <i class="fa-solid fa-file-excel"></i> Download Excel
                </button>
            </div>
        </div>
        <div id="rekap-container"></div>
    `;
    loadRekap();
}

function loadRekap() {
    const kelasId = document.getElementById('rekap-kelas').value;
    const mapelId = document.getElementById('rekap-mapel').value;
    const container = document.getElementById('rekap-container');

    if (!kelasId || !mapelId) { container.innerHTML = ''; return; }
    const siswaKelas = AppState.db.siswa.filter(s => s.kelasId === kelasId);
    const kkmMapel = getKKMMapel(mapelId);

    let headerTPAtas = '';
    let headerTPBawah = '';
    for (let i = 1; i <= 7; i++) {
        headerTPAtas += `<th colspan="3" class="py-2 px-2 text-center border border-slate-200 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200">TP/BAB ${i}</th>`;
        headerTPBawah += `
            <th class="py-2 px-2 text-center border border-slate-200 dark:border-slate-700 text-[10px] font-semibold">Sumatif</th>
            <th class="py-2 px-2 text-center border border-slate-200 dark:border-slate-700 text-[10px] font-semibold">Tugas</th>
            <th class="py-2 px-2 text-center border border-slate-200 dark:border-slate-700 text-[10px] font-black bg-amber-100/80 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300">TP${i}</th>
        `;
    }

    const cekMerah = (val, batas = kkmMapel) => {
        if (val !== '-' && val !== '' && !isNaN(Number(val)) && Number(val) < batas) {
            return 'text-rose-600 dark:text-rose-400 font-extrabold bg-rose-500/10';
        }
        return '';
    };

    let rows = siswaKelas.map((siswa, idx) => {
        const calc = hitungNilaiProporsional(siswa.id, mapelId);
        const selTP = calc.tpList.map(item => {
            const tpMerah = item.tp !== '-' && Number(item.tp) < kkmMapel;
            return `
                <td class="py-2.5 px-2 text-center border border-slate-100 dark:border-slate-800 text-xs ${cekMerah(item.sumatif)}">${item.sumatif}</td>
                <td class="py-2.5 px-2 text-center border border-slate-100 dark:border-slate-800 text-xs ${cekMerah(item.tugas)}">${item.tugas}</td>
                <td class="py-2.5 px-2 text-center border border-slate-100 dark:border-slate-800 text-xs font-extrabold ${tpMerah ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400' : 'bg-amber-50/70 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300'}">${item.tp}</td>
            `;
        }).join('');

        const duaKaliMerah = calc.duaKaliRataTP !== '-' && Number(calc.duaKaliRataTP) < (kkmMapel * 2);

        return `
            <tr class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td class="py-2.5 px-3 text-center text-xs font-bold text-slate-500 border border-slate-100 dark:border-slate-800 sticky left-0 bg-white dark:bg-slate-900 z-10">${idx + 1}</td>
                <td class="py-2.5 px-3 text-center text-xs font-mono text-slate-500 border border-slate-100 dark:border-slate-800">${siswa.nis || '-'}</td>
                <td class="py-2.5 px-3 font-bold text-xs text-slate-800 dark:text-white whitespace-nowrap border border-slate-100 dark:border-slate-800">${siswa.nama}</td>
                <td class="py-2.5 px-3 text-center text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800">${kkmMapel}</td>
                ${selTP}
                <td class="py-2.5 px-3 text-center font-bold text-xs border border-slate-100 dark:border-slate-800 ${cekMerah(calc.rataTP) || 'text-slate-800 dark:text-white'}">${calc.rataTP}</td>
                <td class="py-2.5 px-3 text-center font-extrabold text-xs border border-slate-100 dark:border-slate-800 ${duaKaliMerah ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400' : 'bg-cyan-50/80 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-300'}">${calc.duaKaliRataTP}</td>
                <td class="py-2.5 px-3 text-center font-bold text-xs border border-slate-100 dark:border-slate-800 ${cekMerah(calc.nSTS)}">${calc.nSTS}</td>
                <td class="py-2.5 px-3 text-center font-bold text-xs border border-slate-100 dark:border-slate-800 ${cekMerah(calc.nSAS)}">${calc.nSAS}</td>
                <td class="py-2.5 px-3 text-center font-black text-xs border border-slate-100 dark:border-slate-800 ${calc.akhir > 0 && calc.akhir < kkmMapel ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400' : 'text-emerald-500'}">${calc.akhir || '-'}</td>
                <td class="py-2.5 px-3 text-center font-bold text-xs border border-slate-100 dark:border-slate-800 ${calc.predikat === 'D' ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400' : 'text-slate-500'}">${calc.predikat}</td>
            </tr>
        `;
    }).join('');

    container.innerHTML = `
        <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-x-auto custom-scrollbar fade-in">
            <table class="w-max min-w-full text-left border-collapse">
                <thead class="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] uppercase tracking-wider font-extrabold">
                    <tr>
                        <th rowspan="2" class="py-3 px-3 text-center border border-slate-200 dark:border-slate-700 bg-emerald-50/70 dark:bg-emerald-950/30 sticky left-0 z-20">No</th>
                        <th rowspan="2" class="py-3 px-3 text-center border border-slate-200 dark:border-slate-700 bg-emerald-50/70 dark:bg-emerald-950/30">NIS</th>
                        <th rowspan="2" class="py-3 px-4 border border-slate-200 dark:border-slate-700 bg-emerald-50/70 dark:bg-emerald-950/30">Nama Siswa</th>
                        <th rowspan="2" class="py-3 px-3 text-center border border-slate-200 dark:border-slate-700 bg-emerald-50/70 dark:bg-emerald-950/30">KKM</th>
                        ${headerTPAtas}
                        <th rowspan="2" class="py-3 px-3 text-center border border-slate-200 dark:border-slate-700">Rerata TP</th>
                        <th rowspan="2" class="py-3 px-3 text-center border border-slate-200 dark:border-slate-700 bg-cyan-100/70 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300">2xRerata TP</th>
                        <th rowspan="2" class="py-3 px-3 text-center border border-slate-200 dark:border-slate-700 bg-cyan-50/70 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-200">STS</th>
                        <th rowspan="2" class="py-3 px-3 text-center border border-slate-200 dark:border-slate-700 bg-cyan-50/70 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-200">SAS</th>
                        <th rowspan="2" class="py-3 px-3 text-center border border-slate-200 dark:border-slate-700 text-emerald-500">Nilai Rapor</th>
                        <th rowspan="2" class="py-3 px-3 text-center border border-slate-200 dark:border-slate-700">Predikat</th>
                    </tr>
                    <tr>
                        ${headerTPBawah}
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

function exportRekapExcel() {
    const kelasId = document.getElementById('rekap-kelas')?.value;
    const mapelId = document.getElementById('rekap-mapel')?.value;

    if (!kelasId || !mapelId) {
        return showAlert("Pilih Data", "Silakan pilih Kelas dan Mata Pelajaran terlebih dahulu sebelum mengunduh Excel.", "warning");
    }

    const siswaKelas = (AppState.db.siswa || []).filter(s => s.kelasId === kelasId);
    if (siswaKelas.length === 0) {
        return showAlert("Info", "Belum ada data siswa pada kelas ini.", "info");
    }

    const sek = AppState.db.sekolah || {};
    const namaSekolah = String(sek.nama || 'NAMA SEKOLAH').toUpperCase();
    const infoAlamat = [
        sek.alamat ? (/^sekretariat/i.test(sek.alamat) ? sek.alamat : 'Sekretariat ' + sek.alamat) : '',
        sek.npsn ? 'NPSN: ' + sek.npsn : ''
    ].filter(Boolean).join('  |  ');
    const tahunAjaran = sek.tahunAjaran || '2026/2027';
    const semester = sek.semester ? ` (${String(sek.semester).toUpperCase()})` : '';
    const kepsek = sek.kepsek || '_____________________';
    const nipKepsek = sek.nip || '-';

    const kelasObj = (AppState.db.kelas || []).find(k => String(k.id) === String(kelasId));
    const namaKelas = kelasObj ? kelasObj.kode : '-';
    const waliKelas = kelasObj && kelasObj.wali ? kelasObj.wali : '-';

    const mapelObj = (AppState.db.mapel || []).find(m => String(m.id) === String(mapelId));
    const namaMapel = mapelObj ? mapelObj.nama : '-';
    const kkmMapel = getKKMMapel(mapelId);

    let namaGuru = '-';
    const jadwalCocok = (AppState.db.jadwal || []).find(j => String(j.kelasId) === String(kelasId) && String(j.mapelId) === String(mapelId));
    if (jadwalCocok && jadwalCocok.guruId) {
        const guruObj = (AppState.db.guru || []).find(g => String(g.id) === String(jadwalCocok.guruId));
        if (guruObj && guruObj.nama) namaGuru = guruObj.nama;
    } else if ((AppState.db.guru || []).length === 1 && AppState.db.guru[0].nama) {
        namaGuru = AppState.db.guru[0].nama;
    }

    const TOTAL_COLS = 32;
    const buatBarisKosong = () => new Array(TOTAL_COLS).fill('');
    const aoa = [];

    aoa.push(buatBarisKosong());
    const rKopNama = buatBarisKosong(); rKopNama[1] = namaSekolah; aoa.push(rKopNama);
    const rKopAlamat = buatBarisKosong(); rKopAlamat[1] = infoAlamat; aoa.push(rKopAlamat);
    aoa.push(buatBarisKosong());
    const rJudul1 = buatBarisKosong(); rJudul1[1] = 'HASIL PENILAIAN KEGIATAN KURIKULUM'; aoa.push(rJudul1);
    const rJudul2 = buatBarisKosong(); rJudul2[1] = `TAHUN PELAJARAN ${tahunAjaran}${semester}`; aoa.push(rJudul2);
    aoa.push(buatBarisKosong());

    const rId1 = buatBarisKosong();
    rId1[1] = 'MATA PELAJARAN'; rId1[3] = `: ${namaMapel}`;
    rId1[10] = 'GURU MAPEL';    rId1[13] = `: ${namaGuru}`;
    aoa.push(rId1);

    const rId2 = buatBarisKosong();
    rId2[1] = 'KELAS';          rId2[3] = `: ${namaKelas}`;
    rId2[10] = 'WALI KELAS';    rId2[13] = `: ${waliKelas}`;
    aoa.push(rId2);

    aoa.push(buatBarisKosong());

    const h1 = buatBarisKosong();
    const h2 = buatBarisKosong();
    const h3 = buatBarisKosong();

    h1[1] = 'NOMOR';
    h2[1] = 'URUT';
    h2[2] = 'INDUK';
    h1[3] = 'NAMA SISWA';
    h1[4] = 'KKM';
    h1[5] = 'PENGETAHUAN';

    for (let i = 1; i <= 7; i++) {
        const cStart = 5 + (i - 1) * 3;
        h2[cStart] = `TP/BAB ${i}`;
        h3[cStart] = 'Sumatif';
        h3[cStart + 1] = 'Tugas';
        h2[cStart + 2] = `TP${i}`;
    }

    h2[26] = 'Rerata TP';
    h2[27] = '2xRerata TP';
    h2[28] = 'STS';
    h2[29] = 'SAS';
    h1[30] = 'NILAI RAPOR';
    h1[31] = 'PREDIKAT';

    aoa.push(h1, h2, h3);

    const colLetter = (idx) => {
        let s = '', n = idx + 1;
        while (n > 0) {
            let m = (n - 1) % 26;
            s = String.fromCharCode(65 + m) + s;
            n = Math.floor((n - m) / 26);
        }
        return s;
    };

    const startDataRow = 14;
    siswaKelas.forEach((siswa, idx) => {
        const rNum = startDataRow + idx;
        const row = buatBarisKosong();
        const calc = hitungNilaiProporsional(siswa.id, mapelId);

        row[1] = idx + 1;
        row[2] = siswa.nis ? { t: 's', v: String(siswa.nis), z: '@' } : '-';
        row[3] = siswa.nama || '-';
        row[4] = kkmMapel;

        for (let i = 1; i <= 7; i++) {
            const cStart = 5 + (i - 1) * 3;
            const colSum = colLetter(cStart);
            const colTgs = colLetter(cStart + 1);

            const sumVal = ambilNilaiKategori(siswa.id, mapelId, [`Sumatif TP ${i}`, `Sumatif (TP/Bab ${i})`]);
            const tgsVal = ambilNilaiKategori(siswa.id, mapelId, [`Tugas TP ${i}`, `Tugas (TP/Bab ${i})`]);
            const tpItem = calc.tpList[i - 1];

            row[cStart]     = sumVal !== null ? Number(sumVal) : '';
            row[cStart + 1] = tgsVal !== null ? Number(tgsVal) : '';

            const formulaTP = `IF(AND(${colSum}${rNum}="",${colTgs}${rNum}=""),"",IF(${colSum}${rNum}="",${colTgs}${rNum},IF(${colTgs}${rNum}="",${colSum}${rNum},ROUND((60%*${colSum}${rNum})+(40%*${colTgs}${rNum}),0))))`;
            row[cStart + 2] = tpItem && tpItem.tp !== '-'
                ? { t: 'n', f: formulaTP, v: Number(tpItem.tp) }
                : { t: 'n', f: formulaTP };
        }

        const formulaRerata = `IF(COUNT(H${rNum},K${rNum},N${rNum},Q${rNum},T${rNum},W${rNum},Z${rNum})=0,"",ROUND(AVERAGE(H${rNum},K${rNum},N${rNum},Q${rNum},T${rNum},W${rNum},Z${rNum}),0))`;
        row[26] = calc.rataTP !== '-' ? { t: 'n', f: formulaRerata, v: Number(calc.rataTP) } : { t: 'n', f: formulaRerata };

        const formula2x = `IF(AA${rNum}="","",2*AA${rNum})`;
        row[27] = calc.duaKaliRataTP !== '-' ? { t: 'n', f: formula2x, v: Number(calc.duaKaliRataTP) } : { t: 'n', f: formula2x };

        const stsVal = ambilNilaiKategori(siswa.id, mapelId, ['STS', 'UTS']);
        const sasVal = ambilNilaiKategori(siswa.id, mapelId, ['SAS', 'UAS']);
        row[28] = stsVal !== null ? Number(stsVal) : '';
        row[29] = sasVal !== null ? Number(sasVal) : '';

        const formulaRapor = `IF(AND(AB${rNum}="",AC${rNum}="",AD${rNum}=""),"",ROUND((N(AB${rNum})+N(AC${rNum})+N(AD${rNum}))/(IF(AB${rNum}<>"",2,0)+IF(AC${rNum}<>"",1,0)+IF(AD${rNum}<>"",1,0)),0))`;
        row[30] = calc.akhir > 0 ? { t: 'n', f: formulaRapor, v: Number(calc.akhir) } : { t: 'n', f: formulaRapor };

        const formulaPred = `IF(AE${rNum}="","-",IF(AE${rNum}>=90,"A",IF(AE${rNum}>=80,"B",IF(AE${rNum}>=E${rNum},"C","D"))))`;
        row[31] = { t: 's', f: formulaPred, v: calc.predikat || '-' };

        aoa.push(row);
    });

    aoa.push(buatBarisKosong());
    aoa.push(buatBarisKosong());
    const rTtd1 = buatBarisKosong(); rTtd1[3] = 'Mengetahui,'; aoa.push(rTtd1);
    const rTtd2 = buatBarisKosong(); rTtd2[3] = 'Kepala Sekolah'; rTtd2[22] = 'Guru Mata Pelajaran'; aoa.push(rTtd2);
    aoa.push(buatBarisKosong());
    aoa.push(buatBarisKosong());
    aoa.push(buatBarisKosong());
    const rTtdNama = buatBarisKosong(); rTtdNama[3] = kepsek; rTtdNama[22] = namaGuru; aoa.push(rTtdNama);
    const rTtdNip  = buatBarisKosong(); rTtdNip[3] = `NIP. ${nipKepsek}`; aoa.push(rTtdNip);

    const ws = XLSX.utils.aoa_to_sheet(aoa);

    ws['!merges'] = [
        { s: { r: 1, c: 1 }, e: { r: 1, c: 31 } },
        { s: { r: 2, c: 1 }, e: { r: 2, c: 31 } },
        { s: { r: 4, c: 1 }, e: { r: 4, c: 31 } },
        { s: { r: 5, c: 1 }, e: { r: 5, c: 31 } },
        { s: { r: 7, c: 1 }, e: { r: 7, c: 2 } },
        { s: { r: 7, c: 10 }, e: { r: 7, c: 12 } },
        { s: { r: 8, c: 1 }, e: { r: 8, c: 2 } },
        { s: { r: 8, c: 10 }, e: { r: 8, c: 12 } },
        { s: { r: 10, c: 1 }, e: { r: 10, c: 2 } },
        { s: { r: 11, c: 1 }, e: { r: 12, c: 1 } },
        { s: { r: 11, c: 2 }, e: { r: 12, c: 2 } },
        { s: { r: 10, c: 3 }, e: { r: 12, c: 3 } },
        { s: { r: 10, c: 4 }, e: { r: 12, c: 4 } },
        { s: { r: 10, c: 5 }, e: { r: 10, c: 29 } },
        { s: { r: 11, c: 26 }, e: { r: 12, c: 26 } },
        { s: { r: 11, c: 27 }, e: { r: 12, c: 27 } },
        { s: { r: 11, c: 28 }, e: { r: 12, c: 28 } },
        { s: { r: 11, c: 29 }, e: { r: 12, c: 29 } },
        { s: { r: 10, c: 30 }, e: { r: 12, c: 30 } },
        { s: { r: 10, c: 31 }, e: { r: 12, c: 31 } }
    ];

    for (let i = 0; i < 7; i++) {
        const cStart = 5 + i * 3;
        ws['!merges'].push({ s: { r: 11, c: cStart }, e: { r: 11, c: cStart + 1 } });
        ws['!merges'].push({ s: { r: 11, c: cStart + 2 }, e: { r: 12, c: cStart + 2 } });
    }

    ws['!cols'] = [
        { wch: 3 },
        { wch: 6 },
        { wch: 13 },
        { wch: 32 },
        { wch: 6 },
        ...new Array(21).fill({ wch: 7 }),
        { wch: 10 },
        { wch: 12 },
        { wch: 7 },
        { wch: 7 },
        { wch: 12 },
        { wch: 10 }
    ];

    ws['!rows'] = [];
    ws['!rows'][1] = { hpt: 22 };
    ws['!rows'][12] = { hpt: 28 };

    const wb = XLSX.utils.book_new();
    const sheetName = `Rapor_${namaKelas}`.replace(/[\\/?*[\]:]/g, '').substring(0, 31) || 'RAPOR';
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    const safeMapel = namaMapel.replace(/[\\/?*[\]:]/g, '_');
    const safeKelas = namaKelas.replace(/[\\/?*[\]:]/g, '_');
    const fileName = `Rekap_Nilai_${safeMapel}_${safeKelas}.xlsx`;

    XLSX.writeFile(wb, fileName);
    showAlert("Berhasil", `File ${fileName} berhasil diunduh!`, "success");
}

function renderAbsensi(container) {
    let kelasOpts = AppState.db.kelas.map(k => `<option value="${k.id}">${k.kode}</option>`).join('');
    const nowLocal = new Date();
    let today = nowLocal.getFullYear() + '-' + String(nowLocal.getMonth() + 1).padStart(2, '0') + '-' + String(nowLocal.getDate()).padStart(2, '0');

    container.innerHTML = `
        <!-- PEMILIHAN PERAN (ROLE) GURU -->
        <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 mb-6 space-y-5 sticky top-0 z-30 shadow-md">
            <div class="border-b border-slate-100 dark:border-slate-800 pb-4">
                <label class="text-sm font-black text-slate-800 dark:text-white block mb-3">
                    <i class="fa-solid fa-user-tie text-brand-500 mr-2"></i> Peran Anda Saat Ini:
                </label>
                <div class="flex flex-wrap items-center gap-3">
                    <label class="inline-flex items-center cursor-pointer px-4 py-2.5 rounded-xl border border-brand-200 bg-brand-50 hover:bg-brand-100 dark:bg-emerald-900/30 dark:border-emerald-800 transition-all">
                        <input type="radio" name="mode-absen" value="mapel" onchange="loadAbsensi()" checked class="w-5 h-5 accent-brand-600">
                        <span class="ml-2 font-bold text-brand-800 dark:text-emerald-300 text-sm">Guru Mapel (Absen Harian)</span>
                    </label>
                    <label class="inline-flex items-center cursor-pointer px-4 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:border-indigo-800 transition-all">
                        <input type="radio" name="mode-absen" value="walikelas" onchange="loadAbsensi()" class="w-5 h-5 accent-indigo-600">
                        <span class="ml-2 font-bold text-indigo-800 dark:text-indigo-300 text-sm">Wali Kelas (Rekap 31 Hari)</span>
                    </label>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div id="wadah-tanggal-absen">
                    <label class="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1.5">Pilih Tanggal</label>
                    <input type="date" id="abs-tanggal" value="${today}" onchange="loadAbsensi()" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none dark:text-white text-sm">
                </div>

                <div id="wadah-bulan-absen" style="display: none;">
                    <label class="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1.5">Pilih Bulan (Rekap)</label>
                    <input type="month" id="abs-bulan" value="${today.slice(0, 7)}" onchange="loadAbsensi()" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none dark:text-white text-sm">
                </div>

                <div>
                    <label class="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1.5">Pilih Kelas</label>
                    <select id="abs-kelas" onchange="loadAbsensi()" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none dark:text-white text-sm focus:ring-2 focus:ring-brand-500">
                        <option value="">-- Pilih Kelas --</option>
                        ${kelasOpts}
                    </select>
                </div>
            </div>
        </div>
        <div id="absensi-container"></div>
    `;
    loadAbsensi();
}

function loadAbsensi() {
    const radioMode = document.querySelector('input[name="mode-absen"]:checked');
    const mode = radioMode ? radioMode.value : 'mapel';
    const tanggal = document.getElementById('abs-tanggal').value;
    const kelasId = document.getElementById('abs-kelas').value;
    const container = document.getElementById('absensi-container');
    const wadahTanggal = document.getElementById('wadah-tanggal-absen');
    const wadahBulan = document.getElementById('wadah-bulan-absen');

    if (mode === 'walikelas') {
        wadahTanggal.classList.add('hidden');
        if (wadahBulan) wadahBulan.style.display = 'block';
    } else {
        wadahTanggal.classList.remove('hidden');
        if (wadahBulan) wadahBulan.style.display = 'none';
    }

    if(!kelasId) {
        container.innerHTML = `<p class="text-slate-500 text-center py-10 bg-white dark:bg-slate-900 rounded-3xl border dark:border-slate-800">Pilih kelas untuk menampilkan daftar hadir.</p>`;
        return;
    }

    const siswaKelas = AppState.db.siswa.filter(s => s.kelasId === kelasId);
    if(siswaKelas.length === 0) {
        container.innerHTML = `<p class="text-rose-500 text-center py-10 bg-rose-50 dark:bg-rose-950/40 rounded-3xl border border-rose-100 dark:border-slate-800">Belum ada siswa di kelas ini.</p>`;
        return;
    }

    if (mode === 'mapel') {
        if(!tanggal) return;
        let rows = siswaKelas.map((siswa, idx) => {
            let existing = AppState.db.absensi.find(a => a.siswaId === siswa.id && a.tanggal === tanggal && a.kelasId === kelasId);
            let status = existing ? existing.status : 'H';
            const radio = (val, label, color) => `<label class="inline-flex items-center mr-4 cursor-pointer p-2 rounded-lg hover:bg-${color}-50 dark:hover:bg-slate-800"><input type="radio" name="abs-${siswa.id}" value="${val}" ${status === val ? 'checked' : ''} class="w-4 h-4 accent-brand-600"><span class="ml-2 text-sm font-bold text-slate-700 dark:text-slate-300">${label}</span></label>`;
            return `<tr class="border-b border-slate-100 dark:border-slate-800"><td class="py-3 px-5 text-center">${idx+1}</td><td class="py-3 px-5 font-bold dark:text-white">${siswa.nama}</td><td class="py-3 px-5 bg-slate-50/30 dark:bg-slate-800/30">${radio('H','Hadir','emerald')}${radio('I','Izin','blue')}${radio('S','Sakit','amber')}${radio('A','Alpa','rose')}</td></tr>`;
        }).join('');

        container.innerHTML = `
            <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden fade-in">
                <div class="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                    <h4 class="font-bold text-slate-800 dark:text-white text-sm"><i class="fa-solid fa-clipboard-user text-brand-500 mr-2"></i> Daftar Hadir</h4>
                </div>
                <table class="w-full text-left"><thead class="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider font-bold"><tr><th class="py-4 px-5 text-center w-16">No</th><th class="py-4 px-5">Siswa</th><th class="py-4 px-5">Status Kehadiran</th></tr></thead><tbody>${rows}</tbody></table>
                <div class="p-5 bg-slate-50 dark:bg-slate-800/50 border-t dark:border-slate-800 flex justify-end">
                    <button onclick="simpanAbsensi('${tanggal}', '${kelasId}')" class="bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all">Simpan Kehadiran Harian</button>
                </div>
            </div>
        `;
    } else {
        let headerTanggal = "";
        for (let i = 1; i <= 31; i++) {
            headerTanggal += `<th class="border border-slate-200 dark:border-slate-700 p-1 min-w-[30px] text-center">${i}</th>`;
        }

        const nowDefault = new Date();
        let currentMonthPrefix = `${nowDefault.getFullYear()}-${String(nowDefault.getMonth() + 1).padStart(2, '0')}-`;
        const elemenBulan = document.getElementById('abs-bulan');
        if (elemenBulan && elemenBulan.value) currentMonthPrefix = elemenBulan.value + '-';

        let rowsWali = siswaKelas.map((siswa, idx) => {
            let tdAbsen = "";
            let totH = 0, totS = 0, totI = 0, totA = 0;

            for (let i = 1; i <= 31; i++) {
                let tglStr = currentMonthPrefix + i.toString().padStart(2, '0');
                let existing = AppState.db.absensi.find(a => a.siswaId === siswa.id && a.tanggal === tglStr && a.kelasId === kelasId);
                let stat = existing ? existing.status : '';

                if (stat === 'H') totH++;
                if (stat === 'S') totS++;
                if (stat === 'I') totI++;
                if (stat === 'A') totA++;

                let cellStyle = getStyleSelAbsenWali(stat);

                tdAbsen += `<td id="abs-cell-${siswa.id}-${tglStr}" data-status="${stat}" onclick="bukaPickerAbsenWali(event, this, '${siswa.id}', '${tglStr}', '${kelasId}')" class="border border-slate-200 dark:border-slate-700 p-1 text-center text-xs cursor-pointer select-none hover:brightness-95 transition-colors duration-150 ${cellStyle}">${stat || '-'}</td>`;
            }

            return `
                <tr class="hover:bg-slate-50/70 dark:hover:bg-slate-800/60">
                    <td class="border border-slate-200 dark:border-slate-700 p-2 text-center text-xs font-bold text-slate-500 sticky left-0 bg-white dark:bg-slate-900 z-10 min-w-[38px]">${idx + 1}</td>
                    <td class="border border-slate-200 dark:border-slate-700 p-2 text-xs font-bold whitespace-nowrap dark:text-white sticky left-[38px] bg-white dark:bg-slate-900 z-10 shadow-[2px_0_6px_-2px_rgba(15,23,42,0.08)]">${escapeHTML(siswa.nama)}</td>
                    ${tdAbsen}
                    <td id="abs-tot-H-${siswa.id}" class="border border-slate-200 dark:border-slate-700 p-2 text-center text-xs font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-900/40">${totH}</td>
                    <td id="abs-tot-S-${siswa.id}" class="border border-slate-200 dark:border-slate-700 p-2 text-center text-xs font-black text-amber-500 bg-amber-50 dark:bg-amber-900/40">${totS}</td>
                    <td id="abs-tot-I-${siswa.id}" class="border border-slate-200 dark:border-slate-700 p-2 text-center text-xs font-black text-blue-500 bg-blue-50 dark:bg-blue-900/40">${totI}</td>
                    <td id="abs-tot-A-${siswa.id}" class="border border-slate-200 dark:border-slate-700 p-2 text-center text-xs font-black text-rose-500 bg-rose-50 dark:bg-rose-900/40">${totA}</td>
                </tr>
            `;
        }).join('');

        container.innerHTML = `
            <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-5">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div>
                        <h4 class="font-bold text-slate-800 dark:text-white"><i class="fa-solid fa-calendar-days text-indigo-500 mr-2"></i> Rekap Kehadiran (31 Hari)</h4>
                        <p class="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg mt-1.5">Sentuh kotak kosong untuk memilih <b>S / I / A / H</b> secara instan tanpa berkedip.</p>
                    </div>
                   <div class="flex flex-wrap items-center gap-2 shrink-0">
                        <button onclick="resetAbsenHadirBulanIni('${kelasId}')" id="btn-reset-absen-h" class="bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/70 font-bold py-2.5 px-3.5 rounded-xl text-xs transition-all flex items-center shrink-0">
                            <i class="fa-solid fa-rotate-left mr-1.5"></i> Reset H Bulan Ini
                        </button>
                        <button onclick="tarikDataGateway('${kelasId}')" id="btn-tarik-gateway" class="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md shadow-cyan-500/30 transition-all flex items-center shrink-0">
                            <i class="fa-solid fa-satellite-dish mr-2 animate-pulse"></i> Tarik Data Smart Gateway
                        </button>
                    </div>
                </div>
                <div id="absensi-table-scroll" class="overflow-x-auto custom-scrollbar pb-3">
                    <table class="w-max min-w-full text-left border-collapse border border-slate-200 dark:border-slate-700">
                        <thead class="bg-indigo-50 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 text-[10px] uppercase font-black">
                            <tr>
                                <th rowspan="2" class="border border-slate-200 dark:border-slate-700 p-2 text-center w-10 min-w-[38px] sticky left-0 bg-indigo-50 dark:bg-indigo-950 z-20">No</th>
                                <th rowspan="2" class="border border-slate-200 dark:border-slate-700 p-2 w-48 sticky left-[38px] bg-indigo-50 dark:bg-indigo-950 z-20 shadow-[2px_0_6px_-2px_rgba(15,23,42,0.08)]">Nama Lengkap Siswa</th>
                                <th colspan="31" class="border border-slate-200 dark:border-slate-700 p-1 text-center">Tanggal</th>
                                <th colspan="4" class="border border-slate-200 dark:border-slate-700 p-1 text-center">Total</th>
                            </tr>
                            <tr>
                                ${headerTanggal}
                                <th class="border border-slate-200 dark:border-slate-700 p-1 text-center text-emerald-600 w-8">H</th>
                                <th class="border border-slate-200 dark:border-slate-700 p-1 text-center text-amber-600 w-8">S</th>
                                <th class="border border-slate-200 dark:border-slate-700 p-1 text-center text-blue-600 w-8">I</th>
                                <th class="border border-slate-200 dark:border-slate-700 p-1 text-center text-rose-600 w-8">A</th>
                            </tr>
                        </thead>
                        <tbody>${rowsWali}</tbody>
                    </table>
                </div>
            </div>
        `;
    }
}

let html5QrcodeScanner = null;
function bukaScannerQR(tanggal, kelasId) {
    if (typeof Html5QrcodeScanner === 'undefined') return showAlert("Tunggu", "Sedang mengunduh modul Kamera AI... Coba klik lagi dalam 3 detik.", "info");

    if (!document.getElementById('qr-modal-scanner')) {
        const modalHtml = `
        <div id="qr-modal-scanner" class="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[100] hidden flex flex-col items-center justify-center p-4 transition-all">
            <div class="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-2xl w-full max-w-sm text-center relative border border-slate-200 dark:border-slate-800">
                <button onclick="tutupScannerQR()" class="absolute top-4 right-4 w-9 h-9 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 rounded-xl flex items-center justify-center font-bold transition-all"><i class="fa-solid fa-xmark text-lg"></i></button>
                <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl shadow-inner border border-emerald-200"><i class="fa-solid fa-qrcode"></i></div>
                <h3 class="text-lg font-black text-slate-800 dark:text-white mb-1">Scanner Kartu Pelajar</h3>
                <p class="text-xs text-slate-500 mb-5">Arahkan kamera HP ke QR Code/Barcode Nomor Induk Siswa (NIS) di kartu pelajar.</p>
                <div id="reader" class="w-full bg-black rounded-2xl overflow-hidden border-4 border-slate-200 dark:border-slate-800 aspect-square object-cover mb-2"></div>
                <div id="scan-result-toast" class="mt-4 p-3 bg-emerald-500 text-white font-black rounded-xl text-sm hidden transform scale-90 transition-all shadow-lg items-center justify-center h-12">
                    <i class="fa-solid fa-circle-check mr-2 text-lg"></i> <span id="scan-name">Hadir!</span>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
    document.getElementById('qr-modal-scanner').classList.remove('hidden');
    html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: {width: 250, height: 250}, aspectRatio: 1.0 }, false);
    html5QrcodeScanner.render((decodedText, decodedResult) => { prosesHasilScan(decodedText, tanggal, kelasId); }, (errorMessage) => { });
}

function tutupScannerQR() {
    if (html5QrcodeScanner) html5QrcodeScanner.clear().catch(e => console.log(e));
    document.getElementById('qr-modal-scanner').classList.add('hidden');
    loadAbsensi();
}

function prosesHasilScan(nisAtauId, tanggal, kelasId) {
    html5QrcodeScanner.pause();
    const siswa = AppState.db.siswa.find(s => s.kelasId === kelasId && (s.nis === nisAtauId || s.id === nisAtauId));
    const toast = document.getElementById('scan-result-toast');

    if (siswa) {
        let existingIndex = AppState.db.absensi.findIndex(a => a.siswaId === siswa.id && a.tanggal === tanggal && a.kelasId === kelasId);
        if (existingIndex >= 0) AppState.db.absensi[existingIndex].status = 'H';
        else AppState.db.absensi.push({ id: generateId(), siswaId: siswa.id, kelasId, tanggal, status: 'H' });

        localStorage.setItem(AppState.config.storageKey, JSON.stringify(AppState.db));
        if (typeof playTick === 'function') playTick(800);

        toast.className = "mt-4 p-3 bg-emerald-500 text-white font-black rounded-xl text-sm flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)] transform scale-100 transition-all h-12";
        toast.innerHTML = `<i class="fa-solid fa-circle-check mr-2 text-lg"></i> ${siswa.nama} (HADIR)`;

        setTimeout(() => {
            toast.classList.add('hidden');
            toast.classList.replace('scale-100', 'scale-90');
            html5QrcodeScanner.resume();
        }, 1500);
    } else {
        if (typeof playTick === 'function') playTick(200);
        toast.className = "mt-4 p-3 bg-rose-500 text-white font-black rounded-xl text-sm flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.5)] transform scale-100 transition-all h-12";
        toast.innerHTML = `<i class="fa-solid fa-circle-xmark mr-2 text-lg"></i> NIS tidak terdaftar!`;

        setTimeout(() => {
            toast.classList.add('hidden');
            toast.classList.replace('scale-100', 'scale-90');
            html5QrcodeScanner.resume();
        }, 2000);
    }
}

let activeAbsenCellEl = null;
let activeAbsenKey = '';

function getStyleSelAbsenWali(stat) {
    if (stat === 'S') return 'text-amber-600 dark:text-amber-400 font-black bg-amber-50 dark:bg-amber-900/25';
    if (stat === 'I') return 'text-blue-600 dark:text-blue-400 font-black bg-blue-50 dark:bg-blue-900/25';
    if (stat === 'A') return 'text-rose-600 dark:text-rose-400 font-black bg-rose-50 dark:bg-rose-900/25';
    if (stat === 'H') return 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-900/25';
    return 'text-slate-300 dark:text-slate-600';
}

function ensureAbsenQuickPicker() {
    if (document.getElementById('absen-quick-picker')) return;

    document.body.insertAdjacentHTML('beforeend', `
        <div id="absen-quick-picker" onclick="event.stopPropagation()" class="fixed z-[9995] hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-2 select-none transition-opacity duration-100">
            <div id="absen-picker-label" class="text-[10px] font-bold text-slate-500 dark:text-slate-400 px-1.5 pb-1.5 mb-1.5 border-b border-slate-100 dark:border-slate-800 truncate max-w-[230px]"></div>
            <div id="absen-picker-buttons" class="flex items-center gap-1.5"></div>
        </div>
    `);

    document.addEventListener('pointerdown', (e) => {
        const picker = document.getElementById('absen-quick-picker');
        if (!picker || picker.classList.contains('hidden')) return;
        if (!picker.contains(e.target) && (!activeAbsenCellEl || !activeAbsenCellEl.contains(e.target))) {
            tutupPickerAbsenWali();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') tutupPickerAbsenWali();
    });

    window.addEventListener('scroll', tutupPickerAbsenWali, true);
}

function tutupPickerAbsenWali() {
    const picker = document.getElementById('absen-quick-picker');
    if (picker) picker.classList.add('hidden');
    if (activeAbsenCellEl) {
        activeAbsenCellEl.classList.remove('ring-2', 'ring-indigo-500', 'z-20');
        activeAbsenCellEl = null;
    }
    activeAbsenKey = '';
}

function bukaPickerAbsenWali(event, cellEl, siswaId, tanggal, kelasId) {
    if (event) event.stopPropagation();
    ensureAbsenQuickPicker();

    const key = `${siswaId}_${tanggal}_${kelasId}`;
    if (activeAbsenKey === key) {
        tutupPickerAbsenWali();
        return;
    }

    tutupPickerAbsenWali();
    activeAbsenCellEl = cellEl;
    activeAbsenKey = key;
    cellEl.classList.add('ring-2', 'ring-indigo-500', 'z-20');

    const siswaObj = (AppState.db.siswa || []).find(s => String(s.id) === String(siswaId));
    const tglAngka = parseInt(tanggal.slice(-2), 10);
    const currentStatus = cellEl.dataset.status || '';

    const labelEl = document.getElementById('absen-picker-label');
    if (labelEl) {
        labelEl.textContent = `${siswaObj ? siswaObj.nama : 'Siswa'} • Tgl ${tglAngka}`;
    }

    const opsi = [
        { val: 'H', text: 'H', title: 'Hadir', cls: 'bg-emerald-600 hover:bg-emerald-500 text-white' },
        { val: 'S', text: 'S', title: 'Sakit', cls: 'bg-amber-500 hover:bg-amber-400 text-slate-950' },
        { val: 'I', text: 'I', title: 'Izin', cls: 'bg-blue-600 hover:bg-blue-500 text-white' },
        { val: 'A', text: 'A', title: 'Alpa', cls: 'bg-rose-600 hover:bg-rose-500 text-white' },
        { val: '',  text: '×', title: 'Kosongkan', cls: 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200' }
    ];

    const btnContainer = document.getElementById('absen-picker-buttons');
    btnContainer.innerHTML = opsi.map(o => {
        const isSelected = currentStatus === o.val && o.val !== '';
        const activeRing = isSelected ? 'ring-2 ring-offset-2 ring-slate-900 dark:ring-white scale-105' : '';
        return `<button type="button" title="${o.title}" onclick="pilihStatusAbsenWali('${siswaId}', '${tanggal}', '${kelasId}', '${o.val}')" class="w-9 h-9 rounded-xl font-black text-xs shadow-sm active:scale-95 transition-transform flex items-center justify-center ${o.cls} ${activeRing}">${o.text}</button>`;
    }).join('');

    const picker = document.getElementById('absen-quick-picker');
    picker.classList.remove('hidden');

    const rect = cellEl.getBoundingClientRect();
    const pickerW = picker.offsetWidth || 226;
    const pickerH = picker.offsetHeight || 76;

    let left = rect.left + (rect.width / 2) - (pickerW / 2);
    left = Math.max(8, Math.min(window.innerWidth - pickerW - 8, left));

    let top = rect.top - pickerH - 8;
    if (top < 8) {
        top = rect.bottom + 8;
    }

    picker.style.left = `${left}px`;
    picker.style.top = `${top}px`;
}

function pilihStatusAbsenWali(siswaId, tanggal, kelasId, nextStatus) {
    tutupPickerAbsenWali();

    let existingIndex = AppState.db.absensi.findIndex(a => a.siswaId === siswaId && a.tanggal === tanggal && a.kelasId === kelasId);

    if (nextStatus === '') {
        if (existingIndex >= 0) AppState.db.absensi.splice(existingIndex, 1);
    } else {
        if (existingIndex >= 0) AppState.db.absensi[existingIndex].status = nextStatus;
        else AppState.db.absensi.push({ id: generateId(), siswaId, kelasId, tanggal, status: nextStatus });
    }

    const cellEl = document.getElementById(`abs-cell-${siswaId}-${tanggal}`);
    if (cellEl) {
        cellEl.dataset.status = nextStatus;
        cellEl.textContent = nextStatus || '-';
        cellEl.className = `border border-slate-200 dark:border-slate-700 p-1 text-center text-xs cursor-pointer select-none hover:brightness-95 transition-colors duration-150 ${getStyleSelAbsenWali(nextStatus)}`;
    }

    const elemenBulan = document.getElementById('abs-bulan');
    const nowDefault = new Date();
    const monthPrefix = (elemenBulan && elemenBulan.value)
        ? elemenBulan.value + '-'
        : `${nowDefault.getFullYear()}-${String(nowDefault.getMonth() + 1).padStart(2, '0')}-`;

    let totH = 0, totS = 0, totI = 0, totA = 0;
    AppState.db.absensi.forEach(a => {
        if (a.siswaId === siswaId && a.kelasId === kelasId && String(a.tanggal || '').startsWith(monthPrefix)) {
            if (a.status === 'H') totH++;
            else if (a.status === 'S') totS++;
            else if (a.status === 'I') totI++;
            else if (a.status === 'A') totA++;
        }
    });

    const elH = document.getElementById(`abs-tot-H-${siswaId}`);
    const elS = document.getElementById(`abs-tot-S-${siswaId}`);
    const elI = document.getElementById(`abs-tot-I-${siswaId}`);
    const elA = document.getElementById(`abs-tot-A-${siswaId}`);
    if (elH) elH.textContent = totH;
    if (elS) elS.textContent = totS;
    if (elI) elI.textContent = totI;
    if (elA) elA.textContent = totA;

    localStorage.setItem(AppState.config.storageKey, JSON.stringify(AppState.db));
    if (AppState.config.gasUrl && AppState.config.gasUrl.startsWith("http")) {
        fetch(AppState.config.gasUrl, { method: "POST", mode: "no-cors", body: JSON.stringify(AppState.db) }).catch(() => {});
    }
}

function ubahAbsenWali(siswaId, tanggal, kelasId) {
    const cellEl = document.getElementById(`abs-cell-${siswaId}-${tanggal}`);
    if (cellEl) bukaPickerAbsenWali(null, cellEl, siswaId, tanggal, kelasId);
}

function simpanAbsensi(tanggal, kelasId) {
    const siswaKelas = AppState.db.siswa.filter(s => s.kelasId === kelasId);
    siswaKelas.forEach(siswa => {
        const selectedRadio = document.querySelector(`input[name="abs-${siswa.id}"]:checked`);
        if (selectedRadio) {
            const status = selectedRadio.value;
            const existingIndex = AppState.db.absensi.findIndex(a => a.siswaId === siswa.id && a.tanggal === tanggal && a.kelasId === kelasId);
            if (existingIndex >= 0) AppState.db.absensi[existingIndex].status = status;
            else AppState.db.absensi.push({ id: generateId(), siswaId: siswa.id, kelasId: kelasId, tanggal: tanggal, status: status });
        }
    });
    forceSaveNotification();
}

function renderRapor(container) {
    let kelasOpts = AppState.db.kelas.map(k => `<option value="${k.id}">${k.kode}</option>`).join('');
    container.innerHTML = `
        <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 mb-6 grid grid-cols-1 md:grid-cols-2 gap-5 no-print">
            <div><label class="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1.5">Pilih Kelas</label>
                 <select id="rapor-kelas" onchange="loadSiswaRapor()" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none dark:text-white"><option value="">-- Pilih --</option>${kelasOpts}</select></div>
            <div><label class="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1.5">Pilih Siswa</label>
                 <select id="rapor-siswa" onchange="generateRapor()" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none dark:text-white"><option value="">-- Menunggu Kelas --</option></select></div>
        </div>
        <div id="rapor-cetak-container" class="bg-white p-10 rounded-xl shadow-xl border border-slate-200 hidden mx-auto max-w-4xl"></div>
    `;
}

function loadSiswaRapor() {
    const kelasId = document.getElementById('rapor-kelas').value;
    const selectSiswa = document.getElementById('rapor-siswa');
    if(!kelasId) { selectSiswa.innerHTML = '<option value="">-- Pilih --</option>'; return; }
    let opts = AppState.db.siswa.filter(s => s.kelasId === kelasId).map(s => `<option value="${s.id}">${s.nama}</option>`).join('');
    selectSiswa.innerHTML = `<option value="">-- Pilih Siswa --</option>${opts}`;
}

function generateRapor() {
    const siswaId = document.getElementById('rapor-siswa').value;
    const container = document.getElementById('rapor-cetak-container');
    if(!siswaId) { container.classList.add('hidden'); return; }

    const siswa = AppState.db.siswa.find(s => s.id === siswaId);
    const kelas = AppState.db.kelas.find(k => k.id === siswa.kelasId);

    let barisMapel = AppState.db.mapel.map((mapel, idx) => {
        const calc = hitungNilaiProporsional(siswa.id, mapel.id);
        let deskripsi = calc.akhir >= 90 ? `Sangat mahir dalam memahami seluruh kompetensi ${mapel.nama}.` : (calc.akhir >= 80 ? `Baik dalam menguasai kompetensi dasar ${mapel.nama}.` : (calc.akhir > 0 ? `Perlu bimbingan lebih lanjut pada beberapa materi ${mapel.nama}.` : '-'));
        return `<tr class="border-b border-black"><td class="py-2 px-3 text-center border-r border-black">${idx+1}</td><td class="py-2 px-3 border-r border-black font-semibold">${mapel.nama}</td><td class="py-2 px-3 text-center border-r border-black font-bold">${calc.akhir || '-'}</td><td class="py-2 px-3 text-center border-r border-black font-bold">${calc.akhir ? calc.predikat : '-'}</td><td class="py-2 px-3 text-xs">${deskripsi}</td></tr>`;
    }).join('');

    const absenSiswa = AppState.db.absensi.filter(a => a.siswaId === siswa.id);
    const jmlSakit = absenSiswa.filter(a => a.status === 'S').length;
    const jmlIzin = absenSiswa.filter(a => a.status === 'I').length;
    const jmlAlpa = absenSiswa.filter(a => a.status === 'A').length;

    container.innerHTML = `
        <div class="text-black font-serif text-sm">
            <div class="text-center mb-8 border-b-4 border-black pb-4"><h2 class="text-2xl font-black uppercase tracking-widest">LAPORAN HASIL BELAJAR (RAPOR)</h2><h3 class="text-xl font-bold uppercase mt-1">${AppState.db.sekolah.nama}</h3><p class="text-xs font-normal mt-1">${AppState.db.sekolah.alamat || ''}</p></div>
            <div class="flex justify-between mb-6 font-semibold"><table class="w-1/2"><tr><td class="w-32 py-1">Nama Siswa</td><td>: <span class="font-bold">${siswa.nama}</span></td></tr><tr><td class="py-1">NIS</td><td>: ${siswa.nis || '-'}</td></tr></table><table class="w-1/2"><tr><td class="w-40 py-1">Kelas</td><td>: ${kelas ? kelas.kode : '-'}</td></tr><tr><td class="py-1">Tahun Ajaran</td><td>: ${AppState.db.sekolah.tahunAjaran} (${AppState.db.sekolah.semester})</td></tr></table></div>
            <table class="w-full border-collapse border-2 border-black mb-6"><thead class="bg-slate-100 font-bold text-center"><tr class="border-b-2 border-black"><th class="py-3 px-3 w-10 border-r border-black">No</th><th class="py-3 px-3 border-r border-black">Mata Pelajaran</th><th class="py-3 px-3 w-20 border-r border-black">Nilai Akhir</th><th class="py-3 px-3 w-20 border-r border-black">Predikat</th><th class="py-3 px-3">Capaian Kompetensi</th></tr></thead><tbody>${barisMapel}</tbody></table>
            <div class="w-64 border-2 border-black mb-10"><div class="bg-slate-100 font-bold py-1.5 px-3 border-b-2 border-black text-center">Ketidakhadiran</div><table class="w-full text-xs"><tr class="border-b border-black"><td class="py-1.5 px-3">Sakit</td><td class="py-1.5 px-3 text-right font-bold">${jmlSakit} hari</td></tr><tr class="border-b border-black"><td class="py-1.5 px-3">Izin</td><td class="py-1.5 px-3 text-right font-bold">${jmlIzin} hari</td></tr><tr><td class="py-1.5 px-3">Tanpa Keterangan</td><td class="py-1.5 px-3 text-right font-bold">${jmlAlpa} hari</td></tr></table></div>
            <div class="flex justify-between mt-12 px-10"><div class="text-center"><p class="mb-20">Mengetahui,<br>Kepala Sekolah</p><p class="font-bold border-b border-black inline-block px-4">${AppState.db.sekolah.kepsek}</p><p class="text-xs mt-1">NIP. ${AppState.db.sekolah.nip || '-'}</p></div><div class="text-center"><p class="mb-20"><br>Wali Kelas</p><p class="font-bold border-b border-black inline-block px-4">${kelas ? kelas.wali : '_____________________'}</p></div></div>
            <div class="text-center mt-12 no-print border-t border-slate-200 pt-8"><button onclick="window.print()" class="bg-slate-900 text-white font-bold py-3.5 px-10 rounded-xl shadow-2xl"><i class="fa-solid fa-print mr-2"></i> Cetak Rapor (PDF)</button></div>
        </div>
    `;
    container.classList.remove('hidden');
}

function lihatQRSiswa(id) {
    const siswa = AppState.db.siswa.find(s => s.id === id);
    if(!siswa) return;
    const kelasSiswa = AppState.db.kelas.find(k => k.id === siswa.kelasId || k.kode === siswa.kelasId);
    const namaKelas = kelasSiswa ? kelasSiswa.kode : (siswa.kelasId || "-");
    const targetData = `${siswa.nis || siswa.id}|${siswa.nama}|${namaKelas}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(targetData)}&margin=10`;

    const modalHtml = `
    <div id="qr-modal-tampil" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-all fade-in">
        <style>@media print { body * { visibility: hidden; } #qr-modal-tampil, #qr-modal-tampil * { visibility: visible; } #qr-modal-tampil { position: absolute; left: 0; top: 0; width: 100%; height: 100%; align-items: flex-start; justify-content: center; padding-top: 2rem; background: white !important; } .qr-no-print { display: none !important; } }</style>
        <div class="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-2xl w-full max-w-sm text-center relative border border-slate-200 dark:border-slate-800">
            <button onclick="document.getElementById('qr-modal-tampil').remove()" class="qr-no-print absolute top-4 right-4 w-9 h-9 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 rounded-xl flex items-center justify-center font-bold transition-all"><i class="fa-solid fa-xmark text-lg"></i></button>
            <div class="qr-no-print w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl shadow-inner"><i class="fa-solid fa-id-badge"></i></div>
            <h3 class="text-xl font-black text-slate-800 dark:text-white mb-1">Kartu Pelajar Digital</h3>
            <p class="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-6">${siswa.nama} <br><span class="text-xs text-slate-500 dark:text-slate-400">NIS: ${siswa.nis || 'Belum diatur'}</span></p>
            <div class="bg-white p-3 rounded-2xl shadow-sm border-2 border-dashed border-slate-300 inline-block mb-6 relative group"><img src="${qrUrl}" alt="QR Code ${siswa.nama}" class="w-48 h-48 object-contain"></div>
            <p class="qr-no-print text-[11px] text-slate-500 mb-5 leading-relaxed">QR Code ini langsung terhubung dengan NIS siswa. Bisa digunakan untuk scan di <b>Smart Gateway</b>.</p>
            <button onclick="window.print()" class="qr-no-print w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center"><i class="fa-solid fa-print mr-2"></i> Cetak Kartu QR</button>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

async function tarikDataGateway(kelasId) {
    const activeWs = getActiveWorkspace();
    const npsn = String(activeWs.npsn || '').trim();
    const rapikanTeks = (teks) => String(teks || '').trim().toLowerCase().replace(/[-_]+/g, ' ').replace(/\s+/g, ' ');
    const namaWs = rapikanTeks(activeWs.nama);

    if (!npsn) {
        return showAlert("NPSN Kosong", "Kode Sekolah / NPSN untuk ruang kerja '" + activeWs.nama + "' belum diatur. Silakan buat/edit ruang kerjanya.", "error");
    }

    const bulanInput = document.getElementById('abs-bulan');
    const bulanTerpilih = (bulanInput && bulanInput.value)
        ? bulanInput.value
        : (new Date().getFullYear() + "-" + String(new Date().getMonth() + 1).padStart(2, '0'));
    const kelasTerpilih = kelasId || (document.getElementById('abs-kelas')?.value || '');

    const kelasObj = (AppState.db.kelas || []).find(k => String(k.id) === String(kelasTerpilih));
    const targetKodeKelas = rapikanTeks(kelasObj ? kelasObj.kode : '');

    if (!targetKodeKelas) {
        return showAlert("Pilih Kelas", "Silakan pilih kelas terlebih dahulu sebelum menarik data.", "warning");
    }

    const btn = document.getElementById('btn-tarik-gateway');
    const originalText = btn ? btn.innerHTML : '';
    if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Memverifikasi Data...';
        btn.disabled = true;
    }

    try {
        const [tahunStr, bulanStr] = bulanTerpilih.split('-');
        const tahunNum = parseInt(tahunStr, 10);
        const bulanNum = parseInt(bulanStr, 10);
        const jumlahHariBulan = new Date(tahunNum, bulanNum, 0).getDate();

        const now = new Date();
        const isBulanIni = (now.getFullYear() === tahunNum && (now.getMonth() + 1) === bulanNum);
        const batasHari = isBulanIni ? Math.min(now.getDate(), jumlahHariBulan) : jumlahHariBulan;

        const daftarTanggal = [];
        for (let d = 1; d <= batasHari; d++) {
            daftarTanggal.push(`${tahunStr}-${bulanStr}-${String(d).padStart(2, '0')}`);
        }

        const hasilFetch = await Promise.all(
            daftarTanggal.map(async (tglStr) => {
                try {
                    const urlTarik = `${URL_GATEWAY_PUSAT}?action=getLogs&npsn=${encodeURIComponent(npsn)}&tanggal=${encodeURIComponent(tglStr)}`;
                    const res = await fetch(urlTarik);
                    const txt = await res.text();
                    const json = JSON.parse(txt);
                    return (json.status === "sukses" && Array.isArray(json.data)) ? json.data : [];
                } catch (e) {
                    return [];
                }
            })
        );

        const dataGateway = hasilFetch.flat();
        let hitungBerhasil = 0;
        let hitungDitolak = 0;
        const contohDitolak = [];
        const siswaKelas = (AppState.db.siswa || []).filter(s => String(s.kelasId) === String(kelasTerpilih));

        dataGateway.forEach(absenGerbang => {
            if (!absenGerbang || !absenGerbang.tanggal) return;
            const tglLog = String(absenGerbang.tanggal).trim().slice(0, 10);

            const rawQr = String(absenGerbang.qr || absenGerbang.nis || '').trim();
            const parts = rawQr.split('|');
            const idAtauNis = (parts[0] || '').trim();
            const namaDariLog = rapikanTeks(absenGerbang.nama || parts[1] || '');

            const logNpsn = String(
                absenGerbang.npsn || absenGerbang.kodeSekolah || absenGerbang.kode_sekolah || parts[3] || ''
            ).trim().toUpperCase();
            const logSekolah = rapikanTeks(absenGerbang.sekolah || absenGerbang.instansi || absenGerbang.workspace || '');
            const logKelas = rapikanTeks(
                absenGerbang.kelas || absenGerbang.rombel || absenGerbang.kelasNama || absenGerbang.namaKelas || absenGerbang.nama_kelas || absenGerbang.subKelas || parts[2] || ''
            );

            // 1. Kunci Ruang Kerja (NPSN & Nama Instansi)
            if ((logNpsn && logNpsn !== npsn.toUpperCase()) || (logSekolah && namaWs && logSekolah !== namaWs)) {
                hitungDitolak++;
                if (contohDitolak.length < 2) contohDitolak.push(`Instansi: ${logSekolah || logNpsn}`);
                return;
            }

            // 2. Kunci Kelas (WAJIB ada dan cocok dengan kelas yang sedang dibuka)
            if (!logKelas || logKelas !== targetKodeKelas) {
                hitungDitolak++;
                if (contohDitolak.length < 2) contohDitolak.push(`Kelas log: "${logKelas || 'kosong'}"`);
                return;
            }

            // 3. Kunci NIS / ID, No. Absen & Nama Siswa
            const logNoAbsen = String(absenGerbang.noAbsen || absenGerbang.no_absen || absenGerbang.urut || '').trim();

            const siswaMatch = siswaKelas.find((s, idx) => {
                const dbNis = String(s.nis || '').trim();
                const dbId = String(s.id || '').trim();
                const dbNama = rapikanTeks(s.nama);
                const noAbsenSiswa = String(s.noAbsen || s.urut || (idx + 1)).trim();

                if (logNoAbsen && logNoAbsen !== noAbsenSiswa) return false;
                if (namaDariLog && dbNama && namaDariLog !== dbNama) return false;

                if (dbId !== '' && idAtauNis !== '' && dbId === idAtauNis) return true;

                if (dbNis !== '') {
                    const cocokNisTeks = dbNis === idAtauNis;
                    const cocokNisAngka = idAtauNis !== '' && !isNaN(dbNis) && !isNaN(idAtauNis) && Number(dbNis) === Number(idAtauNis);
                    return cocokNisTeks || cocokNisAngka;
                }

                return namaDariLog !== '' && dbNama === namaDariLog;
            });

            if (siswaMatch) {
                const idx = AppState.db.absensi.findIndex(a => a.siswaId === siswaMatch.id && a.tanggal === tglLog && String(a.kelasId) === String(kelasTerpilih));
                if (idx >= 0) {
                    if (AppState.db.absensi[idx].status !== 'H') {
                        AppState.db.absensi[idx].status = 'H';
                        hitungBerhasil++;
                    }
                } else {
                    AppState.db.absensi.push({
                        id: generateId(),
                        siswaId: siswaMatch.id,
                        kelasId: kelasTerpilih,
                        tanggal: tglLog,
                        status: 'H'
                    });
                    hitungBerhasil++;
                }
            } else {
                hitungDitolak++;
            }
        });

        const radioWali = document.querySelector('input[name="mode-absen"][value="walikelas"]');
        if (radioWali) radioWali.checked = true;
        const elBulan = document.getElementById('abs-bulan');
        if (elBulan) elBulan.value = bulanTerpilih;
        const elKelas = document.getElementById('abs-kelas');
        if (elKelas) elKelas.value = kelasTerpilih;

        if (hitungBerhasil > 0) {
            localStorage.setItem(AppState.config.storageKey, JSON.stringify(AppState.db));
            if (AppState.config.gasUrl && AppState.config.gasUrl.startsWith("http")) {
                fetch(AppState.config.gasUrl, { method: "POST", mode: "no-cors", body: JSON.stringify(AppState.db) }).catch(() => {});
            }
            loadAbsensi();
            showAlert("Sinkronisasi Sukses!", `Berhasil menarik Hadir (H) sebanyak ${hitungBerhasil} catatan sah khusus kelas ${kelasObj.kode} (${activeWs.nama}).`, "success");
        } else {
            loadAbsensi();
            const detailTolak = hitungDitolak > 0
                ? ` (${hitungDitolak} log ditolak karena bukan kelas ${kelasObj.kode}${contohDitolak.length ? ' — ' + contohDitolak.join(', ') : ''}).`
                : '.';
            showAlert("Data Terkunci & Bersih", `Tidak ada catatan kehadiran Smart Gateway untuk kelas ${kelasObj.kode} di ${activeWs.nama}${detailTolak}`, "info");
        }
    } catch (err) {
        showAlert("Koneksi Gagal", err.message, "error");
    } finally {
        const btnBaru = document.getElementById('btn-tarik-gateway');
        if (btnBaru) {
            btnBaru.innerHTML = originalText;
            btnBaru.disabled = false;
        }
    }
}

function resetAbsenHadirBulanIni(kelasId) {
    const activeWs = typeof getActiveWorkspace === 'function' ? getActiveWorkspace() : { nama: 'Ruang Kerja Aktif' };
    const bulanInput = document.getElementById('abs-bulan');
    const bulanTerpilih = (bulanInput && bulanInput.value)
        ? bulanInput.value
        : (new Date().getFullYear() + "-" + String(new Date().getMonth() + 1).padStart(2, '0'));
    const kelasTerpilih = kelasId || (document.getElementById('abs-kelas')?.value || '');

    if (!kelasTerpilih) {
        return showAlert("Pilih Kelas", "Silakan pilih kelas terlebih dahulu.", "warning");
    }

    const kelasObj = (AppState.db.kelas || []).find(k => String(k.id) === String(kelasTerpilih));
    const namaKelas = kelasObj ? kelasObj.kode : 'kelas ini';
    const prefixBulan = bulanTerpilih + '-';

    const jumlahH = (AppState.db.absensi || []).filter(a =>
        String(a.kelasId) === String(kelasTerpilih) &&
        String(a.tanggal || '').startsWith(prefixBulan) &&
        a.status === 'H'
    ).length;

    if (jumlahH === 0) {
        return showAlert("Sudah Bersih", `Tidak ada tanda Hadir (H) pada bulan ${bulanTerpilih} untuk kelas ${namaKelas}.`, "info");
    }

    if (!confirm(`Hapus semua (${jumlahH}) tanda Hadir (H) pada bulan ${bulanTerpilih} untuk kelas ${namaKelas} di ${activeWs.nama}?\n\nCatatan: Status Sakit (S), Izin (I), dan Alpa (A) tidak akan ikut terhapus.`)) {
        return;
    }

    AppState.db.absensi = (AppState.db.absensi || []).filter(a => !(
        String(a.kelasId) === String(kelasTerpilih) &&
        String(a.tanggal || '').startsWith(prefixBulan) &&
        a.status === 'H'
    ));

    localStorage.setItem(AppState.config.storageKey, JSON.stringify(AppState.db));
    if (AppState.config.gasUrl && AppState.config.gasUrl.startsWith("http")) {
        fetch(AppState.config.gasUrl, { method: "POST", mode: "no-cors", body: JSON.stringify(AppState.db) }).catch(() => {});
    }

    const radioWali = document.querySelector('input[name="mode-absen"][value="walikelas"]');
    if (radioWali) radioWali.checked = true;
    const elBulan = document.getElementById('abs-bulan');
    if (elBulan) elBulan.value = bulanTerpilih;
    const elKelas = document.getElementById('abs-kelas');
    if (elKelas) elKelas.value = kelasTerpilih;

    loadAbsensi();
    showAlert("Berhasil Direset", `Sebanyak ${jumlahH} tanda Hadir (H) pada bulan ${bulanTerpilih} untuk kelas ${namaKelas} telah dibersihkan.`, "success");
}
