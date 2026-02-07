import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanel from '../components/AdminPanel';
import { fetchNotes } from '../services/api';
import './AdminPage.css';

/**
 * AdminPage - Dedicated admin interface at /admin
 * 
 * Full-page admin panel for managing notes
 */
function AdminPage() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadNotes() {
      try {
        const loadedNotes = await fetchNotes();
        setNotes(loadedNotes);
      } catch (error) {
        // Failed to load notes
      } finally {
        setIsLoading(false);
      }
    }
    loadNotes();
  }, []);

  const handleNoteDeleted = (noteId) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const handleNoteUpdated = (updatedNote) => {
    setNotes(prev => prev.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    ));
  };

  const handleBackToWall = () => {
    navigate('/');
  };

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Admin Panel</h1>
        <button 
          className="admin-page__back-btn"
          onClick={handleBackToWall}
        >
          ← Back to Wall
        </button>
      </div>

      {isLoading ? (
        <div className="admin-page__loading">Loading notes...</div>
      ) : (
        <div className="admin-page__content">
          <AdminPanel 
            notes={notes}
            onNoteDeleted={handleNoteDeleted}
            onNoteUpdated={handleNoteUpdated}
            isFullPage={true}
          />
        </div>
      )}
    </div>
  );
}

export default AdminPage;
