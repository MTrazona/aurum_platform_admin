import { PrivateLayout, PublicLayout } from "@/layout";
import {
  BankRequestsPage,
  BuyRequestsPage,
  DashboardPage,
  GAERequestsPage,
  GCARequestsPage,
  RankUpRequestsPage,
  SigninPage,
  TransactionsPage,
  USDAURequestsPage,
  UsersPage,
} from "@/pages";

export const urls = {
  login: "/",
  dashboard: "/dashboard",
  users: "/users",
  transactions: "/transactions",
  bankReq: "/bank-requests",
  buyReq: "/buy-requests",
  gcaReq: "/gca-requests",
  gaeReq: "/gae-requests",
  rankReq: "/rank-up-requests",
  usdauReq: "/usdau-requests",
};
export const routeList = {
  public: {
    layout: <PublicLayout />,
    routes: [{ path: urls.login, element: <SigninPage /> }],
  },
  private: {
    layout: <PrivateLayout />,
    routes: [
      { path: urls.dashboard, element: <DashboardPage /> },
      { path: urls.users, element: <UsersPage /> },
      { path: urls.transactions, element: <TransactionsPage /> },
      { path: urls.bankReq, element: <BankRequestsPage /> },
      { path: urls.buyReq, element: <BuyRequestsPage /> },
      { path: urls.gcaReq, element: <GCARequestsPage /> },
      { path: urls.gaeReq, element: <GAERequestsPage /> },
      { path: urls.rankReq, element: <RankUpRequestsPage /> },
      { path: urls.usdauReq, element: <USDAURequestsPage /> },
    ],
  },
};
