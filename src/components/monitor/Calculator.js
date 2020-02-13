import React, { Component } from 'react'
// ส่ง component ไปให้ monitor ใช้งาน
export class Calculator extends Component {

    showOrders(orders) {
        // เช็คถ้าไม่มี orders และ orders == 0 ให้ บอกว่าไม่มีสินค้าค่ะ
        if (!orders || orders.length == 0) {
            return <il className="text-right text-muted title">ไม่มีสินค้าค่ะ</il>
        } else {
            // เข้าไปที่ array หากมีสินค้า
            return orders.map(order => {
                // return JSX
                return (
                    <li key={order.product.id} className="text-right text-success title">
                        {/* แสดงชื่อสินค้า   x จำนวนที่ซื้อ  = ราคาสินค้า * จำนวนสินค้า */}
                        {order.product.productName} x {order.quantity} = {order.product.unitPrice * order.quantity}
                        <button className="btn btn-light btn-sm" onClick={() => this.props.onDelOrder(order.product)}>X</button>
                    </li>
                )
            })
        }
    }

    render() {
        // ดึง props ที่ Monitor.js ส่งให้มาใช้งาน
        const { totalPrice, orders } = this.props;
        return (
            <div>
                <h1 className="text-right">{totalPrice}</h1>
                <hr />
                <ul className="list-unstyled">
                    {/* เรียกใช้ Function โดยส่ง orders ไปให้ */}
                    {this.showOrders(orders)}
                </ul>
                <hr />
                {/* การเรียกใช้ function มาทำงาน */}
                <button className="btn btn-block btn-danger title" onClick={() => this.props.onConfrimOrder()}>ยืนยัน</button>
                <button className="btn btn-block btn-secondary title" onClick={() => this.props.onCancelOrder()}>ยกเลิก</button>
            </div>
        )
    }
}

export default Calculator
