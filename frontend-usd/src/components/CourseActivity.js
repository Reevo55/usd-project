import React from "react";
import propTypes from "prop-types";
import { Comment, Avatar } from "antd";

const CourseActivity = ({ comments }) =>
  comments.length ? (
    comments.map(({ account, content, when }) => (
      <Comment
        author={account.user.username}
        avatar={<Avatar src={account.image_url} alt={account.user.username} />}
        content={content}
        datetime={when}
      />
    ))
  ) : (
    <p>Brak aktywności</p>
  );

CourseActivity.propTypes = {
  comments: propTypes.arrayOf(
    propTypes.shape({
      account: propTypes.shape({
        user: propTypes.shape({
          username: propTypes.string,
        }),
        image_url: propTypes.string,
      }),
      content: propTypes.string,
      when: propTypes.string,
    })
  ),
};

CourseActivity.defaultProps = {
  comments: [],
};

export default CourseActivity;
