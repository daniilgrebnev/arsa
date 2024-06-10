import { AppDispatch, RootState } from "@/store/store"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
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
  const { test } = useSelector((state: RootState) => state.security)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div>
      {isAuth == true ? (
        <>
          {/* <div className="absolute w-screen z-[100] h-screen bg-gray-100 top-0 left-0 flex items-center justify-center">
            {test && test.length != 0 && <CheckboxTree data={test.data} keyword={"children"} />}
          </div> */}
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
