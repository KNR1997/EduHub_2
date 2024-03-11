import { StudentInterface } from "../../interfaces/Entity.type";

export const commonMutation = async (
  url: string,
  formData: StudentInterface,
  addOrEdit: boolean
) => {
  const method = addOrEdit ? "put" : "post";

  return fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};
