import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// local file fallback database path
const LOCAL_DB_PATH = path.join(process.cwd(), "local_db.json");

// Default initial mock data
const DEFAULT_QUESTIONS = [
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
  }
];

const DEFAULT_LEADERBOARD = [
  { id: 'l1', rank: 1, name: 'NGUYỄN PHÚC VĂN ANH', class: 'Lớp 9A1 - THCS Bình An', score: 1000, time: '2 phút 15 giây', date: '08/06/2026' },
  { id: 'l2', rank: 2, name: 'ĐẶNG THỊ MỸ DUYÊN', class: 'Lớp 8A2 - THCS Nguyễn Du', score: 1005, time: '2 phút 45 giây', date: '08/06/2026' }
];

const DEFAULT_EXAM_ROOMS = [
  { id: 'room1', code: 'OT4_D2_06_06', title: 'Phòng Đấu Trường Lịch Sử Khối 6', grade: '6', duration: 45, questions: 15, studentsCount: 18, status: 'ĐANG THI' },
  { id: 'room2', code: 'OT9_D1_06_06', title: 'Đấu Trường Lịch Sử & Địa Lí Khối 9', grade: '9', duration: 45, questions: 15, studentsCount: 31, status: 'ĐANG THI' }
];

const DEFAULT_HISTORY_LOGS = [
  { id: 'h1', student: 'LÊ VĂN KHÁNH', grade: '9', score: '950đ', duration: '22:15', date: '08/06/2026' }
];

// Load local JSON DB
function loadLocalDb() {
  try {
    if (fs.existsSync(LOCAL_DB_PATH)) {
      const data = fs.readFileSync(LOCAL_DB_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading local db file:", err);
  }
  // Initialize with defaults if empty
  const defaultDb = {
    questions: DEFAULT_QUESTIONS,
    leaderboard: DEFAULT_LEADERBOARD,
    examRooms: DEFAULT_EXAM_ROOMS,
    examHistoryLogs: DEFAULT_HISTORY_LOGS
  };
  saveLocalDb(defaultDb);
  return defaultDb;
}

function saveLocalDb(data: any) {
  try {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing local db file:", err);
  }
}

// Lazy Supabase connection
function getSupabaseClient() {
  const url = process.env.SUPABASE_URL || "";
  const key = process.env.SUPABASE_ANON_KEY || "";
  if (!url || !key) {
    return null;
  }
  return createClient(url, key);
}

// Convert any non-UUID string to a deterministic UUID
function convertToUUID(str: string): string {
  if (!str) {
    return crypto.randomUUID();
  }
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str)) {
    return str.toLowerCase();
  }
  const hash = crypto.createHash("sha1").update(str).digest("hex");
  const part1 = hash.substring(0, 8);
  const part2 = hash.substring(8, 12);
  const part3 = "5" + hash.substring(13, 16);
  const part4 = "8" + hash.substring(17, 20);
  const part5 = hash.substring(20, 32);
  return `${part1}-${part2}-${part3}-${part4}-${part5}`.toLowerCase();
}

function mapQuestionToSupabase(q: any) {
  return {
    id: convertToUUID(q.id),
    content: q.content,
    grade: q.grade,
    category: q.category,
    stt: q.stt,
    type: q.type || 'SINGLE',
    options: q.options,
    correct_answer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
    explanation: q.explanation
  };
}

function mapQuestionFromSupabase(dbQ: any) {
  return {
    id: dbQ.id,
    content: dbQ.content,
    grade: dbQ.grade,
    category: dbQ.category,
    stt: dbQ.stt,
    type: dbQ.type || 'SINGLE',
    options: dbQ.options,
    correctAnswer: typeof dbQ.correct_answer === 'number' ? dbQ.correct_answer : 0,
    explanation: dbQ.explanation
  };
}

function mapLeaderboardToSupabase(l: any) {
  return {
    id: convertToUUID(l.id),
    name: l.name,
    class: l.class,
    score: typeof l.score === 'number' ? l.score : 0,
    time: l.time || '0:00',
    date: l.date || ''
  };
}

function mapLeaderboardFromSupabase(dbL: any) {
  return {
    id: dbL.id,
    name: dbL.name,
    class: dbL.class,
    score: dbL.score,
    time: dbL.time,
    date: dbL.date
  };
}

function mapExamRoomToSupabase(r: any) {
  return {
    id: convertToUUID(r.id),
    code: r.code,
    title: r.title,
    grade: r.grade,
    duration: typeof r.duration === 'number' ? r.duration : 45,
    questions: typeof r.questions === 'number' ? r.questions : 15,
    studentsCount: typeof r.studentsCount === 'number' ? r.studentsCount : 0,
    status: r.status || 'ĐANG CHỜ'
  };
}

