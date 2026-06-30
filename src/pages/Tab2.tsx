import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonIcon, IonSpinner } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import { createRepository } from '../services/GithubService';
import './Tab2.css';

const Tab2: React.FC = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const saveRepository = async () => {
    if (!formData.name.trim()) {
      setError('El nombre del repositorio es obligatorio.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const newRepository = await createRepository({
        name: formData.name,
        description: formData.description,
      });

      if (newRepository) {
        setSuccessMessage('Repositorio creado correctamente.');
        setFormData({ name: '', description: '' });
        // Volver a la lista; Tab1 refresca en view enter
        history.push('/tab1');
      } else {
        setError('Error al crear el repositorio');
      }
    } catch (err) {
      setError('Error al crear el repositorio');
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
          <IonTitle>Crear Repositorio</IonTitle>
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
            disabled={loading}
          >
            Crear
          </IonButton>

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
