import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DownloadFile from '../DownloadFile';
import './userDash.css'; // Import the CSS file for styling

function UserDash() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true); // State variable to track loading state
  const { userEmail,userId } = useParams();

  const handleViewDocuments = async () => {
    setLoading(true); // Set loading state to true before fetching documents
    // Fetch documents from backend
    
    try {
      const response = await fetch(`http://localhost:3001/document/${userEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if required, like authorization token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }

      const data = await response.json();
      setDocuments(data.documents); // Assuming the response contains an array of document hashes
    } catch (error) {
      console.error('Error fetching documents:', error.message);
      // Handle error, show error message, etc.
    } finally {
      setLoading(false); // Set loading state to false after fetching documents
    }
  };

  return (
    <div className="user-dash">
      <h2 className="user-id">User ID: {userId}</h2>
      {loading ? ( // Render "View Documents" button only when not loading
        <button onClick={handleViewDocuments}>View Documents</button>
      ) : null}
      <ul>
        {documents.map((document, index) => (
          <DownloadFile key={index} hashValue={document} />
        ))}
      </ul>
    </div>
  );
}

export default UserDash;
