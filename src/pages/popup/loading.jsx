import '../styles/loading.css';
export default function Loading({display}){
    if(display){
        return(
            <div id="loading">
                <div id="spinner"></div>
            </div>
        );
    }
}