import { useEffect, useReducer, useState } from "react";

const states = {
  start: "start",
  pending: "pending",
  rejected: "rejected",
  resolved: "resolved",
};

interface State<K> {
  error?: Error;
  result?: K;
  state: keyof typeof states;
}

function usePromise<T extends any>(
  promiseFunction: (...args: any[]) => Promise<T>
) {
  const [state, setState] = useState<State<T>>({
    state: "start",
  });

  async function trigger(...triggerArgs: any[]) {
    setState({ ...state, ...{ state: "pending" } });

    try {
      const result = await promiseFunction(...triggerArgs);
      setState((prev) => {
        return Object.assign({}, prev, {
          result: result,
          state: states.resolved,
        });
      });
      return result;
    } catch (error) {
      setState((prev) => {
        return Object.assign({}, prev, {
          error: error,
          state: states.rejected,
        });
      });
    }
  }

  return {
    result: state.result,
    error: state.error,
    state: state.state,
    trigger,
  } as const;
}

export default usePromise;
