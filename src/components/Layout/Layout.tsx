import { RootState } from "@/store/store"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Auth } from "../Auth/Auth"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../shadcnui/ui/resizable"
import Header from "./Header/Header"
import LeftBar from "./LeftBar/LeftBar"
import { ObjectSettings } from "./Settings/ObjectSettings"

export const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { isAuth } = useSelector((state: RootState) => state.auth)
  const { isOpen } = useSelector((state: RootState) => state.objectSettings)
  useEffect(() => {}, [isAuth])
  return (
    <div>
      {isAuth == true ? (
        <>
          {isOpen && <ObjectSettings />}
          <ResizablePanelGroup
            direction="horizontal"
            className="max-w-screen max-h-screen w-screen h-screen overflow-hidden"
          >
            <ResizablePanel tagName="nav" defaultSize={20} minSize={20} maxSize={25}>
              <LeftBar />
            </ResizablePanel>

            <ResizableHandle className="w-[1px] bg-orange-400 relative " />

            <ResizablePanel
              tagName="section"
              defaultSize={80}
              minSize={75}
              maxSize={80}
              style={{ height: "100vh" }}
            >
              <Header />

              {children}
            </ResizablePanel>
          </ResizablePanelGroup>
        </>
      ) : (
        <>
          <Auth />
        </>
      )}
    </div>
  )
}
