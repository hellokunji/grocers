import React from 'react';
import {connect} from 'react-redux';
import {isDataValid} from '../../utils/helpers';
import {getProductStart, getActiveProductStart} from '../../store/actions/product';
import Header from '../common/header/header';
import Button from '../common/button/button';
import Card from './card';
import EmptyState from '../common/empty_state/empty_state';
import AddItem from './add_item';
import InlinePageLoader from '../common/loader/inline_loader';
import './homepage.scss';

function getProductById(products, id) {
  let product = null;
  if (isDataValid(products)) {
    const index = products.findIndex(item => item.id === id);
    if (index !== -1) product = products[index];
  }
  return product;
}

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showAddPopup: false,
      showHeader: true,
    };
  }

  componentDidMount() {
    const {products, activeProducts} = this.props;
    if (products.apiStatus !== 'success' && products.apiStatus !== 'started') {
      this.props.getProductStart();
    }
    if (activeProducts.apiStatus !== 'success' && activeProducts.apiStatus !== 'started') {
      this.props.getActiveProductStart();
    }
  }

  toggleAddPopup = () => {
    this.setState({showAddPopup: !this.state.showAddPopup});
  };

  toggleHeader = () => {
    this.setState({showHeader: !this.state.showHeader});
  };

  renderCount() {
    let totalItems = 0;
    let totalPrice = 0;
    const {activeProducts, products} = this.props;
    if (activeProducts.data !== null && products.data !== null) {
      for (let iter = 0; iter < activeProducts.data.length; iter++) {
        const item = activeProducts.data[iter];
        totalItems += item.quantity;
        const obj = getProductById(products.data, item.product_id);
        if (obj !== null) totalPrice += obj.price * item.quantity;
      }
    }
    return (
      <div className="count">
        <div className="cmn_container">
          <div className="left">
            <span className="light">Total Items: </span>
            <span className="bold">{totalItems}</span>
          </div>
          <div className="right">
            <span className="light">Total Price: </span>
            <span className="bold">{`$${totalPrice}`}</span>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {activeProducts, products, addProduct, updateProduct, deleteProduct} = this.props;
    const {showAddPopup, showHeader} = this.state;
    return (
      <div className="homepage">
        {showHeader && <Header/>}
        <div className="title">
          <div className="cmn_container">
            <div className="tag">
              <button onClick={this.toggleHeader}>
                <img src={`/img/${showHeader ? 'up-chevron.png' : 'down-chevron.png'}`} alt="icon"/>
              </button>
              <span>My Grocery List</span>
            </div>
            <div className="add">
              <Button
                onClick={this.toggleAddPopup}
                isDisabled={false}
                showLoading={false}
                size={'m'}
                width={'100px'}
                label="Add"
              />
            </div>
          </div>
        </div>
        {(addProduct.apiStatus === 'started' || updateProduct.apiStatus === 'started' ||
          deleteProduct.apiStatus === 'started') && (
          <div className="loading">
            <img className='loading_icon' src='../../../../../img/loading.svg' alt="loading"/>
          </div>
        )}
        {this.renderCount()}
        <div className="items">
          <div className="cmn_container">
            {(products.apiStatus === 'started' || activeProducts.apiStatus === 'started') ? (
              <InlinePageLoader/>
            ) : (
              <React.Fragment>
                {(products.data !== null && activeProducts.data !== null) && (
                  <React.Fragment>
                    {activeProducts.data.map((item, index) => {
                      let obj = getProductById(products.data, item.product_id);
                      if (obj !== null) {
                        let product = Object.assign({}, obj);
                        product.quantity = item.quantity;
                        return (
                          <div key={`current-item-${product.id}`} className="item">
                            <Card data={product} type=""/>
                          </div>
                        )
                      }
                    })}
                    {activeProducts.data.length === 0 && (
                      <div className="empty">
                        <EmptyState label={'No items in the list'}/>
                        <button onClick={this.toggleAddPopup}>Add an Item</button>
                      </div>
                    )}
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
        {showAddPopup && <AddItem onClose={this.toggleAddPopup}/>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.products,
    activeProducts: state.product.activeProducts,
    addProduct: state.product.addProduct,
    deleteProduct: state.product.deleteProduct,
    updateProduct: state.product.updateProduct,
  };
};

export default connect(mapStateToProps, {getProductStart, getActiveProductStart})(Home);
