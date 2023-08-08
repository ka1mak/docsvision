// Конвертирует дату в формат локализованной строки с использованием toLocaleString().

// {string | Date} date - Дата, которую необходимо сконвертировать. Может быть строкой или объектом типа Date.
// {string} - Строка, представляющая дату в локализованном формате.
export const dateConverter = (date: string | Date) => {
  return new Date(date).toLocaleString()
}
