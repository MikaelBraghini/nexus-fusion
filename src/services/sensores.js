import { nexusFusion } from "./nexusFusion";

export const getAllSensores = async () => {
    const response = await nexusFusion.get('/sensors')
    return response.data
}