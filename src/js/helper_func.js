import { async } from "regenerator-runtime";

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const send_GetJson = async function (URL, receipeData = null) {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(receipeData),
    };

    const request = receipeData ? await fetch(URL, options) : await fetch(URL);

    // transform the promise to object using .json()
    const recipe = await request.json();

    if (!request.ok) throw new Error("not found");
    return recipe;
  } catch (e) {
    throw e;
  }
};
