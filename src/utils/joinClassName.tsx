function joinClassName(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default joinClassName;
