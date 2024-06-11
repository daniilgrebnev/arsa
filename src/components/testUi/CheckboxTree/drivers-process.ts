import { uniqBy } from "lodash"

export function driversCheckboxTree(groups: any) {
  const groupMap: { [key: number]: any } = {}
  const orphanGroups: any[] = []
  const rootGroups: any[] = []

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

  for (const group of groups) {
    const parentGroup = groupMap[group.parent_id || 0]
    if (parentGroup) {
      parentGroup.length > 0 && parentGroup.children.push(uniqBy(groupMap[group.id], "account_id"))
    } else {
      orphanGroups.push(groupMap[group.id])
    }
  }

  groups.forEach((group: any) => {
    const currentGroup = groupMap[group.id]
    if (currentGroup) {
      currentGroup.children.push(
        ...(currentGroup.drivers || []).map((driver: any) => ({
          ...driver,
          type: "driver",
          name: driver.surname + driver.first_name + driver.patronymic,
        })),
      )
    }
  })

  return rootGroups.length === 0 ? orphanGroups : rootGroups
}
