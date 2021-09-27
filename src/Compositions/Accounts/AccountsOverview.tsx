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
function SchoolsOverview() {
  const fetchAccounts = usePromise(callApiMethod);

  useEffect(() => {
    fetchAccounts.trigger("fetchAllAccounts");
  }, []);

  return (
    <div className={overViewCSS()}>
      <h4>All Accounts</h4>
      {fetchAccounts.state === "resolved" && (
        <Table
          headers={["id", "balance", "label", "user"]}
          data={fetchAccounts.result?.data.data}
          returnRowValues={(account) => [
            account.id,
            <Currency value={account.balance}></Currency>,
            account.label,
            account.user?.username,
          ]}
        />
      )}
    </div>
  );
}

export default SchoolsOverview;
