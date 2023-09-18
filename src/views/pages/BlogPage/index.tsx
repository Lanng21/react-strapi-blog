import { FC, memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataBlog } from "../../../components/Form";
import { useBlogContext } from "../../../hooks/useBlogContext";
import HTMLParser from "html-react-parser";

const BlogPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { blogs } = useBlogContext();
  const [blog, setBlog] = useState<DataBlog | null>(null);

  useEffect(() => {
    const foundBlog = blogs.find((b) => b.id === parseInt(id as string));

    if (foundBlog) {
      setBlog(foundBlog.attributes);
    }
  }, [id, blogs]);

  return (
    <div>
      <h1>Blog Details</h1>
      {blog ? (
        <>
          <h2>{blog.title}</h2>
          <p>{blog.description}</p>
          <p>{HTMLParser(blog.content)}</p>
          {/* {HTMLParser(dataForm.content)} */}
        </>
      ) : (
        <p>Blog not found.</p>
      )}
    </div>
  );
};

export default memo(BlogPage);
