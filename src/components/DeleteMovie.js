import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const DeleteMovie = ({ movieId, fetchData }) => {

    const deleteMovie = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this movie!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://movieappapi-6awg.onrender.com/movies/deleteMovie/${movieId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if (data.message === 'Movie deleted successfully') {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'The movie has been deleted.',
                            icon: 'success'
                        });
                        fetchData();
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'Failed to delete movie. Please try again later.',
                            icon: 'error'
                        });
                        fetchData();
                    }
                })
                .catch(error => {
                    console.error('Error deleting movie:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to delete movie. Please try again later.',
                        icon: 'error'
                    });
                    fetchData();
                });
            }
        });
    };

    return (
        <Button
            size="sm"
            onClick={deleteMovie}
            style={{ backgroundColor: '#26254F', color: 'white' }}
        >
            Delete
        </Button>
    );
};

export default DeleteMovie;
