import { Comment } from "@/types/Comment"

interface CommentItemProps {
    comment: Comment;
}

export default function CommentItem({ comment: { text, user } }: CommentItemProps) {

    return (
        <div className="w-full">
            <div className="flex flex-col items-start gap-1.5 p-4 rounded-lg border-2 border-[#909090]">
                <span className=" bg-[#CCCCCC] rounded-sm p-1.5 text-sm">
                    {user.name}
                </span>
                <p>
                    {text}
                </p>
            </div>
        </div>
    )
}