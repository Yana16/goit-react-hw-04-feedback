import { useState } from 'react';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Section from './Section';
import Notification from './Notification';

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onLeaveFeedback = data => {
    return setFeedback(prevState => {
      const value = prevState[data];
      return { ...prevState, [data]: value + 1 };
    });
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    const result = good + neutral + bad;
    return result;
  };

  const countPositiveFeedbackPercentage = () => {
    const result = countTotalFeedback();
    const { good } = feedback;
    const percentage = (good * 100) / result;
    return Math.round(percentage);
  };

  const { good, neutral, bad } = feedback;
  const objKey = Object.keys(feedback);
  const positivePercentage = countPositiveFeedbackPercentage();
  const total = countTotalFeedback();

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions options={objKey} onLeaveFeedback={onLeaveFeedback} />
      </Section>

      {total === 0 ? (
        <Notification message="There is no feedback" />
      ) : (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        </Section>
      )}
    </>
  );
};

export default App;
