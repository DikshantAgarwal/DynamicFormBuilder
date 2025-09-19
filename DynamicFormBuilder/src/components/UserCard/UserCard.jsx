import React from 'react';
import './userCard.css';

const UserCard = ({ name, avatarUrl, role, location,bio }) => {
    return (
        <div className='user-card'>
            <div className="user-card__cover"></div>
            <img className="user-card__avatar" src={avatarUrl} alt="User Avatar" />
            <div className='user-card__details'>
                <h3 className='user-card__name'>{name}</h3>
                <p className='user-card__bio'>{bio.join(' | ')}</p>
                <p className='user-card__headline'>{role}</p>
                <p className='user-card__location'>{location}</p>
            </div>
            <button className='user-card__follow-btn'>Follow</button>
        </div>
    );
};

export { UserCard };
