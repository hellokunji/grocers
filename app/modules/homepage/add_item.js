import React from 'react';
import {connect} from 'react-redux';
import Fuse from 'fuse.js';
import {getProductStart, getActiveProductStart} from '../../store/actions/product';
import Card from './card';
import EmptyState from '../common/empty_state/empty_state';
import InlinePageLoader from '../common/loader/inline_loader';
import './add_item.scss';

class AddItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.products.data,
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.data === null && nextProps.products.data !== null) {
      return {
        data: nextProps.products.data,
      }
    }
    return null;
  }

  onChangeInput = value => {
    const {products} = this.props;
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'name'
      ]
    };
    let data = products.data;
    if (value !== '') {
      const fuse = new Fuse(products.data, options);
      data = fuse.search(value);
    }
    this.setState({data});
  };

  render() {
    const {activeProducts, products, addProduct, updateProduct, deleteProduct} = this.props;
    const {data} = this.state;
    return (
      <div className="add_item">
        <div className="box">
          <div className="head">
            <div className="title">
              Add Item
            </div>
            {(addProduct.apiStatus === 'started' || updateProduct.apiStatus === 'started' ||
              deleteProduct.apiStatus === 'started') && (
              <div className="loading">
                <img className='loading_icon' src='../../../../../img/loading.svg' alt="loading"/>
              </div>
            )}
            <div className="search">
              <input placeholder="Search..." onChange={e => this.onChangeInput(e.target.value)}/>
              <img src="/img/magnifier.png" alt="search icon"/>
            </div>
            <button className="done" onClick={this.props.onClose}>Done</button>
          </div>
          <div className="body">
            {(products.apiStatus === 'started' || activeProducts.apiStatus === 'started') ? (
              <InlinePageLoader/>
            ) : (
              <React.Fragment>
                {(products.data !== null && activeProducts.data !== null) && (
                  <React.Fragment>
                    {data.map((item, index) => {
                      let product = Object.assign({}, item);
                      const productIndex = activeProducts.data.findIndex(edge => edge.product_id === item.id);
                      if (productIndex !== -1) {
                        product.quantity = activeProducts.data[productIndex].quantity;
                      } else {
                        product.quantity = 0;
                      }
                      return (
                        <div key={`current-item-${product.id}`} className="item">
                          <Card data={product} type="small"/>
                        </div>
                      )
                    })}
                    {data.length === 0 && (
                      <div className="empty">
                        <EmptyState label={'No result found'}/>
                      </div>
                    )}
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
        <span className="align"/>
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

export default connect(mapStateToProps, {getProductStart, getActiveProductStart})(AddItem);
