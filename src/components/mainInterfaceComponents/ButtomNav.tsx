import {SyntheticEvent , useEffect, useState} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Home from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import PersonPin from '@mui/icons-material/PersonPin';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setActiveMenu} from '../../redux/mainInterface';

const ButtomNav: React.FC = ()=>{
    const mainInterfaceActiveTab  = useAppSelector((state) => state.mainInterfaceActiveTabIndex);
    const dispatch = useAppDispatch();
    const handleTabChange = (event: SyntheticEvent, newValue: number) => {
        dispatch(setActiveMenu(newValue));
    };
    return(
        <>
        <BottomNavigation sx={{ width: "100%" }} value={mainInterfaceActiveTab.value} onChange={handleTabChange}>
            <BottomNavigationAction
            label="Acceuil"
            value='0'
            icon={<Home />}
            />
            <BottomNavigationAction
            label="Explorer"
            value='1'
            icon={<ExploreIcon />}
            />
            <BottomNavigationAction
            label="Espace Personnel"
            value='2'
            icon={<PersonPin />}
            />
        </BottomNavigation>
        </>
    )
}

export default ButtomNav;