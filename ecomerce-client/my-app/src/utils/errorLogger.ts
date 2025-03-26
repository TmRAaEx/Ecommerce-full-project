export default function errorChecker(error: any) {
    return (error instanceof Error) ? error.message : "Unknown error";
}