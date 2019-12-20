import React, {useEffect} from 'react';
import axios from 'axios';
import './App.css';
import './tailwind.css';
import {connect} from "react-redux";
import NewProductForm from "./NewProductForm";
import * as PropTypes from "prop-types";


function ProductCard(props) {
    return <div className="bg-gray-100 shadow hover:shadow-md  mb-4 p-4">
        <p className="text-lg text-gray-900 font-semibold tracking-wider mb-6">{props.product.name}</p>
        <ul>
            {props.product.prices.map(props.renderPrice)}
        </ul>
    </div>;
}

ProductCard.propTypes = {
    product: PropTypes.any,
    renderPrice: PropTypes.func
};

function ProductPrice(props) {
    return <li className="inline-flex px-10 align-middle justify-between w-full">
        <p> GHS {props.price.price}</p>
        <p>{new Date(props.price.date).toLocaleString()}</p>
    </li>;
}

ProductPrice.propTypes = {price: PropTypes.any};

function App({products, seed}) {

    useEffect(() => {
        async function fetchData(){
            let response = await axios.get('https://www.mocky.io/v2/5c3e15e63500006e003e9795');
            console.log(response.data);
            const { data: {products}} = response;

            seed(products);
        }

        fetchData();
    },[seed]);

    console.log(products);

    return (
        <div className="w-full h-screen bg-white py-10 px-2 container mx-auto">

            <NewProductForm />

            {
                products.map(product => <ProductCard key={product.id} product={product} renderPrice={price => (
                    <ProductPrice key={price.id} price={price}/>
                )}/>)
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    console.log(state.products);
    return {products: state.products.products.map(prod => {
            prod["prices"] = state.products.prices.filter(price => price.productId === prod.id);
            return prod;
        })}
};

const mapDispatchToProps = (dispatch) => ({seed: (data) => dispatch({type:"INIT", data})});

export default connect(mapStateToProps, mapDispatchToProps)(App);
