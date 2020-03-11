import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Comments from './Comments';
import { getStory } from '../actions/topStoriesActions';
import Loading from './Loading';

class Story extends Component {
  componentDidMount() {
    let currentStoryId = this.props.location.hash;
    currentStoryId = currentStoryId.replace('#', '');
    this.props.fetchStory(currentStoryId);
  }

  render() {
    let currentStoryId = this.props.location.hash;
    currentStoryId = currentStoryId.replace('#', '');
    let data = this.props.story[`story-${currentStoryId}`];
    let { currentPage } = this.props;
    currentPage = currentPage ? currentPage : 1;
    return (
      <div className='content container'>
        {data ? (
          <>
            <Link
              to={`/page#${currentPage}`}
              state={{ isDeatail: true }}
              className='back'
            >
              <i className='fa fa-times' />
            </Link>
            <div className='title-wrapper'>
              {data.url ? (
                <div className='title'>
                  <a href={data.url} target='_blank' rel='noopener noreferrer'>
                    <h2>{data.title}</h2>
                  </a>
                </div>
              ) : (
                <div className='title'>
                  <h2>{data.title}</h2>
                </div>
              )}
            </div>
            {data.comments ? (
              <Comments comment={data.comments} />
            ) : (
              <div className='no-comments'>No Comments</div>
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  story: state.story,
  currentPage: state.headerData.currentPage,
});

const mapDispatchToProps = dispatch => ({
  fetchStory: data => dispatch(getStory(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Story));
