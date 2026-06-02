import { useEffect, useMemo, useState } from "react";

const EMAIL_ADDRESS = "mmaphoso@opulence-archive.ch";
const fallbackImage = "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop";

const heroImages = [
  "https://i.ibb.co/Ps95Rzbp/shubham-chauhan-74-JRWI27i-Ac-unsplash.jpg",
  "https://i.ibb.co/Gf4svvf4/claudio-testa-iqe-G5x-A96-M4-unsplash.jpg",
  "https://i.ibb.co/gYdq3rQ/alma-studio-cn1-N7-Kl-FGPM-unsplash.jpg",
  "https://i.ibb.co/bgkKRpY8/marco-meinken-L-54d-Bx-OD44-unsplash.jpg",
  "https://i.ibb.co/nNDQdrZp/yaroslav-muzychenko-x-G-p-V6-Eu-b-E-unsplash.jpg",
  "https://i.ibb.co/WN0Rqrf5/yigit-arisoy-Kb-G8fs8-BBPk-unsplash.jpg",
  "https://i.ibb.co/7tRr5tJR/eugene-chystiakov-bt-AYtt-Muww-unsplash.jpg",
  "https://i.ibb.co/Q3YFbsX1/ramon-kagie-Xmn7ja-Kh1-Y-unsplash.jpg",
  "https://i.ibb.co/wNYVk4fW/campbell-3-ZUs-NJhi-lk-unsplash.jpg",
  "https://i.ibb.co/jP2DCXFG/m-g-Fei-PAKlv-Svg-unsplash.jpg",
];

const categoryKeys = ["vehicles", "watches", "art", "aviation", "yachtsBoats", "jewellery", "fashionAccessories", "experiencesTickets"];
const sellCategoryKeys = [...categoryKeys, "other"];

const categoryImageMap = {
  vehicles: "https://i.ibb.co/1GqxYYfY/victor-furtuna-0mchr-VHAYzg-unsplash.jpg",
  watches: "https://i.ibb.co/rRmjZ0jK/atelierbyvineeth-ju-Y-gcjzk-Lo-unsplash.jpg",
  art: "https://i.ibb.co/ZpGws6wZ/amy-leigh-barnard-H3-APOj-YLvzk-unsplash.jpg",
  aviation: "https://i.ibb.co/gM6dK6gJ/david-syphers-9v-X30e-Ys-Bdc-unsplash.jpg",
  yachtsBoats: "https://i.ibb.co/PvVPnCXV/claudio-poggio-MRVaz-Fxfm50-unsplash.jpg",
  jewellery: "https://i.ibb.co/VYW1RJMX/carlos-esteves-1-MWbw-Tae-JIA-unsplash.jpg",
  fashionAccessories: "https://i.ibb.co/XRGfgqV/rudy-issa-7-DUSKu-Gg-Ly-M-unsplash.jpg",
  experiencesTickets: "https://i.ibb.co/spnPyw5Q/pexels-samuel-phillips-2148550424-36920232.jpg",
};

const sharedCategoryData = {
  EN: {
    categories: { vehicles: "Vehicles", watches: "Watches", art: "Art", aviation: "Aviation", yachtsBoats: "Yachts & Boats", jewellery: "Jewellery", fashionAccessories: "Fashion & Accessories", experiencesTickets: "Experiences & Tickets", other: "Other" },
    categoryFieldLabels: { vehicles: "Brand / Model", watches: "Brand / Model / Reference", art: "Artist / Artwork", aviation: "Aircraft Model", yachtsBoats: "Yacht / Boat Model", jewellery: "Brand / Piece / Material", fashionAccessories: "Brand / Item", experiencesTickets: "Event / Experience", other: "Asset / Item" },
    categoryFieldExamples: { vehicles: "Ferrari Purosangue", watches: "Rolex Daytona 126500LN", art: "Andy Warhol", aviation: "Gulfstream G650", yachtsBoats: "Riva 88 Folgore", jewellery: "Cartier Love Bracelet", fashionAccessories: "Hermès Birkin", experiencesTickets: "Formula 1 Monaco GP", other: "Describe the asset" },
  },
  DE: {
    categories: { vehicles: "Fahrzeuge", watches: "Uhren", art: "Kunst", aviation: "Luftfahrt", yachtsBoats: "Yachten & Boote", jewellery: "Schmuck", fashionAccessories: "Mode & Accessoires", experiencesTickets: "Erlebnisse & Tickets", other: "Weiteres" },
    categoryFieldLabels: { vehicles: "Marke / Modell", watches: "Marke / Modell / Referenz", art: "Künstler / Werk", aviation: "Flugzeugmodell", yachtsBoats: "Yacht- / Bootsmodell", jewellery: "Marke / Stück / Material", fashionAccessories: "Marke / Artikel", experiencesTickets: "Event / Erlebnis", other: "Asset / Gegenstand" },
    categoryFieldExamples: { vehicles: "Ferrari Purosangue", watches: "Rolex Daytona 126500LN", art: "Andy Warhol", aviation: "Gulfstream G650", yachtsBoats: "Riva 88 Folgore", jewellery: "Cartier Love Armband", fashionAccessories: "Hermès Birkin", experiencesTickets: "Formel 1 Monaco GP", other: "Asset beschreiben" },
  },
  FR: {
    categories: { vehicles: "Véhicules", watches: "Montres", art: "Art", aviation: "Aviation", yachtsBoats: "Yachts & Bateaux", jewellery: "Bijoux", fashionAccessories: "Mode & Accessoires", experiencesTickets: "Expériences & Billets", other: "Autre" },
    categoryFieldLabels: { vehicles: "Marque / Modèle", watches: "Marque / Modèle / Référence", art: "Artiste / Œuvre", aviation: "Modèle d’avion", yachtsBoats: "Modèle yacht / bateau", jewellery: "Marque / Pièce / Matériau", fashionAccessories: "Marque / Article", experiencesTickets: "Événement / Expérience", other: "Actif / Objet" },
    categoryFieldExamples: { vehicles: "Ferrari Purosangue", watches: "Rolex Daytona 126500LN", art: "Andy Warhol", aviation: "Gulfstream G650", yachtsBoats: "Riva 88 Folgore", jewellery: "Bracelet Cartier Love", fashionAccessories: "Hermès Birkin", experiencesTickets: "Formula 1 Monaco GP", other: "Décrire l’actif" },
  },
};

