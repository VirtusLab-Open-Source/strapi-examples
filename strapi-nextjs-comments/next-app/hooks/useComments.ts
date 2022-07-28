import { useQuery, useQueryClient } from "react-query";
import { GetComments, PostComment, ReportComment } from "../api/comment";
import { Comment } from "../types/comments";

const usePostComments = (postId: number) => {
  const queryClient = useQueryClient();
  const { isLoading, data, error } = useQuery<Comment[]>('getComments', () => GetComments(postId));

  const handleError = (error: unknown) => console.error(error);
  const handleSuccess = async () => await queryClient.invalidateQueries('getComments');
  
  const reportComment = async (...args: Parameters<typeof ReportComment>) => {
    try {
      await ReportComment(...args);
      await handleSuccess();
    } catch (e) {
      handleError(e);
    }
  } 

  const postComment = async (...args: Parameters<typeof PostComment>) => {
    try {
      await PostComment(...args);
      await handleSuccess();
    } catch (e) {
      handleError(e);
    }
  }

  return { data, isLoading, error, reportComment, postComment };
};

export default usePostComments;