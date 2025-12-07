"use client"

import { useState, useEffect, useCallback } from "react"
import { CourseTable } from "./course-table"
import { SelectedTable } from "./selected-table"

interface MainPanelProps {
  学号: string
  姓名: string
  onLogout: () => void
}

export function MainPanel({ 学号, 姓名, onLogout }: MainPanelProps) {
  const [courses, setCourses] = useState<any[]>([])
  const [selected, setSelected] = useState<any[]>([])

  const loadCourses = useCallback(async () => {
    const res = await fetch("/api/courses")
    const data = await res.json()
    if (data.success) {
      setCourses(data.data)
    }
  }, [])

  const loadSelected = useCallback(async () => {
    const res = await fetch(`/api/selected/${学号}`)
    const data = await res.json()
    if (data.success) {
      setSelected(data.data)
    }
  }, [学号])

  useEffect(() => {
    loadCourses()
    loadSelected()
  }, [loadCourses, loadSelected])

  const handleSelect = async (排课ID: number) => {
    if (!confirm("确定选择该课程吗？")) return
    const res = await fetch("/api/select", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 学号, 排课ID }),
    })
    const data = await res.json()
    alert(data.msg)
    if (data.success) {
      loadSelected()
    }
  }

  const handleDrop = async (选课ID: number) => {
    if (!confirm("确定退选该课程吗？")) return
    const res = await fetch("/api/drop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 选课ID }),
    })
    const data = await res.json()
    alert(data.msg)
    if (data.success) {
      loadSelected()
    }
  }

  // 获取已选的排课ID列表
  const selectedIds = selected.map((s) => s.排课ID)

  return (
    <div className="m-2.5 p-2.5" style={{ backgroundColor: "#ffffff", border: "1px solid #999999" }}>
      <table className="w-full mb-2">
        <tbody>
          <tr>
            <td>
              当前用户：
              <span className="text-blue-600 font-bold">
                {姓名}（{学号}）
              </span>
            </td>
            <td className="text-right">
              <button
                onClick={onLogout}
                className="px-2 py-0.5 cursor-pointer"
                style={{
                  background: "#d4d0c8",
                  border: "2px outset #ffffff",
                  fontFamily: "宋体",
                  fontSize: "12px",
                }}
              >
                【退出登录】
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <hr className="border-0 border-t border-dashed border-[#999]" />

      <p className="font-bold my-2">◆ 可选课程列表</p>
      <CourseTable courses={courses} selectedIds={selectedIds} onSelect={handleSelect} />

      <br />
      <p className="font-bold my-2">◆ 已选课程</p>
      <SelectedTable selected={selected} onDrop={handleDrop} />

      <br />
      <div
        className="p-1.5 overflow-hidden whitespace-nowrap animate-marquee"
        style={{
          backgroundColor: "#ffffcc",
          border: "1px dashed #ff0000",
        }}
      >
        <span className="text-red-600">※ 温馨提示：选课期间请勿关闭浏览器，如有问题请联系教务处（电话：88888888）</span>
      </div>
    </div>
  )
}
