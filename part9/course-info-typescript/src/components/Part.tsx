import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>
            <em> {part.description}</em>
          </div>
        </>
      );
    case "background":
      return (
        <>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{part.description}</em>
          </div>
          <div>submit to: {part.backgroundMaterial}</div>
        </>
      );
    case "group":
      return (
        <>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>project exercises: {part.groupProjectCount}</div>
        </>
      );
    case "special":
      return (
        <>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{part.description}</em>
          </div>
          <div>required skills: {part.requirements.join(", ")}</div>
        </>
      );
    default:
      return null;
  }
};

export default Part;
