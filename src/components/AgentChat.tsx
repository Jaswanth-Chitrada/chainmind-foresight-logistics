
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, CheckCircle, XCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: string;
  actionRequired?: boolean;
  actionType?: 'confirm' | 'approve' | 'reject';
}

interface AgentChatProps {
  alertId: string;
  agentName: string;
  alertMessage: string;
  onClose: () => void;
}

const AgentChat: React.FC<AgentChatProps> = ({ alertId, agentName, alertMessage, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'system',
      content: `Alert triggered: ${alertMessage}`,
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: '2',
      type: 'agent',
      content: `I've detected an issue that requires attention. Here's what I recommend:`,
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: '3',
      type: 'agent',
      content: `Based on the current situation, I suggest implementing the following action plan. Would you like me to proceed?`,
      timestamp: new Date().toLocaleTimeString(),
      actionRequired: true,
      actionType: 'confirm'
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsProcessing(true);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: `I understand your instruction: "${inputMessage}". I'll implement this change immediately.`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, agentResponse]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleAction = (action: 'approve' | 'reject') => {
    const actionMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: action === 'approve' ? 'Action approved' : 'Action rejected',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, actionMessage]);

    setTimeout(() => {
      const agentResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: action === 'approve' 
          ? 'Thank you for the approval. Executing the action plan now...' 
          : 'Understood. I will not proceed with the suggested action. Please provide alternative instructions.',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  return (
    <Card className="glass-panel border-white/10 h-96 flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-logistics-accent" />
            <CardTitle className="text-white text-lg">{agentName}</CardTitle>
            <Badge className="bg-logistics-accent/20 text-logistics-accent">
              Active
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
            ×
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-logistics-accent text-white' 
                  : message.type === 'system'
                  ? 'bg-logistics-warning/20 text-logistics-warning border border-logistics-warning/30'
                  : 'bg-logistics-panel text-white'
              }`}>
                <div className="flex items-center space-x-2 mb-1">
                  {message.type === 'user' && <User className="w-3 h-3" />}
                  {message.type === 'agent' && <Bot className="w-3 h-3" />}
                  <span className="text-xs opacity-70">{message.timestamp}</span>
                </div>
                <p className="text-sm">{message.content}</p>
                
                {message.actionRequired && (
                  <div className="flex space-x-2 mt-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleAction('approve')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAction('reject')}
                      className="border-red-500 text-red-400 hover:bg-red-500/10"
                    >
                      <XCircle className="w-3 h-3 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-logistics-panel text-white px-3 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="w-3 h-3" />
                  <span className="text-sm">Agent is thinking...</span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Input */}
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Give instructions to the agent..."
            className="bg-logistics-panel border-white/20 text-white"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isProcessing}
            className="bg-logistics-accent hover:bg-logistics-accent/80"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentChat;
