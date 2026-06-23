import { Dispatch, FormEvent, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { quickQuestions } from '../data/mockData';
import type { ReportSource, ReportView } from '../data/reportData';
import { getAiMockResponse } from '../utils/aiMock';
import SourceLinks from './SourceLinks';

export type ChatRole = 'assistant' | 'user';

export interface ChatMessage {
  id: number;
  role: ChatRole;
  content: string;
  sources?: ReportSource[];
}

export const welcomeMessage: ChatMessage = {
  id: 1,
  role: 'assistant',
  content:
    '您好，我是智能協同生產監控平台 AI Copilot。您可以詢問今日生產效率、供應商風險、良率異常、交期延遲，或材料與製程變更狀況。',
};

interface ChatPanelProps {
  messages: ChatMessage[];
  onMessagesChange: Dispatch<SetStateAction<ChatMessage[]>>;
  onOpenReport: (view: ReportView) => void;
}

export default function ChatPanel({ messages, onMessagesChange, onOpenReport }: ChatPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const canSubmit = useMemo(() => inputValue.trim().length > 0, [inputValue]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  const submitQuestion = (question: string) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) {
      return;
    }

    const aiResponse = getAiMockResponse(trimmedQuestion);

    onMessagesChange((currentMessages) => {
      const nextId = Math.max(...currentMessages.map((message) => message.id)) + 1;
      const userMessage: ChatMessage = {
        id: nextId,
        role: 'user',
        content: trimmedQuestion,
      };
      const assistantMessage: ChatMessage = {
        id: nextId + 1,
        role: 'assistant',
        content: aiResponse.text,
        sources: aiResponse.sources,
      };

      return [...currentMessages, userMessage, assistantMessage];
    });
    setInputValue('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitQuestion(inputValue);
  };

  return (
    <section className="panel chat-panel" aria-label="AI Chat">
      <div className="panel__header">
        <div>
          <p className="eyebrow">AI Copilot</p>
          <h2>供應商管理對話</h2>
        </div>
        <span className="status-dot">Mock AI</span>
      </div>

      <div className="quick-actions" aria-label="快捷問題">
        {quickQuestions.map((question) => (
          <button key={question} type="button" onClick={() => submitQuestion(question)}>
            {question}
          </button>
        ))}
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`chat-message chat-message--${message.role}`}>
            <span className="chat-message__role">{message.role === 'user' ? 'You' : 'AI'}</span>
            <p>{message.content}</p>
            {message.role === 'assistant' && message.sources ? (
              <SourceLinks sources={message.sources} onOpenReport={onOpenReport} />
            ) : null}
          </div>
        ))}
        <div ref={messagesEndRef} aria-hidden="true" />
      </div>

      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="輸入問題，例如：本週風險最高的供應商是誰？"
          aria-label="輸入 AI 問題"
        />
        <button type="submit" disabled={!canSubmit}>
          送出
        </button>
      </form>
    </section>
  );
}
