import { useEffect, useState, type FC, type SyntheticEvent } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getArchaismDictFeed, getArchaismDicts } from '../modules/archaismDictsApi';
import type { ArchaismDictFeed } from '../modules/types';
import { DEFAULT_VIDEO, formatDate, ROUTES } from '../Routes';

const onVideoError = (e: SyntheticEvent<HTMLVideoElement>) => {
  const video = e.currentTarget;
  if (!video.src.endsWith(DEFAULT_VIDEO)) {
    video.src = DEFAULT_VIDEO;
    void video.play().catch(() => undefined);
  }
};

const FeedPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dict, setDict] = useState<ArchaismDictFeed | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setExpanded(false);

    if (!id) {
      getArchaismDicts().then((list) => {
        if (list.length > 0) {
          navigate(`${ROUTES.FEED}/${list[0].id}`, { replace: true });
        } else {
          setDict(null);
          setLoading(false);
        }
      });
      return;
    }

    getArchaismDictFeed(Number(id))
      .then(setDict)
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleNext = () => {
    if (dict) navigate(`${ROUTES.FEED}/${dict.nextId}`);
  };

  if (loading) {
    return (
      <div className="phone-container feed-loader">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (!dict) {
    return (
      <div className="phone-container screen-grid">
        <p className="empty-text">Словарь не найден</p>
      </div>
    );
  }

  return (
    <div className="phone-container">
      <video
        key={dict.id}
        className="bg-video"
        src={dict.videoUrl || DEFAULT_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        onError={onVideoError}
      />

      <div className="actions-sidebar">
        <Button variant="link" className="action-btn" disabled title="Лайк — после входа">
          <img src="/icons/heart.svg" alt="Лайк" className="action-icon" />
          <span>{dict.likesCount}</span>
        </Button>
        <Button variant="link" className="action-btn circle-btn" onClick={handleNext} title="Следующий">
          <img src="/icons/arrowdown.svg" alt="Следующий" className="action-icon" />
        </Button>
        <div className="sidebar-date-info">
          <span className="date-label">Даты</span>
          <span className="date-value">{formatDate(dict.startDate)}</span>
          <span className="date-separator">—</span>
          <span className="date-value">{formatDate(dict.endDate)}</span>
        </div>
      </div>

      <div className={`glass-card${expanded ? ' expanded' : ''}`}>
        <h2 className="feed-title">{dict.title}</h2>
        <div className="description-header">
          <p className={`card-description${expanded ? '' : ' collapsed'}`}>{dict.description}</p>
          <button
            type="button"
            className="chevron-btn"
            aria-label={expanded ? 'Свернуть описание' : 'Развернуть описание'}
            onClick={() => setExpanded((v) => !v)}
          >
            <img src="/icons/chevronup.svg" alt={expanded ? 'Меньше' : 'Больше'} className="chevron-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
