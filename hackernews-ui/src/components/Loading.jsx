import React from 'react';
import loadingImg from '../assets/img/loading.gif';

export default function Loading() {
  return (
    <div className='inner-loader'>
      <img src={loadingImg} alt='loading' />
    </div>
  );
}
