import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonIcon } from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import {createRepository} from '../services/GithubService';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [RepositoryData, setRepositoryData] = useState({ name: '', description: '' });
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = React.useState('');

  const saveRepository = async () => {
    setLoading(true);
    setError('');

    try {
      const newRepository = await createRepository({
        name: formData.name,
        description: formData.description
      });

      if (newRepository) {
        setRepositoryData({ name: '', description: '' });
      } else {
        setError('Error al crear el repositorio');
      }
    } catch (err) {
      setError('Error al crear el repositorio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de repositorios</IonTitle>
          <IonIcon icon={addCircleOutline} />
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
          >
            Guardar
          </IonButton>
        </div>
        {loading && (
          <div className="loading-container">
            <IonSpinner name="crescent" />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
