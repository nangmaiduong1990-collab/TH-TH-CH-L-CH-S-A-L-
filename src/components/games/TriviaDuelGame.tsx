import React, { useState, useEffect, useRef } from 'react';

interface Question {
  text: string;
  options: string[];
  correct: number;
  grade: string;
  subject: string;
}

const TRIVIA_QUESTIONS: Question[] = [
  { text: 'Xã hội cổ đại phương Đông hình thành chủ yếu bên cạnh các lưu vực sông lớn nào?', options: ['Sông Nin, sông Hằng, sông Trường Giang, sông Ấn', 'Sông Đồng Nai, sông Tiền, sông Hậu', 'Sông Amazon, sông Congo', 'Sông Danube, sông Volga'], correct: 0, grade: '6', subject: 'Lịch sử' },
  { text: 'Thời tiết chuyển biến rét đậm kèm tuyết mùa đông ở miền Bắc nước ta chịu tác động mạnh nhất của:', options: ['Gió mùa Đông Bắc xâm nhập sâu theo từng đợt', 'Dòng biển nóng hoạt động phía Đông quần đảo Hoàng Sa', 'Khối áp thấp ôn đới hoạt động quanh bán đảo Indochina', 'Mưa bão áp thấp lùi dần về phía Tây kinh tuyến'], correct: 0, grade: '9', subject: 'Địa lí' },
  { text: 'Trận địa cắm cọc Bạch Đằng nổi danh được áp dụng chiến thuật thành công bởi những anh hùng nào?', options: ['Ngô Quyền, Lê Hoàn, Trần Hưng Đạo', 'Lý Nam Đế, Triệu Quang Phục, Mai Hắc Đế', 'Đinh Bộ Lĩnh, Lê Đại Hành, Lý Thái Tổ', 'Nguyễn Huệ, Quang Trung, Lê Lợi'], correct: 0, grade: '7', subject: 'Lịch sử' },
  { text: 'Dãy núi cao nhất Việt Nam cũng như toàn cõi Đông Dương có tên là gì?', options: ['Fansipan thuộc dãy Hoàng Liên Sơn', 'Tây Côn Lĩnh thuộc vùng Đông Bắc', 'Mẫu Sơn thuộc địa phận tỉnh Lạng Sơn', 'Ngọc Linh thuộc dải Trường Sơn Nam'], correct: 0, grade: '8', subject: 'Địa lí' },
  { text: 'Phần đất liền nước ta kéo dài từ vĩ độ Bắc nào tới vĩ độ Bắc nào quanh bán đảo?', options: ['8 độ 34’ B đến 23 độ 23’ B', '5 độ 30’ B đến 20 độ 10’ B', '1 độ 15’ B đến 15 độ 45’ B', '10 độ 20’ B đến 30 độ 00’ B'], correct: 0, grade: '9', subject: 'Địa lí' }
];

