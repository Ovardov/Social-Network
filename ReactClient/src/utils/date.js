export const getTimeDifference = (createdDate) => {
  // Timestamps -> Date.now() method returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.
  const currentTimeInMs = new Date()
  const createdDateInMs = new Date(createdDate)

  // Calculate difference time between two dates in milliseconds
  const differenceInMs = currentTimeInMs - createdDateInMs

  // Constants
  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerMonth = msPerDay * 30
  const msPerYear = msPerDay * 365

  // Seconds
  if (differenceInMs < msPerMinute) {
    return Math.floor(differenceInMs / 1000) + ' seconds ago'
    // Minutes
  } else if (differenceInMs < msPerHour) {
    return Math.floor(differenceInMs / msPerMinute) + ' minutes ago'
    // Hours
  } else if (differenceInMs < msPerDay) {
    return Math.floor(differenceInMs / msPerHour) + ' hours ago'
    // Days
  } else if (differenceInMs < msPerMonth) {
    return Math.floor(differenceInMs / msPerDay) + ' days ago'
    // Months
  } else if (differenceInMs < msPerYear) {
    return Math.floor(differenceInMs / msPerMonth) + ' months ago'
    // Years
  } else {
    return Math.floor(differenceInMs / msPerYear) + ' years ago'
  }
}
