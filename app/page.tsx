"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { MainPanel } from "@/components/main-panel"

export default function Home() {
  const [user, setUser] = useState<{ 学号: string; 姓名: string } | null>(null)

  return (
    <div
      className="min-h-screen p-2.5"
      style={{
        fontFamily: "宋体, SimSun, serif",
        fontSize: "12px",
        backgroundColor: "#e8e8e8",
      }}
    >
      {/* 顶部标题栏 */}
      <table width="100%" cellSpacing={0} cellPadding={0}>
        <tbody>
          <tr style={{ backgroundColor: "#336699", height: "60px" }}>
            <td className="text-center">
              <span className="text-white text-xl font-bold">★ 教务管理系统 ★</span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* 登录框或主面板 */}
      {!user ? (
        <LoginForm onLogin={(学号, 姓名) => setUser({ 学号, 姓名 })} />
      ) : (
        <MainPanel 学号={user.学号} 姓名={user.姓名} onLogout={() => setUser(null)} />
      )}

      <hr className="border-0 border-t border-dashed border-[#999] mt-4" />
      <p className="text-center text-gray-500 text-xs mt-2">Copyright © 2025 教务处 版权所有 | 建议使用IE6.0浏览器</p>
    </div>
  )
}
