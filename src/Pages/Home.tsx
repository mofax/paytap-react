import HorizontalNav from "../Blocks/HorizontalNav";
import { css } from "../stitches.config";
import classNames from "../tools/classNames";
import MainHeader from "../Blocks/MainHeader";

const homeCSS = css({
  margin: "auto",
  marginY: 50,
  width: 1260,
});
function Home() {
  return (
    <>
      <MainHeader />
      <div className={classNames("home-page", homeCSS())}></div>
    </>
  );
}

export default Home;
