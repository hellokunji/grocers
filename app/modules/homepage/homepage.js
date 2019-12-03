import React from 'react';
import {connect} from 'react-redux';
import {isDataValid} from '../../utils/helpers';
import {getProductStart} from '../../store/actions/product';
import Header from '../common/header/header';
import Button from '../common/button/button';
import Card from './card';
import EmptyState from '../common/empty_state/empty_state';
import AddItem from './add_item';
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
    const {products} = this.props;
    if (products.apiStatus !== 'success' && products.apiStatus !== 'started') {
      this.props.getProductStart();
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
    for (let iter = 0; iter < activeProducts.length; iter++) {
      const item = activeProducts[iter];
      totalItems += item.quantity;
      const obj = getProductById(products.data, item.id);
      if (obj !== null) totalPrice += obj.price * item.quantity;
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
    const {activeProducts, products} = this.props;
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
        {this.renderCount()}
        <div className="items">
          <div className="cmn_container">
            {products.data !== null && (
              <React.Fragment>
                {activeProducts.map((item, index) => {
                  let obj = getProductById(products.data, item.id);
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
                {activeProducts.length === 0 && (
                  <div className="empty">
                    <EmptyState label={'No items in the list'}/>
                    <button onClick={this.toggleAddPopup}>Add an Item</button>
                  </div>
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
  };
};

export default connect(mapStateToProps, {getProductStart})(Home);
