import { AppDispatch } from '@/store/store'
import { useDispatch } from 'react-redux'
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '../../../shadcnui/ui/resizable'
import { TableBody } from './TableBody'
import { TableFilters } from './TableFilters'
import { TableHead } from './TableHead'
import { Tires } from './tires/Tires'

export const Table = () => {
	const dispatch: AppDispatch = useDispatch()

	return (
		<div className=''>
			<ResizablePanelGroup direction='horizontal'>
				<ResizablePanel defaultSize={65} minSize={29} className=''>
					<div className='table-wrapper relative w-full  mx-auto min-h-[30dvh] border-b-orange-400 border-b-2 h-[82dvh]  mb-10 overflow-y-auto'>
						<TableFilters />
						<table
							id='table'
							className='px-2 w-[95%] mx-auto mb-10 rounded-t-lg overflow-hidden'
						>
							<thead className=' bg-zinc-700 sticky'>
								<TableHead />
							</thead>

							<tbody className='overflow-y-auto max-h-[20dvh]'>
								<TableBody />
							</tbody>
						</table>
					</div>
				</ResizablePanel>
				{/* Ресайзер для изменения размера таблицы */}
				<ResizableHandle className='w-[1px] bg-orange-400' />

				{/* Боковая панель */}
				<ResizablePanel defaultSize={35} minSize={20} maxSize={71} className=''>
					{/* Содержимое боковой панели */}
					<Tires />
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	)
}
