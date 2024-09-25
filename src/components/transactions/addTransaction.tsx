import React, { useEffect } from 'react';
import { TransactionType, Transaction } from '../../types/transaction'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, FormGroup, Label, Form } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { SetState } from '../../types/commonType';
import { createTransaction, updateTransaction } from '../../api/transaction';
import addNotification from '../../utils/notification';
import _ from 'lodash'

interface addTransProps {
    isModalOpen: boolean,
    setIsModalOpen: (isOpen: boolean) => void;
    transactionList: Transaction[];
    //here i used generics to reuse the same set state function type for different sets tate functions
    // setTransactionList: SetState<Transaction[]>
    transaction?: Transaction
    setTransaction: SetState<Transaction>
    getData: () => void;
}


const AddTransaction: React.FC<addTransProps> = ({ isModalOpen, setIsModalOpen, transactionList, transaction, setTransaction, getData }) => {

    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Transaction title is required')
            .min(4, 'Title must be at least 4 characters long'),
        amount: Yup.number()
            .required('Amount is required')
            .min(1, 'Amount must be greater than 0'),
        traType: Yup.string()
            .oneOf([TransactionType.Expense, TransactionType.Income], 'Invalid transaction type')
            .required('Transaction type is required'),
        category: Yup.string()
            .required('Category is required')
            .min(2, 'Category must be at least 2 characters long'),
        date: Yup.date()
            .required('Date Is Required')
    });



    //here using Omit utility function to exclude id key while submission
    const handleSubmit = async (values: Omit<Transaction, '_id'>, { resetForm }: { resetForm: () => void }) => {
        let res;
        if (_.get(values, '_id')) {
            const id = _.get(transaction, '_id')
            console.log('id...', id)
            if (typeof id === 'string')
                res = await updateTransaction(id, { ...values, userId: localStorage.getItem('userId') })
        }
        else { res = await createTransaction({ ...values,userId: localStorage.getItem('userId') }); }
        if (res?.success === true) {
            addNotification({
                type: "success",
                title: "Success",
                message: "Transaction Added Successfully",
            });
        }
        getData()
        setTransaction({ title: '', amount: 0, traType: TransactionType.Expense, category: '', date: '' });
        resetForm();
    };

    useEffect(() => {
        if (transactionList?.length) {
            console.log('...transaction list', transactionList);
        }
    }, [transactionList])

    const closeModal = () => {
        console.log('RsetForm Is calling')
        setIsModalOpen(false);
    };

    return (
        <div>
            <Modal isOpen={isModalOpen} toggle={closeModal}>
                <ModalHeader toggle={closeModal}>Add Transaction</ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            _id: transaction?._id || '',
                            title: transaction?.title || '',
                            amount: transaction?.amount || 0,
                            traType: transaction?.traType || TransactionType.Expense,
                            category: transaction?.category || '',
                            date: transaction?.date || ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        validateOnChange={true}
                        validateOnBlur={true}
                        enableReinitialize
                    >
                        {
                            ({ handleChange, handleSubmit, values, errors, touched }) => (
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label for="title">Transaction Title</Label>
                                        <Input
                                            id="title"
                                            name='title'
                                            onChange={handleChange}
                                            value={values.title}
                                            required
                                        />
                                        {touched.title && errors.title ? (
                                            <div className="error-msg">{errors.title}</div>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="amount">Amount</Label>
                                        <Input
                                            id="amount"
                                            name='amount'
                                            onChange={handleChange}
                                            value={values.amount}
                                            required
                                        />
                                        {touched.amount && errors.amount ? (
                                            <div className="error-msg">{errors.amount}</div>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="type">Type</Label>
                                        <Input
                                            type="select"
                                            id="traType"
                                            name='traType'
                                            onChange={handleChange}
                                            value={values.traType}
                                            required
                                        >
                                            <option value={TransactionType.Expense}>Expense</option>
                                            <option value={TransactionType.Income}>Income</option>
                                        </Input>
                                        {touched.traType && errors.traType ? (
                                            <div className="error-msg">{errors.traType}</div>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="category">Category</Label>
                                        <Input
                                            id="category"
                                            name='category'
                                            value={values.category}
                                            onChange={handleChange}
                                            required
                                        />
                                        {touched.category && errors.category ? (
                                            <div className="error-msg">{errors.category}</div>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="date">Date</Label>
                                        <Input
                                            type="date"
                                            id="date"
                                            name='date'
                                            onChange={handleChange}
                                            value={values.date}
                                            required
                                        />
                                        {touched.date && errors.date ? (
                                            <div className="error-msg">{errors.date}</div>
                                        ) : null}
                                    </FormGroup>
                                    <Button type="submit" color="primary">Add Transaction</Button>
                                </Form>
                            )
                        }

                    </Formik>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={closeModal} >Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default AddTransaction;
