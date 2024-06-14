import { TstatusGroup } from "@/types/types"
import { LatLng } from "leaflet"

export interface IGroupGeozone {
  gn: string
  id: number
  pr_id: number
  geozones: IGeozone[]
  status: TstatusGroup
}

export interface IGeozone {
  geozone_name: string
  color: string
  uid: string
  geozone_type_id: number
  latitube: number | null
  longitube: number | null
  radius: number | null
  line_width: number
  geometry_type_id: number
  use_as_address: boolean
  image_url: string | null
  geozone_points: Array<any>
  comment: string | null
  account_id: number
  transparency: number
}