export default function TriviaDuelGame({ onComplete }: { onComplete?: (score: number) => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [streak, setStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQ = TRIVIA_QUESTIONS[currentIdx];

  useEffect(() => {
    if (gameOver || confirmed) return;

    if (timeLeft <= 0) {
      handleTimeOut();
      return;
    }

    timerRef.current = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, gameOver, confirmed]);

  const handleTimeOut = () => {
    setConfirmed(true);
    setStreak(0);
    // Proceed to next question automatically after 2s
    nextStep();
  };

  const nextStep = () => {
    setTimeout(() => {
      setSelectedOpt(null);
      setConfirmed(false);
      setTimeLeft(15);
      if (currentIdx < TRIVIA_QUESTIONS.length - 1) {
        setCurrentIdx(prev => prev + 1);
      } else {
        setGameOver(true);
        if (onComplete) onComplete(score);
      }
    }, 1500);
  };

  const handleAnswerSelect = (idx: number) => {
    if (confirmed) return;
    setSelectedOpt(idx);
    setConfirmed(true);

    if (idx === currentQ.correct) {
      const bonus = streak * 5;
      setScore(prev => prev + 20 + bonus);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    nextStep();
  };

  const resetGame = () => {
    setCurrentIdx(0);
    setScore(0);
    setTimeLeft(15);
    setStreak(0);
    setGameOver(false);
    setSelectedOpt(null);
    setConfirmed(false);
  };

  return (
    <div className="space-y-6" id="g-trivia-root">
      <div className="text-center space-y-2">
        <span className="bg-indigo-150 text-indigo-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-full font-display">MODULAR GAME • LIÊN KHỐI 6ĐẾN9</span>
        <h3 className="font-extrabold text-lg text-slate-900 font-display">⚡ Đấu trường trí tuệ tốc độ</h3>
        <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
          Nhiệm vụ của bạn: Hãy trả lời nhanh bộ đề ngẫu nhiên liên kết Lịch sử Địa lý phong phú. Nhấp đáp án đúng càng nhanh và <span className="text-indigo-600 font-black">giữ chuỗi liên tiếp (streak)</span> để bội nhân số điểm của bạn!
        </p>
      </div>

      {!gameOver ? (
        <div className="max-w-xl mx-auto space-y-5 bg-slate-50 p-6 rounded-2xl border border-slate-100">
          
          {/* Header Stats bar */}
          <div className="flex items-center justify-between text-xs font-black uppercase border-b border-slate-200 pb-3">
            <div className="flex items-center gap-1.5 text-slate-500">
              <span>CÂU {currentIdx + 1} / {TRIVIA_QUESTIONS.length}</span>
              <span className="bg-indigo-50 text-indigo-700 text-[9px] px-2 py-0.5 rounded font-mono">
                KHỐI {currentQ.grade} • {currentQ.subject}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-amber-600">🔥 STREAK: {streak}</span>
              <span className={`px-2.5 py-1 rounded-lg text-white font-mono ${timeLeft > 5 ? 'bg-slate-900' : 'bg-rose-600 animate-pulse'}`}>
                ⏱️ {timeLeft}s
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-150 shadow-sm text-left">
            <h4 className="font-black text-slate-900 text-sm sm:text-base leading-snug">
              {currentQ.text}
            </h4>
          </div>

          <div className="space-y-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOpt === idx;
              const isCorrect = idx === currentQ.correct;
              const isWrong = isSelected && !isCorrect;

              let btnType = 'bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100/60 border-slate-200';
              if (confirmed) {
                if (isCorrect) btnType = 'bg-emerald-500 border-emerald-500 text-white font-black';
                else if (isWrong) btnType = 'bg-rose-500 border-rose-500 text-white font-semibold';
                else btnType = 'bg-slate-100 text-slate-400 border-slate-100 cursor-not-allowed';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={confirmed}
                  onClick={() => handleAnswerSelect(idx)}
                  className={`w-full p-3 text-xs text-left rounded-xl border transition-all active:scale-98 flex items-start gap-2.5 cursor-pointer ${btnType}`}
                >
                  <span className={`w-5 h-5 shrink-0 rounded-lg font-mono font-black text-[10px] flex items-center justify-center border ${
                    confirmed ? 'bg-white/20 border-white/10' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1">{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="text-right font-display font-black text-slate-800 text-sm">
            🏆 SCORE: {score} Pts
          </div>

        </div>
      ) : (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5 text-center animate-fadeIn font-display">
          <div className="space-y-1.5 animate-bounce">
            <span className="text-4xl text-center block">👑🏆🎉</span>
            <h4 className="font-black text-slate-900 text-sm sm:text-base uppercase tracking-tight">KẾT THÚC ĐẤU TRƯỜNG TỐC ĐỘ</h4>
            <div className="font-display font-black text-5xl text-indigo-600">{score} Điểm</div>
            <p className="text-xs text-slate-500 font-sans leading-normal font-medium leading-relaxed">
              Quá đỉnh cao! Bạn đã hoàn thành trọn vẹn đấu trường thi đấu kiến thức Lịch sử Địa lý tổng hợp lớp 6-7-8-9 xuất sắc!
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 font-sans">
            <button
              type="button"
              onClick={resetGame}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-indigo-150 cursor-pointer active:scale-95"
            >
              🔄 Chiến tiếp vòng tiếp theo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
