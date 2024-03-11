import { Ressources } from "../domain/type/ressources";

export default async function withAutentification(
  callBack: () => Promise<Response>,
  _: Ressources
) {
  return callBack();
}

/*   const isProductionMode = false; // ENV_TYPE === "prod";

  if (isProductionMode) {
    console.log(ressource, callBack.name);

    const session = await getSession();
    if (!(session instanceof Session) || !("user" in session)) {
      return forbiddenError(ressource);
    }

    return callBack();
  } */
