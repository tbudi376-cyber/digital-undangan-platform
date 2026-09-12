'use client';

import { useState } from 'react';

export default function LinkGeneratorPage() {
  const [slug, setSlug] = useState('cintanico-171');
  const [guestInput, setGuestInput] = useState('');
  const [customMessage, setCustomMessage] = useState(
    'Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami. Detail undangan dapat dilihat pada tautan berikut:'
  );
  const [generatedLinks, setGeneratedLinks] = useState<{ name: string; url: string; waUrl: string }[]>([]);

  const handleGenerate = () => {
    if (!guestInput.trim() || !slug.trim()) return;

    const names = guestInput.split('\n').filter((name) => name.trim() !== '');
    const baseUrl = window.location.origin;

    const links = names.map((name) => {
      const trimmedName = name.trim();
      const invitationUrl = `${baseUrl}/${slug}?to=${encodeURIComponent(trimmedName)}`;
      
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-gray-900">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🎁 Temu Waktu - Guest Link Generator</h1>
        <p className="text-gray-500 mb-8 text-sm">Buat ratusan link undangan personal untuk WhatsApp klien dalam hitungan detik.</p>

        <div className="space-y-6">
          {/* Input Slug */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Slug Undangan Klien</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="contoh: budi-wati-421"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
            />
          </div>

          {/* Input Template Pesan */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Template Pengantar WhatsApp</label>
            <textarea
              rows={3}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white text-sm"
            />
          </div>

          {/* Input Daftar Nama Tamu */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Daftar Nama Tamu <span className="text-gray-400 font-normal">(Satu nama per baris)</span>
            </label>
            <textarea
              rows={6}
              value={guestInput}
              onChange={(e) => setGuestInput(e.target.value)}
              placeholder={"Budi Santoso\nSiti Rahma\nJoko Widodo"}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white tracking-wide"
            />
          </div>

          {/* Tombol Generate */}
          <button
            type="button"
            onClick={handleGenerate}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-lg transition-colors duration-200"
          >
            🔗 Generate Link Undangan
          </button>
        </div>

        {/* Tampilan Hasil */}
        {generatedLinks.length > 0 && (
          <div className="mt-12 border-t border-gray-100 pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📋 Hasil Pembuatan Link ({generatedLinks.length} Tamu)</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {generatedLinks.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl gap-4">
                  <div className="truncate max-w-xs sm:max-w-sm">
                    <p className="font-semibold text-sm text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{item.url}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.url);
                        alert(`Link untuk ${item.name} berhasil disalin!`);
                      }}
                      className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-100 text-xs font-medium rounded-md transition-colors text-gray-700"
                    >
                      Salin Link
                    </button>
                    <a
                      href={item.waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-md text-center transition-colors flex items-center"
                    >
                      Kirim WA
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
