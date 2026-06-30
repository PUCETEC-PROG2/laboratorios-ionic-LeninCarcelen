import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonThumbnail,
  IonImg,
} from '@ionic/react';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import { Repository } from '../interfaces/Repository';
import './RepoItem.css';

type RepoItemProps = Repository & {
  onEdit?: () => void;
  onDelete?: () => void;
};

const RepoItem = ({ name, description, language, avatarUrl, onEdit, onDelete }: RepoItemProps) => {
  return (
    <IonItemSliding>
      <IonItem>
        <IonThumbnail slot="start">
          <IonImg src={avatarUrl} alt={name} />
        </IonThumbnail>
        <IonLabel>
          <h2>{name}</h2>
          <p>{description}</p>
          <p><strong>Lenguaje:</strong> {language}</p>
        </IonLabel>
      </IonItem>
      <IonItemOptions side="end">
        {onEdit && (
          <IonItemOption color="medium" onClick={onEdit}>
            <IonIcon slot="start" icon={pencilOutline} />
            Editar
          </IonItemOption>
        )}
        {onDelete && (
          <IonItemOption color="danger" onClick={onDelete}>
            <IonIcon slot="start" icon={trashOutline} />
            Eliminar
          </IonItemOption>
        )}
      </IonItemOptions>
    </IonItemSliding>
  );
}


export default RepoItem;