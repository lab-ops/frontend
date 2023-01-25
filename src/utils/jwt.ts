import Session from 'supertokens-auth-react/recipe/session'

const getJWT = async () => {
  if (await Session.doesSessionExist()) {
    let userId = await Session.getUserId()
    let jwt = (await Session.getAccessTokenPayloadSecurely()).jwt
    return jwt
  }
}
