import React from 'react';

// ใส่ตัว props
const Footer = (props) => {
  // นำ props มา กระจายออก
  const { company, email } = props;
  return (
    // ดึง props มาใช้งาน
    <div className="container-fluid">
      <hr />
      <div className="text-center title text-uppercase">
        <small>
          <span className="text-danger">Powered By {company}</span> | <span className="text-muted">Contact By Email : {email}</span>
        </small>
      </div>
    </div>
  )
}

export default Footer;