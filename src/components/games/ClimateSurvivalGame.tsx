import React, { useState } from 'react';

interface Question {
  id: string;
  region: string;
  text: string;
  options: string[];
  correct: number;
  explanation: string;
}

const SURVIVAL_QUESTIONS: Question[] = [
  {
    id: 's1',
    region: 'Khởi đầu: Trung du miền núi Bắc Bộ',
    text: 'Thế mạnh nổi bật nhất về tài nguyên khoáng sản của vùng Trung du và miền núi Bắc Bộ là gì?',
    options: [
      'Khoáng sản năng lượng (Than đá Quảng Ninh, Thủy điện dồi dào)',
      'Khoáng sản kim loại quý hiếm (Vàng, Bạch kim)',
      'Dầu mỏ và khí đốt tự nhiên quy mô thế giới',
      'Đất hiếm và các loại đá quý chịu nhiệt cao'
    ],
    correct: 0,
    explanation: 'Trung du miền núi Bắc Bộ là vùng giàu tài nguyên than đá bậc nhất cả nước (tập trung ở Quảng Ninh) và có tiềm năng thủy điện cực lớn trên hệ thống sông Hồng, sông Đà.'
  },
  {
    id: 's2',
    region: 'Trạm dừng 2: Đồng bằng sông Hồng',
    text: 'Đồng bằng sông Hồng có mật độ dân số cao nhất cả nước chủ yếu là do:',
    options: [
      'Đất đai màu mỡ bồi đắp bởi Sông Hồng & Lịch sử khai phá lãnh thổ lâu đời nhất',
      'Có nhiều dầu mỏ khí đốt tự nhiên ngoài khơi vịnh Bắc Bộ',
      'Địa hình đồi núi dốc tạo thuận lợi sản xuất lúa rẫy',
      'Khí hậu cận xích đạo nóng quanh năm phù hợp trồng cây công nghiệp ngọt'
    ],
    correct: 0,
    explanation: 'Đồng bằng sông Hồng có lịch sử định cư lâu đời gắn liền với nền văn minh lúa nước sông Hồng và đất phù sa phì nhiêu nên có mật độ dân cư đông đúc nhất.'
  },
  {
    id: 's3',
    region: 'Trạm dừng 3: Duyên hải miền Trung',
    text: 'Hiện tượng gió Tây Nam thổi qua dãy Trường Sơn gây ra kiểu thời tiết cực đoan nào cho vùng Bắc Trung Bộ vào mùa hè?',
    options: [
      'Gió phơn (gió Lào) khô nóng gay gắt',
      'Mưa phùn lạnh ẩm kéo dài nhiều tuần',
      'Sương muối và tuyết rơi đóng băng cây cối',
      'Mưa bão xích đạo kèm theo triều cường dâng cao'
    ],
    correct: 0,
    explanation: 'Gió mùa Tây Nam khi vượt qua dãy Trường Sơn bị biến tính trở nên khô nóng cực kỳ, gọi là hiệu ứng gió phơn Tây Nam hay gió Lào khô nóng.'
  },
  {
    id: 's4',
    region: 'Trạm dừng 4: Tây Nguyên lâm sản',
    text: 'Loại đất đặc trưng chiếm diện tích lớn nhất ở Tây Nguyên thích hợp trồng cây công nghiệp dài ngày (cà phê, hồ tiêu) là:',
    options: [
      'Đất feralit đỏ bazan trên đá phun trào núi lửa cổ',
      'Đất phù sa sông ngọt màu mỡ sông Me Kong',
      'Đất phèn và đất mặn ngập nước ven biển',
      'Đất bồi tụ cát biển nghèo dinh dưỡng'
    ],
    correct: 0,
    explanation: 'Tây Nguyên sở hữu lớp đất feralit màu mỡ phát triển từ đá bazan cực tốt cho việc sinh trưởng của cà phê, hồ tiêu, cao su.'
  },
  {
    id: 's5',
    region: 'Cổng đích: Đồng bằng sông Cửu Long',
    text: 'Khó khăn lớn nhất về mặt tự nhiên vào mùa khô ở Đồng bằng sông Cửu Long hiện nay là gì?',
    options: [
      'Sự xâm nhập mặn sâu vào đất liền và thiếu nước ngọt trầm trọng',
      'Động đất kèm theo phun trào bùn khoáng nóng',
      'Lũ quét sạt lở đá từ các vùng đồi núi cao dốc',
      'Rét đậm rét hại kèm theo sương muối phá hoại hoa màu'
    ],
    correct: 0,
    explanation: 'Mùa khô kéo dài khiến lưu lượng nước sông Mê Kông sụt giảm, gây ra xâm nhập mặn sâu vào nội đồng, thiếu nước ngọt sinh hoạt và tưới tiêu trầm trọng.'
  }
];

