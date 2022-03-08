
import React from 'react';
import { Card, CardContent, CardMedia, Box, Typography as t} from '@mui/material';

const ProfileCard = (props) => {
    return (
        <Card sx={{ display: 'flex', minWidth: 275 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>  
                {props.image && 
                <CardMedia component = "img" sx= {{ width: 100, borderRadius: '50%'}}image = {props.image}/>
                }
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                    <t component = "div" variant = "h5">{props.user.Name}<br /></t>
                    <t component = "div" variant = "h1"> {props.user.Age}<br /></t>
                    <t component = "div" variant = "h1"> {props.user.BloodTypes}</t>
                </CardContent>
            </Box>
        </Card>
    );
};

export default ProfileCard;
