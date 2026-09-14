// ============================================================
// Temu Waktu — Google Apps Script Backend
// ============================================================
// Endpoints:
//   doGet(e)  → Fetch client data by slug or guestbook messages
//   doPost(e) → Save RSVP submission to "RSVP" tab
//
// DEPLOYMENT:
//   1. Buka Google Sheets → Extensions → Apps Script
//   2. Salin seluruh isi file ini ke Code.gs
//   3. Deploy → New deployment → Web app
//   4. Execute as: "Me"
//   5. Who has access: "Anyone"
//   6. Salin URL /exec ke file .env.local (NEXT_PUBLIC_GAS_URL)
//   7. Jalankan setupDatabase() sekali untuk inisialisasi tabel
// ============================================================

/**
 * Helper: Membuat respons JSON dengan header yang sesuai.
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * GET Handler — Mengambil data klien atau buku tamu berdasarkan slug.
 *
 * Contoh:
 *   GET {GAS_URL}?slug=romeo-juliet
 *   GET {GAS_URL}?slug=romeo-juliet&action=guestbook
 */
function doGet(e) {
  try {
    if (!e || !e.parameter) {
      return createJsonResponse({
        status: "error",
        message: "Parameter request tidak ditemukan"
      });
    }

    var slug = e.parameter.slug;
    var action = e.parameter.action;

    if (!slug) {
      return createJsonResponse({
        status: "error",
        message: "Parameter 'slug' wajib disertakan"
      });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // ── 1. Handle Guestbook (RSVP) Action ──
    if (action === "guestbook") {
      var sheetRsvp = ss.getSheetByName("RSVP");
      if (!sheetRsvp) {
        return createJsonResponse({ status: "error", message: "Sheet 'RSVP' belum dibuat" });
      }

      var rsvpData = sheetRsvp.getDataRange().getValues();
      if (rsvpData.length <= 1) {
        return createJsonResponse({ status: "success", data: [] });
      }

      var rsvpHeaders = rsvpData[0];
      var rsvps = [];

      // Loop dari bawah ke atas (ucapan terbaru tampil lebih dulu)
      for (var k = rsvpData.length - 1; k > 0; k--) {
        var rowSlug = (rsvpData[k][0] || "").toString().trim().toLowerCase();
        if (rowSlug === slug.trim().toLowerCase()) {
          var entry = {};
          for (var l = 0; l < rsvpHeaders.length; l++) {
            entry[rsvpHeaders[l].toString().trim()] = rsvpData[k][l];
          }
          // Moderasi: hanya tampilkan jika status bukan 'Hidden'
          var status = (entry.status || "Approved").toString().trim();
          if (entry.pesan && status.toLowerCase() !== "hidden") {
            rsvps.push(entry);
          }
        }
      }

      return createJsonResponse({
        status: "success",
        data: rsvps
      });
    }

    // ── 2. Handle Default Action: DataKlien ──
    var sheet = ss.getSheetByName("DataKlien");
    if (!sheet) {
      return createJsonResponse({
        status: "error",
        message: "Sheet 'DataKlien' belum dibuat. Jalankan setupDatabase() terlebih dahulu."
      });
    }

    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return createJsonResponse({
        status: "error",
        message: "Belum ada data klien di sheet DataKlien"
      });
    }

    var headers = data[0];
    var result = null;

    for (var i = 1; i < data.length; i++) {
      var currentSlug = (data[i][0] || "").toString().trim().toLowerCase();
      if (currentSlug === slug.trim().toLowerCase()) {
        result = {};
        for (var j = 0; j < headers.length; j++) {
          var headerKey = headers[j].toString().trim();
          var cellVal = data[i][j];
          // Format tanggal jika objek Date
          if (cellVal instanceof Date) {
            var yyyy = cellVal.getFullYear();
            var mm = String(cellVal.getMonth() + 1).padStart(2, "0");
            var dd = String(cellVal.getDate()).padStart(2, "0");
            cellVal = yyyy + "-" + mm + "-" + dd;
          }
          result[headerKey] = cellVal !== undefined && cellVal !== null ? cellVal.toString() : "";
        }
        break;
      }
    }

    if (result) {
      return createJsonResponse({
        status: "success",
        data: result
      });
    } else {
      return createJsonResponse({
        status: "error",
        message: "Data untuk slug '" + slug + "' tidak ditemukan"
      });
    }

  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: "Terjadi kesalahan server: " + error.toString()
    });
  }
}

/**
 * Sanitize string fields to prevent formula injection in Google Sheets.
 * Prefixes values starting with =, +, -, or @ with a leading apostrophe.
 */
function sanitizeForSheet(value) {
  if (!value) return "";
  var str = value.toString().trim();
  if (str.length > 0 && "=+-@".indexOf(str.charAt(0)) !== -1) {
    return "'" + str;
  }
  return str;
}

