import React, { useState, useEffect } from 'react';
import axios from '../../axios/axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


const ListEvent = () => {

    const [list, setList] = useState([]);

    const navigate = useNavigate();


    const loadData = async () => {
        const list = await axios.get('/event/list');
        setList(list.data);
    }

    const handleEdit = (id) => {
        navigate(`/edit/${id}`)
    }

    const handleView = (id) => {
        navigate(`/list/${id}`)
    }

    const handleDelete = async (id) => {

        await axios.delete(`/event/delete/${id}`);
        loadData();

    }



    useEffect(() => {
        loadData();
    }, []);


    return (
        <div className='container'>
            {list && list.map(eve =>
                <Card sx={{ width: 575 }} key={eve._id}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {eve.title}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {eve.description}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {(eve.eventStart)}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {eve.eventEnd}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => handleEdit(eve._id)}>Edit</Button>
                        <Button size="small" onClick={() => handleView(eve._id)}>View</Button>
                        <Button size="small" onClick={() => handleDelete(eve._id)}>Delete</Button>
                    </CardActions>

                </Card>


            )
            }
        </div >
    )
}

export default ListEvent
