export async function NormalLogin(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const data = {}

    // console.log(formData)
    formData.forEach((value, name) => {
        data[name] = value
    })


    const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(data)
    })

    if (!res.ok) return [false, null]

    return [true, await res.json()]

}