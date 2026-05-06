type Props = {
    text: string,
    url: string,
}

export default function ExternalLink(props: Props): React.ReactElement {
    return (
        <a
            className="bg-button rounded-md p-1 px-3 text-accent hover:bg-button-hover"
            href={props.url} target="_blank" rel="noopener noreferrer">
            {props.text}
        </a>
    )
}