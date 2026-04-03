export type Employee = {
  id: number;
  name: string;
  department: string;
  startDate: Date;
  status: 'active' | 'inactive';
  expanded?: boolean;
};

export type NewEmployeeDto = {
  name: string;
  department: string;
  startDate: Date;
  status: 'active' | 'inactive';
};

export const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'Ivan Petrov',
    department: 'Engineering',
    startDate: new Date('2022-01-15'),
    status: 'active',
  },
  {
    id: 2,
    name: 'Maria Ivanova',
    department: 'Marketing',
    startDate: new Date('2021-11-03'),
    status: 'active',
  },
  {
    id: 3,
    name: 'Georgi Dimitrov',
    department: 'Finance',
    startDate: new Date('2020-06-20'),
    status: 'inactive',
  },
  {
    id: 4,
    name: 'Elena Georgieva',
    department: 'Human Resources',
    startDate: new Date('2023-02-10'),
    status: 'active',
  },
  {
    id: 5,
    name: 'Petar Nikolov',
    department: 'Engineering',
    startDate: new Date('2019-09-01'),
    status: 'inactive',
  },
  {
    id: 6,
    name: 'Desislava Stoyanova',
    department: 'Sales',
    startDate: new Date('2022-07-18'),
    status: 'active',
  },
  {
    id: 7,
    name: 'Nikolay Todorov',
    department: 'Support',
    startDate: new Date('2021-04-25'),
    status: 'active',
  },
  {
    id: 8,
    name: 'Kristina Angelova',
    department: 'Design',
    startDate: new Date('2023-05-12'),
    status: 'active',
  },
  {
    id: 9,
    name: 'Dimitar Vasilev',
    department: 'Engineering',
    startDate: new Date('2018-12-30'),
    status: 'inactive',
  },
  {
    id: 10,
    name: 'Teodora Koleva',
    department: 'Legal',
    startDate: new Date('2022-10-05'),
    status: 'active',
  },
];
