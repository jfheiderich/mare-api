interface ICandidate {
  id?: string;
  created_at?: Date;
  destroyed_at?: Date;
  updated_at?: Date;
  experiences: IExperience[];
  cpf: string;
  name: string;
  birthDate: string;
  phone: string;
  cep: string;
  city: string;
  state: string;
  neighborhood: string;
  pcd: string;
  gender: string;
  race: string;
  education: string;
  courses: string;
}

interface IExperience {
  id: string;
  created_at: Date;
  candidateId: string;
  destroyed_at: Date;
  updated_at: Date;
  role: string;
  time: string;
}
