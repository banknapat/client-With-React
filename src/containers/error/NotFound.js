import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const NotFound = () => {
    return (
        <div>
            <Header />
            <div className="container col-md-8 text-center">
                <h1 className="mt-5" style={{fontSize: 120}}>404</h1>
                <h2 className="mb-4">Not Found</h2>
                <p className="title mb-5">ขออภัย ไม่พบหน้าที่คุณค้นหาดูเหมือนว่าหน้าเว็บที่คุณพยายามเข้าถึงไม่มีอยู่อีกต่อไปหรืออาจจะย้ายไปยังหน้าเว็บเพจอื่น</p>
            </div>
            <Footer company="BankDev" email="bankdev@mail.com" />
        </div>
    )
}

export default NotFound
