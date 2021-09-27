import useForceUpdate from "./useForceUpdate";
import { useEffect } from "react";

interface KnownEvent<T> {
  target: {
    value: T;
  };
}

type FieldValidator = (field: string, values: string) => string | null;

interface RegisterOptions {
  required?: boolean;
  validators?: FieldValidator[];
  formatter?: (...args: any[]) => any;
}

type ValueMap<V extends any> = Map<string, V>;
const storage = new Map<
  string,
  {
    formValues: ValueMap<any>;
    formErrors: ValueMap<any>;
    fieldValidators: ValueMap<FieldValidator[]>;
    fieldNames: Set<string>;
  }
>();

function replaceStorage(id: string) {
  let formValues = new Map();
  let formErrors = new Map();
  let fieldValidators = new Map();
  let fieldNames = new Set<string>();

  storage.set(id, { formValues, formErrors, fieldValidators, fieldNames });
  return storage.get(id);
}

function getStorage(id: string) {
  let v = storage.get(id);
  if (v == undefined) {
    v = replaceStorage(id);
  }
  if (!v) {
    throw new Error("useForm: internal error setting form values");
  }
  return v;
}

function addFieldName(formId: string, name: string) {
  const { fieldNames } = getStorage(formId);
  fieldNames.add(name);
}

function setFieldValidator(
  id: string,
  field: string,
  validator: FieldValidator
) {
  const { fieldValidators } = getStorage(id);
  const prev = fieldValidators.get(field);
  const replacement = Array.isArray(prev) ? [...prev, validator] : [validator];
  fieldValidators.set(field, replacement);
}

function getFieldValidators(id: string, field: string) {
  const { fieldValidators } = getStorage(id);
  const stored = fieldValidators.get(field);
  if (Array.isArray(stored)) return stored;
  return [];
}

function useForm(formId: string) {
  useEffect(() => {
    return () => {
      replaceStorage(formId);
    };
  }, []);

  if (!formId) {
    throw new Error("formID must be provided to useForm()");
  }

  const { forceUpdate } = useForceUpdate();
  const { formValues, formErrors, fieldNames } = getStorage(formId);

  return {
    id: formId,
    fields: Array.from(fieldNames),
    values: formValues,
    errors: formErrors,
    valid: formErrors.size === 0,
    validate() {
      for (let key of fieldNames) {
        const value = formValues.get(key);
        const validators = getFieldValidators(formId, key);
        for (let validator of validators) {
          const check = validator(key, value);
          if (check) {
            formErrors.set(key, check);
          }
        }
      }

      forceUpdate();
      return formErrors.size === 0;
    },
    register<T>(fieldId: string, options: RegisterOptions = {}) {
      addFieldName(formId, fieldId);
      if (options.required) {
        setFieldValidator(formId, fieldId, (field, value) => {
          if (!value) return `${field} is required`;
          return null;
        });
      }

      return {
        id: fieldId,
        name: fieldId,
        value: formValues.get(fieldId) as T,
        onChange(evt: KnownEvent<T>) {
          let value = evt.target?.value;
          if (options.formatter) {
            value = options.formatter(value);
          }
          formValues.set(fieldId, value);
          if (options.required) {
            if (!value) {
              formErrors.set(fieldId, `${fieldId} is required`);
            } else {
              formErrors.delete(fieldId);
            }
          }
          forceUpdate();
        },
      };
    },
  };
}

export default useForm;
