import { Suspense } from "react"
import { getShopData, getShopFilters } from "../api/shop/shop"
import { Await, useLoaderData, defer } from "react-router"
import ShopData from "../components/shop/Shop"
import { SkeletonShopData, SkeletonShopFilterBrand, SkeletonShopFilterPrice } from "../skeletons"
import { ShopFilterBrand, ShopFilterPrice, ShopFilterProduct } from "../components/shop/filters/ShopFilter"

let offset = 0

function Shop() {
  const { page, products, titles, brands, prices } = useLoaderData()

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-3 2xl:gap-5 p-5 lg:p-3 font-mono">
        <div className="lg:h-screen flex justify-center">
          <div className="w-full lg:w-24pr xl:w-19pr block lg:fixed">
            <p className="text-xl lg:text-2xl font-bold text-center text-gray-900">Фильтрация</p>
              <Suspense fallback={<p className="p-3 text-lg lg:text-xl font-bold text-center text-gray-900">~~</p>}>
                <Await resolve={titles}>
                  {
                    paths => (
                      <ShopFilterProduct />
                    )
                  }
                </Await>
              </Suspense>
              <Suspense fallback={<SkeletonShopFilterPrice />}>
                <Await resolve={prices}>
                  {
                    paths => (
                      <ShopFilterPrice price={paths} />
                    )
                  }
                </Await>
              </Suspense>
              <Suspense fallback={<SkeletonShopFilterBrand />}>
                <Await resolve={brands}>
                  {
                    paths => (
                      <ShopFilterBrand brands={paths} />
                    )
                  }
                </Await>
              </Suspense>
            </div>
          </div>
          <div className="col-auto lg:col-span-3 xl:col-span-4">
            <Suspense fallback={<SkeletonShopData />}>
              <Await resolve={products}>
                {
                  paths => (
                    <ShopData page={page} data={paths} />
                  )
                }
              </Await>
            </Suspense>
          </div>
      </div>
    </>
  )
}

const shopDataLoader = async () => {
  const params = new URLSearchParams(window.location.search)
  const page = params.get("page")

  if (page !== null) {  // Offset
    const absPage = Math.abs(page)
    if (absPage >= 2) {
      offset = Math.abs(parseInt(page)) * 50
    }
  } else {
    offset = 0
  }

  return defer({
    page: page === null ? 1 : parseInt(page),
    products: getShopData(offset),
    titles: getShopFilters("product"),
    brands: getShopFilters("brand"),
    prices: getShopFilters("price")
  })
}

export { Shop, shopDataLoader }
