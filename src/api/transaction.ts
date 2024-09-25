import _ from 'lodash'
import { Transaction } from '../types/transaction';
import axiosInstance from '../axiosConfig';
import addNotification from '../utils/notification';

// Get all transactions
export const getTransactions = async () => {
    try {
        const response = await axiosInstance.get(`/transaction/${localStorage.getItem('userId')}`);
        return response?.data;
    }
    catch (err) {
        console.log('err in get api fe', err)
        addNotification({
            type: "danger",
            title: "Error",
            message: _.get(
                err,
                "response.data.message",
                "Oops! Something went wrong"
            ),
        });
    }
};

// Create a new transaction
export const createTransaction = async (transaction: Transaction) => {
    try {
        const response = await axiosInstance.post(`/transaction`, transaction);
        return response.data;
    }
    catch (err) {
        console.log('err in create api fe', err)
        addNotification({
            type: "danger",
            title: "Error",
            message: _.get(
                err,
                "response.data.message",
                "Oops! Something went wrong"
            ),
        });
    }
    
};

// Update an existing transaction
export const updateTransaction = async (id: string, transaction: Transaction) => {
    try {
        const response = await axiosInstance.put<Transaction>(`/transaction/${id}`, transaction);
        return response.data;
    }
    catch (err) {
        console.log('FE err in update ', err)
        addNotification({
            type: "danger",
            title: "Error",
            message: _.get(
                err,
                "response.data.message",
                "Oops! Something went wrong"
            ),
        });
    }
};

// Delete a transaction
export const deleteTransaction = async (_id: string) => {
    try {
        const response = await axiosInstance.delete(`/transaction/${_id}`);
        return response.data;
    }
    catch (err) {
        console.log('err in delete fe api', err)
        addNotification({
            type: "danger",
            title: "Error",
            message: _.get(
                err,
                "response.data.message",
                "Oops! Something went wrong"
            ),
        });
    }
  
};
