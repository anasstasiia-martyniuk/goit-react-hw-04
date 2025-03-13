import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import css from "./SearchBar.module.css"

export default function SearchBar({ onSubmit }) {

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const form = evt.target;
        const topic = form.elements.topic.value.trim();
        if (topic === '') {
            toast.error('Please enter a search term');
            return;
        }
        onSubmit(topic);
        form.reset();
    };

    return (
        <header className={css.header}>
            <form className={css.w} onSubmit={handleSubmit}>
                <input
                    name="topic"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    className={css.q}
                />
                <button type="submit" className={css.search}>Search</button>
            </form>
        </header>
    );
}