import md5 from "md5"

const password = import.meta.env.VITE_API_SHOP_PASSWORD
const date = new Date().toISOString().slice(0, 10).split("-").join("")
const auth = md5(`${password}_${date}`).toString()

const sleep = ms => new Promise(r => setTimeout(r, ms))
const whileSleep = async (func, data) => {
  let funcData = null

  while ((funcData === null) || (funcData === undefined)) {
    funcData = await func(data)
    sleep(500)
  }

  return funcData
}

/**
 * @copyright Copyright (c) 2023 MoguchiyDD
 * @license MIT License
 * @description Using URL «http://api.valantis.store:40000/» Takes The Necessary DATA
 * @param object body Body for Sending DATA to API
 * @returns Data Result || undefined
 */
const templateFetchShop = async (body) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_SHOP_URL, {
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

/**
 * @copyright Copyright (c) 2023 MoguchiyDD
 * @license MIT License
 * @description Gets PRODUCT IDs (LIMIT 50 ITEMS)
 * @returns Object IDs || undefined
 */
const getShopIds = async (offset) => {
  const body = {
    action: "get_ids",
    "params": {"offset": offset, "limit": 50}
  }
  const getIds = await templateFetchShop(body)

  if (getIds !== undefined) {
      const ids = [...new Set(getIds)]
      return ids
  }
}

/**
 * @copyright Copyright (c) 2023 MoguchiyDD
 * @license MIT License
 * @description Gets PRODUCTS by IDs
 * @returns Object PRODUCTS || undefined
 */
const getShopData = async (offset) => {
  const getIds = await whileSleep(getShopIds, offset)  // Get IDs

  const body = {
    action: "get_items",
    "params": {"ids": getIds}
  }
  const getData = await whileSleep(templateFetchShop, body)  // Get PRODUCTS

  return getData
}

export { getShopData }
