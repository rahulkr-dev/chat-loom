
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  to: string;
  label: string;
}

export const BackButton = ({
  to,
  label,
}: BackButtonProps) => {
  return (
    <Button
      variant="link"
      className="font-normal w-full"
      size="sm"
      asChild
    >
      <Link to={to}>
        {label}
      </Link>
    </Button>
  );
};
