type Props = {
  headers: string[];
  data: any[];
  returnRowValues: (datum: any) => any[];
};

function Table(props: Props) {
  return (
    <table>
      <thead>
        <tr>
          {props.headers.map((header) => {
            return <th key={header}>{header.toUpperCase()}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {props.data.map((datum) => {
          const row = props.returnRowValues(datum);
          return (
            <tr>
              {row.map((rowValue) => {
                return <td>{rowValue}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
