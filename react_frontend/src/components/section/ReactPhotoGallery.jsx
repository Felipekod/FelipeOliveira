import React from 'react'
import Main from '../template/Main'
import ImageGallery from 'react-photo-gallery'

const photos = [
    {
        src: "https://i.imgur.com/KBrrTUW.jpg",
        width: 4,
        height: 3
    },
    {
        src: "https://i.imgur.com/b5tIvta.jpg",
        width: 4,
        height: 3
    },
    {
        src: 'https://i.imgur.com/k7EuMsz.jpg',
        width: 2,
        height: 2
    },
    {
        src: 'https://i.imgur.com/d1VsVpx.jpg',
        width: 2,
        height: 3
    },
    {
        src: "https://i.imgur.com/Exc5lqd.jpg",
        width: 4,
        height: 3
    },
    {
        src: "https://i.imgur.com/KKsoEyL.jpg",
        width: 4,
        height: 3
    },
    {
        src: "https://i.imgur.com/bCou4d6.jpg",
        width: 4,
        height: 3
    },
    {
        src: "https://i.imgur.com/Vu3qZqt.jpg",
        width: 4,
        height: 3
    },
    {
        src: "https://i.imgur.com/Xc4OWCb.jpg",
        width: 4,
        height: 3
    },
    {
        src: "https://i.imgur.com/kD5Cumc.jpg",
        width: 4,
        height: 3
    },
    {
        src: "https://i.imgur.com/JR5bxPB.jpg",
        width: 4,
        height: 3
    }
    
]

const BasicRows = () => <ImageGallery photos={photos} />


const PhotoGallery = () => 
    <Main icon="home" title="Exercices 5" subtittle="Portifolio">
        <h3>Framework responsive react-photo-gallery</h3>
        <BasicRows className='gallery'/>
    </Main>

export default PhotoGallery