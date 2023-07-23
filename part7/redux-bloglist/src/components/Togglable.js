import { useState } from "react"

const Togglable = (props) => {
  const { buttonLabel } = props
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? "" : "none" }
  const hideWhenVisible = { display: visible ? "none" : "" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <>
      <div
        style={hideWhenVisible}
      >
        <button
          className="button bg-green-500 font-bold text-white"
          onClick={toggleVisibility}
        >
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  )
}

Togglable.displayName = "Togglable"

export default Togglable
