const shopPagination = () => {
  return (
    <div className="my-5 flex justify-between">
      <button className="p-3 h-8 lg:h-10 w-20 lg:w-28 text-white bg-blue-600 rounded-md animate-pulse"></button>
      <p className="h-5 lg:h-7 w-10 lg:w-12 my-auto bg-gray-200 animate-pulse"></p>
      <button className="p-3 h-8 lg:h-10 w-20 lg:w-28 text-white bg-blue-600 rounded-md animate-pulse"></button>
    </div>
  )
}

function SkeletonShopData() {
  let data = []
  for (let dt = 0; dt < 51; dt++) {
    data[dt] = dt
  }

  return (
    <>
      { shopPagination() }
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 xl:gap-4 2xl:gap-5 justify-center items-center">
        {
          data.map(dt => {
            return (
              <>
                <div className="w-full h-96 p-5 grid content-center bg-white text-center border-t-8 border-blue-600 rounded transition ease-in-out delay-150 hover:shadow-xl duration-300" key={`${dt}`}>
                  <p className="pb-2 2xl:pb-3 text-9xl text-blue-600 animate-pulse">❄</p>
                  <p className="mb-4 h-8 2xl:h-10 w-5/6 mx-auto bg-gray-200 animate-pulse"></p>
                  <p className="h-8 2xl:h-10 w-5/6  mx-auto bg-gray-200 animate-pulse"></p>
                  <div className="grid grid-cols-2 relative top-7 2xl:top-10">
                    <p className="h-8 2xl:h-10 w-4/6 mx-auto bg-gray-200 animate-pulse"></p>
                    <p className="h-8 2xl:h-10 w-4/6 mx-auto bg-gray-200 animate-pulse"></p>
                  </div>
                  <br />
                </div>
              </>
            )
          })
        }
      </div>
      { shopPagination() }
    </>
  )
}

function SkeletonShopFilterPrice() {
  return (
    <div className="mb-4 p-3 lg:p-4 grid grid-cols-3 lg:grid-cols-1 gap-1 bg-white rounded-md">
      <div className="lg:pb-2 flex items-center space-x-3 text-base xl:text-lg 2xl:text-xl font-bold text-center">
        <p className="text-blue-600">₽</p>
        <label htmlFor="price" className="!ml-2 text-gray-900">Цены</label>
      </div>
      <div className="grid col-span-2 grid-cols-2 lg:grid-cols-3 gap-1 items-center justify-items-center">
        <div className="h-8 w-full lg:col-span-2 bg-gray-200 animate-pulse"></div>
        <div className="h-8 w-5/6 mx-auto bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  )
}

function SkeletonShopFilterBrand() {
  let brands = []
  for (let b = 1; b <= 10; b++) {
    brands[b] = b
  }

  return (
    <div className="bg-white rounded-md">
      <details className="rounded-md" open>
        <summary className="p-3 lg:p-4 list-item space-x-3 text-base xl:text-lg 2xl:text-xl font-bold text-left text-white bg-blue-600 rounded-md">Бренды</summary>
        <div className="h-52 p-3 lg:p-4 overflow-scroll">
          {
            brands.map(brand => {
              return (
                <div className="py-2 flex items-center border-b border-gray-300 border-dashed" key={`${brand}`}>
                  <input className="mr-2 mb-1 size-5 appearance-none border border-gray-600 rounded-full before:content[''] before:size-4 before:mt-px before:ml-px before:block before:rounded-full before:bg-white checked:before:border-blue-600 checked:before:bg-blue-600" type="radio" id={`${brand}`} name="shop-brand" value={`${brand}`} />
                  <div className="h-8 w-5/6 mx-auto bg-gray-200 animate-pulse"></div>
                </div>
              )
            })
          }
        </div>
      </details>
    </div>
  )
}

export { SkeletonShopData, SkeletonShopFilterPrice, SkeletonShopFilterBrand }
