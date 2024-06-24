import { useEffect, useState } from "react"
import "./table.css"

export const Table = () => {
  const [tableWidths, setTableWidths] = useState<string[]>()

  const data = [
    {
      head: "Headdsssds",
      name: "pressure",
      body: [
        {
          item: "body",
        },
      ],
    },
    {
      head: "Head",
      name: "pressure-d",
      body: [
        {
          item: "bodysdsdsxs",
        },
      ],
    },
    {
      head: "Head",
      name: "pressure-v",
      body: [
        {
          item: "body",
        },
      ],
    },
    {
      head: "Head",
      name: "pressure-m",
      body: [
        {
          item: "body",
        },
      ],
    },
  ]

  useEffect(() => {
    const tableContainerWidth = 0
    const tableChildren = document.getElementById("table")?.children || []
    const tableChildrenWidths = Array.from(tableChildren).map((item) => item.clientWidth)
    console.log(tableChildrenWidths)
  }, [])
  return (
    <div id="table" className="table">
      {data.map((item) => (
        <div id={item.name} className="table-col ">
          <div className="">{item.head}</div>
          {item.body.map((i) => (
            <div>i.item</div>
          ))}
        </div>
      ))}
    </div>
  )
}
