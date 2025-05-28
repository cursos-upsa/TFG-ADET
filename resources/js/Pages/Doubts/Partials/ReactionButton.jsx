import {useForm} from "@inertiajs/react";

const ReactionButton = ({text, reactionType, doubtId, count, hasReacted}) => {
    const {post, processing} = useForm({
        doubtId: doubtId,
        reaction: reactionType
    });

    const manageReactionClick = () => {
        post(route('forum.react'), {
            preserveScroll: true,
        });
    }

    const disabled = hasReacted || processing;
    const countText = count > 0 ? `(${count})` : null;

    return (
        <button role={"button"}
                value={reactionType}
                onClick={manageReactionClick}
                disabled={disabled}>
            {text} {countText}
        </button>
    );
};

export default ReactionButton;
