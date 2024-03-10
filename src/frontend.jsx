// frontend.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Frontend = () => {
    const [bestProject, setBestProject] = useState(null);
    const [query, setQuery] = useState('');


    useEffect(() => {
        const fetchBestProject = async () => {
            const params = {
                'need': query
            }
            try {
                const response = await axios.get('http://127.0.0.1:8080/bestprojects', {params});
                console.log(response)
                setBestProject(response.data);
            } catch (error) {
                console.error('Error fetching best project:', error);
            }
        };
        if (query) {
            fetchBestProject();
        }
    }, [query]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setQuery(event.target.elements.query.value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="query" type="text" />
                <button type="submit">Search</button>
            </form>
            <h1>Best Open Source Project for Your Specific Need</h1>
            {bestProject ? (
                <div>
                    <h2>{bestProject.name}</h2>
                    <p>Stars: {bestProject.stargazers_count}</p>
                    <p>Description: {bestProject.description}</p>
                    <a href={bestProject.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Frontend;
