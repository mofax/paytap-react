import SchoolsOverview from "../Compositions/Schools/SchoolsOverview";
import MainHeader from "../Blocks/MainHeader";
import classNames from "../tools/classNames";
import HorizontalNav from "../Blocks/HorizontalNav";
import NewStudent from "../Compositions/Students/NewStudent";
import { POJO } from "../types";
import { RouteComponentProps } from "wouter";
import StudentsOverview from "../Compositions/Students/StudentsOverview";
import POSOverview from "../Compositions/POS/POSOverview";
import NewPOS from "../Compositions/POS/NewPOS";

const componentMap: POJO = {
  new: NewPOS,
};

const navItems = [
  { label: "Overview", href: "/pos" },
  { label: "Add POS", href: "/pos/new" },
];

function POSPage(props: RouteComponentProps) {
  const Component = componentMap[props.params.mod] || POSOverview;

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

export default POSPage;
