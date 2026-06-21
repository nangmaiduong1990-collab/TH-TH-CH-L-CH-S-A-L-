import React, { useState } from 'react';

interface EventItem {
  id: string;
  year: string;
  title: string;
  description: string;
  rank: number; // For sorting
}

const HISTORICAL_EVENTS: EventItem[] = [
  { id: '1', year: 'Khoảng 3000 TCN', title: 'Nền văn minh Ai Cập cổ đại hình thành', description: 'Gắn liền với dòng sông Nin kỳ vĩ và những kỳ quan Kim Tự Tháp đồ sộ.', rank: 1 },
  { id: '2', year: 'Khoảng 2000 TCN', title: 'Nền văn minh Lưỡng Hà rực rỡ', description: 'Nổi bật với bộ luật cổ xưa nhất loài người Hammurabi và vườn treo Babylon.', rank: 2 },
  { id: '3', year: 'Thế kỷ VII TCN', title: 'Sự xuất hiện của Nhà nước Văn Lang', description: 'Nhà nước đầu tiên của người Việt cổ dưới sự trị vì của các vị vua Hùng.', rank: 3 },
  { id: '4', year: 'Thế kỷ III TCN', title: 'Nhà nước Âu Lạc thành lập', description: 'Vua An Dương Vương xây dựng thành Cổ Loa kiên cố đầu tiên chống giặc ngoại xâm.', rank: 4 },
  { id: '5', year: 'Năm 938 SCN', title: 'Chiến thắng Bạch Đằng của Ngô Quyền', description: 'Đập tan quân Nam Hán dưới lòng sông cắm cọc nhọn, chấm dứt 1000 năm Bắc thuộc.', rank: 5 }
];

export default function TimelineGame({ onComplete }: { onComplete?: (score: number) => void }) {
  const [items, setItems] = useState<EventItem[]>(
    [...HISTORICAL_EVENTS].sort(() => Math.random() - 0.5)
  );
  const [hasChecked, setHasChecked] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (hasChecked) return;
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < items.length) {
      const temp = newItems[index];
      newItems[index] = newItems[targetIndex];
      newItems[targetIndex] = temp;
      setItems(newItems);
    }
  };

  const checkAnswer = () => {
    let correctCount = 0;
    items.forEach((item, index) => {
      // Find the expected rank. Since we sorted HISTORICAL_EVENTS by rank asc,
      // the index in sorted correct list is rank - 1.
      if (item.rank === index + 1) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / items.length) * 100);
    setScore(finalScore);
    setHasChecked(true);
    if (onComplete) onComplete(finalScore);
  };

  const resetGame = () => {
    setItems([...HISTORICAL_EVENTS].sort(() => Math.random() - 0.5));
    setHasChecked(false);
    setScore(null);
  };

  return (
    <div className="space-y-6" id="g6-timeline-root">
      <div className="text-center space-y-2">
        <span className="bg-orange-100 text-orange-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-full font-display">MODULAR GAME • KHỐI 6</span>
        <h3 className="font-extrabold text-lg text-slate-900 font-display">⏳ Sắp xếp dòng lịch sử</h3>
        <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
          Nhiệm vụ của bạn: Hãy nhấn nút <span className="font-black">▲</span> (Lên) hoặc <span className="font-black">▼</span> (Xuống) để sắp xếp các sự kiện lịch sử theo trình tự thời gian từ <span className="text-orange-600 font-black">Cổ xưa đến Hiện đại</span>!
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-3">
        {items.map((item, index) => {
          const isCorrectPos = hasChecked && item.rank === index + 1;
          const isWrongPos = hasChecked && item.rank !== index + 1;
          
          return (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                isCorrectPos 
                  ? 'bg-emerald-50/70 border-emerald-400/50 shadow-sm shadow-emerald-50'
                  : isWrongPos
                  ? 'bg-rose-50/70 border-rose-300/50 shadow-sm shadow-rose-50'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="flex flex-col gap-1 shrink-0">
                <button
                  type="button"
                  disabled={index === 0 || hasChecked}
                  onClick={() => moveItem(index, 'up')}
                  className={`p-1.5 rounded-lg border transition-all flex items-center justify-center ${
                    index === 0 || hasChecked
                      ? 'text-slate-300 border-slate-100 cursor-not-allowed bg-slate-50'
                      : 'text-indigo-600 border-indigo-200 hover:bg-indigo-50 active:scale-95'
                  }`}
                >
                  <span className="text-xs font-bold leading-none">▲</span>
                </button>
                <button
                  type="button"
                  disabled={index === items.length - 1 || hasChecked}
                  onClick={() => moveItem(index, 'down')}
                  className={`p-1.5 rounded-lg border transition-all flex items-center justify-center ${
                    index === items.length - 1 || hasChecked
                      ? 'text-slate-300 border-slate-100 cursor-not-allowed bg-slate-50'
                      : 'text-indigo-600 border-indigo-200 hover:bg-indigo-50 active:scale-95'
                  }`}
                >
                  <span className="text-xs font-bold leading-none">▼</span>
                </button>
              </div>

              <div className="flex-1 text-left space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase font-mono ${
                    isCorrectPos ? 'bg-emerald-100 text-emerald-800' : isWrongPos ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {item.year}
                  </span>
                  {hasChecked && (
                    <span className={`text-[10px] font-black uppercase ${isCorrectPos ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {isCorrectPos ? '✓ Đúng kỳ' : `✗ Kỳ đúng: Vị trí thứ ${item.rank}`}
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">{item.title}</h4>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{item.description}</p>
              </div>

              <div className="shrink-0 font-display font-black text-slate-300 text-2xl px-2">
                #{index + 1}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-4">
        {score !== null && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1 max-w-sm w-full">
            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">KẾT QUẢ ĐẠT ĐƯỢC</span>
            <div className="font-display font-black text-3xl text-indigo-600">
              {score}% SỰ KIỆN ĐÚNG
            </div>
            <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
              {score === 100 
                ? '🏆 Thần thoại thời gian! Bạn đã sắp xếp dòng lịch sử chính xác tuyệt đối!' 
                : score >= 60 
                ? '👏 Rất đáng khen! Bạn đã hiểu khá rõ các sự kiện lịch sử học kỳ khối 6!' 
                : '💡 Hãy thử lại lần nữa để ghi nhớ chính xác thứ tự các nền văn minh cổ đại nhé!'}
            </p>
          </div>
        )}

        <div className="flex items-center gap-3">
          {!hasChecked ? (
            <button
              type="button"
              onClick={checkAnswer}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-indigo-100 cursor-pointer active:scale-95"
            >
              🎯 Kiểm tra thứ tự
            </button>
          ) : (
            <button
              type="button"
              onClick={resetGame}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer active:scale-95"
            >
              🔄 Trộn lại & Chơi tiếp
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