/**
 * POST Handler — Menyimpan ucapan & konfirmasi RSVP tamu.
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        status: "error",
        message: "Body payload kosong"
      });
    }

    var payload = JSON.parse(e.postData.contents);
    var slug = payload.slug;
    var nama_tamu = payload.nama_tamu;
    var kehadiran = payload.kehadiran;
    var pesan = payload.pesan;

    if (!slug || !nama_tamu || !kehadiran) {
      return createJsonResponse({
        status: "error",
        message: "Field slug, nama_tamu, dan kehadiran wajib diisi"
      });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("RSVP");

    if (!sheet) {
      return createJsonResponse({
        status: "error",
        message: "Sheet 'RSVP' tidak ditemukan"
      });
    }

    // Rate limit: reject if same slug+nama_tamu submitted within last 2 minutes
    var rsvpData = sheet.getDataRange().getValues();
    var now = new Date();
    var COOLDOWN_MS = 2 * 60 * 1000;

    for (var r = rsvpData.length - 1; r > 0; r--) {
      var rowSlug = (rsvpData[r][0] || "").toString().trim().toLowerCase();
      var rowName = (rsvpData[r][1] || "").toString().trim().toLowerCase();
      var rowTimestamp = rsvpData[r][4];

      if (rowSlug === slug.trim().toLowerCase() &&
          rowName === nama_tamu.trim().toLowerCase()) {
        var rowDate;
        if (rowTimestamp instanceof Date) {
          rowDate = rowTimestamp;
        } else {
          rowDate = new Date(rowTimestamp);
        }
        if (!isNaN(rowDate.getTime()) && (now.getTime() - rowDate.getTime()) < COOLDOWN_MS) {
          return createJsonResponse({
            status: "error",
            message: "RSVP sudah tercatat. Silakan tunggu beberapa menit sebelum mengirim ulang."
          });
        }
        break;
      }
    }

    // Validate kehadiran against allowed values
    var kehadiranNormalized = kehadiran.trim();
    var ALLOWED_KEHADIRAN = ["Hadir", "Tidak Hadir"];
    if (ALLOWED_KEHADIRAN.indexOf(kehadiranNormalized) === -1) {
      return createJsonResponse({
        status: "error",
        message: "Nilai kehadiran harus 'Hadir' atau 'Tidak Hadir'"
      });
    }

    var timestamp = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");
    sheet.appendRow([slug.trim(), sanitizeForSheet(nama_tamu), kehadiranNormalized, sanitizeForSheet(pesan), timestamp, "Approved"]);

    return createJsonResponse({
      status: "success",
      message: "RSVP berhasil disimpan"
    });

  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: "Terjadi kesalahan server: " + error.toString()
    });
  }
}

/**
 * Inisialisasi Database Google Sheets lengkap dengan 29 kolom standar.
 * Buka Apps Script Editor → Pilih fungsi setupDatabase → Klik Run.
 */
