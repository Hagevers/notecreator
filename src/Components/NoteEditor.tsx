import { useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

export const NoteEditor = ({
    onSave,loading, setLoading
}: {
    onSave: (note: { title: string, content: string }) => void,
    loading: boolean,
    setLoading: Function
}
) => {

    const [code, setCode] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    return (
        <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">
                    <input
                        type="text"
                        placeholder="Note title"
                        className="input-primary input input-lg w-full font-bold focus:outline-0"
                        value={title}
                        onChange={(e) => setTitle(e.currentTarget.value)}
                    />
                </h2>
                <CodeMirror
                    value={code}
                    height="30vh"
                    minWidth="100%"
                    extensions={[
                        markdown({ base: markdownLanguage, codeLanguages: languages }),
                    ]}
                    theme={"dark"}
                    onChange={(value) => setCode(value)}
                    className="border border-gray-300"
                />
            </div>
            <div className="card-actions justify-end mr-8 mb-5">
                <button
                    onClick={() => {
                        setLoading(true);
                        onSave({
                            title,
                            content: code,
                        });
                        setCode("");
                        setTitle("");
                    }}
                    className={`btn-primary btn ${loading ? 'loading' : ''}`}
                    disabled={title.trim().length === 0 || code.trim().length === 0}
                >
                    Save
                </button>
            </div>
        </div>
    )
}