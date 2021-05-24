import React from 'react';
import propTypes from 'prop-types';
import { Comment, Avatar } from 'antd';

const CourseActivity = ({ comments }) => (
    comments.length ? (
    comments.map(({ account, content, date }) =>
        <Comment
            author={account.login}
            avatar={<Avatar src={account.avatarPath} alt={account.login} />}
            content={content}
            datetime={date} />
    )
    ) : (
        <p>Brak aktywności</p>
    )
);

CourseActivity.propTypes = {
    comments: propTypes.arrayOf(propTypes.shape({
        account: propTypes.shape({
            login: propTypes.string,
            avatarPath: propTypes.string
        }),
        content: propTypes.string,
        date: propTypes.string
    }))
}

CourseActivity.defaultProps = {
    comments: [],
}

export default CourseActivity;