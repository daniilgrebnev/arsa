export const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className='bg-white p-4 rounded-lg bg-opacity-80'>
				<p className='label rounded-lg'>{`${label} : ${payload[0].value}`}</p>
			</div>
		)
	}
}
