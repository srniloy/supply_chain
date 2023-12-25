'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Encryption from './Encryption';
import Decrypt from './Decrypt';

export default function Home() {
  const key = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'
  // const key = '0123456789abcdef0123456789abcdef'
  const [orderInfoSupplier, setOrderInfoSupplier] = useState()

  const [transmissionData, setTransmissionData] = useState(undefined)


  const sendOrderDetails = (formData) => {
    const orderInfoCustomer = {
      order_id: formData.get('order_id'),
      product_code: formData.get('product_code'),
      quantity: formData.get('quantity'),
      price: formData.get('price'),
      payment_id: formData.get('payment_id'),
      customer_id: formData.get('customer_id'),
      shipping_address: formData.get('shipping_address'),
    }

    const tData = Encryption(JSON.stringify(orderInfoCustomer), key)
    console.log('Actual Data: \n')
    console.log(orderInfoCustomer)


    console.log('\n\nSend The Encrypted Data From Customer: \n')
    console.log(tData)
    setTransmissionData(tData)
  }

  useEffect(() => {
    if (transmissionData) {

      console.log('\n\nReceived The Encrypted Data From Customer in Supplier/Admin Side: \n')
      console.log(transmissionData)

      const decryptData = Decrypt(transmissionData, key)

      if (decryptData.status == 'success') {
        setOrderInfoSupplier(JSON.parse(decryptData.data))
        console.log('\n\nDecrypted Data in Supplier/Admin Side: \n')
        console.log(JSON.parse(decryptData.data))

      } else {
        console.log(decryptData.msg)
      }
    }
  }, [transmissionData]);

  return (
    <main style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', gap: '100px',
      height: '100%', marginTop: '30px'
    }}>
      <div>
        <h3 style={{ width: '300px' }}>From Client/Customer</h3>
        <form action={sendOrderDetails}>
          <div className="mb-2">
            <label for="exampleInputEmail1" className="form-label">Order Id</label>
            <input type="text" className="form-control" id="exampleInputEmail1" name='order_id' />
          </div>
          <div className="mb-2">
            <label for="exampleInputEmail1" className="form-label">Product Code</label>
            <input type="text" className="form-control" id="exampleInputEmail1" name='product_code' />
          </div>
          <div className="mb-2">
            <label for="exampleInputEmail1" className="form-label">Quantity</label>
            <input type="number" className="form-control" id="exampleInputEmail1" name='quantity' />
          </div>
          <div className="mb-2">
            <label for="exampleInputEmail1" className="form-label">Price</label>
            <input type="number" className="form-control" id="exampleInputEmail1" name='price' />
          </div>
          <div className="mb-2">
            <label for="exampleInputEmail1" className="form-label">Payment Id</label>
            <input type="text" className="form-control" id="exampleInputEmail1" name='payment_id' />
          </div>
          <div className="mb-2">
            <label for="exampleInputEmail1" className="form-label">Customer Id</label>
            <input type="text" className="form-control" id="exampleInputEmail1" name='customer_id' />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Shipping Address</label>
            <input type="text" className="form-control" id="exampleInputEmail1" name='shipping_address' />
          </div>


          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

      <Image src='/right-arrow.png' width='64' height='64' />

      <div>
        <h3 style={{ width: '300px' }}>To Supplier/Admin</h3>
        <form>
          <div className="mb-2">
            <label for="exampleInputEmail1" className="form-label">Order Id</label>
            <input type="text" className="form-control" id="exampleInputEmail1" name='order_id'
              value={orderInfoSupplier?.order_id}
            />
          </div>
          <div className="mb-2">
            <label for="exampleInputEmail1" className="form-label">Product Code</label>
            <input type="text" className="form-control" id="exampleInputEmail1" name='product_code'
              value={orderInfoSupplier?.product_code}
            />
          </div>
          <div className="mb-2">
            <label for="exampleInputEmail1" className="form-label">Quantity</label>
            <input type="number" className="form-control" id="exampleInputEmail1" name='quantity'
              value={orderInfoSupplier?.quantity}
            />
          </div>
          <div className="mb-2">
            <label for="exampleInputEmail1" className="form-label">Price</label>
            <input type="number" className="form-control" id="exampleInputEmail1" name='price'
              value={orderInfoSupplier?.price}
            />
          </div>
          <div className="mb-2">
            <label for="exampleInputEmail1" className="form-label">Payment Id</label>
            <input type="text" className="form-control" id="exampleInputEmail1" name='payment_id'
              value={orderInfoSupplier?.payment_id}
            />
          </div>
          <div className="mb-2">
            <label for="exampleInputEmail1" className="form-label">Customer Id</label>
            <input type="text" className="form-control" id="exampleInputEmail1" name='customer_id'
              value={orderInfoSupplier?.customer_id}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Shipping Address</label>
            <input type="text" className="form-control" id="exampleInputEmail1" name='shipping_address'
              value={orderInfoSupplier?.shipping_address}
            />
          </div>


        </form>
      </div>
    </main>
  )
}
