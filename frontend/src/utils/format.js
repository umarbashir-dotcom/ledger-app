export const formatTransactionDate = (dateInput) => {
  const date = new Date(dateInput);
  const now = new Date();

  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);

  const isToday = date.toDateString() === now.toDateString();
  const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === date.toDateString();

  if (isToday) {
    if (diffSec < 10) return 'Just now';
    if (diffSec < 60) return `${diffSec} sec${diffSec !== 1 ? 's' : ''} ago`;
    if (diffMin < 60) return `${diffMin} min${diffMin !== 1 ? 's' : ''} ago`;
    return `${diffHour} hr${diffHour !== 1 ? 's' : ''} ago`;
  }

  if (isYesterday) return 'Yesterday';

  // Older than yesterday — professional format: "Jun 1, 2025"
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export default formatTransactionDate