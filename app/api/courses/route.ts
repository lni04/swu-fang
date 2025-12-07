import { NextResponse } from "next/server"
import { 排课列表, 课程列表, 教师列表 } from "@/lib/data"

export async function GET() {
  const 课程数据 = 排课列表.map((排课) => {
    const 课程 = 课程列表.find((c) => c.课程号 === 排课.课程号)
    const 教师 = 教师列表.find((t) => t.教师ID === 排课.教师ID)
    return {
      排课ID: 排课.排课ID,
      课程号: 排课.课程号,
      课程名: 课程?.课程名,
      学分: 课程?.学分,
      学时: 课程?.学时,
      教师姓名: 教师?.姓名,
      上课时间: 排课.上课时间,
      教室: 排课.教室,
    }
  })

  return NextResponse.json({ success: true, data: 课程数据 })
}
