import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox, MenuItem, IconButton, FormControlLabel, Box, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Employee from '../../../types/Employee';
import fakeCompanies from '../../../fake_data/Companies';
import fakeDepartments from '../../../fake_data/Departments';
import fakeEmployees from '../../../fake_data/Employees';
import fakePositions from '../../../fake_data/Positions';
import fakeContractTypes from '../../../fake_data/ContractTypes';
import fakeRoles from '../../../fake_data/Roles';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

interface EditEmployeeModalProps {
    open: boolean;
    onClose: () => void;
    employee: Employee | null;
    onSave: (updatedEmployee: Employee) => void;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ open, onClose, employee, onSave }) => {
    const { t } = useTranslation();

    const MAX_PHONE_FIELDS = 3;
    const [phones, setPhones] = useState([""])

    const handleAddPhone = (values: any, setFieldValue: any) => {
        if (values.phone.length < MAX_PHONE_FIELDS) {
            const newPhones = [...values.phone, ""];
            setPhones(newPhones);
            setFieldValue("phone", newPhones);
        }
    };

    const handleRemovePhone = (index: number, setFieldValue: any) => {
        const updatedPhones = [...phones];
        updatedPhones.splice(index, 1);
        setPhones(updatedPhones);
        setFieldValue("phone", updatedPhones);
    };

    const initialValues: Employee = {
        uuid: employee?.uuid || '',
        externalUUID: employee?.externalUUID || '',
        company: {
            uuid: employee?.company?.uuid || '',
            name: employee?.company?.name || '',
        },
        department: {
            uuid: employee?.department?.uuid || '',
            name: employee?.department?.name || '',
        },
        position: {
            uuid: employee?.position?.uuid || '',
            name: employee?.position?.name || '',
        },
        contractType: {
            uuid: employee?.contractType?.uuid || '',
            name: employee?.contractType?.name || '',
        },
        role: {
            uuid: employee?.role?.uuid || '',
            name: employee?.role?.name || '',
        },
        employeeSuperior: {
            uuid: employee?.employeeSuperior.uuid || '',
            firstName: employee?.employeeSuperior.firstName || '',
            lastName: employee?.employeeSuperior.lastName || '',
        },
        firstName: employee?.firstName || '',
        lastName: employee?.lastName || '',
        pesel: employee?.pesel || '',
        email: employee?.email || '',
        phone: employee?.phone || [],
        employmentFrom: employee?.employmentFrom || '',
        employmentTo: employee?.employmentTo || '',
        active: employee?.active || false,
        address: {
            country: employee?.address?.country || '',
            city: employee?.address?.city || '',
            postcode: employee?.address?.postcode || '',
            street: employee?.address?.street || '',
        },
        createdAt: employee?.createdAt || '',
        updatedAt: employee?.updatedAt || '',
        deletedAt: employee?.deletedAt || '',
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required(t('validation.fieldIsRequired')),
        lastName: Yup.string().required(t('validation.fieldIsRequired')),
        pesel: Yup.string().required(t('validation.fieldIsRequired')),
        email: Yup.string().required(t('validation.fieldIsRequired')),
        employmentFrom: Yup.string().required(t('validation.fieldIsRequired')),
        company: Yup.object().shape({
            uuid: Yup.string().required(t('validation.fieldIsRequired')),
        }),
        department: Yup.object().shape({
            uuid: Yup.string().required(t('validation.fieldIsRequired')),
        }),
        position: Yup.object().shape({
            uuid: Yup.string().required(t('validation.fieldIsRequired')),
        }),
        role: Yup.object().shape({
            uuid: Yup.string().required(t('validation.fieldIsRequired')),
        }),
        address: Yup.object().shape({
            country: Yup.string().required(t('validation.fieldIsRequired')),
            city: Yup.string().required(t('validation.fieldIsRequired')),
            postcode: Yup.string().required(t('validation.fieldIsRequired')),
            street: Yup.string().required(t('validation.fieldIsRequired')),
        }),
        contractType: Yup.object().shape({
            uuid: Yup.string().required(t('validation.fieldIsRequired')),
        }),
        // phone: Yup.array()
        //     .min(1, "At least one phone number is required")
        //     .of(
        //         Yup.string()
        //             .test('is-not-empty', t('validation.fieldIsRequired'), (value, context) => {
        //                 console.log(context.parent[0]);
        //                 if (context.parent[0] === value || context.parent[0] === undefined || context.parent[0] === '') {
        //                     return false;
        //                 }
        //                 return true;
        //             })
        //             .required(t('validation.fieldIsRequired'))
        //     )
        //     .required(t('validation.fieldIsRequired')),
    });

    const filteredEmployees = fakeEmployees.filter(emp => emp.uuid !== employee?.uuid && emp.active);

    const handleSubmit = (values: Employee) => {
        if (employee) {
            onSave({ ...employee, ...values });
            onClose();
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle sx={{ backgroundColor: '#34495e', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                {t('employee.modal.edit.title')}
            </DialogTitle>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, setFieldValue, handleChange }) => (
                    <Form noValidate>
                        <DialogContent>
                            <Box
                                display="grid"
                                gridTemplateColumns="repeat(4, 1fr)"
                                gap={2}
                            >
                                {/* Kolumna 1 */}
                                <Box sx={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    transition: 'border-color 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#34495e',
                                    },
                                }}
                                >
                                    <Typography sx={{ marginBottom: 1 }}>{t('employee.form.box.personalData')}</Typography>
                                    <Field
                                        as={TextField}
                                        name="firstName"
                                        label={t('employee.form.field.firstName')}
                                        value={values.firstName}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        error={touched.firstName && Boolean(errors.firstName)}
                                        helperText={touched.firstName && errors.firstName}
                                        required
                                    />
                                    <Field
                                        as={TextField}
                                        name="lastName"
                                        label={t('employee.form.field.lastName')}
                                        value={values.lastName}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        error={touched.lastName && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                        required
                                    />
                                    <Field
                                        as={TextField}
                                        name="pesel"
                                        label={t('employee.form.field.pesel')}
                                        value={values.pesel}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                        error={touched.pesel && Boolean(errors.pesel)}
                                        helperText={touched.pesel && errors.pesel}
                                        required
                                    />
                                    <Field
                                        as={TextField}
                                        type="email"
                                        name="email"
                                        label={t('employee.form.field.email')}
                                        value={values.email}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                        required
                                    />
                                    <Box>
                                        {values.phone.map((_, index) => (
                                            <Box
                                                key={index}
                                                display="flex"
                                                alignItems="center"
                                                mb={2}
                                            >
                                                <Field
                                                    as={TextField}
                                                    name={`phone[${index}]`}
                                                    type="tel"
                                                    label={`${t('employee.form.field.phone')} ${index + 1}`}
                                                    fullWidth
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        const target = e.target;
                                                        const updatedPhones = [...phones];
                                                        updatedPhones[index] = target.value;
                                                        setPhones(updatedPhones);
                                                        setFieldValue("phone", updatedPhones);
                                                    }}
                                                    error={touched.phone && index === 0 && Boolean(errors.phone?.[index])}
                                                    helperText={touched.phone && index === 0 && errors.phone?.[index]}
                                                    required={index === 0}
                                                />
                                                {index > 0 && (
                                                    <IconButton
                                                        onClick={() => handleRemovePhone(index, setFieldValue)}
                                                        color="error"
                                                        sx={{ ml: 1 }}
                                                    >
                                                        <RemoveCircleOutlineIcon />
                                                    </IconButton>
                                                )}
                                            </Box>
                                        ))}

                                        {phones.length < MAX_PHONE_FIELDS && (
                                            <Box display="flex" alignItems="center">
                                                <IconButton onClick={() => handleAddPhone(values, setFieldValue)} color="primary">
                                                    <AddCircleOutlineIcon />
                                                </IconButton>
                                                <Typography variant="body2" ml={1}>
                                                    {t('common.addAnotherPhoneNumber')}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>

                                {/* Kolumna 2 */}
                                <Box sx={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    transition: 'border-color 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#34495e',
                                    },
                                }}>
                                    <Typography sx={{ marginBottom: 1 }}>{t('employee.form.box.employmentData')}</Typography>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="companyUUID"
                                        label={t('employee.form.field.company')}
                                        value={values.company.uuid}
                                        onChange={handleChange}
                                        variant="outlined"
                                        margin="normal"
                                        error={touched?.company?.uuid && Boolean(errors?.company?.uuid)}
                                        helperText={touched?.company?.uuid && errors?.company?.uuid}
                                        required
                                    >
                                        {fakeCompanies.map(company => <MenuItem key={company.uuid} value={company.uuid}>{company.fullName}</MenuItem>)}
                                    </Field>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="department.uuid"
                                        label={t('employee.form.field.department')}
                                        value={values.department.uuid}
                                        onChange={handleChange}
                                        variant="outlined"
                                        margin="normal"
                                        error={touched?.department?.uuid && Boolean(errors?.department?.uuid)}
                                        helperText={touched?.department?.uuid && errors?.department?.uuid}
                                        required
                                    >
                                        {fakeDepartments.map(department => <MenuItem key={department.uuid} value={department.uuid}>{department.name}</MenuItem>)}
                                    </Field>
                                    <Field
                                        as={TextField}
                                        name="externalUUID"
                                        label={t('employee.form.field.externalUUID')}
                                        value={values.externalUUID}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="employeeSuperior.uuid"
                                        label={t('employee.form.field.employeeSuperior')}
                                        value={values.employeeSuperior.uuid}
                                        onChange={handleChange}
                                        variant="outlined"
                                        margin="normal"
                                    >
                                        {filteredEmployees.map((emp) => (
                                            <MenuItem key={emp.uuid} value={emp.uuid}>
                                                {emp.firstName} {emp.lastName}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                    <Field
                                        as={TextField}
                                        type="date"
                                        name="employmentFrom"
                                        label={t('employee.form.field.employmentFrom')}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                        error={touched.employmentFrom && Boolean(errors.employmentFrom)}
                                        helperText={touched.employmentFrom && errors.employmentFrom}
                                        required
                                    />
                                    <Field
                                        as={TextField}
                                        type="date"
                                        name="employmentTo"
                                        label={t('employee.form.field.employmentTo')}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="position.uuid"
                                        label={t('employee.form.field.position')}
                                        value={values.position.uuid}
                                        variant="outlined"
                                        margin="normal"
                                        error={touched?.position?.uuid && Boolean(errors?.position?.uuid)}
                                        helperText={touched?.position?.uuid && errors?.position?.uuid}
                                        required
                                    >
                                        {fakePositions.map(position => <MenuItem key={position.uuid} value={position.uuid}>{position.name}</MenuItem>)}
                                    </Field>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="contractType.uuid"
                                        label={t('employee.form.field.contractType')}
                                        variant="outlined"
                                        margin="normal"
                                        error={touched?.contractType?.uuid && Boolean(errors?.contractType?.uuid)}
                                        helperText={touched?.contractType?.uuid && errors?.contractType?.uuid}
                                    >
                                        {fakeContractTypes.map(contractType => <MenuItem key={contractType.uuid} value={contractType.uuid}>{contractType.name}</MenuItem>)}
                                    </Field>
                                    <FormControlLabel
                                        control={
                                            <Field
                                                as={Checkbox}
                                                name="active"
                                                color="primary"
                                                onChange={handleChange}
                                                checked={values.active}
                                            />
                                        }
                                        label={t('employee.form.field.active')}
                                    />
                                </Box>

                                {/* Kolumna 3 */}
                                <Box sx={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    transition: 'border-color 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#34495e',
                                    },
                                }}>
                                    <Typography sx={{ marginBottom: 1 }}>{t('employee.form.box.addressData')}</Typography>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="address.country"
                                        label={t('employee.form.field.country')}
                                        value={values.address.country}
                                        variant="outlined"
                                        margin="normal"
                                        error={touched?.address?.country && Boolean(errors?.address?.country)}
                                        helperText={touched?.address?.country && errors?.address?.country}
                                        required
                                    >
                                        <MenuItem value="Polska">Polska</MenuItem>
                                        <MenuItem value="Anglia">Anglia</MenuItem>
                                        <MenuItem value="Niemcy">Niemcy</MenuItem>
                                    </Field>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="city"
                                        label={t('employee.form.field.city')}
                                        value={values.address.city}
                                        variant="outlined"
                                        margin="normal"
                                        error={touched?.address?.city && Boolean(errors?.address?.city)}
                                        helperText={touched?.address?.city && errors?.address?.city}
                                        required
                                    >
                                        <MenuItem value="Gdańsk">Gdańsk</MenuItem>
                                        <MenuItem value="Sopot">Sopot</MenuItem>
                                        <MenuItem value="Gdynia">Gdynia</MenuItem>
                                    </Field>
                                    <Field
                                        as={TextField}
                                        name="address.postcode"
                                        label={t('employee.form.field.postcode')}
                                        value={values.address.postcode}
                                        fullWidth
                                        margin="normal"
                                        error={touched?.address?.postcode && Boolean(errors?.address?.postcode)}
                                        helperText={touched?.address?.postcode && errors?.address?.postcode}
                                        required
                                    />
                                    <Field
                                        as={TextField}
                                        name="address.street"
                                        label={t('employee.form.field.address')}
                                        value={values.address.street}
                                        fullWidth
                                        margin="normal"
                                        error={touched?.address?.street && Boolean(errors?.address?.street)}
                                        helperText={touched?.address?.street && errors?.address?.street}
                                        required
                                    />
                                </Box>
                                {/* Kolumna 4 */}
                                <Box sx={{
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    transition: 'border-color 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#34495e',
                                    },
                                }}>
                                    <Typography sx={{ marginBottom: 1 }}>{t('employee.form.box.systemData')}</Typography>
                                    <Field
                                        as={TextField}
                                        select
                                        fullWidth
                                        name="role.uuid"
                                        label={t('employee.form.field.role')}
                                        value={values.role.uuid}
                                        variant="outlined"
                                        margin="normal"
                                        error={touched?.role?.uuid && Boolean(errors?.role?.uuid)}
                                        helperText={touched?.role?.uuid && errors?.role?.uuid}
                                        required
                                    >
                                        {fakeRoles.map(role => <MenuItem key={role.uuid} value={role.uuid}>{role.name}</MenuItem>)}
                                    </Field>
                                    <Field
                                        as={TextField}
                                        type="datetime-local"
                                        name="createdAt"
                                        label={t('employee.form.field.createdAt')}
                                        value={values.createdAt}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ step: 1 }}
                                    />
                                    <Field
                                        as={TextField}
                                        type="datetime-local"
                                        name="updatedAt"
                                        label={t('employee.form.field.updatedAt')}
                                        value={values.updatedAt}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <Field
                                        as={TextField}
                                        type="datetime-local"
                                        name="deletedAt"
                                        label={t('employee.form.field.deletedAt')}
                                        value={values.deletedAt}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Box>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onClose} variant="contained" sx={{ backgroundColor: '#999a99', color: 'white', fontWeight: 'bold' }}>
                                {t('common.button.cancel')}
                            </Button>
                            <Button type="submit" variant="contained" sx={{ backgroundColor: '#34495e', color: 'white', fontWeight: 'bold' }}>
                                {t('common.button.save')}
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

export default EditEmployeeModal;