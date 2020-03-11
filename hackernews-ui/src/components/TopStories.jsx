import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import withLoader from './withLoader';
import { TOP_STORIES } from '../helpers/constants';
class TopStories extends Component {
  render() {
    let { list } = this.props;
    return (
      <>
        <ul className='list'>
          {list &&
            list.map(d => (
              <li key={d.id}>
                <Link to={`/story#${d.id}`} state={{ isListPage: true }}>
                  {d.title}
                </Link>
              </li>
            ))}
        </ul>
      </>
    );
  }
}

export default withLoader(withRouter(TopStories), TOP_STORIES);
