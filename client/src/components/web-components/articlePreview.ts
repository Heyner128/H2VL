export default class ArticlePreview extends HTMLElement {
    private DATE_FORMAT: {
        locales: Intl.LocalesArgument,
        options: Intl.DateTimeFormatOptions
    } = {
        locales: "fr-FR",
        options: {
            year: "numeric",
            month: "numeric",
            day: "numeric"
        }
    }

    constructor() {
        super();
    }

    get id() {
        return this.getAttribute('id') ?? "";
    }

    set id(value: string) {
        this.setAttribute('id', value);
    }

    get title() {
        return this.getAttribute('title') ?? "";
    }

    set title(value: string) {
        this.setAttribute('title', value);
    }

    get imageURL() {
        return this.getAttribute('imageURL') ?? "";
    }

    set imageURL(value: string) {
        this.setAttribute('imageURL', value);
    }

    get createdAt() {
        return this.getAttribute('createdAt') ?? "";
    }

    set createdAt(value: string) {
        this.setAttribute('createdAt', value);
    }

    get articleType() {
        return this.getAttribute('articleType') ?? "";
    }

    set articleType(value: string) {
        this.setAttribute('articleType', value);
    }

    get articleDescription() {
        return this.getAttribute('articleDescription') ?? "";
    }

    set articleDescription(value: string) {
        this.setAttribute('articleDescription', value);
    }

    private wrapInAnchorElement(element: HTMLElement): HTMLAnchorElement {
        const wrapper = document.createElement("a");
        wrapper.href = `${import.meta.env.SITE + import.meta.env.BASE_URL}nouveautes/${this.id}`;
        wrapper.title = `Voir l'article numéro ${this.id}`;
        wrapper.tabIndex = 0;

        wrapper.appendChild(element);

        return wrapper;
    }

    connectedCallback() {


        const article = document.createElement("article");
        article.classList.add("flex", "flex-col", "gap-8");

        const title = document.createElement("h3");
        title.textContent = this.title;
        title.classList.add("text-xl", "font-bold");

        let image: HTMLImageElement = document.createElement("img");
        image.src = this.imageURL;
        image.alt = `Image article ${this.title}`;
        image.classList.add("rounded-xl");


        let subtitleWrapper = document.createElement("div");
        subtitleWrapper.classList.add("flex", "justify-between");



        const creationDate = document.createElement("span");
        creationDate.textContent = new Date(this.createdAt).toLocaleDateString(
            this.DATE_FORMAT.locales,
            this.DATE_FORMAT.options,
        );
        creationDate.classList.add("max-md:text-sm", "italic");

        const articleType = document.createElement("span");
        articleType.textContent = this.articleType;
        articleType.classList.add(
            "max-md:text-sm",
            "w-min",
            "font-bold",
            "px-3",
            "rounded-full",
            "align-middle",
            "text-white",
            (() => {
                switch (this.articleType) {
                    case "Actualités":
                        return "bg-green-900";
                    case "Évènements":
                        return "bg-amber-800";
                    case "Articles":
                        return "bg-red-500";
                    default:
                        return "bg-blue-500";
                }
            })()
        );

        let articleDescription = document.createElement("p");
        articleDescription.textContent = this.articleDescription;
        articleDescription.classList.add("text-justify");

        // wraps on anchor element
        articleDescription = this.wrapInAnchorElement(articleDescription) as unknown as HTMLDivElement;

        // append to wrappers and main component

        article.appendChild(title);

        //wraps on anchor element
        image = this.wrapInAnchorElement(image) as unknown as HTMLImageElement;
        article.appendChild(image);

        subtitleWrapper.appendChild(creationDate);
        subtitleWrapper.appendChild(articleType);

        // wraps on anchor element
        subtitleWrapper = this.wrapInAnchorElement(subtitleWrapper) as unknown as HTMLDivElement;

        article.appendChild(subtitleWrapper);
        article.appendChild(articleDescription);

        this.appendChild(article);
    }


}