function mapExamRoomFromSupabase(dbR: any) {
  return {
    id: dbR.id,
    code: dbR.code,
    title: dbR.title,
    grade: dbR.grade,
    duration: dbR.duration,
    questions: dbR.questions,
    studentsCount: dbR.studentsCount || 0,
    status: dbR.status
  };
}

function mapHistoryLogToSupabase(h: any) {
  return {
    id: convertToUUID(h.id),
    student: h.student,
    grade: h.grade,
    score: h.score,
    duration: h.duration,
    date: h.date || ''
  };
}

function mapHistoryLogFromSupabase(dbH: any) {
  return {
    id: dbH.id,
    student: dbH.student,
    grade: dbH.grade,
    score: dbH.score,
    duration: dbH.duration,
    date: dbH.date
  };
}

// SQL code representation
const SUPABASE_SQL_SETUP = `-- SCRIPT KHỞI TẠO CẤU TRÚC DATABASE TRÊN SUPABASE (SQL EDITOR)

-- 1. Tạo bảng questions (Câu hỏi kiểm tra)
CREATE TABLE IF NOT EXISTS questions (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    grade TEXT NOT NULL,
    category TEXT NOT NULL,
    stt TEXT,
    type TEXT NOT NULL DEFAULT 'SINGLE',
    options JSONB NOT NULL,
    "correctAnswer" INTEGER NOT NULL,
    explanation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tắt/Bật RLS và cấp quyền cho phép nạp, tra cứu không bị chặn
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select on questions" ON questions FOR SELECT USING (true);
CREATE POLICY "Allow public insert on questions" ON questions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on questions" ON questions FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on questions" ON questions FOR DELETE USING (true);

-- 2. Tạo bảng leaderboard (Bảng vinh danh)
CREATE TABLE IF NOT EXISTS leaderboard (
    id TEXT PRIMARY KEY,
    rank INTEGER,
    name TEXT NOT NULL,
    class TEXT NOT NULL,
    score INTEGER NOT NULL,
    time TEXT NOT NULL,
    date TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select on leaderboard" ON leaderboard FOR SELECT USING (true);
CREATE POLICY "Allow public insert on leaderboard" ON leaderboard FOR INSERT WITH CHECK (true);

-- 3. Tạo bảng exam_rooms (Phòng thi đấu trực tuyến)
CREATE TABLE IF NOT EXISTS exam_rooms (
    id TEXT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    grade TEXT NOT NULL,
    duration INTEGER NOT NULL,
    questions INTEGER NOT NULL,
    "studentsCount" INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'ĐANG CHỜ',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE exam_rooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select on exam_rooms" ON exam_rooms FOR SELECT USING (true);
CREATE POLICY "Allow public insert on exam_rooms" ON exam_rooms FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on exam_rooms" ON exam_rooms FOR UPDATE USING (true);

-- 4. Tạo bảng exam_history_logs (Nhật ký thi đấu)
CREATE TABLE IF NOT EXISTS exam_history_logs (
    id TEXT PRIMARY KEY,
    student TEXT NOT NULL,
    grade TEXT NOT NULL,
    score TEXT NOT NULL,
    duration TEXT NOT NULL,
    date TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE exam_history_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select on exam_history_logs" ON exam_history_logs FOR SELECT USING (true);
CREATE POLICY "Allow public insert on exam_history_logs" ON exam_history_logs FOR INSERT WITH CHECK (true);`;

