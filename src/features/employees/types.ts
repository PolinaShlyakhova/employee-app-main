export type GenderQuery = 'Male' | 'Female';
export type PositionQuery = 'Frontend' | 'Backend' | 'Analyst' | 'Manager' | 'Designer';
export type TechnologyQuery = 'CSharp' | 'React' | 'Java' | 'PHP' | 'Figma' | 'Word';

export interface Employee {
    id: number;
    name: string;
    photo: string;
    phone: string;
    gender: string;
    position: string;
    stack: string[];
    birthdate: string;
    dateOfEmployment: string;
}

export interface EmployeesQueryArg {
    name?: string;
    gender?: GenderQuery[];
    position?: PositionQuery[];
    stack?: TechnologyQuery[];
}
