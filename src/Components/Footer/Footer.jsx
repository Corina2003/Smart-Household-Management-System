import "./Footer.css";

export const Footer = () =>
{
    return(
        <footer>
            <div className="footer-image"></div>
            <div className="footer-section">
                <div className="footer-content">
                    <p>Smart <br/>Household <br/>Management</p>
                </div>
                <div className="footer-contact">
                    <p>Contact</p>
                    <p id="colored">info@household.com</p>
                    <p id="number">+ 01 234 567 890</p>
                    <a><img src="img/ico/facebook.png" alt="facebook" /></a>
                    <a><img src="img/ico/twitter.png" alt="twitter" /></a>
                    <a><img src="img/ico/youtube.png" alt="youtube" /></a>
                    <a><img src="img/ico/instagram.png" alt="instagram" /></a>
                </div>
            </div>
        </footer>
    )
}