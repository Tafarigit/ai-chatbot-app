import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./useAuth";    



const InterviewCoach = () => {
    const { token } = useAuth();
    const [questions, setQuestions ] = useState([]);
    const [selectedQuestion, setSeleectedQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState(null);
    const { user } = useAuth();

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

        if (!token) {
        setFeedback({
            clarity: null,
            structure: null,
            impact: null,
            overall: null,
            comments: "⚠ You must be logged in to submit an answer."
        });
        return;
    };

    try {
        const res = await axios.post("http://localhost:3001/api/interview/evaluate",  {
            question: selectedQuestion,
            answer },
        { headers: { Authorization: `Bearer ${user?.token}` }
        });
        setFeedback(res.data.result);
    } catch(err) {
        console.error("Error evaluatong answer:", err);
    }
};

return (
    <div>
        <h2>AI Interview Coach</h2>
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
                <button type="submit" disabled={!token} title={!token ? "Log in to submit your answer" : ""}>Submit Answer</button>
                {!token && (<p style={{ color: "red", marginTop:"0.5cm" }}>Please log in to use the interview coach.
                     <a href="/login">Click here to log in</a>
                </p>
                )}
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
                <div style={{ marginTop: "1em" }}>
                <h4>Comments:</h4>
                <p style={{ whiteSpace: "pre-wrap" }}>{feedback.comments}</p>
                </div>
            </div>
        )}
    </div>
);
};

export default InterviewCoach;