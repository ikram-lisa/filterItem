import { getSP } from "../../pnpjs-config";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const GetProjectListItem = async () => {
  const sp = getSP();
  const response = await sp.web.lists.getByTitle("Progress tracker list").items.getAll();
  return response;
};