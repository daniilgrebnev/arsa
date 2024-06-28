import { CustomProtocolMonitoring } from "./innerComponents/CustomProtocolMonitoring"
import { DriverEvents } from "./innerComponents/DriverEvents"

export const Driver = (driver: any) => {
  return (
    <div>
      <div className="text-center text-3xl mb-10 font-light">{driver.title}</div>
      <DriverEvents />
      <CustomProtocolMonitoring />
    </div>
  )
}
