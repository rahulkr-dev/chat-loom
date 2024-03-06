import { Send,Smile } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { chatList, chatMsg } from "./seed";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

interface IChatObj {
  profileImage: string;
  username: string;
  lastMessage: string;
  lastDate: string;
  notification: number;
}
interface IChatListProps {
  chatList: IChatObj[];
}


export function AvatarProfile({
  src,
  alt,
  fallback,
}: {
  src: string;
  alt: string;
  fallback: string;
}) {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback.slice(0,2)}</AvatarFallback>
    </Avatar>
  );
}

const ChatListWrapper = ({ chatList }: IChatListProps) => {
  return (
    <ScrollArea className=" px-2 h-[calc(100vh-4rem)] ">
      {chatList.map((chat, index) => {
        return <ChatListItem key={index} chat={chat} />;
      })}
    </ScrollArea>
  );
};
const ChatListItem = ({ chat }: { chat: IChatObj }) => {
  return (
    <div className="cursor-pointer mt-2 grid grid-cols-12 text-sm hover:bg-accent transition-colors py-3 px-3 rounded-md">
      <div className="col-span-2">
        <AvatarProfile
          src={chat.profileImage}
          alt={chat.username}
          fallback={chat.username}
        />
      </div>
      <div className="col-span-7">
        <div className="font-semibold">{chat.username}</div>
        <div>{chat.lastMessage.length>19?chat.lastMessage.slice(0,18): chat.lastMessage}</div>
      </div>
      <div className="col-span-3 flex flex-col gap-2">
        <div className="text-[11px] text-end text-ring font-semibold">{chat.lastDate}</div>
        {
          Number(chat.notification) > 0 && (
            <div className="w-4 self-end p-3 text-end h-4 rounded-full text-primary bg-primary-foreground  flex justify-center items-center">
            {chat.notification}
          </div>
          )
        }
      
      </div>
    </div>
  );
};

const ChatBody = () => {
  return (
    <ScrollArea className="px-12 h-[calc(100vh-11rem)]">
      <div className="flex flex-col gap-3">
      {chatMsg.map((chat, index) => {
        return (
          <Chat
            key={index}
            type={chat.type}
            text={chat.text}
            createdAt={chat.createdAt}
          />
        );
      })}
      </div>
      
    </ScrollArea>
  );
};

const ChatHeader = ({
  username,
  status,
  profileImage,
}: {
  username: string;
  status: boolean;
  profileImage: string;
}) => {
  return (
    <div className="border-b-2 p-2">
      <div className="flex gap-3 justify-between">
        <AvatarProfile src={profileImage} alt={username} fallback={username} />
        <div>
          <div>{username}</div>
          <div className={cn("text-primary font-semibold")}>
            {status ? "Online" : "Offline"}
          </div>
        </div>
        {/* todo - remove this mode toggle to layout */}
        <ModeToggle />
      </div>
    </div>
  );
};
const Chat = ({
  type,
  text,
  // createdAt,
}: {
  type: string;
  text: string;
  createdAt: string;
}) => {
  const isSentMsg = type == "sent";
  return (
    <div className={cn("w-max",{"self-end ":isSentMsg})}>
      <div className={cn("py-2 px-4 bg-muted  text-sm rounded-xl",{"bg-primary  text-primary-foreground":isSentMsg})}>
        {text}
      </div>
      {/* <div className="text-xs text-gray-500">{createdAt.slice(0, 10)}</div> */}
    </div>
  );
};

const ChatInput = () => {
  return (
    <div className="h-16 px-12   border-t-2 grid grid-cols-8 gap-2 w-full justify-center items-center ">
      <div className="col-span-6 py-2 px-4 rounded-xl bg-primary-foreground text-black flex gap-2 items-center">
        <span className="text-5xl">
          <Smile className="text-destructive  cursor-pointer" />
        </span>
        <input
          type="text"
          className="w-full focus:outline-none bg-transparent"
        />
      </div>
      <div className="col-span-1">
        <div className="w-8 h-8 cursor-pointer bg-primary-foreground p-2 rounded-full flex justify-center items-center ">
          <Send className="text-destructive" />
        </div>
      </div>
    </div>
  );
};

const ChatContainer = () => {
  return (
    <div className="h-full">
      <ChatHeader
        username="rahulkr"
        status={true}
        profileImage="https://via.placeholder.com/150"
      />
      <ChatBody />
      <ChatInput />
    </div>
  );
};

const ChatPage = () => {
  return (
    <div className=" bg-background text-foreground grid grid-cols-12">
      <div className="col-span-3">
        <ChatListWrapper chatList={chatList} />
      </div>
      <div className="col-span-9 ">
        <ChatContainer />
      </div>
    </div>
  );
};

export default ChatPage;
