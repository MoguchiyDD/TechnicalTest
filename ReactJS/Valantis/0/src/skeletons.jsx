function SkeletonShopData() {
  let data = []
  for (let dt = 0; dt < 51; dt++) {
    data[dt] = dt
  }

  return (
    <>
      {ShopPagination()}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 xl:gap-4 2xl:gap-5 justify-center items-center">
        {
          data.map(dt => {
            return (
              <>
                <div className="w-full h-72 2xl:h-96 p-5 grid content-center bg-white text-center border-t-8 border-blue-600 rounded transition ease-in-out delay-150 hover:shadow-xl duration-300" key={dt}>
                  <p className="pb-2 2xl:pb-3 text-9xl text-blue-600 animate-pulse">❄</p>
                  <p className="h-8 2xl:h-10 w-60 md:w-72 2xl:w-80 mx-auto bg-gray-200 animate-pulse"></p>
                  <div className="grid grid-cols-2 relative top-7 2xl:top-10">
                    <p className="h-8 2xl:h-10 w-28 md:w-32 mx-auto bg-gray-200 animate-pulse"></p>
                    <p className="h-8 2xl:h-10 w-28 md:w-32 mx-auto bg-gray-200 animate-pulse"></p>
                  </div>
                  <br />
                </div>
              </>
            )
          })
        }
      </div>
      {ShopPagination()}
    </>
  )
}

function ShopPagination() {
  return (
    <>
      <div className="my-5 flex justify-between">
        <button className="p-3 h-8 lg:h-10 w-20 lg:w-28 text-white bg-blue-600 rounded-md animate-pulse"></button>
        <p className="h-5 lg:h-7 w-10 lg:w-12 my-auto bg-gray-200 animate-pulse"></p>
        <button className="p-3 h-8 lg:h-10 w-20 lg:w-28 text-white bg-blue-600 rounded-md animate-pulse"></button>
      </div>
    </>
  )
}

export default SkeletonShopData
