import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import { executeCode } from "../execution/api";

const CodeEditor = ({
  onCodeChange,
  language = "javascript",
  value = "",
  settings = { fontSize: 16, wordWrap: true },
}) => {
  const editorRef = useRef(null);

  const handleEditorChange = (newValue) => {
    onCodeChange(newValue || "");
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
  };

  return (
    <div className="h-full w-full overflow-hidden bg-[#0a0a0f]">
      <Editor
        height="100%"
        language={language}
        value={value}
        theme="deep-space"
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: settings.fontSize || 16,
          wordWrap: settings.wordWrap ? "on" : "off",
          fontFamily: "JetBrains Mono, monospace",
          automaticLayout: true,
          padding: { top: 20, bottom: 20 },
          inlineSuggest: { enabled: true },
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default CodeEditor;
