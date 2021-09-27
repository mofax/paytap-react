import { useEffect } from "react";
import { callApiMethod } from "../api/methods";
import Currency from "../Blocks/Currency";
import HorizontalNav from "../Blocks/HorizontalNav";
import MainHeader from "../Blocks/MainHeader";
import Table from "../Blocks/Table";
import usePromise from "../ReactHooks/usePromise";
import classNames from "../tools/classNames";
import formatRelative from "date-fns/formatRelative";

function JournalPage() {
  const fetchJournal = usePromise(
    callApiMethod.bind(null, "fetchAllJournalEntries")
  );

  useEffect(() => {
    fetchJournal.trigger();
  }, []);

  if (!fetchJournal.result) {
    return null;
  }

  return (
    <>
      <MainHeader />
      <div className={classNames("page")} style={{ width: "50%" }}>
        <HorizontalNav items={[]} />
        <h4>Journal Entries</h4>
        <Table
          headers={["description", "amount", "date"]}
          data={fetchJournal.result?.data.data}
          returnRowValues={(j) => [
            j.description,
            <Currency value={j.amount}></Currency>,
            formatRelative(new Date(j.createdAt), new Date()),
          ]}
        ></Table>
      </div>
    </>
  );
}

export default JournalPage;
