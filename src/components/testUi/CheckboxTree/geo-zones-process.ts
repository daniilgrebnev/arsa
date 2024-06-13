export function geoZoneCheckboxTree(groups: any) {
  const groupMap: { [key: number]: any } = {}
  const orphanGroups: any[] = []
  const rootGroups: any[] = []
  const processedGroupIds: Set<number> = new Set()

  // Создание узлов групп и добавление их в groupMap
  groups.forEach((group: any) => {
    if (!processedGroupIds.has(group.id)) {
      processedGroupIds.add(group.id)

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
    }
  })

  // Добавление геозон в соответствующие группы
  groups.forEach((group: any) => {
    const currentGroup = groupMap[group.id]
    if (currentGroup && group.geozones) {
      currentGroup.children.push(
        ...group.geozones.map((geozone: any) => ({
          ...geozone,
          type: "geozone",
          name: geozone.geozone_name,
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

  return rootGroups.length === 0 ? orphanGroups : rootGroups
}
