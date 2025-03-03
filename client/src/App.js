import Home from "./screens/home";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { CartProvider } from "./components/ContextReducer";
import MyOrder from "./screens/MyOrder";


function App() {
  return (
    <>
      <div>
        <CartProvider>
          <Router>
            <div>
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/createuser' element={<Signup />} />
                <Route exact path='/myOrder' element={<MyOrder />} />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </div>
    </>
  );
}

export default App;
