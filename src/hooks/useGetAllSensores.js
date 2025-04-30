import { useEffect, useState } from 'react';
import { getAllSensores } from './../services/sensores'

export const useGetAllSensores = () => {
    const [dataSensores, setDataSensores] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const dados = await getAllSensores()
            setDataSensores(dados)
            setLoading(false)
        })()
    }, [])

    return { dataSensores, loading }
}