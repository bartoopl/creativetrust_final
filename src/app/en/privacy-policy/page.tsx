import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'This privacy policy describes how we process information about you, including personal data and cookies.',
    alternates: pageAlternates('/polityka-prywatnosci', 'en', SITE_URL),
    openGraph: {
        title: 'Privacy Policy | CreativeTrust',
        description: 'This privacy policy describes how we process information about you, including personal data and cookies.',
        url: `${SITE_URL}/en/privacy-policy`, siteName: 'CreativeTrust', locale: 'en_GB', type: 'website',
    },
};

export default function PrivacyPolicyPage() {
    return (
        <main style={{ minHeight: '100vh' }}>
            <section className="ct-dotgrid" style={{ padding: 'var(--pad-y) var(--pad-x)', borderBottom: '1px solid var(--line)' }}>
                <div style={{ maxWidth: 720, margin: '0 auto' }}>
                    <span className="ct-eyebrow">LEGAL</span>
                    <h1 className="ct-h1" style={{ marginTop: 16 }}>Privacy Policy</h1>
                </div>
            </section>

            <div style={{ padding: 'var(--pad-y) var(--pad-x)' }}>
                <div className="ct-legal" style={{ maxWidth: 720, margin: '0 auto' }}>
                    <p className="ct-body" style={{ margin: '0 0 24px', fontSize: 14 }}>
                        This is a courtesy translation. The <Link href="/polityka-prywatnosci" hrefLang="pl">Polish version</Link> is the legally binding one.
                    </p>
                    <p className="ct-lead" style={{ margin: '0 0 32px' }}>
                        This privacy policy describes how we process information about you, including personal data and cookies.
                    </p>

                    <h2>1. General information</h2>
                    <p>
                        This policy applies to the website operating at the URL: creativetrust.pl
                    </p>
                    <p>
                        The operator of the website and the controller of personal data is: CreativeTrust Natalia Staszak Kombatantów 34/500
                    </p>
                    <p>
                        The operator&apos;s contact email address: office@creativetrust.pl
                    </p>
                    <p>
                        The Operator is the controller of your personal data with respect to data provided voluntarily on the Website.
                    </p>
                    <p>
                        The Website uses personal data for the following purposes:
                    </p>
                    <ul>
                        <li>Handling enquiries submitted through the form</li>
                        <li>Presenting offers or information</li>
                    </ul>
                    <p>
                        The Website collects information about users and their behaviour in the following ways:
                    </p>
                    <ul>
                        <li>Through data entered voluntarily in forms, which is stored in the Operator&apos;s systems.</li>
                        <li>By saving cookie files on end devices.</li>
                    </ul>

                    <h2>2. Selected data protection methods used by the Operator</h2>
                    <p>
                        Places where users log in and enter personal data are protected at the transmission layer (SSL certificate). As a result, personal data and login credentials entered on the website are encrypted on the user&apos;s computer and can be read only on the destination server.
                    </p>
                    <p>
                        Personal data stored in the database is encrypted in such a way that only the key held by the Operator can read it. This protects the data should the database be stolen from the server.
                    </p>
                    <p>
                        User passwords are stored in hashed form. The hashing function works one way — its effect cannot be reversed, which is the current standard for storing user passwords.
                    </p>
                    <p>
                        The Operator periodically changes its administrative passwords.
                    </p>
                    <p>
                        To protect data, the Operator regularly makes backup copies.
                    </p>
                    <p>
                        An important element of data protection is the regular updating of all software the Operator uses to process personal data, which in particular means regular updates of programming components.
                    </p>

                    <h2>3. Hosting</h2>
                    <p>
                        The Website is hosted (technically maintained) on the servers of another company, engaged by the operator.
                    </p>
                    <p>
                        To ensure technical reliability, the hosting company keeps server-level logs. The following may be recorded:
                    </p>
                    <ul>
                        <li>resources identified by URL (addresses of requested resources – pages, files),</li>
                        <li>the time the request arrived,</li>
                        <li>the time the response was sent,</li>
                        <li>the client station name – identification carried out by the HTTP protocol,</li>
                        <li>information about errors that occurred during HTTP transactions,</li>
                        <li>the URL of the page the user previously visited (referer link) – where the user came to the Website through a link,</li>
                        <li>information about the user&apos;s browser,</li>
                        <li>information about the IP address,</li>
                        <li>diagnostic information related to the process of ordering services independently through registrars on the website,</li>
                        <li>information related to the handling of email sent to and by the Operator.</li>
                    </ul>

                    <h2>4. Your rights and additional information on how data is used</h2>
                    <p>
                        In some situations the Controller may pass your personal data to other recipients where this is necessary to perform a contract concluded with you or to meet obligations incumbent on the Controller. This applies to the following groups of recipients:
                    </p>
                    <ul>
                        <li>the hosting company, on a processing-entrustment basis</li>
                        <li>postal operators</li>
                        <li>authorised employees and associates who use the data to carry out the website&apos;s purpose</li>
                        <li>companies providing marketing services to the Controller</li>
                    </ul>
                    <p>
                        Your personal data is processed by the Controller for no longer than is necessary to carry out the related activities specified by separate regulations (e.g. on accounting). For marketing data, the data will not be processed for longer than 3 years.
                    </p>
                    <p>
                        You have the right to request from the Controller:
                    </p>
                    <ul>
                        <li>access to personal data concerning you,</li>
                        <li>its rectification,</li>
                        <li>erasure,</li>
                        <li>restriction of processing,</li>
                        <li>and data portability.</li>
                    </ul>
                    <p>
                        You have the right to object, in the scope indicated in point 3.2, to the processing of personal data for the purposes of the legitimate interests pursued by the Controller, including profiling; however, the right to object cannot be exercised where there are compelling legitimate grounds for the processing which override your interests, rights and freedoms, in particular the establishment, exercise or defence of legal claims.
                    </p>
                    <p>
                        You may lodge a complaint about the Controller&apos;s actions with the President of the Personal Data Protection Office (Prezes Urzędu Ochrony Danych Osobowych), ul. Stawki 2, 00-193 Warsaw.
                    </p>
                    <p>
                        Providing personal data is voluntary, but necessary for the operation of the Website.
                    </p>
                    <p>
                        Automated decision-making, including profiling, may be applied to you for the purpose of providing services under a concluded contract and for the Controller&apos;s direct marketing.
                    </p>
                    <p>
                        Personal data is not transferred to third countries within the meaning of data protection law. This means we do not send it outside the European Union.
                    </p>

                    <h2>5. Information in forms</h2>
                    <p>
                        The Website collects information provided voluntarily by the user, including personal data, where it is provided.
                    </p>
                    <p>
                        The Website may save information about connection parameters (timestamp, IP address).
                    </p>
                    <p>
                        In some cases the Website may save information that makes it easier to link the data in a form with the email address of the user filling it in. In that case the user&apos;s email address appears inside the URL of the page containing the form.
                    </p>
                    <p>
                        Data provided in a form is processed for the purpose resulting from the function of that particular form, e.g. to handle a service request or a sales enquiry, to register services, etc. In each case the context and description of the form clearly state what it is for.
                    </p>

                    <h2>6. Controller logs</h2>
                    <p>
                        Information about users&apos; behaviour on the website may be logged. This data is used to administer the website.
                    </p>

                    <h2>7. Key marketing techniques</h2>
                    <p>
                        The Operator uses statistical analysis of website traffic through Google Analytics (Google Inc., based in the USA). The Operator does not pass personal data to the provider of this service, only anonymised information. The service relies on cookies on the user&apos;s end device. As regards information about user preferences collected by the Google advertising network, the user can view and edit information resulting from cookies using the following tool: <a href="https://www.google.com/ads/preferences/" target="_blank" rel="noopener noreferrer">https://www.google.com/ads/preferences/</a>
                    </p>
                    <p>
                        The Operator uses a solution that studies user behaviour by creating heat maps and recording behaviour on the website. This information is anonymised before it is sent to the service provider, so the provider does not know which natural person it concerns. In particular, passwords and other personal data that are typed in are not recorded.
                    </p>
                    <p>
                        The Operator uses a solution that automates the operation of the Website with respect to users, e.g. it may send an email to a user after they visit a specific subpage, provided they have consented to receive commercial correspondence from the Operator.
                    </p>

                    <h2>8. Information about cookies</h2>
                    <p>
                        The Website uses cookies.
                    </p>
                    <p>
                        Cookies are IT data, in particular text files, stored on the end device of a Website User and intended for use of the Website&apos;s pages. Cookies usually contain the name of the website they come from, the time they are stored on the end device and a unique number.
                    </p>
                    <p>
                        The entity placing cookies on the end device of a Website User and accessing them is the operator of the Website.
                    </p>
                    <p>
                        Cookies are used for the following purposes:
                    </p>
                    <ul>
                        <li>maintaining the Website user&apos;s session (after logging in), so that the user does not have to re-enter their login and password on every subpage of the Website;</li>
                        <li>achieving the purposes set out above in the section &quot;Key marketing techniques&quot;;</li>
                    </ul>
                    <p>
                        The Website uses two basic types of cookies: &quot;session&quot; cookies and &quot;persistent&quot; cookies. Session cookies are temporary files stored on the User&apos;s end device until they log out, leave the website or close the software (web browser). Persistent cookies are stored on the User&apos;s end device for the time specified in the cookie parameters or until the User deletes them.
                    </p>
                    <p>
                        Web browsing software (a web browser) usually allows cookies to be stored on the User&apos;s end device by default. Website Users can change the settings in this respect. A web browser allows cookies to be deleted. It is also possible to block cookies automatically. Detailed information on this is provided in the help or documentation of the web browser.
                    </p>
                    <p>
                        Restricting the use of cookies may affect some of the functionality available on the Website&apos;s pages.
                    </p>
                    <p>
                        Cookies placed on the end device of a Website User may also be used by entities cooperating with the Website operator, in particular the following companies: Google (Google Inc., based in the USA), Facebook (Facebook Inc., based in the USA), Twitter (Twitter Inc., based in the USA).
                    </p>

                    <h2>9. Managing cookies – how to give and withdraw consent in practice</h2>
                    <p>
                        If a user does not want to receive cookies, they can change their browser settings. Please note that disabling cookies necessary for authentication, security and maintaining user preferences may make it harder, and in extreme cases impossible, to use the websites.
                    </p>
                    <p>
                        To manage cookie settings, choose the web browser you use from the list below and follow the instructions:
                    </p>
                    <ul className="ct-legal-links">
                        <li><a href="https://support.microsoft.com/pl-pl/microsoft-edge/usuwanie-plik%C3%B3w-cookie-w-przegl%C4%85darce-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Edge</a></li>
                        <li><a href="https://support.microsoft.com/pl-pl/windows/usuwanie-plik%C3%B3w-cookie-i-zarz%C4%85dzanie-nimi-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer">Internet Explorer</a></li>
                        <li><a href="https://support.google.com/chrome/answer/95647?hl=en" target="_blank" rel="noopener noreferrer">Chrome</a></li>
                        <li><a href="https://support.apple.com/pl-pl/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
                        <li><a href="https://support.mozilla.org/pl/kb/wlaczanie-i-wylaczanie-ciasteczek-witryn" target="_blank" rel="noopener noreferrer">Firefox</a></li>
                        <li><a href="https://help.opera.com/pl/latest/web-preferences/#cookies" target="_blank" rel="noopener noreferrer">Opera</a></li>
                    </ul>
                    <p>
                        Mobile devices:
                    </p>
                    <ul className="ct-legal-links">
                        <li><a href="https://support.google.com/chrome/answer/95647?hl=en" target="_blank" rel="noopener noreferrer">Android</a></li>
                        <li><a href="https://support.apple.com/pl-pl/HT201265" target="_blank" rel="noopener noreferrer">Safari (iOS)</a></li>
                        <li><a href="https://support.microsoft.com/pl-pl/windows/windows-phone-7-3ebc303c-59c0-d367-3995-f258b184fabb" target="_blank" rel="noopener noreferrer">Windows Phone</a></li>
                    </ul>
                    <h2>7.1 Google Tag Manager and Google Analytics</h2>
                    <p>
                        Our website uses Google Tag Manager (GTM) to manage tags and analytics scripts,
                        including Google Analytics 4. GTM is a platform that lets you manage tracking scripts without
                        modifying the website&apos;s code.
                    </p>
                    <p>
                        Google Analytics 4 helps us understand how users use our website
                        by collecting anonymous data about user behaviour, such as:
                    </p>
                    <ul>
                        <li>Time spent on the site</li>
                        <li>Subpages visited</li>
                        <li>Traffic sources</li>
                        <li>Device and browser information</li>
                        <li>General geographic location (country/city level)</li>
                    </ul>
                    <p>
                        This data is used solely for statistical and analytical purposes, to help us
                        improve our website and offer.
                    </p>

                    <h2>7.2 Consent Mode and consent management</h2>
                    <p>
                        Our website uses the Google Consent Mode v2 mechanism, which makes it possible to respect
                        users&apos; preferences regarding cookies and tracking. This lets you decide
                        which types of cookies you accept.
                    </p>
                    <p>
                        By default, without your consent, we use only necessary cookies. The other categories of
                        cookies (analytics, marketing, functional and personalisation) are activated only after
                        we obtain your explicit consent.
                    </p>
                    <p>
                        You can manage your cookie preferences at any time by clicking the
                        &quot;Privacy settings&quot; button at the bottom of the page.
                    </p>

                    <h2>7.3 Cookie categories</h2>
                    <p>
                        Our website uses the following categories of cookies:
                    </p>
                </div>

                <div style={{ maxWidth: 720, margin: '48px auto 0', paddingTop: 24, borderTop: '1px solid var(--line)' }}>
                    <Link href="/en" className="ct-ghost">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19 12H5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12 19L5 12L12 5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Back to the home page
                    </Link>
                </div>
            </div>
        </main>
    );
}
