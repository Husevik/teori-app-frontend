type Props = {
  score: number;
  total: number;
};

export default function QuizResult({ score, total }: Props) {
  return (
    <div className="card">
      <h2>🎉 Quiz ferdig!</h2>
      <p>
        Du fikk <strong>{score}</strong> av{" "}
        <strong>{total}</strong> riktige.
      </p>

      <p>
        {score === total
          ? "Perfekt! 🔥"
          : score > total / 2
          ? "Bra jobbet 👏"
          : "Øv litt mer 💪"}
      </p>
    </div>
  );
}
