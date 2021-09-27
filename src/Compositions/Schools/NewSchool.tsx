import { css } from "../../stitches.config";
import useForm from "../../ReactHooks/useForm";
import React from "react";
import usePromise from "../../ReactHooks/usePromise";
import { callApiMethod } from "../../api/methods";
import { useLocation } from "wouter";

const newSchoolCSS = css({
  "& form": {
    width: 300,
  },
});

function NewSchool() {
  const [, setLocation] = useLocation();
  const { id, register, values, errors, validate } = useForm("new-school-form");
  const { trigger, state, result } = usePromise(callApiMethod);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const valid = validate();
    if (valid) {
      const form = Object.fromEntries(values);
      await trigger("createSchool", form);
      setLocation("/schools");
    }
  }

  return (
    <div className={newSchoolCSS()}>
      <h4>Enter school information</h4>
      <form id={id} onSubmit={submit}>
        <div className={"input-box"}>
          <input
            placeholder={"name of school"}
            {...register("name", { required: true })}
          />
          {<span className={"form-error-text"}>{errors.get("name")}</span>}
        </div>
        <div className={"input-box"}>
          <input
            placeholder={"school code"}
            {...register("code", { required: true })}
          />
          {<span className={"form-error-text"}>{errors.get("code")}</span>}
        </div>
        <button>CREATE...</button>
      </form>
    </div>
  );
}

export default NewSchool;
