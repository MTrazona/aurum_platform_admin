import { PrivateLayout, PublicLayout } from "@/layout";
import { Roles, type AppRole } from "@/lib/rbac";
import RoleGuard from "@/components/role-guard";
import {
  BankRequestsPage,
  BuyRequestsPage,
  DashboardPage,
  GAERequestsPage,
  GCARequestsPage,
  PersonalInfoPage,
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
  personalInfo: "/users/:id",
  donatetoSave: "/donate-to-save",
};
export const routeList = {
  public: {
    layout: <PublicLayout />,
    routes: [{ path: urls.login, element: <SigninPage /> }],
  },
  private: {
    layout: <PrivateLayout />,
    routes: [
      { path: urls.dashboard, element: withGuard(<DashboardPage />) },
      { path: urls.users, element: withGuard(<UsersPage />, [Roles.Admin, Roles.Support]) },
      { path: urls.transactions, element: withGuard(<TransactionsPage />) },
      { path: urls.bankReq, element: withGuard(<BankRequestsPage />, [Roles.Admin, Roles.Support]) },
      { path: urls.buyReq, element: withGuard(<BuyRequestsPage />) },
      { path: urls.gcaReq, element: withGuard(<GCARequestsPage />) },
      { path: urls.gaeReq, element: withGuard(<GAERequestsPage />) },
      { path: urls.rankReq, element: withGuard(<RankUpRequestsPage />) },
      { path: urls.usdauReq, element: withGuard(<USDAURequestsPage />) },
      { path: urls.personalInfo, element: withGuard(<PersonalInfoPage />) },
      { path: urls.donatetoSave, element: withGuard(<PersonalInfoPage />) },
    ],
  },
};

function withGuard(component: React.ReactNode, allowed?: AppRole[]) {
  return <RoleGuard allowed={allowed}>{component}</RoleGuard>;
}
