import React, { useState } from 'react';

interface Relic {
  id: string;
  name: string;
  type: 'relic';
}

interface Clue {
  id: string;
  text: string;
  type: 'clue';
  relicId: string; // matches relic.id
}

const RELICS: Relic[] = [
  { id: '1', name: 'Hoàng thành Thăng Long', type: 'relic' },
  { id: '2', name: 'Cố đô Huế', type: 'relic' },
  { id: '3', name: 'Phố cổ Hội An', type: 'relic' },
  { id: '4', name: 'Thánh địa Mỹ Sơn', type: 'relic' },
  { id: '5', name: 'Vịnh Hạ Long', type: 'relic' }
];

const CLUES: Clue[] = [
  { id: 'clue_1', text: 'Kinh đô trải qua các triều đại Lý, Trần, Lê Sơ, Mạc, Lê Trung Hưng gắn liền với Thăng Long cứu quốc.', type: 'clue', relicId: '1' },
  { id: 'clue_2', text: 'Trung tâm hành chính chính trị dưới triều đại nhà Nguyễn dựng lập dọc theo dòng sông Hương thơ mộng.', type: 'clue', relicId: '2' },
  { id: 'clue_3', text: 'Thương cảng quốc tế sầm uất thế kỷ XVII-XVIII hội tụ giao thao văn hóa Việt - Trung - Nhật.', type: 'clue', relicId: '3' },
  { id: 'clue_4', text: 'Quần thể đền tháp Chăm-pa cổ kính được xây dựng từ thế kỷ IV đến XIII ẩn mình trong thung lũng Quảng Nam.', type: 'clue', relicId: '4' },
  { id: 'clue_5', text: 'Kỳ quan thiên nhiên thế giới nổi bật với hàng ngàn đảo đá vôi nhô lên từ làn nước biển xanh ngọc.', type: 'clue', relicId: '5' }
];

