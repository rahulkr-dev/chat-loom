import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const ChatHeaderSkeleton = () => {
  return <Skeleton className="h-20 w-full" />;
};

export const ChatSkeleton = () => {
  return (
    <div className="">
      <div className="flex gap-5 ">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};

export const ChatMessageSkeleton = ({className}:{className:string}) => {
  return <Skeleton className={cn("w-[250px] h-4",className)} />;
};

export const MessageInputSkeleton = () => {
  return <Skeleton className="h-20 w-[700px]" />;
};

export const ChatPageSkeleton = () => {
  return (
    <main className="grid grid-cols-12 gap-2 px-4 py-2 h-screen overflow-hidden">
      <aside className="col-span-3 space-y-3 overflow-hidden">
        {[...Array(20)].map((_, index) => (
          <ChatSkeleton key={index} />
        ))}
      </aside>
      <section className="col-span-9">
        <ChatHeaderSkeleton />
        <div className="flex flex-col gap-2 px-28 py-4">
        {[...Array(30)].map((_, index) => (
          <ChatMessageSkeleton className={cn({"self-end":Math.round(Math.random())%2==0})}  key={index} />
        ))}
        </div>
        <div className="absolute bottom-0 right-40">

        <MessageInputSkeleton />
        </div>
      </section>
    </main>
  );
};