// ENDPOINTS - SUPABASE CONNECTION HEALTH CHECK
app.get("/api/supabase/status", async (req, res) => {
  const url = process.env.SUPABASE_URL || "";
  const key = process.env.SUPABASE_ANON_KEY || "";
  const hasEnv = !!(url && key);

  let host = "";
  try {
    if (url) {
      const u = new URL(url);
      host = u.hostname;
    }
  } catch (e) {
    if (url) {
      host = url.split("://")[1]?.split("/")[0] || url;
    }
  }

  if (!hasEnv) {
    return res.json({
      configured: false,
      connected: false,
      host: "",
      message: "Chưa cấu hình SUPABASE_URL và SUPABASE_ANON_KEY trong bảng Secrets của AI Studio.",
      sql: SUPABASE_SQL_SETUP,
      error: "Missing credentials"
    });
  }

  const client = getSupabaseClient();
  if (!client) {
    return res.json({
      configured: true,
      connected: false,
      host: host,
      message: "Không thể khởi tạo client Supabase. Kiểm tra lại chuỗi liên kết.",
      sql: SUPABASE_SQL_SETUP,
      error: "Client init failed"
    });
  }

  try {
    // Test access to questions table
    const { data: qData, error: qErr } = await client.from("questions").select("id").limit(1);
    
    if (qErr) {
      return res.json({
        configured: true,
        connected: false,
        host: host,
        message: `Kết nối thành công nhưng gặp lỗi cấu trúc bảng: ${qErr.message}. Vui lòng nhập mã lệnh SQL phía dưới vào Supabase Sql Editor để khởi tạo các bảng dữ liệu!`,
        sql: SUPABASE_SQL_SETUP,
        error: qErr.message
      });
    }

    // Verify other tables
    const { error: lErr } = await client.from("leaderboard").select("id").limit(1);
    const { error: rErr } = await client.from("exam_rooms").select("id").limit(1);
    const { error: hErr } = await client.from("exam_history_logs").select("id").limit(1);

    const missingTables: string[] = [];
    if (lErr) missingTables.push("leaderboard");
    if (rErr) missingTables.push("exam_rooms");
    if (hErr) missingTables.push("exam_history_logs");

    if (missingTables.length > 0) {
      return res.json({
        configured: true,
        connected: false,
        host: host,
        message: `Thiếu định dạng các bảng: ${missingTables.join(", ")}. Hãy chạy lệnh SQL thiết lập cơ sở dữ liệu trên Supabase SQL Editor.`,
        sql: SUPABASE_SQL_SETUP,
        error: `Missing tables: ${missingTables.join(", ")}`
      });
    }

    // Counts data
    const { count: countQ } = await client.from("questions").select("*", { count: "exact" });
    const { count: countL } = await client.from("leaderboard").select("*", { count: "exact" });
    const { count: countR } = await client.from("exam_rooms").select("*", { count: "exact" });
    const { count: countH } = await client.from("exam_history_logs").select("*", { count: "exact" });

    return res.json({
      configured: true,
      connected: true,
      url: url,
      host: host,
      message: "🎉 Thiết lập kết nối cơ sở dữ liệu Supabase chính xác và trực quan!",
      counts: {
        questions: countQ || 0,
        leaderboard: countL || 0,
        examRooms: countR || 0,
        examHistoryLogs: countH || 0
      },
      sql: SUPABASE_SQL_SETUP
    });
  } catch (err: any) {
    return res.json({
      configured: true,
      connected: false,
      host: host,
      message: "Có ngoại lệ xảy ra khi kết nối Supabase: " + err.message,
      sql: SUPABASE_SQL_SETUP,
      error: err.message
    });
  }
});

// Sync data endpoint: seed local defaults up to Supabase if empty
app.post("/api/supabase/seed", async (req, res) => {
  const client = getSupabaseClient();
  if (!client) {
    return res.status(400).json({ error: "Supabase chưa được cấu hình" });
  }

  try {
    const local = loadLocalDb();

    // Check questions
    const { data: qs } = await client.from("questions").select("id").limit(1);
    if (!qs || qs.length === 0) {
      console.log("Seeding questions...");
      await client.from("questions").insert(local.questions.map(mapQuestionToSupabase));
    }

    // Check leaderboard
    const { data: lbs } = await client.from("leaderboard").select("id").limit(1);
    if (!lbs || lbs.length === 0) {
      console.log("Seeding leaderboard...");
      await client.from("leaderboard").insert(local.leaderboard.map(mapLeaderboardToSupabase));
    }

    // Check exam_rooms
    const { data: rms } = await client.from("exam_rooms").select("id").limit(1);
    if (!rms || rms.length === 0) {
      console.log("Seeding exam rooms...");
      await client.from("exam_rooms").insert(local.examRooms.map(mapExamRoomToSupabase));
    }

    // Check logs
    const { data: logs } = await client.from("exam_history_logs").select("id").limit(1);
    if (!logs || logs.length === 0) {
      console.log("Seeding history logs...");
      await client.from("exam_history_logs").insert(local.examHistoryLogs.map(mapHistoryLogToSupabase));
    }

    return res.json({ success: true, message: "Đồng bộ hóa dữ liệu mặc định thành công lên Supabase!" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Lỗi đồng bộ dữ liệu" });
  }
});

// QUESTIONS ENDPOINTS
app.get("/api/questions", async (req, res) => {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client.from("questions").select("*").order("created_at", { ascending: false });
      if (!error && data) {
        if (data.length === 0) {
          const local = loadLocalDb();
          if (local.questions && local.questions.length > 0) {
            console.log("Auto-seeding empty Supabase queries table...");
            const mapped = local.questions.map(mapQuestionToSupabase);
            await client.from("questions").upsert(mapped);
            return res.json(local.questions);
          }
        }
        return res.json(data.map(mapQuestionFromSupabase));
      } else if (error) {
        console.error("GET questions error:", error);
      }
    } catch (err) {
      console.error("GET questions exception:", err);
    }
  }
  // Fallback to local file json
  const local = loadLocalDb();
  res.json(local.questions);
});

