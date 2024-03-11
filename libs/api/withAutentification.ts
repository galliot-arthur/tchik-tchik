import { ENV_TYPE } from "@/app/env";
import { Session, getSession } from "@auth0/nextjs-auth0";
import { forbiddenError } from "./error";
import { Ressources } from "../domain/type/ressources";

export default async function withAutentification(
  callBack: () => Promise<Response>,
  ressource: Ressources
) {
  const isProductionMode = ENV_TYPE === "prod";

  if (isProductionMode) {
    console.log(ressource, callBack.name);

    const session = await getSession();
    if (!(session instanceof Session) || !("user" in session)) {
      return forbiddenError(ressource);
    }

    return callBack();
  }

  return callBack();
}