const translations = {
  EN: {
    ...sharedCategoryData.EN,
    based: "Based in Switzerland",
    navSourcing: "Sourcing",
    navSell: "Sell an Asset",
    navMembers: "Private Members",
    navAbout: "About",
    navContact: "Contact",
    label: "Asset Sourcing",
    headline: "Access to rare luxury assets.",
    intro: "Curated access to exceptional assets through trusted connections worldwide.",
    request: "Request Sourcing",
    learn: "Learn More",
    concierge: "Concierge",
    chooseCategory: "⚜️ Choose a Category",
    uploadDocuments: "Images / Documents (optional)",
    uploadServiceRecords: "Images / Service Records (optional)",
    sourcingTitle: "Looking for something specific?",
    sourcingText: "Submit what you are looking for. Opulence Archive assists with sourcing, introductions and selected opportunities across global luxury markets.",
    sourcingFeeText: "Transactions are handled on a success-fee basis.\n\nBrokerage fees generally range from 1% to 5%, depending on the nature of the asset, transaction size and sourcing requirements. ⚜️",
    trustPoints: ["Sourcing requests", "Selected asset submissions", "Swiss-based, international reach"],
    sellLabel: "Sellers",
    sellTitle: "Looking to sell an asset?",
    sellText: "Opulence Archive connects owners and collectors with qualified buyers through a carefully selected network.",
    sellFeeText: "Selected assets may be represented through brokerage agreements.\n\nCommission structures vary depending on the asset category, transaction size and overall transaction requirements. ⚜️",
    membersTitle: "Private Members",
    membersText: "A future members area for priority requests, closed-circle updates and curated access beyond the public page.",
    membersButton: "Request Access",
    membersComingSoon: "Coming Soon",
    membersPageText: "Private Members is planned as a future members area for priority requests, closed-circle updates and curated access beyond the public page. Access will open gradually and applications will be reviewed individually.",
    contactTitle: "Contact",
    contactText: "For sourcing requests, asset submissions or future membership access. Based in Switzerland, active internationally.",
    contactPrivate: "Inquiries via contact form",
    privacy: "Privacy Policy",
    terms: "Terms",
    cookies: "Cookie Policy",
    disclaimerPage: "Disclaimer",
    cookieBannerTitle: "Cookie Policy",
    cookieBannerText: "This website uses cookies and similar technologies for analytics, functionality and user experience improvements.",
    acceptCookies: "Accept",
    disclaimer: "Opulence Archive is an independent platform and is not officially connected with any brands mentioned or displayed. All brand names, trademarks and images belong to their respective owners.",
    aboutTitle: "About Opulence Archive",
    aboutText1: "Opulence Archive connects buyers, sellers and collectors through selected sourcing requests and asset submissions.",
    aboutText2: "The platform does not operate as a public marketplace, but as a contact point for opportunities across luxury categories.",
    aboutText3: "Each request is reviewed individually. Opulence Archive is independent, based in Switzerland and active internationally.",
    backHome: "← Back",
    submitApplication: "Submit Application",
    formError: "Please fill out all required fields",
    formSuccess: "Thank you. Your inquiry has been received and will be reviewed privately.",
    form: { name: "Full name", email: "Email", whatsapp: "WhatsApp number", assetLooking: "Asset Category", budget: "Budget", country: "Country", message: "Additional details, specifications or preferences", company: "I am contacting as a company", submitRequest: "Submit Request", assetType: "Asset Category", brandModel: "Brand / Model / Reference", yearCondition: "Year / Condition", priceExpectation: "Asking Price", documentsAvailable: "Ownership / documents available?", assetDetails: "Asset details, history, specifications, service information, etc.", submitAsset: "Submit Asset", city: "City", instagramOptional: "Instagram (optional)", interests: "Main luxury interests", experience: "Reason for joining", communicationLanguage: "Preferred communication language", languageEnglish: "English", languageGerman: "German", languageFrench: "French" },
  },
  DE: {
    ...sharedCategoryData.DE,
    based: "Sitz in der Schweiz",
    navSourcing: "Sourcing",
    navSell: "Asset verkaufen",
    navMembers: "Private Mitglieder",
    navAbout: "Über uns",
    navContact: "Kontakt",
    label: "Asset-Vermittlung",
    headline: "Zugang zu seltenen Luxusgütern.",
    intro: "Zugang zu aussergewöhnlichen Assets über ausgewählte Kontakte weltweit.",
    request: "Sourcing anfragen",
    learn: "Mehr erfahren",
    concierge: "Concierge",
    chooseCategory: "⚜️ Kategorie auswählen",
    uploadDocuments: "Bilder / Dokumente (optional)",
    uploadServiceRecords: "Bilder / Serviceunterlagen (optional)",
    sourcingTitle: "Suchst du etwas Bestimmtes?",
    sourcingText: "Sende uns, wonach du suchst. Opulence Archive unterstützt beim Sourcing, bei Vorstellungen und bei ausgewählten Möglichkeiten im globalen Luxusmarkt.",
    sourcingFeeText: "Transaktionen werden auf Erfolgsbasis betreut.\n\nVermittlungsgebühren liegen in der Regel zwischen 1% und 5%, abhängig von Asset-Kategorie, Transaktionsvolumen und Sourcing-Aufwand. ⚜️",
    trustPoints: ["Sourcing-Anfragen", "Ausgewählte Asset-Einreichungen", "Schweizer Basis, internationale Reichweite"],
    sellLabel: "Verkäufer",
    sellTitle: "Möchtest du ein Asset verkaufen?",
    sellText: "Opulence Archive verbindet Besitzer und Sammler mit passenden Käufern über ein ausgewähltes Netzwerk.",
    sellFeeText: "Ausgewählte Assets können über Vermittlungsvereinbarungen vertreten werden.\n\nProvisionsstrukturen variieren je nach Asset-Kategorie, Transaktionsvolumen und gesamtem Aufwand der Transaktion. ⚜️",
    membersTitle: "Private Mitglieder",
    membersText: "Ein zukünftiger Mitgliederbereich für priorisierte Anfragen, geschlossene Updates und kuratierten Zugang ausserhalb der öffentlichen Seite.",
    membersButton: "Zugang anfragen",
    membersComingSoon: "Demnächst",
    membersPageText: "Private Members ist als zukünftiger Mitgliederbereich für priorisierte Anfragen, geschlossene Updates und kuratierten Zugang ausserhalb der öffentlichen Seite geplant. Der Zugang wird schrittweise geöffnet und Bewerbungen werden individuell geprüft.",
    contactTitle: "Kontakt",
    contactText: "Für Sourcing-Anfragen, Asset-Einreichungen oder zukünftigen Membership-Zugang. Sitz in der Schweiz, international aktiv.",
    contactPrivate: "Anfragen über das Kontaktformular",
    privacy: "Datenschutz",
    terms: "AGB",
    cookies: "Cookie-Richtlinie",
    disclaimerPage: "Disclaimer",
    cookieBannerTitle: "Cookie-Richtlinie",
    cookieBannerText: "Diese Website verwendet Cookies und ähnliche Technologien für Analytics, Funktionalität und bessere Nutzererfahrung.",
    acceptCookies: "Akzeptieren",
    disclaimer: "Opulence Archive ist eine unabhängige Plattform und steht in keiner offiziellen Verbindung zu genannten oder gezeigten Marken. Alle Markennamen, Warenzeichen und Bilder gehören den jeweiligen Eigentümern.",
    aboutTitle: "Über Opulence Archive",
    aboutText1: "Opulence Archive verbindet Käufer, Verkäufer und Sammler über ausgewählte Sourcing-Anfragen und Asset-Einreichungen.",
    aboutText2: "Die Plattform funktioniert nicht als öffentlicher Marktplatz, sondern als Kontaktstelle für Möglichkeiten in verschiedenen Luxuskategorien.",
    aboutText3: "Jede Anfrage wird individuell geprüft. Opulence Archive ist unabhängig, in der Schweiz basiert und international aktiv.",
    backHome: "← Zurück",
    submitApplication: "Bewerbung senden",
    formError: "Bitte fülle alle Pflichtfelder aus",
    formSuccess: "Danke. Deine Anfrage wurde erhalten und wird privat geprüft.",
    form: { name: "Vollständiger Name", email: "Email", whatsapp: "WhatsApp Nummer", assetLooking: "Asset-Kategorie", budget: "Budget", country: "Land", message: "Weitere Details, Spezifikationen oder Wünsche", company: "Ich kontaktiere als Firma", submitRequest: "Anfrage senden", assetType: "Asset-Kategorie", brandModel: "Marke / Modell / Referenz", yearCondition: "Jahr / Zustand", priceExpectation: "Preisvorstellung", documentsAvailable: "Eigentum / Dokumente vorhanden?", assetDetails: "Details, Historie, Spezifikationen, Serviceinformationen usw.", submitAsset: "Asset einreichen", city: "Stadt", instagramOptional: "Instagram (optional)", interests: "Luxus-Interessen", experience: "Grund beizutreten", communicationLanguage: "Bevorzugte Kommunikationssprache", languageEnglish: "Englisch", languageGerman: "Deutsch", languageFrench: "Französisch" },
  },
  FR: {
    ...sharedCategoryData.FR,
    based: "Basé en Suisse",
    navSourcing: "Sourcing",
    navSell: "Vendre un actif",
    navMembers: "Membres privés",
    navAbout: "À propos",
    navContact: "Contact",
    label: "Sourcing d’actifs",
    headline: "Accès à des actifs de luxe rares.",
    intro: "Accès à des actifs d’exception grâce à un réseau sélectionné à l’international.",
    request: "Demande de sourcing",
    learn: "En savoir plus",
    concierge: "Concierge",
    chooseCategory: "⚜️ Choisir une catégorie",
    uploadDocuments: "Images / Documents (optionnel)",
    uploadServiceRecords: "Images / Documents de service (optionnel)",
    sourcingTitle: "Vous recherchez quelque chose de précis ?",
    sourcingText: "Envoyez ce que vous recherchez. Opulence Archive aide au sourcing, aux introductions et aux opportunités sélectionnées sur les marchés du luxe internationaux.",
    sourcingFeeText: "Les transactions sont traitées sur une base de commission au succès.\n\nLes commissions se situent généralement entre 1% et 5%, selon la nature de l’actif, le volume de la transaction et les exigences de sourcing. ⚜️",
    trustPoints: ["Demandes de sourcing", "Soumissions d’actifs sélectionnées", "Basé en Suisse, portée internationale"],
    sellLabel: "Vendeurs",
    sellTitle: "Vous souhaitez vendre un actif ?",
    sellText: "Opulence Archive met en relation propriétaires et collectionneurs avec des acheteurs qualifiés via un réseau sélectionné.",
    sellFeeText: "Certains actifs peuvent être représentés par des accords de courtage.\n\nLes structures de commission varient selon la catégorie d’actif, le volume de transaction et les exigences globales de la transaction. ⚜️",
    membersTitle: "Membres privés",
    membersText: "Un futur espace membres pour demandes prioritaires, mises à jour en cercle fermé et accès curaté au-delà de la page publique.",
    membersButton: "Accès anticipé",
    membersComingSoon: "Bientôt",
    membersPageText: "Private Members est prévu comme futur espace membres pour demandes prioritaires, mises à jour en cercle fermé et accès curaté au-delà de la page publique. L’accès sera ouvert progressivement et les candidatures seront examinées individuellement.",
    contactTitle: "Contact",
    contactText: "Pour demandes de sourcing, soumissions d’actifs ou accès futur membre. Basé en Suisse, actif à l’international.",
    contactPrivate: "Demandes via le formulaire de contact",
    privacy: "Confidentialité",
    terms: "Conditions",
    cookies: "Politique des cookies",
    disclaimerPage: "Disclaimer",
    cookieBannerTitle: "Politique des cookies",
    cookieBannerText: "Ce site utilise des cookies et technologies similaires pour l’analyse, le fonctionnement et l’amélioration de l’expérience utilisateur.",
    acceptCookies: "Accepter",
    disclaimer: "Opulence Archive est une plateforme indépendante et n’est pas officiellement liée aux marques mentionnées ou affichées. Tous les noms de marques, marques déposées et images appartiennent à leurs propriétaires respectifs.",
    aboutTitle: "À propos d’Opulence Archive",
    aboutText1: "Opulence Archive met en relation acheteurs, vendeurs et collectionneurs via des demandes de sourcing et soumissions d’actifs sélectionnées.",
    aboutText2: "La plateforme ne fonctionne pas comme une marketplace publique, mais comme un point de contact pour des opportunités dans différentes catégories de luxe.",
    aboutText3: "Chaque demande est examinée individuellement. Opulence Archive est indépendant, basé en Suisse et actif à l’international.",
    backHome: "← Retour",
    submitApplication: "Envoyer la candidature",
    formError: "Veuillez remplir tous les champs obligatoires",
    formSuccess: "Merci. Votre demande a été reçue et sera examinée en privé.",
    form: { name: "Nom complet", email: "Email", whatsapp: "Numéro WhatsApp", assetLooking: "Catégorie d’actif", budget: "Budget", country: "Pays", message: "Détails, spécifications ou préférences supplémentaires", company: "Je contacte en tant qu’entreprise", submitRequest: "Envoyer la demande", assetType: "Catégorie d’actif", brandModel: "Marque / Modèle / Référence", yearCondition: "Année / État", priceExpectation: "Prix demandé", documentsAvailable: "Propriété / documents disponibles ?", assetDetails: "Détails, historique, spécifications, informations de service, etc.", submitAsset: "Soumettre l’actif", city: "Ville", instagramOptional: "Instagram (optionnel)", interests: "Intérêts luxe principaux", experience: "Raison de rejoindre", communicationLanguage: "Langue de communication préférée", languageEnglish: "Anglais", languageGerman: "Allemand", languageFrench: "Français" },
  },
};

