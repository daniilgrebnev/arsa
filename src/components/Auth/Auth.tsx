import { Logo } from "../../images/Logo"
import { AuthLogin } from "./AuthLogin"

export const Auth = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-3  auth">
      <div
        style={{
          gridColumn: 3,
        }}
        className="flex items-center justify-center h-full w-2/3"
      >
        <div className="flex gap-3 items-center justify-center w-full h-fit">
          <div className="flex  items-start justify-center flex-col h-fit w-full">
            <div className="mt-4 mb-10 w-full flex  items-start justify-center">
              <Logo width={250} fill="white" />
            </div>

            <AuthLogin />
          </div>
        </div>
      </div>
    </div>
  )
}
