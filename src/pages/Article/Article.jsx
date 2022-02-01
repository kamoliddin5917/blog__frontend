import "./Article.css";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/UseAuth";

// port
import port from "../../assets/config";

const Article = ({ setBlogs, blogs }) => {
  const [tags, setTags] = useState([]);
  const [token, setToken] = useAuth();

  const refTitle = useRef();
  const refContent = useRef();
  const refTags = useRef();

  const handleAddArticle = async (evt) => {
    evt.preventDefault();

    if (!tags.length) {
      toast.error("tag kirgazin!");
      return;
    }

    const info = {
      title: refTitle.current.value,
      content: refContent.current.value,
      tags,
    };

    const json = await fetch(`${port.url}/api/blog`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        token,
      },
      body: JSON.stringify(info),
    });

    const { data, message } = await json.json();

    if (data) {
      toast.success(message);
      setBlogs([...blogs, data]);
    } else {
      toast.error(message);
      setToken(false);
    }

    refTitle.current.value = "";
    refContent.current.value = "";
    setTags([]);
  };

  return (
    <div className="article">
      <div className="container">
        <h1 className="title">Add Article</h1>

        <form className="form" onSubmit={handleAddArticle}>
          <h4 className="form__title">Title</h4>
          <input ref={refTitle} className="input" type="text" required />

          <h4 className="form__title">Content</h4>
          <textarea ref={refContent} className="textarea" required></textarea>

          <h4 className="form__title">Tags</h4>

          <label className="tags" htmlFor="tegs">
            {tags.length ? (
              <ul className="tags__ul">
                {tags.map((tag, i) => (
                  <li className="tags__list" key={i}>
                    <span className="tags__text">{tag}</span>
                    <button
                      className="tags__btn"
                      onClick={() => {
                        const deleteTag = tags.filter(
                          (item, index) => index !== i
                        );
                        setTags(deleteTag);
                      }}
                    ></button>
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}

            <input
              ref={refTags}
              className="input input--tags"
              id="tegs"
              type="text"
              onClick={() => {
                if (refTags.current.value) {
                  setTags([...tags, refTags.current.value]);
                  refTags.current.value = "";
                }
              }}
            />
          </label>

          <button className="btn" type="submit">
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Article;
