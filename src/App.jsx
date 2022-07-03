import React, { useEffect, useState } from 'react';
import Sha1 from 'js-sha1';

import './App.css';

const PUBLIC_KEY = '38cd79b5f2b2486d86f562e3c43034f8';
const PRIVATE_KEY = '8e49ff607b1f46e1a5e8f6ad5d312a80';

function App() {
    const [orders, setOrders] = useState([]);
    const getPassword = password => Sha1.create().update(password).hex();

    // получаем данные только при первом рендере
    useEffect(() => {

        fetch('/oauth/requesttoken', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })

            .then(response => response.json())
            .then(resp => fetch(`/oauth/accesstoken?oauth_token=${resp.RequestToken}&username=${PUBLIC_KEY}&password=${getPassword(resp.RequestToken + PRIVATE_KEY)}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }))

            .then(response => response.json())
            .then(resp =>  fetch(`/orders?oauth_token=${resp.AccessToken}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }))

            .then(response => response.json())
            .then(resp => setOrders(resp.Result))
    }, []) // useEffect({...}, [])

    return (
        <div className="App">
            {orders.map(order =>
                <div key={order.Id} className="order">
                    <div><strong>Детали: </strong>{order.Title}</div>
                    <div><strong>Статус: </strong>{order.Status}</div>
                    <div><strong>Город: </strong>{order.DeliveryAddress.City}</div>
                    <div><strong>ФИО заказчика: </strong>{order.DeliveryAddress.FullName}</div>
                </div>
            )}
        </div>
    );
}

export default App;