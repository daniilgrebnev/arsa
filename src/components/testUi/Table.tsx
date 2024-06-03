import { useState } from "react"
import "./TableTestUi.css" // Подключаем файл стилей

export const TableTestUI = () => {
  // Генерация случайных данных для таблицы
  const generateData = (rows: number, columns: number): Record<string, string>[] => {
    const data: Record<string, string>[] = []
    for (let i = 0; i < rows; i++) {
      const row: Record<string, string> = {}
      for (let j = 0; j < columns; j++) {
        row[`column${j + 1}`] = `Row ${i + 1}, Column ${j + 1}`
      }
      data.push(row)
    }
    return data
  }

  const [tableData] = useState(generateData(20, 5)) // Генерируем 20 строк и 5 столбцов по умолчанию

  const [columnWidths, setColumnWidths] = useState({
    column1: "100px",
    column2: "100px",
    column3: "100px",
    column4: "100px",
    column5: "100px",
  })

  // Функция для изменения ширины столбца
  const handleColumnResize = (column: string, width: string) => {
    setColumnWidths((prevState) => ({
      ...prevState,
      [column]: width,
    }))
  }

  // Рендеринг ячеек таблицы
  const renderCells = (row: Record<string, string>) => {
    return Object.keys(row).map((key, index) => (
      <div
        key={index}
        className="cell"
        style={{ width: columnWidths[key] }}
        onMouseDown={(e) => handleColumnResize(key, e.clientX.toString())} // Преобразуем clientX в строку
      >
        {row[key]}
      </div>
    ))
  }

  return (
    <div className="table-container">
      <div className="table">
        {/* Рендеринг заголовков */}
        <div className="header">
          {Object.keys(tableData[0]).map((key, index) => (
            <div key={index} className="column-header">
              {key}
            </div>
          ))}
        </div>
        {/* Рендеринг данных */}
        <div className="body">
          {tableData.map((row, index) => (
            <div key={index} className="row">
              {renderCells(row)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
