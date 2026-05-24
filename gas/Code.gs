// ============================================================
// Digital Wedding Invitation — Google Apps Script Backend
// ============================================================
// This file handles two endpoints:
//   doGet(e)  → Fetch client data by slug from "DataKlien" tab
//   doPost(e) → Save RSVP submission to "RSVP" tab
//
// DEPLOYMENT:
//   1. Open Google Sheets → Extensions → Apps Script
//   2. Paste this code into Code.gs
//   3. Deploy → New deployment → Web app
//   4. Execute as: "Me"
//   5. Who has access: "Anyone"
//   6. Copy the /exec URL into your .env.local
// ============================================================

/**
 * Helper: Create a JSON response with proper content type.
 * Google Apps Script does not support custom CORS headers,
 * but deployed-as-"Anyone" web apps handle CORS automatically
 * for simple requests (GET, and POST with text/plain).
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * GET Handler — Fetch client data by slug.
 *
 * Usage: GET {GAS_URL}?slug=andi-nina
 *
 * Searches the "DataKlien" sheet for a row where column A matches the slug.
 * Returns the row data as a JSON object with named fields.
 */
function doGet(e) {
  try {
    var slug = e.parameter.slug;
    var action = e.parameter.action;

    if (!slug) {
      return createJsonResponse({
        status: "error",
        message: "Parameter 'slug' diperlukan"
      });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // ── Handle Guestbook (RSVP) Action ──
    if (action === "guestbook") {
      var sheetRsvp = ss.getSheetByName("RSVP");
      if (!sheetRsvp) {
        return createJsonResponse({ status: "error", message: "Sheet 'RSVP' tidak ditemukan" });
      }

      var rsvpData = sheetRsvp.getDataRange().getValues();
      var rsvpHeaders = rsvpData[0];
      var rsvps = [];

      // Columns: slug, nama_tamu, kehadiran, pesan, timestamp
      // Loop from end to start for reverse chronological (newest first)
      for (var k = rsvpData.length - 1; k > 0; k--) {
        if (rsvpData[k][0].toString().trim().toLowerCase() === slug.trim().toLowerCase()) {
          var entry = {};
          for (var l = 0; l < rsvpHeaders.length; l++) {
            entry[rsvpHeaders[l].toString().trim()] = rsvpData[k][l];
          }
          // Only add if they left a message
          if (entry.pesan) {
            rsvps.push(entry);
          }
        }
      }

      return createJsonResponse({
        status: "success",
        data: rsvps
      });
    }

    // ── Handle Default Action (DataKlien) ──
    var sheet = ss.getSheetByName("DataKlien");

    if (!sheet) {
      return createJsonResponse({
        status: "error",
        message: "Sheet 'DataKlien' tidak ditemukan"
      });
    }

    var data = sheet.getDataRange().getValues();
    var headers = data[0]; // First row = headers
    var result = null;

    // Search for matching slug in column A (index 0)
    for (var i = 1; i < data.length; i++) {
      if (data[i][0].toString().trim().toLowerCase() === slug.trim().toLowerCase()) {
        result = {};
        for (var j = 0; j < headers.length; j++) {
          result[headers[j].toString().trim()] = data[i][j];
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
 * POST Handler — Save an RSVP submission.
 *
 * Accepts JSON payload (sent as text/plain to bypass CORS preflight):
 * {
 *   "slug": "andi-nina",
 *   "nama_tamu": "Budi Santoso",
 *   "kehadiran": "Hadir",
 *   "pesan": "Selamat menempuh hidup baru!"
 * }
 *
 * Appends a new row to the "RSVP" sheet with a timestamp.
 */
function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);

    var slug = payload.slug;
    var nama_tamu = payload.nama_tamu;
    var kehadiran = payload.kehadiran;
    var pesan = payload.pesan;

    // Validate required fields
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

    // Append new row: slug | nama_tamu | kehadiran | pesan | timestamp
    var timestamp = new Date();
    sheet.appendRow([slug, nama_tamu, kehadiran, pesan || "", timestamp]);

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
 * One-time setup — Run this function manually to create the sheet tabs
 * with correct headers. Go to Apps Script Editor → Run → setupDatabase.
 *
 * DataKlien column order (A → U):
 *   A: slug, B: theme, C: hero_image, D: music_url,
 *   E: bride_full_name, F: bride_nickname, G: groom_full_name, H: groom_nickname,
 *   I: akad_date, J: akad_time, K: akad_location, L: akad_map_url,
 *   M: resepsi_date, N: resepsi_time, O: resepsi_location, P: resepsi_map_url,
 *   Q: bank_name, R: bank_account, S: account_owner, T: qris_image,
 *   U: gallery_images
 */
function setupDatabase() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Setup Sheet DataKlien
  var sheetKlien = ss.getSheetByName("DataKlien");
  if (!sheetKlien) {
    sheetKlien = ss.insertSheet("DataKlien");
  }
  
  // Set Header untuk DataKlien (21 kolom, urutan sesuai PRD.md)
  var headersKlien = [
    // Data Dasar (A-D)
    "slug", "theme", "hero_image", "music_url",
    // Profil Mempelai (E-H)
    "bride_full_name", "bride_nickname", "groom_full_name", "groom_nickname",
    // Akad (I-L)
    "akad_date", "akad_time", "akad_location", "akad_map_url",
    // Resepsi (M-P)
    "resepsi_date", "resepsi_time", "resepsi_location", "resepsi_map_url",
    // Amplop Digital (Q-T)
    "bank_name", "bank_account", "account_owner", "qris_image",
    // Galeri (U)
    "gallery_images"
  ];
  sheetKlien.getRange(1, 1, 1, headersKlien.length).setValues([headersKlien]);
  sheetKlien.getRange(1, 1, 1, headersKlien.length).setFontWeight("bold");
  sheetKlien.setFrozenRows(1);
  
  // Masukkan Dummy Data jika sheet masih kosong (hanya ada header)
  if (sheetKlien.getLastRow() === 1) {
    var dummyData = [
      // Data Dasar
      "romeo-juliet", "elegant", "", "",
      // Profil Mempelai
      "Juliet Capulet", "Juliet", "Romeo Montague", "Romeo",
      // Akad
      "2026-12-31", "08:00 - 10:00 WIB", "Masjid Istiqlal, Jakarta", "https://maps.google.com/?q=Masjid+Istiqlal",
      // Resepsi
      "2026-12-31", "11:00 - 14:00 WIB", "Gedung Serbaguna, Jakarta", "https://maps.google.com/?q=Gedung+Serbaguna",
      // Amplop Digital
      "BCA", "1234567890", "Romeo Montague", "",
      // Galeri
      ""
    ];
    sheetKlien.appendRow(dummyData);
  }

  // 2. Setup Sheet RSVP
  var sheetRsvp = ss.getSheetByName("RSVP");
  if (!sheetRsvp) {
    sheetRsvp = ss.insertSheet("RSVP");
  }
  
  // Set Header untuk RSVP
  var headersRsvp = ["slug", "nama_tamu", "kehadiran", "pesan", "timestamp"];
  sheetRsvp.getRange(1, 1, 1, headersRsvp.length).setValues([headersRsvp]);
  sheetRsvp.getRange(1, 1, 1, headersRsvp.length).setFontWeight("bold");
  sheetRsvp.setFrozenRows(1);
  
  Logger.log("Instalasi Database selesai! Cek Google Sheets kamu.");
}