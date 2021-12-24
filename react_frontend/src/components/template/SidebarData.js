import React from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as HiIcons from "react-icons/hi"

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'My pictures',
        path: '/ReactPhotoGallery',
        icon: <HiIcons.HiOutlinePhotograph />,
        cName: 'nav-text'
    },
    {
        title: 'Calculator',
        path: '/calculator/Calculator',
        icon: <AiIcons.AiOutlineCalculator />,
        cName: 'nav-text'
    },
    {
        title: 'Investment Calculator',
        path: '/investment/Investment',
        icon: <AiIcons.AiOutlineStock />,
        cName: 'nav-text'
    },
    {
        title: 'Money',
        path: '/money',
        icon: <FaIcons.FaRegMoneyBillAlt />,
        cName: 'nav-text'
    }
]