const legalTemplates = {
  privacy: {
    title: { EN: "Opulence Archive Privacy Policy", DE: "Datenschutzrichtlinie von Opulence Archive", FR: "Politique de confidentialité Opulence Archive" },
    date: { EN: "Effective Date: 11 May 2026", DE: "Gültig ab: 11. Mai 2026", FR: "Date d’effet : 11 mai 2026" },
    intro: {
      EN: "Opulence Archive respects your privacy and is committed to protecting personal information collected through this website and related communication channels.",
      DE: "Opulence Archive respektiert deine Privatsphäre und verpflichtet sich zum Schutz personenbezogener Daten, die über diese Website und verbundene Kommunikationskanäle erfasst werden.",
      FR: "Opulence Archive respecte votre vie privée et s’engage à protéger les données personnelles collectées via ce site et les canaux de communication associés."
    },
    sections: {
      EN: [
        { title: "Information We Collect", text: "We may collect names, email addresses, WhatsApp numbers, Instagram usernames, company details, sourcing requests, asset submissions, uploaded documents, browser data, analytics information, IP addresses and other voluntarily submitted information through forms or communication." },
        { title: "Purpose of Data Collection", text: "Information may be used to review sourcing requests, evaluate asset submissions, communicate with clients, improve website functionality, prevent abuse, maintain security and operate the platform efficiently." },
        { title: "Communication", text: "By submitting forms or contacting Opulence Archive, users understand that communication may occur through email, WhatsApp or other relevant communication channels related to the inquiry." },
        { title: "Analytics & Technical Data", text: "The website may use analytics tools, cookies and similar technologies to understand traffic, improve performance and monitor website functionality. Certain technical information may automatically be collected by browsers and servers." },
        { title: "Third-Party Providers", text: "Trusted third-party providers may assist with hosting, analytics, communication infrastructure, cloud storage, form processing or future payment-related functionality. These providers may process information where necessary for operational purposes." },
        { title: "Data Storage", text: "Information may be stored securely through hosting providers, email systems or cloud-based services used to operate Opulence Archive. Reasonable efforts are made to protect submitted information from unauthorized access." },
        { title: "International Visitors", text: "Because Opulence Archive operates internationally, submitted information may be processed across different jurisdictions depending on communication, hosting or service providers." },
        { title: "User Rights", text: `Where legally applicable, users may request access, correction or deletion of personal data. Requests may be submitted to ${EMAIL_ADDRESS}.` },
        { title: "Data Retention", text: "Information may be retained for operational, legal, security or business purposes for as long as reasonably necessary." },
        { title: "Policy Updates", text: "This Privacy Policy may be updated periodically without prior notice. Continued use of the website indicates acceptance of the updated policy." }
      ],
      DE: [
        { title: "Erfasste Informationen", text: "Es können Namen, Email-Adressen, WhatsApp Nummern, Instagram-Namen, Firmendaten, Sourcing-Anfragen, Asset-Einreichungen, hochgeladene Dokumente, Browserdaten, Analytics-Informationen, IP-Adressen sowie freiwillig übermittelte Informationen erfasst werden." },
        { title: "Zweck der Datenerfassung", text: "Informationen können verwendet werden, um Sourcing-Anfragen zu prüfen, Asset-Einreichungen zu bewerten, mit Kunden zu kommunizieren, die Website zu verbessern, Missbrauch zu verhindern und den Betrieb der Plattform sicherzustellen." },
        { title: "Kommunikation", text: "Mit dem Absenden von Formularen oder der Kontaktaufnahme erklärt sich der Nutzer damit einverstanden, dass Kommunikation per Email, WhatsApp oder anderen relevanten Kommunikationskanälen erfolgen kann." },
        { title: "Analytics & technische Daten", text: "Die Website kann Analytics-Tools, Cookies und ähnliche Technologien verwenden, um Traffic zu analysieren, Performance zu verbessern und Funktionen der Website zu überwachen. Bestimmte technische Daten können automatisch erfasst werden." },
        { title: "Drittanbieter", text: "Vertrauenswürdige Drittanbieter können Hosting, Analytics, Kommunikationsinfrastruktur, Cloudspeicherung, Formularverarbeitung oder zukünftige Zahlungsfunktionen unterstützen." },
        { title: "Datenspeicherung", text: "Informationen können sicher über Hostinganbieter, Emailsysteme oder Cloud-Dienste gespeichert werden, die für den Betrieb von Opulence Archive verwendet werden." },
        { title: "Internationale Nutzung", text: "Da Opulence Archive international tätig ist, können Informationen je nach Hosting- oder Kommunikationsanbieter in verschiedenen Ländern verarbeitet werden." },
        { title: "Rechte der Nutzer", text: `Soweit gesetzlich anwendbar, können Nutzer Zugriff, Korrektur oder Löschung ihrer Daten verlangen. Kontakt: ${EMAIL_ADDRESS}.` },
        { title: "Aufbewahrung von Daten", text: "Informationen können aus betrieblichen, rechtlichen oder sicherheitsrelevanten Gründen solange gespeichert werden, wie es vernünftigerweise notwendig ist." },
        { title: "Änderungen", text: "Diese Datenschutzrichtlinie kann jederzeit ohne Vorankündigung angepasst werden. Die weitere Nutzung der Website gilt als Zustimmung zu den aktualisierten Bedingungen." }
      ],
      FR: [
        { title: "Informations collectées", text: "Nous pouvons collecter des noms, emails, numéros WhatsApp, comptes Instagram, informations d’entreprise, demandes de sourcing, soumissions d’actifs, documents téléchargés, données de navigateur, informations analytiques et autres informations transmises volontairement." },
        { title: "Objectif de la collecte", text: "Les informations peuvent être utilisées pour examiner les demandes, communiquer avec les clients, améliorer le site, prévenir les abus et assurer le fonctionnement de la plateforme." },
        { title: "Communication", text: "En envoyant un formulaire ou en contactant Opulence Archive, l’utilisateur accepte d’être contacté par email, WhatsApp ou d’autres canaux pertinents." },
        { title: "Analytics & données techniques", text: "Le site peut utiliser des outils analytiques, cookies et technologies similaires afin d’améliorer les performances et analyser le trafic." },
        { title: "Prestataires tiers", text: "Des prestataires tiers de confiance peuvent intervenir pour l’hébergement, l’analyse, le stockage cloud ou les infrastructures de communication." },
        { title: "Stockage des données", text: "Les informations peuvent être stockées de manière sécurisée via des services d’hébergement, emails ou plateformes cloud utilisées pour Opulence Archive." },
        { title: "Utilisation internationale", text: "Comme Opulence Archive opère à l’international, certaines données peuvent être traitées dans différentes juridictions." },
        { title: "Droits des utilisateurs", text: `Lorsque la loi applicable le permet, les utilisateurs peuvent demander l’accès, la correction ou la suppression de leurs données. Contact : ${EMAIL_ADDRESS}.` },
        { title: "Conservation des données", text: "Les informations peuvent être conservées aussi longtemps que raisonnablement nécessaire pour des raisons opérationnelles, juridiques ou sécuritaires." },
        { title: "Mises à jour", text: "Cette politique peut être modifiée à tout moment sans préavis. L’utilisation continue du site implique l’acceptation des modifications." }
      ]
    }
  },
  terms: {
    title: { EN: "Opulence Archive Terms & Conditions", DE: "Opulence Archive Allgemeine Geschäftsbedingungen", FR: "Conditions générales Opulence Archive" },
    date: { EN: "Effective Date: 11 May 2026", DE: "Gültig ab: 11. Mai 2026", FR: "Date d’effet : 11 mai 2026" },
    intro: {
      EN: "By accessing or using Opulence Archive, users agree to these Terms & Conditions.",
      DE: "Mit dem Zugriff auf oder der Nutzung von Opulence Archive akzeptieren Nutzer diese Allgemeinen Geschäftsbedingungen.",
      FR: "En accédant à Opulence Archive ou en utilisant la plateforme, les utilisateurs acceptent les présentes conditions générales."
    },
    sections: {
      EN: [
        { title: "Platform Overview", text: "Opulence Archive operates as an independent luxury sourcing, networking and introduction platform focused on selected opportunities and requests." },
        { title: "No Guarantee of Availability", text: "Assets, opportunities, pricing and availability may change without notice. Submission of an inquiry does not guarantee access, availability or completion of a transaction." },
        { title: "Intermediary Role", text: "Opulence Archive may act as an intermediary, sourcing partner or communication facilitator. The platform may not own, store or directly represent every listed or discussed asset." },
        { title: "User Conduct", text: "Users agree not to submit fraudulent, misleading, illegal or unauthorized information, assets or requests through the website." },
        { title: "Verification & Due Diligence", text: "Users remain responsible for conducting their own due diligence, verification, inspections, legal reviews and financial assessments before completing transactions." },
        { title: "Fees & Commissions", text: "Success fees, commissions or brokerage structures may apply depending on the nature of the transaction, sourcing requirements and involved parties." },
        { title: "Intellectual Property", text: "Website design, branding, text and original content remain the property of Opulence Archive unless otherwise stated. Third-party brand names remain the property of their respective owners." },
        { title: "No Investment Advice", text: "Nothing on the website constitutes investment, legal, tax, financial or professional advice." },
        { title: "Limitation of Liability", text: "Opulence Archive shall not be liable for transaction disputes, pricing inaccuracies, communication failures, third-party misconduct, losses, delays or damages resulting from use of the website or related interactions." },
        { title: "External Links & Third Parties", text: "The website may reference or connect users with third-party platforms, dealers, sellers, brokers or service providers. Opulence Archive is not responsible for third-party actions or content." },
        { title: "Changes to the Platform", text: "Features, services, categories or access may change, expand or be removed without prior notice." },
        { title: "Governing Law", text: "These Terms & Conditions shall be governed by the laws of Switzerland. Any disputes shall be subject to the applicable jurisdiction in Switzerland." }
      ],
      DE: [
        { title: "Überblick über die Plattform", text: "Opulence Archive agiert als unabhängige Luxus-Sourcing-, Networking- und Vermittlungsplattform für ausgewählte Möglichkeiten und Anfragen." },
        { title: "Keine Garantie", text: "Assets, Möglichkeiten, Preise und Verfügbarkeiten können sich jederzeit ohne Vorankündigung ändern. Eine Anfrage garantiert keinen erfolgreichen Abschluss oder Zugang." },
        { title: "Vermittlerrolle", text: "Opulence Archive kann als Vermittler, Sourcing-Partner oder Kommunikationsschnittstelle auftreten und besitzt nicht zwingend die dargestellten Assets." },
        { title: "Verhalten der Nutzer", text: "Nutzer verpflichten sich, keine betrügerischen, irreführenden, illegalen oder unautorisierten Informationen oder Assets einzureichen." },
        { title: "Prüfung & Eigenverantwortung", text: "Nutzer bleiben selbst verantwortlich für Prüfungen, Besichtigungen, rechtliche Abklärungen und finanzielle Entscheidungen vor Transaktionen." },
        { title: "Provisionen & Gebühren", text: "Je nach Transaktion, Aufwand und beteiligten Parteien können Erfolgsgebühren oder Provisionen anfallen." },
        { title: "Geistiges Eigentum", text: "Design, Branding, Texte und originale Inhalte der Website bleiben Eigentum von Opulence Archive, sofern nicht anders angegeben." },
        { title: "Keine Beratung", text: "Nichts auf dieser Website stellt Finanz-, Steuer-, Investment-, Rechts- oder professionelle Beratung dar." },
        { title: "Haftungsbeschränkung", text: "Opulence Archive haftet nicht für Streitigkeiten, Preisfehler, Kommunikationsprobleme, Fehlverhalten Dritter, Verluste oder Schäden im Zusammenhang mit der Nutzung der Website." },
        { title: "Externe Links & Drittparteien", text: "Die Website kann Nutzer mit Drittplattformen, Händlern, Verkäufern oder Dienstleistern verbinden. Für deren Inhalte oder Handlungen wird keine Verantwortung übernommen." },
        { title: "Änderungen der Plattform", text: "Funktionen, Services oder Kategorien können jederzeit erweitert, angepasst oder entfernt werden." },
        { title: "Anwendbares Recht", text: "Diese AGB unterstehen dem Recht der Schweiz. Gerichtsstand ist, soweit zulässig, in der Schweiz." }
      ],
      FR: [
        { title: "Présentation de la plateforme", text: "Opulence Archive agit comme plateforme indépendante de sourcing, networking et mise en relation dans le secteur du luxe." },
        { title: "Aucune garantie", text: "Les actifs, disponibilités et prix peuvent changer sans préavis. Une demande ne garantit pas l’accès ou la conclusion d’une transaction." },
        { title: "Rôle d’intermédiaire", text: "Opulence Archive peut agir comme intermédiaire, partenaire de sourcing ou facilitateur de communication." },
        { title: "Conduite des utilisateurs", text: "Les utilisateurs s’engagent à ne pas transmettre d’informations frauduleuses, trompeuses ou illégales." },
        { title: "Vérification & responsabilité", text: "Les utilisateurs restent responsables de leurs propres vérifications, inspections et décisions financières avant toute transaction." },
        { title: "Commissions & frais", text: "Des commissions ou frais de succès peuvent s’appliquer selon la nature de la transaction et les exigences de sourcing." },
        { title: "Propriété intellectuelle", text: "Le design, le branding et les contenus originaux du site restent la propriété d’Opulence Archive sauf indication contraire." },
        { title: "Aucun conseil professionnel", text: "Rien sur ce site ne constitue un conseil financier, juridique, fiscal ou professionnel." },
        { title: "Limitation de responsabilité", text: "Opulence Archive ne pourra être tenu responsable des litiges, pertes, erreurs de prix ou comportements de tiers liés à l’utilisation du site." },
        { title: "Liens externes & tiers", text: "Le site peut connecter les utilisateurs avec des plateformes ou prestataires tiers. Opulence Archive n’est pas responsable de leurs actions." },
        { title: "Évolution de la plateforme", text: "Les fonctionnalités et services peuvent être modifiés ou supprimés à tout moment." },
        { title: "Droit applicable", text: "Ces conditions générales sont régies par le droit suisse." }
      ]
    }
  },
  cookies: {
    title: { EN: "Opulence Archive Cookie Policy", DE: "Opulence Archive Cookie-Richtlinie", FR: "Politique des cookies Opulence Archive" },
    date: { EN: "Effective Date: 11 May 2026", DE: "Gültig ab: 11. Mai 2026", FR: "Date d’effet : 11 mai 2026" },
    intro: {
      EN: "This Cookie Policy explains how cookies and related technologies may be used on the website.",
      DE: "Diese Cookie-Richtlinie erklärt, wie Cookies und ähnliche Technologien auf der Website verwendet werden können.",
      FR: "Cette politique explique comment les cookies et technologies similaires peuvent être utilisés sur le site."
    },
    sections: {
      EN: [
        { title: "What Cookies Are", text: "Cookies are small text files stored on a device to improve website functionality and user experience." },
        { title: "Purpose of Cookies", text: "Cookies may be used for analytics, remembering preferences, maintaining performance, improving functionality and understanding visitor behavior." },
        { title: "Analytics Services", text: "The website may use analytics providers or traffic monitoring services that collect anonymous or technical visitor information." },
        { title: "Managing Cookies", text: "Users may disable or manage cookies through browser settings. Certain website functionality may be affected if cookies are disabled." },
        { title: "Third-Party Technologies", text: "Third-party services integrated into the website may use their own cookies or technologies according to their own policies." }
      ],
      DE: [
        { title: "Was Cookies sind", text: "Cookies sind kleine Dateien, die auf Geräten gespeichert werden, um Funktionalität und Nutzererfahrung zu verbessern." },
        { title: "Zweck von Cookies", text: "Cookies können für Analytics, Präferenzen, Performance und das Verständnis des Nutzerverhaltens verwendet werden." },
        { title: "Analytics-Dienste", text: "Die Website kann Analytics- oder Traffic-Dienste verwenden, die technische oder anonyme Besucherdaten erfassen." },
        { title: "Cookie-Verwaltung", text: "Cookies können über Browser-Einstellungen deaktiviert oder verwaltet werden. Bestimmte Funktionen der Website könnten dadurch eingeschränkt sein." },
        { title: "Drittanbieter-Technologien", text: "Integrierte Drittanbieter können eigene Cookies oder Technologien gemäss ihren eigenen Richtlinien verwenden." }
      ],
      FR: [
        { title: "Définition des cookies", text: "Les cookies sont de petits fichiers stockés sur les appareils afin d’améliorer le fonctionnement du site." },
        { title: "Objectif des cookies", text: "Les cookies peuvent être utilisés pour les analyses, préférences utilisateur et améliorations techniques." },
        { title: "Services analytiques", text: "Le site peut utiliser des services analytiques ou de suivi du trafic collectant des données techniques anonymes." },
        { title: "Gestion des cookies", text: "Les utilisateurs peuvent gérer ou désactiver les cookies via les paramètres du navigateur." },
        { title: "Technologies tierces", text: "Des services tiers intégrés au site peuvent utiliser leurs propres technologies conformément à leurs politiques." }
      ]
    }
  },
  disclaimer: {
    title: { EN: "Opulence Archive Disclaimer", DE: "Opulence Archive Disclaimer", FR: "Disclaimer Opulence Archive" },
    date: { EN: "Effective Date: 11 May 2026", DE: "Gültig ab: 11. Mai 2026", FR: "Date d’effet : 11 mai 2026" },
    intro: {
      EN: "This website is provided for informational, networking and sourcing purposes only.",
      DE: "Diese Website dient ausschliesslich Informations-, Networking- und Sourcing-Zwecken.",
      FR: "Ce site est fourni uniquement à des fins d’information, de networking et de sourcing."
    },
    sections: {
      EN: [
        { title: "Independent Platform", text: "Opulence Archive is an independent platform and is not officially affiliated with brands displayed or referenced on the website." },
        { title: "Authenticity", text: "Opulence Archive does not knowingly promote counterfeit products and aims to work only with legitimate opportunities and contacts." },
        { title: "No Guarantees", text: "No guarantee is made regarding transaction success, sourcing outcomes, pricing, asset condition, availability or seller/buyer behavior." },
        { title: "Third Parties", text: "Transactions, communications or introductions may involve independent third parties outside the control of Opulence Archive." },
        { title: "No Professional Advice", text: "Website content does not constitute investment, legal, tax, financial or professional advice." },
        { title: "Use at Own Risk", text: "Users access and use the website and related communications at their own discretion and risk." }
      ],
      DE: [
        { title: "Unabhängige Plattform", text: "Opulence Archive ist eine unabhängige Plattform und steht in keiner offiziellen Verbindung zu dargestellten Marken." },
        { title: "Authentizität", text: "Opulence Archive bewirbt wissentlich keine gefälschten Produkte und versucht ausschliesslich mit legitimen Kontakten und Möglichkeiten zu arbeiten." },
        { title: "Keine Garantien", text: "Es wird keine Garantie für erfolgreiche Transaktionen, Verfügbarkeiten, Preise oder den Zustand von Assets übernommen." },
        { title: "Drittparteien", text: "Transaktionen oder Vorstellungen können unabhängige Drittparteien beinhalten, die ausserhalb der Kontrolle von Opulence Archive liegen." },
        { title: "Keine professionelle Beratung", text: "Inhalte der Website stellen keine Finanz-, Steuer-, Rechts- oder professionelle Beratung dar." },
        { title: "Nutzung auf eigenes Risiko", text: "Die Nutzung der Website und verbundener Kommunikation erfolgt auf eigenes Risiko des Nutzers." }
      ],
      FR: [
        { title: "Plateforme indépendante", text: "Opulence Archive est une plateforme indépendante sans affiliation officielle avec les marques affichées." },
        { title: "Authenticité", text: "Opulence Archive ne promeut pas volontairement de produits contrefaits et cherche à travailler avec des opportunités légitimes." },
        { title: "Aucune garantie", text: "Aucune garantie n’est donnée concernant les transactions, disponibilités, prix ou états des actifs." },
        { title: "Tiers", text: "Certaines transactions ou mises en relation peuvent impliquer des tiers indépendants hors du contrôle d’Opulence Archive." },
        { title: "Aucun conseil professionnel", text: "Le contenu du site ne constitue aucun conseil juridique, financier, fiscal ou professionnel." },
        { title: "Utilisation à vos risques", text: "L’utilisation du site et des communications associées se fait sous la responsabilité de l’utilisateur." }
      ]
    }
  }
};

