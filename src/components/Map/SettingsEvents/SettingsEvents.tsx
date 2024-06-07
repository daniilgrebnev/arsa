import React, { useState } from "react"
import "./SettingsEvents.css"
import { Popup } from "./../../../components/Popup/Popup"

export const SettingsEvents = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className="settings-event" onClick={() => setIsOpen(true)}>
        <span className="icon-settings"></span>
      </div>
    </>
  )
}
