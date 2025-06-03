import { nexusFusion } from "./nexusFusion"

export const postAuthUser = async (data) => {
  const response = await nexusFusion.post("/login", {
    user: data.user,
    password: data.password,
  })

  return response
}
