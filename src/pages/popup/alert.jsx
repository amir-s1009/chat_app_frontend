import '../styles/alert.css';

export default function Alert ({display, content, background}){
    return(
        <div className="alert" style={{"backgroundColor":background}}>
            <p>{content}</p>
        </div>
    );
}