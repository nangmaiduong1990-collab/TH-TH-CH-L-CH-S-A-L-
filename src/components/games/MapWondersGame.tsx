import React, { useState } from 'react';

interface LandmarkItem {
  id: string;
  name: string;
  emoji: string;
  clue: string;
  correctContinent: string; // 'Châu Á' | 'Châu Âu' | 'Châu Phi' | 'Châu Mỹ' | 'Châu Đại Dương'
}

const LANDMARKS: LandmarkItem[] = [
  { id: '1', name: 'Sông Amazon', emoji: '🌊', clue: 'Dòng sông có lưu lượng nước lớn nhất hành tinh, bao bọc bởi lá phổi xanh khổng lồ.', correctContinent: 'Châu Mỹ' },
  { id: '2', name: 'Đỉnh Everest', emoji: '🏔️', clue: 'Nóc nhà thế giới nằm trên dãy Himalaya hùng vĩ.', correctContinent: 'Châu Á' },
  { id: '3', name: 'Tháp Eiffel', emoji: '🗼', clue: 'Kỳ quan thép cao lớn đặt tại thủ đô Paris, biểu tượng lãng mạn.', correctContinent: 'Châu Âu' },
  { id: '4', name: 'Kim Tự Tháp Giza', emoji: '📐', clue: 'Công trình kiến trúc cổ đại nằm bên bờ sông Nin nóng bỏng.', correctContinent: 'Châu Phi' },
  { id: '5', name: 'Rạn san hô Great Barrier', emoji: '🪸', clue: 'Hệ thống rạn san hô lớn nhất thế giới nhìn thấy được từ không gian.', correctContinent: 'Châu Đại Dương' }
];

const CONTINENTS = ['Châu Á', 'Châu Âu', 'Châu Phi', 'Châu Mỹ', 'Châu Đại Dương'];

export default function MapWondersGame({ onComplete }: { onComplete?: (score: number) => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedConf, setSelectedConf] = useState<string | null>(null);

  const handleSelectContinent = (continent: string) => {
    if (showResults) return;
    const currentItem = LANDMARKS[currentIdx];
    setAnswers(prev => ({ ...prev, [currentItem.id]: continent }));
    setSelectedConf(continent);

    // Auto proceed to next after small delay
    setTimeout(() => {
      setSelectedConf(null);
      if (currentIdx < LANDMARKS.length - 1) {
        setCurrentIdx(prev => prev + 1);
      } else {
        setShowResults(true);
      }
    }, 400);
  };

  const calculateScore = () => {
    let correct = 0;
    LANDMARKS.forEach(item => {
      if (answers[item.id] === item.correctContinent) {
        correct++;
      }
    });
    const finalScore = Math.round((correct / LANDMARKS.length) * 100);
    return { correct, finalScore };
  };

  const resetGame = () => {
    setAnswers({});
    setCurrentIdx(0);
    setShowResults(false);
    setSelectedConf(null);
  };

  const { correct, finalScore } = showResults ? calculateScore() : { correct: 0, finalScore: 0 };

  return (
    <div className="space-y-6" id="g7-map-root">
      <div className="text-center space-y-2">
        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-full font-display">MODULAR GAME • KHỐI 7</span>
        <h3 className="font-extrabold text-lg text-slate-900 font-display">🗺️ Bản đồ địa lý bí ẩn</h3>
        <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
          Nhiệm vụ của bạn: Hãy phân tích gợi ý về địa danh và ghép nó vào đúng <span className="text-emerald-600 font-black">Châu lục</span> tương ứng trên bản đồ địa cầu!
        </p>
      </div>

      {!showResults ? (
        <div className="max-w-xl mx-auto space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
          {/* Landmark Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/65 shadow-sm text-center space-y-4 animate-fadeIn">
            <span className="text-4xl block leading-none">{LANDMARKS[currentIdx].emoji}</span>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">MỤC TIÊU {currentIdx + 1} / {LANDMARKS.length}</span>
              <h4 className="font-black text-slate-900 text-base">{LANDMARKS[currentIdx].name}</h4>
            </div>
            <p className="text-xs text-slate-500 font-medium italic leading-relaxed bg-slate-50 p-3 rounded-lg border border-dashed border-slate-200">
              🔍 Gợi ý: "{LANDMARKS[currentIdx].clue}"
            </p>
          </div>

          {/* Continents Board */}
          <div className="space-y-2 text-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">CHỌN CHÂU LỤC HOÀN CHỈNH BẢN ĐỒ</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CONTINENTS.map(cont => {
                const isSelected = selectedConf === cont || answers[LANDMARKS[currentIdx].id] === cont;
                return (
                  <button
                    key={cont}
                    type="button"
                    onClick={() => handleSelectContinent(cont)}
                    className={`p-3 text-xs font-black rounded-xl border transition-all active:scale-95 cursor-pointer ${
                      isSelected 
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-100'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 shadow-sm'
                    }`}
                  >
                    {cont}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mini progress dot bar */}
          <div className="flex items-center justify-center gap-1.5 pt-2">
            {LANDMARKS.map((item, idx) => (
              <span
                key={item.id}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIdx
                    ? 'w-6 bg-emerald-500'
                    : idx < currentIdx
                    ? 'w-2 bg-emerald-300'
                    : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 text-center animate-fadeIn">
          <div className="space-y-2">
            <span className="text-4xl">👑</span>
            <h4 className="font-black text-slate-900 text-sm sm:text-base uppercase tracking-tight">KẾT QUẢ KHẢO SÁT CHÂU LỤC</h4>
            <div className="font-display font-black text-4xl text-emerald-600">{finalScore}%</div>
            <p className="text-xs text-slate-500 leading-normal font-medium">
              Bạn đã định vị chính xác <span className="font-black text-slate-800">{correct} / {LANDMARKS.length}</span> kỳ quan địa lý học phần lớp 7!
            </p>
          </div>

          <div className="space-y-2 text-left bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">CHI TIẾT ĐỊA DANH</span>
            {LANDMARKS.map(item => {
              const isCorrect = answers[item.id] === item.correctContinent;
              return (
                <div key={item.id} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-200/50 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <span>{item.emoji}</span>
                    <span className="font-bold text-slate-800">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px]">
                    <span className="text-slate-400">Đáp án: {item.correctContinent}</span>
                    <span className={`px-2 py-0.5 rounded font-black uppercase text-[9px] ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {isCorrect ? 'ĐÚNG' : 'SAI'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={resetGame}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-emerald-150 cursor-pointer active:scale-95"
            >
              🔄 Trở về vạch xuất phát
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
