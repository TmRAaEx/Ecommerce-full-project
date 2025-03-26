import {useCustomers} from "@hooks/useCustomers.ts";
import CustomerCard from "@components/Admin/customers/CustomerCard.tsx";
import {ICustomer} from "@interfaces/ICustomer.ts";
import {FormEvent, useState} from "react";
import {SubmitButton} from "@ui/Buttons.tsx";
import CustomerForm from "@components/Admin/customers/CustomerForm.tsx";
import ConfirmModal from "@components/ConfirmModal.tsx";

export default function ManageCustomers() {
    const {customers, loading, error, updateCustomer, deleteCustomer, createCustomer} = useCustomers();

    const [formVisible, setFormVisible] = useState<boolean>(false)
    const [deleteTarget, setDeleteTarget] = useState<ICustomer["id"] | null>(null);
    if (loading) return <>loading...</>;
    if (error) return <>{error}</>;

    const handleUpdate = async (customer: ICustomer, e: FormEvent) => {
        e.preventDefault();
        await updateCustomer(customer);
    }
    const handleDelete = async (id: ICustomer["id"]) => {
        setDeleteTarget(id)
    }

    const toggleForm = () => {
        setFormVisible(!formVisible);
    }

    const confirmDelete = async () => {
        if (!deleteTarget) return;
        await deleteCustomer(deleteTarget);
    }

    const cancelDelete = () => {
        setDeleteTarget(null);
    }


    return (
        <>
            {deleteTarget && (
                <ConfirmModal
                    deleteText={`Are you sure you want to delete this customer?`}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}

            <div className="w-1/2 mx-auto mb-1">
                <SubmitButton onClick={toggleForm}>{formVisible ? "Cancel" : "Create Customer"}</SubmitButton>
            </div>
            {formVisible && <CustomerForm toggleForm={toggleForm} createCustomer={createCustomer}/>}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {customers?.map((customer) => (
                    <li className="w-full max-w-md mx-auto" key={customer.id}>
                        <CustomerCard customer={customer} update={handleUpdate} deleteHandler={handleDelete}/>
                    </li>
                ))}
            </ul>
        </>
    );
}
