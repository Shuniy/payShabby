import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import "./App.css";

import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import HomeScreen from "./views/HomeScreen";
import ProductScreen from "./views/ProductScreen";
import CartScreen from "./views/CartScreen";
import LoginScreen from "./views/LoginScreen";
import RegisterScreen from "./views/RegisterScreen";
import ProfileScreen from "./views/ProfileScreen";
import ShippingScreen from "./views/ShippingScreen";
import PaymentScreen from "./views/PaymentScreen";
import PlaceOrderScreen from "./views/PlaceOrderScreen";
import OrderScreen from "./views/OrderScreen";
import UserListScreen from "./views/UserListScreen";
import UserEditScreen from "./views/UserEditScreen";
import ProductListScreen from "./views/ProductListScreen";
import OrderListScreen from "./views/OrderListScreen";
import ProductEditScreen from "./views/ProductEditScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <AppHeader />
        <main>
          <Container>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/order/:id?" component={OrderScreen} />
            <Route path="/admin/userlist/" component={UserListScreen} />
            <Route path="/admin/orderlist/" component={OrderListScreen} />
            <Route path="/admin/user/:id?/edit" component={UserEditScreen} />
            <Route
              path="/admin/product/:id?/edit"
              component={ProductEditScreen}
            />
            <Route path="/admin/productlist/" component={ProductListScreen} />
          </Container>
        </main>
        <AppFooter />
      </Router>
    </div>
  );
}

export default App;
