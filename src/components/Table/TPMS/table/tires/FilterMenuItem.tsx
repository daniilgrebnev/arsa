import { AppDispatch, RootState } from "@/store/store"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeFilter, setFilter, setGroupFilter } from "../../../../../store/reducers/filters/filters"

interface IFilterItem {
  label: string;
  filterName: string | string[];
  children?: IFilterItem[];
}

export const FilterMenuItem = ({ label, filterName, children }: IFilterItem) => {
  const [isChecked, setChecked] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [openChildren, setOpenChildren] = useState(false);
  const filters = useSelector((state: RootState) => state.filters.filters);

  const isString = (value: any): value is string => typeof value === "string";

  const getFilterName = (name: string | string[]): string => {
    if (Array.isArray(name)) {
      return name[0] ?? "";
    }
    return isString(name) ? name : "";
  };

  const changeHandler = (value: string) => {
    if (filters.includes(value)) {
      dispatch(removeFilter(value));
    } else {
      dispatch(setFilter(value));
    }
  };

  const mainFilterName = getFilterName(filterName);
  const mainFilterIncluded = filters.includes(mainFilterName);

  const childFilterCount = children?.filter((item) => filters.includes(getFilterName(item.filterName))).length ?? 0;
  const anyChildFilterIncluded = childFilterCount > 0;
  const allChildFilterIncluded = children && childFilterCount === children.length;
  const partiallyChecked = anyChildFilterIncluded && !allChildFilterIncluded;

  const changeHandlerP = (filter: string | string[]) => {
    if (Array.isArray(filter)) {
      if (allChildFilterIncluded) {
        filter.forEach((f) => dispatch(removeFilter(f)));
      } else {
        dispatch(setGroupFilter(filter));
      }
    } else {
      changeHandler(filter);
    }
  };

  return (
    <>
      <div
        className={`cursor-pointer text-nowrap relative text-black hover:bg-gray-200 rounded-lg h-8 px-2 font-light flex items-center justify-start`}
      >
        <div className="w-4 flex items-center justify-center">
          {children && (
            <div
              onClick={() => setOpenChildren(!openChildren)}
              className={`icon-expand transition-all flex items-center justify-center w-full ${
                openChildren ? "rotate-0" : "-rotate-90"
              }`}
            ></div>
          )}
        </div>
        <div
          onClick={() => {
            changeHandlerP(filterName);
            setChecked(!isChecked);
          }}
          className={`w-4 flex items-center justify-center h-4 rounded border border-orange-400`}
        >
          <div
            style={{
              width: mainFilterIncluded || partiallyChecked ? "100%" : 0,
              height: mainFilterIncluded || partiallyChecked ? "100%" : 0,
              backgroundColor: mainFilterIncluded || partiallyChecked ? "rgb(251 146 60)" : "transparent",
            }}
            className="transition-all flex items-center justify-center"
          >
            {mainFilterIncluded && !partiallyChecked && (
              <svg
                enableBackground="new 0 0 128 128"
                id="Layer_1"
                version="1.1"
                viewBox="0 0 128 128"
                width="10px"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <path
                  d="M116.158,29.336l-4.975-4.975c-3.469-3.469-9.088-3.478-12.549-0.019L48.103,74.875L29.364,56.136  c-3.459-3.46-9.078-3.45-12.549,0.021l-4.974,4.974c-3.47,3.47-3.48,9.089-0.02,12.549L41.8,103.657  c1.741,1.741,4.026,2.602,6.31,2.588c2.279,0.011,4.559-0.852,6.297-2.59l61.771-61.771  C119.637,38.424,119.631,32.807,116.158,29.336z"
                  fill="#ffffff"
                />
              </svg>
            )}
            {partiallyChecked && <div className="w-3/4 h-0.5 bg-white rounded-lg" />}
          </div>
        </div>
        <input
          checked={mainFilterIncluded}
          type="checkbox"
          className="cursor-pointer hidden checked:bg-orange-400"
          id={mainFilterName}
          onChange={() => changeHandlerP(filterName)}
        />
        <div
          onClick={() => {
            if (children) {
              setOpenChildren(!openChildren);
            } else {
              changeHandler(mainFilterName);
              setChecked(!isChecked);
            }
          }}
          className={`text-center px-2 cursor-pointer text-sm select-none ${
            mainFilterIncluded && !partiallyChecked && "font-normal transition-all"
          }`}
        >
          {label}
        </div>
      </div>
      <div className={`ml-2 ${openChildren ? "h-full" : "h-0"} transition-all overflow-hidden`}>
        {children?.map((item) => (
          <FilterMenuItem key={item.label} label={item.label} filterName={item.filterName} />
        ))}
      </div>
    </>
  );
};
