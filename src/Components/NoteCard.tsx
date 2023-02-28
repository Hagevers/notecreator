import { useState, Dispatch, SetStateAction } from "react";
import ReactMarkdown from "react-markdown";
import { type RouterOutputs } from "~/utils/api";

type Note = RouterOutputs["note"]["getAll"][0];

export const NoteCard = ({
    note,
    onDelete,
    loading,
}: {
    note: Note,
    onDelete: () => Promise<void>,
    loading: boolean,
}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

    return (
        <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
            <div className="card-body m-0 p-3">
                <div
                    className={`collapse-arrow ${isExpanded ? "collapse-open" : ""
                        } collapse`}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="collapse-title text-xl font-bold">{note.title}</div>
                    <div className="collapse-content">
                        <article className="prose lg:prose-xl">
                            <ReactMarkdown>{note.content}</ReactMarkdown>
                        </article>
                    </div>
                </div>
                <div className="card-actions mx-2 flex justify-end">
                    <button
                        className={`btn-warning btn-xs btn px-5 ${loading ? 'loading' : '' }`}
                        onClick={onDelete}
                        disabled={note.title.trim().length === 0 || loading}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
};