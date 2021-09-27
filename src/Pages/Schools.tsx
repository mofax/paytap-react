import HorizontalNav from "../Blocks/HorizontalNav";
import MainHeader from "../Blocks/MainHeader";
import classNames from "../tools/classNames";
import { RouteComponentProps } from "wouter";
import { POJO } from "../types";
import NewSchool from "../Compositions/Schools/NewSchool";
import SchoolsOverview from "../Compositions/Schools/SchoolsOverview";

const navItems = [{label: 'Overview', href:"/schools"}, { label: "add school", href: "/schools/new" }];
const componentMap: POJO = {
    new: NewSchool,
};
interface Props extends RouteComponentProps {}

function SchoolsPage(props: Props) {
  const Component = componentMap[props.params.mod] || SchoolsOverview;

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

export default SchoolsPage;
