import { useEffect, useState } from 'react';
import { GoSearch, GoTrashcan, GoPerson } from "react-icons/go";
import FollowButton from '../FollowButton/FollowButton';
import { Link } from 'react-router-dom';
import placeholderImg from "../../img/ProfileImgPlaceholder.png"
import './PersonSearch.css'

const userFetch = process.env.REACT_APP_BACKEND_URL + "/api/users";

const PersonSearch = ({ useContextUser }) => {
    const [searchData, setSearchData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [wordEntered, setWordEntered] = useState("")
    const excluded = [`${useContextUser?.name},${useContextUser?.email}, ${useContextUser?.username} `]
    // const useContextUserName = useContextUser.username

    useEffect(() => {
        const getData = async () => {
            const users = await fetch(userFetch)
            const userData = await users.json()
            setSearchData(userData)
        }
        // const newUserData = searchData?.filter(user => !user?.includes(excluded))?.map(filteredNewUserData => (filteredNewUserData))
        // console.log(newUserData)
        getData()
    }, [])

    const enteredInput = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const filteredSearch = searchData.filter((user) => {
            console.log(user)
            return useContextUser?.email?.toLowerCase().includes(searchWord.toLowerCase()) !== user.email?.toLowerCase().includes(searchWord.toLowerCase())
                || useContextUser?.username?.toLowerCase().includes(searchWord.toLowerCase()) !== user.username?.toLowerCase().includes(searchWord.toLowerCase())
                || useContextUser?.name?.toLowerCase().includes(searchWord.toLowerCase()) !== user.name?.toLowerCase().includes(searchWord.toLowerCase())
        }, [event])
        setFilteredData(filteredSearch)

    }

    const clearButton = () => {
        setFilteredData([])
        setWordEntered("")
    }
    console.log(searchData)
    console.log(excluded)
    return (
        <div className='personSearch'>
            <form className='form'>
                <div className='formInput'>
                    <span className='searchBar'>
                        {wordEntered === "" && <GoSearch className='icon' />}
                        {wordEntered !== "" && <button className='resetButton' onClick={clearButton}><GoTrashcan className='icon' /></button>}
                    </span>
                    <input className='searchInput' type="text" placeholder="Search name" onInput={enteredInput} value={wordEntered} />
                </div>
                <div className='goPersonDiv'>
                    <GoPerson className='personIcon' />
                </div>
            </form>
            {wordEntered === "" && wordEntered !== wordEntered?.includes(excluded) &&
                <div id='searchResultsDiv'>
                    <div>
                        {searchData?.filter(user => user._id !== useContextUser._id).map((user, index) => {
                            return (
                                <div className='searchUserContainer' key={index}>
                                    <Link className='searchLink' style={{ textDecoration: 'none' }} to={`/Profile/${user._id}`}><div className='searchPicContainer'>
                                        <img className='searchImage' src={user?.image?.url ? user?.image?.url : placeholderImg} alt={user.username}></img>
                                    </div>
                                        <div className='userInfo'>
                                            <p className='searchUser' key={index}>{user.username}</p>
                                            <p className='searchOccupation'>{user.occupation}</p>
                                        </div>
                                    </Link>
                                    <FollowButton followedUser={user} />
                                </div>
                            )
                        })}</div>
                </div>
            }

            {
                filteredData && wordEntered !== "" && wordEntered !== wordEntered?.includes(excluded) &&
                < div id='searchResultsDiv'>
                    {filteredData?.filter(user => user._id !== useContextUser._id).map((user, index) => {
                        return (

                            <div className='searchUserContainer' key={index}>
                                <Link className='searchLink' style={{ textDecoration: 'none' }} to={`/Profile/${user._id}`}>
                                    <div className='searchPicContainer'>
                                        <img className='searchImage' src={user?.image?.url ? user?.image?.url : placeholderImg} alt={user.user}></img>
                                    </div>
                                    <div className='userInfo'>
                                        <p className='searchUser' key={index}>{user?.username}</p>
                                        <p className='searchOccupation'>{user.occupation}</p>
                                    </div>
                                </Link>
                                <FollowButton followedUser={user} />
                            </div>
                        )
                    })}
                </div>
            }

            {
                wordEntered.includes(filteredData) && wordEntered !== "" &&
                <div className='noResults'>
                    <span className='blink'><p className='noResultsP'>No results</p></span>
                </div>
            }
        </div >
    )
};

export default PersonSearch;