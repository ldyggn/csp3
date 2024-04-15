import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ArchiveProduct({ product, isActive, fetchData }) {

    // Function to archive a product
    const archiveToggle = (productId) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/archive`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            // Display success or error message
            if (data.message === 'Product archived successfully') {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Product successfully disabled'
                });
                // Fetch updated data
                fetchData();
            } else {
                Swal.fire({
                    title: 'Something Went Wrong',
                    icon: 'Error',
                    text: 'Please Try again'
                });
                // Fetch updated data
                fetchData();
            }
        });
    };

    // Function to activate a product
    const activateToggle = (productId) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/activate`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            // Display success or error message
            if (data.message === "Product activated successfully") {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Product successfully enabled'
                });
                // Fetch updated data
                fetchData();
            } else {
                Swal.fire({
                    title: 'Something Went Wrong',
                    icon: 'Error',
                    text: 'Please Try again'
                });
                // Fetch updated data
                fetchData();
            }
        });
    };

    return (
        <>
            {/* Conditional rendering of archive/activate button based on product's isActive status */}
            {isActive ? (
                <Button style={{ marginLeft: '10px', backgroundColor: '#934647', color: 'white', borderColor: '#934647' }} size="sm" onClick={() => archiveToggle(product)}>Archive</Button>
            ) : (
                <Button style={{ marginLeft: '10px', backgroundColor: '#f79191', color: 'white', borderColor: '#f79191' }} size="sm" onClick={() => activateToggle(product)}>Activate</Button>
            )}
        </>
    );
}
