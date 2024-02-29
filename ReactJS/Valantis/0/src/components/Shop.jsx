import getShopData from "../api/shop/shop"

function Shop() {
  getShopData()

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </>
  )
}

export default Shop
