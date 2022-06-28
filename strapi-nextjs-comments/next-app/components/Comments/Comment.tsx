import { Dropdown } from "react-bootstrap"
import { Comment, Report } from "../../types/comments"

interface IProps {
  comment: Comment;
  postId: number;
  reportComment: (postId: number, commentId: number, report: Report) => Promise<void>;
}

const reports: Array<Report & { label: string }> = [
  { reason: "BAD_WORDS", content: "Comment reported for containing bad words", label: "Report for bad words" },
  { reason: "DISCRIMINATION", content: "Comment reported for being discriminative", label: "Report for discrimination" },
  { reason: "OTHER", content: "Comment reported for unspecified reason", label: "Report for other" },
];

const Comment: React.FC<IProps> = ({ comment, postId, reportComment }) => {
  const blocked = comment.blocked;
  return (
    <div className="list-group-item d-flex gap-3 py-3 " key={comment.id} aria-hidden="true">
      <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0" />
      <div className="d-flex gap-2 w-100 justify-content-between">
        <div>
          <h6 className="mb-0">{!blocked ? comment.author.name : "Comment Blocked"}</h6>
          <p className={`mb-0 opacity-75 ${blocked ? "placeholder" : ""}`}>{comment.content}</p>
        </div>
        <div className="d-flex align-items-center">
          {!blocked && <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
              Report
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {reports.map(report => (
                <Dropdown.Item
                  key={report.reason}
                  onClick={() => reportComment(postId, comment.id, report)}>
                  {report.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>}
          <small className={`opacity-50 text-nowrap mx-2 ${blocked ? "placeholder" : ""}`}>{comment.createdAt}</small>
        </div>
      </div>
    </div>
  )
};

export default Comment;
