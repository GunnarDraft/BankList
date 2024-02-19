export default async function getBankList() {
    const res = await fetch('https://dev.obtenmas.com/catom/api/challenge/banks')
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}
