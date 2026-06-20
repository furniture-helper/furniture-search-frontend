import MarkButton from "@/components/ui/buttons/mark-buttons/MarkButton";

type Props = {
    url1: string;
    url2: string;
}

export default function MarkTrueButton(props: Props) {
    return (
        <MarkButton
            text={"✅"}
            mark={{
                url1: props.url1,
                url2: props.url2,
                isMatching: true,
            }}
        />
    )
}
