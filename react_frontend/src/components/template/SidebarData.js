import React from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Money',
        path: '/money',
        icon: <FaIcons.FaMoneyBillAlt />,
        cName: 'nav-text'
    },
    {
        title: 'Photo-Gallery Framework',
        path: '/ReactPhotoGallery',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'nav-text'
    },
    {
        title: 'Calculatrice',
        path: '/calculator/Calculator',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'nav-text'
    },
    {
        title: 'Investment Calculator',
        path: '/investment/Investment',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'nav-text'
    }
]