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
  const fetchStudents = usePromise(callApiMethod);

  useEffect(() => {
    fetchStudents.trigger("fetchAllStudents").then();
  }, []);

  return (
    <div className={overViewCSS()}>
      <h4>All Students</h4>
      {fetchStudents.state === "resolved" && (
        <Table
          headers={[
            "first name",
            "last name",
            "balance",
            "school",
            "admission number",
          ]}
          data={fetchStudents.result?.data.data}
          returnRowValues={(student) => [
            student.firstName,
            student.lastName,
            <Currency value={student.user.accounts[0].balance}></Currency>,
            `${student.school.code} - ${student.school.name}`,
            student.admissionNumber,
          ]}
        />
      )}
    </div>
  );
}

export default SchoolsOverview;
