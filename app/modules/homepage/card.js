import React from 'react';
import {connect} from 'react-redux';
import {addProductStart, deleteProductStart, updateProductStart} from '../../store/actions/product';
import Button from '../common/button/button';
import './card.scss';

class Card extends React.Component {

  addProduct = obj => {
    const {activeProducts, addProduct, updateProduct, deleteProduct} = this.props;
    if (addProduct.apiStatus !== 'started' && updateProduct.apiStatus !== 'started' &&
      deleteProduct.apiStatus !== 'started') {
      const findIndex = activeProducts.data.findIndex(item => item.product_id === obj.id);
      if (findIndex !== -1) {
        this.props.updateProductStart({
          id: obj.id,
          quantity: activeProducts.data[findIndex].quantity + 1,
        });
      } else {
        this.props.addProductStart({id: obj.id, quantity: 1});
      }
    }
  };

  deleteProduct = obj => {
    const {activeProducts, addProduct, updateProduct, deleteProduct} = this.props;
    if (addProduct.apiStatus !== 'started' && updateProduct.apiStatus !== 'started' &&
      deleteProduct.apiStatus !== 'started') {
      const findIndex = activeProducts.data.findIndex(item => item.product_id === obj.id);
      if (findIndex !== -1) {
        if (activeProducts.data[findIndex].quantity > 1) {
          this.props.updateProductStart({
            id: obj.id,
            quantity: activeProducts.data[findIndex].quantity - 1,
          });
        } else {
          this.props.deleteProductStart(obj);
        }
      }
    }
  };

  render() {
    const {data, type, addProduct, updateProduct, deleteProduct} = this.props;
    const isLoading = (addProduct.apiStatus === 'started' ||
      updateProduct.apiStatus === 'started' ||
      deleteProduct.apiStatus === 'started');
    return (
      <div className={type === 'small' ? 'card card_small' : 'card'}>
        <div className="image">
          <div style={{backgroundImage: `url(/img/product/${data.slug}.png)`}}/>
        </div>
        <div className="content">
          <div className="details">
            <div className="name">
              {data.name}
            </div>
            <div className="price">
              {`$${data.price}`}
            </div>
          </div>
          {data.quantity !== 0 ? (
            <div className="action">
              <React.Fragment>
                <button disabled={isLoading} onClick={() => this.deleteProduct({id: data.id})}>
                  <img src="/img/minus-black.png" alt="minus"/>
                </button>
                <div className="quantity">{data.quantity}</div>
                <button disabled={isLoading} onClick={() => this.addProduct({id: data.id})}>
                  <img src="/img/plus-black.png" alt="plus"/>
                </button>
              </React.Fragment>
            </div>
          ) : (
            <div className="action_add">
              <Button
                onClick={() => this.addProduct({id: data.id})}
                isDisabled={isLoading}
                showLoading={false}
                size={'s'}
                width={'100%'}
                label="Add"
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    activeProducts: state.product.activeProducts,
    addProduct: state.product.addProduct,
    updateProduct: state.product.updateProduct,
    deleteProduct: state.product.deleteProduct,
  };
};

export default connect(mapStateToProps, {addProductStart, deleteProductStart, updateProductStart})(Card);

