import { type NextRequest, NextResponse } from "next/server"
import { 检查是否已选, 添加选课 } from "@/lib/data"

export async function POST(request: NextRequest) {
  const { 学号, 排课ID } = await request.json()

  if (检查是否已选(学号, 排课ID)) {
    return NextResponse.json({ success: false, msg: "您已选择该课程！" })
  }

  添加选课(学号, 排课ID)
  return NextResponse.json({ success: true, msg: "选课成功！" })
}
