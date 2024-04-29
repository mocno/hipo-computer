type OutputProps = {
  value: Word;
};

export function Output({ value }: OutputProps) {
  return (
    <div>
      <h1>Saida</h1>
      <textarea className="output-display" value={value} disabled></textarea>
    </div>
  );
}

