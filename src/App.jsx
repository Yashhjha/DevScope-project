import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Editor from '@monaco-editor/react';
import Select from 'react-select';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Markdown from 'react-markdown';
import { RingLoader } from 'react-spinners';

const App = () => {
  const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const [code, setCode] = useState('');
  const [selectedOption, setSelectedOption] = useState({
    value: 'javascript',
    label: 'JavaScript',
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

 async function reviewCode() {
  setLoading(true);

  const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are a professional code reviewer.

Analyze the following code and provide a detailed review. Your review should include:
- Summary of what the code does
- Code quality (readability, structure, naming conventions, etc.)
- Potential bugs or logical issues
- Suggestions for improvement
- Best practices or alternatives
- Security or performance concerns (if any)

Respond clearly and use bullet points where needed.

Language: ${selectedOption.value}

Code:
${code}
  `;

  const result = await model.generateContent(prompt);
  const text = await result.response.text();

  setResponse(text);
  setLoading(false);
}
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#1f2937',
      color: 'white',
      borderColor: '#374151',
      width: '100%',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1f2937',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#374151' : '#1f2937',
      color: 'white',
      cursor: 'pointer',
    }),
    input: (provided) => ({
      ...provided,
      color: 'white',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
    }),
  };

  const options = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'rust', label: 'Rust' },
    { value: 'json', label: 'JSON' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'sql', label: 'SQL' },
    { value: 'markdown', label: 'Markdown' },
    { value: 'shell', label: 'Shell/Bash' },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-1">
        {/* Left Side */}
        <div className="w-1/2 p-4 flex flex-col bg-[#111827]">
          <div className="flex items-center gap-4 !mt-2 !mb-2">
            <Select
              onChange={(e) => setSelectedOption(e)}
              value={selectedOption}
              options={options}
              styles={customStyles}
            />
            <button className="bg-zinc-800 text-white px-4 py-2 rounded">
              Fix Code
            </button>
            <button
              onClick={() => {
                if (code === '') {
                  alert('Please enter code first');
                } else {
                  reviewCode();
                }
              }}
              className="bg-zinc-800 text-white px-4 py-2 rounded"
            >
              Review
            </button>
          </div>

          <div className="flex-1">
            <Editor
              height="100%"
              theme="vs-dark"
              defaultLanguage={selectedOption.value}
              value={code}
              onChange={(e) => setCode(e)}
              options={{
                minimap: { enabled: false },
                scrollbar: {
                  vertical: 'hidden',
                  horizontal: 'hidden',
                },
              }}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 p-4 bg-zinc-900 flex flex-col">
          <div className="border-b border-[#27272a] h-[60px] flex items-center px-4">
            <p className="font-bold text-lg text-white">Response</p>
          </div>
          <div className="flex-1 overflow-auto p-4 text-white">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <RingLoader color="#fff" />
              </div>
            ) : (
              <Markdown>{response}</Markdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
