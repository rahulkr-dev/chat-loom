import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

 type AuthActionProp = {
    isPending:boolean,
    buttonLabel:string
}
export const AuthButton = ({isPending,buttonLabel}:AuthActionProp) => {
  return (
    <Button disabled={isPending}  type="submit" className="w-full disabled:cursor-not-allowed">
          
    {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait</>: buttonLabel }

     
    </Button>
  )
}
