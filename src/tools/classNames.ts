/*!
    Copyright (c) 2018 Jed Watson.
    Licensed under the MIT License (MIT), see http://jedwatson.github.io/classnames
*/

type ClassNameObject = { [key: string]: boolean };
type ArrayOfClassNames = string[] | number[];
type AClassNameType = string | number | ArrayOfClassNames | ClassNameObject;

function classNames(...args: AClassNameType[]): string {
  const classes: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;

    const argType = typeof arg;

    if (argType === "string" || argType === "number") {
      classes.push(arg.toString());
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        const inner = classNames.apply(null, arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === "object") {
      if (arg.toString !== Object.prototype.toString) {
        classes.push(arg.toString());
      } else {
        const varg = arg as ClassNameObject;
        for (let key in varg) {
          if (varg.hasOwnProperty(key) && varg[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(" ");
}

export default classNames;
