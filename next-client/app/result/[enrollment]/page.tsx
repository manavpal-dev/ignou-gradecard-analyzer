import ResultPage from "./ResultClient";

type Props = {
  params: Promise<{
    enrollment: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props) {
  const { enrollment } = await params;

  return {
    title: `IGNOU Result ${enrollment} – Grade Card & Percentage`,
    description: `Check IGNOU grade card and result status for enrollment ${enrollment}. View marks, percentage and completion status.`,
  };
}

export default function Page() {
  return <ResultPage />;
}