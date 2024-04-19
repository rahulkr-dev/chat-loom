import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { BackButton } from "@/components/back-button";
import { AuthHeader } from "@/pages/auth/component/auth-header";

interface CardWrapperProps {
  children: React.ReactNode;
  authLable: string;
  authTitle:string,
  backButtonLabel: string;
  backButtonHref: string;

}

export const AuthCardWrapper = ({
  children,
  authLable,
  backButtonLabel,
  backButtonHref,
  authTitle
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <AuthHeader label={authLable} title={authTitle} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          to={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};