export default function RelicMatchGame({ onComplete }: { onComplete?: (score: number) => void }) {
  const [selectedRelic, setSelectedRelic] = useState<string | null>(null);
  const [selectedClue, setSelectedClue] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({}); // relicId -> clueId
  const [wrongMatch, setWrongMatch] = useState<{ relicId: string; clueId: string } | null>(null);
  const [shuffledRelics] = useState(() => [...RELICS].sort(() => Math.random() - 0.5));
  const [shuffledClues] = useState(() => [...CLUES].sort(() => Math.random() - 0.5));

  const handleSelectRelic = (relicId: string) => {
    if (matches[relicId]) return; // already matched
    setSelectedRelic(relicId);
    setWrongMatch(null);

    if (selectedClue) {
      // Check match
      const clue = CLUES.find(c => c.id === selectedClue);
      if (clue && clue.relicId === relicId) {
        // Success
        setMatches(prev => ({ ...prev, [relicId]: selectedClue }));
        setSelectedRelic(null);
        setSelectedClue(null);
        
        // Check game over
        const nextMatchesCount = Object.keys(matches).length + 1;
        if (nextMatchesCount === RELICS.length && onComplete) {
          onComplete(100);
        }
      } else {
        // Fail
        setWrongMatch({ relicId, clueId: selectedClue });
        setSelectedRelic(null);
        setSelectedClue(null);
        setTimeout(() => setWrongMatch(null), 1000);
      }
    }
  };

  const handleSelectClue = (clueId: string) => {
    // Check if clue is already matched
    if (Object.values(matches).includes(clueId)) return;
    setSelectedClue(clueId);
    setWrongMatch(null);

    if (selectedRelic) {
      // Check match
      const clue = CLUES.find(c => c.id === clueId);
      if (clue && clue.relicId === selectedRelic) {
        // Success
        setMatches(prev => ({ ...prev, [selectedRelic]: clueId }));
        setSelectedRelic(null);
        setSelectedClue(null);

        // Check game over
        const nextMatchesCount = Object.keys(matches).length + 1;
        if (nextMatchesCount === RELICS.length && onComplete) {
          onComplete(100);
        }
      } else {
        // Fail
        setWrongMatch({ relicId: selectedRelic, clueId });
        setSelectedRelic(null);
        setSelectedClue(null);
        setTimeout(() => setWrongMatch(null), 1000);
      }
    }
  };

  const resetGame = () => {
    setMatches({});
    setSelectedRelic(null);
    setSelectedClue(null);
    setWrongMatch(null);
  };

  const solvedCount = Object.keys(matches).length;
  const isFinished = solvedCount === RELICS.length;

  return (
    <div className="space-y-6" id="g8-relic-root">
      <div className="text-center space-y-2">
        <span className="bg-purple-100 text-purple-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-full font-display">MODULAR GAME • KHỐI 8</span>
        <h3 className="font-extrabold text-lg text-slate-900 font-display">🏛️ Giải mã di sản Việt Nam</h3>
        <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
          Nhiệm vụ của bạn: Hãy chọn một <span className="text-purple-600 font-black">Địa danh lịch sử</span> ở cột trái kết nối với <span className="text-purple-600 font-black">Gợi ý kiến thức</span> tương ứng ở cột phải!
        </p>
      </div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* Relics Deck */}
        <div className="space-y-3">
          <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest text-center md:text-left">DANH SÁCH DI SẢN LIÊN KHÓA</span>
          {shuffledRelics.map(r => {
            const isMatched = !!matches[r.id];
            const isSelected = selectedRelic === r.id;
            const isWrong = wrongMatch?.relicId === r.id;

            return (
              <button
                key={r.id}
                type="button"
                disabled={isMatched}
                onClick={() => handleSelectRelic(r.id)}
                className={`w-full p-4 rounded-xl text-left border text-xs sm:text-sm font-black transition-all flex items-center justify-between ${
                  isMatched
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 line-through opacity-65'
                    : isWrong
                    ? 'bg-rose-50 border-rose-300 text-rose-700 animate-shake'
                    : isSelected
                    ? 'bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-100'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>🏰 {r.name}</span>
                {isMatched && <span className="text-[10px] font-bold text-emerald-600 uppercase">✓ ĐÃ KẾT NỐI</span>}
              </button>
            );
          })}
        </div>

        {/* Clues Deck */}
        <div className="space-y-3">
          <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest text-center md:text-left">ĐĂNG KÝ KIẾN THỨC BÍ ẨN</span>
          {shuffledClues.map(c => {
            const isMatched = Object.values(matches).includes(c.id);
            const isSelected = selectedClue === c.id;
            const isWrong = wrongMatch?.clueId === c.id;

            return (
              <button
                key={c.id}
                type="button"
                disabled={isMatched}
                onClick={() => handleSelectClue(c.id)}
                className={`w-full p-4 rounded-xl text-left border text-xs leading-relaxed font-semibold transition-all flex flex-col justify-between gap-2 ${
                  isMatched
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 opacity-65'
                    : isWrong
                    ? 'bg-rose-50 border-rose-300 text-rose-700 animate-shake'
                    : isSelected
                    ? 'bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-100'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <p>💡 {c.text}</p>
                {isMatched && <span className="text-[9px] font-black text-emerald-600 uppercase self-end">✓ KẾT NỐI CHUẨN XÁC</span>}
              </button>
            );
          })}
        </div>

      </div>

      <div className="flex flex-col items-center gap-4">
        {isFinished ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2 max-w-sm w-full animate-fadeIn">
            <span className="block text-[10px] font-black text-emerald-600 uppercase tracking-widest">KẾT QUẢ ĐẠT ĐƯỢC</span>
            <div className="font-display font-black text-3xl text-emerald-700">
              100% HOÀN THÀNH
            </div>
            <p className="text-[11px] text-emerald-800 font-semibold leading-relaxed">
              🏆 Kỳ tài Quốc Học! Bạn đã hiểu cặn kẽ 5 địa danh lịch sử di sản văn hóa thế giới lừng lẫy của đất nước!
            </p>
          </div>
        ) : (
          <div className="text-xs text-slate-400 font-bold">
            Tiến độ giải mã: {solvedCount} / {RELICS.length} di sản
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={resetGame}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer active:scale-95"
          >
            🔄 Kết nối lại từ đầu
          </button>
        </div>
      </div>
    </div>
  );
}
