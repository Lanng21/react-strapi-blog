import { memo, FC, useState, useCallback, ChangeEvent, useEffect } from "react";
import "./Form.scss";
import { useBlogContext } from "../../hooks/useBlogContext";

interface FormProps {
  id: number;
  onOk?: () => void;
  onCancel?: () => void;
}

export interface DataBlog {
  title: string;
  description: string;
  content: string;
}

const Form: FC<FormProps> = ({ id, onCancel }) => {
  const { blogs, handleCreate, handleUpdate } = useBlogContext();
  const [dataForm, setDataForm] = useState<DataBlog>({
    title: "",
    description: "",
    content: "",
  });

  useEffect(() => {
    if (id) {
      const [data] = blogs.filter((blog) => {
        return blog.id === id;
      });

      const { attributes } = data;
      setDataForm(attributes);
    }
  }, []);

  const handleDataChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleOk = useCallback(() => {
    id ? handleUpdate(id, dataForm) : handleCreate(dataForm);

    if (onCancel) {
      onCancel();
    }
  }, [dataForm, handleCreate, handleUpdate, id, onCancel]);

  return (
    <div className="wrapper-form">
      <form id="form_blog">
        <div className="form__group">
          <label htmlFor="name" className="label">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={dataForm.title}
            className="input"
            onChange={handleDataChange}
          />
        </div>
        <div className="form__group">
          <label htmlFor="price" className="label">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="input"
            value={dataForm.description}
            onChange={handleDataChange}
          />
        </div>
        <div className="form__group">
          <label htmlFor="price" className="label">
            Content
          </label>
          <input
            type="text"
            name="content"
            id="content"
            value={dataForm.content}
            className="input"
            onChange={handleDataChange}
          />
        </div>
        <div className="form__group btn__group">
          <button type="button" className="btn" onClick={handleOk}>
            OK
          </button>
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

Form.defaultProps = {
  onOk: () => {},
  onCancel: () => {},
};

export default memo(Form);
