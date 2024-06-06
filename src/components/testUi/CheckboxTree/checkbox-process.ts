// export interface IReturnedVehiclesGroups {
//   account_id: number
//   group_name: string
//   id: number
//   is_root: boolean
//   level: number
//   parent_id?: number
//   role_id: number
//   vehicles?: Vehicle[]
//   grpoupsz:
// }

import { uniq } from "lodash"

export const checkboxProcess = (groups: any) => {
  console.log(groups)

  const finalData = groupByParentId(groups)

  console.log(finalData)
  return finalData
}

interface Vehicle {
  // Определите структуру объекта Vehicle
  vehicle_id: number // Предположим, что у объекта Vehicle есть поле vehicle_id
}

interface GroupNode {
  account_id: number
  group_name: string
  id: number
  is_root: boolean
  level: number
  parent_id?: number
  role_id: number
  vehicles?: Vehicle[]
  groups?: GroupNode[]
  children: (VehicleNode | GroupNode)[]
}

interface VehicleNode extends Vehicle {
  type: "vehicle"
}

interface GroupNodeWithType extends GroupNode {
  type: "group"
}

function groupByParentId(groups: any[]): GroupNodeWithType[] {
  const groupMap: { [key: number]: GroupNodeWithType } = {}
  const orphanGroups: GroupNodeWithType[] = []

  // Инициализируем карту групп существующими группами
  groups.forEach((group: any) => {
    groupMap[group.id] = { ...group, children: [], type: "group" }
  })

  const rootGroups: GroupNodeWithType[] = []

  groups.forEach((group: any) => {
    if (group.parent_id === undefined || group.parent_id === null) {
      // Если нет parent_id или он равен null, это корневая группа

      rootGroups.push(groupMap[group.id])
    } else if (groupMap[group.parent_id]) {
      groupMap[group.parent_id].children.push(groupMap[group.id])
    } else {
      orphanGroups.push(groupMap[group.id])
    }
  })

  // Добавляем транспортные средства в дочерние элементы и устанавливаем их тип
  for (const key in groupMap) {
    const group = groupMap[key]
    if (group.vehicles) {
      group.vehicles.forEach((vehicle: Vehicle) => {
        const vehicleNode: VehicleNode = { ...vehicle, type: "vehicle" }
        group.children.push(vehicleNode)
      })
    }
  }
  console.log(rootGroups)
  const returnedValue = rootGroups.length == 0 ? orphanGroups : uniq(rootGroups)
  return uniq(returnedValue)
}
