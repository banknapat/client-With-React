import React, { Component } from 'react';

// แบบ Class
class ProductItem extends Component {
    // ส่งตัว products ไปแสดงที่ ProductList
    constructor(props) {
        super(props);
    }
    render() {
        const { productName, unitPrice, thumbnail } = this.props.product;
        return (
            <div className="col-md-3 col-sm-6">
                <img className="img-fluid img-thumbnail" src={thumbnail} />
                <h5 className="mt-2">{productName}</h5>
                <p className="title text-right">{unitPrice} THB</p>
                {/* เช็คว่ามี this.props.onAddOrder ถึงจะแสดงปุ่มซื้อ */}
                {this.props.onAddOrder &&
                    <button className="btn btn-block btn-secondary title" onClick={() => this.props.onAddOrder(this.props.product)}>
                        ซื้อ
                </button>
                }
                {/* เช็คว่ามี this.props.onAddOrder || this.props.onEditProduct ถึง แสดง*/}
                {(this.props.onDelProduct || this.props.onEditProduct) &&
                    <button className="btn btn-info col-5 title" onClick={() => this.props.onEditProduct(this.props.product)}>
                        แก้ไข
                </button>}
                {/* เช็คว่ามี this.props.onAddOrder || this.props.onEditProduct ถึง แสดง*/}
                {(this.props.onDelProduct || this.props.onEditProduct) &&
                    <button className="btn btn-danger col-5 float-right title" onClick={() => this.props.onDelProduct(this.props.product)}>
                        ลบ
                </button>
                }
                <hr />
            </div>
        )

    }

}

export default ProductItem;