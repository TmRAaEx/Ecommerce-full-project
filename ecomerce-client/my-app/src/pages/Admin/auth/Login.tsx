import AdminLoginForm from "@components/Admin/AdminLoginForm.tsx";
import PageContainer from "@ui/PageContainer.tsx";

export default function Login() {
    return <>
        <PageContainer className={"mx-auto max-w-[900px]"}>
            <AdminLoginForm/>
        </PageContainer>
    </>
}