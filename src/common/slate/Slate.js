import React from "react";
import {DocumentEditor,PreviewEditor} from 'thoughtware-slate-ui';
import {getUser} from "tiklab-core-ui";


export const SlateDocumentEditorDebounce = props =>{

    const {value,onChange,updateDocument,minHeight=200,maxHeight=500} = props


    const updataDesc = () => {
        onChange(value);
        updateDocument(value,false)
    }

    return (
        <DocumentEditor
            base_url={base_url}
            ticket={getUser().ticket}
            value={value}
            onChange={value => updataDesc(value)}
            minHeight={minHeight}
            maxHeight={maxHeight}
        />
    )
}

export const SlateDocumentEditor = props =>{

    const {value,onChange,minHeight=200,maxHeight=500} = props;

    return (
        <DocumentEditor
            base_url={base_url}
            ticket={getUser().ticket}
            value={value}
            onChange={onChange}
            minHeight={minHeight}
            maxHeight={maxHeight}
        />
    )
}

export const SlatePreviewEditor = props =>{

    const {value} = props

    return (
        <PreviewEditor
            value={value}
            base_url={base_url}
            ticket={getUser().ticket}
        />
    )
}
