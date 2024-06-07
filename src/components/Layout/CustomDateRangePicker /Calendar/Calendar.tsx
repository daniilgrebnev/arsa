/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react"
import "./Calendar.css"
import { DateTime } from "ts-luxon"
import {
  generateMonthDays,
  getNeedDisplayedNext,
  getNeedDisplayedPrev,
} from "./../../../../helpers/calendar"

type propsType = {
  currentDate: DateTime
  setCurrentDate: (date: DateTime) => void
}

export const Calendar: React.FC<propsType> = ({ currentDate, setCurrentDate }) => {
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ]

  const prevMonth = () => {
    setCurrentDate(currentDate.minus({ month: 1 }))
  }

  const nextMonth = () => {
    setCurrentDate(currentDate.plus({ month: 1 }))
  }

  const setDay = (day: number, month: number) => {
    setCurrentDate(currentDate.set({ day: day, month: month }))
  }

  // Генерация массивов объектов для трех месяце в

  const prevMonthArr = useMemo(
    () => generateMonthDays(currentDate.month - 1, currentDate.year),
    [currentDate],
  )
  const currentMonthArr = useMemo(
    () => generateMonthDays(currentDate.month, currentDate.year),
    [currentDate],
  )
  const nextMonthArr = useMemo(
    () => generateMonthDays(currentDate.month + 1, currentDate.year),
    [currentDate],
  )

  const visibleDays = useMemo(() => {
    const countPrevDay = getNeedDisplayedPrev(currentMonthArr)
    const countNextDay = getNeedDisplayedNext(currentMonthArr)
    return [
      ...[...prevMonthArr].slice(prevMonthArr.length - countPrevDay.needDisplayedCount),
      ...currentMonthArr,
      ...[...nextMonthArr].slice(0, countNextDay.needDisplayedCount),
    ]
  }, [currentDate, currentMonthArr, prevMonthArr, nextMonthArr])

  // активный день храним отдельно

  return (
    <>
      <div className="calendar">
        <div className="calendar__head">
          <button onClick={prevMonth} className="calendar__btn calendar__btn--prev">
            <span className="icon-expand"></span>
          </button>
          <button>
            {months[currentDate.month - 1]} {currentDate.year}
          </button>
          <button onClick={nextMonth} className="calendar__btn calendar__btn--next">
            <span className="icon-expand"></span>
          </button>
        </div>
        <div className="calendar__body">
          <div className="calendar__label">
            {days.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="calendar__days">
            {visibleDays.map((i, key) => {
              const currentDay = currentDate.day === i.dayOfMonth && i.month === currentDate.month
              return (
                <div
                  className={currentDay ? "calendar__day calendar__day--active" : "calendar__day"}
                  key={key}
                  onClick={() => setDay(i.dayOfMonth, i.month)}
                >
                  {i.dayOfMonth}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
