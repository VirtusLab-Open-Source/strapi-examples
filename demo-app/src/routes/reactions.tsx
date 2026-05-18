import { createFileRoute } from "@tanstack/react-router";
import ReactionsPageView from "../components/ReactionsPageView";

export const Route = createFileRoute("/reactions")({
  component: ReactionsPageView,
});
