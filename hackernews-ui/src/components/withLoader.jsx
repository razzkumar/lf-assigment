import React from 'react';
import { connect } from 'react-redux';

import Loading from './Loading';
import { getTopStorieList } from '../actions/topStoriesActions';

export default (App, actionType) => {
  class withLoader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentPage: null,
      };
    }

    componentDidMount() {
      let currentPage = this.props.location.hash;
      currentPage = currentPage.replace('#', '') || 1;

      this.props.fetchDataList({ actionType, currentPage });
      this.setState({ currentPage });
    }

    componentDidUpdate(prevProps) {
      let currentPage = this.props.location.hash;
      currentPage = currentPage.replace('#', '');
      let upCommingPage = prevProps.location.hash;
      upCommingPage = upCommingPage.replace('#', '');

      if (currentPage !== upCommingPage) {
        this.props.fetchDataList({ actionType, currentPage });
        this.setState({ currentPage });
      }
    }

    render() {
      let { list } = this.props;
      let { currentPage } = this.state;
      let page = `page${currentPage}`;
      let data = list && list[page];

      return data && data.length ? (
        <App {...this.props} list={data} />
      ) : (
        <Loading />
      );
    }
  }

  const mapStateToProps = state => ({
    list: state.topStoriesList,
  });

  const mapDispatchToProps = dispatch => ({
    fetchDataList: currentPage => dispatch(getTopStorieList(currentPage)),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withLoader);
};
