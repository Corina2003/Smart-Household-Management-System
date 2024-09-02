import "./Button.css";

export function Button({ text, onClick }) {
    return (
        <button className="button" onClick={onClick}>{text}</button>
    );
}