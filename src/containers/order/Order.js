import React, { Component } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = { orders: null };
    }
    
    // โหลดข้อมูล มาจาก API
    componentDidMount() {
        axios.get("http://localhost:3001/orders").then(
            res => {
                // แสดงข้อมูลที่ หน้าจอ
                this.setState({ orders: res.data });
            }
        )
    }
    // ลบ ข้อมูล
    delOrder(order) {
        // ไปที่หน้าเดิม ป้อน id ที่จะลบไปให้
        axios.delete("http://localhost:3001/orders/" + order.id).then(res => {
            axios.get("http://localhost:3001/orders").then(res => {
                    // แสดงข้อมูลใหม่
                    this.setState({ orders: res.data });
                }
            )
        })
    }
    //  method แสดงสินค้า
    showOrders() {
        // เช็คก่อนว่ามี ข้อมูลหรือไม่ แล้วนำไป map เพื่อจัดรูปแบบข้อมูล
        return this.state.orders && this.state.orders.map(order => {
            // สร้างตัวแปล date เพื่อแปลงค่า วันที่ใน orderedDate ที่เราเก็บไว้
            const date = new Date(order.orderedDate);
            return (
                <div key={order.id} className="col-md-3">
                    <hr />
                    <p className="text-right">
                        {/* ปุ่ม เรียก function ลบ ข้อมูล โดยส่ง order เข้าไปให้ */}
                        <button className="btn btn-danger btn-sm title" onClick={() => this.delOrder(order)}>x</button>
                    </p>
                    {/* แสดงวันที่เป็น String เรียก function ให้ทำงาน ต้องมี () */}
                    <h5>วันที่ {date.toLocaleDateString()} {date.toLocaleTimeString()}</h5>
                    <ul>
                        {/* ใช้ .map เพื่อ return รูปแบบ JSX ไปแสดง */}
                        {order.orders && order.orders.map(record => {
                            return (
                                <li key={record.product.id}>
                                    {record.product.productName} x {record.quantity} = {record.product.unitPrice * record.quantity}
                                </li>
                            )
                        })}
                    </ul>
                    {/* สรุปยอดรวม */}
                    <p className="title">ยอดรวม {order.totalPrice}</p>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <h1>รายการสั่งซื้อ</h1>
                    <div className="row">
                        {/* เรียก function มาแสดงสินค้า */}
                        {this.showOrders()}
                    </div>
                </div>
                <Footer company="BankDev" email="bankdev@mail.com" />
            </div>
        )
    }
}

export default Order