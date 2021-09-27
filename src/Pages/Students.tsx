import SchoolsOverview from "../Compositions/Schools/SchoolsOverview";
import MainHeader from "../Blocks/MainHeader";
import classNames from "../tools/classNames";
import HorizontalNav from "../Blocks/HorizontalNav";
import NewStudent from "../Compositions/Students/NewStudent";
import {POJO} from "../types";
import {RouteComponentProps} from "wouter";
import StudentsOverview from "../Compositions/Students/StudentsOverview";

const componentMap: POJO = {
    new: NewStudent,
}

const navItems = [{label: 'Overview', href:"/students"}, { label: "add student", href: "/students/new" }];

function StudentsPage(props: RouteComponentProps) {
    const Component = componentMap[props.params.mod] || StudentsOverview;

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

export default StudentsPage;