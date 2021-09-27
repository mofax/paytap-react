import React, { useEffect } from "react";
import usePromise from "../../ReactHooks/usePromise";
import { callApiMethod } from "../../api/methods";
import Table from "../../Blocks/Table";
import { css } from "../../stitches.config";
import Currency from "../../Blocks/Currency";

const overViewCSS = css({
  "& table": {
    width: "50vw",
  },
});
function POSOverview() {
  const fetchPOS = usePromise(callApiMethod);

  useEffect(() => {
    fetchPOS.trigger("fetchAllSchoolPOS");
  }, []);

  return (
    <div className={overViewCSS()}>
      <h4>All POS</h4>
      {fetchPOS.state === "resolved" && (
        <Table
          headers={["username", "school", "description", "balance"]}
          data={fetchPOS.result?.data.data || []}
          returnRowValues={(pos) => [
            pos.user.username,
            pos.school.name,
            pos.description,
            <Currency value={pos.user.accounts[0].balance}></Currency>,
          ]}
        />
      )}
    </div>
  );
}

export default POSOverview;
