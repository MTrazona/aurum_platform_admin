import { PrivateLayout, PublicLayout } from "@/layout";
import { DashboardPage, SigninPage, TransactionsPage, UsersPage } from "@/pages";

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
      { path: '/users', element: <UsersPage /> },
      { path: '/transactions', element: <TransactionsPage /> },
    ],
  },
};