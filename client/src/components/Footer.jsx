import { FaSquareGithub } from "react-icons/fa6";

export default function Footer() {

    const styles= {
        main: {
            backgroundColor: 'var(--gunmetal)',
            color: 'var(--razzle-dazzle-rose)',
        },
        icon: {
            color: 'var(--chartreuse)',
            fontSize: '250%',
        }
    }

    return (
        <div style={styles.main} className={'d-flex justify-content-evenly'}>
            <div className={'d-flex flex-column'}>
                <p className={'mx-2 p-2'}>© 2024 Sour - Spotify Stats</p>
                <div className={'mx-2 p-2'}>
                    <p>We are not affiliated with Spotify</p>
                </div>
            </div>
            <a href='https://github.com/lindsay-terry' target='_blank' rel='noopener noreferrer' style={styles.icon} className={'d-flex align-items-center'}>
                <FaSquareGithub />
            </a>
        </div>
    )
}