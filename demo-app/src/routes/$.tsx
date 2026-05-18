import { createFileRoute } from "@tanstack/react-router";
import { NavigationPageView } from "../components/NavigationPageView";

export const Route = createFileRoute("/$")({
  component: NavigationPageView,
});
