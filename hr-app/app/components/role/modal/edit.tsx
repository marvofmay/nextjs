import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Role from '../../../types/Role';

interface EditRoleModalProps {
    open: boolean;
    onClose: () => void;
    role: Role | null;
    onSave: (updatedRole: Role) => void;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().optional(),
});

const EditRoleModal: React.FC<EditRoleModalProps> = ({ open, onClose, role, onSave }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ backgroundColor: '#1A237E', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                Edit Role
            </DialogTitle>
            <Formik
                initialValues={{
                    name: role?.name || '',
                    description: role?.description || '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    if (role) {
                        onSave({ ...role, ...values });
                        onClose();
                    }
                }}
            >
                {({ errors, touched, handleChange }) => (
                    <Form>
                        <DialogContent>
                            <Field
                                as={TextField}
                                fullWidth
                                name="name"
                                label="Name"
                                variant="outlined"
                                margin="dense"
                                onChange={handleChange}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                            />
                            <Field
                                as={TextField}
                                fullWidth
                                name="description"
                                label="Description"
                                variant="outlined"
                                margin="dense"
                                onChange={handleChange}
                                error={touched.description && Boolean(errors.description)}
                                helperText={touched.description && errors.description}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onClose} sx={{ backgroundColor: '#999a99', color: 'white', fontWeight: 'bold' }} variant="contained">
                                Cancel
                            </Button>
                            <Button type="submit" sx={{ backgroundColor: '#1A237E', color: 'white', fontWeight: 'bold' }} variant="contained">
                                Save
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

export default EditRoleModal;
