import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaBrain, FaDesktop, FaCloud, FaCogs, FaFolder, FaGithub, FaCheckCircle, FaTerminal } from 'react-icons/fa';

interface ConfigOption {
  id: string;
  label: string;
  options: string[];
}

const configOptions: ConfigOption[] = [
  {
    id: 'scaffolding',
    label: 'Agent Scaffolding',
    options: ['LangGraph', 'AutoGPT', 'BabyAGI', 'AgentGPT', 'LangChain', 'Haystack', 'JARVIS', 'Custom']
  },
  {
    id: 'github',
    label: 'GitHub Repository',
    options: ['Connect to GitHub']
  },
  {
    id: 'model',
    label: 'Language Model',
    options: [
      'GPT-4', 'GPT-4-32k', 'GPT-3.5-turbo', 'GPT-3.5-turbo-16k',
      'Claude-3-Opus', 'Claude-3-Sonnet', 'Claude-3-Haiku',
      'Claude-2', 'Claude-1', 'Claude-Instant',
      'LLAMA-2-7B', 'LLAMA-2-13B', 'LLAMA-2-70B',
      'PaLM', 'Cohere', 'Jurassic-2',
      'Falcon-7B', 'Falcon-40B', 'Falcon-180B',
      'BLOOM', 'GPT-NeoX', 'Pythia',
      'Vicuna', 'Alpaca', 'Dolly',
      'Custom Open-Source Model'
    ]
  },
  {
    id: 'os',
    label: 'Operating System',
    options: ['Linux (Ubuntu)', 'Linux (Debian)', 'Linux (CentOS)', 'Linux (Fedora)', 'Windows Server', 'Windows 10/11', 'macOS', 'FreeBSD', 'OpenBSD']
  },
  {
    id: 'hosting',
    label: 'Hosting',
    options: [
      'AWS EC2', 'AWS Lambda', 'Google Cloud Compute Engine', 'Google Cloud Functions',
      'Azure Virtual Machines', 'Azure Functions', 'DigitalOcean Droplets',
      'Heroku', 'Netlify', 'Vercel', 'Cloudflare Workers',
      'IBM Cloud', 'Oracle Cloud', 'Linode', 'Vultr',
      'Local (Docker)', 'Local (Bare Metal)', 'Custom VPS'
    ]
  },
  {
    id: 'capabilities',
    label: 'Capabilities',
    options: [
      'Web Browsing', 'File I/O', 'API Interaction', 'Task Planning',
      'Natural Language Processing', 'Image Generation', 'Speech Recognition',
      'Text-to-Speech', 'Data Analysis', 'Machine Learning',
      'Database Management', 'Email Integration', 'Calendar Management',
      'Version Control', 'Continuous Integration/Deployment',
      'Sentiment Analysis', 'Language Translation', 'Code Generation',
      'Automated Testing', 'Cybersecurity Analysis'
    ]
  },
];

