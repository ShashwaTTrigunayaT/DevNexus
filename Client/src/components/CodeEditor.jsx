import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ onCodeChange, language = "javascript" }) => {
  const [value, setValue] = useState("// Start coding...");
  const editorRef = useRef(null);

  const handleEditorChange = (newValue) => {
    setValue(newValue);
    onCodeChange(newValue); // Just updates the parent state, no sockets
  };

  // The "Mock" Copilot Logic (Purely Frontend)
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Register the "Inline Completion" provider
    monaco.languages.registerInlineCompletionsProvider('javascript', {
      provideInlineCompletions: async (model, position) => {
        
        const textUntilPosition = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        // Mock Autocomplete for "func"
        if (textUntilPosition.endsWith('func')) {
          return {
            items: [{
              insertText: 'tion myFunction() {\n  console.log("Hello World");\n}',
              range: {
                 startLineNumber: position.lineNumber,
                 startColumn: position.column,
                 endLineNumber: position.lineNumber,
                 endColumn: position.column,
              }
            }]
          };
        }

        return { items: [] };
      },
    });
  };

  return (
    <div className="h-full w-full overflow-hidden bg-[#0a0a0f]">
       <Editor
        height="100%"
        defaultLanguage={language}
        value={value}
        theme="deep-space" // Ensure you defined this theme in App.jsx or EditorPage
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          fontFamily: 'JetBrains Mono, monospace',
          automaticLayout: true,
          padding: { top: 20, bottom: 20 },
          inlineSuggest: { enabled: true }, // Ghost text enabled
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default CodeEditor;