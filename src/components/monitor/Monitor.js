import React, { Component } from 'react'
import Calculator from './Calculator';
import ProductList from '../product/ProductList';
import axios from 'axios';
// รวม แสดง ProductList(ซ้าย) และ Calculator(ขวา) ในหน้า index
export class Monitor extends Component {
    constructor(props) {
        super(props);
        // สร้าง state เก็บยอดรวมราคา และ รายการที่สั่งซื้อ
        this.state = { totalPrice: 0, orders: [], confirm: false, msg: '' };
        // bind เพื่อให้ this ของ ProductItem รู้จักค่า this ใน  object นั้น
        this.addOrder = this.addOrder.bind(this);
        this.delOrder = this.delOrder.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);
        this.cancelOrder = this.cancelOrder.bind(this);
    }

    // Function กด เพิ่ม สินค้า
    addOrder(product) {
        // ค้นหาว่ามีสินค้าถูกซื้อไปแล้วหรือไม่ โดยเช็คจาก ID ที่กดซื้อ ตรงกับ ID ที่มีอยู่แล้วหรือไม่
        let findOrder = this.state.orders.find(order => order.product.id == product.id);
        if (findOrder) {
            //ถ้ามี ให้เพิ่ม จำนวนไปอีก 1
            findOrder.quantity++;
        } else {
            // ถ้ายังไม่มีสินค้า ให้เพิ่ม(push) product: product, quantity: 1
            this.state.orders.push({ product: product, quantity: 1 });
        }
        // set ยอดรวม เพราะ รายการสินค้าถูกเปลี่ยน
        const totalPrice = this.state.totalPrice + parseInt(product.unitPrice);
        // set state ใหม่
        this.setState({ totalPrice: totalPrice, orders: this.state.orders, confirm: false });
    }

    // Function กด ลบ สินค้า
    delOrder(product) {
        // 1. ค้นหาตัวที่ต้องการลบ
        let findOrder = this.state.orders.find(order => order.product.id == product.id);
        // 2. ค้นหาตัวที่ไม่ต้องการลบ โดย เอาตัวที่ลบมาเทียบ  filter ให้เหลือตัวที่ไม่ถูกลบ
        let resultOrder = this.state.orders.filter(order => order.product.id != product.id)
        // 3. เซ็ตอัพเดทยอดรวมสินค้าใหม่
        const totalPrice = this.state.totalPrice - (findOrder.quantity * parseInt(findOrder.product.unitPrice))
        // 4. เซ็ต totalPrice และ orders ใน state ใหม่
        this.setState({ totalPrice: totalPrice, orders: resultOrder, confirm: false });
    }

    // Function ยกเลิก สินค้า
    confirmOrder() {
        const { totalPrice, orders } = this.state;
        if (orders && orders.length > 0) {
            // กำหนดว่าจะส่งไปที่ไหน    ส่งอะไรไปบ้าง  จะส่ง วันที่ ยอดรวม และรายการสินค้า
            axios.post("http://localhost:3001/orders", { orderedDate: new Date(), totalPrice, orders })
                .then(res => {
                    //เมื่อบันทึกเสร็จ ให้ล้างข้อมูลรายการที่ซื้อทั้งหมด
                    this.setState({ totalPrice: 0, orders: [], confirm: true, msg: 'บันทึกรายการสั่งซื้อเรียกร้อยค่ะ' });
                });
        } else {
            this.setState({ totalPrice: 0, orders: [], confirm: true, msg: 'กรุณาเลือกสินค้าก่อนค่ะ' });
        }
    }


    // Function ยกเลิก สินค้า
    cancelOrder() {
        // set ค่าใน state ให้เป็น 0
        this.setState({ totalPrice: 0, orders: [], confirm: false });
    }


    render() {
        return (
            <div className="container-fluid">
                {this.state.confirm &&
                    <div className="alert alert-secondary title text-right" role="alert" >
                        {this.state.msg}
                    </div>
                }
                <div className="row">
                    <div className="col-md-9">
                        <ProductList products={this.props.products} onAddOrder={this.addOrder} />
                    </div>
                    <div className="col-md-3">
                        <Calculator totalPrice={this.state.totalPrice} orders={this.state.orders} onDelOrder={this.delOrder} onConfrimOrder={this.confirmOrder} onCancelOrder={this.cancelOrder} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Monitor
