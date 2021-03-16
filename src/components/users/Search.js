import React, {
    useState,
    useContext
} from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubcontext';

const Search = ({ clearUsers, setAlert}) => {

    const githubContext = useContext(GithubContext);

    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if(text === ''){
            setAlert('Please enter something', 'light');
        }
        else{
            githubContext.searchUsers(text);
            setText('');
        }
    }

    const onChange = (e) => setText(e.target.value);
  
        return (
            <div>
                <form className="form" onSubmit={onSubmit}>
                    <input type="text" name="text" value={text} onChange={onChange} placeholder="Search User.." />
                    <input type="submit" value="Search" className="btn btn-block" style={{backgroundColor: "lightpink"}} />
                </form>
                {githubContext.users.length > 0 && <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>}
            </div>
        )
}

Search.propTypes = {
        setAlert: PropTypes.func.isRequired,
    }

export default Search
