import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {/* Tanstack Router Devtools */}
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </>
  ),
});
