import { css } from "../../stitches.config";
import useForm from "../../ReactHooks/useForm";
import React, { useEffect } from "react";
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
  const { id, register, values, errors, validate } =
    useForm("new-student-form");
  const fetchSchools = usePromise(callApiMethod);
  const saveNewPOS = usePromise(callApiMethod.bind(null, "createSchoolPOS"));

  useEffect(() => {
    async function load() {
      await fetchSchools.trigger("fetchAllSchools");
    }
    load().then();
  }, []);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const valid = validate();
    if (valid) {
      const form = Object.fromEntries(values);
      form.password = Math.random().toString(); // students don't use this right now
      const result = await saveNewPOS.trigger(form);
      if (result?.success) {
        setLocation("/pos");
      } else {
        console.log(result);
      }
    }
  }

  function renderSchoolOptions() {
    const { state, result } = fetchSchools;
    if (state !== "resolved") return [];
    return result?.data.data.map((school: any) => (
      <option key={school.id} value={school.id}>
        {school.name}
      </option>
    ));
  }

  return (
    <div className={newSchoolCSS()}>
      <h4>Enter POS information</h4>
      <form id={id} onSubmit={submit}>
        <div className={"input-box"}>
          <select
            placeholder={"school"}
            {...register("schoolID", { required: true })}
          >
            <option />
            {renderSchoolOptions()}
          </select>
          {<span className={"form-error-text"}>{errors.get("schoolID")}</span>}
        </div>
        <div className={"input-box"}>
          <input
            placeholder={"username"}
            {...register("userName", {
              required: true,
            })}
          />
          {<span className={"form-error-text"}>{errors.get("userName")}</span>}
        </div>
        <div className={"input-box"}>
          <input
            placeholder={"password"}
            type={"password"}
            {...register("password", { required: true })}
          />
          {<span className={"form-error-text"}>{errors.get("firstName")}</span>}
        </div>
        <div className={"input-box"}>
          <input
            placeholder={"description"}
            {...register("description", { required: true })}
          />
          {
            <span className={"form-error-text"}>
              {errors.get("description")}
            </span>
          }
        </div>
        <button>CREATE...</button>
      </form>
    </div>
  );
}

export default NewSchool;