app.post("/api/questions", async (req, res) => {
  const body = req.body;
  const isArray = Array.isArray(body);
  const items = isArray ? body : [body];

  for (const item of items) {
    if (!item.id) {
      item.id = convertToUUID("q_" + Date.now() + "_" + Math.floor(Math.random() * 1000));
    } else {
      item.id = convertToUUID(item.id);
    }
  }

  const client = getSupabaseClient();
  if (client) {
    try {
      const payload = items.map(mapQuestionToSupabase);

      // Upsert multiple questions in one single call!
      const { error } = await client.from("questions").upsert(payload);

      if (!error) {
        // Return successfully with mutated UUID ids so client updates accordingly
        return res.json({ success: true, ids: items.map(i => i.id) });
      } else {
        console.error("Supabase upsert questions error:", error);
      }
    } catch (e: any) {
      console.error("Supabase exception during insert:", e);
    }
  }

  // Backup to local db
  const local = loadLocalDb();
  for (const item of items) {
    const index = local.questions.findIndex((q: any) => convertToUUID(q.id) === item.id || q.id === item.id);
    if (index >= 0) {
      local.questions[index] = item;
    } else {
      local.questions.unshift(item);
    }
  }
  saveLocalDb(local);
  res.json({ success: true, ids: items.map(i => i.id) });
});

app.delete("/api/questions/:id", async (req, res) => {
  const { id } = req.params;
  const mappedId = convertToUUID(id);
  const client = getSupabaseClient();
  if (client) {
    try {
      const { error } = await client.from("questions").delete().eq("id", mappedId);
      if (!error) {
        return res.json({ success: true });
      } else {
        console.error("Delete question error:", error);
      }
    } catch (_) {}
  }

  // Backup local db
  const local = loadLocalDb();
  local.questions = local.questions.filter((q: any) => convertToUUID(q.id) !== mappedId && q.id !== id);
  saveLocalDb(local);
  res.json({ success: true });
});

// LEADERBOARD ENDPOINTS
app.get("/api/leaderboard", async (req, res) => {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client.from("leaderboard").select("*").order("score", { ascending: false });
      if (!error && data) {
        if (data.length === 0) {
          const local = loadLocalDb();
          if (local.leaderboard && local.leaderboard.length > 0) {
            console.log("Auto-seeding empty Supabase leaderboard list...");
            const mapped = local.leaderboard.map(mapLeaderboardToSupabase);
            await client.from("leaderboard").insert(mapped);
            return res.json(local.leaderboard);
          }
        }
        return res.json(data.map(mapLeaderboardFromSupabase));
      }
    } catch (_) {}
  }
  res.json(loadLocalDb().leaderboard);
});

app.post("/api/leaderboard", async (req, res) => {
  const record = req.body;
  if (!record.id) {
    record.id = convertToUUID("l_" + Date.now() + "_" + Math.floor(Math.random() * 1000));
  } else {
    record.id = convertToUUID(record.id);
  }

  const client = getSupabaseClient();
  if (client) {
    try {
      const payload = mapLeaderboardToSupabase(record);
      const { error } = await client.from("leaderboard").insert(payload);
      if (!error) {
        return res.json({ success: true, id: record.id });
      } else {
        console.error("Leaderboard insert error:", error);
      }
    } catch (_) {}
  }

  const local = loadLocalDb();
  local.leaderboard = local.leaderboard.filter((i: any) => convertToUUID(i.id) !== record.id && i.id !== record.id);
  local.leaderboard.push(record);
  local.leaderboard.sort((a: any, b: any) => b.score - a.score);
  saveLocalDb(local);
  res.json({ success: true, id: record.id });
});

app.delete("/api/leaderboard/:id", async (req, res) => {
  const { id } = req.params;
  const mappedId = convertToUUID(id);
  const client = getSupabaseClient();
  if (client) {
    try {
      const { error } = await client.from("leaderboard").delete().eq("id", mappedId);
      if (!error) {
        return res.json({ success: true });
      }
    } catch (_) {}
  }

  const local = loadLocalDb();
  local.leaderboard = local.leaderboard.filter((item: any) => convertToUUID(item.id) !== mappedId && item.id !== id);
  saveLocalDb(local);
  res.json({ success: true });
});

