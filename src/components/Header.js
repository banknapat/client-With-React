import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        // เซ็ตเวลาใน state
        this.state = { date: new Date() };
    }
    // เรียกใช้เวลาปัจจุน ให้เปลี่ยนทุกๆ 1 วินาที
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }
    // ลบเวลาออก
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    // เซ็ตเวลาใน state
    tick() {
        this.setState({ date: new Date() });
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 text-left">
                        {/* logo */}
                        <h1 className="text-success"><img style={{ height: 70 }} src="/images/logo/logo.png" alt="เฮลตี้ คาเฟ่" /> เฮลตี้ คาเฟ่</h1>
                    </div>
                    <div className="col-md-4 text-right">
                        {/* แสดงเวลา ปัจจุบัน */}
                        <h5 className="text-muted mt-4">{this.state.date.toLocaleTimeString()}</h5>
                        <ul className="list-inline">
                            <li className="list-inline-item"><Link className="text-success" to="/">หน้าแรก</Link></li>
                            <li className="list-inline-item">|</li>
                            <li className="list-inline-item"><Link className="text-success" to="/orders">รายการสั่งซื้อ</Link></li>
                            <li className="list-inline-item">|</li>
                            <li className="list-inline-item"><Link className="text-success" to="/products">สินค้า</Link></li>
                            <li className="list-inline-item">|</li>
                            <li className="list-inline-item"><Link className="text-success" to="/about">เกี่ยวกับเรา</Link></li>
                        </ul>
                    </div>
                </div>
                <hr />
            </div>
        )
    }
}

export default Header;
