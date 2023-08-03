import ReactDOM from "react-dom/client";
import "./index.css";
import PropTypes from "prop-types";

interface WelcomeProps {
  name: string;
}

const Welcome = ({ name }: WelcomeProps) => {
  return <h1>Hello, {name}</h1>;
};

Welcome.propTypes = {
  name: PropTypes.string,
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(<Welcome name={"Sarah"} />);
