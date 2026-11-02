import type { FC, SubmitEvent } from 'react';
import { Button, Form } from 'react-bootstrap';

interface Props {
  value: string;
  setValue: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
}

export const StartDateFilter: FC<Props> = ({ value, setValue, onSubmit, loading }) => {
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Form className="search-form" onSubmit={handleSubmit}>
      <Form.Control
        type="date"
        className="search-input"
        aria-label="Нижняя граница периода"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit" className="btn-epocha" disabled={loading}>
        Искать
      </Button>
    </Form>
  );
};
