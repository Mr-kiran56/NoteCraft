import React, { useState, useEffect } from 'react';
import '../Profile.css';
import { IoCodeWorking } from 'react-icons/io5';

const Profile = () => {
    const host = "http://localhost:5000";
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        bio: '',
        profileImage: 'default-profile.png'
    });

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await fetch(`${host}/api/auth/getuser`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem('token')
                    },
                });
                const json = await response.json();
                setUserData({
                    fullName: json.name || 'John Doe',
                    email: json.email || 'john.doe@example.com',
                    bio: json.bio || 'Blogger | Content Creator',
                    profileImage: json.profileImage || 'default-profile.png'
                });
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        getProfile();
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserData((prev) => ({ ...prev, [id]: value }));
    };

    const handleProfileImageChange = (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUserData((prev) => ({ ...prev, profileImage: event.target.result }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
             
               

        
                <div className="profile-photo-section">
                    <div> <h2 className="profile-heading text-center mb-4">
                    <span className='profile fs-1'>NoteCraft</span> - User Profile
                </h2></div>
                    <div className="profile-photo">
                        <img src={userData.profileImage} alt="Profile" id="profileImage" />
                    </div>
                    <div className="upload-btn-wrapper">
                        <label htmlFor="profilePhotoInput" className='btn-primary upload-label'>
                            <IoCodeWorking style={{ marginRight: "8px" }} />
                            Upload Photo
                        </label>
                        <input
                            type="file"
                            id="profilePhotoInput"
                            accept="image/*"
                            onChange={handleProfileImageChange}
                            hidden
                        />
                    </div>
                </div>

                {/* Profile Form Section */}
                <div className="profile-info">
                    <form>
                        <div className="form-group">
                            <label htmlFor="fullName">@Username</label>
                            <input
                                type="text"
                                id="fullName"
                                className="form-control"
                                value={userData.fullName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">@Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={userData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="bio">@Bio</label>
                            <textarea
                                id="bio"
                                className="form-control"
                                rows="3"
                                value={userData.bio}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
