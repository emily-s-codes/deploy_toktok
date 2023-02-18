import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Profil from '../Profil/Profil'
import './Feed.css'

const Feed = ({ userLoaded }) => {
    const [feed, setFeed] = useState([])

    useEffect(() => {
        const getFeed = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/posts`,
                {
                    credentials: 'include'
                })
            if (response.ok) {
                const data = await response.json()
                setFeed(data)
                // console.log(data)
            }
            else {
                console.log('feed not loaded')
            }
        }
        getFeed()
    }, [])

    return (
        <div>
            {userLoaded &&
                <>
                    {feed?.map((singlePost, key) => {
                        return <Profil key={key} singlePost={singlePost} />
                    })}
                </>
            }
            {!userLoaded && <p>Loading...</p>}
        </div>
    );
}

export default Feed;