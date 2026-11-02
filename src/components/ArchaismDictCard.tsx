import type { FC, SyntheticEvent } from 'react';
import { Card } from 'react-bootstrap';
import { DEFAULT_IMAGE, formatDate } from '../Routes';
import type { ArchaismDictListItem } from '../modules/types';

interface Props {
  dict: ArchaismDictListItem;
  onClick: (id: number) => void;
}

const onImageError = (e: SyntheticEvent<HTMLImageElement>) => {
  if (!e.currentTarget.src.endsWith(DEFAULT_IMAGE)) e.currentTarget.src = DEFAULT_IMAGE;
};

export const ArchaismDictCard: FC<Props> = ({ dict, onClick }) => (
  <Card className="grid-card" role="button" onClick={() => onClick(dict.id)}>
    <div className="grid-card-img-wrapper">
      <Card.Img
        className="grid-card-img"
        src={dict.imageUrl || DEFAULT_IMAGE}
        alt={dict.title}
        onError={onImageError}
      />
    </div>
    <Card.Body className="grid-card-content">
      <Card.Title as="h3" className="grid-card-title">
        {dict.title}
      </Card.Title>
      <div className="grid-card-likes">
        <img src="/icons/heart.svg" alt="Лайки" className="heart-grid" />
        <span className="likes-counter">{dict.likesCount}</span>
      </div>
      <div className="grid-card-limit">Нижняя граница: {formatDate(dict.startDate)}</div>
    </Card.Body>
  </Card>
);
