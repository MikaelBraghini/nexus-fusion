import { nexusFusion } from "./nexusFusion";

export const getAllSensores = async () => {
    const response = await nexusFusion.get('/sensores')
    return response.data
}