import React, {useState} from "react";
import {connect} from "react-redux";


 function NewProductForm({saveProduct}) {
     const [name, setName] = useState("");
     const [price, setPrice] = useState(0);

     const validateThenSave = e => {
         e.preventDefault();
         if(name && price > 0){
             saveProduct(name, price);
             setName("");
             setPrice(0);
             return;
         }
         alert("Invalid data");
     };

    return (<form onSubmit={validateThenSave} className="p-4 bg-gray-100 border-2 rounded mb-6">
        <div className="flex justify-start align-middle mb-4 flex-col">
            <label htmlFor="name" className="w-1/6 mb-2">Name </label>
            <input name="name" value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Type the name"
                   className="p-2 border-blue-200 shadow-outline rounded"/>
        </div>
        <div className="flex justify-start align-middle flex-col">
            <label htmlFor="price" className="w-1/6 mb-2">Price </label>
            <input name="price" value={price} min="0" step=".01" onChange={e => setPrice(e.target.value)} type="number" placeholder="Set the price"
                   className="p-2 border-blue-200 shadow-outline rounded"/>
        </div>
        <button type="submit"
            className="py-2 px-4 mt-6 bg-gray-300 rounded font-semibold tracking-wider hover:bg-gray-400 focus:bg-gray-400">
            Add New Product
        </button>
    </form>);
}

const mapDispatchToProps = dispatch => {

     return {
         saveProduct: (name, price) => dispatch({type: "ADD", name, price})
     };
};

export default  connect(null, mapDispatchToProps)(NewProductForm);