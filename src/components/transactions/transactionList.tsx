import React from "react";
import { Table, Button, Card, CardBody, CardTitle } from "reactstrap";
import { SetState } from "../../types/commonType";
import { Transaction } from "../../types/transaction";
import { deleteTransaction } from "../../api/transaction";
import addNotification from "../../utils/notification";
import './transactions.scss'
import { isValidItem } from "../../types/transaction";


interface transListProps {
    transactionList: Transaction[];
    setTransaction?: SetState<Transaction>
    setIsModalOpen?: (isOpen: boolean) => void;
    getData?: () => void;
    isList: boolean;
    tableTitle: string;
    totalValue?: number;
}

const TransactionList: React.FC<transListProps> = ({ transactionList, setTransaction, setIsModalOpen, getData, isList = false, tableTitle, totalValue }) => {


    // Delete handler
    const handleDelete = async (id?: string) => {
        //used type guard here
        if (typeof id === 'string') {
            const res = await deleteTransaction(id);
            console.log('res on delete ', res);
            if (res?.success === true) {
                addNotification({
                    type: "success",
                    title: "Success",
                    message: "Transaction Deleted Successfully",
                });
            }
            //using type guard
            if (typeof getData === 'function') {
                getData()
            }
        }
    };

    // Edit handler (this is just a placeholder, you'd implement edit functionality in detail)
    const handleEdit = (id?: string) => {
        console.log('Editing transaction with ID:', id);
        const item = transactionList.find((item) => item?._id === id)

        if (isValidItem(item)) {
            if (setTransaction && setIsModalOpen) {
                setTransaction({ ...item });
                setIsModalOpen(true)
            }
        }
    };

    return (
        <>

            {transactionList?.length >= 1 && (
                <Card className="mt-4 shadow border-0 transactionListContainer" style={{ width: '100%', maxWidth: '100%' }}>
                    <CardBody className="p-0">
                        <CardTitle><h5>{tableTitle}</h5></CardTitle>
                        <Table striped responsive className="mb-0 mt-2" style={{ width: '100%', maxWidth: '100%' }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Amount</th>
                                    <th>Date Of Transaction</th>
                                    <th>Type</th>
                                    <th>Category</th>
                                    {!isList && <th>Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {transactionList.map((transaction, index) => (
                                    <tr key={transaction._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{transaction.title}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{transaction.date}</td>
                                        <td>{transaction.traType}</td>
                                        <td>{transaction.category}</td>
                                        {!isList && <td>
                                            <Button
                                                color="warning"
                                                size="sm"
                                                onClick={() => handleEdit(transaction?._id)}
                                            >
                                                Edit
                                            </Button>{' '}
                                            <Button
                                                color="danger"
                                                size="sm"
                                                onClick={() => handleDelete(transaction?._id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>}

                                    </tr>
                                ))}
                                {transactionList?.length >= 1 &&  isList && <tr>
                                    <td><h6>Total {tableTitle} = {totalValue}</h6></td>
                                </tr>}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            )}
        </>
    );
};

export default TransactionList;
