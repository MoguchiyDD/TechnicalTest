import milkyWay from "/milky-way.svg"

function ShopData({url, data}) {
  const dataLength = data.length
  let htmlData = data.map((dt, index) => {
    return (
      <div className="w-full h-96 p-5 grid content-center bg-white text-center border-t-8 border-blue-600 rounded transition ease-in-out delay-150 hover:shadow-xl duration-300" key={`${index}`}>
        <img className="pb-4 mx-auto size-32 2xl:size-40" src={milkyWay} alt="Milky Way" />
        <p className="pb-2 text-xs lg:text-sm 2xl:text-base font-bold text-gray-400">{dt.id}</p>
        <p className="text-xl lg:text-2xl font-bold text-gray-900">{dt.product}</p>
        <div className="grid grid-cols-2 relative top-8 lg:top-10">
          <p className="text-sm lg:text-base 2xl:text-lg text-gray-600">{dt.brand}</p>
          <p className="text-base lg:text-lg 2xl:text-lg text-blue-600">₽{dt.price}</p>
        </div>
        <br />
      </div>
    )
  })

  if (data.length === 0) {
    htmlData = (
      <div className="w-full h-96 p-5 grid content-center bg-white text-center border-t-8 border-blue-600 rounded transition ease-in-out delay-150 hover:shadow-xl duration-300">
        <p className="text-xl lg:text-2xl font-bold text-gray-900">Чистенько и Гладенько, Пустенько и Ладьненько!</p>
      </div>
    )
  }

  return (
    <>
      {ShopPagination(url, dataLength)}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 xl:gap-4 2xl:gap-5 justify-center items-center">
      {htmlData}
      </div>
      {ShopPagination(url, dataLength)}
    </>
  )
}

function ShopPagination(url, productsLength) {
  const _params = new URLSearchParams(url.split(import.meta.env.VITE_SITE_URL + "/shop")[1])
  const _page = _params.get("page")
  const page = _page === null ? 1 : parseInt(_page)

  const absPage = Math.abs(page)
  const nextPage = url.replace(`page=${page.toString()}`, `page=${(absPage + 1).toString()}`)
  const prevPage = url.replace(`page=${page.toString()}`, `page=${(absPage - 1).toString()}`)

  if (productsLength === 0) {  // /shop?page=<number> where PRODUCTS < LIMIT 50 | next
    return (
      <div className="my-5 flex justify-between">
        <button className="p-3 text-sm xl:text-base 2xl:text-lg text-white bg-blue-600 rounded-md opacity-50">Прерыдущий</button>
        <p className="p-3 text-base xl:text-lg 2xl:text-xl text-gray-900">{absPage}</p>
        <button className="p-3 text-sm xl:text-base 2xl:text-lg text-white bg-blue-600 rounded-md opacity-50">Следующий</button>
      </div>
    )
  }
  else if (absPage === 1) {  // /shop?page=1 | previous
    return (
      <div className="my-5 flex justify-between">
        <button className="p-3 text-sm xl:text-base 2xl:text-lg text-white bg-blue-600 rounded-md opacity-50">Прерыдущий</button>
        <p className="p-3 text-base xl:text-lg 2xl:text-xl text-gray-900">{absPage}</p>
        <a href={`${nextPage}`}>
          <button className="p-3 text-sm xl:text-base 2xl:text-lg text-white bg-blue-600 rounded-md focus:outline-none transition ease-in-out delay-150 hover:bg-purple-700 duration-300">Следующий</button>
        </a>
      </div>
    )
  } else if (productsLength < 50) {  // /shop?page=<number> where PRODUCTS < LIMIT 50 | next
    return (
      <div className="my-5 flex justify-between">
        <a href={`${prevPage}`}>
          <button className="p-3 text-sm xl:text-base 2xl:text-lg text-white bg-blue-600 rounded-md focus:outline-none transition ease-in-out delay-150 hover:bg-purple-700 duration-300">Предыдущий</button>
        </a>
        <p className="p-3 text-base xl:text-lg 2xl:text-xl text-gray-900">{absPage}</p>
        <button className="p-3 text-sm xl:text-base 2xl:text-lg text-white bg-blue-600 rounded-md opacity-50">Следующий</button>
      </div>
    )
  }

  return (
    <div className="my-5 flex justify-between">
      <a href={`${prevPage}`}>
        <button className="p-3 text-sm xl:text-base 2xl:text-lg text-white bg-blue-600 rounded-md focus:outline-none transition ease-in-out delay-150 hover:bg-purple-700 duration-300">Предыдущий</button>
      </a>
      <p className="p-3 text-base xl:text-lg 2xl:text-xl text-gray-900">{absPage}</p>
      <a href={`${nextPage}`}>
        <button className="p-3 text-sm xl:text-base 2xl:text-lg text-white bg-blue-600 rounded-md focus:outline-none transition ease-in-out delay-150 hover:bg-purple-700 duration-300">Следующий</button>
      </a>
    </div>
  )
}

export default ShopData