function setupDatabase() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Setup Sheet DataKlien
  var sheetKlien = ss.getSheetByName("DataKlien");
  if (!sheetKlien) {
    sheetKlien = ss.insertSheet("DataKlien");
  }

  var headersKlien = [
    // Data Dasar (A-D)
    "slug", "theme", "hero_image", "music_url",
    // Profil Mempelai & Keluarga (E-J)
    "bride_full_name", "bride_nickname", "groom_full_name", "groom_nickname",
    "bride_parents", "groom_parents",
    // Akad Nikah (K-N)
    "akad_date", "akad_time", "akad_location", "akad_map_url",
    // Resepsi (O-R)
    "resepsi_date", "resepsi_time", "resepsi_location", "resepsi_map_url",
    // Amplop Digital (S-V)
    "bank_name", "bank_account", "account_owner", "qris_image",
    // Kado Fisik (W-Y)
    "physical_gift_address", "physical_gift_recipient", "physical_gift_phone",
    // Galeri & Konten Tambahan (Z-AC)
    "gallery_images", "quote", "quote_source", "stream_link"
  ];

  sheetKlien.getRange(1, 1, 1, headersKlien.length).setValues([headersKlien]);
  sheetKlien.getRange(1, 1, 1, headersKlien.length).setFontWeight("bold").setBackground("#f1f5f9");
  sheetKlien.setFrozenRows(1);

  // Masukkan data awal jika belum ada data selain header
  if (sheetKlien.getLastRow() === 1) {
    var dummyData = [
      "desti-anton",
      "elegant",
      "https://res.cloudinary.com/cludinarypartnerinaja/image/upload/kekawinan/images/content/image-T_n0zxtfYajQAbgtK9FCB-1749993291480.png",
      "https://res.cloudinary.com/cludinarypartnerinaja/video/upload/kekawinan/music/music-T_n0zxtfYajQAbgtK9FCB-1749993294782.mp3",
      "Desti Angraeny, S.Ked",
      "Desti",
      "Antonio Putra, S.T",
      "Anton",
      "Putri tercinta dari Bpk. Wijaya Kusuma & Ibu Aini Raharja",
      "Putra tersayang dari Bpk. Anggara & Ibu Anggun",
      "2026-12-31",
      "08:00 - 10:00 WIB",
      "Masjid Istiqlal, Jakarta Pusat",
      "https://maps.google.com/?q=Masjid+Istiqlal",
      "2026-12-31",
      "11:00 - 14:00 WIB",
      "Gedung Aneka Bhakti, Jl. Salemba Raya No.28, Jakarta Pusat",
      "https://maps.google.com/?q=Gedung+Aneka+Bhakti",
      "Bank Central Asia (BCA)",
      "09749893892",
      "Desti Angraeny",
      "",
      "Jl. Salemba Raya No. 12, Jakarta Pusat, DKI Jakarta 10455",
      "Anton & Desti",
      "0857-7772-1212",
      "https://res.cloudinary.com/cludinarypartnerinaja/image/upload/kekawinan/images/gallery/image-5eM0h5iee7mz6qHGY_vUj-1749993442062.png, https://res.cloudinary.com/cludinarypartnerinaja/image/upload/kekawinan/images/gallery/image-4QvHbharHj8KfMXT6txr2-1749993459099.png, https://res.cloudinary.com/cludinarypartnerinaja/image/upload/kekawinan/images/gallery/image-Ep9GWXyi1YGyWWnBrOqRt-1749993450703.png",
      "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
      "Q.S Ar-Rum: 21",
      "https://youtube.com/live/demo"
    ];
    sheetKlien.appendRow(dummyData);
  }

  // 2. Setup Sheet RSVP dengan 6 kolom termasuk kolom status moderasi
  var sheetRsvp = ss.getSheetByName("RSVP");
  if (!sheetRsvp) {
    sheetRsvp = ss.insertSheet("RSVP");
  }

  var headersRsvp = ["slug", "nama_tamu", "kehadiran", "pesan", "timestamp", "status"];
  sheetRsvp.getRange(1, 1, 1, headersRsvp.length).setValues([headersRsvp]);
  sheetRsvp.getRange(1, 1, 1, headersRsvp.length).setFontWeight("bold").setBackground("#f1f5f9");
  sheetRsvp.setFrozenRows(1);

  Logger.log("✅ Berhasil: Database Temu Waktu 29 Kolom & RSVP 6 Kolom berhasil diinisialisasi!");
}

/**
 * Helper: Memindahkan file upload dari Google Form ke folder khusus & membuat link publik.
 */
function processDriveFiles(fileIdOrUrlString, folder) {
  if (!fileIdOrUrlString) return "";

  var items = fileIdOrUrlString.toString().split(",").map(function(s) { return s.trim(); });
  var urls = [];

  for (var i = 0; i < items.length; i++) {
    var raw = items[i];
    var id = raw;
    var match = raw.match(/id=([^&]+)/) || raw.match(/\/d\/([^/]+)/);
    if (match) {
      id = match[1];
    }

    try {
      var file = DriveApp.getFileById(id);
      if (folder) {
        file.moveTo(folder);
      }
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      urls.push("https://drive.google.com/thumbnail?id=" + id + "&sz=w1600");
    } catch (err) {
      Logger.log("Peringatan: Gagal memproses file ID " + id + ": " + err);
      // Jika bukan file ID drive murni (misal URL luar), simpan as-is
      if (raw.indexOf("http") === 0) {
        urls.push(raw);
      }
    }
  }
  return urls.join(", ");
}

/**
 * Otomasi Trigger Google Form Submission.
 * Dipicu saat klien mengisi Google Form pendaftaran undangan.
 */
