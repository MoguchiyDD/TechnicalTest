import { Component } from "react";

function ShopFilterProduct() {
  return (
    <>
      <p className="p-3 text-lg lg:text-xl font-bold text-center text-gray-900">Названия</p>
    </>
  )
}

function ShopFilterBrand() {
  return (
    <>
      <p className="p-3 text-lg lg:text-xl font-bold text-center text-gray-900">Бренды</p>
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
      <div className="p-3 lg:p-4 grid grid-cols-3 lg:grid-cols-1 gap-1 bg-white rounded-md">
        <div className="lg:pb-2 flex items-center space-x-3 text-base xl:text-lg 2xl:text-xl font-bold text-center">
          <p className="text-blue-600">₽</p>
          <label htmlFor="price" className="!ml-2 text-gray-900">Цены</label>
        </div>
        <div className="grid col-span-2 grid-cols-2 lg:grid-cols-3 gap-1 items-center justify-items-center">
          <input className="lg:col-span-2" type="range" id="price" name="price" min={`${this.state.min}`} max={`${this.state.max}`} step="1" onChange={this.handleChange.bind(this)} />
          <p className="text-base xl:text-lg 2xl:text-xl text-gray-900">{this.state.value}</p>
        </div>
      </div>
    )
  }
}

export { ShopFilterProduct, ShopFilterBrand, ShopFilterPrice }
