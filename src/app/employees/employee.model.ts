import { Department, mockDepartments } from '../departments/department.model';

export type Employee = {
  id: number;
  name: string;
  email: string;
  departmentId: number;
  department?: Department;
  role: string;
  startDate: Date;
  salary: number;
  status: 'active' | 'inactive';
  expanded?: boolean;
};

export type NewEmployeeDto = {
  name: string;
  email: string;
  departmentId: number;
  department?: Department;
  role: string;
  startDate: Date;
  salary: number;
  status: 'active' | 'inactive';
};

const roles = ['Manager', 'Developer', 'Analyst', 'Specialist', 'Coordinator'];
const names = [
  'Ivan Petrov',
  'Maria Ivanova',
  'Georgi Georgiev',
  'Elena Dimitrova',
  'Petar Nikolov',
  'Sofia Popova',
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function generateEmployees(count: number): Employee[] {
  return Array.from({ length: count }, (_, i) => {
    const name = getRandomItem(names);
    return {
      id: i + 1,
      name,
      departmentId: getRandomItem(mockDepartments).id,
      startDate: getRandomDate(new Date(2018, 0, 1), new Date()),
      status: Math.random() > 0.2 ? 'active' : 'inactive',
      email: name.toLowerCase().replace(' ', '.') + '@company.com',
      role: getRandomItem(roles),
      salary: Math.floor(1000 + Math.random() * 4000),
      expanded: false,
    };
  });
}
