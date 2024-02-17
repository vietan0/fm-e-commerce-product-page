import productImgs from './productImgs';

export type Gallery = { index: number; direction: 1 | -1 };
export type GalleryAction =
  | { type: 'prev' | 'next' }
  | { type: 'choose'; payload: number };

export default function galleryReducer(
  prev: Gallery,
  action: GalleryAction,
): Gallery {
  let index: Gallery['index'];
  let direction: Gallery['direction'];
  switch (action.type) {
    case 'prev':
      direction = -1;
      index = prev.index === 0 ? productImgs.length - 1 : prev.index - 1;
      break;
    case 'next':
      direction = 1;
      index = prev.index === productImgs.length - 1 ? 0 : prev.index + 1;
      break;
    default:
      direction = action.payload > prev.index ? 1 : -1;
      index = action.payload;
  }
  return { index, direction };
}
