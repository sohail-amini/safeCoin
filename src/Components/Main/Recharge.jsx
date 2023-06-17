import React, { useEffect } from 'react'
import { InsideNav } from './InsideNav'
export const Recharge = () => {
    const html = '<a class="nav-link active" aria-current="page" href="{% url \'payments:home\' %}">Link</a>';

    useEffect(() => {
        const fetchData = async () => {
            await fetch('http://127.0.0.1:8000/')
                .then(response => response.text())
                .then(data => console.log(data))
                .catch(error => console.log(error));
        }
        fetchData()
    }, []);

    return (
        <div>
            <InsideNav name="Recharge" />
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
    )
}
