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
const insertSort = (array) => {
  const length = array.length

  for (let i = 0; i < length; i++) {
    let current = array[i]

    let j = i - 1 
    while ((j > -1) && (current < array[j])) {
      array[j + 1] = array[j]
      j--
    }
    array[j + 1] = current
  }

  return array
}

/**
 * @copyright Copyright (c) 2023 MoguchiyDD
 * @license MIT License
 * @description Using URL «http://api.valantis.store:40000/» Takes The Necessary DATA
 * @param object body Body for Sending DATA to API
 * @returns Data Result || undefined
 */
const _templateFetchShop = async (body) => {
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
 * @param number offset Where to Start Getting ELEMENTS in an ARRAY
 * @returns Object IDs || undefined
 */
const _getShopIds = async (offset) => {
  const body = {
    action: "get_ids",
    params: {"offset": offset, "limit": 50}
  }
  const getIds = await _templateFetchShop(body)

  if (getIds !== undefined) {
      const ids = [...new Set(getIds)]
      return ids
  }
}

/**
 * @copyright Copyright (c) 2023 MoguchiyDD
 * @license MIT License
 * @description Gets PRODUCTS by IDs
 * @param number offset Where to Start Getting ELEMENTS in an ARRAY
 * @returns Object PRODUCTS || undefined
 */
const getShopData = async (offset) => {
  const getIds = await whileSleep(_getShopIds, offset)  // Get IDs

  const body = {
    action: "get_items",
    params: {"ids": getIds}
  }
  const getData = await whileSleep(_templateFetchShop, body)  // Get PRODUCTS

  return getData
}

/**
 * @copyright Copyright (c) 2023 MoguchiyDD
 * @license MIT License
 * @description Gets PRODUCTS from Field
 * @param string field 1 PRODUCT Field
 * @returns Object PRODUCT by Field || undefined
 */
const getShopFilters = async (field) => {
  const body = {
    action: "get_fields",
    params: {"field": field, "offset": 0}
  }
  const getProduct = await whileSleep(_templateFetchShop, body)  // Gets PRODUCTS from Field

  const filterProducts= getProduct.filter(b => !!b)
  const products = [...new Set(filterProducts)]

  switch (field) {
    case "product":
      return products
    case "brand":
      const brands = products.sort()
      brands.unshift(import.meta.env.VITE_API_SHOP_BRAND_DEFAULT)
      return brands
    case "price":
      return insertSort(products)
  }
}

export { getShopData, getShopFilters }
