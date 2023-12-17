import {formatDistanceToNow} from 'date-fns';

export const convertTimestampToRelativeTime = (timestamp: string) => {
  const parsedTimestamp = new Date(timestamp);

  return formatDistanceToNow(parsedTimestamp, {
    addSuffix: true,
    includeSeconds: true,
  });
};
