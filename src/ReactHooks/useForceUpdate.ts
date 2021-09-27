import React from "react";

function useForceUpdate() {
    const [u, updateState] = React.useState(Date.now());
    const forceUpdate = React.useCallback(() => updateState(Date.now()), []);

    return {u, forceUpdate}
}

export default useForceUpdate