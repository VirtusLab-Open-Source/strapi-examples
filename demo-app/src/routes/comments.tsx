import { createFileRoute } from "@tanstack/react-router";
import CommentsPageView from "../components/CommentsPageView";

export const Route = createFileRoute("/comments")({
  component: CommentsPageView,
});
