import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <div>
      
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
