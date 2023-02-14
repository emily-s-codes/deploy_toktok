import { useContext, useRef, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './NewpostPage.css'
import { MdPhotoCamera } from "react-icons/md"

const NewpostPage = () => {
    const [selectImage, setSelectImage] = useState(true)
    const [newImage, setNewImage] = useState(false)
    const [image, setImage] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const user = useContext(UserContext)

    setTimeout(() => {
        console.log(user)
    }, 10000)

    const imageRef = useRef()
    const contentRef = useRef()

    const showImage = () => {
        setImage(URL.createObjectURL(imageRef.current.files[0]))
        setNewImage(true)
        setImageFile(imageRef.current.files[0])
    }

    const publish = async () => {
        try {
            const post = {
                content: contentRef.current.value
            }
            //IMAGE
            const file = imageFile
            console.log(imageFile)
            const form = new FormData()
            form.append('file', file)
            form.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
            const imageResponse = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
                method: 'POST',
                body: form
            })
            const data = await imageResponse.json()
            console.log(data)

            // ADD IMAGE TO POST
            post.image = data.secure_url
            post.public_id = data.public_id

            console.log(post)

            // POST ABSCHICKEN INS BACKEND
            const postResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/${user}/post`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(post)
            })

            if (postResponse.ok) {
                console.log('success posting')
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div>
            <h1>new post</h1>
            {selectImage && // hier kann man das Bild auswählen, wird gezeigt wenn selectImage === true
                <>
                    {/* von Sofia dazugeschrieben: label-Tag , id im input */}
                    <label for="fotoUpload" className='uploadButton' >
                        <MdPhotoCamera />Upload
                    </label>
                    <input id="fotoUpload" type="file" ref={imageRef} onChange={showImage}></input>
                    {newImage &&
                        <>
                            <img src={image} alt="selected" />
                            <button className='uploadButton' onClick={() => setSelectImage(false)}>Add Content</button>
                        </>}
                </>}
            {!selectImage && // hier kann man den text hinzufügen, wird gezeigt wenn selectImage === false
                <section>
                    <div>
                        {/* user profile image */}
                        <textarea ref={contentRef} placeholder='Write a caption'></textarea>
                        <img src={image} alt="selected" />
                    </div>
                    <div>
                        <button onClick={() => setSelectImage(true)}>Back to Image Selection</button>
                        <button onClick={publish}>Publish</button>
                    </div>

                </section>
            }

        </div>
    );
}

export default NewpostPage;