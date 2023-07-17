import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filter = event.target.value
    dispatch(filterChange(filter))
  }

  return (
    <div>
      <label htmlFor="filter">filter: </label>
      <input
        type="text"
        onChange={handleChange}
      />
    </div>
  )
}

export default Filter
