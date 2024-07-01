import { IObjectSettingsMain } from "@/interfaces/objectSettings"
import { AppDispatch, RootState } from "@/store/store"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { vehicleCheckboxTree } from "src/components/testUi/CheckboxTree/checkbox-process"
import { updateObjectSettingsMain } from "src/store/reducers/objectSettings/objectSettings"
import {
  thunkGetAccounts,
  thunkGetPlugins,
} from "src/store/reducers/objectSettings/objectSettingsThunk"
import { ObjectSettingsItem } from "../ObjectSettingsItem"

export const ObjectSettingsMain: React.FC<any> = (main) => {
  const [data, setData] = useState<IObjectSettingsMain>(main.data)
  const dispatch = useDispatch<AppDispatch>()
  const accounts = useSelector((state: RootState) =>
    typeof state.objectSettings.accounts != "string" && state.objectSettings.accounts != null
      ? state.objectSettings.accounts
      : [],
  )
  const plugins = useSelector((state: RootState) =>
    typeof state.objectSettings.plugins != "string" && state.objectSettings.plugins != null
      ? state.objectSettings.plugins
      : [],
  )
  console.log(plugins)
  useEffect(() => {
    dispatch(updateObjectSettingsMain(data))
    accounts.length == 0 && dispatch(thunkGetAccounts())
    plugins.length == 0 && dispatch(thunkGetPlugins())
  }, [data])
  useEffect(() => {}, [accounts, plugins])
  console.log(vehicleCheckboxTree(accounts.filter((item) => item.id != 1)))
  const accountsDataBody: any = []
  const pluginsDataBody: any = []
  accounts.forEach((item, index) => {
    accountsDataBody.push({
      option: item.id,
      name: item.account_name,
    })
  })
  plugins.forEach((item) => {
    pluginsDataBody.push({
      option: item.id,
      name: item.name,
    })
  })

  const handleNumericalInput = (text: string) => {
    const input = Number(text)

    if (typeof input === "number" && input >= 0 && input.toString().length <= 15) {
      setData({
        ...data,
        vehicle_id: input,
      })
    } else {
      return null
    }
  }
  console.log(plugins)
  return (
    <div className="w-full font-light text-left">
      <h1 className="w-full mb-20 text-3xl text-center">{main.title}</h1>
      <div className="grid grid-cols-2 px-52 gap-y-5 gap-x-32 w-fit justify-center items-center">
        <ObjectSettingsItem
          value={data.account_id}
          title="Клиент"
          type="switch"
          body={accountsDataBody}
          onChange={(e) =>
            setData({
              ...data,
              account_id: Number(e.target.value),
            })
          }
        />
        <ObjectSettingsItem
          value={data.vehicle_id}
          title="ID"
          type="text"
          onChange={(e) => handleNumericalInput(e.target.value)}
        />
        <ObjectSettingsItem
          value={data.vehicle_pwd}
          title="Пароль"
          type="text"
          onChange={(e) =>
            setData({
              ...data,
              vehicle_pwd: e.target.value,
            })
          }
        />
        <ObjectSettingsItem
          value={data.vehicle_name}
          title="Имя"
          type="text"
          onChange={(e) =>
            setData({
              ...data,
              vehicle_name: e.target.value,
            })
          }
        />
        <ObjectSettingsItem
          value={data.plugin_id}
          title="Плагин"
          type="switch"
          body={pluginsDataBody}
          onChange={(e) => {
            console.log(e.currentTarget.value)
            setData({
              ...data,
              plugin_id: Number(e.currentTarget.value),
            })
          }}
        />

        <ObjectSettingsItem
          value={data.sim1}
          title="Номер сим1"
          type="text"
          onChange={(e) =>
            setData({
              ...data,
              sim1: e.target.value,
            })
          }
        />
        <ObjectSettingsItem
          value={data.sim2}
          title="Номер сим2"
          type="text"
          onChange={(e) =>
            setData({
              ...data,
              sim2: e.target.value,
            })
          }
        />
        <ObjectSettingsItem
          value={data.is_enabled}
          title="Прием данных"
          type="checkbox"
          onChange={(e) => {
            const target = e.target as HTMLInputElement
            setData({
              ...data,
              is_enabled: target.checked,
            })
          }}
        />
      </div>
    </div>
  )
}
