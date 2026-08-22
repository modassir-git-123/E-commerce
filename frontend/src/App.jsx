// import {useEffect, useState} from "react";

// function App(){
//   const[products, setProducts]=useState([]);

//   useEffect(()=>{
//     fetch('http://127.0.0.1:8000/api/products/')
//     .then((response)=> response.json())
//     .then((data)=> setProducts(data))
//     .catch((error)=> console.log(error))
//   },[]);

//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-800">
//       <h1 className="text-3xl font-bold underline">Product List</h1>
//       <div className="container mx-auto p-4">
//         {products.map(product=>(
//           <div key={product.id}className="bg-white p-4 rounded shadow mb-4">
             
//             <h2 className="text-xl font-semibold"> {product.name}</h2>
//             <p className="text-gray-600">{product.description}</p>
//             <p className="text-gray-800 font-bold">${product.price}</p>

//           </div>
//         ))}

//       </div>

          
//     </div>

//   );
     
// }

// export default App;
// This was wrote when no ProductList created and to show all products used in this

import ProductList from "./pages/ProductList";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PrivateRouter from './components/PrivateRouter';
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App(){
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
         <Route
          path="/cart"
          element={<CartPage />}
        />
        {/* <Route path="/checkout" element={<CheckoutPage/>}/> */}
        <Route element={<PrivateRouter/>}>
             <Route path="/checkout" element={<CheckoutPage/>}/>
        </Route>
        
         <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>

      </Routes>
      
    </Router>
  );
}
export default App;