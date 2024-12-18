import React from 'react';
import Employee from '../../../types/Employee';
import Preview from '../../modal/preview';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'react-i18next';
import fakeEmployees from '../../../fake_data/Employees';

interface PreviewEmployeeModalProps {
    open: boolean;
    selectedEmployee: Employee | null;
    onClose: () => void;
}

const PreviewEmployeeModal: React.FC<PreviewEmployeeModalProps> = ({ open, selectedEmployee, onClose }) => {
    const { t } = useTranslation();

    const employeeSuperior = fakeEmployees.find(
        (emp) => emp.uuid === selectedEmployee?.employeeUUID && emp.active
    );

    return (
        <Preview
            open={open}
            title={t('employee.modal.preview.title')}
            details={{

                UUID: selectedEmployee?.uuid || 'N/D',
                [t('employee.form.field.firstName')]: selectedEmployee?.firstName || 'N/D',
                [t('employee.form.field.lastName')]: selectedEmployee?.lastName || 'N/D',
                [t('employee.form.field.birth')]: selectedEmployee?.birth || 'N/D',
                [t('employee.form.field.email')]: selectedEmployee?.email || 'N/D',
                [t('employee.form.field.phone')]: selectedEmployee?.phone && selectedEmployee?.phone.length > 0
                    ? selectedEmployee.phone.join(', ')
                    : 'N/D',

                [t('employee.form.field.company')]: selectedEmployee?.companyUUID || 'N/D',
                [t('employee.form.field.department')]: selectedEmployee?.departmentUUID || 'N/D',
                [t('employee.form.field.employeeSuperior')]: employeeSuperior ? `${employeeSuperior.firstName} ${employeeSuperior.lastName} (${employeeSuperior.uuid})` : 'N/D',
                [t('employee.form.field.employmentFrom')]: selectedEmployee?.employmentFrom || 'N/D',
                [t('employee.form.field.employmentTo')]: selectedEmployee?.employmentTo || 'N/D',
                [t('employee.form.field.position')]: selectedEmployee?.positionUUID || 'N/D',
                [t('employee.form.field.contractType')]: selectedEmployee?.contractTypeUUID || 'N/D',
                [t('employee.form.field.active')]: selectedEmployee?.active === true ? (<CheckCircleIcon color="success" fontSize="small" />) : selectedEmployee?.active === false ? (<CancelIcon color="error" fontSize="small" />) : 'N/D',

                [t('employee.form.field.country')]: selectedEmployee?.country || 'N/D',
                [t('employee.form.field.city')]: selectedEmployee?.city || 'N/D',
                [t('employee.form.field.postcode')]: selectedEmployee?.postcode || 'N/D',
                [t('employee.form.field.address')]: selectedEmployee?.address || 'N/D',

                [t('employee.form.field.role')]: selectedEmployee?.roleUUID || 'N/D',
                [t('employee.form.field.createdAt')]: selectedEmployee?.createdAt || 'N/D',
                [t('employee.form.field.updatedAt')]: selectedEmployee?.updatedAt || 'N/D',
                [t('employee.form.field.updatedAt')]: selectedEmployee?.deletedAt || 'N/D',
            }}
            onClose={onClose}
        />
    );
};

export default PreviewEmployeeModal;