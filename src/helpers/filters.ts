import { IGeozone } from "@/interfaces/geozone";
import { IVehicle } from "@/interfaces/vehicle";

export const checkObjectsPresenceVehicle = (
  vehicleGroup: IVehicle[],
  vehicleChecked: IVehicle[]
) => {
  // Создаем множество (Set) из идентификаторов объектов в vehicleChecked для быстрого поиска
  const checkedIds = new Set(
    vehicleChecked.map((vehicle) => vehicle.vehicle_id)
  );

  // Проверяем наличие объектов из vehicleGroup в vehicleChecked
  const containAll = vehicleGroup.every((vehicle) =>
    checkedIds.has(vehicle.vehicle_id)
  );
  const containSome = vehicleGroup.some((vehicle) =>
    checkedIds.has(vehicle.vehicle_id)
  );

  // Возвращаем соответствующий результат
  return getStatus(containAll, containSome);
};

export const checkObjectsPresenceGeozone = (
  geozoneGroup: IGeozone[],
  geozoneChecked: IGeozone[]
) => {
  // Создаем множество (Set) из идентификаторов объектов в vehicleChecked для быстрого поиска
  const checkedIds = new Set(geozoneChecked.map((vehicle) => vehicle.uid));

  // Проверяем наличие объектов из vehicleGroup в vehicleChecked
  const containAll = geozoneGroup.every((vehicle) =>
    checkedIds.has(vehicle.uid)
  );
  const containSome = geozoneGroup.some((vehicle) =>
    checkedIds.has(vehicle.uid)
  );

  // Возвращаем соответствующий результат
  return getStatus(containAll, containSome);
};

const getStatus = (containAll, containSome) => {
  if (containAll) {
    return "all";
  } else if (containSome) {
    return "contain";
  } else {
    return "none";
  }
};
