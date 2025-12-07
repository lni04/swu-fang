"use client"

interface SelectedCourse {
  选课ID: number
  排课ID: number
  课程名: string
  学分: number
  教师姓名: string
  上课时间: string
  教室: string
  操作时间: string
}

interface SelectedTableProps {
  selected: SelectedCourse[]
  onDrop: (选课ID: number) => void
}

export function SelectedTable({ selected, onDrop }: SelectedTableProps) {
  const 总学分 = selected.reduce((sum, c) => sum + (c.学分 || 0), 0)

  return (
    <div>
      <div className="mb-2 p-2 text-sm" style={{ backgroundColor: "#ffffcc", border: "1px dashed #999" }}>
        已选 <span className="font-bold text-blue-600">{selected.length}</span> 门课程，共计{" "}
        <span className="font-bold text-red-600">{总学分}</span> 学分
      </div>
      <table className="w-full border border-collapse text-xs" cellPadding={3} cellSpacing={0}>
        <thead>
          <tr style={{ backgroundColor: "#cccccc" }}>
            <th className="border border-[#999]">课程名</th>
            <th className="border border-[#999]">学分</th>
            <th className="border border-[#999]">授课教师</th>
            <th className="border border-[#999]">上课时间</th>
            <th className="border border-[#999]">教室</th>
            <th className="border border-[#999]">选课时间</th>
            <th className="border border-[#999]">操作</th>
          </tr>
        </thead>
        <tbody>
          {selected.length === 0 ? (
            <tr>
              <td colSpan={7} className="border border-[#999] text-center text-gray-500 py-4">
                暂无已选课程
              </td>
            </tr>
          ) : (
            selected.map((c) => (
              <tr key={c.选课ID}>
                <td className="border border-[#999] text-center">{c.课程名}</td>
                <td className="border border-[#999] text-center">{c.学分}</td>
                <td className="border border-[#999] text-center">{c.教师姓名}</td>
                <td className="border border-[#999] text-center">{c.上课时间}</td>
                <td className="border border-[#999] text-center">{c.教室}</td>
                <td className="border border-[#999] text-center">{c.操作时间}</td>
                <td className="border border-[#999] text-center">
                  <button
                    onClick={() => onDrop(c.选课ID)}
                    className="px-2 py-0.5 cursor-pointer"
                    style={{
                      background: "#d4d0c8",
                      border: "2px outset #ffffff",
                      fontFamily: "宋体",
                      fontSize: "12px",
                    }}
                  >
                    【退选】
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
