export interface dentistItem {
  _id: string,
  name: string,
  yearsOfExperience: number,
  areaOfExpertise: string,
  __v: number,
  bookings: [],
  id: string
}

export interface dentistJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: dentistItem[]
}

export interface bookItem {
  _id: string,
  dentistId: string,
  bookDate: Date,
  userId: string
  username:string
  dentistname:string
}

// export interface 