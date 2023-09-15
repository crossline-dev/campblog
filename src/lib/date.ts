import { DateTime } from 'luxon'

export const formatDate = (dateStr: string) => {
  return DateTime.fromISO(dateStr).setZone('Asia/Tokyo').toFormat('yyyy.MM.dd')
}
