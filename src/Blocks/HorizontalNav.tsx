import { Link, useLocation } from "wouter";
import { css } from "../stitches.config";
import classNames from "../tools/classNames";

const navCSS = css({
  display: "flex",
  flexDirection: "row",
  listStyle: "none",
  "& li": {
    display: "inline-block",
    border: "1px solid #9b4dca",
    borderRadius: 10,
    width: 150,
    marginX: 10,
    height: "4rem",
    overflow: "hidden",
    "&:nth-child(1)": {
      marginLeft: 0
    },
    "& a": {
      display: "inline-flex",
      width: "100%",
      height: "inherit",
      alignItems: "center",
      justifyContent: "center",
      "&.active": {},
    },
    "&.active": {
      border: "none",
      " & a": {
        fontWeight: "bold",
        textTransform: "uppercase",
        backgroundColor: "#9b4dca",
        color: "white",
      },
    },
  },
});

interface Props {
  items?: Array<{href: string, label: string}>
}

function HorizontalNav(props: Props) {
  const [path] = useLocation();
  const { items  = [] } = props;

  return (
    <nav className={"horizontal-nav"}>
      <ul className={navCSS()}>
        {items.map((item) => {
          return (
            <li key={item.label} className={classNames({ active: item.href === path })}>
              <Link href={item.href}>
                <a>{item.label}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default HorizontalNav;
