import { type NextRequest, NextResponse } from "next/server"
import { 账号列表, 学生列表 } from "@/lib/data"

export async function POST(request: NextRequest) {
  const { 学号, 密码 } = await request.json()

  const 账号 = 账号列表.find((a) => a.学号 === 学号 && a.密码 === 密码 && a.状态 === "正常")

  if (!账号) {
    return NextResponse.json({ success: false, msg: "学号或密码错误" })
  }

  const 学生 = 学生列表.find((s) => s.学号 === 学号)

  return NextResponse.json({
    success: true,
    data: { 学号: 账号.学号, 姓名: 学生?.姓名 },
  })
}
