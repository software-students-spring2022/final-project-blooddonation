
import React from 'react';
import { Card, CardContent, CardMedia, Box} from '@mui/material';

const ProfileCard = (props) => {
    return (
        <Card>
            <Card>
                <t component = "div">{props.title}</t>
            </Card>
            <Card sx={{ display: 'flex', pl: 3, pb: 3, pt: 3}}>
                {props.image && <Box sx={{ alignItems: 'center'}}>   
                    <CardMedia component = "img" sx= {{ width: 100, borderRadius: '50%'}}image = {props.image}/>
                </Box>}
                <Box>
                    <CardContent>
                        {Object.entries(props.text).map(([key, value]) => 
                            <t component = "div" variant = "h5">{`${key} : ${value}`}<br /></t>
                        )}
                    </CardContent>
                </Box>
            </Card>
        </Card>
    );
};

export default ProfileCard;
