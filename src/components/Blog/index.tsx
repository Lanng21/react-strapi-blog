import { FC, memo } from "react";
import "./Blog.scss";

interface BlogProps {
  title: string;
  description: string;
  onDelete: () => void;
  onEdit: () => void;
  onView?: () => void;
}

const Blog: FC<BlogProps> = ({
  title,
  description,
  onDelete,
  onEdit,
  onView,
}) => {
  return (
    <div className="blog__item">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="btn__group">
        <button className="btn" onClick={onDelete}>
          Delete
        </button>
        <button className="btn" onClick={onEdit}>
          Edit
        </button>
        {onView && (
          <button className="btn" onClick={onView}>
            Detail
          </button>
        )}
      </div>
    </div>
  );
};

Blog.defaultProps = {
  onEdit: () => {},
  onDelete: () => {},
};

export default memo(Blog);