function buildLegalPage(type, lang) {
  const page = legalTemplates[type];
  return {
    title: page.title[lang] || page.title.EN,
    date: page.date[lang] || page.date.EN,
    intro: page.intro[lang] || page.intro.EN,
    sections: page.sections[lang] || page.sections.EN,
  };
}

function buildMailto(subject, fields) {
  const body = Object.entries(fields)
    .map(([label, value]) => `${label}: ${value || "-"}`)
    .join("\n");
  return `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function FieldInput({ value, onChange, placeholder, type = "text", required = false, hasError = false }) {
  return (
    <input
      required={required}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`bg-black/40 border px-4 py-4 outline-none text-white placeholder:text-white/35 transition ${hasError ? "border-red-400 focus:border-red-400" : "border-white/10 focus:border-[#d4af37]/60"}`}
    />
  );
}

function TextArea({ value, onChange, placeholder, rows = 5 }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="bg-black/40 border border-white/10 focus:border-[#d4af37]/60 px-4 py-4 outline-none text-white placeholder:text-white/35 transition"
    />
  );
}

function LanguageSelect({ value, onChange, t, hasError = false }) {
  return (
    <select value={value} onChange={onChange} className={`bg-black/40 border px-4 py-4 outline-none text-white transition ${hasError ? "border-red-400 focus:border-red-400" : "border-white/10 focus:border-[#d4af37]/60"}`}>
      <option value="">{t.form.communicationLanguage}</option>
      <option value="English">{t.form.languageEnglish}</option>
      <option value="German">{t.form.languageGerman}</option>
      <option value="French">{t.form.languageFrench}</option>
    </select>
  );
}

function UploadField({ label, files, onChange }) {
  return (
    <label className="border border-dashed border-white/15 hover:border-[#d4af37]/40 transition bg-black/30 px-4 py-5 text-white/45 text-sm cursor-pointer">
      <div className="flex items-center justify-between gap-4">
        <span>{label}</span>
        <span className="text-[#d4af37] text-xs tracking-[0.12em] uppercase">Upload</span>
      </div>
      <input type="file" multiple onChange={onChange} className="hidden" />
      {files.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {files.map((file, index) => (
            <span key={`${file.name}-${index}`} className="border border-[#d4af37]/20 bg-[#d4af37]/10 text-[#d4af37] px-3 py-1 text-xs">
              {file.name}
            </span>
          ))}
        </div>
      )}
    </label>
  );
}

function CompanyCheckbox({ checked, onChange, label }) {
  return (
    <label className="relative z-10 flex items-center gap-3 text-[13px] text-white/55 pt-3 select-none min-h-[44px]">
      <input type="checkbox" checked={checked} onChange={onChange} className="accent-[#d4af37] w-4 h-4 shrink-0" />
      {label}
    </label>
  );
}

function LanguageSwitch({ lang, setLang }) {
  const buttonClass = (code) =>
    `relative z-10 inline-flex items-center justify-center text-xs hover:scale-105 transition px-1.5 py-1 min-w-[26px] min-h-[26px] ${lang === code ? "opacity-100" : "opacity-45"}`;

  return (
    <div className="flex gap-0.5 mr-0 md:mr-2 items-center bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-full">
      <button type="button" onClick={() => setLang("EN")} aria-label="English" className={buttonClass("EN")}>🇬🇧</button>
      <button type="button" onClick={() => setLang("DE")} aria-label="Deutsch" className={buttonClass("DE")}>🇩🇪</button>
      <button type="button" onClick={() => setLang("FR")} aria-label="Français" className={buttonClass("FR")}>🇫🇷</button>
    </div>
  );
}

function LegalContent({ legal }) {
  return (
    <section className="max-w-4xl mx-auto py-16">
      <h1 className="text-4xl md:text-5xl text-[#d4af37] mb-4">{legal.title}</h1>
      <p className="text-white/40 font-sans mb-10">{legal.date}</p>
      <p className="text-white/70 font-sans leading-7 mb-10">{legal.intro}</p>
      <div className="grid gap-8 font-sans">
        {legal.sections.map((section) => (
          <div key={section.title} className="border-t border-white/10 pt-6">
            <h2 className="text-[#d4af37] text-xl mb-4">{section.title}</h2>
            <p className="text-white/65 leading-7">{section.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CookieBanner({ t, onAccept, onLearnMore }) {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[1200] w-[92%] max-w-2xl bg-black/90 border border-white/10 backdrop-blur-xl p-5 md:p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center gap-5 justify-between">
        <div>
          <p className="text-[#d4af37] text-sm tracking-[0.12em] font-sans mb-2">{t.cookieBannerTitle}</p>
          <p className="text-white/65 text-sm leading-6 font-sans">{t.cookieBannerText}</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button type="button" onClick={onLearnMore} className="relative z-10 border border-white/15 px-6 py-5 text-xs tracking-[0.08em] font-sans hover:border-[#d4af37] transition">{t.learn}</button>
          <button type="button" onClick={onAccept} className="relative z-10 bg-[#d4af37] text-black px-7 py-5 text-xs tracking-[0.08em] font-sans hover:opacity-90 transition">{t.acceptCookies}</button>
        </div>
      </div>
    </div>
  );
}

function Footer({ t, changePage }) {
  const footerButtonClass = "relative z-10 inline-flex items-center justify-center hover:text-[#d4af37] transition px-5 py-4 -mx-5 -my-4 min-h-[44px] pointer-events-auto";
  return (
    <footer className="text-center text-white/30 text-xs font-sans px-6 pb-10 max-w-4xl mx-auto leading-6">
      <p className="mb-5">{t.disclaimer}</p>
      <div className="flex justify-center flex-wrap gap-5 text-white/35 tracking-[0.08em]">
        <button type="button" onClick={() => changePage("privacy")} className={footerButtonClass}>{t.privacy}</button>
        <button type="button" onClick={() => changePage("terms")} className={footerButtonClass}>{t.terms}</button>
        <button type="button" onClick={() => changePage("cookies")} className={footerButtonClass}>{t.cookies}</button>
        <button type="button" onClick={() => changePage("disclaimer")} className={footerButtonClass}>{t.disclaimerPage}</button>
      </div>
    </footer>
  );
}

function FeeBox({ text }) {
  return (
    <div className="border border-[#d4af37]/20 bg-[#d4af37]/[0.04] px-5 py-5">
      <p className="text-[#d4af37] text-sm leading-7 font-sans whitespace-pre-line">{text}</p>
    </div>
  );
}

function TrustPoints({ points }) {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-10 grid grid-cols-1 md:grid-cols-3 gap-3 font-sans">
      {points.map((point) => (
        <div key={point} className="border border-white/10 bg-white/[0.025] px-5 py-4 text-white/60 text-sm tracking-[0.04em]">
          {point}
        </div>
      ))}
    </section>
  );
}

export default function OpulenceArchiveWebsite() {
  const [lang, setLang] = useState("EN");
  const [page, setPage] = useState("home");
  const [heroIndex, setHeroIndex] = useState(0);
  const [previousHeroIndex, setPreviousHeroIndex] = useState(0);
  const [isHeroFading, setIsHeroFading] = useState(false);
  const [sourcingError, setSourcingError] = useState(false);
  const [sellError, setSellError] = useState(false);
  const [sourcingSuccess, setSourcingSuccess] = useState(false);
  const [sellSuccess, setSellSuccess] = useState(false);
  const [membersSuccess, setMembersSuccess] = useState(false);
  const [sourcingTouchedSubmit, setSourcingTouchedSubmit] = useState(false);
  const [sellTouchedSubmit, setSellTouchedSubmit] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [siteVisible, setSiteVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sourcingFiles, setSourcingFiles] = useState([]);
  const [sellFiles, setSellFiles] = useState([]);

  const t = translations[lang] || translations.EN;
  const [sourcingForm, setSourcingForm] = useState({ name: "", email: "", whatsapp: "", communicationLanguage: "", categoryKey: "", asset: "", brandModel: "", budget: "", country: "", message: "", company: false });
  const [sellForm, setSellForm] = useState({ name: "", email: "", whatsapp: "", communicationLanguage: "", assetKey: "", assetType: "", model: "", yearCondition: "", price: "", country: "", documents: "", details: "", company: false });
  const [membersForm, setMembersForm] = useState({ name: "", email: "", whatsapp: "", communicationLanguage: "", country: "", city: "", instagram: "", interests: "", experience: "" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedCookieState = window.localStorage.getItem("opulence-cookie-consent");
    if (savedCookieState === "accepted") setCookiesAccepted(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setSiteVisible(true), 900);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timeout;
    const interval = setInterval(() => {
      setIsHeroFading(true);
      timeout = setTimeout(() => {
        setHeroIndex((current) => {
          setPreviousHeroIndex(current);
          return (current + 1) % heroImages.length;
        });
        setIsHeroFading(false);
      }, 1200);
    }, 8000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const categories = useMemo(() => categoryKeys.map((key) => ({ key, label: t.categories[key] || translations.EN.categories[key], image: categoryImageMap[key] || fallbackImage })), [t]);

  const updateSourcing = (field, value) => {
    setSourcingSuccess(false);
    setSourcingForm((current) => ({ ...current, [field]: value }));
  };

  const updateSell = (field, value) => {
    setSellSuccess(false);
    setSellForm((current) => ({ ...current, [field]: value }));
  };

  const updateMembers = (field, value) => {
    setMembersSuccess(false);
    setMembersForm((current) => ({ ...current, [field]: value }));
  };

  const changePage = (nextPage) => {
    setMobileMenuOpen(false);
    setPage(nextPage);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" });
  };

  const slowScrollTo = (targetY, duration = 1400) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();
    const easeInOutCubic = (progress) => progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(progress));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  const goToSection = (id) => {
    setMobileMenuOpen(false);
    setPage("home");
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      slowScrollTo(y, 1600);
    }, 80);
  };

  const goToSourcingCategory = (category) => {
    setSourcingSuccess(false);
    setSourcingForm((current) => ({ ...current, categoryKey: category.key, asset: category.label }));
    setSellForm((current) => ({ ...current, assetKey: category.key, assetType: category.label }));
    goToSection("sourcing");
  };

  const currentSourcingFieldLabel = sourcingForm.categoryKey ? t.categoryFieldLabels[sourcingForm.categoryKey] : t.form.brandModel;
  const currentSourcingFieldExample = sourcingForm.categoryKey ? t.categoryFieldExamples[sourcingForm.categoryKey] : t.form.brandModel;
  const currentSellFieldLabel = sellForm.assetKey ? t.categoryFieldLabels[sellForm.assetKey] : t.form.brandModel;
  const currentSellFieldExample = sellForm.assetKey ? t.categoryFieldExamples[sellForm.assetKey] : t.form.brandModel;

  const acceptCookies = () => {
    if (typeof window !== "undefined") window.localStorage.setItem("opulence-cookie-consent", "accepted");
    setCookiesAccepted(true);
  };

  const sendSourcingRequest = (event) => {
    event.preventDefault();
    setSourcingTouchedSubmit(true);
    if (!sourcingForm.name || !sourcingForm.email || !sourcingForm.whatsapp || !sourcingForm.communicationLanguage || !sourcingForm.asset || !sourcingForm.budget || !sourcingForm.country) {
      setSourcingError(true);
      return;
    }
    setSourcingError(false);
    const mailto = buildMailto("Opulence Archive - Sourcing Request", {
      Name: sourcingForm.name,
      Email: sourcingForm.email,
      WhatsApp: sourcingForm.whatsapp,
      "Communication Language": sourcingForm.communicationLanguage,
      "Asset Category": sourcingForm.asset,
      [currentSourcingFieldLabel]: sourcingForm.brandModel,
      Budget: sourcingForm.budget,
      Country: sourcingForm.country,
      Details: sourcingForm.message,
      Company: sourcingForm.company ? "Yes" : "No",
    });
    setSourcingForm({ name: "", email: "", whatsapp: "", communicationLanguage: "", categoryKey: "", asset: "", brandModel: "", budget: "", country: "", message: "", company: false });
    setSourcingTouchedSubmit(false);
    setSourcingSuccess(true);
    setSourcingFiles([]);
    window.location.href = mailto;
  };

  const sendAssetSubmission = (event) => {
    event.preventDefault();
    setSellTouchedSubmit(true);
    if (!sellForm.name || !sellForm.email || !sellForm.whatsapp || !sellForm.communicationLanguage || !sellForm.assetType || !sellForm.model || !sellForm.price || !sellForm.country) {
      setSellError(true);
      return;
    }
    setSellError(false);
    const mailto = buildMailto("Opulence Archive - Asset Submission", {
      Name: sellForm.name,
      Email: sellForm.email,
      WhatsApp: sellForm.whatsapp,
      "Communication Language": sellForm.communicationLanguage,
      "Asset Category": sellForm.assetType,
      [currentSellFieldLabel]: sellForm.model,
      "Year / Condition": sellForm.yearCondition,
      "Asking Price": sellForm.price,
      Country: sellForm.country,
      "Ownership / Documents": sellForm.documents,
      Details: sellForm.details,
      Company: sellForm.company ? "Yes" : "No",
    });
    setSellForm({ name: "", email: "", whatsapp: "", communicationLanguage: "", assetKey: "", assetType: "", model: "", yearCondition: "", price: "", country: "", documents: "", details: "", company: false });
    setSellTouchedSubmit(false);
    setSellSuccess(true);
    setSellFiles([]);
    window.location.href = mailto;
  };

  const sendMembersApplication = (event) => {
    event.preventDefault();
    const mailto = buildMailto("Opulence Archive - Private Members Application", {
      Name: membersForm.name,
      Email: membersForm.email,
      WhatsApp: membersForm.whatsapp,
      "Communication Language": membersForm.communicationLanguage,
      Country: membersForm.country,
      City: membersForm.city,
      Instagram: membersForm.instagram,
      Interests: membersForm.interests,
      Reason: membersForm.experience,
    });
    setMembersForm({ name: "", email: "", whatsapp: "", communicationLanguage: "", country: "", city: "", instagram: "", interests: "", experience: "" });
    setMembersSuccess(true);
    window.location.href = mailto;
  };

  const GlobalEffects = () => (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap'); html, body, #root { background: #050505; } @keyframes subtleNoise { 0% { transform: translate(0,0); } 20% { transform: translate(-1%,1%); } 40% { transform: translate(1%,-1%); } 60% { transform: translate(-1%,-1%); } 80% { transform: translate(1%,1%); } 100% { transform: translate(0,0); } }`}</style>
      <div className="pointer-events-none fixed inset-0 z-[997] opacity-[0.025] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 160 160%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.55%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.55%22/%3E%3C/svg%3E')", animation: "subtleNoise 14s steps(4) infinite" }} />
      {loading && (
        <div className="pointer-events-none fixed inset-0 z-[998] bg-[#050505] flex items-center justify-center transition-opacity duration-1000">
          <div className="text-center">
            <p className="text-[#d4af37] text-3xl md:text-5xl tracking-[0.18em] mb-5">Opulence Archive</p>
            <p className="text-white/45 text-sm tracking-[0.22em] font-sans">{t.based}</p>
          </div>
        </div>
      )}
    </>
  );

  const PageShell = ({ children }) => (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      <GlobalEffects />
      <button type="button" onMouseDown={() => changePage("home")} onClick={() => changePage("home")} className="relative z-10 inline-flex items-center justify-center mb-12 text-[#d4af37] font-sans tracking-[0.08em] text-sm px-6 py-5 -mx-6 -my-5 min-h-[52px] pointer-events-auto">{t.backHome}</button>
      {children}
      <Footer t={t} changePage={changePage} />
      {!cookiesAccepted && siteVisible && !loading && <CookieBanner t={t} onAccept={acceptCookies} onLearnMore={() => changePage("cookies")} />}
    </main>
  );

  if (page === "about") {
    return (
      <PageShell>
        <section className="max-w-5xl mx-auto py-16">
          <p className="text-xs tracking-[0.3em] text-[#d4af37] mb-6">{t.learn}</p>
          <h1 className="text-5xl md:text-7xl mb-10">{t.aboutTitle}</h1>
          <div className="grid md:grid-cols-3 gap-6 font-sans text-white/70 leading-7">
            <p>{t.aboutText1}</p>
            <p>{t.aboutText2}</p>
            <p>{t.aboutText3}</p>
          </div>
        </section>
      </PageShell>
    );
  }

  if (page === "privacy") return <PageShell><LegalContent legal={buildLegalPage("privacy", lang)} /></PageShell>;
  if (page === "terms") return <PageShell><LegalContent legal={buildLegalPage("terms", lang)} /></PageShell>;
  if (page === "cookies") return <PageShell><LegalContent legal={buildLegalPage("cookies", lang)} /></PageShell>;
  if (page === "disclaimer") return <PageShell><LegalContent legal={buildLegalPage("disclaimer", lang)} /></PageShell>;

  if (page === "members") {
    return (
      <PageShell>
        <section className="max-w-5xl mx-auto py-16 grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#d4af37] mb-6">{t.membersComingSoon}</p>
            <h1 className="text-5xl md:text-7xl mb-8">{t.membersTitle}</h1>
            <p className="text-white/70 font-sans leading-7 mb-5">{t.membersPageText}</p>
            <p className="text-white/35 text-xs tracking-[0.18em] font-sans">{t.based}</p>
          </div>
          <form noValidate onSubmit={sendMembersApplication} className="grid gap-5 bg-white/[0.04] border border-white/10 p-6 md:p-8 font-sans">
            <FieldInput value={membersForm.name} onChange={(e) => updateMembers("name", e.target.value)} placeholder={t.form.name} />
            <FieldInput required type="email" value={membersForm.email} onChange={(e) => updateMembers("email", e.target.value)} placeholder={t.form.email} />
            <FieldInput required value={membersForm.whatsapp} onChange={(e) => updateMembers("whatsapp", e.target.value)} placeholder={t.form.whatsapp} />
            <LanguageSelect value={membersForm.communicationLanguage} onChange={(e) => updateMembers("communicationLanguage", e.target.value)} t={t} />
            <FieldInput value={membersForm.country} onChange={(e) => updateMembers("country", e.target.value)} placeholder={t.form.country} />
            <FieldInput value={membersForm.city} onChange={(e) => updateMembers("city", e.target.value)} placeholder={t.form.city} />
            <FieldInput value={membersForm.instagram} onChange={(e) => updateMembers("instagram", e.target.value)} placeholder={t.form.instagramOptional} />
            <FieldInput value={membersForm.interests} onChange={(e) => updateMembers("interests", e.target.value)} placeholder={t.form.interests} />
            <TextArea value={membersForm.experience} onChange={(e) => updateMembers("experience", e.target.value)} placeholder={t.form.experience} rows={4} />
            {membersSuccess && <p className="border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] px-4 py-3 text-[13px] leading-6">{t.formSuccess}</p>}
            <button type="submit" className="relative z-10 bg-[#d4af37] text-black py-5 tracking-[0.08em] text-sm hover:opacity-90 transition">{t.submitApplication}</button>
          </form>
        </section>
      </PageShell>
    );
  }

  const navButtonClass = "relative z-10 inline-flex items-center justify-center hover:text-[#d4af37] transition px-5 py-4 -mx-5 -my-4 min-h-[44px] pointer-events-auto";

  return (
    <main className="min-h-screen bg-[#050505] text-white scroll-smooth" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      <GlobalEffects />
      {siteVisible && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
            <button type="button" onClick={() => changePage("home")} className="relative z-10 inline-flex items-center justify-center text-[#d4af37] text-sm md:text-base tracking-[0.18em] px-5 py-4 -mx-5 -my-4 min-h-[46px] pointer-events-auto">Opulence Archive</button>
            <div className="hidden md:flex gap-5 text-[11px] tracking-[0.1em] text-white/70 items-center font-sans uppercase">
              <LanguageSwitch lang={lang} setLang={setLang} />
              <button type="button" className={navButtonClass} onClick={() => goToSection("sourcing")}>{t.navSourcing}</button>
              <button type="button" className={navButtonClass} onClick={() => goToSection("sell")}>{t.navSell}</button>
              <button type="button" className={navButtonClass} onClick={() => changePage("members")}>{t.navMembers}</button>
              <button type="button" className={navButtonClass} onClick={() => goToSection("contact")}>{t.navContact}</button>
              <button type="button" className={navButtonClass} onClick={() => changePage("about")}>{t.navAbout}</button>
            </div>
            <div className="md:hidden flex items-center gap-2">
              <LanguageSwitch lang={lang} setLang={setLang} />
              <button type="button" onClick={() => setMobileMenuOpen(true)} className="relative z-10 w-11 h-11 border border-white/10 text-[#d4af37] flex items-center justify-center text-lg">☰</button>
            </div>
          </div>
        </nav>
      )}

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl px-7 py-8 md:hidden">
          <div className="flex justify-between items-center mb-14">
            <p className="text-[#d4af37] tracking-[0.18em]">Opulence Archive</p>
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="relative z-10 w-11 h-11 border border-white/10 text-[#d4af37] flex items-center justify-center text-xl">×</button>
          </div>
          <div className="grid gap-7 text-2xl text-white/80">
            <button type="button" onClick={() => goToSection("sourcing")} className="relative z-10 text-left hover:text-[#d4af37] transition w-full py-5 px-3 -mx-3 min-h-[58px] pointer-events-auto">{t.navSourcing}</button>
            <button type="button" onClick={() => goToSection("sell")} className="relative z-10 text-left hover:text-[#d4af37] transition w-full py-5 px-3 -mx-3 min-h-[58px] pointer-events-auto">{t.navSell}</button>
            <button type="button" onClick={() => changePage("members")} className="relative z-10 text-left hover:text-[#d4af37] transition w-full py-5 px-3 -mx-3 min-h-[58px] pointer-events-auto">{t.navMembers}</button>
            <button type="button" onClick={() => goToSection("contact")} className="relative z-10 text-left hover:text-[#d4af37] transition w-full py-5 px-3 -mx-3 min-h-[58px] pointer-events-auto">{t.navContact}</button>
            <button type="button" onClick={() => changePage("about")} className="relative z-10 text-left hover:text-[#d4af37] transition w-full py-5 px-3 -mx-3 min-h-[58px] pointer-events-auto">{t.navAbout}</button>
          </div>
          <p className="absolute bottom-8 left-7 text-white/35 text-xs tracking-[0.18em] font-sans">{t.based}</p>
        </div>
      )}

      <section id="top" className="min-h-screen flex items-center relative overflow-hidden px-6 pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,140,70,0.18),transparent_35%),linear-gradient(to_bottom,#111,#050505)]" />
        <div className="absolute inset-0 bg-cover bg-center scale-110 transition-all duration-[2800ms] ease-in-out" style={{ backgroundImage: `url('${heroImages[previousHeroIndex] || fallbackImage}')`, opacity: isHeroFading ? 0.35 : 0 }} />
        <div className="absolute inset-0 bg-cover bg-center scale-110 transition-all duration-[2800ms] ease-in-out" style={{ backgroundImage: `url('${heroImages[heroIndex] || fallbackImage}')`, opacity: isHeroFading ? 0 : 0.35 }} />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        <div className="relative max-w-7xl mx-auto w-full">
          <div className="mb-12 relative">
            <h1 className="text-[#d4af37] text-4xl md:text-7xl tracking-[0.10em] md:tracking-[0.14em] mb-6">Opulence Archive</h1>
            <div className="w-48 h-[1px] bg-[#d4af37]/60" />
          </div>
          <p className="text-xs tracking-[0.25em] text-[#d4af37] mb-1 font-sans">{t.label}</p>
          <p className="text-[11px] tracking-[0.18em] text-white/50 mb-6 font-sans">{t.based}</p>
          <h2 className="text-4xl md:text-[5.5rem] max-w-5xl leading-[0.92] mb-8">{t.headline}</h2>
          <p className="text-white/70 max-w-lg text-base md:text-lg mb-10 font-sans leading-8">{t.intro}</p>
          {siteVisible && (
            <div className="flex flex-col sm:flex-row gap-4 font-sans">
              <button type="button" onClick={() => goToSection("sourcing")} className="relative z-10 px-7 py-4 bg-[#d4af37] text-black text-sm tracking-[0.06em] text-center hover:opacity-90 transition">{t.request}</button>
              <button type="button" onClick={() => goToSection("sell")} className="relative z-10 px-7 py-4 border border-[#d4af37]/30 hover:border-[#d4af37] transition text-sm tracking-[0.06em] text-center">{t.navSell}</button>
            </div>
          )}
        </div>
      </section>

      <div className="pt-12 md:pt-16">
        <TrustPoints points={t.trustPoints} />
      </div>

      <section className="max-w-7xl mx-auto px-6 pt-10 pb-20 md:pb-24 font-sans">
        <p className="text-[#d4af37] text-xs md:text-sm tracking-[0.28em] uppercase mb-8">{t.chooseCategory}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[14px]">
          {categories.map((category) => (
            <button key={category.key} type="button" onClick={() => goToSourcingCategory(category)} className="relative overflow-hidden border border-white/10 min-h-[220px] md:min-h-[260px] flex items-end bg-gradient-to-br from-white/[0.03] to-[#d4af37]/[0.03] group transition-all duration-700 hover:border-[#d4af37]/50 hover:shadow-[0_0_60px_rgba(212,175,55,0.18)] hover:-translate-y-[4px] hover:scale-[1.01] text-left">
              <img src={category.image} alt={category.label} onError={(event) => { event.currentTarget.src = fallbackImage; }} className="absolute inset-0 w-full h-full object-cover opacity-45 scale-100 group-hover:scale-[1.14] transition-transform duration-[2200ms] ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/10 transition duration-[1200ms]" />
              <div className="relative p-5 md:p-6 transform transition duration-700 group-hover:-translate-y-1 flex items-end min-h-[90px]">
                <span className="tracking-[0.06em] text-sm text-[#f3f3f3] font-medium transition duration-700 group-hover:text-white group-hover:tracking-[0.08em]">{category.label}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section id="sourcing" className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 border-t border-white/10 scroll-mt-24">
        <div>
          <p className="text-xs tracking-[0.25em] text-[#d4af37] mb-4 font-sans">{t.concierge}</p>
          <h2 className="text-3xl md:text-5xl mb-8 leading-tight">{t.sourcingTitle}</h2>
          <div className="space-y-6 max-w-xl">
            <p className="text-white/70 font-sans text-lg">{t.sourcingText}</p>
            <FeeBox text={t.sourcingFeeText} />
          </div>
        </div>
        <div className="bg-gradient-to-br from-white/[0.04] to-[#d4af37]/[0.04] border border-white/10 p-8 font-sans">
          <form noValidate onSubmit={sendSourcingRequest} className="grid gap-5">
            <FieldInput value={sourcingForm.name} onChange={(e) => updateSourcing("name", e.target.value)} placeholder={t.form.name} hasError={sourcingTouchedSubmit && !sourcingForm.name} />
            <FieldInput required type="email" value={sourcingForm.email} onChange={(e) => updateSourcing("email", e.target.value)} placeholder={t.form.email} hasError={sourcingTouchedSubmit && !sourcingForm.email} />
            <FieldInput required value={sourcingForm.whatsapp} onChange={(e) => updateSourcing("whatsapp", e.target.value)} placeholder={t.form.whatsapp} hasError={sourcingTouchedSubmit && !sourcingForm.whatsapp} />
            <LanguageSelect value={sourcingForm.communicationLanguage} onChange={(e) => updateSourcing("communicationLanguage", e.target.value)} t={t} hasError={sourcingTouchedSubmit && !sourcingForm.communicationLanguage} />
            <select value={sourcingForm.categoryKey} onChange={(e) => { const key = e.target.value; updateSourcing("categoryKey", key); updateSourcing("asset", key ? t.categories[key] : ""); }} className={`bg-black/40 border px-4 py-4 outline-none text-white transition ${sourcingTouchedSubmit && !sourcingForm.asset ? "border-red-400 focus:border-red-400" : "border-white/10 focus:border-[#d4af37]/60"}`}>
              <option value="">{t.form.assetLooking}</option>
              {categoryKeys.map((key) => <option key={key} value={key}>{t.categories[key]}</option>)}
            </select>
            <FieldInput value={sourcingForm.brandModel} onChange={(e) => updateSourcing("brandModel", e.target.value)} placeholder={`${currentSourcingFieldLabel} — ${currentSourcingFieldExample}`} />
            <FieldInput value={sourcingForm.budget} onChange={(e) => updateSourcing("budget", e.target.value)} placeholder={t.form.budget} hasError={sourcingTouchedSubmit && !sourcingForm.budget} />
            <FieldInput value={sourcingForm.country} onChange={(e) => updateSourcing("country", e.target.value)} placeholder={t.form.country} hasError={sourcingTouchedSubmit && !sourcingForm.country} />
            <TextArea value={sourcingForm.message} onChange={(e) => updateSourcing("message", e.target.value)} placeholder={t.form.message} />
            <UploadField label={t.uploadDocuments} files={sourcingFiles} onChange={(e) => setSourcingFiles(Array.from(e.target.files || []))} />
            <CompanyCheckbox checked={sourcingForm.company} onChange={(e) => updateSourcing("company", e.target.checked)} label={t.form.company} />
            {sourcingError && <p className="text-red-400 text-[13px] font-sans -mt-1">{t.formError}</p>}
            {sourcingSuccess && <p className="border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] px-4 py-3 text-[13px] leading-6">{t.formSuccess}</p>}
            <button type="submit" className="relative z-10 bg-[#d4af37] text-black py-5 tracking-[0.06em] text-sm hover:opacity-90 transition">{t.form.submitRequest}</button>
          </form>
        </div>
      </section>

      <section id="sell" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10 grid md:grid-cols-2 gap-16 scroll-mt-24">
        <div>
          <p className="text-xs tracking-[0.25em] text-[#d4af37] mb-4 font-sans">{t.sellLabel}</p>
          <h2 className="text-3xl md:text-5xl mb-8 leading-tight">{t.sellTitle}</h2>
          <div className="space-y-6 max-w-xl">
            <p className="text-white/70 font-sans text-lg">{t.sellText}</p>
            <FeeBox text={t.sellFeeText} />
          </div>
        </div>
        <div className="bg-gradient-to-br from-white/[0.04] to-[#d4af37]/[0.04] border border-white/10 p-8 font-sans">
          <form noValidate onSubmit={sendAssetSubmission} className="grid gap-5">
            <FieldInput value={sellForm.name} onChange={(e) => updateSell("name", e.target.value)} placeholder={t.form.name} hasError={sellTouchedSubmit && !sellForm.name} />
            <FieldInput required type="email" value={sellForm.email} onChange={(e) => updateSell("email", e.target.value)} placeholder={t.form.email} hasError={sellTouchedSubmit && !sellForm.email} />
            <FieldInput required value={sellForm.whatsapp} onChange={(e) => updateSell("whatsapp", e.target.value)} placeholder={t.form.whatsapp} hasError={sellTouchedSubmit && !sellForm.whatsapp} />
            <LanguageSelect value={sellForm.communicationLanguage} onChange={(e) => updateSell("communicationLanguage", e.target.value)} t={t} hasError={sellTouchedSubmit && !sellForm.communicationLanguage} />
            <select value={sellForm.assetKey} onChange={(e) => { const key = e.target.value; updateSell("assetKey", key); updateSell("assetType", key ? t.categories[key] : ""); }} className={`bg-black/40 border px-4 py-4 outline-none text-white transition ${sellTouchedSubmit && !sellForm.assetType ? "border-red-400 focus:border-red-400" : "border-white/10 focus:border-[#d4af37]/60"}`}>
              <option value="">{t.form.assetType}</option>
              {sellCategoryKeys.map((key) => <option key={key} value={key}>{t.categories[key]}</option>)}
            </select>
            <FieldInput value={sellForm.model} onChange={(e) => updateSell("model", e.target.value)} placeholder={`${currentSellFieldLabel} — ${currentSellFieldExample}`} hasError={sellTouchedSubmit && !sellForm.model} />
            <FieldInput value={sellForm.yearCondition} onChange={(e) => updateSell("yearCondition", e.target.value)} placeholder={t.form.yearCondition} />
            <FieldInput value={sellForm.price} onChange={(e) => updateSell("price", e.target.value)} placeholder={t.form.priceExpectation} hasError={sellTouchedSubmit && !sellForm.price} />
            <FieldInput value={sellForm.country} onChange={(e) => updateSell("country", e.target.value)} placeholder={t.form.country} hasError={sellTouchedSubmit && !sellForm.country} />
            <FieldInput value={sellForm.documents} onChange={(e) => updateSell("documents", e.target.value)} placeholder={t.form.documentsAvailable} />
            <TextArea value={sellForm.details} onChange={(e) => updateSell("details", e.target.value)} placeholder={t.form.assetDetails} />
            <UploadField label={t.uploadServiceRecords} files={sellFiles} onChange={(e) => setSellFiles(Array.from(e.target.files || []))} />
            <CompanyCheckbox checked={sellForm.company} onChange={(e) => updateSell("company", e.target.checked)} label={t.form.company} />
            {sellError && <p className="text-red-400 text-[13px] font-sans -mt-1">{t.formError}</p>}
            {sellSuccess && <p className="border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] px-4 py-3 text-[13px] leading-6">{t.formSuccess}</p>}
            <button type="submit" className="relative z-10 bg-[#d4af37] text-black py-5 tracking-[0.06em] text-sm hover:opacity-90 transition">{t.form.submitAsset}</button>
          </form>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10 text-center">
        <p className="text-xs tracking-[0.25em] text-[#d4af37] mb-4 font-sans">{t.membersComingSoon}</p>
        <h2 className="text-3xl md:text-5xl mb-8 leading-tight">{t.membersTitle}</h2>
        <p className="text-white/65 font-sans max-w-2xl mx-auto mb-10 leading-7">{t.membersText}</p>
        <button type="button" onClick={() => changePage("members")} className="relative z-10 inline-flex items-center justify-center px-9 py-5 border border-[#d4af37]/30 hover:border-[#d4af37] transition text-sm tracking-[0.06em] hover:bg-[#d4af37] hover:text-black">{t.membersButton}</button>
      </section>

      <section id="contact" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10 scroll-mt-24">
        <div className="grid md:grid-cols-2 gap-10 items-end">
          <div>
            <h2 className="text-4xl md:text-5xl mb-6">{t.contactTitle}</h2>
            <p className="text-white/65 font-sans mb-2">{t.contactText}</p>
            <p className="text-white/40 text-sm font-sans mb-8">{t.based}</p>
          </div>
          <div>
            <p className="text-[#d4af37] font-sans tracking-[0.08em] mb-8">{t.contactPrivate}</p>
            <div className="flex flex-wrap gap-6 text-sm font-sans text-white/40 tracking-[0.08em]">
              <button type="button" onClick={() => changePage("privacy")} className={navButtonClass}>{t.privacy}</button>
              <button type="button" onClick={() => changePage("terms")} className={navButtonClass}>{t.terms}</button>
              <button type="button" onClick={() => changePage("cookies")} className={navButtonClass}>{t.cookies}</button>
              <button type="button" onClick={() => changePage("disclaimer")} className={navButtonClass}>{t.disclaimerPage}</button>
            </div>
          </div>
        </div>
      </section>

      <Footer t={t} changePage={changePage} />
      {!cookiesAccepted && siteVisible && !loading && <CookieBanner t={t} onAccept={acceptCookies} onLearnMore={() => changePage("cookies")} />}
    </main>
  );
}
