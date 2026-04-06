export type Department = {
  id: number;
  name: string;
  description: string;
  location: string;
  budget: number;
  createdAt: Date;
  expanded?: boolean;
};

export type NewDepartmentDto = {
  name: string;
  description: string;
  location: string;
  budget: number;
};

export const mockDepartments: Department[] = [
  {
    id: 1,
    name: 'Engineering',
    description: 'Handles core product development and technical innovation.',
    location: 'Sofia',
    budget: 420000,
    createdAt: new Date('2018-06-12'),
  },
  {
    id: 2,
    name: 'Human Resources',
    description: 'Manages employee relations, hiring, and company culture.',
    location: 'Plovdiv',
    budget: 120000,
    createdAt: new Date('2017-03-25'),
  },
  {
    id: 3,
    name: 'Marketing',
    description: 'Responsible for branding, campaigns, and market research.',
    location: 'Varna',
    budget: 210000,
    createdAt: new Date('2019-09-10'),
  },
  {
    id: 4,
    name: 'Sales',
    description: 'Focuses on revenue generation and client relationships.',
    location: 'Remote',
    budget: 310000,
    createdAt: new Date('2020-01-05'),
  },
  {
    id: 5,
    name: 'Finance',
    description:
      'Oversees budgeting, forecasting, and financial reporting. Oversees budgeting, forecasting, and financial reporting.',
    location: 'Sofia',
    budget: 275000,
    createdAt: new Date('2016-11-18'),
  },
  {
    id: 6,
    name: 'Customer Support',
    description: 'Provides assistance and support to customers.',
    location: 'Burgas',
    budget: 95000,
    createdAt: new Date('2021-04-22'),
  },
  {
    id: 7,
    name: 'IT Services',
    description: 'Maintains infrastructure and internal systems.',
    location: 'Sofia',
    budget: 180000,
    createdAt: new Date('2018-12-01'),
  },
];
