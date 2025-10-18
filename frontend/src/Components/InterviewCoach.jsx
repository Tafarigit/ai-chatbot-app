import { useState, useEffect } from "react";
import axios from "axios";

const InterviewCoach = () => {
    const [questions, setQuestions ] = useState([]);
    const [selectedQuestion, setSeleectedQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState(null);

useEffect(() => {
    const fetchQuestions = async () => {
        try {
            const res = await axios.get("http://localhost:3001/api/interview/questions");
            setQuestions(res.data.questions);
            setSeleectedQuestion(res.data.questions[0] || "");
            
        }catch (error) {
            console.error("Error fetching questions:", error);
        }
    };
    fetchQuestions();
},[]);

const handleSubmit = async (e) => {
    e.preventDefault();
    if(!answer || !selectedQuestion) return;
    try {
        const res = await axios.post("http://localhost:3001/api/interview/evaluate",  {
            question: selectedQuestion,
            answer
        });
        setFeedback(res.data.result);
    } catch(err) {
        console.error("Error evaluatong answer:", err);
    }
};

return (
    <div>
        <h2>AI Interview Interview Coach</h2>
        <form
            onSubmit = {handleSubmit}>
                <label>
                    Select a question:
                    <select
                    value={selectedQuestion}
                    onChange={(e) => setSeleectedQuestion(e.target.value)}
                    >
                        {questions.map((q, idx) => (
                            <option key={idx} value={q}>{q}</option>
                        ))}
                    </select>
                </label>
                Your Answer: 
                <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                />
                <button type="submit">Submit Answer</button>
        </form>
        {feedback && (
            <div>
                <h3>
                    Feedback: 
                </h3>
                <p>Clarity: {feedback.clarity}</p>
                <p>Structure: {feedback.structure}</p>
                <p>Impact : {feedback.impact}</p>
                <p>Overall: {feedback.overall}</p>
                <p>Comments: {feedback.feedback}</p>
                </div>
        )}
    </div>
);
};

export default InterviewCoach;