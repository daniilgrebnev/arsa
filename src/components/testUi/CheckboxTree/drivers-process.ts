import { uniq } from "lodash"

export function driversCheckboxTree(groups: any) {
  if (!Array.isArray(groups)) {
    console.error("Invalid input: groups is not an array")
    return []
  }

  const groupMap: { [key: number]: any } = {}
  const orphanGroups: any[] = []
  const rootGroups: any[] = []

  // Создание узлов групп и добавление их в groupMap
  groups.forEach((group: any) => {
    const groupNode: any = { ...group, children: [], type: "group" }
    groupMap[group.id] = groupNode

    if (group.parent_id === undefined || group.parent_id === null) {
      rootGroups.push(groupNode)
    } else if (groupMap[group.parent_id]) {
      groupMap[group.parent_id].children.push(groupNode)
    } else {
      orphanGroups.push(groupNode)
    }
  })

  // Добавление водителей в соответствующие группы
  groups.forEach((group: any) => {
    const currentGroup = groupMap[group.id]
    if (currentGroup && group.drivers) {
      currentGroup.children.push(
        ...group.drivers.map((driver: any) => ({
          ...driver,
          type: "driver",
          name: driver.surname + driver.first_name + driver.patronymic,
        })),
      )
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

  // Удаление пустых групп
  const removeEmptyGroups = (groups: any[]) => {
    if (!groups) return []
    return groups.filter((group) => {
      group.children = removeEmptyGroups(group.children)
      return group.children.length > 0 || group.type !== "group"
    })
  }

  const finalRootGroups = removeEmptyGroups(rootGroups)
  return finalRootGroups.length === 0
    ? uniq(removeEmptyGroups(orphanGroups))
    : uniq(finalRootGroups)
}
