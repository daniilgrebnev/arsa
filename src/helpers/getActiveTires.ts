interface ITableData {
  wheel_model_names: string
  wheel_pressure: Array<{ wmn: string }>
}

function extractWheels(data: string[]): string[] {
  const wheels: Record<string, boolean> = {}

  data.forEach((entry) => {
    const elements = entry.split("; ")
    elements.forEach((element) => {
      const wheel = element.trim()
      if (!wheels[wheel]) {
        wheels[wheel] = true
      }
    })
  })

  return Object.keys(wheels)
}

export function getActiveTires(chartData: any[]): string[] {
  let tire: string[] = []
  tire.push(...chartData.map((item) => item.wheel_model_names))
  tire = tire.filter((i) => i !== "")
  tire = extractWheels(tire)
  return tire.filter((item) => chartData.some((i) => i.wheel_model_names.includes(item)))
}
