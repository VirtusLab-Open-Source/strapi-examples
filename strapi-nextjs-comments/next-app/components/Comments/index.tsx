import usePostComments from "../../hooks/useComments";
import Comment from "./Comment";
import NewCommentForm from "./NewCommentForm";

interface IProps {
  postId: number;
}

const CommentsList: React.FC<IProps> = ({ postId }) => {
  const { data, isLoading, reportComment, postComment } = usePostComments(postId);

  if (isLoading || !data) {
    return <div>Loading comments...</div>;
  }

  return (
    <>
      <div className="list-group w-auto">
        <h2 className="blog-post-title mt-4">Comments</h2>
        <hr />
        {
          data.map(comment =>
            <Comment
              key={`comment_${comment.id}`}
              postId={postId}
              comment={comment}
              reportComment={reportComment}
            />)
        }
      </div>
      <NewCommentForm postId={postId} postComment={postComment} />
    </>
  );
}

export default CommentsList;