// EXAM ROOMS ENDPOINTS
app.get("/api/exam-rooms", async (req, res) => {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client.from("exam_rooms").select("*").order("created_at", { ascending: false });
      if (!error && data) {
        if (data.length === 0) {
          const local = loadLocalDb();
          if (local.examRooms && local.examRooms.length > 0) {
            console.log("Auto-seeding empty Supabase exam rooms...");
            const mapped = local.examRooms.map(mapExamRoomToSupabase);
            await client.from("exam_rooms").insert(mapped);
            return res.json(local.examRooms);
          }
        }
        return res.json(data.map(mapExamRoomFromSupabase));
      }
    } catch (_) {}
  }
  res.json(loadLocalDb().examRooms);
});

app.post("/api/exam-rooms", async (req, res) => {
  const room = req.body;
  if (!room.id) {
    room.id = convertToUUID("room_" + Date.now() + "_" + Math.floor(Math.random() * 1000));
  } else {
    room.id = convertToUUID(room.id);
  }

  const client = getSupabaseClient();
  if (client) {
    try {
      const payload = mapExamRoomToSupabase(room);
      const { error } = await client.from("exam_rooms").insert(payload);
      if (!error) {
        return res.json({ success: true, id: room.id });
      } else {
        console.error("Exam room insert error:", error);
      }
    } catch (_) {}
  }

  const local = loadLocalDb();
  local.examRooms = local.examRooms.filter((r: any) => convertToUUID(r.id) !== room.id && r.id !== room.id);
  local.examRooms.unshift(room);
  saveLocalDb(local);
  res.json({ success: true, id: room.id });
});

// EXAM HISTORY LOGS ENDPOINTS
app.get("/api/exam-history-logs", async (req, res) => {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client.from("exam_history_logs").select("*").order("created_at", { ascending: false });
      if (!error && data) {
        if (data.length === 0) {
          const local = loadLocalDb();
          if (local.examHistoryLogs && local.examHistoryLogs.length > 0) {
            console.log("Auto-seeding empty Supabase logs...");
            const mapped = local.examHistoryLogs.map(mapHistoryLogToSupabase);
            await client.from("exam_history_logs").insert(mapped);
            return res.json(local.examHistoryLogs);
          }
        }
        return res.json(data.map(mapHistoryLogFromSupabase));
      }
    } catch (_) {}
  }
  res.json(loadLocalDb().examHistoryLogs);
});

app.post("/api/exam-history-logs", async (req, res) => {
  const log = req.body;
  if (!log.id) {
    log.id = convertToUUID("log_" + Date.now() + "_" + Math.floor(Math.random() * 1000));
  } else {
    log.id = convertToUUID(log.id);
  }

  const client = getSupabaseClient();
  if (client) {
    try {
      const payload = mapHistoryLogToSupabase(log);
      const { error } = await client.from("exam_history_logs").insert(payload);
      if (!error) {
        return res.json({ success: true, id: log.id });
      } else {
        console.error("Exam history log insert error:", error);
      }
    } catch (_) {}
  }

  const local = loadLocalDb();
  local.examHistoryLogs = local.examHistoryLogs.filter((h: any) => convertToUUID(h.id) !== log.id && h.id !== log.id);
  local.examHistoryLogs.unshift(log);
  saveLocalDb(local);
  res.json({ success: true, id: log.id });
});


