import React from "react";
import { Route, Router } from "wouter";
import LoginPage from "./Pages/Login";
import Home from "./Pages/Home";
import SchoolsPage from "./Pages/Schools";
import StudentsPage from "./Pages/Students";
import AccountsPage from "./Pages/Accounts";
import JournalPage from "./Pages/Journal";
import POSPage from "./Pages/Pos";

type RouterArray = Array<{
  path: string;
  component: React.FunctionComponent<any>;
}>;
const routes: RouterArray = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/schools",
    component: SchoolsPage,
  },
  {
    path: "/schools/:mod",
    component: SchoolsPage,
  },
  {
    path: "/students",
    component: StudentsPage,
  },
  {
    path: "/students/:mod",
    component: StudentsPage,
  },
  {
    path: "/journal",
    component: JournalPage,
  },
  { path: "/pos", component: POSPage },
  { path: "/pos/:mod", component: POSPage },
  {
    path: "/accounts",
    component: AccountsPage,
  },
  {
    path: "/accounts/:mod",
    component: AccountsPage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
];

function App() {
  return (
    <div id={"App"} className="App">
      <Router>
        {routes.map((r) => {
          return <Route key={r.path} path={r.path} component={r.component} />;
        })}
      </Router>
    </div>
  );
}

export default App;
