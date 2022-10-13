interface IAddress {
  city?: string;
  geo?: {
    lat: string;
    lng: string;
  };
  street?: string;
  suite?: string;
  zipcode?: string;
}

interface ICompany {
  bs: string;
  catchPhrase: string;
  name: string;
}

interface IPersonalData {
  id: number;
  name: string;
  username?: string;
  phone?: string;
  email: string;
  website?: string;
  address?: IAddress;
  company?: ICompany;
}

type TTableData = Pick<IPersonalData, "id" | "name" | "username" | "email"> &
  Pick<IAddress, "city">;

interface IFormData {
  name: string;
  email: string;
}
