const sqlite3 = require("sqlite3").verbose()
const path = require("path")

const db = new sqlite3.Database(path.join(__dirname, "xuanke.db"))

function initDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // 课程表
      db.run(`CREATE TABLE IF NOT EXISTS 课程 (
        课程号 TEXT PRIMARY KEY,
        课程名 TEXT,
        学分 REAL,
        学时 INTEGER
      )`)

      // 教师表
      db.run(`CREATE TABLE IF NOT EXISTS 教师 (
        教师ID INTEGER PRIMARY KEY,
        姓名 TEXT,
        职称 TEXT
      )`)

      // 学生表
      db.run(`CREATE TABLE IF NOT EXISTS 学生 (
        学号 TEXT PRIMARY KEY,
        姓名 TEXT,
        性别 TEXT,
        专业 TEXT,
        联系方式 TEXT
      )`)

      // 排课表
      db.run(`CREATE TABLE IF NOT EXISTS 排课 (
        排课ID INTEGER PRIMARY KEY AUTOINCREMENT,
        课程号 TEXT,
        教师ID INTEGER,
        上课时间 TEXT,
        教室 TEXT,
        FOREIGN KEY (课程号) REFERENCES 课程(课程号),
        FOREIGN KEY (教师ID) REFERENCES 教师(教师ID)
      )`)

      // 账号表
      db.run(`CREATE TABLE IF NOT EXISTS 账号 (
        账号ID INTEGER PRIMARY KEY AUTOINCREMENT,
        学号 TEXT,
        密码 TEXT,
        状态 TEXT,
        FOREIGN KEY (学号) REFERENCES 学生(学号)
      )`)

      // 选课表
      db.run(`CREATE TABLE IF NOT EXISTS 选课 (
        选课ID INTEGER PRIMARY KEY AUTOINCREMENT,
        学号 TEXT,
        排课ID INTEGER,
        状态 TEXT,
        操作时间 TEXT,
        FOREIGN KEY (学号) REFERENCES 学生(学号),
        FOREIGN KEY (排课ID) REFERENCES 排课(排课ID)
      )`)

      // 初始化数据
      db.run(`INSERT OR IGNORE INTO 教师 VALUES (1, '张三', '副教授')`)
      db.run(`INSERT OR IGNORE INTO 教师 VALUES (2, '李四', '讲师')`)

      db.run(`INSERT OR IGNORE INTO 课程 VALUES ('CS101', '程序设计基础', 3, 48)`)
      db.run(`INSERT OR IGNORE INTO 课程 VALUES ('CS102', '数据结构', 4, 64)`)

      db.run(`INSERT OR IGNORE INTO 学生 VALUES ('2024001', '王小明', '男', '计算机科学', '13800138001')`)
      db.run(`INSERT OR IGNORE INTO 学生 VALUES ('2024002', '赵小红', '女', '软件工程', '13800138002')`)

      db.run(`INSERT OR IGNORE INTO 账号 VALUES (1, '2024001', '123456', '正常')`)
      db.run(`INSERT OR IGNORE INTO 账号 VALUES (2, '2024002', '123456', '正常')`)

      db.run(`INSERT OR IGNORE INTO 排课 VALUES (1, 'CS101', 1, '周一3-4节', '教学楼A101')`)
      db.run(`INSERT OR IGNORE INTO 排课 VALUES (2, 'CS102', 2, '周三5-6节', '教学楼B203')`, (err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  })
}

module.exports = { db, initDatabase }
