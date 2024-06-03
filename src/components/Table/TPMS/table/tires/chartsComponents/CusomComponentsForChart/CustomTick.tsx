import { DateTime } from "ts-luxon";

export const CustomTick = (props: any) => {
  const { index, x, y, payload } = props;

  return (
    <g>
      <text x={x - 20} y={y + 20}>
        {DateTime.fromSeconds(payload.value).toLocaleString(
          DateTime.TIME_SIMPLE
        )}
      </text>
    </g>
  );
};
