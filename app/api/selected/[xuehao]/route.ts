import { type NextRequest, NextResponse } from "next/server"
import { 获取学生选课, 获取排课详情 } from "@/lib/data"

export async function GET(request: NextRequest, { params }: { params: Promise<{ xuehao: string }> }) {
  const { xuehao } = await params
  const 选课记录 = 获取学生选课(xuehao)

  const 详细数据 = 选课记录.map((记录) => {
    const 详情 = 获取排课详情(记录.排课ID)
    return {
      选课ID: 记录.选课ID,
      排课ID: 记录.排课ID,
      课程名: 详情?.课程名,
      学分: 详情?.学分,
      教师姓名: 详情?.教师姓名,
      上课时间: 详情?.上课时间,
      教室: 详情?.教室,
      操作时间: 记录.操作时间,
    }
  })

  return NextResponse.json({ success: true, data: 详细数据 })
}
