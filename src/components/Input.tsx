type InputProps = {
  setInput: (input: string) => void;
  enable: boolean;
};

export function Input({ setInput, enable }: InputProps) {
  function sendAndCleanContent(target: HTMLTextAreaElement) {
    setInput(target.value);
    target.value = "";
  }

  return (
    <div>
      <h1>Entrada</h1>
      <textarea
        className={
          "input-display" + 
          (enable ? " input-enable": "")
        }
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            sendAndCleanContent(event.target as HTMLTextAreaElement)
          }
        }}
        onChange={(event) => {
          let value = event.target.value.replaceAll(/[^\d+-]/g, "");

          event.target.value = value;
        }}
        maxLength={5}
        disabled={!enable}
      ></textarea>
    </div>
  );
}
