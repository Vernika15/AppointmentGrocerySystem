export interface Appointment {
  id: string;
  name: string;
  date: string;
  doctor: string;
  slot: string;
  purpose: string;
}

export interface State {
  appointments: Appointment[];
  form: Partial<Appointment>; // allows progressive form filling
  doctors: string[];
  availableSlots: string[];
}
