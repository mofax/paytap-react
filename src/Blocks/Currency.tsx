function Currency(props: { value: number }) {
  const internal = props.value / 100;
  const style = {
    color: props.value < 0 ? "darkred" : "inherit",
  };
  return <span style={style}>{internal.toLocaleString() + " KES"}</span>;
}

export default Currency;
