import { useEffect, useState, useContext } from 'react';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import UserContext from '../UserContext';

export default function Movies() {
    const { user } = useContext(UserContext);
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            const url = `https://movieappapi-6awg.onrender.com/movies/getMovies`;
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }
            const data = await response.json();
            setMovies(data.movies);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {error && <p>{error}</p>}
            {user.isAdmin ? (
                <AdminView moviesData={movies} fetchData={fetchData} />
            ) : (
                <UserView moviesData={movies} />
            )}
        </>
    );
}
