export const filterRowMessages = {
  filterPlaceholder: 'Фильтр...',
};

export const pagingPanelMessages = {
  rowsPerPage: 'Записей на странице',
  info: (parameters) => {
    return `${parameters.from}-${parameters.to} из ${parameters.count}`;
  },
};

export const searchPanelMessages = {
  searchPlaceholder: 'Поиск...',
}

export const tableMessages = {
  noData: 'Нет данных',
};

export const tableHeaderRowMessage = {
  sortingHint: 'Сортировать',
};
