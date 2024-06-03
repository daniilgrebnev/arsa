import { TstatusGroup } from "@/types/types";
import React from "react";

type propsType = {
  onCheked: () => void;
  title: string;
  status: TstatusGroup;
  isOpen: boolean;
  setIsOpen: () => void;
};

export const FolderCheckboxTitle: React.FC<propsType> = ({
  onCheked,
  title,
  status,
  isOpen,
  setIsOpen,
}) => {
  const icon =
    status === "all" ? "icon-checked" : status === "some" ? "icon-minus" : "";
  return (
    <div className="tree-folder__title">
      <label data-link="https://asdas.ru">
        <div className={`tree-folder__checkbox ${icon}`}></div>
        <input type="checkbox" checked={status === "all"} onChange={onCheked} />
      </label>

      <div className="tree-folder__title" onClick={() => setIsOpen()}>
        <span className={isOpen ? "icon-folder-open" : "icon-folder"}></span>
        {title}
      </div>
    </div>
  );
};
