const NumberInput = ({ value, onChange }) => {
  const handleInputChange = (e) => {
    const inputValue = Math.max(0, parseInt(e.target.value))
    onChange(inputValue)
  }

  return (
    <input
      type="number"
      value={value}
      onChange={handleInputChange}
      className="border-2 border-data-cherry-500 text-white rounded-md p-2 w-24 text-center bg-data-cherry-800"
    />
  )
}

export default NumberInput
