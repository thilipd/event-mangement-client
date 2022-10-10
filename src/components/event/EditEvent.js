import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../axios/axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEvent = () => {

    const slug = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({
        title: '',
        description: '',
        eventStart: '',
        eventEnd: ''
    })

    console.log(slug.id);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setData({ ...data, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let date = new Date(data.eventStart);

        if (date.getDay() != 3 || date.getDay() != 5) {

            const create = await axios.put(`/event/edit/${slug.id}`, { ...data })

            console.log(create.data);

            toast.success(create.data);



            setData({
                title: '',
                description: '',
                eventStart: '',
                eventEnd: ''
            })

            navigate('/list')
        }

        if (date.getDay() == 3 || date.getDay() == 5) {
            toast.error('Please select date which is not wednesday / Friday')
            console.log(date.getDay())
            setData({
                ...data, eventStart: '', eventEnd: ''
            })
        }
    }

    const loadData = async () => {
        const event = await axios.get(`/event/read/${slug.id}`);

        console.log(event.data.eve[0]);

        setData({
            title: event.data.eve[0].title,
            description: event.data.eve[0].description,
            eventStart: event.data.eve[0].eventStart,
            eventEnd: event.data.eve[0].eventEnd
        })
    }



    useEffect(() => {
        loadData()
    }, [])



    return (
        <div>
            <div className="eventFormContainer">
                <form onSubmit={handleSubmit}>
                    <label>
                        <div className="lableContainer">
                            Title:
                        </div>
                        <div className="inputContainer">
                            <input type="text"
                                name='title'
                                value={data.title}
                                onChange={(e) => handleChange(e)}
                                autoFocus required />
                        </div>

                    </label><br /><br />
                    <label>
                        <div className="lableContainer">
                            Description:
                        </div>
                        <div className="inputContainer">
                            <input type="text"
                                name='description'
                                value={data.description}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>

                    </label><br /><br />
                    <label>
                        <div className="lableContainer">
                            Event Start Date:
                        </div>
                        <div className="inputContainer">
                            <input type="datetime-local"
                                name='eventStart'
                                value={data.eventStart}
                                onChange={(e) => handleChange(e)}
                                autoFocus required />
                        </div>

                    </label><br /><br />
                    <label>
                        <div className="lableContainer">
                            Event End Date:
                        </div>
                        <div className="inputContainer">
                            <input type="datetime-local"
                                name='eventEnd'
                                value={data.eventEnd}
                                onChange={(e) => handleChange(e)}
                                autoFocus required />
                        </div>

                    </label><br /><br />

                    <input className='btn' type="submit" value="Save" />

                </form>
            </div>


        </div>
    )
}

export default EditEvent
