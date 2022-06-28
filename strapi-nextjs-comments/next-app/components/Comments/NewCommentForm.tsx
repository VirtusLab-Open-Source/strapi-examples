import { useFormik } from "formik";
import { Author } from "../../types/comments";

interface IProps {
  postId: number;
  postComment: (postId: number, author: Author, content: string, threadOf?: number) => Promise<void>;
}

const NewCommentForm: React.FC<IProps> = ({ postId, postComment }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      content: "",
    },
    onSubmit: async () => {
      const author = {
        id: formik.values.email.replace("@", "_"),
        name: formik.values.name,
        email: formik.values.email,
      }
      await postComment(postId, author, formik.values.content);
      formik.setValues(formik.initialValues);
    }
  });
  
  const defaultProps = (field: "name" | "email" | "content") => ({
    className: "form-control",
    value: formik.values[field],
    onChange: formik.handleChange,
    required: true,
    disabled: formik.isSubmitting,
    id: field,
    name: field,
  }); 

  return (
    <form className="mt-5" onSubmit={formik.handleSubmit}>
      <h4>
        Add new comment
      </h4>
      <div className="gap-2 w-75 row">
        <div className="col-3">
          <label className="form-label" htmlFor="name">Name</label>
          <input {...defaultProps("name")} type="text" placeholder="Your display name" />
          <div className="invalid-feedback">
            Valid last name is required.
          </div>
        </div>
        <div className="col-4">
          <label className="form-label" htmlFor="email">Email</label>
          <input {...defaultProps("email")} type="email" placeholder="Your email" />
          <div className="invalid-feedback">
            Valid last name is required.
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label className="form-label" htmlFor="content">Content</label>
            <input {...defaultProps("content")} type="textarea" placeholder="Content of your comment"/>
          </div>
        </div>
        <div className="row m-1">
          <button className="form-control btn btn-primary btn-md w-25" type="submit">Add new comment</button>
        </div>
      </div>
    </form>
  );
}

export default NewCommentForm;