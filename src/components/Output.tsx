type OutputProps = {
    value: string;
}

export function Output({ value }: OutputProps)
{
    return (
        <>
            <h1>Saida</h1>
            <textarea className="output-display" defaultValue={value}></textarea>
        </>
    )
}