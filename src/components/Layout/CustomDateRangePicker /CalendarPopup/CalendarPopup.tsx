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
  const [activeTiming, setActiveTiming] = useState(1)

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
          <div className="date-range__timing">
            <button
              onClick={() => {
                setCurrentStartDate(
                  DateTime.local().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
                )
                setCurrentEndDate(DateTime.local().set({ hour: 23, minute: 59, second: 59 }))
                setActiveTiming(1)
              }}
              className={activeTiming === 1 ? "date-range__timing--active" : ""}
            >
              Сегодня
            </button>
            <button
              onClick={() => {
                setCurrentStartDate(
                  DateTime.local().set({
                    day: DateTime.local().day - 1,
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: 0,
                  }),
                )
                setCurrentEndDate(
                  DateTime.local().set({
                    day: DateTime.local().day - 1,
                    hour: 23,
                    minute: 59,
                    second: 59,
                  }),
                )
                setActiveTiming(2)
              }}
              className={activeTiming === 2 ? "date-range__timing--active" : ""}
            >
              Вчера
            </button>
            <button
              onClick={() => {
                setCurrentStartDate(
                  DateTime.local().set({
                    day: DateTime.local().day - 7,
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: 0,
                  }),
                )
                setCurrentEndDate(DateTime.local().set({ hour: 23, minute: 59, second: 59 }))
                setActiveTiming(3)
              }}
              className={activeTiming === 3 ? "date-range__timing--active" : ""}
            >
              7 дней
            </button>
            <button
              onClick={() => {
                setCurrentStartDate(
                  DateTime.local().set({
                    month: DateTime.local().month - 1,
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: 0,
                  }),
                )
                setCurrentEndDate(DateTime.local().set({ hour: 23, minute: 59, second: 59 }))
                setActiveTiming(4)
              }}
              className={activeTiming === 4 ? "date-range__timing--active" : ""}
            >
              Месяц
            </button>
          </div>
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
