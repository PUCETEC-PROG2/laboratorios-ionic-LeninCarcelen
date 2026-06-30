import { useEffect, useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonList,
  IonModal,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  IonToast,
} from '@ionic/react';
import { useIonViewWillEnter } from '@ionic/react';
import { trashOutline, closeOutline } from 'ionicons/icons';
import RepoItem from '../components/RepoItem';
import GithubService from '../services/GithubService';
import { GithubRepo } from '../interfaces/GithubUser';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [repositories, setRepositories] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<GithubRepo | null>(null);
  const [editingRepo, setEditingRepo] = useState<GithubRepo | null>(null);
  const [editForm, setEditForm] = useState({ name: '', description: '' });
  const [originalRepoName, setOriginalRepoName] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchRepos = async () => {
    setLoading(true);
    try {
      const repos = await GithubService.getUserRepos();
      setRepositories(repos);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar los repositorios. ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  useIonViewWillEnter(() => {
    fetchRepos();
  });

  const handleEdit = (repo: GithubRepo) => {
    setEditingRepo(repo);
    setOriginalRepoName(repo.name);
    setEditForm({
      name: repo.name,
      description: repo.description || '',
    });
    setError(null);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setEditingRepo(null);
    setOriginalRepoName('');
    setEditForm({ name: '', description: '' });
    setError(null);
  };

  const saveEdit = async () => {
    if (!editingRepo) {
      return;
    }

    if (!editForm.name.trim()) {
      setError('El nombre del repositorio es obligatorio.');
      return;
    }

    const ownerLogin = editingRepo.owner?.login;
    if (!ownerLogin) {
      setError('No se encontró el propietario del repositorio.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const updatedRepo = await GithubService.updateRepository(ownerLogin, originalRepoName, {
        name: editForm.name,
        description: editForm.description,
      });

      if (!updatedRepo) {
        throw new Error('No se pudo actualizar el repositorio.');
      }

      setRepositories((prev) => prev.map((repo) => (repo.id === updatedRepo.id ? updatedRepo : repo)));
      setToastMessage('Repositorio actualizado correctamente.');
      setShowToast(true);
      handleCloseEdit();
    } catch (err) {
      setError((err as Error).message || 'Error al actualizar el repositorio.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (repo: GithubRepo) => {
    setDeleteTarget(repo);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const ownerLogin = deleteTarget.owner?.login;
      if (!ownerLogin) {
        throw new Error('No se encontró el propietario del repositorio.');
      }

      const deleted = await GithubService.deleteRepository(ownerLogin, deleteTarget.name);
      if (!deleted) {
        throw new Error('No se pudo eliminar el repositorio.');
      }

      setRepositories((prev) => prev.filter((repo) => repo.id !== deleteTarget.id));
      setToastMessage('Repositorio eliminado correctamente.');
      setShowToast(true);
      setDeleteTarget(null);
    } catch (err) {
      setError((err as Error).message || 'Error al eliminar el repositorio.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        {error && (
          <div className="error-message">
            <IonText color="danger">{error}</IonText>
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <IonSpinner name="crescent" />
          </div>
        )}

        {submitting && (
          <div className="loading-container">
            <IonSpinner name="crescent" />
          </div>
        )}

        {!loading && !error && (
          <IonList>
            {repositories.map((repo) => (
              <RepoItem
                key={repo.id}
                name={repo.name}
                description={repo.description || 'Sin descripción'}
                language={repo.language || 'N/A'}
                avatarUrl={repo.owner?.avatar_url || ''}
                onEdit={() => handleEdit(repo)}
                onDelete={() => handleDelete(repo)}
              />
            ))}
          </IonList>
        )}

        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={3000}
          onDidDismiss={() => setShowToast(false)}
          color="success"
        />

        <IonModal isOpen={showEditModal} onDidDismiss={handleCloseEdit}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Editar repositorio</IonTitle>
              <IonButton slot="end" fill="clear" onClick={handleCloseEdit}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent className="modal-content">
            <div className="form-container">
              <IonInput
                className="form-input"
                label="Nombre"
                placeholder="Nombre del repositorio"
                labelPlacement="floating"
                value={editForm.name}
                onIonChange={(e) => setEditForm({ ...editForm, name: e.detail.value || '' })}
              />
              <IonInput
                className="form-input"
                label="Descripción"
                placeholder="Descripción del repositorio"
                labelPlacement="floating"
                value={editForm.description}
                onIonChange={(e) => setEditForm({ ...editForm, description: e.detail.value || '' })}
              />
              {error && (
                <div className="error-message">
                  <IonText color="danger">{error}</IonText>
                </div>
              )}
              <IonButton expand="block" color="primary" onClick={saveEdit} disabled={submitting}>
                Guardar cambios
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        <IonCard className={`delete-confirm-card ${deleteTarget ? 'visible' : ''}`}>
          {deleteTarget && (
            <IonCardContent>
              <p>¿Deseas eliminar el repositorio <strong>{deleteTarget.name}</strong>?</p>
              <div className="delete-confirm-actions">
                <IonButton color="danger" onClick={confirmDelete} disabled={submitting}>
                  <IonIcon slot="start" icon={trashOutline} /> Eliminar
                </IonButton>
                <IonButton color="medium" fill="outline" onClick={() => setDeleteTarget(null)} disabled={submitting}>
                  Cancelar
                </IonButton>
              </div>
            </IonCardContent>
          )}
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
