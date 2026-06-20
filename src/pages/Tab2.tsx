import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonIcon } from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', description: '' });

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
          >
            Guardar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
