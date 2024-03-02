import { Component } from "react";

function ShopFilterProduct() {
  return (
    <>
      <p className="p-3 text-lg lg:text-xl font-bold text-center text-gray-900">Названия</p>
    </>
  )
}

class ShopFilterPrice extends Component {
  constructor(props) {
      super(props)

      const min = props.price[0]
      const max = props.price[props.price.length - 1]

      this.state = { value: min, min: min, max: max }
      this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const input = event.target
    const percentage = ((input.value - this.state.min) / (this.state.max - this.state.min)) * 100
    input.style.background = `linear-gradient(to right, rgb(37 99 235) 0%, rgb(37 99 235) ${percentage}%, rgb(191 219 254) ${percentage}%, rgb(191 219 254) 100%)`
    this.setState({ value: input.value, min: this.state.min, max: this.state.max })
  }

  render () {
    return (
      <div className="mb-4 p-3 lg:p-4 grid grid-cols-3 lg:grid-cols-1 gap-1 bg-white rounded-md">
        <div className="lg:pb-2 flex items-center space-x-3 text-base xl:text-lg 2xl:text-xl font-bold text-center">
          <p className="text-blue-600">₽</p>
          <label htmlFor="shop-price" className="!ml-2 text-gray-900">Цены</label>
        </div>
        <div className="grid col-span-2 grid-cols-2 lg:grid-cols-3 gap-1 items-center justify-items-center">
          <input className="lg:col-span-2" type="range" id="shop-price" name="shop-price" min={`${this.state.min}`} max={`${this.state.max}`} step="1" onChange={this.handleChange.bind(this)} />
          <p className="text-base xl:text-lg 2xl:text-xl text-gray-900">{this.state.value}</p>
        </div>
      </div>
    )
  }
}

class ShopFilterBrand extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className="bg-white rounded-md">
        <details className="rounded-md" open>
          <summary className="p-3 lg:p-4 list-item space-x-3 text-base xl:text-lg 2xl:text-xl font-bold text-left text-white bg-blue-600 rounded-md">Бренды</summary>
          <div className="h-52 p-3 lg:p-4 overflow-scroll">
            {
              this.props.brands.map((brand, index) => {
                return (
                  <div className="py-2 flex items-center border-b border-gray-300 border-dashed" key={`${index}`}>
                    <input className="mr-2 mb-1 size-5 appearance-none border border-gray-600 rounded-full before:content[''] before:size-4 before:mt-px before:ml-px before:block before:rounded-full before:bg-white checked:before:border-blue-600 checked:before:bg-blue-600" type="radio" id={`${brand}`} name="shop-brand" value={`${brand}`} />
                    <label className="text-base xl:text-lg 2xl:text-xl text-gray-900" htmlFor={`${brand}`}>{brand}</label>
                  </div>
                )
              })
            }
          </div>
        </details>
      </div>
    )
  }
}

export { ShopFilterProduct, ShopFilterPrice, ShopFilterBrand }
