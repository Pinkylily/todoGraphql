import ErrorFallback from "@/common/components/errorFallback/ErrorFallback";

export const FallbackList: React.FC = () => (
  <ErrorFallback message="La liste n'a pas pu être récupérée." />
);
