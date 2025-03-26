import AdminCreateForm from "@components/Admin/AdminCreateForm.tsx";
import PageContainer from "@ui/PageContainer.tsx";

export default function Register() {
    return <>
        <PageContainer className={"mx-auto max-w-[900px]"}>
            <AdminCreateForm/>
        </PageContainer>
    </>
}