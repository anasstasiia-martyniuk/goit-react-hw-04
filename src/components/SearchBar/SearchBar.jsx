import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import css from "./SearchBar.module.css"

export default function SearchBa({ onSubmit }) {
    const [query, setQuery] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (query.trim() === '') {
            toast.error('Please enter a search term');
            return;
        }

        try {
            const response = await axios.get(`https://api.unsplash.com/search/photos`, {
                params: {
                    query,
                    client_id: '1D37ZDRQZeZP3C2WPuc407dk3IPd5_MACV_uW0xCiKE',
                    page: 1,
                },
            });

            onSubmit(response.data.results, query);
            setQuery('');
        } catch (error) {
            toast.error('Failed to fetch images. Please try again later.');
        }
    };

    return (
        <header className={css.header}>
            <form className={css.w} onSubmit={handleSubmit}>
                <input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={css.q}
                />
                <button type="submit" className={css.search}>Search</button>
            </form>
        </header>
    );
}