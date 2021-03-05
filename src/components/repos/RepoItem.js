import React from 'react';
import PropTypes from 'prop-types'


const RepoItem = ({repo}) => {
    return (
        <div className="card">
            <h3 href={repo.html_url}>{repo.name}</h3>
        </div>
    )
}

RepoItem.propTypes = {
    repo: PropTypes.object.isRequired,
}

export default RepoItem
