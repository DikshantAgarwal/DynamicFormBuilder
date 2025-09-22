import React from 'react';
import './userCard.css';

const UserCard = ({ name, avatarUrl, role, location,bio ,skills, PhoneNumber }) => {
    return (
        <div className="user-card">
            <div className="user-card__cover"></div>
            <img className="user-card__avatar" src={avatarUrl} alt="User Avatar" />
            <div className="user-card__details">
                <h3 className="user-card__name">{name}</h3>
                <p className="user-card__headline">{role}</p>

                <div className="user-card__bio">
                    <span role="img" aria-label="bio">💬</span> {bio}
                </div>
                <div className="user-card__phones">
                    <span role="img" aria-label="phone">📞</span> Phones:
                    <ul>
                        {PhoneNumber && PhoneNumber.map((phone, idx) => (
                            <li key={idx}>{phone}</li>
                        ))}
                    </ul>
                </div>
                <div className="user-card__skills">
                    <span role="img" aria-label="skills">🏷️</span> Skills:
                    <div className="user-card__skills-list">
                        {skills && skills.map((skill)=>
                            <span className="user-card__skill">[ {skill} ]</span>
                            )}
                    </div>
                </div>
                <div className="user-card__location">
                    <span role="img" aria-label="location">📍</span> 
                    {location && (
                        <span>{location}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export { UserCard };
