import { CoursePart } from "../types";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((coursePart, index) => (
        <p key={index}>
          {coursePart.name} {coursePart.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
