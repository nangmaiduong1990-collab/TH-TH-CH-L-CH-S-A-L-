import { useState, useEffect, useRef } from 'react';
import { 
  Home, Trophy, Search, Sparkles, User, Trash, Check, CheckCircle2, 
  X, AlertCircle, FileText, Clock, Settings, Users, Plus, Download, 
  Upload, Volume2, ArrowRight, ArrowLeft, ShieldCheck, Award, 
  Calendar, School, Mail, RefreshCw, Key, HelpCircle, CheckSquare, Lock
} from 'lucide-react';

const INITIAL_QUESTIONS = [
  {
    id: 'q1',
    content: 'Theo Công ước Liên Hợp Quốc về Luật Biển năm 1982, vùng biển của nước ta bao gồm mấy bộ phận?',
    grade: '9',
    category: 'OT1',
    stt: '1',
    type: 'SINGLE',
    options: [
      { text: '5 bộ phận (Nội thủy, Lãnh hải, Tiếp giáp lãnh hải, Đặc quyền kinh tế, Thềm lục địa)', link: '', image: '' },
      { text: '3 bộ phận (Lãnh hải, Đặc quyền kinh tế, Thềm lục địa)', link: '', image: '' },
      { text: '4 bộ phận (Nội thủy, Lãnh hải, Đặc quyền kinh tế, Thềm lục địa)', link: '', image: '' },
      { text: '2 bộ phận (Lãnh hải và Thềm lục địa)', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Theo Công ước Luật Biển 1982 và Luật Biển Việt Nam, vùng biển nước ta gồm 5 bộ phận: Nội thủy, Lãnh hải, Vùng tiếp giáp lãnh hải, Vùng đặc quyền kinh tế và Thềm lục địa.'
  },
  {
    id: 'q2',
    content: 'Chiến dịch Điện Biên Phủ lịch sử năm 1954 kết thúc thắng lợi vào ngày tháng năm nào?',
    grade: '9',
    category: 'OT2',
    stt: '2',
    type: 'SINGLE',
    options: [
      { text: '30/04/1975', link: '', image: '' },
      { text: '07/05/1954', link: '', image: '' },
      { text: '19/08/1945', link: '', image: '' },
      { text: '02/09/1945', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Chiều ngày 7/5/1954, lá cờ "Quyết chiến Quyết thắng" của quân đội ta tung bay trên nóc hầm Đờ Cát-tơ-ri, chiến dịch Điện Biên Phủ hoàn toàn thắng lợi.'
  },
  {
    id: 'q3',
    content: 'Trái Đất tự quay quanh trục tưởng tượng theo hướng nào?',
    grade: '6',
    category: 'OT1',
    stt: '1',
    type: 'SINGLE',
    options: [
      { text: 'Từ Tây sang Đông', link: '', image: '' },
      { text: 'Từ Đông sang Tây', link: '', image: '' },
      { text: 'Từ Bắc xuống Nam', link: '', image: '' },
      { text: 'Từ Nam lên Bắc', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Trái Đất tự quay quanh trục tưởng tượng theo hướng từ Tây sang Đông.'
  },
  {
    id: 'q4',
    content: 'Vào khoảng thiên niên kỷ thứ III TCN, cư dân Ai Cập cổ đại đã viết chữ trên loại giấy làm từ nguyên liệu gì?',
    grade: '6',
    category: 'OT3',
    stt: '2',
    type: 'SINGLE',
    options: [
      { text: 'Cây lúa mạch', link: '', image: '' },
      { text: 'Cây pa-pi-rút (Papyrus)', link: '', image: '' },
      { text: 'Mai rùa và xương thú', link: '', image: '' },
      { text: 'Thanh tre và lá cọ', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Người Ai Cập cổ đại đã biết dùng thân cây pa-pi-rút mọc ven sông Nin để làm thành một loại giấy viết đặc biệt.'
  },
  {
    id: 'q5',
    content: 'Châu lục nào trên thế giới có diện tích lớn nhất và dân số đông nhất hiện nay?',
    grade: '7',
    category: 'OT1',
    stt: '1',
    type: 'SINGLE',
    options: [
      { text: 'Châu Âu', link: '', image: '' },
      { text: 'Châu Á', link: '', image: '' },
      { text: 'Châu Phi', link: '', image: '' },
      { text: 'Châu Mỹ', link: '', image: '' }
    ],
    correctAnswer: 1,
    explanation: 'Châu Á là châu lục có diện tích lớn nhất (khoảng 44.4 triệu km2 bao gồm cả các đảo) và có quy mô dân số đông nhất thế giới.'
  },
  {
    id: 'q6',
    content: 'Phong trào Cần Vương bùng nổ sau sự kiện lịch sử tiêu biểu nào vào năm 1885?',
    grade: '8',
    category: 'OT1',
    stt: '1',
    type: 'SINGLE',
    options: [
      { text: 'Cuộc phản công quân Pháp tại kinh thành Huế của phái chủ chiến', link: '', image: '' },
      { text: 'Thực dân Pháp tấn công vào cửa biển Đà Nẵng', link: '', image: '' },
      { text: 'Hiệp ước Pa-tơ-nốt được ký kết', link: '', image: '' },
      { text: 'Khởi nghĩa Yên Thế bùng nổ', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: 'Sau thất bại của cuộc phản công tại kinh thành Huế đêm mùng 4 rạng sáng mùng 5/7/1885, Tôn Thất Thuyết đưa vua Hàm Nghi ra Tân Sở (Quảng Trị) và hạ chiếu Cần Vương.'
  }
];

const INITIAL_LEADERBOARD = [
  { id: 'l1', rank: 1, name: 'NGUYỄN PHÚC VĂN ANH', class: 'Lớp 9A1 - THCS Bình An', score: 1000, time: '2 phút 15 giây', date: '08/06/2026' },
  { id: 'l2', rank: 2, name: 'ĐẶNG THỊ MỸ DUYÊN', class: 'Lớp 8A2 - THCS Nguyễn Du', score: 1005, time: '2 phút 45 giây', date: '08/06/2026' },
  { id: 'l3', rank: 3, name: 'NGUYỄN PHÚC VÂN', class: 'Lớp 7B3 - THCS Trưng Vương', score: 980, time: '3 phút 02 giây', date: '07/06/2026' },
  { id: 'l4', rank: 4, name: 'Phạm Gia Bảo', class: 'Lớp 6A2 - THCS Nguyễn Du', score: 950, time: '3 phút 40 giây', date: '08/06/2026' },
  { id: 'l5', rank: 5, name: 'Bùi Xuân Yến', class: 'Lớp 9A5 - THCS Bình An', score: 920, time: '4 phút 10 giây', date: '08/06/2026' },
  { id: 'l6', rank: 6, name: 'Anh Khoa', class: 'Lớp 8A1 - THCS Trưng Vương', score: 890, time: '4 phút 55 giây', date: '06/06/2026' },
];

const INITIAL_EXAM_ROOMS = [
  { id: 'room1', code: 'OT4_D2_06_06', title: 'Phòng Đấu Trường Lịch Sử Khối 6', grade: '6', duration: 45, questions: 45, studentsCount: 18, status: 'ĐANG THI' },
  { id: 'room2', code: 'OT6_D2_06_06', title: 'Phòng Đấu Trường Địa Lí Khối 8', grade: '8', duration: 50, questions: 45, studentsCount: 24, status: 'ĐANG THI' },
  { id: 'room3', code: 'OT9_D1_06_06', title: 'Đấu Trường Lịch Sử & Địa Lí Khối 9', grade: '9', duration: 45, questions: 40, studentsCount: 31, status: 'ĐANG THI' }
];

const MOST_DOWNLOADED_RESOURCES = [
  { id: 'res1_t1', title: 'Đề Cương Học Và Kiến Thức Lịch Sử & Địa Lí Khối 6', grade: '6', category: 'OT1', questions: 45, downloads: 1250, color: 'border-orange-500', svgType: 'history' },
  { id: 'res2_t1', title: 'Đề Cương Học Và Kiến Thức Lịch Sử & Địa Lí Khối 7', grade: '7', category: 'OT1', questions: 45, downloads: 1102, color: 'border-orange-500', svgType: 'geography' },
  { id: 'res3_t1', title: 'Đề Cương Học Và Kiến Thức Lịch Sử & Địa Lí Khối 8', grade: '8', category: 'OT1', questions: 45, downloads: 984, color: 'border-orange-500', svgType: 'history' },
  { id: 'res4_t1', title: 'Đề Cương Học Và Kiến Thức Lịch Sử & Địa Lí Khối 9', grade: '9', category: 'OT1', questions: 40, downloads: 870, color: 'border-orange-500', svgType: 'geography' },
];

const NEWEST_RESOURCES = [
  { id: 'res5_n1', title: 'Đề Kiểm Tra Lịch Sử & Địa Lí Khối 6', grade: '6', category: 'OT1', questions: 45, downloads: 412, color: 'border-blue-400', svgType: 'exam' },
  { id: 'res6_n1', title: 'Đề Kiểm Tra Lịch Sử & Địa Lí Khối 7', grade: '7', category: 'OT1', questions: 45, downloads: 356, color: 'border-blue-400', svgType: 'exam' },
  { id: 'res7_n1', title: 'Đề Kiểm Tra Lịch Sử & Địa Lí Khối 8', grade: '8', category: 'OT2', questions: 45, downloads: 288, color: 'border-blue-400', svgType: 'exam' },
  { id: 'res8_n1', title: 'Đề Kiểm Tra Lịch Sử & Địa Lí Khối 9', grade: '9', category: 'OT3', questions: 40, downloads: 194, color: 'border-blue-400', svgType: 'exam' },
];

export default function App() {
  const [currentView, setCurrentView] = useState('portal'); // portal, lobby, exam-room, leaderboard, admin, create-question
  
  // Storage initialization
  const [questions, setQuestions] = useState(() => {
    const local = localStorage.getItem('quizmaster_questions');
    return local ? JSON.parse(local) : INITIAL_QUESTIONS;
  });

  const [leaderboard, setLeaderboard] = useState(() => {
    const local = localStorage.getItem('quizmaster_leaderboard');
    return local ? JSON.parse(local) : INITIAL_LEADERBOARD;
  });

  const [examRooms, setExamRooms] = useState(() => {
    const local = localStorage.getItem('quizmaster_exam_rooms');
    return local ? JSON.parse(local) : INITIAL_EXAM_ROOMS;
  });

  const [examHistoryLogs, setExamHistoryLogs] = useState(() => {
    const local = localStorage.getItem('quizmaster_history_logs');
    return local ? JSON.parse(local) : [
      { id: 'h1', student: 'LÊ VĂN KHÁNH', grade: '9', score: '950đ', duration: '22:15', date: '08/06/2026' },
      { id: 'h2', student: 'TRẦN LÊ ANH THƯ', grade: '8', score: '880đ', duration: '18:40', date: '08/06/2026' },
      { id: 'h3', student: 'VƯƠNG TUẤN KIỆT', grade: '7', score: '1000đ', duration: '15:10', date: '07/06/2026' }
    ];
  });

  const [userData, setUserData] = useState(() => {
    const local = localStorage.getItem('quizmaster_userdata');
    return local ? JSON.parse(local) : {
      name: 'Chưa danh tính',
      grade: 'Lớp 9A1',
      school: 'THCS Bình An - Kiên Lương'
    };
  });

  const [downloadedResources, setDownloadedResources] = useState(() => {
    const local = localStorage.getItem('quizmaster_downloaded_resources');
    return local ? JSON.parse(local) : MOST_DOWNLOADED_RESOURCES;
  });

  const [newestResources, setNewestResources] = useState(() => {
    const local = localStorage.getItem('quizmaster_newest_resources');
    return local ? JSON.parse(local) : NEWEST_RESOURCES;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('quizmaster_admin_loggedin') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [adminProfile, setAdminProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('quizmaster_admin_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return {
      name: 'DƯƠNG THỊ HIỆP',
      role: 'Quản trị viên',
      email: 'hiep.duong@school.edu.vn'
    };
  });

  const [authTab, setAuthTab] = useState('login');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authForm, setAuthForm] = useState({ 
    name: 'CÔ DƯƠNG THỊ HIỆP', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfileData, setEditProfileData] = useState({ name: '', grade: '', school: '' });

  const [isTtsPlaying, setIsTtsPlaying] = useState(false);
  const [dialogConfig, setDialogConfig] = useState(null);
  const [toasts, setToasts] = useState([]);

  const [activeAdminTab, setActiveAdminTab] = useState('overview'); // overview, questions, school_class, email_perms, cloudflare, history
  const [leaderboardGradeFilter, setLeaderboardGradeFilter] = useState('Tất cả'); 
  const [leaderboardClassroomFilter, setLeaderboardClassroomFilter] = useState('Tất cả lớp');
  const [leaderboardSearchQuery, setLeaderboardSearchQuery] = useState('');

  const [schoolsList, setSchoolsList] = useState([
    { id: 's1', name: 'THCS Bình An - Kiên Lương', status: 'Hoạt động', classes: 8 },
    { id: 's2', name: 'THCS Nguyễn Du', status: 'Hoạt động', classes: 12 },
    { id: 's3', name: 'THCS Trưng Vương', status: 'Bảo trì', classes: 5 }
  ]);
  const [newSchoolName, setNewSchoolName] = useState('');

  const [emailWhitelist, setEmailWhitelist] = useState(() => {
    try {
      const saved = localStorage.getItem('quizmaster_email_whitelist');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      'hiepdt.c2binhan@gmail.com',
      'duonghiep559@gmail.com',
      'hiep.duong@school.edu.vn',
      'admin@quizmaster.com',
      'giamsat@school.edu.vn'
    ];
  });
  const [newWhitelistedEmail, setNewWhitelistedEmail] = useState('');

  const [viewingRoomConfig, setViewingRoomConfig] = useState(null); 
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [createRoomForm, setCreateRoomForm] = useState({
    title: '',
    grade: '9',
    duration: '45',
    questionsCount: '40'
  });

  const [practiceConfig, setPracticeConfig] = useState({
    grade: '6',
    type: 'SINGLE',
    mixQuestions: true,
    classMode: 'supplemental', // default to direct sub-class list selection
    subClass: '6/1'
  });

  const [customClasses, setCustomClasses] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem('school_custom_classes');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return {
      '6': ['6/1', '6/2', '6/3', '6/4', '6/5', '6/6'],
      '7': ['7/1', '7/2', '7/3', '7/4', '7/5', '7/6'],
      '8': ['8/1', '8/2', '8/3', '8/4', '8/5', '8/6'],
      '9': ['9/1', '9/2', '9/3', '9/4', '9/5', '9/6']
    };
  });

  const [classImportState, setClassImportState] = useState<{
    isOpen: boolean;
    grade: string;
    inputText: string;
  }>({
    isOpen: false,
    grade: '6',
    inputText: ''
  });

  const saveCustomClasses = (updated: Record<string, string[]>) => {
    setCustomClasses(updated);
    try {
      localStorage.setItem('school_custom_classes', JSON.stringify(updated));
    } catch (e) {}
  };

  const [comebackGrade, setComebackGrade] = useState('6');
  const [comebackClass, setComebackClass] = useState('6/1');

  const [activeExam, setActiveExam] = useState(null);
  const examTimerRef = useRef(null);

  const [liveUsers, setLiveUsers] = useState([
    { id: 1, name: 'PHẠM GIA BẢO', class: 'Lớp 6A2', device: 'Chrome - Windows 11', status: 'ACTIVE', timeElapsed: '08:42' },
    { id: 2, name: 'ANONYMOUS USER', class: 'Khách', device: 'Safari - iOS 17', status: 'ACTIVE', timeElapsed: '02:15' },
    { id: 3, name: 'ANONYMOUS STUDENT', class: 'Khách', device: 'Firefox - MacOS', status: 'ACTIVE', timeElapsed: '12:08' },
    { id: 4, name: 'PHẠM LÊ BẢO YẾN', class: 'Lớp 7A5', device: 'Chrome - Android', status: 'ACTIVE', timeElapsed: '05:30' }
  ]);

  const [systemConfig, setSystemConfig] = useState({
    grade6Time: 45,
    grade7Time: 45,
    grade8Time: 50,
    grade9Time: 50,
    maintenanceMode: false,
    maintenanceTime: 'BT',
    blockF12: false,
    removeDuplicateNames: false
  });

  const [showLoginOnMaintenance, setShowLoginOnMaintenance] = useState(false);

  const loadSystemSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSystemConfig(prev => ({
          ...prev,
          maintenanceMode: data.maintenanceMode ?? false,
          maintenanceTime: data.maintenanceTime ?? 'BT',
          blockF12: data.blockF12 ?? false
        }));
      }
    } catch (err) {
      console.error("Lỗi đồng bộ cấu hình:", err);
    }
  };

  const syncSystemSettings = async (updatedFields: any) => {
    setSystemConfig(prev => {
      const next = { ...prev, ...updatedFields };
      fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next)
      }).catch(err => console.error("Lỗi lưu cấu hình lên server:", err));
      return next;
    });
  };

  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const [newQuestion, setNewQuestion] = useState({
    content: '',
    grade: '6',
    category: 'OT1',
    stt: '',
    type: 'SINGLE',
    options: [
      { text: '', link: '', image: '' },
      { text: '', link: '', image: '' },
      { text: '', link: '', image: '' },
      { text: '', link: '', image: '' }
    ],
    correctAnswer: 0,
    explanation: ''
  });

  const [isQuickImportOpen, setIsQuickImportOpen] = useState(false);
  const [quickImportText, setQuickImportText] = useState('');
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [examRecap, setExamRecap] = useState(null);

  const aiDocUploaderRef = useRef(null);
  const importQuestionsUploaderRef = useRef(null);

  // Supabase Database Connection Status State
  const [supabaseStatus, setSupabaseStatus] = useState({
    configured: false,
    connected: false,
    message: 'Đang kiểm tra kết nối hệ thống dữ liệu...',
    counts: { questions: 0, leaderboard: 0, examRooms: 0, examHistoryLogs: 0 },
    sql: ''
  });

  const checkSupabaseStatus = async () => {
    try {
      const res = await fetch('/api/supabase/status');
      if (res.ok) {
        const data = await res.json();
        setSupabaseStatus(data);
      }
    } catch (err) {
      console.error("Lỗi kiểm lỗi Supabase:", err);
    }
  };

  const loadDatabaseData = async () => {
    try {
      const qRes = await fetch('/api/questions');
      if (qRes.ok) {
        const qData = await qRes.json();
        if (Array.isArray(qData) && qData.length > 0) {
          setQuestions(qData);
        }
      }

      const lRes = await fetch('/api/leaderboard');
      if (lRes.ok) {
        const lData = await lRes.json();
        if (Array.isArray(lData)) {
          setLeaderboard(lData);
        }
      }

      const rRes = await fetch('/api/exam-rooms');
      if (rRes.ok) {
        const rData = await rRes.json();
        if (Array.isArray(rData)) {
          setExamRooms(rData);
        }
      }

      const hRes = await fetch('/api/exam-history-logs');
      if (hRes.ok) {
        const hData = await hRes.json();
        if (Array.isArray(hData)) {
          setExamHistoryLogs(hData);
        }
      }
    } catch (err) {
      console.error("Error loading database data:", err);
    }
  };

  // Load backend details on startup
  useEffect(() => {
    loadDatabaseData();
    checkSupabaseStatus();
    loadSystemSettings();
  }, []);

  // Persistence helpers
  const saveQuestions = async (newQList, actionType?: 'add' | 'delete' | 'import', targetItem?: any) => {
    setQuestions(newQList);
    localStorage.setItem('quizmaster_questions', JSON.stringify(newQList));
    
    try {
      if (actionType === 'delete' && targetItem) {
        await fetch(`/api/questions/${targetItem}`, { method: 'DELETE' });
      } else if (actionType === 'add' && targetItem) {
        await fetch('/api/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(targetItem)
        });
      } else if (actionType === 'import' && Array.isArray(targetItem)) {
        await fetch('/api/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(targetItem)
        });
      }
      checkSupabaseStatus();
    } catch (err) {
      console.error("Lỗi đồng bộ câu hỏi lên server:", err);
    }
  };

  const saveExamRooms = async (newRooms, newCreatedRoom?: any) => {
    setExamRooms(newRooms);
    localStorage.setItem('quizmaster_exam_rooms', JSON.stringify(newRooms));
    try {
      if (newCreatedRoom) {
        await fetch('/api/exam-rooms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCreatedRoom)
        });
      }
      checkSupabaseStatus();
    } catch (err) {
      console.error("Lỗi đồng bộ phòng thi lên server:", err);
    }
  };

  // Toast notifier
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Anti-cheat & key block support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (systemConfig.blockF12) {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'u')) {
          e.preventDefault();
          showToast('⚠️ Hệ thống đã khóa bảng điều khiển DevTools để giữ vững an toàn thi đấu!', 'warning');
        }
      }
    };
    const handleContextMenu = (e) => {
      if (systemConfig.blockF12) {
        e.preventDefault();
        showToast('⚠️ Chức năng nhấp chuột phải bị vô hiệu hóa khi bật Chống gian lận!', 'warning');
      }
    };
    const handleSelectStart = (e) => {
      if (systemConfig.blockF12) {
        // Only prevent text selection inside exam room to avoid copying
        if (currentView === 'exam-room') {
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
    };
  }, [systemConfig.blockF12, currentView]);

  // Exam timer management
  useEffect(() => {
    if (activeExam && activeExam.timeLeft > 0) {
      examTimerRef.current = setTimeout(() => {
        setActiveExam(prev => {
          if (!prev) return null;
          if (prev.timeLeft <= 1) {
            clearTimeout(examTimerRef.current);
            submitExam(prev);
            return null;
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }
    return () => clearTimeout(examTimerRef.current);
  }, [activeExam]);

  const triggerCustomConfirm = (title, message, onConfirm) => {
    setDialogConfig({
      title,
      message,
      type: 'confirm',
      onConfirm: () => {
        onConfirm();
        setDialogConfig(null);
      },
      onCancel: () => setDialogConfig(null)
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!editProfileData.name.trim() || !editProfileData.grade.trim() || !editProfileData.school.trim()) {
      showToast('Vui lòng điền đầy đủ Họ tên, Lớp học và Trường bám sát mẫu!', 'warning');
      return;
    }
    const updated = {
      name: editProfileData.name,
      grade: editProfileData.grade,
      school: editProfileData.school
    };
    setUserData(updated);
    localStorage.setItem('quizmaster_userdata', JSON.stringify(updated));
    setIsEditingProfile(false);
    showToast('Cập nhật thông tin học sinh thành công cấu hình mới!', 'success');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (!authForm.email.trim() || !authForm.password.trim()) {
      showToast('Vui lòng điền đầy đủ địa chỉ email và mật khẩu!', 'warning');
      return;
    }
    
    const emailLower = authForm.email.trim().toLowerCase();
    const isWhitelisted = emailWhitelist.some(email => email.toLowerCase() === emailLower);
    
    if (!isWhitelisted) {
      showToast('Email này không thuộc Whitelist quản trị viên!', 'error');
      return;
    }

    let expectedPassword = '123456';
    let expectedName = adminProfile.name || 'QUẢN TRỊ VIÊN';
    
    if (emailLower === 'hiepdt.c2binhan@gmail.com') {
      expectedPassword = 'nguyentuanhung2010';
      expectedName = 'CÔ DƯƠNG THỊ HIỆP';
    } else if (emailLower === 'duonghiep559@gmail.com') {
      expectedPassword = 'nguyentuanhung';
      expectedName = 'CÔ DƯƠNG THỊ HIỆP (KHÔI PHỤC)';
    } else if (emailLower === 'admin@quizmaster.com') {
      expectedPassword = '123456';
      expectedName = 'QUẢN TRỊ VIÊN HỆ THỐNG';
    } else if (emailLower === 'hiep.duong@school.edu.vn') {
      expectedPassword = '123456';
      expectedName = 'DƯƠNG THỊ HIỆP';
    }

    // Check if there is a matching user stored in localStorage
    const storedProfileStr = localStorage.getItem('quizmaster_admin_profile');
    if (storedProfileStr) {
      try {
        const stored = JSON.parse(storedProfileStr);
        if (stored.email.toLowerCase() === emailLower && stored.password) {
          expectedPassword = stored.password;
          expectedName = stored.name;
        }
      } catch (err) {}
    }

    if (authForm.password !== expectedPassword) {
      showToast('Mật khẩu quản trị không chính xác!', 'error');
      return;
    }

    setIsAdminLoggedIn(true);
    try {
      localStorage.setItem('quizmaster_admin_loggedin', 'true');
      const finalProfile = {
        name: expectedName,
        role: 'Quản trị viên',
        email: emailLower
      };
      setAdminProfile(finalProfile);
      localStorage.setItem('quizmaster_admin_profile', JSON.stringify(finalProfile));
    } catch (err) {}
    
    showToast(`Chào mừng Quản trị viên ${expectedName} đã kết nối hệ thống!`, 'success');
  };

  const handleAdminRegister = (e) => {
    e.preventDefault();
    if (!authForm.name.trim() || !authForm.email.trim() || !authForm.password.trim()) {
      showToast('Vui lòng điền đầy đủ thông tin đăng ký mẫu!', 'warning');
      return;
    }
    if (authForm.password !== authForm.confirmPassword) {
      showToast('Mật khẩu xác nhận không trùng khớp!', 'error');
      return;
    }

    const emailLower = authForm.email.trim().toLowerCase();
    
    // Auto-whitelist newly registered admin
    if (!emailWhitelist.some(email => email.toLowerCase() === emailLower)) {
      setEmailWhitelist(prev => [...prev, emailLower]);
    }

    const newProfile = {
      name: authForm.name.toUpperCase(),
      role: 'Quản trị viên',
      email: emailLower,
      password: authForm.password
    };

    setAdminProfile(newProfile);
    setIsAdminLoggedIn(true);
    try {
      localStorage.setItem('quizmaster_admin_loggedin', 'true');
      localStorage.setItem('quizmaster_admin_profile', JSON.stringify(newProfile));
    } catch (err) {}
    showToast(`Đã thiết lập tài khoản Quản trị cho ${authForm.name}!`, 'success');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem('quizmaster_admin_loggedin');
    } catch (e) {}
    showToast('Đã đăng xuất tài khoản quản trị thành công!', 'info');
  };

  const handleDocumentUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      showToast('📄 Đang tải và phân tích file PDF bằng trợ lý trí lực Gemini AI...', 'info');
      
      const reader = new FileReader();
      reader.onload = async (event) => {
        const result = event.target?.result as string;
        if (!result) {
          showToast('❌ Không thể nạp dữ liệu tập tin PDF.', 'error');
          return;
        }
        
        // Extract base64 part
        const base64Index = result.indexOf('base64,');
        if (base64Index === -1) {
          showToast('❌ Định dạng file PDF không thể giải mã.', 'error');
          return;
        }
        
        const base64Data = result.substring(base64Index + 7);
        
        try {
          const parseRes = await fetch('/api/parse-pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pdfBase64: base64Data, filename: file.name })
          });
          
          const parseData = await parseRes.json().catch(() => ({}));
          
          if (parseRes.ok && parseData.success && parseData.text) {
            setAiPrompt(parseData.text);
            showToast(`📂 Nạp & Trích xuất toàn bộ văn bản từ "${file.name}" thành công! 🎉`, 'success');
          } else {
            const errorMsg = parseData.error || `Lỗi máy chủ (${parseRes.status})`;
            showToast(`❌ Lỗi trích xuất: ${errorMsg}`, 'error');
          }
        } catch (err: any) {
          console.error(err);
          showToast(`❌ Lỗi kết nối: ${err.message || 'Không thể liên lạc với máy chủ AI để xử lý file PDF.'}`, 'error');
        }
      };
      
      reader.onerror = () => {
        showToast('❌ Không thể đọc tập tin PDF này.', 'error');
      };
      
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          setAiPrompt(result);
          showToast(`📂 Nạp thành công nội dung văn bản từ "${file.name}"!`, 'success');
        }
      };
      reader.onerror = () => {
        showToast('❌ Không thể đọc tập tin này. Thử lại.', 'error');
      };
      reader.readAsText(file);
    }
    e.target.value = '';
  };

  // Calling server-side proxy endpoint for Gemini AI safely
  const handleGenerateQuestionWithAI = async () => {
    if (!aiPrompt.trim()) {
      showToast('Vui lòng biên soạn hoặc tải tư liệu Lịch sử & Địa lí thô vào ô nhập!', 'warning');
      return;
    }

    setIsAiGenerating(true);
    showToast('🤖 Đang kết nối trí tuệ nhân tạo Gemini trích xuất khảo thí...', 'info');

    try {
      const response = await fetch("/api/generate-question", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt, grade: newQuestion.grade })
      });

      const data = await response.json().catch(() => ({}));
      
      if (response.ok && data.success && data.text) {
        let cleanText = data.text.trim();
        if (cleanText.startsWith("```")) {
          const firstNewline = cleanText.indexOf("\n");
          if (firstNewline !== -1) {
            cleanText = cleanText.substring(firstNewline + 1);
          } else {
            cleanText = cleanText.substring(3);
          }
          if (cleanText.endsWith("```")) {
            cleanText = cleanText.substring(0, cleanText.length - 3);
          }
          cleanText = cleanText.trim();
        }
        const parsed = JSON.parse(cleanText);
        
        setNewQuestion({
          content: parsed.content || 'Nội dung câu hỏi',
          grade: parsed.grade || newQuestion.grade,
          category: parsed.category || 'OT1',
          stt: parsed.stt || '',
          type: parsed.type || 'SINGLE',
          options: parsed.options && parsed.options.length >= 2 
            ? parsed.options.map(o => ({ text: o.text || o, link: '', image: '' })) 
            : [
              { text: 'Đáp án A', link: '', image: '' },
              { text: 'Đáp án B', link: '', image: '' },
              { text: 'Đáp án C', link: '', image: '' },
              { text: 'Đáp án D', link: '', image: '' }
            ],
          correctAnswer: typeof parsed.correctAnswer === 'number' ? parsed.correctAnswer : 0,
          explanation: parsed.explanation || ''
        });
        showToast('🤖 AI đã tự động phân tích và nhập câu hỏi thành công!', 'success');
      } else {
        const errMsg = data.error || `Lỗi máy chủ (${response.status})`;
        showToast(`❌ Lỗi nạp dữ liệu AI: ${errMsg}`, 'error');
      }
    } catch (err: any) {
      showToast(`❌ Lỗi kết nối dịch vụ AI: ${err.message || 'Không thể kết nối máy chủ AI'}`, 'warning');
    } finally {
      setIsAiGenerating(false);
    }
  };

  // Convert Web Speech API speech synthesis directly for rich sound
  const handleSpeakText = (textToSpeak) => {
    if (!textToSpeak) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.92;
      
      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find(v => v.lang.includes('vi') || v.name.toLowerCase().includes('vietnam'));
      if (viVoice) {
        utterance.voice = viVoice;
      }
      
      utterance.onstart = () => setIsTtsPlaying(true);
      utterance.onend = () => setIsTtsPlaying(false);
      utterance.onerror = () => setIsTtsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
      showToast('🔊 Đang đọc phát thanh câu hỏi bằng giọng chuẩn...', 'success');
    } else {
      showToast('⚠️ Thiết bị không hỗ trợ giọng phát nói Web Speech API.', 'warning');
    }
  };

  const checkProfileInitialized = () => {
    const isDefaultName = !userData.name || userData.name.trim() === 'Chưa danh tính' || userData.name.trim() === '';
    const isDefaultGrade = !userData.grade || userData.grade.trim() === 'Chưa chọn lớp' || userData.grade.trim() === 'Lớp ...' || userData.grade.trim() === '';
    const isDefaultSchool = !userData.school || userData.school.trim() === 'Chưa chọn trường' || userData.school.trim() === '';
    
    if (isDefaultName || isDefaultGrade || isDefaultSchool) {
      showToast('⚠️ Bạn bắt buộc phải Khởi tạo danh tính (Học tên, khối lớp, trường) bám sát thông tin thực tế mới được vào ôn luyện!', 'warning');
      setEditProfileData({
        name: userData.name !== 'Chưa danh tính' ? userData.name : '',
        grade: userData.grade !== 'Lớp ...' && userData.grade !== 'Chưa chọn lớp' ? userData.grade : '',
        school: userData.school !== 'Chưa chọn trường' ? userData.school : ''
      });
      setIsEditingProfile(true);
      return false;
    }
    return true;
  };

  const handleStartPractice = () => {
    if (!checkProfileInitialized()) return;
    const filtered = questions.filter(q => q.grade === practiceConfig.grade);
    if (filtered.length === 0) {
      showToast(`Môn Lịch Sử & Địa Lí chưa có câu hỏi ôn luyện cho khối ${practiceConfig.grade}!`, 'warning');
      return;
    }
    let list = [...filtered];
    if (practiceConfig.mixQuestions) {
      list = list.sort(() => Math.random() - 0.5);
    }
    
    // Quick 15 questions
    const finalQuestions = list.slice(0, 15);

    // Get candidate selected class mode
    const targetClassLabel = `Lớp ${practiceConfig.subClass || `${practiceConfig.grade}/1`}`;

    setActiveExam({
      title: `Phòng Luyện Lịch sử & Địa lí - Khối ${practiceConfig.grade} (${targetClassLabel})`,
      questionsList: finalQuestions,
      currentIdx: 0,
      answers: {},
      timeLeftOriginal: 15 * 60,
      timeLeft: 15 * 60,
      isPractice: true,
      grade: practiceConfig.grade,
      assignedClass: targetClassLabel
    });
    setCurrentView('exam-room');
    showToast(`🎯 Trận đấu luyện tập đã kích hoạt với nhãn: ${targetClassLabel}!`, 'success');
  };

  const handleStartResourcePractice = (res) => {
    if (!checkProfileInitialized()) return;
    const filtered = questions.filter(q => q.grade === res.grade);
    if (filtered.length === 0) {
      showToast(`Chưa sẵn sàng câu hỏi cho học liệu ${res.title}!`, 'warning');
      return;
    }
    setActiveExam({
      title: `Khảo thí: ${res.title}`,
      questionsList: filtered,
      currentIdx: 0,
      answers: {},
      timeLeftOriginal: 20 * 60,
      timeLeft: 20 * 60,
      isPractice: true,
      grade: res.grade
    });
    setCurrentView('exam-room');
    showToast(`🎯 Đang mở đề cương ôn tập: ${res.title}`, 'success');
  };

  const handleStartGeneralPractice = (grade) => {
    if (!checkProfileInitialized()) return;
    const filtered = questions.filter(q => q.grade === grade);
    if (filtered.length === 0) {
      showToast(`Chưa tìm thấy đề thi tổng hợp khối ${grade}!`, 'warning');
      return;
    }
    setActiveExam({
      title: `Luyện thi tổng hợp nâng cao Khối Lớp ${grade}`,
      questionsList: [...filtered].sort(() => Math.random() - 0.5),
      currentIdx: 0,
      answers: {},
      timeLeftOriginal: 30 * 60,
      timeLeft: 30 * 65,
      isPractice: true,
      grade
    });
    setCurrentView('exam-room');
    showToast(`⚡ Bắt đầu vòng đấu tổng hợp lớp ${grade}!`, 'success');
  };

  const handleStartComebackTournament = (grade: string, subClass: string) => {
    if (!checkProfileInitialized()) return;
    const filtered = questions.filter(q => q.grade === grade);
    if (filtered?.length === 0) {
      showToast(`Môn Lịch Sử & Địa Lí chưa có câu hỏi ôn luyện cho khối ${grade}! Bạn hãy bấm nút gieo mầm hoặc nạp thêm câu hỏi.`, 'warning');
      return;
    }

    const randomized = [...filtered].sort(() => Math.random() - 0.5);
    const questionsSample = randomized.slice(0, 15);

    let finalStudentName = userData.name;
    if (finalStudentName === 'Chưa danh tính' || !finalStudentName) {
      const promptedName = prompt('Vui lòng nhập Họ Tên của bạn để bắt đầu trận lội ngược dòng:', '');
      if (promptedName && promptedName.trim()) {
        finalStudentName = promptedName.trim();
        const updated = {
          ...userData,
          name: finalStudentName,
          grade: `Lớp ${subClass}`,
        };
        setUserData(updated);
        localStorage.setItem('quizmaster_userdata', JSON.stringify(updated));
      } else {
        finalStudentName = 'Học Sinh Lội Ngược Dòng';
      }
    } else {
      const updated = {
        ...userData,
        grade: `Lớp ${subClass}`,
      };
      setUserData(updated);
      localStorage.setItem('quizmaster_userdata', JSON.stringify(updated));
    }

    setActiveExam({
      title: `🏆 Trận Lội Ngược Dòng Liên Khóa - Lớp ${subClass} (${userData.school || 'THCS Liên Cấp'}) ⚡`,
      questionsList: questionsSample,
      currentIdx: 0,
      answers: {},
      timeLeftOriginal: 25 * 60,
      timeLeft: 25 * 60,
      isPractice: true,
      grade: grade,
      isComeback: true,
      assignedClass: `Lớp ${subClass}`
    });

    setCurrentView('exam-room');
    showToast(`🚀 Khởi động Trận Lội Ngược Dòng - Lớp ${subClass}! Giải nhanh & Giật điểm kịch tính!`, 'success');
  };

  const handleJoinPrivateRoom = (e, directCode) => {
    if (e) e.preventDefault();
    let finalCode = directCode || roomCodeInput;
    
    if (directCode) {
      const promptedCode = prompt(`🔑 Vui lòng nhập chính xác Mã phòng thi đấu trực tuyến (${directCode}) do giáo viên cung cấp để xác thực quyền vào thi của bạn:`, '');
      if (!promptedCode || promptedCode.trim().toUpperCase() !== directCode.toUpperCase()) {
        showToast('❌ Sai mã phòng thi đấu trực tuyến! Vui lòng chỉ định mã đúng do giáo viên cung cấp.', 'error');
        return;
      }
      finalCode = promptedCode;
    }
    
    if (!finalCode.trim()) {
      showToast('Vui lòng nhập mã phòng đấu trực tuyến của bạn!', 'warning');
      return;
    }
    const cleanCode = finalCode.toUpperCase().trim();
    const matched = examRooms.find(r => r.code === cleanCode);
    if (!matched) {
      showToast(`❌ Không tồn tại phòng ôn tập có mã: "${cleanCode}"!`, 'error');
      return;
    }
    const filtered = questions.filter(q => q.grade === matched.grade);
    setActiveExam({
      title: `Đấu Trường: ${matched.title}`,
      questionsList: filtered.length > 0 ? filtered : questions,
      currentIdx: 0,
      answers: {},
      timeLeftOriginal: matched.duration * 60,
      timeLeft: matched.duration * 60,
      isPractice: false,
      grade: matched.grade
    });
    setCurrentView('exam-room');
    showToast(`🔑 Bạn đã bước vào phòng đấu ${matched.title}!`, 'success');
  };

  const handleCopyRoomInvite = (room: any) => {
    const inviteMessage = `[THƯ MỜI THI ĐẤU KHẢO THÍ ONLINE - QUIZMASTER]

🔔 Xin chào các em học sinh,
Đây là thông tin phòng thi trực tuyến của lớp:

📌 Tên phòng: ${room.title}
🏫 Đối tượng: Khối lớp ${room.grade}
⏱️ Thời lượng: ${room.duration} phút
📚 Số lượng câu hỏi: ${room.questions} câu
🔑 MÃ PHÒNG THI ĐẤU: ${room.code}

👉 Hướng dẫn tham gia:
1. Truy cập vào hệ thống ôn luyện khảo thí QuizMaster.
2. Chọn "Đấu Trường Live" hoặc chuyển tới phần "Vào Phòng Bằng Mã Số".
3. Nhập mã phòng đấu: ${room.code} để đồng bộ làm bài thi trực tiếp.

Chúc các em đạt thành tích rực rỡ và lọt Top Bảng Vàng! 🏆`;

    navigator.clipboard.writeText(inviteMessage)
      .then(() => showToast(`📋 Đã sao chép thư mời phòng ${room.code} thành công!`, 'success'))
      .catch(() => showToast('❌ Có lỗi xảy ra khi sao chép.', 'error'));
  };

  const handleDownloadRoomInvite = (room: any) => {
    const inviteText = `=======================================================
               THẺ PHÒNG THI ĐẤU TRỰC TUYẾN
                     HỆ THỐNG QUIZMASTER
=======================================================

     THÔNG TIN PHÒNG THI ĐẤU ĐÃ KÍCH HOẠT:
     ----------------------------------
     📌 TÊN PHÒNG THI:  ${room.title.toUpperCase()}
     🏫 ĐỐI TƯỢNG:      Khối Lớp ${room.grade}
     ⏱️ THỜI LƯỢNG MỞ:  ${room.duration} phút
     📚 SỐ CÂU HỎI:     ${room.questions} câu hỏi
     🔑 MÃ KẾT NỐI:     [ ${room.code} ]

   -------------------------------------------------
   👉 HƯỚNG DẪN DÀNH CHO HỌC SINH THAM GIA THI ĐẤU:
   -------------------------------------------------
   Bước 1: Truy cập hệ thống ôn thi QuizMaster Việt Nam.
   Bước 2: Click vào mục "Đấu Trường Live" trên thanh công cụ chính.
   Bước 3: Tại phần [Vào phòng bằng mã số], điền chính xác mã: 
           MÃ PHÒNG: ${room.code}
   Bước 4: Nhập họ tên thật, lớp học và bấm nút "Tham gia thi".

   - Lưu ý: Không tự ý tải lại trang F5 để tránh mất kết nối.
   - Chúc tất cả các em làm bài xuất sắc và lội ngược dòng thành công!

=======================================================
     KỲ ÔN TẬP KHẢO THÍ SỬ - ĐỊA LÍ THCS • THCS BÌNH AN
=======================================================`;

    const blob = new Blob([inviteText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `THE_PHONG_THI_${room.code}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`📥 Đã tải xuống file thẻ phòng thi ${room.code}!`, 'success');
  };

  // Submit and rank processing
  const submitExam = (examObj) => {
    let checkedCount = 0;
    const questionsList = examObj.questionsList;
    const ansMap = examObj.answers;

    questionsList.forEach((q, idx) => {
      const uAns = ansMap[idx];
      if (q.type === 'MULTIPLE') {
        const uAnsList = Array.isArray(uAns) ? uAns : (uAns !== undefined ? [uAns] : []);
        const correctAnswers = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];
        const isMatched = correctAnswers.length === uAnsList.length && 
          correctAnswers.every((val) => uAnsList.includes(val));
        if (isMatched) checkedCount++;
      } else if (q.type === 'SHORT_ANSWER') {
        const userText = typeof uAns === 'string' ? uAns.trim().toLowerCase() : '';
        const correctText = typeof q.correctAnswer === 'string' ? q.correctAnswer.trim().toLowerCase() : '';
        if (userText === correctText && correctText !== '') {
          checkedCount++;
        }
      } else {
        if (uAns === q.correctAnswer) {
          checkedCount++;
        }
      }
    });

    const calculatedScore = Math.round((checkedCount / questionsList.length) * 1000);
    const elapsedSec = examObj.timeLeftOriginal - examObj.timeLeft;
    const minStr = Math.floor(elapsedSec / 60);
    const secStr = elapsedSec % 60;
    const totalTimeFormed = `${minStr} phút ${secStr} giây`;

    // Append to Leaderboard
    const finalClassLabel = examObj.assignedClass ? `${examObj.assignedClass} - ${userData.school}` : `${userData.grade} - ${userData.school}`;
    const newLeaderObj = {
      id: `l_${Date.now()}`,
      rank: 0,
      name: userData.name !== 'Chưa danh tính' ? userData.name.toUpperCase() : 'HỌC SINH ẨN DANH',
      class: finalClassLabel,
      score: calculatedScore,
      time: totalTimeFormed,
      date: new Date().toLocaleDateString('vi-VN')
    };

    const nextLeaderboardList = [...leaderboard, newLeaderObj]
      .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
      .map((item, index) => ({ ...item, rank: index + 1 }));

    setLeaderboard(nextLeaderboardList);
    localStorage.setItem('quizmaster_leaderboard', JSON.stringify(nextLeaderboardList));

    // Save to Supabase DB via express proxies
    fetch('/api/leaderboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLeaderObj)
    }).then(() => checkSupabaseStatus()).catch(e => console.error(e));

    // Log log list
    const newLog = {
      id: `history_${Date.now()}`,
      student: newLeaderObj.name,
      grade: examObj.grade,
      score: `${calculatedScore}đ`,
      duration: `${minStr.toString().padStart(2, '0')}:${secStr.toString().padStart(2, '0')}`,
      date: newLeaderObj.date
    };
    const nextLogs = [newLog, ...examHistoryLogs];
    setExamHistoryLogs(nextLogs);
    localStorage.setItem('quizmaster_history_logs', JSON.stringify(nextLogs));

    // Save to Supabase DB via express proxies
    fetch('/api/exam-history-logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLog)
    }).catch(e => console.error(e));

    setExamRecap({
      title: examObj.title,
      questionsCount: questionsList.length,
      correctCount: checkedCount,
      score: calculatedScore,
      timeStr: totalTimeFormed
    });

    setActiveExam(null);
    setCurrentView('leaderboard');
    showToast('🏆 Kỳ thi hoàn thành! Đã cập nhật thành tích lên bảng vinh danh khoa!', 'success');
  };

  const handleDeleteLeaderboardEntry = (id: string) => {
    setDialogConfig({
      title: "Xác nhận xóa thành tích",
      message: "Bạn có chắc chắn muốn xóa học sinh này khỏi bảng xếp hạng vinh danh không? Hành động này không thể hoàn tác.",
      onCancel: () => setDialogConfig(null),
      onConfirm: async () => {
        setDialogConfig(null);
        try {
          const updatedLeaderboard = leaderboard.filter(item => item.id !== id)
            .map((item, index) => ({ ...item, rank: index + 1 }));
          setLeaderboard(updatedLeaderboard);
          localStorage.setItem('quizmaster_leaderboard', JSON.stringify(updatedLeaderboard));

          const res = await fetch(`/api/leaderboard/${id}`, {
            method: 'DELETE'
          });
          if (res.ok) {
            showToast("Đã xóa học sinh khỏi bảng vinh danh thành công! 🎉", "success");
          } else {
            // Just warning client, but keep local deletion anyway
            showToast("Xóa cục bộ thành công! Có một lỗi nhỏ khi xóa trên Supabase.", "info");
          }
        } catch (e) {
          console.error(e);
          showToast("Đã xóa học sinh trên trình duyệt! Việc đồng bộ máy chủ bị gián đoạn.", "info");
        }
      }
    });
  };

  const handleDeleteDownloadedResource = (id: string, title: string) => {
    setDialogConfig({
      title: "Xác nhận xóa tài liệu",
      message: `Bạn có chắc chắn muốn xóa tài liệu học tập "${title}" khỏi danh sách tải nhiều nhất không? Hoạt động này không thể phục hồi.`,
      onCancel: () => setDialogConfig(null),
      onConfirm: () => {
        setDialogConfig(null);
        const updated = downloadedResources.filter(item => item.id !== id);
        setDownloadedResources(updated);
        localStorage.setItem('quizmaster_downloaded_resources', JSON.stringify(updated));
        showToast("Đã xóa tài liệu khỏi danh sách thành công! 🗑️", "success");
      }
    });
  };

  const handleDeleteNewestResource = (id: string, title: string) => {
    setDialogConfig({
      title: "Xác nhận xóa đề kiểm tra",
      message: `Bạn có chắc chắn muốn xóa đề kiểm tra "${title}" khỏi danh sách đề mới nhất không? Hoạt động này không thể phục hồi.`,
      onCancel: () => setDialogConfig(null),
      onConfirm: () => {
        setDialogConfig(null);
        const updated = newestResources.filter(item => item.id !== id);
        setNewestResources(updated);
        localStorage.setItem('quizmaster_newest_resources', JSON.stringify(updated));
        showToast("Đã xóa đề kiểm tra khỏi danh sách thành công! 🗑️", "success");
      }
    });
  };

  const handleAddOption = () => {
    setNewQuestion(prev => ({
      ...prev,
      options: [...prev.options, { text: '', link: '', image: '' }]
    }));
  };

  const handleRemoveOption = (idx) => {
    if (newQuestion.options.length <= 2) {
      showToast('Phải chứa tối thiểu 2 phương án đáp án lựa chọn!', 'warning');
      return;
    }
    setNewQuestion(prev => {
      const filtered = prev.options.filter((_, i) => i !== idx);
      const nextCorrect = prev.correctAnswer >= filtered.length ? filtered.length - 1 : prev.correctAnswer;
      return {
        ...prev,
        options: filtered,
        correctAnswer: nextCorrect
      };
    });
  };

  const handleQuickImport = () => {
    if (!quickImportText.trim()) return;
    const lines = quickImportText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length < 2) {
      showToast('Dán tối thiểu 2 phương án đáp án để đồng bộ!', 'warning');
      return;
    }
    setNewQuestion(prev => ({
      ...prev,
      options: lines.map(line => ({ text: line, link: '', image: '' })),
      correctAnswer: 0
    }));
    setIsQuickImportOpen(false);
    setQuickImportText('');
    showToast('Đã ghi nhận các đáp án lựa chọn nhanh!', 'success');
  };

  const handleSaveQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.content.trim()) {
      showToast('Học phần nội dung câu hỏi trống!', 'warning');
      return;
    }
    if ((newQuestion.type === 'SINGLE' || newQuestion.type === 'MULTIPLE') && newQuestion.options.some(o => !o.text.trim())) {
      showToast('Cần điền đầy đủ thông tin chữ của phương án!', 'warning');
      return;
    }

    const item = {
      ...newQuestion,
      id: `q_custom_${Date.now()}`,
      stt: newQuestion.stt || (questions.length + 1).toString()
    };

    const nextList = [item, ...questions];
    saveQuestions(nextList, 'add', item);
    showToast('✅ Đã nạp thành công câu hỏi mới vào ngân hàng!', 'success');

    setNewQuestion({
      content: '',
      grade: '6',
      category: 'OT1',
      stt: '',
      type: 'SINGLE',
      options: [
        { text: '', link: '', image: '' },
        { text: '', link: '', image: '' },
        { text: '', link: '', image: '' },
        { text: '', link: '', image: '' }
      ],
      correctAnswer: 0,
      explanation: ''
    });
  };

  const handleDeleteQuestion = (id) => {
    triggerCustomConfirm('Cảnh báo xóa', 'Bạn có chắc chắn muốn xóa câu hỏi này khỏi danh mục ôn thi?', () => {
      const nextList = questions.filter(q => q.id !== id);
      saveQuestions(nextList, 'delete', id);
      showToast('Đã xóa dữ liệu câu hỏi thành công!', 'info');
    });
  };

  const handleExportQuestions = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "QuizMaster_LichSu_DiaLi.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('📥 Kết xuất tệp tàng thư câu hỏi JSON thành công!', 'success');
    } catch {
      showToast('Lỗi kết xuất dữ liệu tệp tin.', 'error');
    }
  };

  const handleDownloadClassList = () => {
    const listToExport = filteredLeaderboard.map((item, idx) => ({
      'STT': idx + 1,
      'Họ tên': item.name,
      'Lớp - Trường': item.class,
      'Thời gian làm': item.time,
      'Điểm số': item.score,
      'Ngày thi': item.date || ''
    }));

    if (listToExport.length === 0) {
      showToast('Không có dữ liệu học sinh trong lớp/khối này để tải!', 'warning');
      return;
    }

    const headers = ['STT', 'Họ tên', 'Lớp - Trường', 'Thời gian làm', 'Điểm số', 'Ngày thi'];
    const csvContent = "\uFEFF" + [
      headers.join(','),
      ...listToExport.map(row => [
        row['STT'],
        `"${row['Họ tên'].replace(/"/g, '""')}"`,
        `"${row['Lớp - Trường'].replace(/"/g, '""')}"`,
        `"${row['Thời gian làm'].replace(/"/g, '""')}"`,
        row['Điểm số'],
        `"${row['Ngày thi'].replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    try {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      const gradeName = leaderboardGradeFilter === 'Tất cả' ? 'Tat_Ca_Khoi' : `Khoi_${leaderboardGradeFilter}`;
      const className = leaderboardClassroomFilter === 'Tất cả lớp' ? 'Tat_Ca_Lop' : leaderboardClassroomFilter.replace(/\//g, '_').replace(/\s+/g, '_');
      
      link.setAttribute('href', url);
      link.setAttribute('download', `Danh_sach_lop_${gradeName}_${className}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`Đã xuất và tải danh sách lớp thành công 📊`, 'success');
    } catch {
      showToast('Lỗi tải danh sách lớp học.', 'error');
    }
  };

  const handleImportQuestions = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        if (typeof result === 'string') {
          const imported = JSON.parse(result);
          if (Array.isArray(imported)) {
            const valid = imported.filter(x => x.content && x.options);
            if (valid.length > 0) {
              const importedMapped = valid.map((x, i) => ({
                ...x,
                id: x.id || `imported_${Date.now()}_${i}`
              }));

              const currentIds = new Set(questions.map(q => q.id));
              const duplicates = importedMapped.filter(x => currentIds.has(x.id));
              const fresh = importedMapped.filter(x => !currentIds.has(x.id));

              // Map current list and overwrite with incoming duplicates or add new ones
              const qMap = new Map(questions.map(q => [q.id, q]));
              for (const item of importedMapped) {
                qMap.set(item.id, item);
              }
              const next = Array.from(qMap.values());

              saveQuestions(next, 'import', importedMapped);
              
              if (duplicates.length > 0) {
                showToast(`📥 Đã nạp thành công! Ghi đè ${duplicates.length} câu cũ & Thêm ${fresh.length} câu mới.`, 'success');
              } else {
                showToast(`📥 Thành công nạp khóa ${fresh.length} câu hỏi mới!`, 'success');
              }
            } else {
              showToast('Kiểm tra lại cấu trúc file JSON học liệu.', 'error');
            }
          }
        }
      } catch {
        showToast('Tập tin JSON lỗi định dạng cấu trúc.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (!createRoomForm.title.trim()) {
      showToast('Nội dung tên phòng thi đấu không được để trống!', 'warning');
      return;
    }
    const derivedCode = `ROOM_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const room = {
      id: `room_${Date.now()}`,
      code: derivedCode,
      title: createRoomForm.title,
      grade: createRoomForm.grade,
      duration: parseInt(createRoomForm.duration) || 45,
      questions: parseInt(createRoomForm.questionsCount) || 40,
      studentsCount: 0,
      status: 'ĐANG CHỜ'
    };
    const nextList = [room, ...examRooms];
    saveExamRooms(nextList, room);
    setIsCreateRoomOpen(false);
    showToast(`Đã trực tiếp kích hoạt phòng thi có mã kết nối: ${derivedCode}`, 'success');
  };

  const filteredLeaderboard = leaderboard.filter(item => {
    const isMatchedGrade = leaderboardGradeFilter === 'Tất cả' || item.class.includes(`Khối ${leaderboardGradeFilter}`) || item.class.includes(`Lớp ${leaderboardGradeFilter}`);
    const isMatchedClassroom = leaderboardClassroomFilter === 'Tất cả lớp' || item.class.includes(leaderboardClassroomFilter);
    const isMatchedSearch = item.name.toLowerCase().includes(leaderboardSearchQuery.toLowerCase()) || item.class.toLowerCase().includes(leaderboardSearchQuery.toLowerCase());
    return isMatchedGrade && isMatchedClassroom && isMatchedSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col antialiased">
      
      {/* Toast Render */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className={`p-4 rounded-xl shadow-xl border text-white flex items-center justify-between pointer-events-auto transition-transform ${
            t.type === 'success' ? 'bg-emerald-600 border-emerald-500' :
            t.type === 'warning' ? 'bg-amber-600 border-amber-500' :
            t.type === 'error' ? 'bg-rose-600 border-rose-500' : 'bg-blue-600 border-blue-500'
          }`}>
            <span className="text-xs font-bold font-display">{t.message}</span>
            <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} className="ml-4 text-[10px] underline uppercase font-black tracking-widest opacity-80 hover:opacity-100">Xóa</button>
          </div>
        ))}
      </div>

      {/* Confirmation modal */}
      {dialogConfig && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-100 shadow-2xl space-y-4 animate-fadeIn">
            <h3 className="font-extrabold text-slate-900 text-sm font-display tracking-tight flex items-center gap-2">
              <AlertCircle className="text-amber-500" /> {dialogConfig.title}
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed">{dialogConfig.message}</p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button 
                onClick={dialogConfig.onCancel}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button 
                onClick={dialogConfig.onConfirm}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors shadow-md shadow-indigo-100"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {systemConfig.maintenanceMode && !isAdminLoggedIn ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-tr from-slate-50 relative overflow-hidden to-white py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-100/10 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="w-full max-w-2xl px-4 py-8 flex flex-col items-center space-y-8 animate-fadeIn relative z-10">
            
            {/* Warning alert symbol with circle */}
            <div className="relative">
              <div className="w-20 h-20 bg-rose-50 rounded-[28px] flex items-center justify-center border border-rose-105 shadow-lg animate-pulse">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border-2 border-rose-500 shadow-md">
                  <AlertCircle className="w-8 h-8 text-rose-500" />
                </div>
              </div>
            </div>

            {/* Display names */}
            <div className="space-y-3 text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display uppercase">
                Hệ Thống <span className="text-rose-600 font-black">Bảo Trì</span>
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold max-w-md mx-auto leading-relaxed">
                Chúng tôi đang thực hiện một số nâng cấp quan trọng để cải thiện hiệu suất. Vui lòng quay lại sau!
              </p>
            </div>

            {/* Estimated execution time badge */}
            <div className="flex items-center gap-1.5 px-4.5 py-2 bg-slate-50 border border-slate-150 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-500 shadow-inner flex-row">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>THỜI GIAN DỰ KIẾN: {systemConfig.maintenanceTime || 'BT'}</span>
            </div>

            {/* Subtle dividing line */}
            <div className="w-64 border-t border-slate-200/85 my-4"></div>

            {/* Admin entry portal section */}
            {!showLoginOnMaintenance ? (
              <button
                type="button"
                onClick={() => setShowLoginOnMaintenance(true)}
                className="text-[10px] font-black tracking-widest text-slate-400 hover:text-indigo-600 uppercase transition-colors"
              >
                QUẢN TRỊ VIÊN ĐĂNG NHẬP
              </button>
            ) : (
              <div className="w-full max-w-sm bg-white p-6 rounded-2xl border border-slate-150 shadow-xl space-y-4 animate-scaleIn">
                <div className="text-center">
                  <span className="block text-[9px] font-black tracking-widest text-indigo-600 uppercase">CỔNG XÁC THỰC</span>
                  <h3 className="text-sm font-black text-slate-800 uppercase mt-0.5 animate-pulse">XÁC MINH BAN QUẢN TRỊ</h3>
                </div>
                
                <form onSubmit={handleAdminLogin} className="space-y-3 text-left">
                  <div className="space-y-1">
                    <label className="block text-[9px] font-black text-slate-500 uppercase tracking-wider">Email Quản trị viên</label>
                    <input
                      type="email"
                      required
                      value={authForm.email}
                      onChange={(e) => setAuthForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Nhập email..."
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-500 bg-slate-50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[9px] font-black text-slate-500 uppercase tracking-wider">Mật khẩu</label>
                    <input
                      type="password"
                      required
                      value={authForm.password}
                      onChange={(e) => setAuthForm(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Nhập mật khẩu..."
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-500 bg-slate-50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] py-2.5 rounded-xl transition-all uppercase tracking-wider shadow-md shadow-indigo-100"
                  >
                    Xác nhận kết nối
                  </button>
                </form>

                <button
                  type="button"
                  onClick={() => setShowLoginOnMaintenance(false)}
                  className="text-[9px] font-black tracking-wider text-slate-400 hover:text-slate-600 uppercase underline"
                >
                  Quay lại thông báo bảo trì
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Hero Header component */}
          <section className="bg-gradient-to-r from-orange-600 via-indigo-950 to-slate-900 text-white py-12 px-6 shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-400/10 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="text-left space-y-4 max-w-2xl">
            <span className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
              🚀 QUIZMASTER LỊCH SỬ & ĐỊA LÍ THCS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none font-display">
              Học & Khảo Thí <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">Lịch Sử & Địa Lí</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Học liệu đề cương, ngân hàng câu hỏi bám sát chương trình Giáo dục phổ thông mới. Ôn luyện cực đỉnh có xếp hạng học sinh trực tiếp.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1.5">
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 text-center">
                <span className="block font-black text-[9px] text-orange-400 uppercase">Khối lớp</span>
                <span className="block text-xs font-black text-white">6, 7, 8, 9</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 text-center">
                <span className="block font-black text-[9px] text-orange-400 uppercase">Khảo thí</span>
                <span className="block text-xs font-black text-white">200+ đề</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 text-center">
                <span className="block font-black text-[9px] text-orange-400 uppercase">Trợ lý</span>
                <span className="block text-xs font-black text-white">Gemini AI</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 w-full max-w-sm flex flex-col justify-between space-y-3 shadow-2xl">
            <span className="block text-xs font-black text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 animate-pulse" /> Đấu trường trực diện
            </span>
            <p className="text-[11px] text-slate-300">Nhập mã phòng đấu thi trực tuyến do giáo viên / giám thị chuẩn bị sẵn.</p>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ví dụ: OT9_D1_06_06" 
                value={roomCodeInput}
                onChange={(e) => setRoomCodeInput(e.target.value)}
                className="w-full bg-slate-950/60 border border-white/15 text-white px-3 py-2.5 rounded-xl text-xs font-extrabold uppercase focus:outline-none focus:border-orange-500"
              />
              <button 
                type="button"
                onClick={(e) => handleJoinPrivateRoom(e, null)}
                className="absolute right-1 top-1 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-[10px] px-3.5 py-1.5 rounded-lg transition-transform"
              >
                Vào thi
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-250/80 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('portal')}>
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-md">
              <span className="font-extrabold text-sm">Q</span>
            </div>
            <div>
              <span className="font-black text-xs text-slate-900 tracking-tight block uppercase font-display">QUIZMASTER</span>
              <span className="text-[9px] text-slate-400 font-extrabold block uppercase tracking-wider">Lịch sử & Địa lí</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setCurrentView('portal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-colors ${currentView === 'portal' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Trang Chủ
            </button>
            <button
              onClick={() => setCurrentView('lobby')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-colors ${currentView === 'lobby' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Đấu Trường Live
            </button>
            <button
              onClick={() => setCurrentView('leaderboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-colors ${currentView === 'leaderboard' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Bảng Vinh Danh
            </button>
            {isAdminLoggedIn && (
              <>
                <button
                  onClick={() => setCurrentView('create-question')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-colors ${currentView === 'create-question' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Biên Soạn Kho
                </button>
                <button
                  onClick={() => setCurrentView('admin')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-colors ${currentView === 'admin' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Phần Hệ Quản Trị
                </button>
              </>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-slate-700 uppercase">{userData.name !== 'Chưa danh tính' ? userData.name.split(' ').pop() : 'HỌC SINH'}</span>
            </div>
          </div>

        </div>
      </header>

      {/* Mobile view subheader menu */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2 flex gap-2 overflow-x-auto scrollbar-none sticky top-16 z-30 shadow-sm">
        <button
          onClick={() => setCurrentView('portal')}
          className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-[10px] font-black transition-colors shrink-0 ${currentView === 'portal' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'}`}
        >
          Trang Chủ
        </button>
        <button
          onClick={() => setCurrentView('lobby')}
          className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-[10px] font-black transition-colors shrink-0 ${currentView === 'lobby' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'}`}
        >
          Live Đấu Trường
        </button>
        <button
          onClick={() => setCurrentView('leaderboard')}
          className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-[10px] font-black transition-colors shrink-0 ${currentView === 'leaderboard' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'}`}
        >
          Vinh Danh
        </button>
        {isAdminLoggedIn && (
          <>
            <button
              onClick={() => setCurrentView('create-question')}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-[10px] font-black transition-colors shrink-0 ${currentView === 'create-question' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              Biên Soạn
            </button>
            <button
              onClick={() => setCurrentView('admin')}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-[10px] font-black transition-colors shrink-0 ${currentView === 'admin' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              Quản Trị
            </button>
          </>
        )}
      </div>

      {/* Main Structural Area */}
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-1 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col space-y-6">
          
          {/* Student ID badge */}
          <div className="bg-white rounded-2xl p-5 border border-slate-150 shadow-sm flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
              <User className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-slate-900 leading-tight">{userData.name}</h3>
              <div className="flex flex-col items-center gap-0.5 text-[10px] text-slate-400 font-extrabold">
                <span className="text-indigo-600 flex items-center gap-1"><School className="w-3.5 h-3.5" /> THCS</span>
                <span>{userData.grade} • {userData.school}</span>
              </div>
            </div>
            <button 
              onClick={() => {
                setEditProfileData({
                  name: userData.name !== 'Chưa danh tính' ? userData.name : '',
                  grade: userData.grade !== 'Lớp ...' ? userData.grade : '',
                  school: userData.school !== 'Chưa chọn trường' ? userData.school : ''
                });
                setIsEditingProfile(true);
              }}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-[10px] py-2.5 rounded-lg tracking-wider transition-colors uppercase"
            >
              Khởi tạo danh tính
            </button>
            {!isAdminLoggedIn ? (
              <button 
                onClick={() => setCurrentView('admin')}
                className="w-full flex items-center justify-center gap-1.5 text-slate-400 hover:text-slate-600 font-extrabold text-[9px] uppercase tracking-widest pt-2 border-t border-slate-100 transition-colors"
                title="Cổng dành riêng cho Quản trị viên và Giáo viên chuyên môn"
              >
                <Key className="w-3 h-3 text-slate-400" /> Cổng Giáo Viên
              </button>
            ) : (
              <div className="w-full flex flex-col gap-1.5 pt-2 border-t border-slate-100">
                <button 
                  onClick={() => setCurrentView('admin')}
                  className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-black text-[9px] py-2 rounded-lg uppercase tracking-wider transition-colors"
                >
                  ⚙️ Bảng Quản Trị
                </button>
                <button 
                  onClick={() => setCurrentView('create-question')}
                  className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-black text-[9px] py-2 rounded-lg uppercase tracking-wider transition-colors"
                >
                  ✏️ Biên soạn đề
                </button>
              </div>
            )}
          </div>

          {/* Quick links block */}
          <div className="bg-white rounded-2xl p-4 border border-slate-150 shadow-sm space-y-1">
            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-2.5 mb-2.5">LIÊN KẾT NHANH</span>
            <button 
              onClick={() => setCurrentView('portal')}
              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-bold transition-colors ${currentView === 'portal' ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Home className="w-4 h-4" /> Trang Chủ Portal
            </button>
            <button 
              onClick={() => setCurrentView('lobby')}
              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-bold transition-colors ${currentView === 'lobby' ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Users className="w-4 h-4" /> Phòng Thi Live
            </button>
            <button 
              onClick={() => setCurrentView('leaderboard')}
              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-bold transition-colors ${currentView === 'leaderboard' ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Trophy className="w-4 h-4" /> Bảng Vinh Danh
            </button>
          </div>

          {/* Grade filter fast button */}
          <div className="bg-white rounded-2xl p-4 border border-slate-150 shadow-sm space-y-1">
            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-2.5 mb-2.5">PHÂN KHỐI THCS</span>
            {['6', '7', '8', '9'].map(g => (
              <button 
                key={g} 
                onClick={() => {
                  setPracticeConfig(prev => ({ ...prev, grade: g }));
                  setCurrentView('portal');
                  showToast(`Đã chọn học liệu Lịch sử & Địa lí lớp ${g}!`, 'info');
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-bold transition-colors ${practiceConfig.grade === g && currentView === 'portal' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <span>📘 Học liệu lớp {g}</span>
                <span className="bg-slate-100 text-slate-500 text-[9px] px-2 py-0.5 rounded-full font-black">LỚP {g}</span>
              </button>
            ))}
          </div>

          {/* Anti-cheat status center */}
          <div className="bg-white rounded-2xl p-4 border border-slate-150 shadow-sm space-y-3">
            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-2.5">GIÁM SÁT THI ĐẤU</span>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-500">Khóa phím chuột F12</span>
                <button
                  type="button"
                  onClick={() => {
                    const newVal = !systemConfig.blockF12;
                    syncSystemSettings({ blockF12: newVal });
                    showToast(`Đã ${newVal ? 'BẬT' : 'TẮT'} khóa phím chuột F12 chống gian lận!`, 'info');
                  }}
                  className={`px-2 py-0.5 rounded text-[9px] font-black cursor-pointer hover:opacity-80 transition-all ${systemConfig.blockF12 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}
                >
                  {systemConfig.blockF12 ? 'BẬT 🔓' : 'TẮT 🔒'}
                </button>
              </div>
              <p className="text-[10px] text-slate-450 leading-relaxed">
                Ngăn chặn hành vi sao chép bóc tách mã đề, chụp màn hình phi pháp bằng bảng điều khiển DevTools. Nhấp nút trên để điều chỉnh tự do.
              </p>
            </div>
          </div>

        </aside>

        {/* Master Content */}
        <main className="flex-1 min-w-0">

          {/* VIEW: PORTAL (Trang chủ sinh sinh hoạt) */}
          {currentView === 'portal' && (
            <div className="space-y-10 animate-fadeIn">
              
              {/* Practice Configuration Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="bg-indigo-50 text-indigo-700 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded">CHẾ ĐỘ TỰ LUYỆN</span>
                    <h4 className="font-black text-slate-900 text-sm mt-2">🎯 Ôn luyện Lịch Sử & Địa Lí nhanh</h4>
                    <p className="text-[11px] text-slate-450">Tạo đề thi ngẫu nhiên gồm 15 câu ôn luyện cấp tốc phục vụ kiểm tra hệ liên khóa.</p>
                  </div>
                  
                  {/* Select Grade */}
                  <div className="space-y-1.5">
                    <span className="block text-[10px] text-slate-400 font-extrabold uppercase">1. CHỌN KHỐI TỰ LUYỆN THCS</span>
                    <div className="grid grid-cols-4 gap-2">
                      {['6', '7', '8', '9'].map(g => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => {
                            const defaults = customClasses[g] || [];
                            setPracticeConfig(prev => ({ 
                              ...prev, 
                              grade: g, 
                              subClass: defaults[0] || `${g}/1` 
                            }));
                          }}
                          className={`py-2 rounded-xl text-xs font-black border transition-all ${practiceConfig.grade === g ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                        >
                          Khối {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Class Selection Mode */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="block text-[10px] text-slate-400 font-extrabold uppercase">2. CHỌN LỚP ÔN LUYỆN</span>
                      <button
                        type="button"
                        onClick={() => {
                          setClassImportState({
                            isOpen: true,
                            grade: practiceConfig.grade,
                            inputText: (customClasses[practiceConfig.grade] || []).join(', ')
                          });
                        }}
                        className="text-[10px] text-indigo-600 hover:text-indigo-800 font-extrabold flex items-center gap-1 hover:underline"
                      >
                        📂 Nhập lớp Khối {practiceConfig.grade}
                      </button>
                    </div>

                    {/* Show list of sub-classes directly */}
                    <div className="grid grid-cols-4 gap-1 mt-1 border p-2 rounded-xl bg-slate-50 animate-fadeIn">
                      {(customClasses[practiceConfig.grade] || []).map(cls => (
                        <button
                          key={cls}
                          type="button"
                          onClick={() => setPracticeConfig(prev => ({ ...prev, subClass: cls }))}
                          className={`py-1 text-[10.5px] font-extrabold rounded border transition-all ${practiceConfig.subClass === cls ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                        >
                          {cls}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={handleStartPractice}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-extrabold text-xs rounded-xl tracking-wider transition-colors uppercase shadow-md shadow-indigo-100 animate-pulse"
                  >
                    Bắt đầu làm bài Khối {practiceConfig.grade} (Lớp {practiceConfig.subClass}) 🚀
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="bg-purple-50 text-purple-700 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded">HỆ LIÊN KHÓA HỌC PHẦN</span>
                    <h4 className="font-black text-slate-900 text-sm mt-3">🌟 Trận lội ngược dòng liên khóa học</h4>
                    <p className="text-[11px] text-slate-450">Thi đấu phục hồi, giật điểm bứt phá phục vụ các lớp 6,7,8,9.</p>
                  </div>
                  
                  {/* Select Grade Block */}
                  <div className="space-y-2">
                    <span className="block text-[10px] text-slate-450 font-black uppercase">1. CHỌN KHỐI HỌC TẬP THCS</span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {['6', '7', '8', '9'].map(gradeValue => (
                        <button
                          key={gradeValue}
                          type="button"
                          onClick={() => {
                            setComebackGrade(gradeValue);
                            const defaults = customClasses[gradeValue] || [];
                            setComebackClass(defaults[0] || `${gradeValue}/1`);
                          }}
                          className={`py-1.5 rounded-lg text-xs font-black border transition-all ${comebackGrade === gradeValue ? 'bg-purple-600 border-purple-600 text-white shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                        >
                          Khối {gradeValue}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Class */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="block text-[10px] text-slate-450 font-black uppercase">2. CHỌN LỚP HỌC</span>
                      <button
                        type="button"
                        onClick={() => {
                          setClassImportState({
                            isOpen: true,
                            grade: comebackGrade,
                            inputText: (customClasses[comebackGrade] || []).join(', ')
                          });
                        }}
                        className="text-[10px] text-purple-600 hover:text-purple-800 font-extrabold flex items-center gap-1 hover:underline"
                      >
                        📂 Nhập lớp Khối {comebackGrade}
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(customClasses[comebackGrade] || []).map(subClass => (
                        <button
                          key={subClass}
                          type="button"
                          onClick={() => setComebackClass(subClass)}
                          className={`py-1.5 rounded-lg text-[11px] font-black border transition-all ${comebackClass === subClass ? 'bg-purple-100 border-purple-300 text-purple-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                        >
                          Lớp {subClass}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Practice Trigger Action */}
                  <button 
                    onClick={() => handleStartComebackTournament(comebackGrade, comebackClass)}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl tracking-wider transition-all uppercase shadow-md shadow-purple-100"
                  >
                    🚀 Trận Lội Ngược Dòng Lớp {comebackClass}
                  </button>

                  <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-[10px] text-indigo-700 font-medium leading-relaxed">
                    💡 Chế độ đặc biệt cho các lớp trợ giảng <strong>{comebackClass}</strong> thi đua nhanh, phục hồi kiến thức Địa Lí & Lịch Sử THCS.
                  </div>
                </div>

              </div>

              {/* MOST DOWNLOADED MATERIALS */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-md">
                    HỌC LIỆU TẢI NHIỀU NHẤT
                  </span>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Hệ thống giáo trình chuẩn hóa</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {MOST_DOWNLOADED_RESOURCES.map(res => (
                    <div 
                      key={res.id} 
                      className={`bg-white p-3.5 rounded-xl border-2 ${res.color} shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3`}
                    >
                      <div className="space-y-2">
                        <div className="w-full h-16 rounded-lg bg-gradient-to-br from-indigo-50 to-orange-100 flex items-center justify-center relative overflow-hidden">
                          <span className="text-xl">🏆</span>
                          <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase">K{res.grade}</span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-xs leading-tight line-clamp-2 h-8 min-h-[32px]">
                          {res.title}
                        </h4>
                        <div className="flex items-center justify-between text-[9px] font-extrabold text-slate-400">
                          <span>📝 {res.questions} câu</span>
                          <span>📥 {res.downloads} tải</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleStartResourcePractice(res)}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black rounded-lg transition-colors uppercase tracking-wider"
                      >
                        Vào làm đề
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* NEWEST EXAMS */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-md">
                    ĐỀ KIỂM TRA MỚI NHẤT
                  </span>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Cập nhật bởi giáo viên liên tục</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {NEWEST_RESOURCES.map(res => (
                    <div 
                      key={res.id} 
                      className={`bg-white p-3.5 rounded-xl border-2 ${res.color} shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3`}
                    >
                      <div className="space-y-2">
                        <div className="w-full h-16 rounded-lg bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center relative overflow-hidden">
                          <span className="text-xl">⚡</span>
                          <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase">K{res.grade}</span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-xs leading-tight line-clamp-2 h-8 min-h-[32px]">
                          {res.title}
                        </h4>
                        <div className="flex items-center justify-between text-[9px] font-extrabold text-slate-400">
                          <span>📝 {res.questions} câu</span>
                          <span>📥 {res.downloads} tải</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleStartResourcePractice(res)}
                        className="w-full py-2 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200 text-[10px] font-black rounded-lg transition-colors uppercase tracking-wider"
                      >
                        Luyện ngay
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* VIEW: LOBBY (Đấu Trường Live list) */}
          {currentView === 'lobby' && (
            <div className="space-y-8 animate-fadeIn">
              
              <div className="bg-gradient-to-r from-violet-600 to-indigo-700 text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-black flex items-center gap-2">
                    <span>👥</span> ĐẤU TRƯỜNG KHẢO THÍ TRỰC TUYẾN
                  </h2>
                  <p className="text-xs opacity-90">Kỳ ôn tập thời gian thực bám sát trường THCS. Quản trị điểm bởi cô Dương Thị Hiệp.</p>
                </div>
                <button 
                  onClick={() => setIsCreateRoomOpen(true)}
                  className="bg-white text-indigo-700 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-lg hover:bg-slate-50 transition-colors shrink-0"
                >
                  Create Live Room +
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                    <span>🔑</span> VÀO PHÒNG BẰNG MÃ SỐ
                  </h3>
                  <p className="text-[11px] text-slate-450 leading-relaxed">
                    Nhập mã phòng đấu 6 ký tự để kết xuất đề thi online chính xác do giáo viên chỉ định.
                  </p>
                  <div className="space-y-2">
                    <input 
                      type="text" 
                      placeholder="MÃ PHÒNG (Ví dụ: ROOM1...)" 
                      value={roomCodeInput}
                      onChange={(e) => setRoomCodeInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3.5 py-2.5 rounded-xl text-xs font-black uppercase focus:outline-none focus:border-indigo-500"
                    />
                    <button 
                      onClick={(e) => handleJoinPrivateRoom(e, null)}
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl transition-colors shadow-md shadow-indigo-100 uppercase tracking-widest"
                    >
                      Kết Nối Ngay
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2 bg-white p-5 rounded-2xl border border-slate-150 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-900 text-xs sm:text-sm">🏫 DANH SÁCH CÁC PHÒNG ĐẤU ACTIVE ({examRooms.length})</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {examRooms.map(room => (
                      <div key={room.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 hover:border-indigo-300 transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">MÃ: {room.code}</span>
                          <span className="bg-emerald-100 text-emerald-800 text-[8px] font-black uppercase px-2 py-0.5 rounded">ONLINE</span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-xs leading-snug line-clamp-2 h-8 min-h-[32px]">{room.title}</h4>
                        <div className="grid grid-cols-3 gap-1 text-[9px] font-black text-indigo-700 text-center uppercase tracking-widest">
                          <div className="bg-indigo-50 py-1 rounded">Khối {room.grade}</div>
                          <div className="bg-indigo-50 py-1 rounded">{room.duration}p</div>
                          <div className="bg-indigo-50 py-1 rounded">{room.questions} câu</div>
                        </div>
                        <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 mt-1">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleCopyRoomInvite(room)}
                              className="flex-1 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 hover:text-indigo-800 text-[10px] font-black rounded-lg transition-colors uppercase tracking-wider border border-indigo-200 flex items-center justify-center gap-1 cursor-pointer select-none"
                              title="Sao chép toàn bộ nội dung thư mời phòng thi"
                            >
                              📋 Sao chép
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDownloadRoomInvite(room)}
                              className="flex-1 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 text-[10px] font-black rounded-lg transition-colors uppercase tracking-wider border border-emerald-200 flex items-center justify-center gap-1 cursor-pointer select-none"
                              title="Tải thẻ hướng dẫn nộp hồ sơ thi học sinh (.txt)"
                            >
                              📥 Tải mã
                            </button>
                          </div>
                          <button 
                            onClick={(e) => handleJoinPrivateRoom(e, room.code)}
                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-lg transition-colors uppercase tracking-wider shadow-sm select-none cursor-pointer"
                          >
                            Tham gia thi
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* VIEW: LEADERBOARD */}
          {currentView === 'leaderboard' && (
            <div className="space-y-8 animate-fadeIn">
              
              <div className="text-center py-2 space-y-1">
                <h2 className="text-2xl font-black text-slate-950 tracking-tight font-display uppercase">Bảng Vinh Danh Danh Dự 🏆</h2>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Tôn vinh nỗ lực học sinh Lịch Sử & Địa Lí THCS</p>
              </div>

              {examRecap && (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 p-6 rounded-2xl relative space-y-3">
                  <button onClick={() => setExamRecap(null)} className="absolute top-3 right-3 text-emerald-600 font-black text-sm">✕</button>
                  <div className="space-y-1">
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider">KẾT QUẢ Vừa LẬP</span>
                    <h3 className="font-black text-slate-900 text-sm font-display mt-2">{examRecap.title}</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white p-3 rounded-xl border border-emerald-100/50">
                      <span className="block text-[9px] text-slate-400 font-extrabold uppercase mb-1">Số câu đúng</span>
                      <span className="block text-sm font-black text-emerald-600">{examRecap.correctCount} / {examRecap.questionsCount}</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-emerald-100/50">
                      <span className="block text-[9px] text-slate-400 font-extrabold uppercase mb-1">Thời gian</span>
                      <span className="block text-xs font-black text-slate-600">{examRecap.timeStr}</span>
                    </div>
                    <div className="bg-emerald-600 p-3 rounded-xl text-white">
                      <span className="block text-[9px] text-emerald-200 font-black uppercase mb-1">ĐIỂM SỐ</span>
                      <span className="block text-sm font-black font-mono">{examRecap.score}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-3 border-slate-100">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    <div className="flex flex-wrap gap-1">
                      {['Tất cả', '6', '7', '8', '9'].map(grade => (
                        <button
                          key={grade}
                          onClick={() => {
                            setLeaderboardGradeFilter(grade);
                            setLeaderboardClassroomFilter('Tất cả lớp');
                          }}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            leaderboardGradeFilter === grade 
                              ? 'bg-indigo-600 text-white shadow-md' 
                              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {grade === 'Tất cả' ? 'Tất cả khối' : `Khối ${grade}`}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-150 px-2 py-1 rounded-lg">
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase">Lớp học:</span>
                      <select
                        value={leaderboardClassroomFilter}
                        onChange={(e) => setLeaderboardClassroomFilter(e.target.value)}
                        className="bg-transparent text-slate-700 text-xs font-black focus:outline-none cursor-pointer"
                      >
                        <option value="Tất cả lớp">Tất cả lớp</option>
                        {['6', '7', '8', '9'].filter(g => leaderboardGradeFilter === 'Tất cả' || leaderboardGradeFilter === g).flatMap(g => 
                          [`6/1`, `6/2`, `6/3`, `6/4`, `6/5`, `6/6`, `7/1`, `7/2`, `7/3`, `7/4`, `7/5`, `7/6`, `8/1`, `8/2`, `8/3`, `8/4`, `8/5`, `8/6`, `9/1`, `9/2`, `9/3`, `9/4`, `9/5`, `9/6`].filter(c => c.startsWith(g))
                        ).map(clsName => (
                          <option key={clsName} value={`Lớp ${clsName}`}>Lớp {clsName}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={handleDownloadClassList}
                      title="Tải danh sách học sinh theo lớp hiện tại"
                      className="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-150 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
                    >
                      <Download className="w-3 h-3" /> Tải danh sách lớp
                    </button>
                  </div>
                  <div className="relative w-full sm:w-64">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <Search className="w-3.5 h-3.5" />
                    </span>
                    <input 
                      type="text" 
                      placeholder="Tìm kiếm tên học sinh..." 
                      value={leaderboardSearchQuery}
                      onChange={(e) => setLeaderboardSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto text-xs font-semibold">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase border-b tracking-wider">
                      <tr>
                        <th className="p-3 pl-5 text-center w-16">Hạng</th>
                        <th className="p-3">Học Sinh</th>
                        <th className="p-3">Đơn Vị Trường Lớp</th>
                        <th className="p-3 text-center">Thời Gian</th>
                        <th className="p-3 text-right pr-5">Điểm Số</th>
                        <th className="p-3 text-center w-20">Xóa</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLeaderboard.map((item, index) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 pl-5 text-center">
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center mx-auto text-[10px] font-black ${
                              index === 0 ? 'bg-amber-100 text-amber-800' :
                              index === 1 ? 'bg-slate-200 text-slate-800' :
                              index === 2 ? 'bg-orange-100 text-orange-850' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {index + 1}
                            </span>
                          </td>
                          <td className="p-3 font-black text-slate-900 uppercase tracking-tight">{item.name}</td>
                          <td className="p-3 text-slate-500 text-[11px]">{item.class}</td>
                          <td className="p-3 text-center text-slate-400 text-[11px] font-mono">{item.time}</td>
                          <td className="p-3 text-right pr-5 text-indigo-600 font-extrabold text-sm font-mono">{item.score}đ</td>
                          <td className="p-3 text-center">
                            <button
                              type="button"
                              onClick={() => handleDeleteLeaderboardEntry(item.id)}
                              className="text-rose-600 hover:text-rose-800 p-1.5 rounded-lg hover:bg-rose-50 transition-colors inline-flex items-center justify-center"
                              title="Xóa học sinh này khỏi bảng vinh danh"
                            >
                              <Trash className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredLeaderboard.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-400 italic">Chưa có kết quả vinh danh ghi nhận khối thi này.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* VIEW: CREATE QUESTION (Biên soạn câu hỏi và nạp AI) */}
          {currentView === 'create-question' && (
            !isAdminLoggedIn ? (
              <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-150 shadow-xl overflow-hidden animate-fadeIn p-6 sm:p-8 text-center space-y-4">
                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto shadow-inner text-rose-500">
                  <Lock className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="text-sm font-black text-rose-600 uppercase font-display tracking-tight">Quyền truy cập bị giới hạn</h3>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Chỉ có Giáo viên / Quản trị viên (Cô Dương Thị Hiệp) mới được quyền Biên soạn Kho học liệu này. Học sinh vui lòng không thao tác khu vực này.
                </p>
                <button
                  onClick={() => setCurrentView('admin')}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl transition-colors uppercase tracking-wider"
                >
                  Đi tới Đăng nhập Quản Trị
                </button>
              </div>
            ) : (
              <div className="space-y-6 animate-fadeIn">
              
              <div>
                <h2 className="text-2xl font-black text-slate-950 tracking-tight font-display flex items-center gap-2">
                  <span>✏️</span> BIÊN SOẠN KHẢO THÍ SỐ HỌC
                </h2>
                <p className="mt-1 text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">
                  Soạn tay học trình, tải file JSON hoặc đồng bộ hóa trực tiếp nhờ trợ lý Gemini AI
                </p>
              </div>

              {/* Data Import / Export managers */}
              <div className="bg-white p-4 rounded-2xl border border-slate-150 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <span className="block text-xs font-black text-slate-900 uppercase tracking-tight">📁 Quản lý kho tàng học liệu</span>
                  <span className="block text-[10px] text-slate-450 uppercase font-bold">Lưu giữ, sao lưu dự trữ kho tàng đề thi an toàn</span>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <input 
                    type="file" 
                    id="import-questions-file-input"
                    ref={importQuestionsUploaderRef} 
                    accept=".json" 
                    onChange={handleImportQuestions} 
                    className="hidden" 
                  />
                  <label 
                    htmlFor="import-questions-file-input"
                    className="cursor-pointer flex-1 sm:flex-none text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-[11px] px-3.5 py-2 rounded-lg transition-colors uppercase tracking-wider flex items-center justify-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" /> Nạp đề JSON
                  </label>
                  <button 
                    onClick={handleExportQuestions}
                    className="flex-1 sm:flex-none text-center bg-indigo-55/60 hover:bg-indigo-100 text-indigo-700 font-extrabold text-[11px] px-3.5 py-2 rounded-lg transition-colors uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" /> Tải ngân hàng
                  </button>
                </div>
              </div>

              {/* Gemini AI Integration Box */}
              <div className="bg-slate-950 text-white rounded-2xl p-5 border border-white/10 space-y-4 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-950/20 via-transparent to-transparent"></div>
                <div className="flex items-center gap-2 relative z-10">
                  <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                  <span className="font-black text-xs tracking-wider uppercase text-indigo-300 font-display">Tạo câu hỏi tự động bám sát tài liệu</span>
                </div>

                <input 
                  type="file"
                  id="ai-doc-uploader-file-input"
                  ref={aiDocUploaderRef}
                  accept=".txt,.json,.md,.csv,.pdf"
                  onChange={handleDocumentUpload}
                  className="hidden"
                />

                <textarea 
                  rows="3"
                  placeholder="Dán bài học địa lí lịch sử thô tại đây hoặc nạp file txt/md/pdf tải lên để AI tự động chuyển hóa thành câu hỏi trắc nghiệm chất lượng..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-semibold relative z-10"
                ></textarea>

                <div className="flex flex-wrap gap-2 justify-between items-center relative z-10">
                  <div className="flex items-center gap-2">
                    <label 
                      htmlFor="ai-doc-uploader-file-input"
                      className="cursor-pointer bg-white/10 hover:bg-white/15 border border-white/10 text-white text-[11px] font-black px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 animate-pulse"
                    >
                      📂 Nạp tài liệu (txt/md/pdf)
                    </label>
                    {aiPrompt && (
                      <button 
                        type="button"
                        onClick={() => {
                          setAiPrompt('');
                          showToast('Đã xóa nội dung tài liệu thành công! 🗑️', 'info');
                        }}
                        className="bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800/50 text-rose-200 text-[11px] font-black px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                        title="Xóa tài liệu hiện tại"
                      >
                        <Trash className="w-3.5 h-3.5" /> Xóa tài liệu
                      </button>
                    )}
                  </div>
                  
                  <button 
                    onClick={handleGenerateQuestionWithAI}
                    disabled={isAiGenerating}
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-extrabold text-xs px-5 py-2 rounded-lg transition-all shadow-lg shadow-indigo-900/40"
                  >
                    {isAiGenerating ? '🤖 Đang phân tích...' : '🤖 Trích xuất bằng Gemini AI'}
                  </button>
                </div>
              </div>

              {/* Advanced creation form */}
              <form onSubmit={handleSaveQuestion} className="bg-white rounded-2xl p-6 border border-slate-150 shadow-sm space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">KHỐI LỚP HỌC</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['6', '7', '8', '9'].map(g => (
                        <button
                          type="button"
                          key={g}
                          onClick={() => setNewQuestion(prev => ({ ...prev, grade: g }))}
                          className={`py-2 rounded-lg text-xs font-black border transition-colors ${newQuestion.grade === g ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-600'}`}
                        >
                          Lớp {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">PHÂN PHẦN ÔN TẬP (CATEGORY)</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['OT1', 'OT2', 'OT3', 'BỔ SUNG'].map(cat => (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => setNewQuestion(prev => ({ ...prev, category: cat }))}
                          className={`py-2 rounded-lg text-xs font-black border transition-colors ${newQuestion.category === cat ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-600'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">SỐ THỨ TỰ CÂU HỎI (STT)</label>
                    <input 
                      type="text" 
                      placeholder="Nếu trống hệ thống tự nâng hạng..."
                      value={newQuestion.stt}
                      onChange={(e) => setNewQuestion(prev => ({ ...prev, stt: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-indigo-500 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">LOẠI ĐỀ TRẮC NGHIỆM</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { key: 'SINGLE', name: 'Một đáp án' },
                        { key: 'MULTIPLE', name: 'Nhiều đáp án đúng' },
                        { key: 'TRUE FALSE', name: 'Đúng hay sai' },
                        { key: 'SHORT_ANSWER', name: 'Trả lời ngắn' }
                      ].map(type => (
                        <button
                          type="button"
                          key={type.key}
                          onClick={() => setNewQuestion(prev => ({ 
                            ...prev, 
                            type: type.key, 
                            correctAnswer: type.key === 'TRUE FALSE' ? 0 : (type.key === 'SHORT_ANSWER' ? '' : 0) 
                          }))}
                          className={`py-2 rounded-lg text-xs font-black border transition-colors ${newQuestion.type === type.key ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-600'}`}
                        >
                          {type.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">NỘI DUNG CÂU HỎI TRẮC NGHIỆM</label>
                  <textarea 
                    rows="2"
                    placeholder="Điền thông tin mô tả chi tiết của câu hỏi lịch sử..."
                    value={newQuestion.content}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-indigo-500 bg-slate-50"
                  ></textarea>
                </div>

                {newQuestion.type === 'SINGLE' || newQuestion.type === 'MULTIPLE' ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">CÁC PHƯƠNG ÁN ĐỒNG BỘ ({newQuestion.options.length})</span>
                      <button 
                        type="button" 
                        onClick={() => setIsQuickImportOpen(!isQuickImportOpen)}
                        className="text-[10px] bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-200 font-extrabold uppercase tracking-wider"
                      >
                        ⚡ Nhập nhanh
                      </button>
                    </div>

                    {isQuickImportOpen && (
                      <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl space-y-3">
                        <span className="block text-[10px] text-slate-500 font-black uppercase">Nhập nhanh phương án (mỗi lựa chọn một dòng)</span>
                        <textarea 
                          rows="3"
                          placeholder="Chọn A&#10;Chọn B&#10;Chọn C..."
                          value={quickImportText}
                          onChange={(e) => setQuickImportText(e.target.value)}
                          className="w-full p-2.5 bg-white text-xs border border-slate-200 rounded-lg text-slate-800"
                        ></textarea>
                        <button type="button" onClick={handleQuickImport} className="bg-indigo-600 text-white font-bold text-[10px] px-3 py-1 rounded">Xác nhận đồng bộ</button>
                      </div>
                    )}

                    <div className="space-y-2">
                      {newQuestion.options.map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input 
                            type={newQuestion.type === 'MULTIPLE' ? 'checkbox' : 'radio'}
                            name="correct_ans_sel"
                            checked={
                              newQuestion.type === 'MULTIPLE'
                                ? (Array.isArray(newQuestion.correctAnswer) ? newQuestion.correctAnswer.includes(idx) : [newQuestion.correctAnswer].includes(idx))
                                : newQuestion.correctAnswer === idx
                            }
                            onChange={() => {
                              if (newQuestion.type === 'MULTIPLE') {
                                const currentCorrects = Array.isArray(newQuestion.correctAnswer) 
                                  ? [...newQuestion.correctAnswer] 
                                  : [newQuestion.correctAnswer];
                                if (currentCorrects.includes(idx)) {
                                  setNewQuestion(prev => ({ ...prev, correctAnswer: currentCorrects.filter(c => c !== idx) }));
                                } else {
                                  setNewQuestion(prev => ({ ...prev, correctAnswer: [...currentCorrects, idx] }));
                                }
                              } else {
                                  setNewQuestion(prev => ({ ...prev, correctAnswer: idx }));
                              }
                            }}
                            className="text-indigo-600 rounded cursor-pointer"
                          />
                          <input 
                            type="text"
                            placeholder={`Lựa chọn ${['A', 'B', 'C', 'D'][idx] || idx + 1}`}
                            value={opt.text}
                            onChange={(e) => {
                              const updated = [...newQuestion.options];
                              updated[idx].text = e.target.value;
                              setNewQuestion(prev => ({ ...prev, options: updated }));
                            }}
                            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none"
                          />
                          <button 
                            type="button" 
                            onClick={() => handleRemoveOption(idx)}
                            className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button 
                      type="button" 
                      onClick={handleAddOption}
                      className="text-[11px] font-black text-indigo-600 hover:underline"
                    >
                      + Phác thảo thêm đáp án
                    </button>
                  </div>
                ) : newQuestion.type === 'TRUE FALSE' ? (
                  <div className="space-y-2 bg-slate-50 p-4 rounded-xl">
                    <span className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">Đáp án đúng cho dạng Đúng/Sai</span>
                    <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={() => setNewQuestion(prev => ({ ...prev, correctAnswer: 0 }))}
                        className={`flex-1 py-3 text-xs font-black rounded-lg border transition-colors ${newQuestion.correctAnswer === 0 ? 'bg-emerald-600 text-white border-transparent' : 'bg-white border-slate-200'}`}
                      >
                        ĐÚNG (Đồng ý)
                      </button>
                      <button 
                        type="button"
                        onClick={() => setNewQuestion(prev => ({ ...prev, correctAnswer: 1 }))}
                        className={`flex-1 py-3 text-xs font-black rounded-lg border transition-colors ${newQuestion.correctAnswer === 1 ? 'bg-rose-600 text-white border-transparent' : 'bg-white border-slate-200'}`}
                      >
                        SAI (Không đồng ý)
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 bg-slate-50 p-4 rounded-xl">
                    <span className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">Đáp án đúng cho dạng Trả lời ngắn</span>
                    <input 
                      type="text" 
                      placeholder="Nhập cụm từ/đáp án ngắn chính xác..."
                      value={typeof newQuestion.correctAnswer === 'string' ? newQuestion.correctAnswer : ''}
                      onChange={(e) => setNewQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-indigo-500 bg-white"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">MÔ TẢ GIẢI THÍCH CHI TIẾT</label>
                  <input 
                    type="text" 
                    placeholder="Mô tả cơ sở lý luận, giải nghĩa tại sao chọn lựa đáp án đó đúng..."
                    value={newQuestion.explanation}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, explanation: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none bg-slate-50"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl tracking-wider uppercase shadow-lg shadow-blue-100"
                >
                  💾 Ghi nhớ nạp câu hỏi mới
                </button>

              </form>
            </div>
          ))}

          {/* VIEW: ADMIN MANAGER */}
          {currentView === 'admin' && (
            <div className="space-y-6 animate-fadeIn">
              {!isAdminLoggedIn ? (
                /* GIAO DIỆN ĐĂNG NHẬP / ĐĂNG KÝ QUẢN TRỊ VIÊN */
                <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-150 shadow-xl overflow-hidden animate-fadeIn">
                  <div className="p-6 sm:p-8 bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 text-white relative text-center">
                    <div className="absolute top-3 right-3 bg-white/10 px-2.5 py-0.5 rounded text-[9px] font-black uppercase text-indigo-200">
                      CỔNG BẢO MẬT
                    </div>
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
                      <Settings className="w-6 h-6 text-indigo-300 animate-spin-slow" />
                    </div>
                    <h2 className="text-base font-black uppercase font-display tracking-wide">QUẢN TRỊ HỆ THỐNG</h2>
                    <p className="text-[9px] text-indigo-200 uppercase tracking-widest mt-1">Đăng nhập tài khoản giám thị / quản lý</p>
                  </div>

                  <div className="p-6 sm:p-8 space-y-6">
                    <form onSubmit={handleAdminLogin} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-450 uppercase tracking-wider">Email Quản Trị</label>
                        <input
                          type="email"
                          required
                          value={authForm.email}
                          onChange={(e) => setAuthForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Nhập email quản trị của bạn..."
                          className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-450 uppercase tracking-wider">Mật Khẩu</label>
                        <input
                          type="password"
                          required
                          value={authForm.password}
                          onChange={(e) => setAuthForm(prev => ({ ...prev, password: e.target.value }))}
                          placeholder="Nhập mật khẩu..."
                          className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-extrabold text-xs rounded-xl tracking-wider uppercase transition-all shadow-md shadow-indigo-150"
                      >
                        Xác Thực Đăng Nhập 🚀
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                /* BẢNG ĐIỀU KHIỂN CHÍNH THỨC CỦA ADMIN (ĐÃ LOGGED IN) */
                <>
                  <div className="bg-white rounded-2xl p-4 border border-slate-150 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-left flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-display font-black text-base shadow-inner">
                        🛡️
                      </div>
                      <div>
                        <h2 className="text-base font-black text-slate-900 flex items-center gap-1.5 font-display uppercase">⚙️ Bảng Điều Khiển Quản Trị</h2>
                        <p className="text-[10px] text-slate-400 font-extrabold uppercase mt-0.5">Xác thực: {adminProfile.name} • {adminProfile.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={handleAdminLogout}
                        className="bg-rose-50 text-rose-600 hover:bg-rose-100 font-extrabold text-[10px] px-3.5 py-2 rounded-lg transition-colors border border-rose-200 uppercase tracking-widest flex items-center gap-1"
                      >
                        🚪 Đăng xuất
                      </button>
                      <button 
                        onClick={() => setCurrentView('portal')}
                        className="bg-slate-100 text-slate-600 hover:bg-slate-200 font-black text-[10px] px-3.5 py-2 rounded-lg transition-colors"
                      >
                        Về trang chủ Portal
                      </button>
                    </div>
                  </div>

              <div className="bg-white p-1 rounded-xl border border-slate-150 flex flex-wrap gap-1">
                {[
                  { id: 'overview', name: '📊 Tổng quan' },
                  { id: 'questions', name: '📚 Ngân hàng đề' },
                  { id: 'school_class', name: '🏫 Trường lớp' },
                  { id: 'email_perms', name: '📧 Whitelist email' },
                  { id: 'supabase', name: '⚡ Supabase Synced' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveAdminTab(tab.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase transition-colors ${activeAdminTab === tab.id ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>

              {activeAdminTab === 'overview' && (
                <div className="space-y-6">
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-150 text-center">
                      <span className="block text-[9px] text-slate-400 font-black uppercase">Đang Online</span>
                      <span className="block text-lg font-black text-indigo-600 mt-1">{liveUsers.length + 1} em</span>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-150 text-center">
                      <span className="block text-[9px] text-slate-400 font-black uppercase">Ngân hàng đề</span>
                      <span className="block text-lg font-black text-purple-600 mt-1">{questions.length} câu</span>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-150 text-center">
                      <span className="block text-[9px] text-slate-400 font-black uppercase">Phòng thi Live</span>
                      <span className="block text-lg font-black text-rose-600 mt-1">{examRooms.length} phòng</span>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-150 text-center">
                      <span className="block text-[9px] text-slate-400 font-black uppercase">Tổng số lượt thi</span>
                      <span className="block text-lg font-black text-amber-600 mt-1">{examHistoryLogs.length} lượt</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm space-y-4">
                    <span className="block text-xs font-black text-slate-900 uppercase tracking-wider font-display">Simulated Live Users ({liveUsers.length})</span>
                    <div className="space-y-2">
                      {liveUsers.map(u => (
                        <div key={u.id} className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex items-center justify-between text-xs font-semibold">
                          <div>
                            <span className="block font-black text-slate-800">{u.name}</span>
                            <span className="block text-[10px] text-slate-400">{u.class} • {u.device}</span>
                          </div>
                          <button 
                            onClick={() => {
                              setLiveUsers(prev => prev.filter(x => x.id !== u.id));
                              showToast(`Đã hạ tải quyền truy cập thí sinh ${u.name}!`, 'info');
                            }}
                            className="text-[10px] text-rose-600 hover:underline font-extrabold uppercase"
                          >
                            Hạ quyền thi
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cổng điều chỉnh Bảo trì Hệ thống */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm space-y-4 animate-fadeIn">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 font-display">
                      <Lock className="w-4 h-4 text-rose-500 animate-pulse" />
                      <span className="block text-xs font-black text-rose-600 uppercase tracking-wider">CẤU HÌNH BẢO TRÌ HỆ THỐNG</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                        <div>
                          <span className="block text-xs font-black text-slate-800">Chế độ Bảo trì (Khóa hệ thống)</span>
                          <span className="block text-[10px] text-slate-400 mt-1 leading-relaxed">Khi kích hoạt, mọi thí sinh khi truy cập hệ thống sẽ nhìn thấy màn hình báo lỗi bảo trì để đảm bảo an toàn nâng cấp.</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const nextMode = !systemConfig.maintenanceMode;
                            syncSystemSettings({ maintenanceMode: nextMode });
                            showToast(`Đã ${nextMode ? 'KÍCH HOẠT' : 'GỠ BỎ'} trạng thái bảo trì hệ thống!`, nextMode ? 'warning' : 'success');
                          }}
                          className={`mt-4 w-full px-3.5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider border transition-all shrink-0 select-none ${systemConfig.maintenanceMode ? 'bg-rose-600 border-rose-600 text-white shadow-md shadow-rose-100' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                        >
                          {systemConfig.maintenanceMode ? 'ĐANG BẬT 🔒 (HỆ THỐNG ĐÃ KHÓA)' : 'ĐANG TẮT 🔓 (MỞ CỬA TỰ DO)'}
                        </button>
                      </div>

                      <div className="space-y-2.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <label className="block text-xs font-black text-slate-800">Thời gian hoàn thành dự kiến</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Ví dụ: BT, 30 phút, 1 giờ, 17:00..."
                            value={systemConfig.maintenanceTime || ''}
                            onChange={(e) => {
                              setSystemConfig(prev => ({ ...prev, maintenanceTime: e.target.value }));
                            }}
                            onBlur={() => {
                              syncSystemSettings({ maintenanceTime: systemConfig.maintenanceTime || 'BT' });
                              showToast('Đã tự động lưu thời gian hoàn thành dự kiến!', 'success');
                            }}
                            className="flex-1 px-3 py-2 border border-slate-250 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              syncSystemSettings({ maintenanceTime: systemConfig.maintenanceTime || 'BT' });
                              showToast('Đã lưu thời gian hoàn thành dự kiến thành công!', 'success');
                            }}
                            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-600 rounded-lg text-xs font-black transition-colors shrink-0"
                          >
                            Lưu
                          </button>
                        </div>
                        <span className="block text-[9px] text-slate-405 leading-relaxed mt-2">Ấn "Lưu" hoặc click trỏ chuột ra xa để hoàn tất đồng bộ hóa trực diện lên máy chủ QuizMaster.</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {activeAdminTab === 'questions' && (
                <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm space-y-4">
                  <span className="block text-xs font-black text-slate-900 uppercase tracking-wider font-display">Danh mục câu hỏi hiện hoạt ({questions.length})</span>
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {questions.map((q, qidx) => (
                      <div key={q.id || qidx} className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-xs flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex gap-1">
                            <span className="bg-indigo-100 text-indigo-700 font-black text-[9px] px-2 py-0.5 rounded">STT: {q.stt || qidx + 1}</span>
                            <span className="bg-orange-100 text-orange-700 font-black text-[9px] px-2 py-0.5 rounded">Lớp {q.grade}</span>
                            <span className="bg-slate-200 text-slate-700 font-black text-[9px] px-2 py-0.5 rounded">{q.type}</span>
                          </div>
                          <p className="font-extrabold text-slate-900 leading-snug">{q.content}</p>
                        </div>
                        <button 
                          onClick={() => handleDeleteQuestion(q.id)}
                          className="text-rose-600 hover:bg-rose-50 px-2.5 py-1 rounded font-black tracking-wider uppercase text-[10px] shrink-0 border border-rose-100"
                        >
                          Xóa bỏ
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeAdminTab === 'school_class' && (
                <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm space-y-4 animate-fadeIn">
                  <h3 className="text-xs font-black uppercase text-slate-900">Mạng lưới trường THCS liên kết({schoolsList.length})</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                      <span className="block text-[11px] font-black text-slate-500 uppercase">Whitelist trường học mới</span>
                      <input 
                        type="text" 
                        placeholder="THCS Nguyễn Trung Trực..." 
                        value={newSchoolName}
                        onChange={(e) => setNewSchoolName(e.target.value)}
                        className="w-full p-2 text-xs border border-slate-200 rounded"
                      />
                      <button 
                        onClick={() => {
                          if (!newSchoolName.trim()) return;
                          setSchoolsList(prev => [...prev, { id: `s_${Date.now()}`, name: newSchoolName.trim(), status: 'Hoạt động', classes: 2 }]);
                          setNewSchoolName('');
                          showToast('Đã mở liên kết trường mới thành công!', 'success');
                        }}
                        className="w-full py-2 bg-indigo-600 text-white font-bold text-xs rounded"
                      >
                        Mở liên kết whitelist
                      </button>
                    </div>

                    <div className="space-y-2">
                      {schoolsList.map(s => (
                        <div key={s.id} className="bg-white border border-slate-200 p-3 rounded-lg flex items-center justify-between text-xs font-semibold">
                          <span>🏢 {s.name}</span>
                          <button 
                            onClick={() => {
                              setSchoolsList(prev => prev.filter(x => x.id !== s.id));
                              showToast(`Đã tháo quyền liên kết trường ${s.name}!`, 'info');
                            }}
                            className="text-[10px] text-rose-600"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeAdminTab === 'email_perms' && (
                <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm space-y-4">
                  <h3 className="text-xs font-black uppercase text-slate-900">Danh sách Whitelist Email Admin ({emailWhitelist.length})</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                      <span className="block text-[11px] font-black text-slate-500 uppercase text-slate-600">Phân quyền Email Admin giám thị</span>
                      <input 
                        type="email" 
                        placeholder="hiep.duong@school.edu.vn" 
                        value={newWhitelistedEmail}
                        onChange={(e) => setNewWhitelistedEmail(e.target.value)}
                        className="w-full p-2 text-xs border border-slate-200 rounded"
                      />
                      <button 
                        onClick={() => {
                          if (!newWhitelistedEmail.trim() || !newWhitelistedEmail.includes('@')) {
                            showToast('Email không đúng định dạng hợp lệ!', 'warning');
                            return;
                          }
                          setEmailWhitelist(prev => [...prev, newWhitelistedEmail.toLowerCase().trim()]);
                          setNewWhitelistedEmail('');
                          showToast('Thêm whitelist email mới thành công!', 'success');
                        }}
                        className="w-full py-2 bg-indigo-600 text-white font-bold text-xs rounded"
                      >
                        Phân quyền giám sát
                      </button>
                    </div>

                    <div className="bg-white border border-slate-200 p-3 rounded-xl divide-y divide-slate-100 max-h-60 overflow-y-auto">
                      {emailWhitelist.map(email => (
                        <div key={email} className="py-2 flex items-center justify-between text-xs font-bold text-slate-700">
                          <span>📧 {email}</span>
                          <button 
                            onClick={() => {
                              if (email === 'admin@quizmaster.com') return;
                              setEmailWhitelist(prev => prev.filter(x => x !== email));
                              showToast(`Đã tháo quyền email ${email}!`, 'info');
                            }}
                            className="text-rose-600 text-[10px]"
                          >
                            Thu hồi
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeAdminTab === 'supabase' && (
                <div className="space-y-6">
                  {/* Vercel Deployment & Supabase Persistent Guide */}
                  <div className="p-5 rounded-2xl border border-indigo-150 bg-indigo-55/10 bg-indigo-50/50 space-y-3.5 shadow-sm">
                    <h4 className="text-xs font-black text-indigo-950 uppercase tracking-tight flex items-center gap-1.5 leading-none">
                      💡 Hướng dẫn cứu sống dữ liệu đề khi đưa lên Vercel
                    </h4>
                    <p className="text-xs text-indigo-900 leading-normal">
                      Khi lưu đề câu hỏi mà thấy trên Vercel không thay đổi, đó là do hệ thống lưu trữ tạm thời (Local DB) của Vercel chạy dưới dạng Serverless <strong>sẽ tự động khôi phục và xóa tài liệu</strong> sau vài phút hoạt động. Bạn cần liên kết hệ thống với dịch vụ cơ sở dữ liệu vĩnh cửu <strong>Supabase</strong> theo các bước tự động hóa sau:
                    </p>
                    <div className="text-xs text-indigo-950 space-y-2 bg-white/90 p-4 rounded-xl border border-indigo-100 font-semibold shadow-inner">
                      <p className="font-extrabold text-[12px] text-indigo-900 flex items-center gap-1 leading-none">⚙️ Chỉ mất 2 phút thiết lập:</p>
                      <p className="pl-1">• <strong>Bước 1:</strong> Đăng ký tài khoản miễn phí tại <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">supabase.com</a> và bấm Tạo mới Dự án (New Project).</p>
                      <p className="pl-1">• <strong>Bước 2:</strong> Copy mã SQL đen mờ ở cuối trang này, bấm vào phần <strong>SQL Editor</strong> tại thanh điều hướng trái của Supabase và bấm <strong>Run</strong> để tạo bảng.</p>
                      <p className="pl-1">• <strong>Bước 3:</strong> Vào bảng điều khiển của <strong>Vercel (Vercel Dashboard) &gt; Settings &gt; Environment Variables</strong> của dự án, rồi thêm hai (2) biến môi trường sau:</p>
                      
                      <div className="pl-4 font-mono text-[10.5px] space-y-1.5 select-all py-2.5 px-3 text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-lg mt-1 font-bold">
                        <p>🔹 <strong className="text-zinc-900">SUPABASE_URL</strong> = (Tìm thấy ở ô Project Settings &gt; API trên Supabase)</p>
                        <p>🔹 <strong className="text-zinc-900">SUPABASE_ANON_KEY</strong> = (Khóa bảo mật Anon Key tìm thấy ở API trên Supabase)</p>
                      </div>
                      
                      <p className="mt-2 text-indigo-900 text-[11px] font-bold">
                        👉 Hoàn tất: Bấm <strong>Re-deploy</strong> lại dự án trên Vercel. Toàn bộ đề câu hỏi khi bạn tải lên hay nạp tệp JSON sẽ được tải thẳng lên cơ sở dữ liệu và lưu giữ vĩnh viễn ở Vercel!
                      </p>
                    </div>
                  </div>

                  {/* Connection Header Box */}
                  <div className={`p-5 rounded-2xl border ${supabaseStatus.connected ? 'bg-emerald-50/50 border-emerald-200' : 'bg-amber-50/50 border-amber-200'} shadow-sm`}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`relative flex h-3.5 w-3.5`}>
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${supabaseStatus.connected ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                            <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${supabaseStatus.connected ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                          </span>
                          <h3 className="font-sans font-black text-slate-900 tracking-tight text-sm uppercase">
                            Hệ thống Supabase: {supabaseStatus.connected ? 'ĐÃ LIÊN KẾT THÀNH CÔNG' : 'CHẾ ĐỘ DẬP NỔI THAY THẾ (LOCAL FALLBACK)'}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-600 font-medium">
                          {supabaseStatus.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button 
                          onClick={async () => {
                            showToast('Đang quét liên kết dữ liệu...', 'info');
                            await checkSupabaseStatus();
                            await loadDatabaseData();
                            showToast('Đã cập nhật trạng thái kết nối!', 'success');
                          }}
                          className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-black transition-colors"
                        >
                          🔄 Thử lại liên kết
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Schema Summary Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { title: 'Ngân hàng đề', key: 'questions', icon: '📚', desc: 'Bộ câu hỏi thi đấu' },
                      { title: 'Bảng xếp hạng', key: 'leaderboard', icon: '🏆', desc: 'Thành tích vinh danh' },
                      { title: 'Phòng thi đấu', key: 'examRooms', icon: '🏟️', desc: 'Mã phòng trực tiếp' },
                      { title: 'Nhật ký thi đấu', key: 'examHistoryLogs', icon: '📜', desc: 'Lịch sử học trình' }
                    ].map(metric => (
                      <div key={metric.key} className="bg-white p-4 rounded-xl border border-slate-150 shadow-sm text-center space-y-1.5">
                        <div className="text-xl">{metric.icon}</div>
                        <span className="block text-[9px] text-slate-400 font-extrabold uppercase tracking-widest">{metric.title}</span>
                        <span className="block text-2xl font-black text-indigo-700">
                          {supabaseStatus.counts[metric.key as keyof typeof supabaseStatus.counts] !== undefined ? supabaseStatus.counts[metric.key as keyof typeof supabaseStatus.counts] : 0}
                        </span>
                        <span className="block text-[10px] text-slate-400 font-semibold">{metric.desc}</span>
                      </div>
                    ))}
                  </div>

                  {/* Seed and Actions Box */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm space-y-3.5">
                    <h4 className="text-xs font-black uppercase text-slate-900 leading-none">Châm mầm dữ liệu hệ thống (Seeding Engine)</h4>
                    <p className="text-xs text-slate-500 font-medium">
                      Nếu hệ quản trị cơ sở dữ liệu Supabase của bạn đang trống không hoặc chưa có câu hỏi nào hoạt động, hãy nhấp vào nút dưới đây để kích hoạt nạp bộ câu hỏi Lịch sử - Địa lí lớp 6, 7, 8, 9 mặc định cùng lịch sử thi đua thử nghiệm. Dữ liệu sẽ được lưu trực tiếp vào Supabase và đồng bộ về máy chủ.
                    </p>
                    <button 
                      onClick={async () => {
                        try {
                          showToast('Đang châm nguồn dữ liệu mầm vào cơ sở dữ liệu...', 'info');
                          const res = await fetch('/api/supabase/seed', { method: 'POST' });
                          const data = await res.json();
                          if (res.ok) {
                            showToast('🌱 Đã gieo mầm dữ liệu thành công!', 'success');
                            checkSupabaseStatus();
                            loadDatabaseData();
                          } else {
                            showToast(`Thao tác không hoàn tất: ${data.message}`, 'error');
                          }
                        } catch (err) {
                          showToast('Không thể kết nối máy chủ gieo mầm.', 'error');
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-lg transition-colors shadow-sm"
                    >
                      🌱 Khởi tạo dữ liệu gieo mầm mặc định (Seed DB)
                    </button>
                  </div>

                  {/* SQL scripts for manual creation */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-black uppercase text-slate-900">Mã thiết lập SQL nhập vào Supabase SQL Editor</h4>
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Sao chép mã lệnh bên dưới và chạy trong bảng điều khiển SQL Editor của Supabase để tự động tạo cấu trúc bảng chính xác.</p>
                      </div>
                      <button 
                        onClick={() => {
                          try {
                            const sqlArea = document.createElement('textarea');
                            sqlArea.value = supabaseStatus.sql || '';
                            document.body.appendChild(sqlArea);
                            sqlArea.select();
                            document.execCommand('copy');
                            document.body.removeChild(sqlArea);
                            showToast('📋 Đã sao chép mã lệnh SQL thành công!', 'success');
                          } catch {
                            showToast('Lỗi sao chép tự động.', 'error');
                          }
                        }}
                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-black text-[10px] px-3 py-1.5 rounded-lg border border-indigo-100 uppercase transition-colors shrink-0"
                      >
                        📋 Sao chép mã SQL
                      </button>
                    </div>

                    <div className="relative group">
                      <pre className="p-4 bg-slate-950 text-emerald-400 font-mono text-[10px] rounded-xl overflow-x-auto max-h-80 border border-slate-900 scrollbar-thin select-all">
                        <code>{supabaseStatus.sql}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              )}
                </>
              )}
            </div>
          )}

          {/* VIEW: EXAM PLAY ROOM (Thực luyện thi đấu thực tế) */}
          {currentView === 'exam-room' && activeExam && (
            <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left space-y-0.5">
                  <span className="bg-indigo-50 text-indigo-700 text-[9px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider font-display">TRẬN ĐẤU CĂNG THẲNG LỚP {activeExam.grade}</span>
                  <h2 className="text-base font-black text-slate-900 leading-tight mt-1">{activeExam.title}</h2>
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Học trình câu {activeExam.currentIdx + 1} / {activeExam.questionsList.length}</p>
                </div>
                <div className="bg-slate-950 text-white font-mono text-base font-black px-4.5 py-2 rounded-xl flex items-center gap-1.5 shrink-0">
                  <Clock className="w-4 h-4 text-orange-400 animate-spin" /> {Math.floor(activeExam.timeLeft / 60).toString().padStart(2, '0')}:{(activeExam.timeLeft % 60).toString().padStart(2, '0')}
                </div>
              </div>

              {/* Dynamic question wrapper */}
              <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-md space-y-6">
                
                <div className="flex justify-between items-center text-[10px] font-black text-indigo-600 uppercase tracking-widest border-b pb-2 border-slate-100">
                  <span>MÃ PHÒNG CHỐNG GIAN LẬN: SECURE_WAF_K{activeExam.grade}</span>
                  <button 
                    type="button" 
                    onClick={() => handleSpeakText(activeExam.questionsList[activeExam.currentIdx].content)}
                    className="flex items-center gap-1 hover:underline text-orange-600"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Thuyết minh AI
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-relaxed">
                    Câu hỏi {activeExam.currentIdx + 1}: {activeExam.questionsList[activeExam.currentIdx].content}
                  </h3>

                  {/* Question Type: TRUE FALSE */}
                  {activeExam.questionsList[activeExam.currentIdx].type === 'TRUE FALSE' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {[
                        { val: 0, text: 'ĐÚNG (Chính xác)', color: 'bg-emerald-50 border-emerald-500 text-emerald-950', hover: 'hover:bg-emerald-100' },
                        { val: 1, text: 'SAI (Chưa chính xác)', color: 'bg-rose-50 border-rose-500 text-rose-950', hover: 'hover:bg-rose-100' }
                      ].map(opt => {
                        const isSelected = activeExam.answers[activeExam.currentIdx] === opt.val;
                        return (
                          <button
                            key={opt.val}
                            onClick={() => {
                              setActiveExam(prev => ({
                                ...prev,
                                answers: { ...prev.answers, [prev.currentIdx]: opt.val }
                              }));
                            }}
                            className={`w-full text-center p-6 border-2 rounded-2xl font-black text-xs transition-all ${
                              isSelected ? `${opt.color} shadow-lg scale-[1.02]` : `bg-white border-slate-200 ${opt.hover} text-slate-700`
                            }`}
                          >
                            {opt.text}
                          </button>
                        );
                      })}
                    </div>
                  ) : activeExam.questionsList[activeExam.currentIdx].type === 'MULTIPLE' ? (
                    /* Question Type: MULTIPLE */
                    <div className="space-y-3 pt-2">
                      <div className="p-3 bg-indigo-50/50 border border-indigo-100 text-[10px] text-indigo-700 font-extrabold uppercase rounded-lg flex items-center gap-1.5">
                        <CheckSquare className="w-4 h-4" /> Dạng chọn NHIỀU ĐÁP ÁN ĐÚNG. Đánh dấu tất cả đáp án đúng rồi bấm tiếp tục.
                      </div>
                      
                      {activeExam.questionsList[activeExam.currentIdx].options.map((opt, oidx) => {
                        const curAnswers = activeExam.answers[activeExam.currentIdx] || [];
                        const isSelected = Array.isArray(curAnswers) ? curAnswers.includes(oidx) : curAnswers === oidx;
                        return (
                          <button
                            key={oidx}
                            onClick={() => {
                              setActiveExam(prev => {
                                const list = Array.isArray(prev.answers[prev.currentIdx]) 
                                  ? [...prev.answers[prev.currentIdx]] 
                                  : (prev.answers[prev.currentIdx] !== undefined ? [prev.answers[prev.currentIdx]] : []);
                                if (list.includes(oidx)) {
                                  return { ...prev, answers: { ...prev.answers, [prev.currentIdx]: list.filter(x => x !== oidx) } };
                                } else {
                                  return { ...prev, answers: { ...prev.answers, [prev.currentIdx]: [...list, oidx] } };
                                }
                              });
                            }}
                            className={`w-full text-left p-4 rounded-xl border font-bold text-xs flex items-center justify-between transition-colors ${
                              isSelected ? 'bg-indigo-55/40 border-indigo-500 text-indigo-950' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-750'
                            }`}
                          >
                            <span>{['A', 'B', 'C', 'D'][oidx] || oidx + 1}. {opt.text}</span>
                            <span className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-350'}`}>
                              {isSelected && <Check className="w-3 h-3" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    /* Question Type: SINGLE */
                    <div className="space-y-3 pt-2">
                      {activeExam.questionsList[activeExam.currentIdx].options.map((opt, oidx) => {
                        const isSelected = activeExam.answers[activeExam.currentIdx] === oidx;
                        return (
                          <button
                            key={oidx}
                            onClick={() => {
                              setActiveExam(prev => ({
                                ...prev,
                                answers: { ...prev.answers, [prev.currentIdx]: oidx }
                              }));
                            }}
                            className={`w-full text-left p-4 rounded-xl border font-bold text-xs flex items-center justify-between transition-colors ${
                              isSelected ? 'bg-indigo-55/45 border-indigo-500 text-indigo-900' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <span>{['A', 'B', 'C', 'D'][oidx] || oidx + 1}. {opt.text}</span>
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-350'}`}>
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                </div>

                <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                  <button 
                    onClick={() => {
                      if (activeExam.currentIdx > 0) {
                        setActiveExam(prev => ({ ...prev, currentIdx: prev.currentIdx - 1 }));
                      }
                    }}
                    disabled={activeExam.currentIdx === 0}
                    className="flex items-center gap-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold disabled:opacity-50"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
                  </button>

                  {activeExam.currentIdx < activeExam.questionsList.length - 1 ? (
                    <button 
                      onClick={() => {
                        setActiveExam(prev => ({ ...prev, currentIdx: prev.currentIdx + 1 }));
                      }}
                      className="flex items-center gap-1 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold"
                    >
                      Tiếp tục <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button 
                      onClick={() => triggerCustomConfirm('NỘP BÀI THI', 'Xác nhận nộp bài thi ôn luyện Lịch Sử & Địa Lí THCS?', () => submitExam(activeExam))}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-widest shadow-lg shadow-emerald-100"
                    >
                      Nộp Bài Thi 🏁
                    </button>
                  )}
                </div>

              </div>

            </div>
          )}

        </main>

      </div>

      {/* Editing profile dialog */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full border border-slate-100 shadow-2xl space-y-4 animate-fadeIn">
            <h3 className="font-black text-slate-900 text-sm font-display uppercase">Danh tính học viên thi đấu</h3>
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1.5 uppercase">HỌ VÀ TÊN</label>
                <input 
                  type="text" 
                  value={editProfileData.name}
                  onChange={(e) => setEditProfileData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ví dụ: Hoàng Anh Quân" 
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1.5 uppercase">LỚP HỌC</label>
                <input 
                  type="text" 
                  value={editProfileData.grade}
                  onChange={(e) => setEditProfileData(prev => ({ ...prev, grade: e.target.value }))}
                  placeholder="Ví dụ: Lớp 9A1" 
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1.5 uppercase">TRƯỜNG THCS</label>
                <input 
                  type="text" 
                  value={editProfileData.school}
                  onChange={(e) => setEditProfileData(prev => ({ ...prev, school: e.target.value }))}
                  placeholder="Ví dụ: THCS Trưng Vương" 
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsEditingProfile(false)} 
                  className="px-3.5 py-1.5 bg-slate-100 rounded text-slate-500 font-extrabold text-[10px]"
                >
                  HUY
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] rounded-lg shadow-md"
                >
                  XÁC NHẬN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Creating Room Box */}
      {isCreateRoomOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-100 shadow-xl space-y-4 animate-fadeIn">
            <h3 className="font-extrabold text-slate-900 text-sm font-display uppercase">Khởi tạo phòng đấu học phần</h3>
            <form onSubmit={handleCreateRoom} className="space-y-4 text-xs font-bold leading-normal">
              <div>
                <label className="block text-slate-400 mb-1">TÊN PHÒNG KỲ THI ÎN TẬP</label>
                <input 
                  type="text"
                  required
                  placeholder="Ví dụ: Khảo sát Lịch sử 8 - Tôn vinh Cần Vương"
                  value={createRoomForm.title}
                  onChange={(e) => setCreateRoomForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">KHỐI THCS</label>
                  <select 
                    value={createRoomForm.grade}
                    onChange={(e) => setCreateRoomForm(prev => ({ ...prev, grade: e.target.value }))}
                    className="w-full p-2 border border-slate-200 bg-white text-xs rounded-lg font-bold"
                  >
                    <option value="6">Khối 6</option>
                    <option value="7">Khối 7</option>
                    <option value="8">Khối 8</option>
                    <option value="9">Khối 9</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">PHÚT THI</label>
                  <input 
                    type="number"
                    value={createRoomForm.duration}
                    onChange={(e) => setCreateRoomForm(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">SỐ CÂU</label>
                  <input 
                    type="number"
                    value={createRoomForm.questionsCount}
                    onChange={(e) => setCreateRoomForm(prev => ({ ...prev, questionsCount: e.target.value }))}
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsCreateRoomOpen(false)} className="px-3 py-1.5 bg-slate-150 rounded">Hủy</button>
                <button type="submit" className="px-4 py-1.5 bg-indigo-600 text-white rounded shadow-md">Tạo phòng</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Class List Import Dialog Modal */}
      {classImportState.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full border border-slate-100 shadow-2xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-black text-slate-900 text-sm font-display uppercase flex items-center gap-2">
                🏫 Nhập Danh Sách Lớp Khối {classImportState.grade}
              </h3>
              <button 
                type="button" 
                onClick={() => setClassImportState(prev => ({ ...prev, isOpen: false }))} 
                className="text-slate-400 hover:text-slate-600 font-extrabold text-sm"
              >
                ✕
              </button>
            </div>
            
            <p className="text-[11px] text-slate-500 leading-normal">
              Nhập hoặc dán danh sách lớp học cho <strong>Khối {classImportState.grade}</strong>. Mỗi tên lớp cách nhau bằng <strong>dấu phẩy (,)</strong> hoặc <strong>xuống dòng mới</strong>.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1.5 uppercase font-bold">DANH SÁCH TÊN LỚP HỌC</label>
                <textarea
                  rows={5}
                  value={classImportState.inputText}
                  onChange={(e) => setClassImportState(prev => ({ ...prev, inputText: e.target.value }))}
                  placeholder={`Ví dụ:\n${classImportState.grade}A1, ${classImportState.grade}A2, ${classImportState.grade}A3\nHoặc:\n${classImportState.grade}/1, ${classImportState.grade}/2, ${classImportState.grade}/3`}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex gap-2 text-[10px] items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    const defaults = {
                      '6': ['6/1', '6/2', '6/3', '6/4', '6/5', '6/6'],
                      '7': ['7/1', '7/2', '7/3', '7/4', '7/5', '7/6'],
                      '8': ['8/1', '8/2', '8/3', '8/4', '8/5', '8/6'],
                      '9': ['9/1', '9/2', '9/3', '9/4', '9/5', '9/6']
                    };
                    const gradeKey = classImportState.grade as keyof typeof defaults;
                    setClassImportState(prev => ({
                      ...prev,
                      inputText: (defaults[gradeKey] || []).join(', ')
                    }));
                    showToast('Đã khôi phục giá trị lớp mặc định cho khối!', 'info');
                  }}
                  className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-slate-600 font-extrabold transition-colors"
                >
                  🔄 Khôi phục mặc định
                </button>
                <span className="text-slate-400 font-medium">Ấn Enter để xuống dòng</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t text-xs">
              <button 
                type="button" 
                onClick={() => setClassImportState(prev => ({ ...prev, isOpen: false }))} 
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-500 font-extrabold"
              >
                HỦY BỎ
              </button>
              <button 
                type="button" 
                onClick={() => {
                  const raw = classImportState.inputText;
                  const parsed = raw
                    .split(/[,\n]/)
                    .map(s => s.trim())
                    .filter(s => s.length > 0);
                  
                  if (parsed.length === 0) {
                    showToast('Danh sách nhập vào trống, vui lòng nhập ít nhất 1 lớp học!', 'warning');
                    return;
                  }

                  const updated = {
                    ...customClasses,
                    [classImportState.grade]: parsed
                  };
                  saveCustomClasses(updated);
                  
                  // fallback select first item
                  if (practiceConfig.grade === classImportState.grade) {
                    setPracticeConfig(prev => ({ ...prev, subClass: parsed[0] || `${classImportState.grade}/1` }));
                  }
                  if (comebackGrade === classImportState.grade) {
                    setComebackClass(parsed[0] || `${classImportState.grade}/1`);
                  }

                  setClassImportState(prev => ({ ...prev, isOpen: false }));
                  showToast(`Đã nạp danh sách gồm ${parsed.length} lớp cho Khối ${classImportState.grade} thành công! 🎉`, 'success');
                }}
                className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-extrabold rounded-lg shadow-md transition-all uppercase tracking-wide"
              >
                LƯU & ĐỒNG BỘ 💾
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer view */}
      <footer className="bg-slate-900 text-slate-400 py-10 mt-16 border-t border-slate-800 text-center text-xs font-semibold">
        <div className="max-w-7xl mx-auto px-6 space-y-3">
          <div className="flex justify-center items-center gap-2">
            <Award className="w-5 h-5 text-orange-500" />
            <span className="text-white font-display font-black text-sm tracking-tight uppercase">QuizMaster Portal - THCS Lịch Sử & Địa Lí</span>
          </div>
          <p>© 2026 QuizMaster. Toàn học trình và đề cương ôn tập được giám sát chặt chẽ.</p>
          <p className="text-[10px] text-slate-500">Tích hợp Trợ lý Gemini AI & Thuyết minh giọng nói trực diện vượt trội.</p>
        </div>
      </footer>

        </>
      )}

    </div>
  );
}
