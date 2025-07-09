import { PrivateLayout, PublicLayout } from "@/layout";
import { DashboardPage, SigninPage } from "@/pages";

export const routeList = {
  public: {
    layout: <PublicLayout />,
    routes: [
      { path: '/', element: <SigninPage /> },
    ],
  },
  private: {
    layout: <PrivateLayout />,
    routes: [
      { path: '/dashboard', element: <DashboardPage /> },
    ],
  },
};