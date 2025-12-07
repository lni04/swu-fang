const express = require("express")
const path = require("path")
const { db, initDatabase } = require("./database")

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

// 登录
app.post("/api/login", (req, res) => {
  const { 学号, 密码 } = req.body
  db.get(
    `SELECT 账号.*, 学生.姓名 FROM 账号 JOIN 学生 ON 账号.学号 = 学生.学号 
          WHERE 账号.学号 = ? AND 密码 = ? AND 状态 = '正常'`,
    [学号, 密码],
    (err, row) => {
      if (err) return res.json({ success: false, msg: "系统错误" })
      if (row) res.json({ success: true, data: { 学号: row.学号, 姓名: row.姓名 } })
      else res.json({ success: false, msg: "学号或密码错误" })
    },
  )
})

// 获取可选课程
app.get("/api/courses", (req, res) => {
  db.all(
    `SELECT 排课.*, 课程.课程名, 课程.学分, 课程.学时, 教师.姓名 as 教师姓名
          FROM 排课 
          JOIN 课程 ON 排课.课程号 = 课程.课程号
          JOIN 教师 ON 排课.教师ID = 教师.教师ID`,
    (err, rows) => {
      if (err) return res.json({ success: false, msg: "查询失败" })
      res.json({ success: true, data: rows })
    },
  )
})

// 获取已选课程
app.get("/api/selected/:学号", (req, res) => {
  db.all(
    `SELECT 选课.*, 排课.上课时间, 排课.教室, 课程.课程名, 课程.学分, 教师.姓名 as 教师姓名
          FROM 选课
          JOIN 排课 ON 选课.排课ID = 排课.排课ID
          JOIN 课程 ON 排课.课程号 = 课程.课程号
          JOIN 教师 ON 排课.教师ID = 教师.教师ID
          WHERE 选课.学号 = ? AND 选课.状态 = '已选'`,
    [req.params.学号],
    (err, rows) => {
      if (err) return res.json({ success: false, msg: "查询失败" })
      res.json({ success: true, data: rows })
    },
  )
})

// 选课
app.post("/api/select", (req, res) => {
  const { 学号, 排课ID } = req.body
  db.get(`SELECT * FROM 选课 WHERE 学号 = ? AND 排课ID = ? AND 状态 = '已选'`, [学号, 排课ID], (err, row) => {
    if (row) return res.json({ success: false, msg: "您已选择该课程！" })
    const now = new Date().toLocaleString("zh-CN")
    db.run(`INSERT INTO 选课 (学号, 排课ID, 状态, 操作时间) VALUES (?, ?, '已选', ?)`, [学号, 排课ID, now], (err) => {
      if (err) return res.json({ success: false, msg: "选课失败" })
      res.json({ success: true, msg: "选课成功！" })
    })
  })
})

// 退课
app.post("/api/drop", (req, res) => {
  const { 选课ID } = req.body
  const now = new Date().toLocaleString("zh-CN")
  db.run(`UPDATE 选课 SET 状态 = '已退', 操作时间 = ? WHERE 选课ID = ?`, [now, 选课ID], (err) => {
    if (err) return res.json({ success: false, msg: "退课失败" })
    res.json({ success: true, msg: "退课成功！" })
  })
})

initDatabase().then(() => {
  app.listen(3000, () => console.log("教务系统运行在 http://localhost:3000"))
})
