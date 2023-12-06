const API_URL = 'http://127.0.0.1:4200'

export async function call_cuentos(prompt, id_token){
    const response = await fetch(
        `${API_URL}/images/history`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                promp: prompt,
                id_token
            }),
        }
    )
    const data = await response.json()
    if (response.status > 300) throw Error(data.detail)
    return data
}