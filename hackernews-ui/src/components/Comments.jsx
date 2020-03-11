import React, { PureComponent } from 'react';

import Loading from './Loading';
import { BASE_API_URL } from '../helpers/constants';

class Comments extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      topComment: [],
    };
  }

  async componentDidMount() {
    let { comment, id } = this.props;
    this.setState({ isLoading: true });
    if (comment) {
      this.setState({
        topComment: comment,
        isLoading: false,
      });
    }

    if (id) {
      const res = await fetch(`${BASE_API_URL}/item/${id}.json`);
      const data = await res.json();
      this.setState({
        topComment: [data],
        isLoading: false,
      });
    }
  }

  renderComment(cmt) {
    return (
      <div className='comment' key={cmt.id}>
        <div className='comment-body'>
          <div className='comment-by'>{cmt.by}</div>
          <div
            className='commentText'
            dangerouslySetInnerHTML={{
              __html: cmt ? cmt.text : 'No comment',
            }}
          />
        </div>
        {cmt && cmt.kids && (
          <div className='inner-comment'>
            {cmt.kids.map(kidId => {
              return <Comments key={kidId} id={kidId} />;
            })}
          </div>
        )}
      </div>
    );
  }

  render() {
    let { topComment, isLoading } = this.state;
    return (
      <>
        {isLoading && <Loading />}
        {topComment && topComment.map(cmt => this.renderComment(cmt))}
      </>
    );
  }
}

export default Comments;
