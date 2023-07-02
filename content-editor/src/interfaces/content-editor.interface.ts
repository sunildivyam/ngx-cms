export interface EditorElementData {
    href?: string;
    src?: string;
    alt?: string;
    text?: string;
    source?: string;
    language?: string;
    enableEdit?: string;
};

export interface EditorElement {
    name: string;
    tagName: string;
    isContainer?: boolean;
    focused?: boolean;
    data?: EditorElementData;
    children?: Array<EditorElement>;
};

export interface Rectangle {
    top: number;
    left: number;
    bottom: number;
    right: number;
    width?: number;
    height?: number;
}
