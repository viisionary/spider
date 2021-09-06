import MailIcon from '@material-ui/icons/Mail';
import React from 'react';
import { ARTICLE, IMAGES, MEDIAS } from './Routes';
import { BurstMode, Http } from '@material-ui/icons';

const subMenuMusic = [
    {
        name: 'music-content',
        title: '音乐管理',
        path: '/video-product/#/manage/music-content',
        icon: '',
    },
    {
        name: 'music-categoty',
        title: '音乐风格管理',
        path: '/video-product/#/manage/music-categoty',
    },
];
export const adminMenu = [
    {
        filter: '9',
        name: 'article',
        child: [],
        path: ARTICLE,
        title: 'Article',
        icon: <MailIcon />,
    },
    {
        filter: '9',
        name: 'medias',
        child: [],
        path: MEDIAS,
        title: 'Medias',
        icon: <Http />,
    },
    {
        filter: '9',
        name: 'images',
        child: subMenuMusic,
        path: IMAGES,
        title: 'Images',
        icon: <BurstMode />,
    },
];
