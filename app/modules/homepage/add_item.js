import React from 'react';
import {connect} from 'react-redux';
import Fuse from 'fuse.js';
import {getProductStart} from '../../store/actions/product';
import Card from './card';
import './add_item.scss';
import EmptyState from "../common/empty_state/empty_state";

class AddItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.products.data,
    };
  }

  componentDidMount() {
    const {products} = this.props;
    if (products.apiStatus !== 'success' && products.apiStatus !== 'started') {
      this.props.getProductStart();
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
    const {activeProducts, products} = this.props;
    const {data} = this.state;
    return (
      <div className="add_item">
        <div className="box">
          <div className="head">
            <div className="title">
              Add Item
            </div>
            <div className="search">
              <input placeholder="Search..." onChange={e => this.onChangeInput(e.target.value)}/>
              <img src="/img/magnifier.png" alt="search icon"/>
            </div>
            <button className="done" onClick={this.props.onClose}>Done</button>
          </div>
          <div className="body">
            {data !== null && (
              <React.Fragment>
                {data.map((item, index) => {
                  let product = Object.assign({}, item);
                  const productIndex = activeProducts.findIndex(edge => edge.id === item.id);
                  if (productIndex !== -1) {
                    product.quantity = activeProducts[productIndex].quantity;
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
  };
};

export default connect(mapStateToProps, {getProductStart})(AddItem);
