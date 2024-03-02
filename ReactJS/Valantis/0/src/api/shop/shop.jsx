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
 * @returns Array PRODUCTS by Field || undefined
 */
const getShopFilters = async (field) => {
  const body = {
    action: "get_fields",
    params: {"field": field, "offset": 0}
  }
  const getProduct = await whileSleep(_templateFetchShop, body)  // Gets PRODUCTS from Field

  const filterProducts = getProduct.filter(b => !!b)
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

/**
 * @copyright Copyright (c) 2023 MoguchiyDD
 * @license MIT License
 * @description Gets PRODUCTS from Filters
 * @param object query {"product": ..., "price": ..., "brand": ...}
 * @returns Object PRODUCTS by Filters || undefined
 */
const getShopDataFilters = async (query) => {
  const product = query.product
  const price = query.price
  const brand = query.brand
  const _query = []

  const bodyParams = async (strFilter, filter) => {
    if ((filter !== null) && (filter !== undefined)) {
      switch (strFilter) {
        case "product": {
          const body = { action: "filter", params: {"product": filter} }
          return await whileSleep(_templateFetchShop, body)  // Gets PRODUCTS IDs by PRODUCT
        }
        case "price": {
          const body = { action: "filter", params: {"price": parseFloat(filter + ".0")} }
          return await whileSleep(_templateFetchShop, body)  // Gets PRODUCTS IDs by PRICE
        }
        case "brand": {
          const body = { action: "filter", params: {"brand": filter} }
          return await whileSleep(_templateFetchShop, body)  // Gets PRODUCTS IDs by BRAND
        }
      }
    }

    return []
  }
  const getIds = (query) => {
    if (query.length >= 2) {
      const ids = []

      for (let i = 0; i < query[0].length; i++) {
        for (let j = 0; j < query[1].length; j++) {
          const index = query[0][i].indexOf(query[1][j])
          if (index !== -1) {
            ids.push(query[0][i])
          }
        }
      }

      const filterIds = ids.filter(b => !!b)
      const newIds = [...new Set(filterIds)]

      if (query.length >= 3) {
        return getIds([newIds, query[2]])
      }

      return ids
    }

    return query[0]
  }
  const binarySearch = (data, target) => {
    let find = -1
    let stopLeft = 0
    let stopRight = 0

    let left = 0
    let right = data.length - 1

    while (left < right) {
      const mid = parseInt((left + right) / 2)
      if (data[mid] == target) {
        find = data[mid]
        return find
      } else if (data[mid] < target) {
        left = mid + 1
      } else if (data[mid] > target) {
        right = mid + 1
      }

      if ((left === stopLeft) && (right === stopRight)) {
        return data[left]
      }

      stopLeft = left
      stopRight = right
    }

    if (find === -1) {
      return data[left]
    }
    console.log(find)
    return find
  }

  const getIdsBrandFilter = await bodyParams("brand", brand)
  if (getIdsBrandFilter.length >= 1) {
    _query.push(getIdsBrandFilter)
  }

  const getIdsProductFilter = await bodyParams("product", product)
  if (getIdsProductFilter.length >= 1) {
    _query.push(getIdsProductFilter)
  }
  
  if (price !== null) {
    const isPrices = await getShopFilters("price")
    const findPrice = binarySearch(isPrices, parseInt(price))
    const getIdsPriceFilter = await bodyParams("price", findPrice)
    if (getIdsPriceFilter.length >= 1) {
      _query.push(getIdsPriceFilter)
    } 
  }

  const getProductIds = getIds(_query)
  const getProduct = await whileSleep(_templateFetchShop, {  // Gets PRODUCTS from FILTERS
    action: "get_items",
    params: {"ids": getProductIds}
  })

  return getProduct
}

export { getShopData, getShopFilters, getShopDataFilters }
