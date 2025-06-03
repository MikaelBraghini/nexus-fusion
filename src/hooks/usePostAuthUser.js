// hooks/usePostAuthUser.js
import { postAuthUser } from "../services/authUser"

export const postAuthUserRequest = async (data) => {
  const dados = await postAuthUser(data)
  return dados.data
}
