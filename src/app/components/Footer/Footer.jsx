import './Footer.scss'

const Footer = () => {
    return (
        <footer>
            <div className="portfolio">
                <a href="https://ryqn.dev/">ryan yang</a>
            </div>
            <div className="made-with">
                {/* Made with <span role="img" aria-label="love">❤️</span> in irvine on sbux <span role="img" aria-label="coffee">☕</span> & boba */}
                Pick Ban Pro was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games.  Riot Games does not endorse or sponsor this project.
            </div>
        </footer>
    )
}

export default Footer;
