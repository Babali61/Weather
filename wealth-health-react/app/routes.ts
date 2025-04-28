import { type RouteConfig, index } from "@react-router/dev/routes";

export const routes = {
  home: "/",
  employeeList: "/employee-list"
};

export default [index("routes/home.tsx")] satisfies RouteConfig;
