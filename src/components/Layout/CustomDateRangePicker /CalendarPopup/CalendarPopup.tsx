import { Popup } from "./../../../../components/Popup/Popup"
import React, { useState } from "react"
import { Calendar } from "../Calendar/Calendar"
import { DateTime } from "ts-luxon"
import { TimePicker } from "../TimePicker/TimePicker"

type propsType = {
  startDate: DateTime
  setStartDate: (date: DateTime) => void
  endDate: DateTime
  setEndDate: (date: DateTime) => void
  isOpenPopup: boolean
  setIsOpenPopup: (isOpen: boolean) => void
  children?: React.ReactNode
}

export const CalendarPopup: React.FC<propsType> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  isOpenPopup,
  setIsOpenPopup,
  children,
}) => {
  const [currentStartDate, setCurrentStartDate] = useState(startDate)
  const [currentEndDate, setCurrentEndDate] = useState(endDate)

  const [isOpenStart, setIsOpenStart] = useState(false)
  const [isOpenEnd, setIsOpenEnd] = useState(false)

  const setCurrentMinuteStart = (minutes: number) => {
    setCurrentStartDate(currentStartDate.set({ minute: minutes }))
  }
  const setCurrentHoursStart = (hours: number) => {
    setCurrentStartDate(currentStartDate.set({ hours: hours }))
  }
  const setCurrentMinuteEnd = (minutes: number) => {
    setCurrentEndDate(currentEndDate.set({ minute: minutes }))
  }
  const setCurrentHoursEnd = (hours: number) => {
    setCurrentEndDate(currentEndDate.set({ hours: hours }))
  }
  return (
    <>
      {isOpenPopup && (
        <Popup
          title="Период"
          onClose={() => {
            setIsOpenPopup(false)
            setIsOpenEnd(false)
            setIsOpenStart(false)
          }}
        >
          {children}
          <div className="date-range__wrapper-popup ">
            <div className="data-calendar">
              <Calendar currentDate={currentStartDate} setCurrentDate={setCurrentStartDate} />
              <div className="data-calendar">
                <TimePicker
                  setHours={setCurrentHoursStart}
                  setMinute={setCurrentMinuteStart}
                  currentTime={{ minutes: currentStartDate.minute, hours: currentStartDate.hour }}
                  isOpen={isOpenStart}
                  setIsOpen={setIsOpenStart}
                />
              </div>
            </div>
            <div className="data-calendar">
              <Calendar currentDate={currentEndDate} setCurrentDate={setCurrentEndDate} />
              <div className="data-calendar">
                <TimePicker
                  setHours={setCurrentHoursEnd}
                  setMinute={setCurrentMinuteEnd}
                  currentTime={{ minutes: currentEndDate.minute, hours: currentEndDate.hour }}
                  isOpen={isOpenEnd}
                  setIsOpen={setIsOpenEnd}
                />
              </div>
            </div>
          </div>
          <div className="date-range__footer-popup">
            <button
              className="date-range__button-popup"
              onClick={() => {
                setIsOpenPopup(false)
                setEndDate(currentEndDate)
                setStartDate(currentStartDate)
              }}
            >
              Готово
            </button>
          </div>
        </Popup>
      )}
    </>
  )
}
