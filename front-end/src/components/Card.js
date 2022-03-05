
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'

const BasicCard = (props) => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                {props.text}
            </CardContent>
        </Card>
    );
};

export default BasicCard;
