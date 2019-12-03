import React from 'react';
import './inline_loader.scss';

const InlinePageLoader = () => {
  return (
    <div className='cmn_inline_loader'>
      <div className='container'>
        <img className='loading_icon' src='../../../../img/loading.svg' alt="loader"/>
      </div>
      <span className='_align'/>
    </div>
  )
};

export default InlinePageLoader;
