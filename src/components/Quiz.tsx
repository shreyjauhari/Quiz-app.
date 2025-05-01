import { useState } from 'react';
import { ArrowRight, CheckCircle, XCircle, RefreshCw, Home } from 'lucide-react';
import QuizProgress from './QuizProgress';
import { QuizQuestion } from '../types/quiz';
import quizData from '../data/quiz-data';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  
  const currentQuestion: QuizQuestion = quizData[currentQuestionIndex];
  
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };
  
  const handleNextQuestion = () => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    
    if (!answeredQuestions.includes(currentQuestionIndex)) {
      setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
    }
    
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnsweredQuestions([]);
  };

  const getScoreMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage === 100) return 'Perfect! You\'re a genius! 🎉';
    if (percentage >= 80) return 'Excellent work! 🌟';
    if (percentage >= 60) return 'Good job! 👍';
    if (percentage >= 40) return 'Not bad, keep practicing! 💪';
    return 'Keep learning and try again! 📚';
  };
  
  const getButtonClass = (answer: string) => {
    const baseClass = "w-full p-4 mb-3 rounded-lg text-left transition-all duration-300 font-medium text-lg flex items-center";
    
    if (selectedAnswer === null) {
      return `${baseClass} bg-white/80 hover:bg-white hover:shadow-md`;
    }
    
    if (selectedAnswer === answer) {
      return answer === currentQuestion.correctAnswer
        ? `${baseClass} bg-green-500 text-white`
        : `${baseClass} bg-red-500 text-white`;
    }
    
    if (selectedAnswer !== null && answer === currentQuestion.correctAnswer) {
      return `${baseClass} bg-green-500 text-white`;
    }
    
    return `${baseClass} bg-white/80 opacity-50`;
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-8 backdrop-blur-md bg-white/30 rounded-2xl shadow-lg z-10 relative mt-8">
      {!showResult ? (
        <>
          <QuizProgress 
            current={answeredQuestions.length} 
            total={quizData.length} 
          />
          
          <div className="mt-6 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {currentQuestion.question}
            </h2>
            <p className="text-purple-700 font-medium">
              Question {currentQuestionIndex + 1} of {quizData.length}
            </p>
          </div>
          
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={selectedAnswer !== null}
                className={getButtonClass(option)}
              >
                {selectedAnswer === option && option === currentQuestion.correctAnswer && 
                  <CheckCircle className="mr-2 text-white" size={20} />
                }
                {selectedAnswer === option && option !== currentQuestion.correctAnswer && 
                  <XCircle className="mr-2 text-white" size={20} />
                }
                {option}
              </button>
            ))}
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className={`px-6 py-3 rounded-lg flex items-center font-semibold text-white transition-all duration-300 ${
                selectedAnswer === null 
                  ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {currentQuestionIndex === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
              <ArrowRight className="ml-2" size={18} />
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
          
          <div className="py-6 px-8 bg-white/70 rounded-xl mb-6">
            <p className="text-3xl font-bold text-purple-700 mb-2">
              Your Score: {score} / {quizData.length}
            </p>
            <p className="text-xl text-gray-700">
              {getScoreMessage(score, quizData.length)}
            </p>
          </div>
          
          <div className="flex justify-center gap-4">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all duration-300 flex items-center"
            >
              <RefreshCw className="mr-2" size={18} />
              Try Again
            </button>
            
            <a
              href="/"
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center"
            >
              <Home className="mr-2" size={18} />
              Back to Home
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;