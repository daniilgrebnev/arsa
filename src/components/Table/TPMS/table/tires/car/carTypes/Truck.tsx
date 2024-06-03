import { IAxles } from "@/helpers/axlesInitter"
import { Back } from "../axles/Back/Back"
import { Front } from "../axles/Front/Front"

export const Truck: React.FC<IAxles> = ({ front, back }) => {
  return (
    <div className="flex flex-col w-full h-full gap-0 transition-all items-center relative justify-center">
      <Front front={front} />
      <Back back={back} />
    </div>
  )
}
