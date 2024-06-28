import { RootState } from "@/store/store"
import React, { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { testData } from "../testData"
import { ObjectSettingsAxles } from "./ObjectSettingsContentItems/Axle/ObjectSettingsAxles"
import { Diag } from "./ObjectSettingsContentItems/Diag/Diag"
import { ObjectSettingsMain } from "./ObjectSettingsContentItems/Main/ObjectSettingsMain"
import { SpeedControl } from "./ObjectSettingsContentItems/Speed/SpeedControl"
import { Driver } from "./ObjectSettingsContentItems/driver/Driver"

interface DataView {
  tab: string
  title: string
}

export const ObjectSettingsContent: React.FC = () => {
  const data = [...testData]

  const { activeTab, dataToView } = useSelector((state: RootState) => state.objectSettings)
  const dataApi = dataToView != null && dataToView

  const refs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({})

  useEffect(() => {
    if (dataToView) {
      const newRefs = dataToView.reduce(
        (acc, value) => {
          acc[value.tab] = React.createRef<HTMLDivElement>()
          return acc
        },
        {} as { [key: string]: React.RefObject<HTMLDivElement> },
      )
      refs.current = newRefs
    }
  }, [dataToView])

  useEffect(() => {
    if (activeTab && refs.current[activeTab]) {
      refs.current[activeTab].current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [activeTab])

  return (
    <div
      style={{
        boxShadow: "20px 0px 30px 10px #bebcbc",
      }}
      className="bg-white h-[100%] w-4/5 rounded-sm overflow-y-hidden p-4"
    >
      <div className="flex w-full flex-col items-center gap-10 justify-start p-3 overflow-y-auto h-full">
        {dataToView?.map((item) => (
          <div
            key={item.tab}
            id={item.tab}
            ref={refs.current[item.tab]}
            className="w-full overflow-hidden overflow-y-auto min-h-[70dvh] max-h-[70dvh]  flex items-start p-4 justify-center"
          >
            {item.tab === "main" && (
              <ObjectSettingsMain {...dataToView.filter((i) => i.tab === "main")[0]} />
            )}
            {item.tab === "tpms" && (
              <ObjectSettingsAxles {...dataToView.filter((i) => i.tab === "tpms")[0]} />
            )}
            {item.tab === "diag" && <Diag {...dataToView.filter((i) => i.tab === "diag")[0]} />}
            {item.tab === "speed_control" && (
              <SpeedControl {...dataToView.filter((i) => i.tab === "speed_control")[0]} />
            )}
            {item.tab === "driver_cards" && (
              <Driver {...dataToView.filter((i) => i.tab === "driver_cards")[0]} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
