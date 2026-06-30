import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonIcon, IonSpinner, IonText } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import { updateRepository } from '../services/GithubService';
import './Tab2.css';

interface RepoEditState {
  id: number;
  originalName: string;
  name: string;
  description: string;
  language: string;
  ownerLogin: string;
}

const Tab2: React.FC = () => {
  const location = useLocation<{ repoToEdit?: RepoEditState }>();
  const history = useHistory();
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [repoEdit, setRepoEdit] = useState<RepoEditState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (location.state?.repoToEdit) {
      setRepoEdit(location.state.repoToEdit);
      setFormData({
        name: location.state.repoToEdit.name,
        description: location.state.repoToEdit.description,
      });
    }
  }, [location.state]);

  const saveRepository = async () => {
    if (!repoEdit) {
      setError('No hay repositorio para editar. Selecciona uno desde la lista.');
      return;
    }

    if (!formData.name.trim()) {
      setError('El nombre del repositorio es obligatorio.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const updatedRepository = await updateRepository(repoEdit.ownerLogin, repoEdit.originalName, {
        name: formData.name,
        description: formData.description,
      });

      if (updatedRepository) {
        setSuccessMessage('Repositorio actualizado correctamente.');
        setRepoEdit({ ...repoEdit, originalName: formData.name, name: formData.name, description: formData.description });
      } else {
        setError('Error al actualizar el repositorio');
      }
    } catch (err) {
      setError('Error al actualizar el repositorio');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton fill="clear" slot="start" onClick={() => history.push('/tab1')}>
            <IonIcon icon={chevronBackOutline} />
          </IonButton>
          <IonTitle>{repoEdit ? 'Editar Repositorio' : 'Editar repositorio'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Crear Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="form-container">
          <IonInput
            className="form-input"
            label="Nombre"
            placeholder="Ingrese el nombre del repositorio"
            labelPlacement="floating"
            value={formData.name}
            onIonChange={(e) => setFormData({ ...formData, name: e.detail.value || '' })}
          />

          <IonInput
            className="form-input"
            label="Descripción"
            placeholder="Ingrese la descripción del repositorio"
            labelPlacement="floating"
            value={formData.description}
            onIonChange={(e) => setFormData({ ...formData, description: e.detail.value || '' })}
          />

          <IonButton
            className="submit-button"
            expand="block"
            fill="solid"
            color="primary"
            onClick={saveRepository}
            disabled={loading || !repoEdit}
          >
            Guardar
          </IonButton>

          {!repoEdit && (
            <IonText color="medium"></IonText>
          )}

          {loading && (
            <div className="loading-container">
              <IonSpinner name="crescent" />
            </div>
          )}
          {error && <div style={{ color: 'red', padding: '10px' }}>{error}</div>}
          {successMessage && <div style={{ padding: '10px', color: 'green' }}>{successMessage}</div>}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
