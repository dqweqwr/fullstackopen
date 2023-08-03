import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((part, index) => (
        <div key={index}>
          <Part part={part} />
          <br />
        </div>
      ))}
    </div>
  );
};

export default Content;
