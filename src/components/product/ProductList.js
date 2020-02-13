import React, { Component } from 'react'
import ProductItem from './ProductItem'
// ส่ง component ไปให้ Monitor ใช้งาน
class ProductList extends Component {
    // return ชื่อสินค้า กับ ราคา ไปให้ ProductItem
    showProducts() {
        return this.props.products && this.props.products.map(product => (
            // <ProductItem productName={product.productName} unitPrice={product.unitPrice} /> แบบยาว
            <ProductItem key={product.id} product={product} onAddOrder={this.props.onAddOrder} onDelProduct={this.props.onDelProduct} onEditProduct={this.props.onEditProduct} />
            //ส่ง props ไปให้ ProductItem
        ))
    }

    render() {
        return (
            <div className="row">
                {/* เรียก Function ให้ทำงาน */}
                {this.showProducts()}
            </div>
        )
    }
}

export default ProductList
