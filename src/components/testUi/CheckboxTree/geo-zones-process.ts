export function geoZoneCheckboxTree(groups: any) {
  if (!Array.isArray(groups)) {
    console.error("Invalid input: groups is not an array")
    return []
  }

  const groupMap: { [key: number]: any } = {}
  const rootGroups: any[] = []

  groups.forEach((group: any) => {
    const groupNode: any = { ...group, children: [], type: "group", name: group.group_name }
    groupMap[group.id] = groupNode

    if (group.parent_id === undefined || group.parent_id === null) {
      rootGroups.push(groupNode)
    } else {
      if (!groupMap[group.parent_id]) {
        groupMap[group.parent_id] = { children: [] }
      }
      groupMap[group.parent_id].children.push(groupNode)
    }
  })

  console.log(groups)

  if (groups.length > 0) {
    groups.forEach((group: any) => {
      const currentGroup = groupMap[group.id]
      if (currentGroup) {
        currentGroup.children.push(
          ...(group.geozones || []).map((geozone: any) => ({
            ...geozone,
            type: "geozone",
            name: geozone.geozone_name,
          })),
        )
      }
    })
  }

  return rootGroups
}
