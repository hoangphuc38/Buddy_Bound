interface TimeUnit {
    max: number;
    divisor: number;
    unit: string;
    plural: string;
}

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