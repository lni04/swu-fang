"use client"

import { useState } from "react"

interface LoginFormProps {
  onLogin: (学号: string, 姓名: string) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [学号, set学号] = useState("2024001")
  const [密码, set密码] = useState("123456")
  const [错误信息, set错误信息] = useState("")

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 学号, 密码 }),
    })
    const data = await res.json()

    if (data.success) {
      onLogin(data.data.学号, data.data.姓名)
    } else {
      set错误信息(data.msg)
    }
  }

  return (
    <div className="mt-24">
      <table
        className="mx-auto border border-collapse"
        style={{ backgroundColor: "#f0f0f0" }}
        cellPadding={5}
        cellSpacing={0}
      >
        <tbody>
          <tr style={{ backgroundColor: "#cccccc" }}>
            <td colSpan={2} className="text-center font-bold border border-[#999]">
              【学生登录】
            </td>
          </tr>
          <tr>
            <td className="text-right border border-[#999]">学　号：</td>
            <td className="border border-[#999]">
              <input
                type="text"
                value={学号}
                onChange={(e) => set学号(e.target.value)}
                className="border border-[#999] px-1"
                style={{ fontFamily: "宋体", fontSize: "12px" }}
              />
            </td>
          </tr>
          <tr>
            <td className="text-right border border-[#999]">密　码：</td>
            <td className="border border-[#999]">
              <input
                type="password"
                value={密码}
                onChange={(e) => set密码(e.target.value)}
                className="border border-[#999] px-1"
                style={{ fontFamily: "宋体", fontSize: "12px" }}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="text-center border border-[#999]">
              <button
                onClick={handleLogin}
                className="mx-1 px-2 py-0.5 cursor-pointer"
                style={{
                  background: "#d4d0c8",
                  border: "2px outset #ffffff",
                  fontFamily: "宋体",
                  fontSize: "12px",
                }}
              >
                【登 录】
              </button>
              <button
                onClick={() => {
                  set学号("")
                  set密码("")
                }}
                className="mx-1 px-2 py-0.5 cursor-pointer"
                style={{
                  background: "#d4d0c8",
                  border: "2px outset #ffffff",
                  fontFamily: "宋体",
                  fontSize: "12px",
                }}
              >
                【重 置】
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="text-center mt-2 text-red-600 text-xs">※ 初始密码：123456</p>
      {错误信息 && <p className="text-center mt-2 text-red-600 text-xs">{错误信息}</p>}
    </div>
  )
}
