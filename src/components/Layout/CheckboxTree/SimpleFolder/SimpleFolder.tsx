import { RootState } from '@/store/store'
import { TstatusGroup } from '@/types/types'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './SimpleFolder.css'

type propsType = {
	children: React.ReactNode
	title: string
	onCheked?: () => void
	status?: TstatusGroup
}

export const SimpleFolder: React.FC<propsType> = ({
	status,
	children,
	title,
	onCheked,
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const searchedGroups = useSelector(
		(state: RootState) => state.security.searchedVehicle
	)
	useEffect(() => {
		if (searchedGroups != null && searchedGroups.length !== 0) {
			setIsOpen(true)
		}
	}, [searchedGroups])

	const icon =
		status === 'all' ? 'icon-checked' : status === 'some' ? 'icon-minus' : ''
	return (
		<div className='folder'>
			<div className='folder__title'>
				{status && (
					<label>
						<div className={`folder__checkbox ${icon}`}></div>
						<input
							type='checkbox'
							checked={status === 'all'}
							onChange={onCheked}
						/>
					</label>
				)}
				<div onClick={() => setIsOpen(prev => !prev)}>
					<span className={isOpen ? 'icon-folder-open' : 'icon-folder'}></span>
					{title}
				</div>
			</div>
			<div className={`folder__body ${isOpen ? 'folder__body--open' : ''}`}>
				{children}
			</div>
		</div>
	)
}
