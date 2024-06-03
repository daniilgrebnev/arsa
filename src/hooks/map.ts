import { useState } from "react"

const useContextMenu = (handlerContext) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [open, setOpen] = useState(false)
  return { open, setOpen, position, setPosition }
}
