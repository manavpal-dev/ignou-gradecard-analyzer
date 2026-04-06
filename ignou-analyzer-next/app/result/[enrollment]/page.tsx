import ResultPage from "./ResultClient";

export async function generateMetadata({ params, searchParams }: any) {
    const enrollment = params.enrollment;
    const program = searchParams.program;

    return {
        title: `IGNOU Result ${enrollment} – Grade Card & Percentage`,
        description: `Check IGNOU grade card and result status for enrollment ${enrollment}. View marks, percentage and completion status.`,
    };
}

export default function page() {
    return <ResultPage />
}