export default function ClimateSurvivalGame({ onComplete }: { onComplete?: (score: number) => void }) {
  const [stage, setStage] = useState(0); // 0 to 4
  const [health, setHealth] = useState(100); // 100 to 0
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);

  const currentQ = SURVIVAL_QUESTIONS[stage];

  const handleAnswer = (optionIdx: number) => {
    if (submitted || gameOver) return;
    setSelectedOpt(optionIdx);
  };

  const handleConfirm = () => {
    if (selectedOpt === null || submitted) return;
    setSubmitted(true);

    const isCorrect = selectedOpt === currentQ.correct;
    if (!isCorrect) {
      setHealth(prev => {
        const nextH = Math.max(0, prev - 30);
        if (nextH <= 0) {
          setGameOver(true);
        }
        return nextH;
      });
    }

    // Give some reaction delay
    setTimeout(() => {
      // If we survived and hit the end
      if (stage === SURVIVAL_QUESTIONS.length - 1 && isCorrect) {
        setVictory(true);
        if (onComplete) onComplete(health);
      }
    }, 1500);
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setSubmitted(false);
    if (stage < SURVIVAL_QUESTIONS.length - 1) {
      setStage(prev => prev + 1);
    }
  };

  const resetGame = () => {
    setStage(0);
    setHealth(100);
    setSelectedOpt(null);
    setSubmitted(false);
    setGameOver(false);
    setVictory(false);
  };

  return (
    <div className="space-y-6" id="g9-survival-root">
      <div className="text-center space-y-2">
        <span className="bg-rose-100 text-rose-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-full font-display">MODULAR GAME • KHỐI 9</span>
        <h3 className="font-extrabold text-lg text-slate-900 font-display">⛵ Chinh phục địa lý Việt Nam</h3>
        <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
          Nhiệm vụ của bạn: Hãy đưa đoàn thám hiểm vượt qua 5 vùng địa lý hiểm trở của Tổ Quốc bằng cách trả lời đúng các câu hỏi khí hậu và tài nguyên. Trả lời sai bạn sẽ mất <span className="text-rose-600 font-black">30% Thể Lực</span>!
        </p>
      </div>

      {/* Survival status panel */}
      <div className="max-w-xl mx-auto bg-slate-950 p-4 rounded-2xl text-white flex items-center justify-between shadow-lg border border-slate-800">
        <div className="text-left space-y-0.5">
          <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">CHẶNG ĐƯỜNG</span>
          <div className="font-display font-black text-xs sm:text-sm text-yellow-400">
            📍 {currentQ.region}
          </div>
        </div>
        <div className="text-right space-y-1 shrink-0">
          <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">THỂ LỰC ĐOÀN</span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black">{health}%</span>
            <div className="w-16 sm:w-24 bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
              <div 
                className={`h-full transition-all ${health > 40 ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`}
                style={{ width: `${health}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {!gameOver && !victory ? (
        <div className="max-w-xl mx-auto space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-left">
          
          <div className="space-y-2">
            <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">THỬ THÁCH VÙNG MIỀN ({stage + 1} / 5)</span>
            <h4 className="font-black text-slate-900 text-sm sm:text-base leading-snug">
              {currentQ.text}
            </h4>
          </div>

          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOpt === idx;
              const isCorrect = idx === currentQ.correct;
              const isWrong = isSelected && !isCorrect;

              let btnStyle = 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50';
              if (isSelected) btnStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold';
              if (submitted) {
                if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-inner';
                else if (isWrong) btnStyle = 'border-rose-550 bg-rose-50 text-rose-900 font-semibold';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={submitted}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full p-3.5 text-xs text-left rounded-xl border transition-all active:scale-98 flex items-start gap-2.5 relative cursor-pointer ${btnStyle}`}
                >
                  <span className="w-5 h-5 shrink-0 rounded-lg bg-slate-100 font-mono font-black text-[10px] flex items-center justify-center border border-slate-200">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1">{opt}</span>
                </button>
              );
            })}
          </div>

          {submitted && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-150 text-xs text-slate-600 leading-relaxed font-semibold animate-fadeIn">
              <span className={`block font-black uppercase text-[10px] mb-1 ${selectedOpt === currentQ.correct ? 'text-emerald-600' : 'text-rose-600'}`}>
                {selectedOpt === currentQ.correct ? '✓ VƯỢT TRẠM AN TOÀN!' : '✗ ĐOÀN BỊ SUY GIẢM THỂ LỰC!'}
              </span>
              {currentQ.explanation}
            </div>
          )}

          <div className="flex justify-end pt-2 border-t border-slate-100">
            {selectedOpt !== null && !submitted && (
              <button
                type="button"
                onClick={handleConfirm}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-indigo-100 cursor-pointer active:scale-95"
              >
                🏁 Xác nhận vượt trạm
              </button>
            )}
            {submitted && health > 0 && stage < SURVIVAL_QUESTIONS.length - 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-950 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer active:scale-95 animate-fadeIn"
              >
                Tiến về trạm kế tiếp ➔
              </button>
            )}
          </div>

        </div>
      ) : gameOver ? (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl border border-rose-200/80 shadow-sm space-y-6 text-center animate-fadeIn">
          <div className="space-y-2">
            <span className="text-4xl">💀</span>
            <h4 className="font-black text-rose-600 text-sm sm:text-base uppercase tracking-tight">ĐOÀN THÁM HIỂM KIỆT SỨC</h4>
            <p className="text-xs text-slate-500 leading-normal font-medium">
              Bạn đã va phải quá nhiều khí hậu khắc nghiệt và thiếu kiến thức trầm trọng về tự nhiên nước nhà. Hãy ôn luyện và sẵn sàng thử thách lại cuộc hành trình quý giá này!
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={resetGame}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-rose-150 cursor-pointer active:scale-95"
            >
              🔄 Chuẩn bị lại đoàn đội
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl border border-emerald-200/85 shadow-sm space-y-6 text-center animate-fadeIn font-display">
          <div className="space-y-2">
            <span className="text-4xl">🌊🏆⛵</span>
            <h4 className="font-black text-emerald-700 text-sm sm:text-base uppercase tracking-tight">CHINH PHỤC CÕI BỜ THÀNH CÔNG</h4>
            <div className="font-display font-black text-4xl text-emerald-600">THỂ LỰC CÒN {health}%</div>
            <p className="text-xs text-slate-500 leading-normal font-semibold">
              Chúc mừng bạn đã cập bến sông sâu đất ngọt Tây Nam Bộ bình an vô sự! Kiến thức lịch trình Lịch sử và Địa lý lớp 9 của bạn cực kỳ sắt đá!
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 font-sans">
            <button
              type="button"
              onClick={resetGame}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-emerald-150 cursor-pointer active:scale-95"
            >
              🔄 Trở về Bắc Bộ chơi tiếp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
