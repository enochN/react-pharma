import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import './tailwind.css';
import {connect} from "react-redux";

function App({products, seed}) {

  useEffect(() => {
    async function fetchData(){
      let response = await axios.get('http://www.mocky.io/v2/5c3e15e63500006e003e9795');
      console.log(response.data);
      const { data: {products}} = response;

      seed(products);
    }

    fetchData();
  },[]);

  console.log(products);

  return (
    <div className="w-full h-screen bg-gray-100 p-10 container mx-auto">
      {
        products.map(product => <div key={product.id}>
          <p className="text-lg text-gray-900 font-semibold tracking-wider">{product.name}</p>
        </div>)
      }
    </div>
  );
}

const mapStateToProps = (state) => ({products: state.products.products});

const mapDispatchToProps = (dispatch) => ({seed: (data) => dispatch({type:"INIT", data})});

export default connect(mapStateToProps, mapDispatchToProps)(App);
