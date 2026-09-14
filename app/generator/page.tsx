'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface RsvpSummaryData {
  slug: string;
  coupleName: string;
  totalEntries: number;
  totalHadir: number;
  totalTidakHadir: number;
  hadirPercentage: number;
  entries: {
    nama_tamu: string;
    kehadiran: string;
    pesan: string;
    timestamp: string;
  }[];
  waReportText: string;
}

export default function GeneratorAndAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'link' | 'recap'>('link');

  // ==========================================
  // TAB 1: GUEST LINK GENERATOR
  // ==========================================
  const [slug, setSlug] = useState('desti-anton');
  const [guestInput, setGuestInput] = useState('');
  const [customMessage, setCustomMessage] = useState(
    'Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami. Detail undangan dapat dilihat pada tautan berikut:'
  );
  const [generatedLinks, setGeneratedLinks] = useState<{ name: string; url: string; waUrl: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedAll, setCopiedAll] = useState(false);

  const handleGenerate = () => {
    if (!guestInput.trim() || !slug.trim()) return;

    const names = guestInput.split('\n').filter((name) => name.trim() !== '');
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

    const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');

    const links = names.map((name) => {
      const trimmedName = name.trim();
      const invitationUrl = `${baseUrl}/${cleanSlug}?to=${encodeURIComponent(trimmedName)}`;
      const fullMessage = `Halo *${trimmedName}*,\n\n${customMessage}\n\n${invitationUrl}`;
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullMessage)}`;

      return {
        name: trimmedName,
        url: invitationUrl,
        waUrl: whatsappUrl,
      };
    });

    setGeneratedLinks(links);
  };

  const handleCopyAll = () => {
    if (generatedLinks.length === 0) return;
    const textAll = generatedLinks.map((l) => `${l.name}: ${l.url}`).join('\n');
    navigator.clipboard.writeText(textAll);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const filteredLinks = generatedLinks.filter((l) =>
    l.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ==========================================
  // TAB 2: RSVP & CATERING RECAP (Q4)
  // ==========================================
  const [recapSlug, setRecapSlug] = useState('desti-anton');
  const [isLoadingRecap, setIsLoadingRecap] = useState(false);
  const [recapData, setRecapData] = useState<RsvpSummaryData | null>(null);
  const [recapError, setRecapError] = useState<string | null>(null);
  const [copiedWaReport, setCopiedWaReport] = useState(false);
  const [tableFilter, setTableFilter] = useState<'all' | 'hadir' | 'tidak'>('all');

  const fetchRsvpRecap = async (targetSlug: string) => {
    const clean = targetSlug.trim().toLowerCase();
    if (!clean) return;

    setIsLoadingRecap(true);
    setRecapError(null);

    try {
      const res = await fetch(`/api/rsvp-summary?slug=${encodeURIComponent(clean)}`);
      const json = await res.json();

      if (json.status === 'success' && json.data) {
        setRecapData(json.data);
      } else {
        setRecapError(json.error || 'Gagal mengambil data RSVP untuk slug ini');
        setRecapData(null);
      }
    } catch {
      setRecapError('Terjadi kendala jaringan saat menghubungi server');
    } finally {
      setIsLoadingRecap(false);
    }
  };

  const handleCopyWaReport = () => {
    if (!recapData?.waReportText) return;
    navigator.clipboard.writeText(recapData.waReportText);
    setCopiedWaReport(true);
    setTimeout(() => setCopiedWaReport(false), 2500);
  };

  const filteredEntries = recapData?.entries.filter((entry) => {
    if (tableFilter === 'hadir') return (entry.kehadiran || '').toLowerCase() === 'hadir';
    if (tableFilter === 'tidak') return (entry.kehadiran || '').toLowerCase() !== 'hadir';
    return true;
  }) || [];

  useEffect(() => {
    let isMounted = true;
    const checkSession = async () => {
      try {
        const res = await fetch('/api/verify-admin');
        if (res.ok && isMounted) {
          setIsAuthenticated(true);
        }
      } catch {
        // Unauthenticated
      }
    };
    checkSession();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogin = async () => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/verify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        const data = await res.json();
        setAuthError(data.error || 'Password salah');
      }
    } catch {
      setAuthError('Gagal menghubungi server');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/verify-admin', { method: 'DELETE' });
    } catch {
      // Ignore
    } finally {
      setIsAuthenticated(false);
      setAdminPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a0a0a] to-[#2d1515] flex items-center justify-center p-4">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Portal Admin</h1>
          <p className="text-white/60 text-sm mb-6">
            Masukkan password untuk mengakses generator tautan dan rekap RSVP.
          </p>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Password"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 mb-3 focus:outline-none focus:border-[#C9A96E]"
          />
          {authError && <p className="text-red-400 text-sm mb-3">{authError}</p>}
          <button
            onClick={handleLogin}
            disabled={authLoading}
            className="w-full py-3 bg-gradient-to-r from-[#C9A96E] to-[#8B7355] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {authLoading ? 'Memverifikasi...' : 'Masuk'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 text-slate-900 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <Link
                href="/"
                className="text-xs text-rose-600 font-semibold hover:underline flex items-center gap-1"
              >
                ← Kembali ke Beranda
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs text-slate-500 hover:text-red-600 font-medium transition-colors px-2.5 py-1 rounded-lg border border-slate-200 hover:border-red-200 bg-white shadow-xs"
              >
                Keluar (Logout)
              </button>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Temu Waktu — Admin &amp; Generator Suite
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manajemen link tamu personal &amp; rekap katering otomatis untuk pengantin.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex p-1 bg-slate-200/80 rounded-xl self-start sm:self-center">
            <button
              onClick={() => setActiveTab('link')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'link'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🔗 Link WhatsApp Tamu
            </button>
            <button
              onClick={() => {
                setActiveTab('recap');
                if (!recapData && !isLoadingRecap) {
                  fetchRsvpRecap(recapSlug);
                }
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'recap'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📊 Rekap RSVP &amp; Katering
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: BROADCAST LINK GENERATOR */}
        {/* ============================================================ */}
        {activeTab === 'link' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">
                Generator Link Undangan WhatsApp Tamu
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Setiap nama tamu akan otomatis disisipkan ke parameter URL (`?to=Nama+Tamu`) sehingga membuka cover dengan sapaan personal.
              </p>
            </div>

            <div className="space-y-4">
              {/* Input Slug */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Slug Undangan Klien
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="contoh: desti-anton"
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  />
                  <Link
                    href={`/${slug.trim() || 'demo'}?preview=true`}
                    target="_blank"
                    className="shrink-0 px-4 py-2.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5"
                  >
                    <span>Preview</span> ↗
                  </Link>
                </div>
              </div>

              {/* Template Pesan */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Template Pesan Pengantar WhatsApp
                </label>
                <textarea
                  rows={3}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                />
              </div>

              {/* Daftar Tamu */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Daftar Nama Tamu <span className="text-slate-400 font-normal lowercase">(satu nama per baris)</span>
                </label>
                <textarea
                  rows={6}
                  value={guestInput}
                  onChange={(e) => setGuestInput(e.target.value)}
                  placeholder={"Budi Santoso & Keluarga\nSiti Rahma, S.Pd\nDr. Joko Widodo & Istri\nDimas Pratama"}
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white font-mono"
                />
              </div>

              {/* Generate Button */}
              <button
                type="button"
                onClick={handleGenerate}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-md cursor-pointer text-sm"
              >
                ✨ Buat Link Undangan Personal
              </button>
            </div>

            {/* Generated Links Result */}
            {generatedLinks.length > 0 && (
              <div className="pt-6 border-t border-slate-100 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      📋 Hasil Pembuatan ({generatedLinks.length} Tamu)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Kirim langsung via WhatsApp Web/App atau salin seluruh link sekaligus.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Cari nama tamu..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white w-40"
                    />
                    <button
                      onClick={handleCopyAll}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 shadow-sm"
                    >
                      {copiedAll ? '✓ Tersalin Semua!' : 'Salin Semua Link'}
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                  {filteredLinks.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-slate-50 border border-slate-200/80 rounded-xl gap-3 hover:bg-slate-100/60 transition-colors"
                    >
                      <div className="truncate max-w-sm">
                        <p className="font-semibold text-xs sm:text-sm text-slate-800">{item.name}</p>
                        <p className="text-[11px] text-slate-400 truncate font-mono mt-0.5">{item.url}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(item.url);
                          }}
                          className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-xs font-medium rounded-lg transition-colors text-slate-700 shadow-2xs cursor-pointer"
                        >
                          Salin Link
                        </button>
                        <a
                          href={item.waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg text-center transition-colors flex items-center gap-1 shadow-2xs"
                        >
                          <span>Kirim WA</span> 💬
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: RSVP & CATERING RECAP (Q4) */}
        {/* ============================================================ */}
        {activeTab === 'recap' && (
          <div className="space-y-6">
            {/* Control Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">
                  Rekap RSVP &amp; Estimasi Headcount Katering
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm">
                  Tarik data konfirmasi kehadiran tamu secara langsung dari Google Sheets, hitung kebutuhan porsi, dan buat laporan WhatsApp rapi dalam 1 kali klik.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={recapSlug}
                    onChange={(e) => setRecapSlug(e.target.value)}
                    placeholder="Masukkan slug klien (contoh: desti-anton)"
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  />
                </div>
                <button
                  type="button"
                  disabled={isLoadingRecap}
                  onClick={() => fetchRsvpRecap(recapSlug)}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-all shadow-sm cursor-pointer shrink-0"
                >
                  {isLoadingRecap ? 'Mengambil Data...' : '⚡ Tarik Data RSVP'}
                </button>
              </div>

              {/* Quick Chips */}
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Coba slug contoh:</span>
                <button
                  type="button"
                  onClick={() => {
                    setRecapSlug('desti-anton');
                    fetchRsvpRecap('desti-anton');
                  }}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-mono"
                >
                  desti-anton
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRecapSlug('romeo-juliet');
                    fetchRsvpRecap('romeo-juliet');
                  }}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-mono"
                >
                  romeo-juliet
                </button>
              </div>
            </div>

            {/* Error Display */}
            {recapError && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm">
                ⚠️ {recapError}
              </div>
            )}

            {/* Recap Content */}
            {recapData && (
              <>
                {/* 4 Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                    <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Total Respon</p>
                    <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{recapData.totalEntries}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Tamu merespons</p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs bg-gradient-to-b from-white to-emerald-50/30">
                    <p className="text-xs font-semibold uppercase text-emerald-700 tracking-wider">Konfirmasi Hadir</p>
                    <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">{recapData.totalHadir}</p>
                    <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                      {recapData.hadirPercentage}% tingkat kehadiran
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                    <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Berhalangan</p>
                    <p className="text-2xl sm:text-3xl font-black text-slate-600 mt-1">{recapData.totalTidakHadir}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Tamu berhalangan</p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs bg-gradient-to-b from-white to-amber-50/30">
                    <p className="text-xs font-semibold uppercase text-amber-800 tracking-wider">Estimasi Katering</p>
                    <p className="text-2xl sm:text-3xl font-black text-amber-700 mt-1">
                      {Math.ceil(recapData.totalHadir * 1.15)}
                    </p>
                    <p className="text-[11px] text-amber-800 font-medium mt-0.5">porsi (+15% buffer)</p>
                  </div>
                </div>

                {/* 1-Click WhatsApp Report Box */}
                <div className="bg-white p-6 sm:p-7 rounded-2xl border border-emerald-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <h3 className="text-base font-bold text-slate-900">
                          Template Rekap WhatsApp untuk Klien ({recapData.coupleName})
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Teks di bawah ini sudah diformat rapi dengan bullet point WhatsApp dan estimasi katering.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyWaReport}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
                    >
                      <span>{copiedWaReport ? '✓ Laporan Tersalin!' : '📋 Salin Rekap WhatsApp (1-Klik)'}</span>
                    </button>
                  </div>

                  <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs max-h-56 overflow-y-auto whitespace-pre-wrap leading-relaxed select-all">
                    {recapData.waReportText}
                  </div>
                </div>

                {/* Detailed RSVP Table */}
                <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="text-base font-bold text-slate-900">
                      Daftar Respons &amp; Buku Tamu ({filteredEntries.length})
                    </h3>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start">
                      <button
                        onClick={() => setTableFilter('all')}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                          tableFilter === 'all'
                            ? 'bg-white text-slate-900 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Semua ({recapData.totalEntries})
                      </button>
                      <button
                        onClick={() => setTableFilter('hadir')}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                          tableFilter === 'hadir'
                            ? 'bg-white text-emerald-700 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Hadir ({recapData.totalHadir})
                      </button>
                      <button
                        onClick={() => setTableFilter('tidak')}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                          tableFilter === 'tidak'
                            ? 'bg-white text-slate-700 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Berhalangan ({recapData.totalTidakHadir})
                      </button>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto border border-slate-200/80 rounded-xl">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-4">Nama Tamu</th>
                          <th className="py-3 px-4">Kehadiran</th>
                          <th className="py-3 px-4">Ucapan &amp; Doa</th>
                          <th className="py-3 px-4">Waktu</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredEntries.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="py-6 text-center text-slate-400">
                              Tidak ada entri untuk filter ini
                            </td>
                          </tr>
                        ) : (
                          filteredEntries.map((entry, idx) => {
                            const isHadir = (entry.kehadiran || '').toLowerCase() === 'hadir';
                            return (
                              <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                                <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">
                                  {entry.nama_tamu}
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                  <span
                                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                      isHadir
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-slate-100 text-slate-600'
                                    }`}
                                  >
                                    {isHadir ? '✓ Hadir' : '✕ Tidak Hadir'}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-slate-600 max-w-xs sm:max-w-md truncate">
                                  {entry.pesan || '-'}
                                </td>
                                <td className="py-3 px-4 text-slate-400 text-xs whitespace-nowrap">
                                  {entry.timestamp || '-'}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
