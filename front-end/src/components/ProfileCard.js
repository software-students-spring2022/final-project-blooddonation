
import React from 'react';
<<<<<<< HEAD
import { Card, CardContent, CardMedia, Box} from '@mui/material';
=======
import { Card, CardContent, CardMedia, Box, Chip} from '@mui/material';
>>>>>>> fb30b8ac802ab5d8d428cd98d306aab5afd3cf57

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
<<<<<<< HEAD
                        {Object.entries(props.text).map(([key, value]) => 
                            <t component = "div" variant = "h5">{`${key} : ${value}`}<br /></t>
=======
                        {props.text && Object.entries(props.text).map(([key, value]) => 
                            <t component = "div" variant = "h5">{`${key} : ${value}`}<br/></t>
                        )}
                        {props.text_chip && props.text_chip.map((value) => 
                            <Chip sx = {{mr: 2}} label={value} variant="outlined" />
>>>>>>> fb30b8ac802ab5d8d428cd98d306aab5afd3cf57
                        )}
                    </CardContent>
                </Box>
            </Card>
        </Card>
    );
};

export default ProfileCard;
