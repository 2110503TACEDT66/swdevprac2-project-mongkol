interface dentistItem {
  _id: string,
  name: string,
  yearsOfExperience: number,
  areaOfExpertise: string,
  __v: number,
  bookings: [],
  id: string
}

interface dentistJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: dentistItem[]
}

export interface bookItem {
  dentistId: string,
  bookingDate: string,
  userId: string
}