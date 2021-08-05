import React from "react";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";

const Editor = () => {
    ClassicEditor.create(document.querySelector("#editor"), {
        plugins: [Essentials, Paragraph, Bold, Italic, Image],
        toolbar: ["bold", "italic"],
    })
        .then((editor) => {
            console.log("Editor was initialized", editor);
        })
        .catch((error) => {
            console.error(error.stack);
        });
    return (
        <>
            <div id="editor">
                <p>Simple image:</p>

                <figure class="image">
                    <img
                        src="https://via.placeholder.com/1000x300/02c7cd/fff?text=Placeholder%20image"
                        alt="CKEditor 5 rocks!"
                    />
                </figure>
            </div>
        </>
    );
};

export default Editor;
