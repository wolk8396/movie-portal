import { DynamicKeyModels } from "../models/dynamic.key.models";
import { MovieItem } from "../models/movie.models";

export const SortItem = (items:MovieItem[], option: DynamicKeyModels): MovieItem[] => {
  const key = option.value;
    if (option.title.includes('des')) {
      return items.sort((a: MovieItem, b: MovieItem) => {
        if (key === 'nameRu' && b.nameRu && a.nameRu) {
          return b.nameRu.localeCompare(a.nameRu);
        }
        return b[key] - a[key];
      });
    };

    return items.sort((a: MovieItem, b: MovieItem) => {
      if (key === 'nameRu' && b.nameRu &&  a.nameRu) {
        return a.nameRu.localeCompare(b.nameRu);
      }
      return a[key] - b[key];
    });
}