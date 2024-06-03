/* eslint-disable array-callback-return */
import { IGeozone, IGroupGeozone } from "@/interfaces/geozone"
import { IVehicle, IVehicleGroup } from "@/interfaces/vehicle"
import { TstatusGroup } from "@/types/types"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { LatLng } from "leaflet"
import { DateTime } from "ts-luxon"
import {
  checkObjectsPresenceGeozone,
  checkObjectsPresenceVehicle,
} from "./../../../helpers/filters"

interface CounterState {
  searchedVehicle: IVehicleGroup[] | null
  isAuth: boolean
  token: string | null
  groupsVehicle: IVehicleGroup[]
  vehiclesCheked: IVehicle[]
  isAllVehicleCheked: TstatusGroup
  groupsGeozone: IGroupGeozone[]
  geozonesCheked: IGeozone[]
  drivers: any
  startTiming: number
  endTiming: number
}

const initialState = {
  isAuth: false,
  token: null,
  searchedVehicle: null,
  groupsVehicle: [],
  vehiclesCheked: [],
  isAllVehicleCheked: "none",
  groupsGeozone: [
    {
      gn: "Test 1",
      id: 10,
      pr_id: 11,
      geozones: [
        {
          transparency: 0.5,
          geozone_name: "Просто ква",
          color: "#0043ff",
          uid: "123qwe123",
          geozone_type_id: 10,
          latitube: 51.650609,
          longitube: 39.166492,
          radius: null,
          line_width: 1,
          geometry_type_id: "rectangle",
          use_as_address: false,
          image_url: null,
          geozone_points: [new LatLng(51.647789, 39.155859), new LatLng(51.657439, 39.169584)],
          comment: "Простой комент",
          account_id: 98097,
        },
        {
          transparency: 0.5,
          geozone_name: "Просто кр",
          color: "#000",
          uid: "2435qwe3245",
          geozone_type_id: 10,
          latitube: 51.650609,
          longitube: 39.166492,
          radius: 200,
          line_width: 2,
          geometry_type_id: "rectangle",
          use_as_address: false,
          image_url: null,
          geozone_points: [new LatLng(51.704408, 39.117645), new LatLng(51.681577, 39.076103)],
          comment: "Простой комент",
          account_id: 654546,
        },
      ],
      status: "none",
    },
    {
      gn: "Test 2",
      id: 20,
      pr_id: 21,
      geozones: [
        {
          transparency: 0.5,
          geozone_name: "Просто ква2",
          color: "#ff6801",
          uid: "123zxczxc123",
          geozone_type_id: 20,
          latitube: 51.677484,
          longitube: 39.290756,
          radius: null,
          line_width: 5,
          geometry_type_id: "rectangle",
          use_as_address: false,
          image_url: null,
          geozone_points: [new LatLng(51.677484, 39.290756), new LatLng(51.662438, 39.261354)],
          comment: "Простой комент квадрата",
          account_id: 983097,
        },
        {
          transparency: 0.5,
          geozone_name: "Просто кр2",
          color: "#000",
          uid: "2435qwezxc3245",
          geozone_type_id: 20,
          latitube: 51.677484,
          longitube: 39.290756,
          radius: 200,
          line_width: 2,
          geometry_type_id: "circle",
          use_as_address: false,
          image_url: null,
          geozone_points: [],
          comment: "Простой комент",
          account_id: 6545246,
        },
      ],
      status: "none",
    },
    {
      gn: "Test 3",
      id: 2032,
      pr_id: 121,
      geozones: [
        {
          transparency: 0.5,
          geozone_name: "Линия",
          color: "#ff6801",
          uid: "zxcqwe123fsd",
          geozone_type_id: 2032,
          latitube: 51.677484,
          longitube: 39.290756,
          radius: null,
          line_width: 5,
          geometry_type_id: "line",
          use_as_address: false,
          image_url: null,
          geozone_points: [
            new LatLng(51.73618, 39.180816),
            new LatLng(51.729359, 39.17807),
            new LatLng(51.674961, 39.184936),
          ],
          comment: "Простой комент квадрата",
          account_id: 983097,
        },
        {
          transparency: 0.5,
          geozone_name: "Polygon",
          color: "#000",
          uid: "2435qwezxc3asd245",
          geozone_type_id: 2032,
          latitube: 51.677484,
          longitube: 39.290756,
          radius: 200,
          line_width: 2,
          geometry_type_id: "polygon",
          use_as_address: false,
          image_url: null,
          geozone_points: [
            new LatLng(51.726161, 39.203819),
            new LatLng(51.780071, 39.297203),
            new LatLng(51.731322, 39.323242),
            new LatLng(51.677096, 39.313136),
            new LatLng(51.655634, 39.241875),
            new LatLng(51.676486, 39.200534),
          ],
          comment: "Простой комент",
          account_id: 6545246,
        },
      ],
      status: "none",
    },
    {
      gn: "Test 1",
      id: 40,
      pr_id: 41,
      geozones: [],
      status: "none",
    },
  ],
  geozonesCheked: [],
  drivers: [],
  startTiming: DateTime.local().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toMillis(),
  endTiming: DateTime.local().toMillis(),
} satisfies CounterState as CounterState

