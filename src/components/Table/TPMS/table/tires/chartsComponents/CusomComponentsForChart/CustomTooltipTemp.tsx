import { DateTime } from "ts-luxon";

export const CustomTooltipTemp = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div>
          {payload.map((pld) => (
            <div className=" bg-blue-200 bg-opacity-65 px-5 py-2 rounded-lg ">
              <div>Температура: {pld.value} ºС</div>
              <div>
                Время:{" "}
                {DateTime.fromSeconds(label).toLocaleString(
                  DateTime.TIME_SIMPLE
                )}
              </div>
              <div className="">
                Дата:{" "}
                {DateTime.fromSeconds(label).toLocaleString(
                  DateTime.DATE_SHORT
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
