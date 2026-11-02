export interface ArchaismDictListItem {
  id: number;
  title: string;
  imageUrl: string | null;
  startDate: string | null;
  endDate: string | null;
  likesCount: number;
  isMine: 0 | 1;
}


export interface ArchaismDictFeed {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  startDate: string | null;
  endDate: string | null;
  status: 'draft' | 'published' | 'deleted';
  publishedAt: string | null;
  likesCount: number;
  liked: 0 | 1;
  isMine: 0 | 1;
  nextId: number;
}
