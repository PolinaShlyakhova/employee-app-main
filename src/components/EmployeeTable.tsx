import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Employee } from '../features/employees/types';
import { formatDate, formatPhone } from '../features/employees/format';
import styles from './EmployeeTable.module.scss';

interface Props {
    employees: Employee[];
}

const EmployeeRow = memo(function EmployeeRow({ employee }: { employee: Employee }) {
    const to = `/employee/${employee.id}`;

    const cell = (content: string, className?: string, isFirst = false) => (
        <td className={className}>
            <Link to={to} className={styles.cellLink} tabIndex={isFirst ? undefined : -1}>
                {content}
            </Link>
        </td>
    );

    return (
        <tr>
            {cell(employee.name, undefined, true)}
            {cell(employee.position)}
            {cell(formatPhone(employee.phone), styles.phone)}
            {cell(formatDate(employee.birthdate), styles.birthdate)}
        </tr>
    );
});

export const EmployeeTable = memo(function EmployeeTable({ employees }: Props) {
    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Должность</th>
                        <th>Телефон</th>
                        <th className={styles.birthdate}>Дата рождения</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <EmployeeRow key={employee.id} employee={employee} />
                    ))}
                </tbody>
            </table>
        </div>
    );
});
