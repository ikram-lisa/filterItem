import { getSP } from "../pnpjs-config";
export const GetProjectList = async () => {
  const sp = getSP();
  const response = await sp.web.lists.getByTitle("Project").items.getAll();
  return response;
};
