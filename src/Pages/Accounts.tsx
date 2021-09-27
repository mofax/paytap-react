import type { RouteComponentProps } from "wouter";
import HorizontalNav from "../Blocks/HorizontalNav";
import MainHeader from "../Blocks/MainHeader";
import AccountsOverview from "../Compositions/Accounts/AccountsOverview";
import classNames from "../tools/classNames";
import { POJO } from "../types";

const componentMap: POJO = {};

const navItems = [{ label: "Overview", href: "/accounts" }];

function AccountsPage(props: RouteComponentProps) {
  const Component = componentMap[props.params.mod] || AccountsOverview;

  return (
    <>
      <MainHeader />
      <div className={classNames("page")}>
        <HorizontalNav items={navItems} />
        {<Component />}
      </div>
    </>
  );
}

export default AccountsPage;
