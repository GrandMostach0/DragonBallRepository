import { LinkedInIc, GithubIc } from "../assets/Icons/SunIc"
export default function FooterDiv() {
    return (
        <footer className="border-t border-t-gray-100 bg-slate-50/20 dark:bg-slate-900/20 py-2 mt-30 text-xs sm:text-sm grid px-3 sm:px-10 dark:text-slate-50">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-around">
                <section>
                    <h1 className="font-semibold text-amber-500 mb-1">Dragon Ball</h1>
                    <p>Página creada usando la <span className="font-semibold underline text-amber-500">Api de <a href="https://web.dragonball-api.com/" target="_blank">Dragon Ball Api</a></span></p>
                </section>

                <section>
                    <h1 className="font-semibold mb-1">Mis redes Sociales</h1>
                    <a className="inline-block mx-2" href="https://github.com/GrandMostach0" target="_blank"><GithubIc /></a>
                    <a className="inline-block mx-2" href="https://www.linkedin.com/in/victorchanvarguez/" target="_blank"><LinkedInIc /></a>
                </section>
            </div>

            <section className="border-t border-t-gray-100/50 flex items-center justify-between py-2">
                <p>© Todos los derechos reservados.</p>
                <p>Victor Bernardo Chan Varguez</p>
            </section>
        </footer>
    )
}