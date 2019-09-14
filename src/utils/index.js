import moment from 'moment'
const now = moment()

const timeFromNowAgo = (timeStr) => {
  const articleEditedDate = moment(timeStr, 'YYYY-MM-DDTHH:mm:sss')
  const daysDiff = now.diff(articleEditedDate, 'days')
  if (daysDiff > 0) {
    return `${daysDiff} days ago`
  }

  const hoursDiff = now.diff(articleEditedDate, 'hours')

  if (hoursDiff > 0) {
    return `${hoursDiff} hours ago`
  }

  const minsDiff = now.diff(articleEditedDate, 'minutes')
  return `${minsDiff} minutes ago`
}

export { timeFromNowAgo }
