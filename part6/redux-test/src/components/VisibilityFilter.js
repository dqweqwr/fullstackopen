import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const VisibilityFilter = (props) => {
  const dispatch = useDispatch()

  return (
    <div>
      <label htmlFor="all">all</label>
      <input
        id="all"
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("ALL"))}
        checked
      />
      <label htmlFor="important">important</label>
      <input
        id="important"
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("IMPORTANT"))}
      />
      <label htmlFor="nonimportant">nonimportant</label>
      <input
        id="nonimportant"
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("NONIMPORTANT"))}
      />
    </div>
  )
}

export default VisibilityFilter
