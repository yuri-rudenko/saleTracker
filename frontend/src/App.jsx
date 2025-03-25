import './styles/style.css';
import './styles/header.css';
import './styles/menu.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Menu from './Components/Menu';
import Dashboard from './Pages/Dashboard/Dashboard';
import Orders from './Pages/Orders/Orders';
import Items from './Pages/Items/Items';
import Stats from './Pages/Stats/Stats';
import Buy from './Pages/Buy/Buy';
import { useEffect } from 'react';
import { fetchProductsAsync } from './Store/product/product.slice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuysAsync } from './Store/buys/buys.slice';
import { fetchBrandsAsync } from './Store/typeBrand/brand.slice';
import { fetchTypesAsync } from './Store/typeBrand/type.slice';
import { fetchSalesAsync } from './Store/sales/sales.slice';
import { getCourseAsync, setLoading } from './Store/global/global.slice';
import { checkAsync } from './Store/user/user.slice';
import Product from './Pages/Product/Product';

export const loadData = async (dispatch) => {
  dispatch(setLoading(true));
  await dispatch(fetchProductsAsync());
  await dispatch(fetchBuysAsync());
  await dispatch(fetchBrandsAsync());
  await dispatch(fetchTypesAsync());
  await dispatch(fetchSalesAsync());
  await dispatch(getCourseAsync());
  await dispatch(checkAsync());
  dispatch(setLoading(false));
};

function App() {

  const loading = useSelector(state => state.global.loading);
  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {

    loadData(dispatch);

  }, [dispatch, isAuth]);

  
  if (loading) return <div className="loader"></div>

  return (
    <Router basename="/">
      <div className="App">

        <div className="wrapper">

          <div className='menu'>
            <Menu />
          </div>

          <div className='main'>
            <Header />

            <div className="body">
              <Routes>

                <Route path='/' element={
                  <Dashboard />
                } />

                <Route path='/orders' element={
                  <Orders />
                } />

                <Route path='/items' element={
                  <Items />
                } />

                <Route path='/buy' element={
                  <Buy />
                } />

                <Route path='/stats' element={
                  <Stats />
                } />

                <Route path='/product/:productId' element={
                  <Product />
                } />

              </Routes>
            </div>
          </div>

        </div>

      </div>
    </Router>
  );
}

export default App;
