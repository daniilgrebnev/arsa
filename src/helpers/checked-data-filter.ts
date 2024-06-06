export const filterChecked = (data: any) => {
  let requestTableData: string[] = []
  console.log(data)
  for (let i = 0; data.length > i; i++) {
    requestTableData.push(data[i].vehicle_uid)
  }
  return requestTableData
}
