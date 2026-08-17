import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getProfile } from '../api/userApi';

import '../Styles/Dashboard/Dashboard.css'

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadProfile = async () => {
        try {
            const response = await getProfile();
            setUser(response.data.user);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to load dashboard.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="dashboard-container">
            <h1>Welcome, {user?.name} 👋</h1>

            <div
                style={{
                    border: '1px solid #444',
                    padding: '20px',
                    borderRadius: '10px',
                    marginTop: '20px',
                    maxWidth: '500px',
                }}
            >
                <img
                    src={user?.profileImage || '/default-avatar.png'}
                    alt={user?.name}
                    style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                    }}
                />

                <h2>{user?.name}</h2>

                <p>
                    <strong>Email:</strong> {user?.email}
                </p>

                <p>
                    <strong>Phone:</strong> {user?.phone}
                </p>

                <p>
                    <strong>Role:</strong> {user?.role}
                </p>

                <p>
                    <strong>Verified:</strong> {user?.isVerified ? '✅ Yes' : '❌ No'}
                </p>

                <p>
                    <strong>Provider:</strong> {user?.provider}
                </p>

                <p>
                    <strong>Joined:</strong> {new Date(user?.createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
