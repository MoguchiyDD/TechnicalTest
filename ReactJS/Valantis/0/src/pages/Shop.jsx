import { Suspense } from "react"
import { getShopData, getShopDataFilters, getShopFilters } from "../api/shop/shop"
import { Await, useLoaderData, defer } from "react-router"
import ShopData from "../components/shop/Shop"
import { SkeletonShopData, SkeletonShopFilterBrand, SkeletonShopFilterPrice } from "../skeletons"
import { ShopFilterBrand, ShopFilterPrice, ShopFilterProduct } from "../components/shop/filters/ShopFilter"

let url = import.meta.env.VITE_SITE_URL
let offset = 0

function Shop() {
  const { products, prices, brands } = useLoaderData()
  const _params = new URLSearchParams(window.location.search)
  const page = _params.get("page")
  const product = _params.get("product")
  const price = _params.get("price")
  const brand = _params.get("brand")

  const handleClick = async () => {
    let curUrl = window.location.origin
    curUrl += page === null ? `/shop?page=1` : `/shop?page=${page}`

    const product = document.getElementById("shop-product")
    const price = document.getElementById("shop-price")
    const brand = document.querySelectorAll("input[name=\"shop-brand\"]")

    const filter = (strFilter, condition, filter) => {
      if (condition === true) {
        curUrl += `&${strFilter}=${filter}`
      }
    }

    if ((product !== null) && (price !== null) && (brand !== null)) {
      const _prices = await prices

      const isProduct = product.value
      filter("product", isProduct.length >= 1, isProduct)

      const isPrice = price.value
      filter("price", isPrice > _prices[0], isPrice)
      
      const isBrand = document.querySelector("input[name=\"shop-brand\"]:checked").value
      filter("brand", isBrand !== import.meta.env.VITE_API_SHOP_BRAND_DEFAULT, isBrand)

      url = curUrl
      window.location.href = url
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-3 2xl:gap-5 p-5 lg:p-3 font-mono">
      <div className="lg:h-screen flex justify-center">
        <div className="w-full lg:w-24pr xl:w-19pr block lg:fixed">
          <p className="my-3 lg:my-5 text-xl lg:text-2xl font-bold text-center text-gray-900">Фильтрация</p>
          <ShopFilterProduct value={product} />
          <Suspense fallback={<SkeletonShopFilterPrice />}>
            <Await resolve={prices}>
              {
                paths => (
                  <ShopFilterPrice price={paths} value={price} />
                )
              }
            </Await>
          </Suspense>
          <Suspense fallback={<SkeletonShopFilterBrand />}>
            <Await resolve={brands}>
              {
                paths => (
                  <ShopFilterBrand brands={paths} value={brand} />
                )
              }
            </Await>
          </Suspense>
          <button className="mt-4 p-3 lg:p-4 w-full text-sm xl:text-base 2xl:text-lg font-bold text-center text-white bg-blue-600 rounded-md focus:outline-none transition ease-in-out delay-150 hover:bg-purple-700 duration-300" onClick={handleClick}>{"Запрос".toUpperCase()}</button>
        </div>
      </div>
      <div className="col-auto lg:col-span-3 xl:col-span-4">
        <Suspense fallback={<SkeletonShopData />}>
          <Await resolve={products}>
            {
              paths => (
                <ShopData url={url} data={paths} />
              )
            }
          </Await>
        </Suspense>
      </div>
    </div>
  )
}

const shopDataLoader = async () => {
  const _params = new URLSearchParams(window.location.search)
  const page = _params.get("page")
  const queryProduct = _params.get("product")
  const queryPrice = _params.get("price")
  const queryBrand = _params.get("brand")
  let query = null
  url += "/shop?" + _params

  if ((queryProduct !== null) || (queryPrice !== null) || (queryBrand !== null)) {
    query = {
      "product": queryProduct,
      "price": queryPrice,
      "brand": queryBrand
    }
  } else {  // Offset
    if (page !== null) {
      const absPage = Math.abs(page)
      if (absPage >= 2) {
        offset = Math.abs(parseInt(page)) * 50
      }
    } else {
      offset = 0
    }
  }

  return defer({
    products: query === null ? getShopData(offset) : getShopDataFilters(query),
    prices: getShopFilters("price"),
    brands: getShopFilters("brand")
  })
}

export { Shop, shopDataLoader }
