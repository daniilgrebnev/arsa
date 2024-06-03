import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { SimpleFolder } from "./SimpleFolder/SimpleFolder";
import { GeozoneCheckbox } from "./GeozoneCheckbox/GeozoneCheckbox";
import {
  removeGeozoneChekedGroup,
  setGeozoneCheked,
  setGeozoneChekedGroup,
} from "./../../../store/reducers/security/security";

export const GeozoneTree = () => {
  const groupsGeozone = useSelector(
    (state: RootState) => state.security.groupsGeozone
  );
  const geozonesCheked = useSelector(
    (state: RootState) => state.security.geozonesCheked
  );
  return (
    <>
      <SimpleFolder title="Все геозоны">
        {groupsGeozone.map((group, id) => {
          return (
            <GeozoneCheckbox
              group={group}
              cheked={geozonesCheked}
              onCheked={setGeozoneCheked}
              onCheckedGroup={setGeozoneChekedGroup}
              onRemoveCheckedGroup={removeGeozoneChekedGroup}
              key={id}
            />
          );
        })}
      </SimpleFolder>
    </>
  );
};
