import React from 'react';
import {connect} from 'react-redux';
import {addProductStart, deleteProductStart} from '../../store/actions/product';
import './card.scss';
import Button from "../common/button/button";

const Card = props => {
  return (
    <div className={props.type === 'small' ? 'card card_small' : 'card'}>
      <div className="image">
        <div style={{backgroundImage: `url(/img/product/${props.data.img})`}}/>
      </div>
      <div className="content">
        <div className="details">
          <div className="name">
            {props.data.name}
          </div>
          <div className="price">
            {`$${props.data.price}`}
          </div>
        </div>
        {props.data.quantity !== 0 ? (
          <div className="action">
            <button onClick={() => props.deleteProductStart({id: props.data.id})}>
              <img src="/img/minus-black.png" alt="minus"/>
            </button>
            <div className="quantity">{props.data.quantity}</div>
            <button onClick={() => props.addProductStart({id: props.data.id})}>
              <img src="/img/plus-black.png" alt="plus"/>
            </button>
          </div>
        ) : (
          <div className="action_add">
            <Button
              onClick={() => props.addProductStart({id: props.data.id})}
              isDisabled={false}
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
};

export default connect(null, {addProductStart, deleteProductStart})(Card);

