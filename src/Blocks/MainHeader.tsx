import classNames from "../tools/classNames";
import { colors, css } from "../stitches.config";
import { Link, useLocation } from "wouter";

const mainCSS = css({
  backgroundColor: colors.purple,
  height: 100,
  "& .main-header-top": {
    height: 50,
  },
  "& .main-header-bottom": {
    height: 50,
    width: 400,
    display: "flex",
    margin: "auto",
  },
  "& .main-header-link": {
    textTransform: "uppercase",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  "& .nav": {
    display: "flex",
    listStyle: "none",
    color: "white",
    height: "inherit",
    fontSize: "1.5rem",
    margin: 0,
    "& a": {
      display: "inline-flex",
      alignItems: "end",
      justifyContent: "center",
      color: "inherit",
      width: "100%",
      paddingBottom: "0.5rem",
    },
    "& li": {
      display: "inline-flex",
      width: 100,
      margin: 0,
      marginRight: 20,
      "&.active": {
        borderBottom: "3px solid white",
      },
    },
  },
});

const items = [
  { href: "/", label: "home" },
  { href: "/students", label: "students" },
  { href: "/schools", label: "schools" },
  { href: "/pos", label: "POS" },
  { href: "/accounts", label: "accounts" },
  { href: "/journal", label: "journal" },
];

function isActivePath(item: { href: string }, path: string) {
  if (path === "/") {
    return item.href === path;
  }
  return item.href.startsWith(path);
}

function MainHeader() {
  const [path] = useLocation();

  return (
    <div className={classNames("main-header", mainCSS())}>
      <div className={"main-header-top"} />
      <div className={"main-header-bottom"}>
        <ul className={"nav"} role={"navigation"}>
          {items.map((item) => {
            return (
              <li
                key={item.label}
                className={classNames({ active: isActivePath(item, path) })}
              >
                <Link href={item.href}>
                  <a className="main-header-link">{item.label.toUpperCase()}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default MainHeader;
