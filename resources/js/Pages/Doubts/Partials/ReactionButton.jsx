import {useForm} from "@inertiajs/react";
import { useState } from "react";

// Map reaction types to emojis
const reactionEmojis = {
    useful: "👍",
    clear: "✅",
    explain_in_class_please: "🙋"
};

// Map reaction types to colors
const reactionColors = {
    useful: "bg-blue-500 hover:bg-blue-600",
    clear: "bg-green-500 hover:bg-green-600",
    explain_in_class_please: "bg-purple-500 hover:bg-purple-600"
};

const ReactionButton = ({text, reactionType, doubtId, count, hasReacted}) => {
    const [isClicked, setIsClicked] = useState(false);

    const {post, processing} = useForm({
        doubtId: doubtId,
        reaction: reactionType
    });

    const manageReactionClick = () => {
        if (!disabled) {
            setIsClicked(true);
            setTimeout(() => setIsClicked(false), 300); // Reset after animation completes

            post(route('forum.react'), {
                preserveScroll: true,
            });
        }
    }

    const disabled = hasReacted || processing;
    const countText = count > 0 ? `(${count})` : null;
    const emoji = reactionEmojis[reactionType] || "";
    const colorClass = reactionColors[reactionType] || "bg-indigo-600 hover:bg-indigo-700";

    // Animation class when clicked
    const animationClass = isClicked ? "animate-pulse" : "";

    return (
        <button 
            role={"button"}
            value={reactionType}
            onClick={manageReactionClick}
            disabled={disabled}
            className={`${colorClass} text-white px-4 py-2 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-opacity-50 
                       disabled:opacity-50 transition-all duration-200 
                       w-48 mx-2 my-1 flex items-center justify-center ${animationClass}`}
        >
            <span className="mr-2">{emoji}</span> {text} {countText}
        </button>
    );
};

export default ReactionButton;
