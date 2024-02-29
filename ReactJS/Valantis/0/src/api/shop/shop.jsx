import md5 from "md5"

const password = "Valantis"
const date = new Date().toISOString().slice(0, 10).split("-").join("")
const auth = md5(`${password}_${date}`).toString()

const templateFetchShop = async (body) => {
  try {
    const response = await fetch("http://api.valantis.store:40000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": auth
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
        throw new Error(`Invalid method in the store API — ${body.action}`)
    }
    const data = await response.json()
    return data.result
  } catch (error) {
      console.error(error)
  }
}

export const getShopData = async () => {
  const body = { action: "get_ids" }
  const getIds = await templateFetchShop(body)

  if (getIds !== undefined) {
      const ids = [...new Set(getIds)]
      console.log(getIds.length, ids.length)
  }
}

export default getShopData
