import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FolderCheckboxTitle } from "../FolderCheckboxTitle/FolderCheckboxTitle";
import { IGeozone, IGroupGeozone } from "@/interfaces/geozone";

type propsType = {
  group: IGroupGeozone;
  cheked: IGeozone[];
  onCheked: (params: { geozone: IGeozone; id: number }) => void;
  onCheckedGroup: (id: number) => void;
  onRemoveCheckedGroup: (id: number) => void;
};

export const GeozoneCheckbox: React.FC<propsType> = ({
  group,
  cheked,
  onCheked,
  onCheckedGroup,
  onRemoveCheckedGroup,
}) => {
  const dispatch: any = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const onChekedGroup = () => {
    if (group.status === "all") {
      dispatch(onRemoveCheckedGroup(group.id));
      return;
    }
    dispatch(onCheckedGroup(group.id));
  };

  return (
    <div className="tree-folder">
      <FolderCheckboxTitle
        onCheked={onChekedGroup}
        status={group.status}
        title={group.gn}
        isOpen={isOpen}
        setIsOpen={() => setIsOpen((prev) => !prev)}
      />
      <div
        className={`tree-folder__body ${
          isOpen ? "tree-folder__body--open" : ""
        }`}
      >
        {group.geozones.map((geozone) => {
          return (
            <label key={geozone.uid} className="tree-folder__element">
              <div
                className={`tree-folder__checkbox ${
                  cheked.includes(geozone) ? "icon-checked" : ""
                }`}
              ></div>
              <input
                type="checkbox"
                checked={cheked.includes(geozone)}
                onChange={() =>
                  dispatch(onCheked({ geozone: geozone, id: group.id }))
                }
              />
              {geozone.geozone_name}
            </label>
          );
        })}
      </div>
    </div>
  );
};
