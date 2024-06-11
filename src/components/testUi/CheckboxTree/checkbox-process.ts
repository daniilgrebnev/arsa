export function vehicleCheckboxTree(groups: any) {
  const groupMap: { [key: number]: any } = {}
  const orphanGroups: any[] = []
  const rootGroups: any[] = []

  // Создание узлов групп и добавление их в groupMap
  groups.forEach((group: any) => {
    const groupNode: any = { ...group, children: [], type: "group" }
    groupMap[group.id] = groupNode

    if (group.parent_id === undefined || group.parent_id === null) {
      rootGroups.push(groupNode)
    } else {
      if (groupMap[group.parent_id]) {
        groupMap[group.parent_id].children.push(groupNode)
      } else {
        orphanGroups.push(groupNode)
      }
    }
  })

  // Добавление машин и водителей в соответствующие группы
  groups.forEach((group: any) => {
    const currentGroup = groupMap[group.id]
    if (currentGroup) {
      if (group.vehicles) {
        currentGroup.children.push(
          ...group.vehicles.map((vehicle: any) => ({
            ...vehicle,
            type: "vehicle",
            name: vehicle.vehicle_name,
          })),
        )
      }
      if (group.drivers) {
        currentGroup.children.push(
          ...group.drivers.map((driver: any) => ({
            ...driver,
            type: "driver",
            name: driver.driver_name,
          })),
        )
      }
    }
  })

  // Обработка случаев, когда группы были осиротевшими
  orphanGroups.forEach((orphanGroup: any) => {
    const parentGroup = groupMap[orphanGroup.parent_id]
    if (parentGroup) {
      parentGroup.children.push(orphanGroup)
    } else {
      rootGroups.push(orphanGroup)
    }
  })

  return rootGroups.length === 0 ? orphanGroups : rootGroups
}
