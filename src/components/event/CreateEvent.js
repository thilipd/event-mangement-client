import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from '../../axios/axios';





const CreateEvent = () => {

    const [data, setData] = useState({
        title: '',
        description: '',
        eventStart: '',
        eventEnd: ''
    })

    const handleChange = (e) => {
        const { value, name } = e.target;
        setData({ ...data, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let date = new Date(data.eventStart);

        if (date.getDay() != 3 || date.getDay() != 5) {

            const create = await axios.post('/event/create', { ...data })

            console.log(create.data);

            toast.success(create.data);



            setData({
                title: '',
                description: '',
                eventStart: '',
                eventEnd: ''
            })
        }

        if (date.getDay() == 3 || date.getDay() == 5) {
            toast.error('Please select date which is not wednesday / Friday')
            console.log(date.getDay())
            setData({
                ...data, eventStart: '', eventEnd: ''
            })
        }


    }


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

export default CreateEvent
