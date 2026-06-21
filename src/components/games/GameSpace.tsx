import React, { useState, useEffect } from 'react';
import { Gamepad2, Plus, Edit2, Trash2, ArrowLeft, Lightbulb, Play, BookOpen, Clock, Award, Star, Settings, CheckCircle2, AlertCircle } from 'lucide-react';
import TimelineGame from './TimelineGame';
import MapWondersGame from './MapWondersGame';
import RelicMatchGame from './RelicMatchGame';
import ClimateSurvivalGame from './ClimateSurvivalGame';
import TriviaDuelGame from './TriviaDuelGame';

interface CustomQuestion {
  id: string;
  text: string;
  options: string[];
  correct: number;
}

interface GameItem {
  id: string;
  code: string;
  title: string;
  description: string;
  grade: string;
  subject: string;
  moduleId: string; // 'TimelineGame' | 'MapWondersGame' | 'RelicMatchGame' | 'ClimateSurvivalGame' | 'TriviaDuelGame' | 'Custom'
  isSystem?: boolean;
  customQuestions?: CustomQuestion[];
  createdAt: string;
}

export default function GameSpace({
  isAdminLoggedIn,
  showToast
}: {
  isAdminLoggedIn: boolean;
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}) {
  const [games, setGames] = useState<GameItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  
  // Admin form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<GameItem | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formGrade, setFormGrade] = useState('6');
  const [formSubject, setFormSubject] = useState('Lịch sử');
  const [formQuestions, setFormQuestions] = useState<CustomQuestion[]>([
    { id: 'q_1', text: '', options: ['', '', '', ''], correct: 0 }
  ]);

  // Loading games list
  const fetchGames = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/games');
      if (res.ok) {
        const data = await res.json();
        setGames(data);
      } else {
        showToast('❌ Không thể tải danh sách trò chơi!', 'error');
      }
    } catch (e) {
      console.error(e);
      showToast('❌ Lỗi kết nối máy chủ!', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleOpenCreateForm = () => {
    setEditingGame(null);
    setFormTitle('');
    setFormDesc('');
    setFormGrade('6');
    setFormSubject('Lịch sử');
    setFormQuestions([{ id: 'q_1', text: '', options: ['', '', '', ''], correct: 0 }]);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (game: GameItem) => {
    setEditingGame(game);
    setFormTitle(game.title);
    setFormDesc(game.description);
    setFormGrade(game.grade);
    setFormSubject(game.subject);
    if (game.customQuestions && game.customQuestions.length > 0) {
      setFormQuestions(game.customQuestions);
    } else {
      setFormQuestions([{ id: 'q_1', text: '', options: ['', '', '', ''], correct: 0 }]);
    }
    setIsFormOpen(true);
  };

  const handleAddQuestionField = () => {
    setFormQuestions(prev => [
      ...prev,
      { id: 'q_' + (prev.length + 1) + '_' + Date.now(), text: '', options: ['', '', '', ''], correct: 0 }
    ]);
  };

  const handleRemoveQuestionField = (idx: number) => {
    if (formQuestions.length <= 1) return;
    setFormQuestions(prev => prev.filter((_, i) => i !== idx));
  };

  const handleQuestionChange = (idx: number, field: string, value: any) => {
    const list = [...formQuestions];
    if (field === 'text') {
      list[idx].text = value;
    } else if (field === 'correct') {
      list[idx].correct = parseInt(value, 10);
    }
    setFormQuestions(list);
  };

  const handleOptionChange = (qIdx: number, optIdx: number, value: string) => {
    const list = [...formQuestions];
    list[qIdx].options[optIdx] = value;
    setFormQuestions(list);
  };

  // Submit create or edit form
  const handleSubmitGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDesc.trim()) {
      showToast('⚠️ Vui lòng điền đầy đủ tiêu đề và mô tả trò chơi!', 'info');
      return;
    }

    // Validate questions
    for (let i = 0; i < formQuestions.length; i++) {
      const q = formQuestions[i];
      if (!q.text.trim()) {
        showToast(`⚠️ Câu hỏi số ${i + 1} trống nội dung!`, 'info');
        return;
      }
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          showToast(`⚠️ Câu hỏi số ${i + 1} có đáp án ${String.fromCharCode(65 + j)} bỏ trống!`, 'info');
          return;
        }
      }
    }

    const payload: Partial<GameItem> = {
      id: editingGame ? editingGame.id : undefined,
      code: editingGame ? editingGame.code : 'GAME_CUSTOM_' + Date.now(),
      title: formTitle,
      description: formDesc,
      grade: formGrade,
      subject: formSubject,
      moduleId: 'Custom',
      isSystem: false,
      customQuestions: formQuestions,
    };

    try {
      const res = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showToast(editingGame ? '🎉 Cập nhật trò chơi học thuật thành công!' : '🎉 Đăng tải trò chơi học thuật mới thành công!', 'success');
        setIsFormOpen(false);
        fetchGames();
      } else {
        showToast('❌ Gặp lỗi khi lưu trữ trò chơi lên hệ thống!', 'error');
      }
    } catch (e) {
      console.error(e);
      showToast('❌ Lỗi kết nối!', 'error');
    }
  };

  const handleDeleteGame = async (gameId: string) => {
    if (!window.confirm('⚠️ Bạn có chắc chắn muốn xóa trò chơi học thuật này không?')) return;
    try {
      const res = await fetch(`/api/games/${gameId}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('🗑️ Đã xóa trò chơi thành công khỏi hệ thống!', 'success');
        fetchGames();
      } else {
        showToast(data.message || '❌ Lỗi xóa trò chơi!', 'error');
      }
    } catch (e) {
      console.error(e);
      showToast('❌ Lỗi kết nối mạng!', 'error');
    }
  };

  // Render appropriate game module
  const renderGamePlayer = () => {
    if (!selectedGame) return null;

    switch (selectedGame.moduleId) {
      case 'TimelineGame':
        return <TimelineGame onComplete={(score) => showToast(`Chúc mừng bạn hoàn thành dòng lịch sử với ${score}% câu trả lời đúng!`, 'success')} />;
      case 'MapWondersGame':
        return <MapWondersGame onComplete={(score) => showToast(`Bạn đã hoàn thành khám phá bản đồ địa chất với ${score}% điểm!`, 'success')} />;
      case 'RelicMatchGame':
        return <RelicMatchGame onComplete={(score) => showToast(`Bình an đột phá! Giải mã di sản thành công!`, 'success')} />;
      case 'ClimateSurvivalGame':
        return <ClimateSurvivalGame onComplete={(score) => showToast(`Đoàn lữ hành cập bến thành công! Điểm thể lực: ${score}`, 'success')} />;
      case 'TriviaDuelGame':
        return <TriviaDuelGame onComplete={(score) => showToast(`Hoàn thành đấu trường trivia với số điểm kỷ lục: ${score}!`, 'success')} />;
      case 'Custom':
        return <CustomGamePlayer game={selectedGame} onBack={() => setSelectedGame(null)} showToast={showToast} />;
      default:
        return (
          <div className="text-center p-8 bg-white rounded-2xl border border-slate-150">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h4 className="font-bold text-slate-800">Trò chơi chưa hỗ trợ</h4>
            <p className="text-xs text-slate-500">Mã module trò chơi học thuật không xác định hoặc đang phát triển.</p>
          </div>
        );
    }
  };

  // Filter games based on selection
  const filteredGames = games.filter(g => {
    if (gradeFilter === 'all') return true;
    return g.grade === gradeFilter || g.grade.includes(gradeFilter);
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-4 sm:px-6 py-4 animate-fadeIn" id="game-space-container">
      
      {/* Back to Portal/List header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          {selectedGame ? (
            <button
              onClick={() => setSelectedGame(null)}
              className="p-2 hover:bg-slate-100 text-slate-600 rounded-xl transition-all border border-slate-200 shadow-sm shrink-0"
              title="Quay lại kho trò chơi"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <div className="p-2 bg-indigo-550 text-white rounded-xl shadow-md shadow-indigo-100 shrink-0">
              <Gamepad2 className="w-6 h-6 animate-pulse" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-black text-slate-900 text-base sm:text-xl font-display uppercase tracking-tight">
                {selectedGame ? selectedGame.title : '🎮 Không gian học thuật tương tác'}
              </h2>
              <span className="bg-indigo-50 text-indigo-700 text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
                THCS GAME CENTRAL
              </span>
            </div>
            <p className="text-xs text-slate-400 font-extrabold tracking-wider uppercase mt-1">
              {selectedGame ? `PHÂN KHỐI VÙNG ĐỀ KHỐI LỚP ${selectedGame.grade}` : 'CÁC TRÒ CHƠI MIỄN PHÍ TRẬN ĐẤU GIÚP NHỚ NHANH GHI LÒNG'}
            </p>
          </div>
        </div>

        {!selectedGame && isAdminLoggedIn && (
          <button
            type="button"
            onClick={handleOpenCreateForm}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-transform active:scale-95 cursor-pointer shadow-md shadow-indigo-150 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" /> Đăng Trò Chơi Mới
          </button>
        )}
      </div>

      {/* Screen displays */}
      {selectedGame ? (
        <div className="bg-white rounded-3xl border border-slate-150 p-6 md:p-8 shadow-sm">
          {renderGamePlayer()}
          
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-black text-slate-400">THÔNG TIN ĐÍCH:</span>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                {selectedGame.subject}
              </span>
              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                Lớp {selectedGame.grade}
              </span>
            </div>
            <button
              onClick={() => setSelectedGame(null)}
              className="text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer uppercase tracking-widest"
            >
              Quay về kho trò chơi ➔
            </button>
          </div>
        </div>
      ) : loading ? (
        <div className="text-center py-12 space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Tải dữ liệu sân chơi...</p>
        </div>
      ) : isFormOpen ? (
        /* ADMIN FORM CONFIGURATION */
        <form onSubmit={handleSubmitGame} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-150 shadow-sm space-y-6 max-w-4xl mx-auto">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-extrabold text-slate-900 text-base font-display uppercase tracking-tight">
              {editingGame ? '✏️ CHỈNH SỬA TRÒ CHƠI HỌC THUẬT' : '🚀 ĐĂNG TẢI TRÒ CHƠI TƯƠNG TÁC MỚI'}
            </h3>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">Xây dựng cuộc chơi lành mạnh, rèn luyện tư duy cho các học sinh</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">Tiêu đề trò chơi</label>
              <input
                type="text"
                required
                value={formTitle}
                onChange={e => setFormTitle(e.target.value)}
                placeholder="Nhập tiêu đề học thuật, ví dụ: Chinh phục đảo Hải Tặc Châu Á"
                className="w-full text-xs font-semibold p-3 border border-slate-200 rounded-xl focus:border-indigo-500 bg-slate-50 focus:bg-white transition-all outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">Dành cho Khối</label>
                <select
                  value={formGrade}
                  onChange={e => setFormGrade(e.target.value)}
                  className="w-full text-xs font-semibold p-3 border border-slate-200 rounded-xl focus:border-indigo-500 bg-slate-50 transition-all outline-none"
                >
                  <option value="6">Khối 6</option>
                  <option value="7">Khối 7</option>
                  <option value="8">Khối 8</option>
                  <option value="9">Khối 9</option>
                  <option value="6-9">Liên Khối 6-9</option>
                </select>
              </div>
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-black uppercase text-slate-300 block tracking-wider">Môn học chủ đề</label>
                <select
                  value={formSubject}
                  onChange={e => setFormSubject(e.target.value)}
                  className="w-full text-xs font-semibold p-3 border border-slate-200 rounded-xl focus:border-indigo-500 bg-slate-50 transition-all outline-none"
                >
                  <option value="Lịch sử">Lịch sử</option>
                  <option value="Địa lí">Địa lí</option>
                  <option value="Tổng hợp">Địa lí & Lịch sử</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">Mô tả ngắn cuộc chơi</label>
            <textarea
              required
              rows={2}
              value={formDesc}
              onChange={e => setFormDesc(e.target.value)}
              placeholder="Nhập tóm tắt luật chơi và nội dung rèn luyện tại đây..."
              className="w-full text-xs font-semibold p-3 border border-slate-200 rounded-xl focus:border-indigo-500 bg-slate-50 focus:bg-white transition-all outline-none resize-none"
            />
          </div>

          {/* Question Maker Cards */}
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">THIẾT LẬP BỘ ĐỀ TRẮC NGHIỆM ({formQuestions.length} câu)</span>
              <button
                type="button"
                onClick={handleAddQuestionField}
                className="text-[10px] font-black uppercase text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Thêm câu hỏi trắc nghiệm
              </button>
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {formQuestions.map((q, qIdx) => (
                <div key={q.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-600 uppercase">Câu hỏi số {qIdx + 1}</span>
                    {formQuestions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestionField(qIdx)}
                        className="text-[10px] font-black text-rose-600 hover:text-rose-800 flex items-center gap-0.5 cursor-pointer uppercase"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Xóa câu này
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    required
                    value={q.text}
                    onChange={e => handleQuestionChange(qIdx, 'text', e.target.value)}
                    placeholder="Ví dụ: Đỉnh núi cao nhất Việt Nam là đỉnh nào?"
                    className="w-full text-xs font-bold p-2 px-3 border border-slate-200 rounded-lg bg-white outline-none"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-black text-slate-400">{String.fromCharCode(65 + oIdx)}</span>
                        <input
                          type="text"
                          required
                          value={opt}
                          onChange={e => handleOptionChange(qIdx, oIdx, e.target.value)}
                          placeholder={`Đáp án ${String.fromCharCode(65 + oIdx)}`}
                          className="flex-1 text-xs font-semibold p-2 border border-slate-200 rounded-lg bg-white outline-none"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Chúc mừng Đáp án đúng:</span>
                    <select
                      value={q.correct}
                      onChange={e => handleQuestionChange(qIdx, 'correct', e.target.value)}
                      className="text-xs font-bold p-1 bg-white border border-slate-200 rounded outline-none text-indigo-700"
                    >
                      <option value="0">Đáp án A</option>
                      <option value="1">Đáp án B</option>
                      <option value="2">Đáp án C</option>
                      <option value="3">Đáp án D</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer active:scale-95"
            >
              Hủy bỏ việc đăng
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer active:scale-95 shadow-md shadow-indigo-150"
            >
              🚀 Lưu & Đăng trò chơi
            </button>
          </div>
        </form>
      ) : (
        /* MAIN GAMES PORTFOLIO VIEW */
        <div className="space-y-6">
          {/* Grade filter fast button */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-100 ">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mr-2 shrink-0">LỌC KHỐI LỚP:</span>
            {[
              { id: 'all', label: 'TẤT CẢ TRÒ CHƠI' },
              { id: '6', label: 'KHỐI 6' },
              { id: '7', label: 'KHỐI 7' },
              { id: '8', label: 'KHỐI 8' },
              { id: '9', label: 'KHỐI 9' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setGradeFilter(tab.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-[10px] font-black transition-all cursor-pointer ${
                  gradeFilter === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid listing */}
          {filteredGames.length === 0 ? (
            <div className="text-center p-12 bg-white rounded-3xl border border-slate-150 space-y-2">
              <span className="text-3xl block">📁</span>
              <h4 className="font-extrabold text-slate-800 text-sm">Chưa có trò chơi học tập nào đăng tải</h4>
              <p className="text-xs text-slate-500">Hãy chọn lọc khối lớp khác hoặc đăng ký trò chơi học tập mới.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map(game => (
                <div
                  key={game.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4 hover:border-indigo-400 transition-all flex flex-col justify-between hover:shadow-md cursor-pointer relative group"
                >
                  {/* Decorative icon header */}
                  <div className="space-y-1.5 text-left">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                        game.subject === 'Lịch sử' ? 'bg-orange-50 text-orange-700' : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {game.subject}
                      </span>
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                        KHỐI {game.grade}
                      </span>
                    </div>

                    <h4 className="font-black text-slate-900 text-sm sm:text-base tracking-tight leading-snug group-hover:text-indigo-650 transition-colors">
                      {game.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-semibold leading-relaxed line-clamp-2">
                      {game.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100/70">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-[10px] text-slate-500 font-black uppercase">
                          {game.isSystem ? 'TRẬN HỆ THỐNG' : 'BẢN ADMIN'}
                        </span>
                      </div>
                      
                      {/* Edit or Delete for Admins */}
                      {!game.isSystem && isAdminLoggedIn && (
                        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEditForm(game);
                            }}
                            className="p-1 hover:bg-slate-100 text-slate-600 rounded"
                            title="Sửa trò chơi"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteGame(game.id);
                            }}
                            className="p-1 hover:bg-rose-50 text-rose-600 rounded"
                            title="Xóa trò chơi"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedGame(game)}
                      className="w-full flex items-center justify-center gap-2 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer active:scale-98"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> THAM GIA THÚ VỊ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}

// SECURE HIGH-FIDELITY PLAYER FOR CUSTOM ADMIN-PUBLISHED GAMES
function CustomGamePlayer({
  game,
  onBack,
  showToast
}: {
  game: GameItem;
  onBack: () => void;
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = game.customQuestions || [];
  if (questions.length === 0) {
    return (
      <div className="text-center p-8 text-slate-500">
        <p>⚠️ Trò chơi này hiện tại chưa có bộ câu hỏi thi đấu.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-slate-900 text-white rounded text-xs uppercase font-bold">Quay lại</button>
      </div>
    );
  }

  const currentQ = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (submitted) return;
    setSelectedOpt(idx);
  };

  const handleConfirm = () => {
    if (selectedOpt === null || submitted) return;
    setSubmitted(true);

    if (selectedOpt === currentQ.correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setSubmitted(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setFinished(true);
      const finalScorePct = Math.round(( (score + (selectedOpt === currentQ.correct ? 1 : 0)) / questions.length) * 100);
      showToast(`Chúc mừng bạn hoàn thành thử thách với ${finalScorePct}% điểm!`, 'success');
    }
  };

  const finalScorePct = Math.round((score / questions.length) * 100);

  return (
    <div className="space-y-6 text-center max-w-xl mx-auto" id="custom-game-runner">
      <div className="space-y-1.5">
        <span className="bg-indigo-150 text-indigo-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-full font-display">TRÒ CHƠI HỌC VIÊN TỰ KHỞI CHẠY</span>
        <h3 className="font-extrabold text-lg text-slate-900">{game.title}</h3>
      </div>

      {!finished ? (
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-5 text-left animate-fadeIn">
          
          <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest border-b pb-2.5 border-slate-200">
            <span>CÂU HỎI {currentIdx + 1} / {questions.length}</span>
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">TỈ LỆ TRẢ LỜI ĐÚNG: {score} câu</span>
          </div>

          <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
            {currentQ.text}
          </h4>

          <div className="grid grid-cols-1 gap-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOpt === idx;
              const isCorrect = idx === currentQ.correct;
              const isWrong = isSelected && !isCorrect;

              let btnStyle = 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100/70 bg-white';
              if (isSelected) btnStyle = 'border-indigo-650 bg-indigo-50 text-indigo-900 font-bold';
              if (submitted) {
                if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                else if (isWrong) btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-semibold';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={submitted}
                  onClick={() => handleSelect(idx)}
                  className={`p-3 border text-xs text-left rounded-xl transition-all cursor-pointer ${btnStyle}`}
                >
                  <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {submitted && (
            <div className="p-3.5 border rounded-xl leading-relaxed text-xs bg-slate-50 font-semibold text-slate-600 animate-fadeIn">
              <span className={`block font-black text-[10px] uppercase mb-1 ${selectedOpt === currentQ.correct ? 'text-emerald-600' : 'text-rose-500'}`}>
                {selectedOpt === currentQ.correct ? '✓ ĐÁP ÁN ĐÚNG CHUẨN XÁC!' : '✗ TIẾC QUÁ, CHƯA ĐÚNG RỒI!'}
              </span>
              Kiến thức này sẽ được tích lũy vào bộ đề ghi nhớ của bạn học đường.
            </div>
          )}

          <div className="flex justify-end pt-2 border-t border-slate-200/50">
            {!submitted && selectedOpt !== null && (
              <button
                type="button"
                onClick={handleConfirm}
                className="px-5 py-2.5 bg-indigo-600 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer active:scale-95"
              >
                Xác nhận câu trả lời
              </button>
            )}
            {submitted && (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 bg-slate-900 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer active:scale-95"
              >
                {currentIdx === questions.length - 1 ? 'Hoàn thành đấu trường ➔' : 'Tiếp câu sau ➔'}
              </button>
            )}
          </div>

        </div>
      ) : (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 animate-fadeIn font-display">
          <div className="space-y-1">
            <span className="text-4xl text-center block">🎓🏆</span>
            <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm sm:text-base">HÀNH TRÌNH HOÀN TẤT</h4>
            <div className="font-display font-black text-4xl text-emerald-600">{finalScorePct}% Điểm</div>
            <p className="text-xs text-slate-500 leading-normal font-sans font-medium">
              Bạn đã giải đáp hoàn mỹ <span className="font-bold text-slate-800">{score} / {questions.length}</span> câu hỏi được thiết kế bởi Admin/Giáo viên!
            </p>
          </div>

          <button
            onClick={onBack}
            className="px-5 py-2.5 bg-slate-900 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer active:scale-95 font-sans"
          >
            Quay về kho trò chơi
          </button>
        </div>
      )}
    </div>
  );
}