function onFormSubmitAutomation(e) {
  try {
    if (!e || !e.values) {
      Logger.log("Error: e.values tidak ada. Pastikan trigger terpasang pada event 'On form submit'.");
      return;
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DataKlien");
    if (!sheet) {
      Logger.log("Sheet DataKlien belum dibuat.");
      return;
    }

    // e.values berisi urutan pertanyaan form:
    // [0] Timestamp
    // [1] Tema Pilihan
    // [2] Link Musik / Lagu (YouTube atau Drive)
    // [3] Nama Lengkap Mempelai Wanita
    // [4] Nama Panggilan Mempelai Wanita
    // [5] Orang Tua Mempelai Wanita
    // [6] Nama Lengkap Mempelai Pria
    // [7] Nama Panggilan Mempelai Pria
    // [8] Orang Tua Mempelai Pria
    // [9] Tanggal Akad
    // [10] Waktu Akad
    // [11] Lokasi Akad
    // [12] Link Maps Akad
    // [13] Tanggal Resepsi
    // [14] Waktu Resepsi
    // [15] Lokasi Resepsi
    // [16] Link Maps Resepsi
    // [17] Nama Bank
    // [18] Nomor Rekening
    // [19] Pemilik Rekening
    // [20] Alamat Kado Fisik
    // [21] Penerima Kado Fisik
    // [22] No HP Kado Fisik
    // [23] Kutipan Kata Mutiara / Ayat
    // [24] Sumber Kutipan
    // [25] Link Live Streaming
    // [26] Upload Foto Utama (Hero)
    // [27] Upload Foto Galeri
    // [28] Upload QRIS
    // [29] (Opsional) Custom Link Slug / Permintaan URL Khusus

    var v = e.values;
    var brideNick = (v[4] || "bride").toString().toLowerCase().trim().replace(/[^a-z0-9]/g, "");
    var groomNick = (v[7] || "groom").toString().toLowerCase().trim().replace(/[^a-z0-9]/g, "");
    
    // Q1: Clean & Custom Slug with Collision Resolution
    var requestedSlug = (v[29] || (groomNick + "-" + brideNick)).toString().toLowerCase().trim();
    var cleanSlug = requestedSlug.replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
    if (!cleanSlug) {
      cleanSlug = groomNick + "-" + brideNick;
    }
    if (!cleanSlug) {
      cleanSlug = "wedding";
    }

    // Acquire script lock to avoid race conditions on slug uniqueness check and row append
    var lock = LockService.getScriptLock();
    try {
      lock.waitLock(30000);
    } catch (lockErr) {
      Logger.log("Peringatan: Gagal memperoleh lock: " + lockErr);
    }

    // Periksa duplikasi slug di sheet DataKlien (Kolom A)
    var existingSlugs = [];
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var slugValues = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
      for (var s = 0; s < slugValues.length; s++) {
        var existing = (slugValues[s][0] || "").toString().toLowerCase().trim();
        if (existing) existingSlugs.push(existing);
      }
    }

    // Resolusi tabrakan nama: coba slug asli -> slug-tahun -> slug-2, slug-3, dst.
    var slug = cleanSlug;
    if (existingSlugs.indexOf(slug) !== -1) {
      var currentYear = new Date().getFullYear();
      var candidateYear = cleanSlug + "-" + currentYear;
      if (existingSlugs.indexOf(candidateYear) === -1) {
        slug = candidateYear;
      } else {
        var counter = 2;
        while (existingSlugs.indexOf(cleanSlug + "-" + counter) !== -1) {
          counter++;
        }
        slug = cleanSlug + "-" + counter;
      }
    }

    // Buat folder aset di Google Drive
    var folderName = "[Aset Undangan] " + slug;
    var folder = DriveApp.createFolder(folderName);
    folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    var heroImageUrl = v[26] ? processDriveFiles(v[26], folder) : "";
    var galleryImagesUrl = v[27] ? processDriveFiles(v[27], folder) : "";
    var qrisImageUrl = v[28] ? processDriveFiles(v[28], folder) : "";

    var newRow = [
      slug,                    // A: slug
      v[1] || "elegant",       // B: theme
      heroImageUrl,            // C: hero_image
      v[2] || "",              // D: music_url
      v[3] || "",              // E: bride_full_name
      v[4] || "",              // F: bride_nickname
      v[6] || "",              // G: groom_full_name
      v[7] || "",              // H: groom_nickname
      v[5] || "",              // I: bride_parents
      v[8] || "",              // J: groom_parents
      v[9] || "",              // K: akad_date
      v[10] || "",             // L: akad_time
      v[11] || "",             // M: akad_location
      v[12] || "",             // N: akad_map_url
      v[13] || "",             // O: resepsi_date
      v[14] || "",             // P: resepsi_time
      v[15] || "",             // Q: resepsi_location
      v[16] || "",             // R: resepsi_map_url
      v[17] || "",             // S: bank_name
      v[18] || "",             // T: bank_account
      v[19] || "",             // U: account_owner
      qrisImageUrl,            // V: qris_image
      v[20] || "",             // W: physical_gift_address
      v[21] || "",             // X: physical_gift_recipient
      v[22] || "",             // Y: physical_gift_phone
      galleryImagesUrl,        // Z: gallery_images
      v[23] || "",             // AA: quote
      v[24] || "",             // AB: quote_source
      v[25] || ""              // AC: stream_link
    ];

    sheet.appendRow(newRow);
    Logger.log("✅ Berhasil memproses pendaftaran baru untuk slug: " + slug);

  } catch (err) {
    Logger.log("❌ Error onFormSubmitAutomation: " + err.toString());
  } finally {
    if (lock) {
      try {
        lock.releaseLock();
      } catch (lockReleaseErr) {}
    }
  }
}