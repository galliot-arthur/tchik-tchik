import { ENV_TYPE } from "@/app/env";
import { Ressources } from "../domain/type/ressources";
import { Session, getSession } from "@auth0/nextjs-auth0";
import { forbiddenError } from "./error";

export default async function withAutentification(
  callBack: () => Promise<Response>,
  ressource: Ressources
) {
  const isProductionMode = ENV_TYPE === "prod"; //

  if (isProductionMode) {
    const session = await getSession();
    if (!(session instanceof Session) || !("user" in session)) {
      return forbiddenError(ressource);
    }
  }

  return callBack();
}
