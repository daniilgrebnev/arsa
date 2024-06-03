import { RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../../../shadcnui/ui/resizable"
import { Charts } from "./Charts"
import Car from "./car/Car"

export const Tires = () => {
  const [chartsIsOpen, setChartsIsOpen] = useState(false)
  const { vehicle_uid, data } = useSelector((state: RootState) => state.car)
  const { isOpen } = useSelector((state: RootState) => state.wheelChart)
  useEffect(() => {
    setChartsIsOpen(isOpen)
  }, [isOpen])

  return (
    <div className="h-full">
      <ResizablePanelGroup className="h-full" direction="vertical">
        <ResizablePanel minSize={30} className="overflow-auto relative">
          <Car />
        </ResizablePanel>
        <ResizableHandle className="h-[1px] bg-orange-400" />

        <ResizablePanel minSize={30} defaultSize={50} className="transition-all">
          <Charts />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
