import { SubjectAllocateInterface } from "../../interfaces/Entity.type";

export const commonMutation = async (
  url: string,
  formData: SubjectAllocateInterface,
  type: string
) => {
  const method = type;

  return fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};
