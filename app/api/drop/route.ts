import { type NextRequest, NextResponse } from "next/server"
import { 退选课程 } from "@/lib/data"

export async function POST(request: NextRequest) {
  const { 选课ID } = await request.json()

  if (退选课程(选课ID)) {
    return NextResponse.json({ success: true, msg: "退课成功！" })
  }

  return NextResponse.json({ success: false, msg: "退课失败" })
}
