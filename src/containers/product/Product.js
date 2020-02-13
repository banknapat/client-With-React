import React, { Component } from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductList from '../../components/product/ProductList';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
export class Product extends Component {
    constructor(props) {
        super(props);
        this.state = { products: null}
        this.delProduct = this.delProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
    }
    
        // โหลดข้อมูลสินค้า มาจาก API
        componentDidMount() {
            axios.get("http://localhost:3001/products").then(
                res => {
                    // แสดงข้อมูลที่ หน้าจอ
                    this.setState({ products: res.data });
                }
            )
        }
        // ลบ สินค้า
        delProduct(product) {
            // ไปที่สินค้า ป้อน id ที่จะลบไปให้
            axios.delete("http://localhost:3001/products/" + product.id).then(res => {
                axios.get("http://localhost:3001/products").then(res => {
                        // แสดงข้อมูลใหม่อีกครั้ง
                        this.setState({ products: res.data });
                    }
                )
            })
        }

        // แก้ไขสินค้า
       editProduct(product) {
        this.props.history.push('products/edit/' + product.id);
       }
    render() {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6">
                            <h1>สินค้า</h1>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-success title float-right" onClick={() => this.props.history.push('products/add') }>เพิ่ม</button>
                        </div>
                    </div>
                    <ProductList products={this.state.products}
                    onDelProduct={this.delProduct} onEditProduct={this.editProduct}
                    />
                </div>
                <Footer company="BankDev" email="bankdev@mail.com" />
            </div>
        )
    }
}

export default withRouter(Product);
