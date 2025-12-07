"use client"

interface CourseData {
  排课ID: number
  课程号: string
  课程名: string
  学分: number
  学时: number
  教师姓名: string
  上课时间: string
  教室: string
}

interface CourseTableProps {
  courses: CourseData[]
  selectedIds: number[] // 已选的排课ID列表
  onSelect: (排课ID: number) => void
}

export function CourseTable({ courses, selectedIds, onSelect }: CourseTableProps) {
  return (
    <table className="w-full border border-collapse text-xs" cellPadding={3} cellSpacing={0}>
      <thead>
        <tr style={{ backgroundColor: "#cccccc" }}>
          <th className="border border-[#999]">课程号</th>
          <th className="border border-[#999]">课程名</th>
          <th className="border border-[#999]">学分</th>
          <th className="border border-[#999]">学时</th>
          <th className="border border-[#999]">授课教师</th>
          <th className="border border-[#999]">上课时间</th>
          <th className="border border-[#999]">教室</th>
          <th className="border border-[#999]">状态</th>
          <th className="border border-[#999]">操作</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((c) => {
          const 已选 = selectedIds.includes(c.排课ID)
          return (
            <tr
              key={c.排课ID}
              style={{
                backgroundColor: 已选 ? "#90EE90" : "transparent",
              }}
            >
              <td className="border border-[#999] text-center">{c.课程号}</td>
              <td className="border border-[#999] text-center">{c.课程名}</td>
              <td className="border border-[#999] text-center">{c.学分}</td>
              <td className="border border-[#999] text-center">{c.学时}</td>
              <td className="border border-[#999] text-center">{c.教师姓名}</td>
              <td className="border border-[#999] text-center">{c.上课时间}</td>
              <td className="border border-[#999] text-center">{c.教室}</td>
              <td className="border border-[#999] text-center">
                {已选 ? (
                  <span className="text-green-700 font-bold">已选</span>
                ) : (
                  <span className="text-gray-500">未选</span>
                )}
              </td>
              <td className="border border-[#999] text-center">
                <button
                  onClick={() => onSelect(c.排课ID)}
                  disabled={已选}
                  className="px-2 py-0.5 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  style={{
                    background: 已选 ? "#aaa" : "#d4d0c8",
                    border: "2px outset #ffffff",
                    fontFamily: "宋体",
                    fontSize: "12px",
                  }}
                >
                  {已选 ? "【已选】" : "【选课】"}
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
