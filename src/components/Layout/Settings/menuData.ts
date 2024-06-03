interface ISettingsMenu {
  name: string
  hand: string
}

export const settingsMenu: ISettingsMenu[] = [
  {
    name: "Основная информация",
    hand: "general-info",
  },
  {
    name: "Водитель",
    hand: "driver-card",
  },
  {
    name: "Контроль неисправностей",
    hand: "fault-control",
  },
  {
    name: "Контроль скорости",
    hand: "speed-control",
  },
  {
    name: "Редактирование осей",
    hand: "axles-edit",
  },
]
