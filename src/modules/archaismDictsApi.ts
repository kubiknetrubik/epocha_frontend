import { ARCHAISM_DICTS_MOCK } from './mock';
import type { ArchaismDictFeed, ArchaismDictListItem } from './types';

const published = () =>
  ARCHAISM_DICTS_MOCK.filter((d) => d.status === 'published').sort((a, b) =>
    (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''),
  );

export const getArchaismDicts = async (startDate?: string): Promise<ArchaismDictListItem[]> =>
  published()
    .filter((d) => !startDate || (d.startDate !== null && d.startDate >= startDate))
    .map(({ id, title, imageUrl, startDate, endDate, likesCount, isMine }) => ({
      id,
      title,
      imageUrl,
      startDate,
      endDate,
      likesCount,
      isMine,
    }));

export const getArchaismDictFeed = async (
  id: number,
  next = false,
): Promise<ArchaismDictFeed | null> => {
  const list = published();
  let index = list.findIndex((d) => d.id === id);
  if (index < 0) return null;
  if (next) index = (index + 1) % list.length;
  return { ...list[index], nextId: list[(index + 1) % list.length].id };
};
