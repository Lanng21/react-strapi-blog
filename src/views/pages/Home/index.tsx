import React, { FC, memo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Blog from "../../../components/Blog";
import Modal from "../../../components/Modal";
import Form from "../../../components/Form";
import { useBlogContext } from "../../../hooks/useBlogContext";
import "./Home.scss";

interface DataBlog {
  title: string;
  description: string;
  content: string;
  createAt?: string;
  updateAt?: string;
  publishAt?: string;
}

export interface DataType {
  id: number;
  attributes: DataBlog;
}

const HomePage: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { blogs, handleDelete } = useBlogContext();
  const [idForm, setIdForm] = useState<number>(0);
  const navigate = useNavigate();

  const handlePopupModal = useCallback(() => {
    setIsOpenModal((prev) => !prev);
    setIdForm(0);
  }, [isOpenModal]);

  const handleDeleteBlog = useCallback(
    (id: number) => {
      handleDelete(id);
    },
    [handleDelete]
  );

  const handleEditBlog = useCallback((id: number) => {
    setIdForm(id);
    setIsOpenModal(true);
  }, []);

  const navigateToBlog = (id: number) => {
    navigate(`/blog/${id}`);
  };

  return (
    <>
      <h1>Blogs</h1>
      <div>
        <button className="btn" onClick={handlePopupModal}>
          Add new blog
        </button>
      </div>
      <div className="blogs__group">
        {blogs.map((blog) => {
          const { id, attributes } = blog;

          return (
            <div key={id}>
              <Blog
                title={attributes.title}
                description={attributes.description}
                onDelete={() => {
                  handleDeleteBlog(id);
                }}
                onEdit={() => {
                  handleEditBlog(id);
                }}
                onView={() => {
                  navigateToBlog(id);
                }}
              />
            </div>
          );
        })}
      </div>
      {isOpenModal && (
        <Modal>
          <Form id={idForm} onCancel={handlePopupModal} />
        </Modal>
      )}
    </>
  );
};

export default memo(HomePage);
