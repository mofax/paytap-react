const base_url = "http://localhost:3000/";

export async function callApiMethod(method: string, payload: any = {}) {
  const url = base_url + `methods/${method}`;
  const fetchOptions = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: payload ? JSON.stringify(payload) : undefined,
  } as const;

  const response = await fetch(url, fetchOptions);
  if (response.status === 401) {
    //login-required
    window.location.href = "/login";
    return;
  }
  return {
    status: response.status,
    success: response.status === 200,
    data: await response.json(),
  };
}
