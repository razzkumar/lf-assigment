import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { HEADER_INFO } from '../actions/constants';
import brandImg from '../assets/img/logo.png';
class Header extends Component {
  handlePaginate(type) {
    let { currentPage, totalPage } = this.props.data;

    let newPage = parseInt(currentPage);

    if (type === 'Next' && newPage < totalPage) {
      newPage++;
    } else if (type === 'Prev' && newPage > 1) {
      newPage--;
    }

    this.props.history.push(`/page#${newPage}`);
    let data = {
      ...this.props.data,
      currentPage: newPage,
    };
    this.props.changePage(data);
  }

  render() {
    let { currentPage, totalPage } = this.props.data;
    return (
      <div className='header'>
        <div className='container clearfix'>
          <div className='left'>
            <NavLink to='/page#1'>
              <img src={brandImg} className='brand' alt='hacker new brand' />
              <span>Top Stories</span>
            </NavLink>
          </div>
          {totalPage && (
            <div className='right'>
              <i
                className='fa fa-angle-left'
                onClick={() => this.handlePaginate('Prev')}
              />
              <span>{currentPage}/</span>
              <span>{totalPage}</span>
              <i
                className='fa fa-angle-right'
                onClick={() => this.handlePaginate('Next')}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.headerData,
});

const mapDispatchToProps = dispatch => ({
  changePage: data =>
    dispatch({
      type: HEADER_INFO,
      payload: data,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Header));