const counterSlice = createSlice({
  name: "security",
  initialState,
  reducers: {
    setSearchedVehicle(state: CounterState, action: PayloadAction<IVehicleGroup[] | null>) {
      state.searchedVehicle = action.payload
    },
    setAuth(state: CounterState, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    },
    setToken(state: CounterState, action: PayloadAction<string>) {
      state.token = action.payload
    },
    setGroupsVehicle(state: CounterState, action: PayloadAction<IVehicleGroup[]>) {
      state.groupsVehicle = action.payload
    },
    setVehicleCheked(
      state: CounterState,
      action: PayloadAction<{ vehicle: IVehicle; id: number }>,
    ) {
      const isCheked: boolean =
        state.vehiclesCheked.filter((vehicle) => {
          return vehicle.vehicle_uid === action.payload.vehicle.vehicle_uid
        }).length > 0 // проверка отмечен ли вехекл

      // изменение статуса группы
      let index = state.groupsVehicle.findIndex((group) => group.id === action.payload.id) // поиск индекса группы
      let newGroups = [...state.groupsVehicle]

      let newVehicleCheked = isCheked
        ? [...state.vehiclesCheked].filter(
            (vehicle) => vehicle.vehicle_id !== action.payload.vehicle.vehicle_id,
          )
        : [...state.vehiclesCheked, action.payload.vehicle] // если не добавлен то добавляем, если добавлен убирае

      let contain: string = checkObjectsPresenceVehicle(newGroups[index].vehicles, newVehicleCheked)

      if (contain === "all") {
        newGroups[index].status = "all"
      }
      if (contain === "contain") {
        newGroups[index].status = "some"
      }
      if (contain === "none") {
        newGroups[index].status = "none"
      }
      state.groupsVehicle = newGroups
      state.vehiclesCheked = newVehicleCheked
    },
    setVehicleChekedGroup(state: CounterState, action: PayloadAction<number>) {
      let index = state.groupsVehicle.findIndex((group) => group.id === action.payload)
      let countCheked = state.groupsVehicle.filter((i) => i.status === "all").length
      if (countCheked + 1 === state.groupsVehicle.length) {
        state.isAllVehicleCheked = "all"
      } else {
        state.isAllVehicleCheked = "some"
      }
      let newGroups = [...state.groupsVehicle]
      newGroups[index].status = "all"

      state.groupsVehicle = newGroups
      state.vehiclesCheked = [...state.vehiclesCheked, ...state.groupsVehicle[index].vehicles]
    },
    removeVehicleChekedGroup(state: CounterState, action: PayloadAction<number>) {
      let index = state.groupsVehicle.findIndex((group) => group.id === action.payload)
      let countCheked = state.groupsVehicle.filter((i) => i.status === "all").length
      if (countCheked === 1) {
        state.isAllVehicleCheked = "none"
      } else {
        state.isAllVehicleCheked = "some"
      }

      let newGroups = [...state.groupsVehicle]
      newGroups[index].status = "none"
      state.groupsVehicle = newGroups
      state.vehiclesCheked = [...state.vehiclesCheked].filter((vehicle) => {
        return !newGroups[index].vehicles.some(
          (vehicleGroup) => vehicleGroup.vehicle_id === vehicle.vehicle_id,
        )
      })
    },
    setVehicleChekedAll(state: CounterState) {
      let cheked: any = []
      ;[...state.groupsVehicle].forEach((group) => {
        cheked = [...cheked, ...group.vehicles]
      })
      state.vehiclesCheked = cheked
      state.groupsVehicle = state.groupsVehicle.map((vehicle) => {
        const newVehicle = vehicle
        vehicle.status = "all"
        return newVehicle
      })
      state.isAllVehicleCheked = "all"
    },
    removeVehicleCheked(state: CounterState) {
      state.vehiclesCheked = []
      state.isAllVehicleCheked = "none"
      state.groupsVehicle = state.groupsVehicle.map((vehicle) => {
        const newVehicle = vehicle
        vehicle.status = "none"
        return newVehicle
      })
    },

    setGroupsGeozone(state: CounterState, action: PayloadAction<IGroupGeozone[]>) {
      state.groupsGeozone = action.payload
    },
    setGeozoneCheked(
      state: CounterState,
      action: PayloadAction<{ geozone: IGeozone; id: number }>,
    ) {
      const isCheked: boolean =
        state.geozonesCheked.filter((geozone) => {
          return geozone.uid === action.payload.geozone.uid
        }).length > 0 // проверка отмечен ли вехекл

      // изменение статуса группы
      let index = state.groupsGeozone.findIndex(
        (geozoneGroup) => geozoneGroup.id === action.payload.id,
      ) // поиск индекса группы
      let newGroups = [...state.groupsGeozone]
      let newGeozoneCheked = isCheked
        ? [...state.geozonesCheked].filter((geozone) => geozone.uid !== action.payload.geozone.uid)
        : [...state.geozonesCheked, action.payload.geozone] // если не добавлен то добавляем, если добавлен убираем

      let contain: string = checkObjectsPresenceGeozone(newGroups[index].geozones, newGeozoneCheked)

      if (contain === "all") {
        newGroups[index].status = "all"
      }
      if (contain === "contain") {
        newGroups[index].status = "some"
      }
      if (contain === "none") {
        newGroups[index].status = "none"
      }
      state.groupsGeozone = newGroups
      state.geozonesCheked = newGeozoneCheked
    },
    setGeozoneChekedGroup(state: CounterState, action: PayloadAction<number>) {
      let index = state.groupsGeozone.findIndex((group) => group.id === action.payload)
      let newGroups = [...state.groupsGeozone]
      newGroups[index].status = "all"
      state.groupsGeozone = newGroups
      state.geozonesCheked = [...state.geozonesCheked, ...state.groupsGeozone[index].geozones]
    },
    removeGeozoneChekedGroup(state: CounterState, action: PayloadAction<number>) {
      let index = state.groupsGeozone.findIndex((group) => group.id === action.payload)
      let newGroups = [...state.groupsGeozone]
      newGroups[index].status = "none"
      state.groupsGeozone = newGroups
      state.geozonesCheked = [...state.geozonesCheked].filter((geozone) => {
        return !newGroups[index].geozones.some((geozoneGroup) => geozoneGroup.uid === geozone.uid)
      })
    },

    setStartTiming(state: CounterState, action: PayloadAction<number>) {
      state.startTiming = action.payload
    },
    setEndTiming(state: CounterState, action: PayloadAction<number>) {
      state.endTiming = action.payload
    },

    removeGeozone(state: CounterState, action: PayloadAction<string>) {
      state.groupsGeozone = [...state.groupsGeozone].map((el) => {
        return {
          ...el,
          geozones: [...el.geozones].filter((geozone) => geozone.uid !== action.payload),
        }
      })
      state.geozonesCheked = [...state.geozonesCheked].filter(
        (geozone) => geozone.uid !== action.payload,
      )
    },
  },
})

export const {
  setToken,
  setAuth,
  setGroupsVehicle,
  setVehicleCheked,
  setVehicleChekedGroup,
  removeVehicleChekedGroup,
  setVehicleChekedAll,
  removeVehicleCheked,
  setGroupsGeozone,
  setGeozoneCheked,
  setGeozoneChekedGroup,
  removeGeozoneChekedGroup,
  setStartTiming,
  setEndTiming,
  setSearchedVehicle,
  removeGeozone,
} = counterSlice.actions
export default counterSlice.reducer
