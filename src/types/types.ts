export type TPosition = [number, number]

export type TchekedGroup = Array<{
  id: number
  status: TstatusGroup
}>

export type TstatusGroup = "all" | "some" | "none"

export type Tfigure = 0 | 1 | 2 | 3
