import LikesCommentsButtons from '../LikesCommentsButtons/LikesCommentsButtons';
import PostImage from '../PostImage/PostImage';
import ProfilMini from '../ProfilMini/ProfilMini';
import './Profil.css'

const Profil = ({ singlePost, rerender, setRerender }) => {
    return (
        <div>
            <ProfilMini singlePost={singlePost} />
            <PostImage singlePost={singlePost} />
            <LikesCommentsButtons singlePost={singlePost} rerender={rerender} setRerender={setRerender} />
        </div>
    );
}

export default Profil;