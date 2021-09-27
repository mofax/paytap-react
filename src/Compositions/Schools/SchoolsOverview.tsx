import React, { useEffect } from "react";
import usePromise from "../../ReactHooks/usePromise";
import { callApiMethod } from "../../api/methods";
import Table from "../../Blocks/Table";
import {css} from "../../stitches.config";

const overViewCSS = css({
  '& table': {
    width: '50vw'
  }
})
function SchoolsOverview() {
  const fetchSchools = usePromise(callApiMethod);

  useEffect(() => {
    fetchSchools.trigger("fetchAllSchools");
  }, []);

  return (
    <div className={overViewCSS()}>
      <h4>Registered Schools</h4>
      {fetchSchools.state === "resolved" && (
        <Table
          headers={["code", "name"]}
          data={fetchSchools.result?.data.data}
          returnRowValues={(school) => [school.code, school.name]}
        />
      )}
    </div>
  );
}

export default SchoolsOverview;