const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<string[]>([]);
  const [githubRepo, setGithubRepo] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleOptionSelect = (optionId: string, value: string) => {
    setConfig(prev => ({ ...prev, [optionId]: value }));
  };

  const handleFileAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []).map(file => file.name);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleGithubRepoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGithubRepo(event.target.value);
  };

  const handleNext = () => {
    if (step < configOptions.length + 1) {
      setStep(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      executeCommand(userInput);
      setUserInput('');
    }
  };

  const executeCommand = (command: string) => {
    setTerminalOutput(prev => [...prev, `> ${command}`]);

    switch (command.trim().toLowerCase()) {
      case 'ls':
        setTerminalOutput(prev => [...prev, 'agent.py  config.json  data/  models/  README.md']);
        break;
      case 'pwd':
        setTerminalOutput(prev => [...prev, '/home/ai-agent']);
        break;
      case 'whoami':
        setTerminalOutput(prev => [...prev, 'ai-agent']);
        break;
      case 'date':
        setTerminalOutput(prev => [...prev, new Date().toString()]);
        break;
      case 'clear':
        setTerminalOutput([]);
      case 'cat':
        setTerminalOutput(prev => [...prev, 'Usage: cat <filename>']);
        break;
      case 'echo':
        setTerminalOutput(prev => [...prev, command.slice(5)]);
        break;
      case 'uname':
        setTerminalOutput(prev => [...prev, 'AI-OS']);
        break;
      case 'ps':
        setTerminalOutput(prev => [...prev, 'PID TTY          TIME CMD', '  1 ?        00:00:00 init', '  2 ?        00:00:00 ai-agent']);
        break;
      case 'top':
        setTerminalOutput(prev => [...prev, 'top - 00:00:00 up 0 min,  1 user,  load average: 0.00, 0.00, 0.00', 'Tasks:   2 total,   1 running,   1 sleeping,   0 stopped,   0 zombie', '%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni, 100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st', 'MiB Mem :   7950.1 total,   7365.9 free,    257.3 used,    326.9 buff/cache', 'MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   7439.0 avail Mem ']);
        break;
      case 'df':
        setTerminalOutput(prev => [...prev, 'Filesystem     1K-blocks      Used Available Use% Mounted on', '/dev/sda1      61255492   2498292  55474816   5% /']);
        break;
      case 'free':
        setTerminalOutput(prev => [...prev, '              total        used        free      shared  buff/cache   available', 'Mem:        8141880     263476    7542636       1024     335768    7623636', 'Swap:       2097152          0    2097152']);
        break;
      case 'help':
        setTerminalOutput(prev => [...prev, 'Available commands: ls, pwd, whoami, date, help, clear', 'cat, echo, uname, top, df, free']);
        break;
      default:
        setTerminalOutput(prev => [...prev, `Command not found: ${command}`]);
    }
  };

  useEffect(() => {
    if (isConnected) {
      const bootSequence = [
        "Initializing system...",
        "Loading kernel...",
        "Starting services...",
        "Connecting to network...",
        "Launching AI agent...",
        "Environment ready.",
        "",
        "Welcome to the AI Agent Environment",
        "Type 'help' for a list of commands.",
      ];

      bootSequence.forEach((line, index) => {
        setTimeout(() => {
          setTerminalOutput(prev => [...prev, line]);
        }, index * 500);
      });
    }
  }, [isConnected]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const renderIcon = (id: string) => {
    switch (id) {
      case 'scaffolding': return <FaRobot className="w-6 h-6" />;
      case 'github': return <FaGithub className="w-6 h-6" />;
      case 'model': return <FaBrain className="w-6 h-6" />;
      case 'os': return <FaDesktop className="w-6 h-6" />;
      case 'hosting': return <FaCloud className="w-6 h-6" />;
      case 'capabilities': return <FaCogs className="w-6 h-6" />;
      default: return null;
    }
  };

  const renderSummary = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
        <FaCheckCircle className="inline-block mr-2" />
        Environment Created Successfully
      </h2>
      {configOptions.map(option => (
        <div key={option.id} className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            {renderIcon(option.id)}
            <span className="ml-2">{option.label}</span>
          </h3>
          <p className="text-gray-700">{config[option.id] || 'Not selected'}</p>
        </div>
      ))}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <FaGithub className="w-6 h-6 mr-2" />
          GitHub Repository
        </h3>
        <p className="text-gray-700">{githubRepo || 'Not provided'}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <FaFolder className="w-6 h-6 mr-2" />
          Home Directory Files
        </h3>
        {files.length > 0 ? (
          <ul className="list-disc pl-5">
            {files.map((file, index) => (
              <li key={index} className="text-gray-700">{file}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No files added</p>
        )}
      </div>
      <button
        onClick={handleConnect}
        className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mt-6"
      >
        Connect to agent environment
      </button>
    </div>
  );

  const renderTerminal = () => (
    <div className="bg-black text-green-400 p-4 rounded-lg h-[32rem] flex flex-col">

      <div ref={terminalRef} className="flex-1 overflow-y-auto font-mono mb-2">
        {terminalOutput.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <div className="flex items-center">
        <span className="mr-2">{'>'}</span>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-green-400 font-mono"
          autoFocus
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-16">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isConnected ? (
            <><FaTerminal className="inline-block mr-2" /> AI Agent Terminal</>
          ) : (
            'AI Agent Configuration'
          )}
        </h1>

        {isConnected ? (
          renderTerminal()
        ) : isComplete ? (
          renderSummary()
        ) : step < configOptions.length ? (
          <div>
            <div className="flex items-center mb-4">
              {renderIcon(configOptions[step].id)}
              <h2 className="text-xl font-semibold ml-2">{configOptions[step].label}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {configOptions[step].options.map(option => (
                <button
                  key={option}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${config[configOptions[step].id] === option
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  onClick={() => handleOptionSelect(configOptions[step].id, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center mb-4">
              <FaFolder className="w-6 h-6" />
              <h2 className="text-xl font-semibold ml-2">Home Directory Files</h2>
            </div>
            <input
              type="file"
              multiple
              onChange={handleFileAdd}
              className="mb-4"
            />
            <ul className="list-disc pl-5 mb-4">
              {files.map((file, index) => (
                <li key={index}>{file}</li>
              ))}
            </ul>
          </div>
        )}

        {!isComplete && !isConnected && (
          <div className="flex justify-between mt-6">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className={`px-4 py-2 rounded ${step === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-500 text-white hover:bg-gray-600'
                }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {step < configOptions.length + 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