// API ROUTES FOR GEMINI
app.post("/api/generate-multiple-questions", async (req, res) => {
  try {
    const { prompt, grade, subject } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Nội dung tài liệu thô để sinh câu hỏi trống!" });
    }

    if (!apiKey) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY chưa được cấu hình trong bảng Secrets!" 
      });
    }

    // We will generate four types: SINGLE (Một đáp án), MULTIPLE (Nhiều đáp án), TRUE FALSE, SHORT_ANSWER.
    // To get as close to 60 questions each as possible, we do parallel calls.
    // Each call asks for up to 60 detailed, unique, high-quality questions on every detail of the document text.
    
    const generateType = async (type: 'SINGLE' | 'MULTIPLE' | 'TRUE FALSE' | 'SHORT_ANSWER', typeName: string, num: number) => {
      let formatSchema = "";
      if (type === 'SINGLE') {
        formatSchema = `{
  "content": "Nội dung câu hỏi trắc nghiệm một lựa chọn rõ ràng và sâu sắc",
  "category": "Lịch sử" hoặc "Địa lí" hoặc "Chung",
  "type": "SINGLE",
  "grade": "6" hoặc "7" hoặc "8" hoặc "9",
  "options": [
    { "text": "Phương án A", "link": "", "image": "" },
    { "text": "Phương án B", "link": "", "image": "" },
    { "text": "Phương án C", "link": "", "image": "" },
    { "text": "Phương án D", "link": "", "image": "" }
  ],
  "correctAnswer": 0,
  "explanation": "Giải thích tại sao phương án được chọn là đúng nhằm mục đích học tập."
}`;
      } else if (type === 'MULTIPLE') {
        formatSchema = `{
  "content": "Nội dung câu hỏi trắc nghiệm có từ 2 hay nhiều hơn 2 lựa chọn đúng đồng thời để rèn luyện kỹ năng tốt",
  "category": "Lịch sử" hoặc "Địa lí" hoặc "Chung",
  "type": "MULTIPLE",
  "grade": "6" hoặc "7" hoặc "8" hoặc "9",
  "options": [
    { "text": "Phương án đúng thứ nhất", "link": "", "image": "" },
    { "text": "Phương án sai", "link": "", "image": "" },
    { "text": "Phương án đúng thứ hai", "link": "", "image": "" },
    { "text": "Phương án sai khác", "link": "", "image": "" }
  ],
  "correctAnswer": [0, 2], // Mảng chứa các index số nguyên của các đáp án đúng của câu hỏi này (ví dụ: [0, 2], [0, 1, 3]...)
  "explanation": "Giải thích chi tiết tại sao các phương án được lựa chọn này là chính xác hoàn toàn."
}`;
      } else if (type === 'TRUE FALSE') {
        formatSchema = `{
  "content": "Nhận định lịch sử hoặc địa lí cần học sinh xác định Đúng hay Sai",
  "category": "Lịch sử" hoặc "Địa lí" hoặc "Chung",
  "type": "TRUE FALSE",
  "grade": "6" hoặc "7" hoặc "8" hoặc "9",
  "options": [
    { "text": "Đúng", "link": "", "image": "" },
    { "text": "Sai", "link": "", "image": "" }
  ],
  "correctAnswer": 0,
  "explanation": "Giải thích chi tiết tại sao nhận định này là Đúng hoặc Sai."
}`;
      } else if (type === 'SHORT_ANSWER') {
        formatSchema = `{
  "content": "Câu hỏi yêu cầu câu trả lời ngắn dưới dạng một cụm từ, con số hoặc mốc lịch sử ngắn gọn",
  "category": "Lịch sử" hoặc "Địa lí" hoặc "Chung",
  "type": "SHORT_ANSWER",
  "grade": "6" hoặc "7" hoặc "8" hoặc "9",
  "options": [],
  "correctAnswer": "Câu trả lời đúng ngắn gọn (ví dụ: '1945' hoặc 'Hồ Chí Minh')",
  "explanation": "Giải thích ngắn gọn ý nghĩa thông tin câu trả lời."
}`;
      }

      const targetGradeDesc = grade ? `Dành riêng cho Khối lớp: "${grade}". Hãy gán thuộc tính "grade" là "${grade}" cho mọi câu hỏi.` : 'Phân bổ đều cho các khối lớp THCS: "6", "7", "8", và "9"';
      const targetSubjectDesc = (subject && subject !== 'Tự động') ? `Dành riêng cho phân môn hoặc lĩnh vực kiến thức: "${subject}". Hãy gán thuộc tính "category" của mọi câu hỏi được sinh ra là "${subject}".` : 'Hãy tự động đánh giá phân biệt nội dung để gán "category" là "Lịch sử" hoặc "Địa lí" phù hợp nhất.';

      const systemPrompt = `Bạn là một chuyên gia khảo thí thiết kế đề thi môn Lịch sử và Địa lí xuất sắc cấp THCS.
Nhiệm vụ: Hãy nghiên cứu kỹ văn bản tài liệu học tập được cung cấp, sau đó soạn thảo và sinh ra danh sách tối đa ${num} câu hỏi thuộc loại [${typeName}] cực kỳ chất lượng, bám sát từng sự kiện, địa danh, mốc thời gian, số liệu có trong văn bản.
Khai thác triệt để: Hãy tạo ra số lượng câu hỏi nhiều nhất có thể (lên tới tối đa ${num} câu hỏi độc lập, không trùng lặp đối với loại câu hỏi này).
Điểm nhấn mục tiêu khối học và phân môn:
1. ${targetGradeDesc}
2. ${targetSubjectDesc}

Cấu trúc từng câu hỏi trong mảng JSON phải đúng 100% định dạng schema sau:
${formatSchema}

* Lưu ý đặc biệt:
1. Khối lớp "grade" BẮT BUỘC chỉ được chọn một trong bốn giá trị chuỗi: "6", "7", "8", "9".${grade ? ` Ở câu hỏi này, bắt buộc gán cứng là "${grade}".` : ''}
2. "correctAnswer" đối với loại SINGLE là index số nguyên của mảng options (bắt đầu từ 0). Đối với MULTIPLE là một MẢNG các chỉ số nguyên (ví dụ: [0, 2] hoặc [1, 2, 3]). Đối với TRUE FALSE là 0 (Đúng) hoặc 1 (Sai). Đối với SHORT_ANSWER là một chuỗi văn bản (string) chính xác tuyệt đối.
3. Với loại "TRUE FALSE", chỉ cần cung cấp đúng 2 options: [{"text": "Đúng", "link": "", "image": ""}, {"text": "Sai", "link": "", "image": ""}] và "correctAnswer" là 0 hoặc 1.
4. Nghiêm cấm trả về bất kỳ văn bản giải thích phụ nào ở ngoài, không bọc JSON trong khối dấu nháy ngược \`\`\`json. Hãy trả về trực tiếp một mảng JSON hợp lệ chứa các câu hỏi dạng: [ ... ].`;

      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
          },
        });

        let text = response.text || "";
        text = text.trim();
        if (text.startsWith("```")) {
          const firstNewline = text.indexOf("\n");
          if (firstNewline !== -1) {
            text = text.substring(firstNewline + 1);
          } else {
            text = text.substring(3);
          }
          if (text.endsWith("```")) {
            text = text.substring(0, text.length - 3);
          }
          text = text.trim();
        }
        const parsed = JSON.parse(text);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.error(`Error generating ${type}:`, e);
        return [];
      }
    };

    // Parallel calls for outstanding volume and variety of types
    const [singleQs, multipleQs, trueFalseQs, shortQs] = await Promise.all([
      generateType('SINGLE', 'Trắc nghiệm một lựa chọn (SINGLE)', 60),
      generateType('MULTIPLE', 'Trắc nghiệm nhiều lựa chọn (MULTIPLE)', 60),
      generateType('TRUE FALSE', 'Đúng / Sai (TRUE FALSE)', 60),
      generateType('SHORT_ANSWER', 'Trả lời ngắn (SHORT_ANSWER)', 60)
    ]);

    const combined = [...singleQs, ...multipleQs, ...trueFalseQs, ...shortQs];

    if (combined.length === 0) {
      return res.status(500).json({ error: "Không thể trích xuất câu hỏi từ tài liệu đã cung cấp. Vui lòng kiểm tra lại nội dung tệp." });
    }

    res.json({ success: true, questions: combined });
  } catch (err: any) {
    console.error("Gemini Generate Multiple Questions Error:", err);
    res.status(500).json({ error: err.message || "Lỗi tự động phân phối câu hỏi từ Gemini AI" });
  }
});

