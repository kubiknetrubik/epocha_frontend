import { useEffect, useState, type FC } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArchaismDictCard } from '../components/ArchaismDictCard';
import { StartDateFilter } from '../components/StartDateFilter';
import { getArchaismDicts } from '../modules/archaismDictsApi';
import type { ArchaismDictListItem } from '../modules/types';
import { ROUTES } from '../Routes';

const CatalogPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const appliedStartDate = searchParams.get('startDate') ?? '';
  const [startDate, setStartDate] = useState(appliedStartDate);
  const [dicts, setDicts] = useState<ArchaismDictListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getArchaismDicts(appliedStartDate || undefined)
      .then(setDicts)
      .finally(() => setLoading(false));
  }, [appliedStartDate]);

  const handleSearch = () => {
    setSearchParams(startDate ? { startDate } : {});
  };

  const handleCardClick = (id: number) => navigate(`${ROUTES.FEED}/${id}`);

  return (
    <div className="phone-container screen-grid">
      <div className="scroll-area">
        <StartDateFilter value={startDate} setValue={setStartDate} onSubmit={handleSearch} loading={loading} />

        {loading ? (
          <div className="loader">
            <Spinner animation="border" />
          </div>
        ) : dicts.length === 0 ? (
          <p className="empty-text">Словари не найдены</p>
        ) : (
          <Row xs={2} className="g-2 grid-container">
            {dicts.map((dict) => (
              <Col key={dict.id}>
                <ArchaismDictCard dict={dict} onClick={handleCardClick} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
