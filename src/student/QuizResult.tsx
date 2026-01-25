type Props = {
  score: number;
  total: number;
};

export default function QuizResult({ score, total }: Props) {
  return (
    <div className="card">
      <h2>🎉 Quiz ferdig!</h2>
      <p>
        Du fikk <strong>{score}</strong> av <strong>{total}</strong> riktige.
      </p>
    </div>
  );
}
