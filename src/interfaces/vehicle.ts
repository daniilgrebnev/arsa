import { TstatusGroup } from '@/types/types'
import { ReactNode } from 'react'

export interface IItemDataType<V> {
	/** The value of the option corresponds to the `valueKey` in the data. **/
	value: V

	/** The content displayed by the option corresponds to the `labelKey` in the data. **/
	label: ReactNode

	/**
	 * The data of the child option corresponds to the `childrenKey` in the data.
	 * Properties owned by tree structure components, such as TreePicker, Cascader.
	 */
	children?: IItemDataType<V>[]

	/**
	 * Properties of grouping functional components, such as CheckPicker, InputPicker
	 */
	groupBy?: string

	/**
	 * The children under the current node are loading.
	 * Used for components that have cascading relationships and lazy loading of children. E.g. Cascader, MultiCascader
	 */
	loading?: boolean
}

export interface IItemDataTypeModified extends IItemDataType<string> {
	isChild?: boolean
}

export interface IVehicleTree {
	error_code: number
	error_text: string
	rows: IVehicleGroup[]
}

export interface IVehicleGroup {
	gn: string
	id: number
	pr_id: number
	vehicles: IVehicle[]
	status: TstatusGroup
}

export interface IVehicle {
	category_name: string
	group_id: number
	last_driver: ILastDriver
	last_pos: ILastPos
	vehicle_id: number
	object_name: string
	vehicle_uid: string
}

export interface ILastDriver {
	driver_code?: number
	driver_name?: string
	driver_start_date?: number
	driver_uid?: string
}

export interface ILastPos {
	alt?: number
	dir?: number
	event_date?: number
	is_ignition_on?: boolean
	lat?: number
	lon?: number
	sats?: number
	speed?: number
}
