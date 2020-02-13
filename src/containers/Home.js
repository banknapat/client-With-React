import React, { Component } from 'react';
import Header from '../components/Header';
import Monitor from '../components/monitor/Monitor';
import Footer from '../components/Footer';
import axios from 'axios';

class Home extends Component {

    constructor(props) {
        super(props);
        // เซ็ต state ให้เป็นค่าว่าง
        this.state = { products: "" };
    }
    // เรียกใช้ เพื่อโหลดข้อมูล เข้าไปใน component
    componentDidMount() {
        // set ค่ารายการ ใน stste

        /*#### วิธีที่ 1 ####*/
        /* this.setState({products : [
            { id: 1, productName: "สลัดผัก", unitPrice: "120", thumbnail: "/images/product/1.jpg" },
            { id: 2, productName: "ไก่ทอด", unitPrice: "90", thumbnail: "/images/product/2.jpg" },
            { id: 3, productName: "บิงซู", unitPrice: "200", thumbnail: "/images/product/3.jpg" },
            { id: 4, productName: "เฟรนฟราย", unitPrice: "140", thumbnail: "/images/product/4.jpg" },
            { id: 5, productName: "เค้ก 3 ชั้น", unitPrice: "200", thumbnail: "/images/product/5.jpg" },
            { id: 6, productName: "กาแฟ เฮลตี้ฟู้ด", unitPrice: "140", thumbnail: "/images/product/6.jpg" }
             ]})
        */

        /*#### วิธีที่ 2 ####*/
        /*fetch("http://localhost:3001/products", { method: "GET" })
            .then(res => res.json())
            //ได้ค่ามา แล้วนำไปเซ็ตไว้ใน state
            .then(res => { this.setState({ products: res }) })*/

        /*#### วิธีที่ 3 นิยม ####*/
        // ดึงข้อมูลมาจาก url
        axios.get("http://localhost:3001/products").then(res => {
            //ใช้ res.data เพื่อนำค่าไป set ใน state
            { this.setState({ products: res.data }) }
        });

    }
    render() {
        return (
            <div>
                <Header />
                {/* ส่งก้อนข้อมูลสินค้าไปให้ Monitor */}
                <Monitor products={this.state.products} />
                {/*การส่งค่า props ไป */}
                <Footer company="BankDev" email="bankdev@mail.com" />

            </div>
        );
    }
}

export default Home
