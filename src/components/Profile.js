import React, { useEffect, useState } from 'react';
import { getProfile, logout } from '../services/authService';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // ВРЕМЕННО: используем тестовое имя пользователя
        const username = 'test_user'; // TODO: заменить на динамическое значение
        const profileData = await getProfile(username);
        setProfile(profileData);
      } catch (err) {
        setError(err.message || 'Ошибка загрузки профиля');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (loading) return <div style={{ padding: 20 }}>Загрузка профиля...</div>;
  if (error) return <div style={{ padding: 20, color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', padding: 20 }}>
      <h2>Профиль пользователя</h2>
      
      {profile && (
        <div style={{ background: '#f5f5f5', padding: 20, borderRadius: 8 }}>
          <p><strong>ID:</strong> {profile.id}</p>
          <p><strong>Имя пользователя:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Дата регистрации:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
        </div>
      )}

      <button 
        onClick={handleLogout}
        style={{ 
          marginTop: 20, 
          padding: '10px 20px', 
          background: '#dc3545', 
          color: 'white', 
          border: 'none',
          borderRadius: 4
        }}
      >
        Выйти
      </button>
    </div>
  );
};

export default Profile;