const FilterSelect = ({ options, value, onChange }) => {
	return (
		<select
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className="border border-gray-300 rounded-md p-2"
		>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
};
