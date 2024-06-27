import React, { useEffect, useState } from "react"

interface IResizeStartHandler {
  currentId: string | number
  rightElemId: string | number
  e?: React.MouseEvent<HTMLDivElement>
}

interface IWidthList {
  id: string | number
  width: number
}

const MIN_WIDTH_PERCENTAGE = 10 // Minimum width percentage

export const Table = () => {
  const [isResize, setResize] = useState(false)
  const [initialLeft, setInitialLeft] = useState(0)
  const [resizeState, setResizeState] = useState<IResizeStartHandler>({
    currentId: 0,
    rightElemId: 0,
  })
  const [widthArr, setWidthArr] = useState<IWidthList[]>([
    { id: "pressure", width: 25 },
    { id: "pressure-d", width: 25 },
    { id: "pressure-v", width: 25 },
    { id: "pressure-m", width: 25 },
  ])

  const data = [
    {
      head: "Head",
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
          item: "body-d",
        },
      ],
    },
    {
      head: "Head",
      name: "pressure-v",
      body: [
        {
          item: "body-v",
        },
      ],
    },
    {
      head: "Head",
      name: "pressure-m",
      body: [
        {
          item: "body-m",
        },
      ],
    },
  ]

  useEffect(() => {
    if (isResize) {
      const handleMouseMove = (e: MouseEvent) => {
        resizeProgress(e)
      }

      const handleMouseUp = () => {
        setResize(false)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isResize])

  const resizeStart = ({ currentId, rightElemId, e }: IResizeStartHandler) => {
    setResizeState({ currentId, rightElemId })
    setInitialLeft(e ? e.clientX : 0)
    setResize(true)
  }

  const resizeProgress = (e: MouseEvent) => {
    const deltaX = e.clientX - initialLeft
    const tableWidth = document.getElementById("table")?.clientWidth || 0

    setWidthArr((prevWidths) => {
      const newWidths = prevWidths.map((item) => {
        if (item.id === resizeState.currentId) {
          let newWidth = item.width + deltaX / tableWidth
          // Apply minimum width constraint
          if (newWidth < MIN_WIDTH_PERCENTAGE / 100) {
            newWidth = MIN_WIDTH_PERCENTAGE / 100
          }
          return {
            ...item,
            width: newWidth,
          }
        }
        if (item.id === resizeState.rightElemId) {
          let newWidth = item.width - deltaX / tableWidth
          // Apply minimum width constraint
          if (newWidth < MIN_WIDTH_PERCENTAGE / 100) {
            newWidth = MIN_WIDTH_PERCENTAGE / 100
          }
          return {
            ...item,
            width: newWidth,
          }
        }
        return item
      })

      return newWidths
    })

    setInitialLeft(e.clientX)
  }

  return (
    <thead id="table" className="text-nowrap select-none w-full flex items-center justify-center">
      {data.map((item, index) => (
        <th
          style={{
            minWidth: MIN_WIDTH_PERCENTAGE + "%",
            width: widthArr.find((i) => i.id === item.name)?.width + "%" || "fit-content",
          }}
          key={index}
          id={item.name}
          className="relative overflow-hidden border-r"
        >
          <div className="border-2 px-2">{item.head}</div>
          <div></div>
          {data.length !== index + 1 && (
            <div
              onMouseDown={(e) => {
                resizeStart({ currentId: item.name, rightElemId: data[index + 1].name, e })
              }}
              style={{
                right: -2,
                cursor: "col-resize",
              }}
              className="w-2 h-full absolute z-10 top-0"
            ></div>
          )}
        </th>
      ))}
    </thead>
  )
}
