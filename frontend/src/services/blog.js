
export const GetBotd = async (token) => {

    const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}/blogs?categories=botd`,{
        headers: {
            Authoization: `Bearer ${token}`
        }
    })

    if (!res.ok) return [false, null]

    return [true, await res.json()]

}