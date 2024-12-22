import { TPost } from '../types/post.type';

interface TimeUnit {
    max: number;
    divisor: number;
    unit: string;
    plural: string;
}

export const getStartAndEndDates = (posts: TPost[]) => {
  if (!posts || posts.length === 0) {return { startDate: null, endDate: null };}

  const result = posts.reduce(
    (acc, post) => {
      const createdAt = new Date(post.createdAt);
      if (createdAt < acc.startDate) {acc.startDate = createdAt;}
      if (createdAt > acc.endDate) {acc.endDate = createdAt;}
      return acc;
    },
    { startDate: new Date(posts[0].createdAt), endDate: new Date(posts[0].createdAt) }
  );

  return {
    startDate: result.startDate.toISOString(),
    endDate: result.endDate.toISOString(),
  };
};

export const toISOFormat = (readableDate: string) => {
  const months = {
    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
    'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
    'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12',
  };

  const parts = readableDate.split(' ');
  if (parts.length === 2) {
    const [month, day] = parts;
    const year = new Date().getFullYear();
    return `${year}-${months[month]}-${day.padStart(2, '0')}`;
  } else { // "Jun 15 2024"
    const [month, day, year] = parts;
    return `${year}-${months[month]}-${day.padStart(2, '0')}`;
  }
};

export const toReadableFormat = (isoDate: string, referenceYear = new Date().getFullYear()) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const date = new Date(isoDate);
  const year = date.getFullYear();

  return year === referenceYear
    ? `${months[date.getMonth()]} ${date.getDate()}` // "Jun 15"
    : `${months[date.getMonth()]} ${date.getDate()} ${year}`; // "Jun 15 2024"
};

export class TimeFormatter {
    private static readonly units: TimeUnit[] = [
        { max: 60, divisor: 1, unit: 'just now', plural: 'just now' },              // seconds
    { max: 3600, divisor: 60, unit: 'minute ago', plural: 'minutes ago' },      // minutes
    { max: 86400, divisor: 3600, unit: 'hour ago', plural: 'hours ago' },       // hours
    { max: 604800, divisor: 86400, unit: 'day ago', plural: 'days ago' },       // days
    { max: 2628000, divisor: 604800, unit: 'week ago', plural: 'weeks ago' },   // weeks
    { max: 31536000, divisor: 2628000, unit: 'month ago', plural: 'months ago' }, // months
    { max: Infinity, divisor: 31536000, unit: 'year ago', plural: 'years ago' }, // years
    ];

    static format(date: string | Date): string {
        const timestamp = new Date(date).getTime();
        const now = new Date().getTime();
        const diff = Math.floor((now - timestamp) / 1000); // Convert to seconds

        // Handle future dates
        if (diff < 0) {
          return 'in the future';
        }

        // Find the appropriate time unit
        for (const unit of this.units) {
          if (diff < unit.max) {
            const value = Math.floor(diff / unit.divisor);

            // Special cases for immediate past
            if (unit.divisor === 1) {
              if (diff < 5) {return 'just now';}
              if (diff < 60) {return `${value} seconds ago`;}
            }

            // Regular cases
            return value === 1 ? `1 ${unit.unit}` : `${value} ${unit.plural}`;
          }
        }

        return this.formatDate(new Date(timestamp));
      }

      private static formatDate(date: Date): string {
        // Format dates older than a year with the actual date
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        const currentYear = new Date().getFullYear();

        // Only show year if it's different from current year
        return currentYear === year
          ? `${month} ${day}`
          : `${month} ${day}, ${year}`;
      }
}