app.post("/api/generate-question", async (req, res) => {
  try {
    const { prompt, grade } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Nội dung tài liệu thô trống!" });
    }

    if (!apiKey) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY chưa được cấu hình trong bảng Secrets!" 
      });
    }

    const systemPrompt = `Bạn là chuyên gia thiết kế đề thi môn Lịch sử và Địa lí cấp THCS. Hãy đọc văn bản thô được dán ở dưới và trích xuất hoặc tạo ra chính xác 1 câu hỏi trắc nghiệm chất lượng cao bằng Tiếng Việt phù hợp cho Khối lớp ${grade || '6'} bám sát nội dung.
Nghiêm cấm trả về định dạng markdown hay văn bản thô bên ngoài, chỉ trả về duy nhất chuỗi JSON thô hợp lệ theo cấu trúc sau:
{
  "content": "Nội dung câu hỏi cụ thể, học thuật, dễ hiểu",
  "category": "OT1",
  "grade": "${grade || '6'}",
  "type": "SINGLE",
  "options": [
    { "text": "Phương án A", "link": "", "image": "" },
    { "text": "Phương án B", "link": "", "image": "" },
    { "text": "Phương án C", "link": "", "image": "" },
    { "text": "Phương án D", "link": "", "image": "" }
  ],
  "correctAnswer": 0,
  "explanation": "Giải thích cặn kẽ vì sao phương án được chọn là đúng đắn dựa trên kiến thức lịch sử địa lí."
}

Hãy tự quyết định câu hỏi thuộc môn Lịch sử hay Địa lí tùy theo nội dung văn bản. "correctAnswer" là chỉ số nguyên (0, 1, 2, hoặc 3) của phương án đúng trong mảng options. Trả về đúng JSON thô.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
      },
    });

    let text = response.text || "";
    text = text.trim();
    if (text.startsWith("```")) {
      const firstNewline = text.indexOf("\n");
      if (firstNewline !== -1) {
        text = text.substring(firstNewline + 1);
      } else {
        text = text.substring(3);
      }
      if (text.endsWith("```")) {
        text = text.substring(0, text.length - 3);
      }
      text = text.trim();
    }
    res.json({ success: true, text });
  } catch (err: any) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: err.message || "Không thể kết nối máy chủ AI" });
  }
});

