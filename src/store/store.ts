import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit"

import car from "./reducers/car/car"
import catalog from "./reducers/catalog/catalog"
import filters from "./reducers/filters/filters"
import map from "./reducers/map/map"
import security from "./reducers/security/security"
import switchTire from "./reducers/switchTire/switchTire"
import switchHistory from "./reducers/switchTireHistory/switchTireHistory"
import table from "./reducers/table/table"
import tpms from "./reducers/tpms/tpms"
import wheelChart from "./reducers/wheelChart/wheelChart"

import auth from "./reducers/auth/authSlice"
import driver from "./reducers/drivers/driverSlice"
import error from "./reducers/error/errorSlice"
import geoZones from "./reducers/geozones/geozonesSlice"
import objectSettings from "./reducers/objectSettings/objectSettings"
import fuel from "./reducers/testingUI/fuel/fuel"
import vehicles from "./reducers/vehicles/vehicleSlice"

export const store = configureStore({
  reducer: combineReducers({
    security,
    table,
    car,
    map,
    wheelChart,
    filters,
    tpms,
    catalog,
    switchTire,
    switchHistory,
    error,
    auth,
    objectSettings,
    fuel,
    vehicles,
    driver,
    geoZones,
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
