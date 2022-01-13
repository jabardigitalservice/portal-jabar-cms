import { format, isValid } from 'date-fns';
import { id } from 'date-fns/locale';

/**
 * Date format according to the given pattern
 *
 * @param {string, date} date - raw date to format
 * @param {string} pattern - pattern use to format the date
 * Check out {@link https://date-fns.org/v2.28.0/docs/format | date-fns official docs}
 * for more information
 * @returns {string}
 */
export const formatDate = (date, pattern = 'dd/MM/yyyy') => {
  const rawDate = new Date(date);

  if (isValid(rawDate)) {
    return format(rawDate, pattern, { locale: id });
  }

  return date;
};
