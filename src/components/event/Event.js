import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../axios/axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Event = () => {

    const [data, setData] = useState({});

    const slug = useParams();
    const navigate = useNavigate();

    console.log(slug.id);

    const loadData = async () => {

        const eventData = await axios.get(`/event/read/${slug.id}`)
        let event = eventData.data.eve;
        setData(event[0]);

    }

    const handleClick = () => {
        navigate('/list');
        setData({})
    }
    useEffect(() => {
        loadData();

    }, [])


    return (
        <div className='container'>
            {data ? <>
                <Card sx={{ width: 575 }} >
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {data.title}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {data.description}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {data.eventStart}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {data.eventEnd}
                        </Typography>
                    </CardContent>
                </Card>
                <Button onClick={handleClick}>Back</Button>
            </> : <><div>'No Data found'</div></>}

        </div>
    )
}

export default Event
