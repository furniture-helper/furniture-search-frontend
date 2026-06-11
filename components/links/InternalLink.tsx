type Props = {
    text: string,
    url: string,
}

export default function InternalLink(props: Props): React.ReactElement {
    return (
        <a
            className="flex bg-button rounded-md p-1 px-3 text-accent hover:bg-button-hover whitespace-nowrap justify-center items-center"
            href={props.url} rel="noopener noreferrer">
            {props.text}
        </a>
    )
}