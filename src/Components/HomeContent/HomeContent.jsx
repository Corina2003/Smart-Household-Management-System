import "./HomeContent.css";
import {Button} from "../Button/Button";

export const Content = () => {
    return (
        <main>
            <div className="introductive">
                <div className="introduct-image"></div>
                <div className="home-text">
                    <h2>Smart</h2> 
                    <h2>Household</h2>
                    <h2>Management</h2>
                </div>
                <div className="slogan">
                    <p>"Streamline Your Home, Simplify Your Life: Smart Household Management System"</p>
                </div>
            </div>

            <div className="about-us">
                <img src="img/home/About-Img.png" alt="image" />
                <div className="about">
                    <h2>About Us</h2>
                    <p>
                        The team behind the Smart Household Management System (SHMS) is passionate about 
                        revolutionizing the way households manage their day-to-day activities. Comprised of 
                        experienced developers, designers, and project managers, our goal is to empower families 
                        and housemates with a tool that simplifies their lives and fosters better communication 
                        and collaboration. 
                    </p>
                    <div className="team">
                        <img src="img/ico/Logo.png" alt="ico" />
                        <p>SHMS Team</p>
                    </div>
                </div>        
            </div>

        </main>
    )
}