app.post("/api/parse-pdf", async (req, res) => {
  try {
    const { pdfBase64, filename } = req.body;
    if (!pdfBase64) {
      return res.status(400).json({ error: "Nội dung tệp PDF trống!" });
    }

    if (!apiKey) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY chưa được cấu hình trong bảng Secrets!" 
      });
    }

    // Safely sanitize the base64 content
    let base64Clean = pdfBase64;
    if (typeof base64Clean === "string" && base64Clean.includes("base64,")) {
      base64Clean = base64Clean.split("base64,")[1];
    }
    base64Clean = base64Clean.trim();

    const pdfPart = {
      inlineData: {
        data: base64Clean,
        mimeType: "application/pdf"
      }
    };

    const userPrompt = "Hãy phân tích tệp tài liệu PDF này và trích xuất lại toàn bộ văn bản/nội dung kiến thức thô dạng chữ (plain text) bên trong một cách đầy đủ, chính xác từng từ bằng Tiếng Việt. Giữ nguyên cấu trúc thông tin quan trọng. Nghiêm cấm tóm tắt, nghiêm cấm viết quá ngắn gọn, hãy trích xuất toàn bộ dữ liệu chi tiết nhất có thể để phục vụ việc soạn đề thi trắc nghiệm học thuật. Nếu tài liệu chứa hình ảnh hoặc bản quét, hãy tự động nhận diện ký tự quang học (OCR) để trích xuất đầy đủ văn bản tiếng Việt bám sát thực tế nhất.";

    let response;
    let lastError = null;
    const modelsToTry = [
      "gemini-3.5-flash",
      "gemini-3.1-flash-lite",
      "gemini-flash-latest"
    ];

    for (const modelName of modelsToTry) {
      try {
        console.log(`[PDF SDK] Attempting PDF parse with model: ${modelName}`);
        const attemptResponse = await ai.models.generateContent({
          model: modelName,
          contents: {
            parts: [
              pdfPart,
              { text: userPrompt }
            ]
          }
        });
        if (attemptResponse && attemptResponse.text) {
          response = attemptResponse;
          console.log(`[PDF SDK] Successfully extracted text with model: ${modelName}`);
          break;
        }
      } catch (err: any) {
        console.error(`[PDF SDK] Error trying model ${modelName}:`, err.message || err);
        lastError = err;
      }
    }

    if (!response || !response.text) {
      const errorMsg = lastError?.message || "Không thể nạp nội dung tài liệu PDF từ các mô hình Gemini. Hãy chắc chắn tập tin PDF của bạn không bị khóa mật khẩu và chứa chữ đọc được.";
      return res.status(500).json({ error: errorMsg });
    }

    res.json({ success: true, text: response.text });
  } catch (err: any) {
    console.error("Gemini PDF Parse Error:", err);
    res.status(500).json({ error: err.message || "Lỗi nghiêm trọng khi trích xuất tài liệu từ hệ thống" });
  }
});

// API endpoint for TTS Voice synthesis using Gemini
app.post("/api/synth-tts", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Nội dung văn bản trống!" });
    }

    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY chưa được cấu hình!" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: `Đọc rõ ràng và biểu cảm bằng tiếng Việt: ${text}` }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Puck" },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      res.json({ success: true, audio: base64Audio });
    } else {
      res.status(500).json({ error: "Không nhận được luồng âm thanh từ Gemini" });
    }
  } catch (err: any) {
    console.error("Gemini TTS Error:", err);
    res.status(500).json({ error: err.message || "Lỗi tạo giọng nói" });
  }
});

// SETTINGS ENDPOINTS
app.get("/api/settings", (req, res) => {
  const local = loadLocalDb();
  if (!local.settings) {
    local.settings = {
      maintenanceMode: false,
      maintenanceTime: "BT",
      blockF12: false
    };
    saveLocalDb(local);
  }
  res.json(local.settings);
});

app.post("/api/settings", (req, res) => {
  const local = loadLocalDb();
  if (!local.settings) {
    local.settings = {
      maintenanceMode: false,
      maintenanceTime: "BT",
      blockF12: false
    };
  }
  local.settings = {
    ...local.settings,
    ...req.body
  };
  saveLocalDb(local);
  res.json({ success: true, settings: local.settings });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "QuizMaster API is running" });
});

async function startServer() {
  const PORT = 3000;
  
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Statics serve is fallback when not on Vercel
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running at http://0.0.0.0:${PORT}`);
    });
  }
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
